import { LucideIcon, BookOpen, FolderCog, Code, Target, CheckCircle, Clock, FileCode, TestTube, AlertTriangle, Layers, GraduationCap, Cpu } from 'lucide-react';

export interface Section {
  id: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export const sections: Section[] = [
  { id: 'selenium-basics', title: 'Selenium Basics', shortTitle: 'Basics', icon: BookOpen, color: 'section-basics', description: 'Core concepts and architecture' },
  { id: 'project-setup', title: 'Project Setup', shortTitle: 'Setup', icon: FolderCog, color: 'section-setup', description: 'Maven, folder structure, configs' },
  { id: 'webdriver-api', title: 'WebDriver API', shortTitle: 'API', icon: Code, color: 'section-api', description: 'Complete method reference' },
  { id: 'locators', title: 'Locators', shortTitle: 'Locators', icon: Target, color: 'section-locators', description: 'Basic to advanced locators' },
  { id: 'locator-best-practices', title: 'Locator Best Practices', shortTitle: 'Best Practices', icon: CheckCircle, color: 'section-practices', description: 'Corporate standards' },
  { id: 'wait-strategies', title: 'Wait Strategies', shortTitle: 'Waits', icon: Clock, color: 'section-waits', description: 'Synchronization techniques' },
  { id: 'real-scripts', title: 'Real Automation Scripts', shortTitle: 'Scripts', icon: FileCode, color: 'section-scripts', description: 'Complete project examples' },
  { id: 'testng-implementation', title: 'TestNG Implementation', shortTitle: 'TestNG', icon: TestTube, color: 'section-testng', description: 'Annotations and execution' },
  { id: 'exception-handling', title: 'Exception Handling', shortTitle: 'Exceptions', icon: AlertTriangle, color: 'section-exceptions', description: 'Alerts, frames, windows' },
  { id: 'framework-best-practices', title: 'Framework Best Practices', shortTitle: 'Framework', icon: Layers, color: 'section-framework', description: 'POM, logging, reporting' },
  { id: 'advanced-concepts', title: 'Shadow DOM & Advanced', shortTitle: 'Advanced', icon: Cpu, color: 'section-advanced', description: 'Shadow DOM, headless, CDP' },
  { id: 'interview-prep', title: 'Interview & Real Project', shortTitle: 'Interview', icon: GraduationCap, color: 'section-interview', description: 'Questions and explanations' },
];
