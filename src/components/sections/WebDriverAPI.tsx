import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const WebDriverAPI = () => {
  const section = sections.find(s => s.id === 'webdriver-api')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={3} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">WebDriver Methods</h3>
        <CodeBlock
          title="WebDriver Navigation"
          code={`driver.get("https://www.bookmyshow.com");
driver.navigate().to("https://www.coursera.org");
driver.navigate().back();
driver.navigate().forward();
driver.navigate().refresh();

String title = driver.getTitle();
String url = driver.getCurrentUrl();

driver.close();  // Close current window
driver.quit();   // Close all windows`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">WebElement Methods</h3>
        <CodeBlock
          title="WebElement Interactions"
          code={`WebElement element = driver.findElement(By.id("username"));

element.sendKeys("testuser@email.com");
element.click();
element.clear();

String text = element.getText();
String value = element.getAttribute("value");

boolean displayed = element.isDisplayed();
boolean enabled = element.isEnabled();
boolean selected = element.isSelected();`}
        />
      </div>
    </section>
  );
};
