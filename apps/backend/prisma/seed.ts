import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { Pool } from 'pg';
import { departments } from '../src/data/departments.js';
import { organizationRoles } from '../src/data/organization.js';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL must be set before seeding the database.');
}

const pool = new Pool({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

function personKey(firstName: string, lastName: string): string {
  return JSON.stringify([firstName.trim().toLocaleLowerCase(), lastName.trim().toLocaleLowerCase()]);
}

async function seed(): Promise<void> {
  const departmentEmployees = departments.flatMap((department) =>
    department.employees.map((employee) => ({ ...employee, departmentName: department.name })),
  );
  const roleByPerson = new Map<string, string>();

  for (const organizationRole of organizationRoles) {
    const key = personKey(organizationRole.firstName, organizationRole.lastName);

    if (roleByPerson.has(key)) {
      throw new Error(`Duplicate organization role holder: ${organizationRole.firstName} ${organizationRole.lastName}.`);
    }

    const matches = departmentEmployees.filter(
      (employee) => personKey(employee.firstName, employee.lastName) === key,
    );

    if (matches.length !== 1) {
      throw new Error(
        `Expected one department employee for role holder ${organizationRole.firstName} ${organizationRole.lastName}; found ${matches.length}.`,
      );
    }

    if (matches[0].title && matches[0].title !== organizationRole.role) {
      throw new Error(
        `Role mismatch for ${organizationRole.firstName} ${organizationRole.lastName}: "${matches[0].title}" does not match "${organizationRole.role}".`,
      );
    }

    roleByPerson.set(key, organizationRole.role);
  }

  await prisma.$transaction(async (transaction) => {
    if ((await transaction.employee.count()) > 0) {
      console.info('Seed skipped: employees already exist. Existing data was left unchanged.');
      return;
    }

    const departmentIds = new Map<string, string>();
    for (const department of departments) {
      const record = await transaction.department.upsert({
        where: { name: department.name },
        update: {},
        create: { name: department.name },
      });
      departmentIds.set(department.name, record.id);
    }

    const roleTitles = new Set([
      ...organizationRoles.map((organizationRole) => organizationRole.role),
      ...departmentEmployees.flatMap((employee) => employee.title ? [employee.title] : []),
    ]);
    const roleIds = new Map<string, string>();

    for (const title of roleTitles) {
      const record = await transaction.role.upsert({
        where: { title },
        update: {},
        create: { title },
      });
      roleIds.set(title, record.id);
    }

    for (const employee of departmentEmployees) {
      const departmentId = departmentIds.get(employee.departmentName);
      if (!departmentId) {
        throw new Error(`No database department was created for "${employee.departmentName}".`);
      }

      const title = employee.title ?? roleByPerson.get(personKey(employee.firstName, employee.lastName));
      const roleId = title ? roleIds.get(title) : undefined;
      if (title && !roleId) {
        throw new Error(`No database role was created for "${title}".`);
      }

      await transaction.employee.create({
        data: {
          firstName: employee.firstName,
          lastName: employee.lastName,
          departmentId,
          ...(roleId ? { roleId } : {}),
        },
      });
    }
  });
}

try {
  await seed();
} catch (error) {
  console.error('Database seed failed.', error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
  await pool.end();
}