import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { SeleniumBasics } from '@/components/sections/SeleniumBasics';
import { ProjectSetup } from '@/components/sections/ProjectSetup';
import { WebDriverAPI } from '@/components/sections/WebDriverAPI';
import { Locators } from '@/components/sections/Locators';
import { LocatorBestPractices } from '@/components/sections/LocatorBestPractices';
import { WaitStrategies } from '@/components/sections/WaitStrategies';
import { RealScripts } from '@/components/sections/RealScripts';
import { TestNGImplementation } from '@/components/sections/TestNGImplementation';
import { ExceptionHandling } from '@/components/sections/ExceptionHandling';
import { FrameworkBestPractices } from '@/components/sections/FrameworkBestPractices';
import { InterviewPrep } from '@/components/sections/InterviewPrep';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const [activeSection, setActiveSection] = useState('selenium-basics');

  return (
    <>
      <Helmet>
        <title>Selenium WebDriver Training | Complete Automation Course</title>
        <meta name="description" content="Master Selenium WebDriver with Java, TestNG, Maven and Page Object Model. Industry-ready automation training with real-world examples from Coursera, BookMyShow." />
      </Helmet>
      
      <div className="flex min-h-screen bg-background">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <main className="flex-1 lg:ml-72">
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-24">
            {/* Hero Section */}
            <header className="text-center space-y-6 py-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-primary font-medium">Industry-Ready Training</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Selenium WebDriver
                <span className="block text-primary">Automation Mastery</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Complete training pack with Java, TestNG, Maven & Page Object Model. 
                Learn with real-world applications: Coursera, BookMyShow, and Ticket Booking Systems.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <span className="px-4 py-2 bg-card rounded-lg border border-border text-sm">
                  11 Comprehensive Sections
                </span>
                <span className="px-4 py-2 bg-card rounded-lg border border-border text-sm">
                  Real-World Projects
                </span>
                <span className="px-4 py-2 bg-card rounded-lg border border-border text-sm">
                  Interview Ready
                </span>
              </div>
            </header>

            {/* All Sections */}
            <SeleniumBasics />
            <ProjectSetup />
            <WebDriverAPI />
            <Locators />
            <LocatorBestPractices />
            <WaitStrategies />
            <RealScripts />
            <TestNGImplementation />
            <ExceptionHandling />
            <FrameworkBestPractices />
            <InterviewPrep />
            
            {/* Footer */}
            <footer className="text-center py-12 border-t border-border">
              <p className="text-muted-foreground">
                Selenium WebDriver Automation Training Pack
              </p>
              <p className="text-sm text-muted-foreground/60 mt-2">
                Designed for Manual → Automation Testers
              </p>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
