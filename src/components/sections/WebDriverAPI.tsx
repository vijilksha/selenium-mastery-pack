import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const WebDriverAPI = () => {
  const section = sections.find(s => s.id === 'webdriver-api')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={3} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">WebDriver Interface Methods</h3>
        <p className="text-muted-foreground leading-relaxed">
          The WebDriver interface provides essential methods for browser control and navigation.
        </p>
        <CodeBlock
          title="WebDriver Navigation & Browser Methods"
          code={`// Navigation Methods
driver.get("https://www.coursera.org");  // Navigate to URL (waits for page load)
driver.navigate().to("https://www.bookmyshow.com");  // Navigate to URL
driver.navigate().back();     // Browser back button
driver.navigate().forward();  // Browser forward button
driver.navigate().refresh();  // Refresh current page

// Browser Information
String title = driver.getTitle();           // Get page title
String url = driver.getCurrentUrl();        // Get current URL
String pageSource = driver.getPageSource(); // Get page HTML source

// Window Management
driver.manage().window().maximize();        // Maximize window
driver.manage().window().minimize();        // Minimize window (Selenium 4)
driver.manage().window().fullscreen();      // Fullscreen mode

// Set window size and position
driver.manage().window().setSize(new Dimension(1920, 1080));
driver.manage().window().setPosition(new Point(0, 0));

// Get window size and position
Dimension size = driver.manage().window().getSize();
Point position = driver.manage().window().getPosition();

// Close browser
driver.close();  // Close current window only
driver.quit();   // Close all windows and end session`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">WebElement Methods</h3>
        <p className="text-muted-foreground leading-relaxed">
          WebElement represents an HTML element. These methods allow interaction with page elements.
        </p>
        <CodeBlock
          title="WebElement Interactions"
          code={`// Finding Elements
WebElement element = driver.findElement(By.id("username"));
List<WebElement> elements = driver.findElements(By.className("course-card"));

// Basic Actions
element.sendKeys("testuser@coursera.org");  // Type text
element.click();                             // Click element
element.clear();                             // Clear text field
element.submit();                            // Submit form

// Getting Information
String text = element.getText();                     // Visible text
String value = element.getAttribute("value");        // Attribute value
String cssValue = element.getCssValue("color");      // CSS property
String tagName = element.getTagName();               // HTML tag name
String ariaRole = element.getAriaRole();             // ARIA role (Selenium 4)
String accessibleName = element.getAccessibleName(); // Accessible name (Selenium 4)

// Element State
boolean isDisplayed = element.isDisplayed();  // Visible on page
boolean isEnabled = element.isEnabled();      // Not disabled
boolean isSelected = element.isSelected();    // For checkboxes/radio/options

// Element Size and Location
Dimension size = element.getSize();
Point location = element.getLocation();
Rectangle rect = element.getRect();  // Size + location combined

// Element Screenshot (Selenium 4)
File screenshot = element.getScreenshotAs(OutputType.FILE);

// Shadow DOM (Selenium 4)
SearchContext shadowRoot = element.getShadowRoot();`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Actions Class - Advanced Interactions</h3>
        <p className="text-muted-foreground leading-relaxed">
          The Actions class handles complex user interactions like mouse hover, drag-drop, and keyboard combinations.
        </p>
        <CodeBlock
          title="Actions Class Examples"
          code={`Actions actions = new Actions(driver);

// Mouse Actions
actions.moveToElement(element).perform();              // Hover
actions.click(element).perform();                       // Click
actions.doubleClick(element).perform();                 // Double-click
actions.contextClick(element).perform();                // Right-click
actions.clickAndHold(element).perform();                // Click and hold
actions.release().perform();                            // Release mouse

// Drag and Drop
actions.dragAndDrop(source, target).perform();          // Drag to element
actions.dragAndDropBy(element, xOffset, yOffset).perform();  // Drag by pixels

// Click at offset from element center
actions.moveToElement(element, 10, 20).click().perform();

// Keyboard Actions
actions.sendKeys(Keys.ENTER).perform();
actions.sendKeys(Keys.TAB).perform();
actions.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL).perform(); // Ctrl+A
actions.keyDown(Keys.SHIFT).click(element).keyUp(Keys.SHIFT).perform();    // Shift+Click

// Chained Actions (Coursera - Navigate menu)
WebElement menuItem = driver.findElement(By.id("exploreMenu"));
WebElement subMenuItem = driver.findElement(By.linkText("Data Science"));

actions.moveToElement(menuItem)
       .pause(Duration.ofMillis(500))
       .moveToElement(subMenuItem)
       .click()
       .perform();

// Scroll Actions (Selenium 4)
actions.scrollToElement(element).perform();
actions.scrollByAmount(0, 500).perform();  // Scroll by pixels

// BookMyShow - Seat Selection with Click and Hold
WebElement seatA1 = driver.findElement(By.id("seat-A1"));
WebElement seatA5 = driver.findElement(By.id("seat-A5"));
actions.click(seatA1)
       .keyDown(Keys.SHIFT)
       .click(seatA5)
       .keyUp(Keys.SHIFT)
       .perform();  // Select range of seats`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">JavaScript Executor</h3>
        <p className="text-muted-foreground leading-relaxed">
          JavaScriptExecutor allows executing JavaScript code directly in the browser, useful for complex scenarios.
        </p>
        <CodeBlock
          title="JavaScriptExecutor Examples"
          code={`JavascriptExecutor js = (JavascriptExecutor) driver;

// Click element (useful when regular click fails)
js.executeScript("arguments[0].click();", element);

// Scroll operations
js.executeScript("window.scrollTo(0, document.body.scrollHeight);");  // Scroll to bottom
js.executeScript("window.scrollTo(0, 0);");                            // Scroll to top
js.executeScript("arguments[0].scrollIntoView(true);", element);       // Scroll to element
js.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);  // Scroll to center

// Set value (bypass sendKeys issues)
js.executeScript("arguments[0].value = arguments[1];", inputField, "text value");

// Get element properties
String innerText = (String) js.executeScript("return arguments[0].innerText;", element);
String innerHTML = (String) js.executeScript("return arguments[0].innerHTML;", element);

// Highlight element (useful for debugging)
js.executeScript("arguments[0].style.border='3px solid red';", element);

// Remove readonly attribute
js.executeScript("arguments[0].removeAttribute('readonly');", element);

// Open new tab
js.executeScript("window.open('https://www.coursera.org', '_blank');");

// Get page ready state
String readyState = (String) js.executeScript("return document.readyState;");
// Returns: "loading", "interactive", or "complete"

// Trigger events
js.executeScript("arguments[0].dispatchEvent(new Event('change'));", element);

// Wait for Angular/React apps
js.executeScript("return angular.element(document).injector().get('$http').pendingRequests.length === 0;");

// Get element by JavaScript
WebElement element = (WebElement) js.executeScript(
    "return document.querySelector('#dynamicElement');"
);

// Execute async script
js.executeAsyncScript(
    "var callback = arguments[arguments.length - 1];" +
    "setTimeout(function() { callback('done'); }, 3000);"
);`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Select Class - Dropdown Handling</h3>
        <CodeBlock
          title="Select Class for Dropdowns"
          code={`// Select class for <select> elements
WebElement dropdown = driver.findElement(By.id("country"));
Select select = new Select(dropdown);

// Selection methods
select.selectByVisibleText("India");      // By visible text
select.selectByValue("IN");                // By value attribute
select.selectByIndex(5);                   // By index (0-based)

// Get selected option
WebElement selectedOption = select.getFirstSelectedOption();
String selectedText = selectedOption.getText();

// Get all options
List<WebElement> allOptions = select.getOptions();
for (WebElement option : allOptions) {
    System.out.println(option.getText());
}

// Check if multi-select
boolean isMultiple = select.isMultiple();

// Multi-select operations
if (select.isMultiple()) {
    select.selectByVisibleText("Java");
    select.selectByVisibleText("Python");
    select.selectByVisibleText("JavaScript");
    
    // Get all selected options
    List<WebElement> selectedOptions = select.getAllSelectedOptions();
    
    // Deselect options
    select.deselectByVisibleText("Java");
    select.deselectByIndex(1);
    select.deselectByValue("js");
    select.deselectAll();  // Deselect all
}

// Custom dropdown (non-select element) - BookMyShow City
WebElement cityDropdown = driver.findElement(By.xpath("//div[@class='city-selector']"));
cityDropdown.click();

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("city-list")));

driver.findElement(By.xpath("//li[text()='Mumbai']")).click();`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Timeouts Configuration</h3>
        <CodeBlock
          title="WebDriver Timeout Settings"
          code={`// Implicit Wait - applies to all findElement calls
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// Page Load Timeout - max time to wait for page load
driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));

// Script Timeout - max time for async JavaScript
driver.manage().timeouts().scriptTimeout(Duration.ofSeconds(30));

// Best Practice: Set timeouts in BaseTest setup
@BeforeMethod
public void setup() {
    driver = new ChromeDriver();
    driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
    driver.manage().window().maximize();
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Cookie Management</h3>
        <CodeBlock
          title="Cookie Operations"
          code={`// Get all cookies
Set<Cookie> allCookies = driver.manage().getCookies();
for (Cookie cookie : allCookies) {
    System.out.println(cookie.getName() + " = " + cookie.getValue());
}

// Get specific cookie by name
Cookie sessionCookie = driver.manage().getCookieNamed("session_id");

// Add new cookie
Cookie newCookie = new Cookie("user_preference", "dark_mode");
driver.manage().addCookie(newCookie);

// Add cookie with all properties
Cookie fullCookie = new Cookie.Builder("auth_token", "abc123xyz")
    .domain(".coursera.org")
    .path("/")
    .expiresOn(new Date(System.currentTimeMillis() + 86400000))  // 1 day
    .isSecure(true)
    .isHttpOnly(true)
    .build();
driver.manage().addCookie(fullCookie);

// Delete cookie
driver.manage().deleteCookieNamed("session_id");
driver.manage().deleteCookie(sessionCookie);
driver.manage().deleteAllCookies();

// Login bypass using cookies (skip login page)
@Test
public void testWithCookieLogin() {
    driver.get("https://www.coursera.org");
    
    // Add authentication cookies obtained from manual login
    driver.manage().addCookie(new Cookie("CAUTH", "saved_auth_value"));
    driver.manage().addCookie(new Cookie("__204u", "saved_user_id"));
    
    // Refresh to apply cookies
    driver.navigate().refresh();
    
    // User should now be logged in
    Assert.assertTrue(homePage.isLoggedIn());
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Taking Screenshots</h3>
        <CodeBlock
          title="Screenshot Capture Methods"
          code={`// Full page screenshot
TakesScreenshot ts = (TakesScreenshot) driver;
File source = ts.getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(source, new File("screenshots/fullpage.png"));

// Get as Base64 string (for reports)
String base64Screenshot = ts.getScreenshotAs(OutputType.BASE64);

// Get as bytes
byte[] screenshotBytes = ts.getScreenshotAs(OutputType.BYTES);

// Element screenshot (Selenium 4)
WebElement logo = driver.findElement(By.id("logo"));
File elementScreenshot = logo.getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(elementScreenshot, new File("screenshots/logo.png"));

// Screenshot utility method
public static String captureScreenshot(WebDriver driver, String testName) {
    try {
        TakesScreenshot ts = (TakesScreenshot) driver;
        File source = ts.getScreenshotAs(OutputType.FILE);
        
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss")
                          .format(new Date());
        String destination = "screenshots/" + testName + "_" + timestamp + ".png";
        
        FileUtils.copyFile(source, new File(destination));
        return destination;
    } catch (IOException e) {
        return null;
    }
}

// Full page screenshot with scroll (for long pages)
public static void captureFullPageScreenshot(WebDriver driver, String fileName) {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    
    // Get total page height
    long pageHeight = (long) js.executeScript("return document.body.scrollHeight");
    long viewportHeight = (long) js.executeScript("return window.innerHeight");
    
    int parts = (int) Math.ceil((double) pageHeight / viewportHeight);
    
    for (int i = 0; i < parts; i++) {
        js.executeScript("window.scrollTo(0, " + (i * viewportHeight) + ")");
        Thread.sleep(200);
        
        TakesScreenshot ts = (TakesScreenshot) driver;
        File source = ts.getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(source, new File("screenshots/" + fileName + "_part" + i + ".png"));
    }
}`}
        />
      </div>
    </section>
  );
};
