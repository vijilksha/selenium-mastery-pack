import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const WaitStrategies = () => {
  const section = sections.find(s => s.id === 'wait-strategies')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={6} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Explicit Wait (Recommended)</h3>
        <CodeBlock
          title="WebDriverWait Examples"
          code={`WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for visibility
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("loading"))
);

// Wait for clickable
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit"))).click();

// Wait for URL
wait.until(ExpectedConditions.urlContains("/dashboard"));

// Wait for text
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.id("status"), "Complete"
));`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Fluent Wait</h3>
        <CodeBlock
          title="FluentWait Configuration"
          code={`Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class)
    .ignoring(StaleElementReferenceException.class);

WebElement element = fluentWait.until(driver -> 
    driver.findElement(By.id("dynamicElement"))
);`}
        />
      </div>
    </section>
  );
};
