import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const SeleniumBasics = () => {
  const section = sections.find(s => s.id === 'selenium-basics')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={1} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">What is Selenium?</h3>
        <p className="text-muted-foreground leading-relaxed">
          Selenium is an open-source web automation framework for testing web applications across different browsers and platforms. It supports multiple programming languages including Java, Python, C#, and JavaScript.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Selenium Components</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Selenium IDE', desc: 'Record and playback browser extension' },
            { name: 'Selenium WebDriver', desc: 'Core automation API for browser control' },
            { name: 'Selenium Grid', desc: 'Parallel execution across machines' },
            { name: 'Selenium RC', desc: 'Deprecated, replaced by WebDriver' },
          ].map(item => (
            <div key={item.name} className="p-4 bg-card rounded-xl border border-border">
              <h4 className="font-semibold text-foreground">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">WebDriver Architecture</h3>
        <CodeBlock
          title="Basic WebDriver Example"
          code={`// Initialize ChromeDriver
WebDriver driver = new ChromeDriver();

// Navigate to URL
driver.get("https://www.coursera.org");

// Get page title
String title = driver.getTitle();
System.out.println("Page Title: " + title);

// Close browser
driver.quit();`}
        />
      </div>
    </section>
  );
};
