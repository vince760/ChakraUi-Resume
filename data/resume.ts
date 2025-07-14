import { ResumeData } from "../types/resume";

export const resumeData: ResumeData = {
  personalInfo: {
    name: "VINCENT VITALE",
    title: "Full Stack Software Developer",
    email: "Vincent.Vitale87@gmail.com",
    phone: "760-421-2936",
    location: "California",
    website: "https://vincent-vitale.com",
    linkedin: "https://www.linkedin.com/in/vincent-vitale-v/",
    github: "https://github.com/vince760",
    summary:
      "5+ years of experience in Full Stack development with expertise in modern web technologies."
  },
  experience: [
    {
      id: "1",
      company: "OLI Systems",
      position: "Fullstack Software Developer",
      location: "Remote",
      startDate: "Mar - 2022",
      endDate: "Current",
      description: [
        "OLI Systems delivers comprehensive, process modeling solutions for water chemistry-based industrial applications that enhance operational efficiency, sustainability, and engineering productivity while mitigating risk.",
        "Developed and optimized C# and Node.js API endpoints using Entity Framework, Express.js, and REMA architectural patterns, improving system maintainability and performance.",
        "Engineered a message-driven architecture leveraging Hangfire, RabbitMQ, PostgreSQL, and Salesforce, streamlining chemical process automation.",
        "Built and deployed C# Azure Function Apps to integrate third-party vendor services, enhancing data processing efficiency.",
        "Designed and implemented React and Svelte UI components to visualize chemical results, network usage statistics, and key operational metrics.",
        "Automated CI/CD pipelines for full-stack application deployments, ensuring smooth, reliable, and scalable releases.",
        "Partnered with product managers to align software solutions with business requirements and compliance standards."
      ],
      technologies: ["JavaScript", "Svelte", "Node.js", "AWS", "Keycloak", "Salesforce"]
    },
    {
      id: "2",
      company: "Outlayr",
      position: "Software Developer",
      location: "Remote",
      startDate: "Dec - 2020",
      endDate: "Jan - 2022",
      description: [
        "Outlayr enhances any commerce exchange experience for all members of a payments life-cycle, consumer, merchant, and payment tender.",
        "Developed a custom drop and drag feature to enhance user experience using multiple React-Packages.",
        "Optimize, modify, and enhance the current Android application using Android Studio.",
        "Created End to End UI testing using Cypress.IO, as well as API endpoints to ensure endpoint restrictions were in place.",
        "Designed and implemented a web crawler using Selenium and Hangfire in C# that gathers data for every state and saves that information to a SQL table monthly.",
        "Integrated with Docusign to create a seamless and user friendly merchant sign up program.",
        "Built with React.js, ASP.NET, Node.js, and Sql. Deployed to Azure cloud hosting."
      ],
      technologies: [
        "React",
        "JavaScript",
        "C#",
        "ASP.NET",
        "T-SQL",
        "SendGrid",
        "Twilio",
        "AWS",
        "Azure"
      ]
    },
    {
      id: "3",
      company: "Source One Inventory Solutions",
      position: "Full Stack Developer",
      location: "Remote",
      startDate: "Jul - 2020",
      endDate: "Dec - 2020",
      description: [
        "Source 1 Inventory Solutions is a web based retail and inventory management tool where users can get up to date information on vendor and supply availability to enhance their sales.",
        "Developed TSQL database schema including tables, scripts and stored procedures to be called from the web server for creating, reading, updating and deleting data, utilizing and considering foreign key relationships and appropriate order of operations.",
        "Implemented Stripe checkout to create Stripe customers and automate a subscription based plan.",
        "Created Web API controllers and services on an ASP.Net web server to handle requests from the front end to the stored procedures on the SQL database.",
        "Tied in Shopify’s OAuth to authentication using ShopifySharp C# nuget packages. OAuth helped to decouple authorization and authentication, keeping users’ passwords and personal information safe.",
        "Transferred data through the web api using Axios and AJAX calls from the front-end.",
        "Developed UI fully responsive to desktop and mobile devices using CSS3 and Bootstrap.",
        "Optimized UX flow by utilizing third-party libraries, components and extensions, including Formik, MomentJS and SweetAlerts where appropriate."
      ],
      technologies: ["Custom Websites"]
    },
    {
      id: "4",
      company: "Force Tracker",
      position: "Full Stack Developer",
      location: "Remote",
      startDate: "Mar - 2020",
      endDate: "Jun - 2020",
      description: [
        "ForceTracker is a web-based, mobile-friendly, SaaS application that keeps track of critical resources live on a visible, interactive map, and helps automate some of the administrative tasks, like handling contractor and employee payments.",
        "Responsible for designing and creating the SQL data schema, including the creation of tables, stored procedures, table relationships and stored procedures connected to the web server.",
        "Implemented claim-based user authorization and authentication, including password hashing using a .Net extension, BCrypt, for safely storing user passwords on the database.",
        "Developed pixel-perfect, responsive UI matching design mock-ups, using React, CSS and Bootstrap, as well as other third-party components, libraries and extensions, including Formik, Moment and SweetAlerts.",
        "Contributed to the quality assurance of the project by providing and participating in peer code reviews, through the use of Azure DevOps, Postman and Git for source control.",
        "Displayed flexibility, sound judgement and performance under pressure in last-minute project changes and deadline situations, pushing forward to help my team reach our goals."
      ],
      technologies: ["React", "JavaScript", "C#", "ASP.NET", "T-SQL"]
    }
  ],
  education: [
    {
      id: "1",
      institution: "University of Phoenix",
      degree: "Bachelor of Arts - BA",
      field: "Criminal Justice and Corrections",
      startDate: "2013",
      endDate: "2015"
    },
    {
      id: "2",
      institution: "South Dade Senior High School",
      degree: "High School Diploma",
      field: "High School/Secondary Diplomas and Certificates",
      startDate: "2001",
      endDate: "2004"
    }
  ],
  projects: [
    {
      id: "1",
      name: "Kid Coin",
      description:
        "React Native mobile application with Firebase backend for digital coin management",
      technologies: ["React Native", "Firebase", "JavaScript"]
    },
    {
      id: "2",
      name: "Meta-Match",
      description:
        "Matching application built with React and Node.js, deployed on Heroku with Redis caching",
      technologies: ["React", "JavaScript", "Node.js", "Redis", "Heroku"],
      githubUrl: undefined
    },
    {
      id: "3",
      name: "Eventi",
      description:
        "Full-stack event management platform with custom QR components, payment processing, and communication integrations",
      technologies: [
        "C#",
        "ASP.NET",
        "Azure",
        "AWS",
        "T-SQL",
        "Custom QR Component",
        "JavaScript",
        "Node.js",
        "Stripe",
        "Twilio",
        "SendGrid"
      ]
    },
    {
      id: "4",
      name: "VotaFlight",
      description:
        "Full-stack voting platform for simulators",
      technologies: [
        "C#",
        "ASP.NET",
        "Azure",
        "AWS",
        "T-SQL",
        "JavaScript",
        "Node.js",
        "Redis",
        "MUI",
        "Render"
      ]
    }
  ],
  skills: [
    {
      category: "Frontend Technologies",
      items: ["React", "Svelte", "JavaScript", "TypeScript", "React Native", "HTML/CSS"]
    },
    {
      category: "Backend Technologies",
      items: ["Node.js", "C#", "ASP.NET", "T-SQL", "REST APIs", ".NET Core", "Entity Framework"]
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Azure", "Heroku", "Salesforce", "Keycloak", "Docker", "Kubernetes"]
    },
    {
      category: "Databases & Storage",
      items: ["T-SQL", "Firebase", "Redis", "Database Design", "MongoDB", "PostgreSQL"]
    },
    {
      category: "Third-Party Integrations",
      items: ["Stripe", "Twilio", "SendGrid", "Custom QR Components"]
    }
  ]
};
