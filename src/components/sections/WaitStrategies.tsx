import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const WaitStrategies = () => {
  const section = sections.find(s => s.id === 'wait-strategies')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={6} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Why Waits Are Essential</h3>
        <p className="text-muted-foreground leading-relaxed">
          Modern web applications are dynamic - elements load asynchronously via AJAX, JavaScript, and animations. 
          Without proper waits, tests fail with NoSuchElementException or interact with elements before they're ready.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
            <h4 className="font-semibold text-destructive mb-2">Thread.sleep()</h4>
            <p className="text-sm text-muted-foreground">Static wait - always waits full duration. Slows tests, unreliable. Never use!</p>
          </div>
          <div className="p-4 bg-muted rounded-xl border border-border">
            <h4 className="font-semibold text-foreground mb-2">Implicit Wait</h4>
            <p className="text-sm text-muted-foreground">Global wait for findElement. Simple but limited. Use sparingly.</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">Explicit Wait</h4>
            <p className="text-sm text-muted-foreground">Condition-specific wait. Recommended approach for reliability!</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Implicit Wait</h3>
        <p className="text-muted-foreground leading-relaxed">
          Implicit wait sets a global timeout for all findElement() calls. The driver polls the DOM until the element is found or timeout expires.
        </p>
        <CodeBlock
          title="Implicit Wait Setup"
          code={`// Set implicit wait (applies to all findElement calls)
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// How it works:
// - Driver waits up to 10 seconds for element to appear
// - Polls DOM periodically (usually every 500ms)
// - Returns immediately when element is found
// - Throws NoSuchElementException if not found within timeout

// Typical setup in BaseTest
@BeforeMethod
public void setup() {
    driver = new ChromeDriver();
    driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
}

// Limitations of Implicit Wait:
// 1. Cannot wait for specific conditions (visibility, clickability)
// 2. Applies globally - can slow down findElements when checking non-existence
// 3. Can cause unexpected waits when mixed with explicit waits
// 4. Only waits for presence in DOM, not visibility or interactability`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Explicit Wait (Recommended)</h3>
        <p className="text-muted-foreground leading-relaxed">
          Explicit wait waits for a specific condition to be true before proceeding. This is the recommended approach for reliable tests.
        </p>
        <CodeBlock
          title="WebDriverWait with ExpectedConditions"
          code={`// Create WebDriverWait instance
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// ============ VISIBILITY CONDITIONS ============

// Wait for element to be visible
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("loading-complete"))
);

// Wait for element to be visible (using WebElement)
WebElement foundElement = driver.findElement(By.id("element"));
wait.until(ExpectedConditions.visibilityOf(foundElement));

// Wait for element to become invisible
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("spinner")));

// Wait for text to be present
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.id("status"), "Complete"
));

// ============ CLICKABILITY CONDITIONS ============

// Wait for element to be clickable (visible + enabled)
WebElement button = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("submitBtn"))
);
button.click();

// ============ PRESENCE CONDITIONS ============

// Wait for element to be present in DOM (not necessarily visible)
WebElement element = wait.until(
    ExpectedConditions.presenceOfElementLocated(By.id("hiddenElement"))
);

// Wait for all elements to be present
List<WebElement> elements = wait.until(
    ExpectedConditions.presenceOfAllElementsLocatedBy(By.className("course-card"))
);

// ============ FRAME CONDITIONS ============

// Wait and switch to frame
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id("iframe")));
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frameName"));
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(0));  // By index

// ============ ALERT CONDITIONS ============

// Wait for alert to be present
Alert alert = wait.until(ExpectedConditions.alertIsPresent());

// ============ URL & TITLE CONDITIONS ============

// Wait for URL
wait.until(ExpectedConditions.urlContains("/dashboard"));
wait.until(ExpectedConditions.urlToBe("https://www.coursera.org/browse"));
wait.until(ExpectedConditions.urlMatches(".*coursera\\.org/course/.*"));

// Wait for title
wait.until(ExpectedConditions.titleContains("Coursera"));
wait.until(ExpectedConditions.titleIs("Coursera | Online Courses"));`}
        />
        <CodeBlock
          title="More ExpectedConditions"
          code={`// ============ ELEMENT STATE CONDITIONS ============

// Wait for element to be selected (checkbox/radio)
wait.until(ExpectedConditions.elementToBeSelected(By.id("agreeCheckbox")));

// Wait for element selection state
wait.until(ExpectedConditions.elementSelectionStateToBe(
    By.id("option1"), true  // Should be selected
));

// Wait for element to become stale (removed from DOM)
WebElement oldElement = driver.findElement(By.id("dynamicContent"));
// Trigger page change...
wait.until(ExpectedConditions.stalenessOf(oldElement));

// Wait for specific attribute value
wait.until(ExpectedConditions.attributeToBe(
    By.id("status"), "class", "completed"
));

// Wait for attribute to contain value
wait.until(ExpectedConditions.attributeContains(
    By.id("progress"), "style", "width: 100%"
));

// ============ WINDOW CONDITIONS ============

// Wait for number of windows
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

// ============ COMBINING CONDITIONS ============

// Wait for ANY condition (OR)
wait.until(ExpectedConditions.or(
    ExpectedConditions.visibilityOfElementLocated(By.id("success")),
    ExpectedConditions.visibilityOfElementLocated(By.id("error"))
));

// Wait for ALL conditions (AND)
wait.until(ExpectedConditions.and(
    ExpectedConditions.visibilityOfElementLocated(By.id("form")),
    ExpectedConditions.elementToBeClickable(By.id("submit"))
));

// Wait for condition to be false (NOT)
wait.until(ExpectedConditions.not(
    ExpectedConditions.visibilityOfElementLocated(By.id("loading"))
));`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Fluent Wait</h3>
        <p className="text-muted-foreground leading-relaxed">
          Fluent wait provides more control with custom polling intervals and exception handling.
        </p>
        <CodeBlock
          title="FluentWait Configuration"
          code={`// Create FluentWait with custom configuration
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))           // Maximum wait time
    .pollingEvery(Duration.ofMillis(500))          // Check every 500ms
    .ignoring(NoSuchElementException.class)        // Ignore during polling
    .ignoring(StaleElementReferenceException.class)
    .withMessage("Element was not found within 30 seconds");

// Use with lambda for custom condition
WebElement element = fluentWait.until(driver -> {
    WebElement el = driver.findElement(By.id("dynamicElement"));
    return el.isDisplayed() ? el : null;
});

// Wait for element to have specific text
String text = fluentWait.until(driver -> {
    WebElement el = driver.findElement(By.id("status"));
    return el.getText().equals("Complete") ? el.getText() : null;
});

// Wait for list to have items
List<WebElement> items = fluentWait.until(driver -> {
    List<WebElement> elements = driver.findElements(By.className("search-result"));
    return elements.size() > 0 ? elements : null;
});

// Wait for element count to reach specific number
fluentWait.until(driver -> {
    int count = driver.findElements(By.className("item")).size();
    return count >= 10 ? true : null;
});

// Coursera - Wait for courses to load
Wait<WebDriver> courseWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(20))
    .pollingEvery(Duration.ofSeconds(1))
    .ignoring(NoSuchElementException.class);

List<WebElement> courses = courseWait.until(d -> {
    List<WebElement> cards = d.findElements(By.className("course-card"));
    System.out.println("Found " + cards.size() + " courses...");
    return cards.size() >= 5 ? cards : null;
});`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Custom Expected Conditions</h3>
        <CodeBlock
          title="Creating Custom Wait Conditions"
          code={`// Custom condition using lambda
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for element to have non-empty text
wait.until(driver -> {
    WebElement el = driver.findElement(By.id("result"));
    return !el.getText().isEmpty();
});

// Wait for AJAX call to complete (jQuery)
wait.until(driver -> {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    return (Boolean) js.executeScript("return jQuery.active == 0");
});

// Wait for Angular to complete
wait.until(driver -> {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    return (Boolean) js.executeScript(
        "return angular.element(document).injector().get('$http').pendingRequests.length === 0"
    );
});

// Wait for page to be fully loaded
wait.until(driver -> {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    return js.executeScript("return document.readyState").equals("complete");
});

// Custom ExpectedCondition class
public class CustomConditions {
    
    public static ExpectedCondition<Boolean> elementHasClass(
            final By locator, final String className) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                WebElement element = driver.findElement(locator);
                String classes = element.getAttribute("class");
                return classes != null && classes.contains(className);
            }
            
            @Override
            public String toString() {
                return "element to have class: " + className;
            }
        };
    }
    
    public static ExpectedCondition<Boolean> elementCountGreaterThan(
            final By locator, final int count) {
        return driver -> driver.findElements(locator).size() > count;
    }
    
    public static ExpectedCondition<WebElement> elementHasAttribute(
            final By locator, final String attribute, final String value) {
        return driver -> {
            WebElement element = driver.findElement(locator);
            String attrValue = element.getAttribute(attribute);
            return value.equals(attrValue) ? element : null;
        };
    }
}

// Usage
wait.until(CustomConditions.elementHasClass(By.id("button"), "active"));
wait.until(CustomConditions.elementCountGreaterThan(By.className("item"), 5));`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Wait Helper Utility Class</h3>
        <CodeBlock
          title="WaitHelper.java - Reusable Wait Methods"
          code={`public class WaitHelper {
    
    private WebDriver driver;
    private WebDriverWait wait;
    private int defaultTimeout = 10;
    
    public WaitHelper(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(defaultTimeout));
    }
    
    public WaitHelper(WebDriver driver, int timeoutSeconds) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
        this.defaultTimeout = timeoutSeconds;
    }
    
    // Wait for element to be visible
    public WebElement waitForVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }
    
    // Wait for element to be clickable and click
    public void waitAndClick(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }
    
    // Wait for element and send keys
    public void waitAndType(By locator, String text) {
        WebElement element = wait.until(
            ExpectedConditions.visibilityOfElementLocated(locator)
        );
        element.clear();
        element.sendKeys(text);
    }
    
    // Wait for element to disappear
    public boolean waitForInvisible(By locator) {
        return wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }
    
    // Wait for text to be present
    public boolean waitForText(By locator, String text) {
        return wait.until(
            ExpectedConditions.textToBePresentInElementLocated(locator, text)
        );
    }
    
    // Wait for page load complete
    public void waitForPageLoad() {
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return js.executeScript("return document.readyState").equals("complete");
        });
    }
    
    // Wait for spinner/loader to disappear
    public void waitForLoaderToDisappear() {
        try {
            // Wait for loader to appear (might already be gone)
            new WebDriverWait(driver, Duration.ofSeconds(2)).until(
                ExpectedConditions.visibilityOfElementLocated(By.className("loader"))
            );
        } catch (TimeoutException e) {
            // Loader already gone or never appeared
        }
        // Wait for loader to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("loader")));
    }
    
    // Wait for URL to contain
    public boolean waitForUrlContains(String urlPart) {
        return wait.until(ExpectedConditions.urlContains(urlPart));
    }
    
    // Wait with custom timeout
    public WebElement waitForVisible(By locator, int seconds) {
        WebDriverWait customWait = new WebDriverWait(driver, Duration.ofSeconds(seconds));
        return customWait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }
}

// Usage in tests
public class BookingTest extends BaseTest {
    private WaitHelper waitHelper;
    
    @BeforeMethod
    public void setup() {
        super.setup();
        waitHelper = new WaitHelper(driver, 15);
    }
    
    @Test
    public void testMovieBooking() {
        driver.get("https://www.bookmyshow.com");
        
        waitHelper.waitAndClick(By.id("searchBtn"));
        waitHelper.waitAndType(By.id("searchInput"), "Jawan");
        waitHelper.waitForVisible(By.className("search-results"));
        waitHelper.waitAndClick(By.xpath("//div[@class='movie-card'][1]"));
        waitHelper.waitForLoaderToDisappear();
        waitHelper.waitForUrlContains("/movie/");
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
            <h4 className="font-semibold text-primary mb-3">✅ DO</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use explicit waits for specific conditions</li>
              <li>• Create reusable wait helper methods</li>
              <li>• Wait for elements before interacting</li>
              <li>• Use appropriate timeouts (not too long)</li>
              <li>• Wait for loaders/spinners to disappear</li>
              <li>• Use custom conditions for complex scenarios</li>
            </ul>
          </div>
          <div className="p-5 bg-destructive/10 rounded-xl border border-destructive/20">
            <h4 className="font-semibold text-destructive mb-3">❌ DON'T</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use Thread.sleep() - ever!</li>
              <li>• Mix implicit and explicit waits</li>
              <li>• Use very long timeouts (60+ seconds)</li>
              <li>• Wait for presence when you need visibility</li>
              <li>• Ignore StaleElementReferenceException</li>
              <li>• Use waits to hide flaky tests</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
