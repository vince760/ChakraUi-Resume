// Typed shape for the interactive terminal resume. Kept separate from the
// rendering so the content is easy to edit in one place.

export interface TerminalExperience {
  org: string;
  title: string;
  time: string;
  sub: string;
  points: string[];
}

export interface TerminalProject {
  name: string;
  context: string;
  stack: string;
  points: string[];
}

export interface TerminalEducation {
  deg: string;
  focus: string;
  school: string;
  time: string;
}

export interface TerminalSkillGroup {
  label: string;
  items: string[];
}

export interface TerminalResume {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  links: {
    linkedin: string;
    github: string;
    site: string;
  };
  summary: string;
  experience: TerminalExperience[];
  project: TerminalProject;
  skills: TerminalSkillGroup[];
  education: TerminalEducation[];
  background: string;
}
