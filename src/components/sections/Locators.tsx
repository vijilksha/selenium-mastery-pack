import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const Locators = () => {
  const section = sections.find(s => s.id === 'locators')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={4} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Locators</h3>
        <CodeBlock
          title="Basic Locator Examples"
          code={`// By ID
driver.findElement(By.id("loginBtn"));

// By Name
driver.findElement(By.name("username"));

// By Class Name
driver.findElement(By.className("submit-btn"));

// By Tag Name
driver.findElement(By.tagName("input"));

// By Link Text
driver.findElement(By.linkText("Sign In"));

// By Partial Link Text
driver.findElement(By.partialLinkText("Sign"));`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">CSS Selectors & XPath</h3>
        <CodeBlock
          title="Advanced Locators"
          code={`// CSS Selectors
driver.findElement(By.cssSelector("#loginForm input[type='email']"));
driver.findElement(By.cssSelector(".form-group > .input-field"));

// XPath - Relative
driver.findElement(By.xpath("//input[@id='username']"));
driver.findElement(By.xpath("//button[contains(text(),'Submit')]"));
driver.findElement(By.xpath("//input[starts-with(@id,'user')]"));

// XPath Axes
driver.findElement(By.xpath("//div[@class='parent']//child::input"));
driver.findElement(By.xpath("//input[@id='email']/following-sibling::button"));`}
        />
      </div>
    </section>
  );
};
