import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import PortfolioSection from "../components/PortfolioSection";
import ResumeSection from "../components/ResumeSection";
import ContactSection from "../components/ContactSection";
import { resumeData } from "../data/resume";

// Prepare portfolio data
const portfolioProjects = [
  ...resumeData.projects.map((project) => ({
    id: parseInt(project.id),
    name: project.name,
    url: project.liveUrl,
    technologies: project.technologies,
    type: "personal" as const
  })),
  // Add professional projects from experience
  {
    id: 101,
    name: "OLI Systems",
    url: "https://www.olisystems.com/",
    technologies: ["JAVASCRIPT", "SVELTE", "NODE-JS", "AWS", "KEYCLOAK", "SALESFORCE"],
    type: "professional" as const
  },
  {
    id: 102,
    name: "Outlayr",
    technologies: [
      "REACT",
      "JAVASCRIPT",
      "C#",
      "ASP.NET",
      "T-SQL",
      "SENDGRID",
      "TWILIO",
      "AWS",
      "AZURE"
    ],
    type: "professional" as const
  },
  {
    id: 103,
    name: "Source One Inventory Solutions",
    url: "https://eventi-solutions.azurewebsites.net/",
    technologies: ["CUSTOM WEBSITES"],
    type: "professional" as const
  },
  {
    id: 104,
    name: "Force Tracker",
    url: "https://forcetracker.azurewebsites.net/",
    technologies: ["REACT", "JAVASCRIPT", "C#", "ASP.NET", "T-SQL"],
    type: "professional" as const
  }
];

const IndexPage = () => (
  <Layout
    personalInfo={resumeData.personalInfo}
    title={`${resumeData.personalInfo.name} - ${resumeData.personalInfo.title}`}
    description={resumeData.personalInfo.summary}
  >
    <HeroSection personalInfo={resumeData.personalInfo} />
    <ServicesSection />
    <PortfolioSection
      projects={portfolioProjects}
      title="My Professional Portfolio"
      type="professional"
    />
    <PortfolioSection projects={portfolioProjects} title="My Personal Portfolio" type="personal" />
    <ResumeSection
      experiences={resumeData.experience}
      education={resumeData.education}
      skills={resumeData.skills}
    />
    <ContactSection personalInfo={resumeData.personalInfo} />
  </Layout>
);

export default IndexPage;
