import { ResumeData } from "../types/resume";

export const resumeData: ResumeData = {
  personalInfo: {
    name: "VINCENT VITALE",
    title: "Full Stack Software Developer",
    email: "Vincent.Vitale87@gmail.com",
    phone: "+760-421-2936",
    location: "California",
    website: "https://vincent-vitale.com",
    linkedin: "https://www.linkedin.com/in/vincent-vitale-v/",
    github: "https://github.com/vince760",
    summary:
      "7+ years of experience in full stack development with expertise in modern web technologies."
  },
  experience: [
    {
      id: "1",
      company: "OLI Systems",
      position: "Fullstack Software Developer",
      location: "Remote",
      startDate: "2022",
      endDate: null,
      description: [
        "Full stack development using Svelte, JavaScript, and Node.js",
        "Implemented AWS cloud solutions and Keycloak authentication",
        "Integrated Salesforce APIs for enterprise solutions"
      ],
      technologies: ["JavaScript", "Svelte", "Node.js", "AWS", "Keycloak", "Salesforce"]
    },
    {
      id: "2",
      company: "Outlayr",
      position: "Software Developer",
      location: "Remote",
      startDate: "2020",
      endDate: "2022",
      description: [
        "Developed React applications with C# ASP.NET backend",
        "Managed T-SQL databases and cloud deployments",
        "Implemented SendGrid and Twilio integrations"
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
      startDate: "2020",
      endDate: "2020",
      description: [
        "Built custom inventory management websites",
        "Developed responsive web solutions"
      ],
      technologies: ["Custom Websites"]
    },
    {
      id: "4",
      company: "Force Tracker",
      position: "Full Stack Developer",
      location: "Remote",
      startDate: "2020",
      endDate: "2020",
      description: [
        "Created tracking applications using React",
        "Implemented .NET backend solutions with T-SQL"
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
      endDate: "2015",
      gpa: undefined,
      honors: []
    },
    {
      id: "2",
      institution: "South Dade Senior High School",
      degree: "High School Diploma",
      field: "High School/Secondary Diplomas and Certificates",
      startDate: "2001",
      endDate: "2004",
      gpa: undefined,
      honors: []
    }
  ],
  projects: [
    {
      id: "1",
      name: "Kid Coin",
      description:
        "React Native mobile application with Firebase backend for digital coin management",
      technologies: ["React Native", "Firebase", "JavaScript"],
      githubUrl: undefined,
      liveUrl: "https://kid-coin.netlify.app/"
    },
    {
      id: "2",
      name: "Meta-Match",
      description:
        "Matching application built with React and Node.js, deployed on Heroku with Redis caching",
      technologies: ["React", "JavaScript", "Node.js", "Redis", "Heroku"],
      githubUrl: undefined,
      liveUrl: undefined
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
        "Node",
        "Stripe",
        "Twilio",
        "SendGrid"
      ],
      githubUrl: undefined,
      liveUrl: "https://eventi-solutions.azurewebsites.net/"
    }
  ],
  skills: [
    {
      category: "Frontend Technologies",
      items: ["React", "Svelte", "JavaScript", "TypeScript", "React Native", "HTML/CSS"]
    },
    {
      category: "Backend Technologies",
      items: ["Node.js", "C#", "ASP.NET", "T-SQL", "REST APIs"]
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Azure", "Heroku", "Salesforce", "Keycloak"]
    },
    {
      category: "Databases & Storage",
      items: ["T-SQL", "Firebase", "Redis", "Database Design"]
    },
    {
      category: "Third-Party Integrations",
      items: ["Stripe", "Twilio", "SendGrid", "Custom QR Components"]
    }
  ]
};
