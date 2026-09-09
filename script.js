const departments = [
  {
    name: 'Leadership and Management',
    employees: [
      { firstName: 'Jo-Anne', lastName: 'Sinclair' }
    ]
  },
  {
    name: 'Administration',
    employees: [
      
    ]
  },
  {
    name: 'Audit',
    employees: [
      
    ]
  },
  {
    name: 'Banking Operations',
    employees: [
      
    ]
  },
  {
    name: 'Communications',
    employees: [
      
    ]
  },
  {
    name: 'Corporate Services',
    employees: [
      
    ]
  },
  {
    name: 'Facilities',
    employees: [
      
    ]
  },
  {
    name: 'Financial Services',
    employees: [
      
    ]
  },
  {
    name: 'Human Resources',
    employees: [
      
    ]
  },
  {
    name: 'Information Technology',
    employees: [
      
    ]
  },
  {
    name: 'IT Technician',
    employees: [
      
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('directory-container');

  if (!container) {
    return;
  }

  const year = new Date().getFullYear();
  const copyright = document.getElementById('copyright');

  if (copyright) {
    copyright.textContent = `Copyright Pixell River Financial ${year}.`;
  }

  departments.forEach((department) => {
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    const list = document.createElement('ul');

    heading.textContent = department.name;
    section.appendChild(heading);

    department.employees.forEach((employee) => {
      const item = document.createElement('li');
      const fullName = employee.lastName
        ? `${employee.firstName} ${employee.lastName}`
        : employee.firstName;

      item.textContent = fullName;
      list.appendChild(item);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
});
