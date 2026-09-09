const departments = [
  {
    name: 'Leadership and Management',
    employees: [
      { title: 'CEO/Chair of Board', firstName: 'Jo-Anne', lastName: 'Sinclair' },
      { title: 'COO/VP Operations', firstName: 'Jackson', lastName: 'Smith' },
      { title: 'CFO/VP Administration', firstName: 'Susan', lastName: 'Thomas' },
      { title: 'VP Client Services', firstName: 'Richa', lastName: 'Kaur' },
      { title: 'CIO', firstName: 'Josee', lastName: 'Benjamin' },
      { title: 'VP Sales & Marketing', firstName: 'Vincent', lastName: 'Grey' },
      { title: 'Director Financial and Audit Svcs', firstName: 'Rupa', lastName: 'Kharki' },
      { title: 'Director Human Resources', firstName: 'Xun', lastName: 'Kuang' },
      { title: 'Director Legal Services/General Counsel', firstName: 'Stien', lastName: 'Pedersen' },
      { title: 'Director Information Technology', firstName: 'Sandra', lastName: 'Bear' },
      { title: 'Director Information Security and CISSO', firstName: 'Gus', lastName: 'Blue' },
      { title: 'Director Accounting', firstName: 'Sam', lastName: 'Kong' },
      { title: 'Director Physical Security', firstName: 'Valentine', lastName: 'Smith' },
      { title: 'Director Facilities', firstName: 'Mariya', lastName: 'Kaperski' },
      { title: 'Manager, Business Continuity and Disaster Recovery', firstName: 'Abd al-Hamid', lastName: 'Alami' },
      { title: 'Manager, Internal Audit', firstName: 'Victoria', lastName: 'Gray' },
      { title: 'Chief Architect', firstName: 'Cheryl', lastName: 'Guru' },
      { title: 'Manager, Security Architecture', firstName: 'Jean', lastName: 'Ngoy' },
      { title: 'Solution Architect, Online Banking', firstName: 'Kris', lastName: 'Gold' },
      { title: 'Manager, Application Solutions', firstName: 'Isaac', lastName: 'Smith' },
      { title: 'Lead Developer, Online Banking', firstName: 'Payton', lastName: 'Frost' },
      { title: 'Manager, Operational Risk', firstName: 'Samantha', lastName: 'Nettle' },
      { title: 'Manager, Vendor Relations', firstName: 'Yolanda', lastName: 'Ferreira' },
      { title: 'Manager, Purchasing', firstName: 'Samir', lastName: 'Hassan' },
      { title: 'Manager, Communications', firstName: 'Yuna', lastName: 'Aikawa' },
      { title: 'Manager Customer Experience and Community Eng.', firstName: 'Jonathan', lastName: 'Carberry' },
      { title: 'Manager of Sales', firstName: 'Roland', lastName: 'Wei' },
      { title: 'Manager, Marketing', firstName: 'Pran', lastName: 'Singh' },
      { title: 'Business Analyst, Online Banking', firstName: 'Linda', lastName: 'Analyst' },
      { title: 'Manager, Contract Management', firstName: 'Esra', lastName: 'Sedge' },
      { title: 'Manager, Compliance Management', firstName: 'Pranee', lastName: 'Tan' },
      { title: 'Manager IT End User Service Desk', firstName: 'Karmen', lastName: 'Spruce' },
      { title: 'Manager IT End User Computing', firstName: 'Haydar', lastName: 'Katirci' },
      { title: 'Manager IT Telecom and Infrastructure', firstName: 'Jill', lastName: 'Harkness' },
      { title: 'Manager, Data Center and Hosting Services', firstName: 'Tim', lastName: 'Morrison' },
      { title: 'Manager of IT Risk Management', firstName: 'Aleksandr', lastName: 'Milosevic' },
      { title: 'Manager IT, project management office', firstName: 'Jim', lastName: 'Wingnut' }
    ]
  },
  {
    name: 'Administration',
    employees: [
      { firstName: 'Zoë', lastName: 'Robins' },
      { firstName: 'Madeleine', lastName: 'Madden' }
    ]
  },
  {
    name: 'Audit',
    employees: [
      { firstName: 'Josha', lastName: 'Sadowski' },
      { firstName: 'Kate', lastName: 'Fleetwood' }
    ]
  },
  {
    name: 'Banking Operations',
    employees: [
      { firstName: 'Priyanka', lastName: 'Bose' },
      { firstName: 'Hammed', lastName: 'Animashaun' },
      { firstName: 'Álvaro', lastName: 'Morte' },
      { firstName: 'Taylor', lastName: 'Napier' },
      { firstName: 'Alan', lastName: 'Simmonds' }
    ]
  },
  {
    name: 'Communications',
    employees: [
      { firstName: 'Gil', lastName: 'Cardinal' },
      { firstName: 'Richard J.', lastName: 'Lewis' }
    ]
  },
  {
    name: 'Corporate Services',
    employees: [
      { firstName: 'Randy', lastName: 'Bradshaw' },
      { firstName: 'Tracey', lastName: 'Cook' },
      { firstName: 'Lubomir', lastName: 'Mykytiuk' }
    ]
  },
  {
    name: 'Facilities',
    employees: [
      { firstName: 'Dakota', lastName: 'House' },
      { firstName: 'Lori Lea', lastName: 'Okemah' },
      { firstName: 'Renae', lastName: 'Morrisseau' },
      { firstName: 'Rick', lastName: 'Belcourt' }
    ]
  },
  {
    name: 'Financial Services',
    employees: [
      { firstName: 'Selina', lastName: 'Hanusa' },
      { firstName: 'Buffy', lastName: 'Gaudry' },
      { firstName: 'Shaneen Ann', lastName: 'Fox' },
      { firstName: 'Allan', lastName: 'Little' },
      { firstName: 'Danny', lastName: 'Rabbit' }
    ]
  },
  {
    name: 'Human Resources',
    employees: [
      { firstName: 'Jesse Ed', lastName: 'Azure' },
      { firstName: 'Stacy', lastName: 'Da Silva' },
      { firstName: 'Vladimír', lastName: 'Valenta' },
      { firstName: 'Samone', lastName: 'Sayeses-Whitney' },
      { firstName: 'Paul', lastName: 'Coeur' }
    ]
  },
  {
    name: 'Information Technology',
    employees: [
      { firstName: 'Graham', lastName: 'Greene' },
      { firstName: 'Sandika', lastName: 'Evergreen' },
      { firstName: 'Jennifer', lastName: 'Rodriguez' }
    ]
  },
  {
    name: 'IT Technician',
    employees: [
      { firstName: 'Aiyana', lastName: 'Littlebear' },
      { firstName: 'Inara', lastName: 'Thunderbird' },
      { firstName: 'Kaya', lastName: 'Runningbrook' },
      { firstName: 'Elara', lastName: 'Firehawk' },
      { firstName: 'Siona', lastName: 'Moonflower' },
      { firstName: 'Kaiyu', lastName: 'Greywolf' },
      { firstName: 'Ayawamat', lastName: 'Nightwind' },
      { firstName: 'Tala', lastName: 'Braveheart' },
      { firstName: 'Iniko', lastName: 'Stonebear' },
      { firstName: 'Onatah', lastName: 'Redhawk' }
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

      item.textContent = employee.title ? `${employee.title} ${fullName}` : fullName;
      list.appendChild(item);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
});
