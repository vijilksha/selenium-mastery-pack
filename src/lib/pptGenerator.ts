import pptxgen from 'pptxgenjs';

interface SlideContent {
  title: string;
  content?: string[];
  code?: string;
  codeTitle?: string;
  codeExplanation?: string;
  bulletPoints?: string[];
  table?: { headers: string[]; rows: string[][] };
}

interface SectionPPTData {
  sectionTitle: string;
  sectionNumber: number;
  slides: SlideContent[];
}

const THEME = {
  background: 'FFFFFF',
  primary: '2563EB',
  secondary: '3B82F6',
  text: '1E293B',
  muted: '64748B',
  codeBg: 'F1F5F9',
  highlight: '1D4ED8',
  border: 'E2E8F0',
};

export const generateSectionPPT = async (data: SectionPPTData) => {
  const pptx = new pptxgen();
  
  // Set presentation properties
  pptx.author = 'Selenium Training Platform';
  pptx.title = data.sectionTitle;
  pptx.subject = 'Selenium WebDriver Training';
  
  // Define master slide
  pptx.defineSlideMaster({
    title: 'MAIN_SLIDE',
    background: { color: THEME.background },
  });

  // Title Slide
  const titleSlide = pptx.addSlide({ masterName: 'MAIN_SLIDE' });
  titleSlide.addText(`Section ${String(data.sectionNumber).padStart(2, '0')}`, {
    x: 0.5,
    y: 1.5,
    w: '90%',
    fontSize: 18,
    color: THEME.primary,
    fontFace: 'Arial',
  });
  titleSlide.addText(data.sectionTitle, {
    x: 0.5,
    y: 2,
    w: '90%',
    fontSize: 36,
    bold: true,
    color: THEME.text,
    fontFace: 'Arial',
  });
  titleSlide.addText('Selenium WebDriver Training Platform', {
    x: 0.5,
    y: 4.5,
    w: '90%',
    fontSize: 14,
    color: THEME.muted,
    fontFace: 'Arial',
  });

  // Content Slides
  for (const slideData of data.slides) {
    const slide = pptx.addSlide({ masterName: 'MAIN_SLIDE' });
    
    // Slide title
    slide.addText(slideData.title, {
      x: 0.5,
      y: 0.3,
      w: '90%',
      fontSize: 24,
      bold: true,
      color: THEME.primary,
      fontFace: 'Arial',
    });

    let currentY = 0.9;

    // Content paragraphs
    if (slideData.content && slideData.content.length > 0) {
      for (const paragraph of slideData.content) {
        slide.addText(paragraph, {
          x: 0.5,
          y: currentY,
          w: '90%',
          fontSize: 12,
          color: THEME.text,
          fontFace: 'Arial',
          breakLine: true,
        });
        currentY += 0.5;
      }
    }

    // Bullet points
    if (slideData.bulletPoints && slideData.bulletPoints.length > 0) {
      const bullets = slideData.bulletPoints.map(point => ({
        text: point,
        options: { bullet: { type: 'bullet' as const }, color: THEME.text },
      }));
      
      slide.addText(bullets, {
        x: 0.5,
        y: currentY,
        w: '90%',
        fontSize: 11,
        fontFace: 'Arial',
      });
      currentY += slideData.bulletPoints.length * 0.35;
    }

    // Code block with explanation
    if (slideData.code) {
      // Add code explanation before the code block
      if (slideData.codeExplanation) {
        slide.addText('💡 Code Explanation:', {
          x: 0.5,
          y: currentY,
          w: '90%',
          fontSize: 10,
          bold: true,
          color: THEME.secondary,
          fontFace: 'Arial',
        });
        currentY += 0.25;
        
        slide.addText(slideData.codeExplanation, {
          x: 0.5,
          y: currentY,
          w: '90%',
          fontSize: 9,
          color: THEME.muted,
          fontFace: 'Arial',
          breakLine: true,
        });
        currentY += 0.5;
      }

      if (slideData.codeTitle) {
        slide.addText(`📄 ${slideData.codeTitle}`, {
          x: 0.5,
          y: currentY,
          w: '90%',
          fontSize: 10,
          color: THEME.secondary,
          fontFace: 'Arial',
        });
        currentY += 0.25;
      }
      
      slide.addShape('rect', {
        x: 0.5,
        y: currentY,
        w: 9,
        h: Math.min(3.2, slideData.code.split('\n').length * 0.18 + 0.3),
        fill: { color: THEME.codeBg },
        line: { color: THEME.primary, width: 1 },
      });
      
      slide.addText(slideData.code, {
        x: 0.6,
        y: currentY + 0.1,
        w: 8.8,
        fontSize: 8,
        color: THEME.text,
        fontFace: 'Courier New',
        valign: 'top',
      });
    }

    // Table
    if (slideData.table) {
      const tableData = [
        slideData.table.headers.map(h => ({ text: h, options: { bold: true, fill: { color: THEME.codeBg }, color: THEME.primary } })),
        ...slideData.table.rows.map(row => 
          row.map(cell => ({ text: cell, options: { fill: { color: THEME.background }, color: THEME.text } }))
        ),
      ];
      
      slide.addTable(tableData, {
        x: 0.5,
        y: currentY,
        w: 9,
        fontSize: 9,
        fontFace: 'Arial',
        border: { type: 'solid', color: THEME.primary, pt: 0.5 },
      });
    }
  }

  // Thank you slide
  const endSlide = pptx.addSlide({ masterName: 'MAIN_SLIDE' });
  endSlide.addText('End of Section', {
    x: 0.5,
    y: 2,
    w: '90%',
    fontSize: 32,
    bold: true,
    color: THEME.primary,
    fontFace: 'Arial',
    align: 'center',
  });
  endSlide.addText(`${data.sectionTitle} - Completed`, {
    x: 0.5,
    y: 3,
    w: '90%',
    fontSize: 18,
    color: THEME.text,
    fontFace: 'Arial',
    align: 'center',
  });

  // Download
  await pptx.writeFile({ fileName: `Section_${String(data.sectionNumber).padStart(2, '0')}_${data.sectionTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pptx` });
};

// Section-specific content generators
export const sectionPPTContent: Record<string, SectionPPTData> = {
  'selenium-basics': {
    sectionTitle: 'Selenium Basics',
    sectionNumber: 1,
    slides: [
      {
        title: 'What is Selenium?',
        content: ['Selenium is an open-source automated testing framework for web applications.'],
        bulletPoints: [
          'Supports multiple browsers (Chrome, Firefox, Edge, Safari)',
          'Supports multiple programming languages (Java, Python, C#, JavaScript)',
          'Free and open-source with large community support',
          'Industry standard for web automation testing',
        ],
      },
      {
        title: 'Selenium Components',
        bulletPoints: [
          'Selenium IDE - Record and playback browser extension',
          'Selenium WebDriver - Programming interface for browser automation',
          'Selenium Grid - Distributed test execution across machines',
          'Selenium RC (Deprecated) - Legacy remote control server',
        ],
      },
      {
        title: 'WebDriver Architecture',
        content: ['WebDriver uses a client-server architecture with JSON Wire Protocol (W3C standard).'],
        bulletPoints: [
          'Client: Your test code written in Java/Python/etc.',
          'JSON Wire Protocol: Communication standard between client and driver',
          'Browser Driver: ChromeDriver, GeckoDriver, EdgeDriver',
          'Browser: Actual browser instance being automated',
        ],
      },
      {
        title: 'Browser Drivers',
        table: {
          headers: ['Browser', 'Driver', 'Download Source'],
          rows: [
            ['Chrome', 'ChromeDriver', 'chromedriver.chromium.org'],
            ['Firefox', 'GeckoDriver', 'github.com/mozilla/geckodriver'],
            ['Edge', 'MSEdgeDriver', 'developer.microsoft.com'],
            ['Safari', 'SafariDriver', 'Built into macOS'],
          ],
        },
      },
      {
        title: 'WebDriverManager Example',
        content: ['Use WebDriverManager to automatically handle driver setup without manual downloads:'],
        codeExplanation: 'This code demonstrates the basic Selenium workflow: 1) WebDriverManager.chromedriver().setup() automatically downloads and configures the Chrome driver. 2) new ChromeDriver() creates a browser instance. 3) driver.get() navigates to a URL. 4) driver.getTitle() retrieves the page title. 5) driver.quit() closes the browser and ends the session.',
        code: `// Automatic driver management
WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();

// Navigate to URL
driver.get("https://www.coursera.org");

// Get page title
String title = driver.getTitle();
System.out.println("Page Title: " + title);

// Close browser
driver.quit();`,
        codeTitle: 'BasicSeleniumTest.java',
      },
    ],
  },
  'project-setup': {
    sectionTitle: 'Project Setup',
    sectionNumber: 2,
    slides: [
      {
        title: 'Maven Project Structure',
        content: ['A well-organized Maven project structure is essential for maintainability:'],
        bulletPoints: [
          'src/main/java - Application source code, Page Objects',
          'src/test/java - Test classes',
          'src/test/resources - Test data, config files',
          'pom.xml - Maven dependencies and build configuration',
        ],
      },
      {
        title: 'Essential Maven Dependencies',
        content: ['Add these core dependencies to your pom.xml for a complete Selenium setup:'],
        codeExplanation: 'The pom.xml file defines three essential dependencies: 1) selenium-java - The main Selenium WebDriver library for browser automation. 2) testng - The testing framework for organizing and executing tests with annotations. 3) webdrivermanager - Automatically handles browser driver downloads, eliminating manual setup.',
        code: `<dependencies>
  <!-- Selenium WebDriver -->
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.15.0</version>
  </dependency>
  
  <!-- TestNG -->
  <dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.8.0</version>
  </dependency>
  
  <!-- WebDriverManager -->
  <dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.6.2</version>
  </dependency>
</dependencies>`,
        codeTitle: 'pom.xml',
      },
      {
        title: 'BaseTest Class',
        content: ['Create a reusable base test class that all test classes will extend:'],
        codeExplanation: 'The BaseTest class provides: 1) @BeforeMethod runs before each test - sets up WebDriverManager, creates ChromeDriver, maximizes window, and sets implicit wait. 2) @AfterMethod runs after each test - safely closes the browser. 3) Protected driver variable allows access from child test classes.',
        code: `public class BaseTest {
    protected WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts()
            .implicitlyWait(Duration.ofSeconds(10));
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`,
        codeTitle: 'BaseTest.java',
      },
      {
        title: 'Config.properties',
        content: ['Externalize configuration for maintainability and environment flexibility:'],
        codeExplanation: 'Configuration file contains: 1) Browser settings - which browser to use and headless mode toggle. 2) Application URLs - base URLs for different test environments. 3) Timeout values - configurable wait times. 4) Test credentials - login details for test accounts. This separation allows easy environment switching without code changes.',
        code: `# Browser Configuration
browser=chrome
headless=false

# Application URLs
base.url=https://www.coursera.org
bookmyshow.url=https://www.bookmyshow.com

# Timeouts
implicit.wait=10
explicit.wait=15
page.load.timeout=30

# Test Data
test.username=testuser@example.com
test.password=SecurePass123`,
        codeTitle: 'config.properties',
      },
    ],
  },
  'webdriver-api': {
    sectionTitle: 'WebDriver API',
    sectionNumber: 3,
    slides: [
      {
        title: 'Navigation Methods',
        content: ['Essential methods for browser navigation and page control:'],
        codeExplanation: 'Navigation methods explained: driver.get() loads a URL and waits for page load. getCurrentUrl() and getTitle() retrieve page info. navigate().to() is similar to get() but supports back/forward history. navigate().back() and forward() simulate browser buttons. refresh() reloads the current page.',
        code: `// Navigate to URL
driver.get("https://www.coursera.org");

// Get current URL and title
String url = driver.getCurrentUrl();
String title = driver.getTitle();

// Navigation controls
driver.navigate().to("https://www.google.com");
driver.navigate().back();
driver.navigate().forward();
driver.navigate().refresh();`,
        codeTitle: 'Navigation Examples',
      },
      {
        title: 'WebElement Methods',
        content: ['Methods for interacting with page elements:'],
        codeExplanation: 'WebElement methods: findElement() locates an element on the page. sendKeys() types text into input fields. clear() removes existing text. click() simulates a mouse click. getText() retrieves visible text. getAttribute() gets HTML attribute values. isDisplayed(), isEnabled(), and isSelected() check element state.',
        code: `// Find element and interact
WebElement searchBox = driver.findElement(By.id("search"));
searchBox.sendKeys("Selenium Course");
searchBox.clear();

// Click actions
WebElement button = driver.findElement(By.cssSelector(".submit-btn"));
button.click();

// Get element properties
String text = button.getText();
String value = searchBox.getAttribute("value");
boolean isVisible = button.isDisplayed();
boolean isEnabled = button.isEnabled();`,
        codeTitle: 'WebElement Interactions',
      },
      {
        title: 'Browser Window Methods',
        content: ['Control browser window size, position, and cookies:'],
        codeExplanation: 'Window management: maximize() expands to full screen (recommended for testing). minimize() and fullscreen() control window state. setSize() sets exact dimensions for responsive testing. getSize() and getPosition() retrieve window properties. deleteAllCookies() clears session data for clean test starts.',
        code: `// Window management
driver.manage().window().maximize();
driver.manage().window().minimize();
driver.manage().window().fullscreen();

// Set specific size
driver.manage().window().setSize(new Dimension(1280, 720));

// Get window size and position
Dimension size = driver.manage().window().getSize();
Point position = driver.manage().window().getPosition();

// Cookie management
driver.manage().deleteAllCookies();`,
        codeTitle: 'Browser Commands',
      },
      {
        title: 'WebDriver Methods Summary',
        content: ['Quick reference for the most commonly used WebDriver methods:'],
        table: {
          headers: ['Method', 'Description', 'Returns'],
          rows: [
            ['get(url)', 'Navigate to URL', 'void'],
            ['getTitle()', 'Get page title', 'String'],
            ['getCurrentUrl()', 'Get current URL', 'String'],
            ['getPageSource()', 'Get HTML source', 'String'],
            ['close()', 'Close current window', 'void'],
            ['quit()', 'Close all windows', 'void'],
          ],
        },
      },
    ],
  },
  'locators': {
    sectionTitle: 'Locators',
    sectionNumber: 4,
    slides: [
      {
        title: 'Basic Locator Strategies',
        content: ['Selenium provides multiple ways to locate elements on a web page:'],
        codeExplanation: 'Locator strategies from most to least reliable: By.id() is fastest and most unique. By.name() works well for form fields. By.className() matches CSS class. By.tagName() finds all elements of a type. By.linkText() matches exact anchor text. By.partialLinkText() matches partial text in links.',
        code: `// ID - Most reliable
driver.findElement(By.id("username"));

// Name attribute
driver.findElement(By.name("email"));

// Class name
driver.findElement(By.className("login-btn"));

// Tag name
driver.findElements(By.tagName("input"));

// Link text (exact match)
driver.findElement(By.linkText("Sign In"));

// Partial link text
driver.findElement(By.partialLinkText("Sign"));`,
        codeTitle: 'Basic Locators',
      },
      {
        title: 'CSS Selectors',
        content: ['CSS selectors offer powerful and fast element selection:'],
        codeExplanation: 'CSS selector syntax: # prefix selects by ID. . prefix selects by class. [attribute="value"] matches attributes. > selects direct children. Space selects any descendant. :nth-child(n) selects by position. CSS selectors are faster than XPath and preferred when possible.',
        code: `// By ID
driver.findElement(By.cssSelector("#username"));

// By class
driver.findElement(By.cssSelector(".login-button"));

// By attribute
driver.findElement(By.cssSelector("input[type='email']"));
driver.findElement(By.cssSelector("[data-testid='submit']"));

// Child elements
driver.findElement(By.cssSelector("form > input"));
driver.findElement(By.cssSelector("div.container input"));

// Nth-child
driver.findElement(By.cssSelector("ul li:nth-child(2)"));`,
        codeTitle: 'CSS Selector Examples',
      },
      {
        title: 'XPath Locators',
        content: ['XPath provides the most flexible element location capabilities:'],
        codeExplanation: 'XPath types: Absolute XPath starts from root (avoid - fragile). Relative XPath starts with // (preferred). @attribute accesses attributes. text() matches element text content. contains() for partial matching. starts-with() for prefix matching. XPath is powerful but slower than CSS.',
        code: `// Absolute XPath (avoid)
driver.findElement(By.xpath("/html/body/div/form/input"));

// Relative XPath (preferred)
driver.findElement(By.xpath("//input[@id='username']"));

// Text-based
driver.findElement(By.xpath("//button[text()='Login']"));
driver.findElement(By.xpath("//a[contains(text(),'Sign')]"));

// Partial attribute match
driver.findElement(By.xpath("//input[starts-with(@id,'user')]"));
driver.findElement(By.xpath("//div[contains(@class,'header')]"));`,
        codeTitle: 'XPath Examples',
      },
      {
        title: 'XPath Axes',
        content: ['XPath axes allow navigation relative to the current element:'],
        codeExplanation: 'XPath axes explained: parent:: moves to parent element. following-sibling:: finds next siblings at same level. preceding-sibling:: finds previous siblings. ancestor:: finds any parent in hierarchy. // descendant finds any child at any level. Axes are essential when direct locators are unavailable.',
        code: `// Parent element
driver.findElement(By.xpath("//input[@id='email']/parent::div"));

// Following sibling
driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input"));

// Preceding sibling
driver.findElement(By.xpath("//input[@id='pass']/preceding-sibling::label"));

// Ancestor
driver.findElement(By.xpath("//input[@id='email']/ancestor::form"));

// Descendant
driver.findElement(By.xpath("//form[@id='login']//input"));`,
        codeTitle: 'XPath Axes Examples',
      },
    ],
  },
  'locator-best-practices': {
    sectionTitle: 'Locator Best Practices',
    sectionNumber: 5,
    slides: [
      {
        title: 'Locator Priority Order',
        content: ['Use locators in this priority order for maximum stability:'],
        bulletPoints: [
          '1. ID - Fastest and most reliable',
          '2. name - Usually unique within forms',
          '3. CSS Selector - Fast, flexible, readable',
          '4. XPath - Most powerful, use when others fail',
          '5. linkText - For anchor elements only',
          '6. className - Can match multiple elements',
        ],
      },
      {
        title: 'Locator Comparison',
        table: {
          headers: ['Locator', 'Use When', 'Avoid When'],
          rows: [
            ['ID', 'Unique, stable ID exists', 'ID is auto-generated'],
            ['CSS', 'Need complex selectors', 'Text-based selection needed'],
            ['XPath', 'Need text/axes traversal', 'Simple selection possible'],
            ['Name', 'Form elements', 'Non-form elements'],
          ],
        },
      },
      {
        title: 'Handling Dynamic Elements',
        content: ['Strategies for locating elements with changing attributes:'],
        codeExplanation: 'Dynamic element strategies: [id^="user_"] uses CSS "starts-with" for dynamic ID prefixes. [class*="active"] uses CSS "contains" for partial class matching. data-testid attributes provide stable locators (request from developers). XPath axes like following-sibling find elements based on relationships rather than attributes.',
        code: `// Dynamic ID: user_12345 -> user_67890
// Use starts-with or contains
driver.findElement(By.cssSelector("[id^='user_']"));
driver.findElement(By.xpath("//div[starts-with(@id,'user_')]"));

// Dynamic class with multiple values
driver.findElement(By.cssSelector("[class*='active']"));

// Use data-testid (request from developers)
driver.findElement(By.cssSelector("[data-testid='login-button']"));

// Relative positioning
driver.findElement(By.xpath(
    "//label[text()='Email']/following-sibling::input"
));`,
        codeTitle: 'Dynamic Element Strategies',
      },
      {
        title: 'Corporate Best Practices',
        content: ['Industry-standard practices for locator management in enterprise projects:'],
        bulletPoints: [
          'Request data-testid attributes from development team',
          'Maintain a locator strategy document',
          'Use Page Object Model for locator organization',
          'Implement retry logic for flaky locators',
          'Conduct regular locator audits',
          'Avoid absolute XPath - breaks with UI changes',
          'Prefer CSS over XPath for performance',
        ],
      },
    ],
  },
  'wait-strategies': {
    sectionTitle: 'Wait Strategies',
    sectionNumber: 6,
    slides: [
      {
        title: 'Why Waits Are Essential',
        content: ['Modern web apps load content dynamically. Waits synchronize test execution with page state.'],
        bulletPoints: [
          'AJAX calls load data asynchronously',
          'Animations and transitions take time',
          'Network latency varies',
          'Without waits: StaleElementException, NoSuchElementException',
        ],
      },
      {
        title: 'Thread.sleep() - Avoid This!',
        content: ['Why Thread.sleep() is considered a bad practice in test automation:'],
        codeExplanation: 'Thread.sleep() is an anti-pattern because: 1) It always waits the full duration even if the element appears immediately. 2) It may still fail if the element takes longer than expected. 3) It slows down test execution significantly. 4) It makes tests unreliable and unprofessional.',
        code: `// BAD PRACTICE - Fixed wait regardless of condition
Thread.sleep(5000); // Waits 5 seconds ALWAYS

// Problems:
// 1. Wastes time if element appears early
// 2. May still fail if element takes longer
// 3. Not reliable, not professional`,
        codeTitle: 'Anti-Pattern',
      },
      {
        title: 'Implicit Wait',
        content: ['A global wait that applies to all element searches:'],
        codeExplanation: 'Implicit wait explained: Set once, it applies to ALL findElement calls. The driver polls the DOM for the specified duration until the element is found. Limitations: same timeout for all elements, cannot wait for specific conditions like visibility or clickability, can interfere with explicit waits unpredictably.',
        code: `// Set once, applies to all findElement calls
driver.manage().timeouts()
    .implicitlyWait(Duration.ofSeconds(10));

// Now all findElement calls wait up to 10 seconds
WebElement element = driver.findElement(By.id("search"));

// Limitations:
// - Same timeout for all elements
// - Cannot wait for specific conditions
// - Mixes with explicit waits unpredictably`,
        codeTitle: 'Implicit Wait',
      },
      {
        title: 'Explicit Wait (Recommended)',
        content: ['The most flexible and reliable wait strategy:'],
        codeExplanation: 'Explicit wait is the recommended approach: WebDriverWait with ExpectedConditions waits for specific conditions. visibilityOfElementLocated() waits until element is visible. elementToBeClickable() ensures element can receive clicks. urlContains() waits for navigation. textToBePresentInElementLocated() waits for text content.',
        code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Wait for element to be visible
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("results"))
);

// Wait for element to be clickable
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit"))).click();

// Wait for URL to contain
wait.until(ExpectedConditions.urlContains("/dashboard"));

// Wait for text to be present
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.id("status"), "Complete"
));`,
        codeTitle: 'Explicit Wait Examples',
      },
      {
        title: 'Fluent Wait',
        content: ['The most configurable wait with custom polling and exception handling:'],
        codeExplanation: 'Fluent wait provides maximum control: withTimeout() sets total wait duration. pollingEvery() sets check frequency (default 500ms). ignoring() specifies exceptions to suppress during polling. Custom functions allow complex conditions. Use for unstable elements or complex scenarios.',
        code: `Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class)
    .ignoring(StaleElementReferenceException.class);

WebElement element = fluentWait.until(driver -> {
    WebElement el = driver.findElement(By.id("dynamic-content"));
    return el.isDisplayed() ? el : null;
});`,
        codeTitle: 'Fluent Wait - Maximum Control',
      },
    ],
  },
  'real-scripts': {
    sectionTitle: 'Real Automation Scripts',
    sectionNumber: 7,
    slides: [
      {
        title: 'Page Object Model Pattern',
        content: ['POM separates test logic from page structure for maintainability:'],
        codeExplanation: 'Page Object Model explained: The class encapsulates all locators and actions for one page. Private locators are stored as By objects for reusability. Constructor takes WebDriver and initializes WebDriverWait. Public methods represent user actions (login, search). This separation means locator changes only require updates in one place.',
        code: `public class LoginPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    private By emailField = By.id("email");
    private By passwordField = By.id("password");
    private By loginButton = By.cssSelector("[data-testid='login']");
    
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void login(String email, String password) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(emailField))
            .sendKeys(email);
        driver.findElement(passwordField).sendKeys(password);
        driver.findElement(loginButton).click();
    }
}`,
        codeTitle: 'LoginPage.java',
      },
      {
        title: 'Coursera Login Test',
        content: ['A complete test class using Page Object Model:'],
        codeExplanation: 'Test class structure: Extends BaseTest to inherit setup/teardown. @BeforeMethod initializes page objects before each test. @Test method contains the actual test logic. Test reads like user actions: navigate, enter credentials, click, verify. Assert.assertTrue validates the expected outcome.',
        code: `public class CourseraLoginTest extends BaseTest {
    private CourseraLoginPage loginPage;
    
    @BeforeMethod
    public void initPages() {
        loginPage = new CourseraLoginPage(driver);
    }
    
    @Test
    public void testSuccessfulLogin() {
        driver.get("https://www.coursera.org/login");
        
        loginPage.enterEmail("testuser@example.com");
        loginPage.enterPassword("SecurePass123");
        loginPage.clickLogin();
        
        Assert.assertTrue(loginPage.isLoggedIn(),
            "User should be logged in");
    }
}`,
        codeTitle: 'CourseraLoginTest.java',
      },
      {
        title: 'BookMyShow Booking Flow',
        content: ['End-to-end test demonstrating multi-page workflow:'],
        codeExplanation: 'E2E test flow: Multiple page objects represent different screens (HomePage, MoviePage, SeatSelectionPage). Test simulates complete user journey: select city, search movie, choose theatre and time, select seats. Each page object handles its own elements. Final assertion verifies the expected end state.',
        code: `public class BookMyShowTest extends BaseTest {
    @Test
    public void testMovieBookingFlow() {
        BookMyShowHomePage homePage = new BookMyShowHomePage(driver);
        MoviePage moviePage = new MoviePage(driver);
        SeatSelectionPage seatPage = new SeatSelectionPage(driver);
        
        driver.get("https://www.bookmyshow.com");
        
        homePage.selectCity("Mumbai");
        homePage.searchMovie("Inception");
        homePage.selectFirstResult();
        
        moviePage.selectTheatre("PVR: Phoenix");
        moviePage.selectShowTime("7:00 PM");
        
        seatPage.selectSeats(2, "Premium");
        seatPage.proceedToPayment();
        
        Assert.assertTrue(seatPage.isPaymentPageDisplayed());
    }
}`,
        codeTitle: 'BookMyShowTest.java',
      },
    ],
  },
  'testng-implementation': {
    sectionTitle: 'TestNG Implementation',
    sectionNumber: 8,
    slides: [
      {
        title: 'TestNG Annotations',
        content: ['TestNG provides annotations to control test execution flow:'],
        bulletPoints: [
          '@BeforeSuite - Runs once before all tests in suite',
          '@BeforeTest - Runs before each <test> tag in testng.xml',
          '@BeforeClass - Runs once before first method in class',
          '@BeforeMethod - Runs before each @Test method',
          '@Test - Marks a method as test case',
          '@AfterMethod - Runs after each @Test method',
          '@AfterClass - Runs once after all methods in class',
          '@AfterTest - Runs after each <test> tag',
          '@AfterSuite - Runs once after all tests in suite',
        ],
      },
      {
        title: 'Test Annotations Example',
        content: ['Demonstrating TestNG lifecycle and test dependencies:'],
        codeExplanation: 'TestNG lifecycle: @BeforeClass runs once before any tests in the class (setup resources). @BeforeMethod runs before EACH test method (reset state). @Test marks test methods - priority controls execution order, dependsOnMethods creates test dependencies. @AfterMethod runs after each test (cleanup). The execution order ensures proper setup and teardown.',
        code: `public class TestNGLifecycle {
    @BeforeClass
    public void setupClass() {
        System.out.println("Setup - runs once");
    }
    
    @BeforeMethod
    public void setupTest() {
        System.out.println("Before each test");
    }
    
    @Test(priority = 1)
    public void testLogin() {
        System.out.println("Test 1: Login");
    }
    
    @Test(priority = 2, dependsOnMethods = "testLogin")
    public void testDashboard() {
        System.out.println("Test 2: Dashboard");
    }
    
    @AfterMethod
    public void teardownTest() {
        System.out.println("After each test");
    }
}`,
        codeTitle: 'TestNG Lifecycle',
      },
      {
        title: 'Assertions',
        content: ['Two types of assertions for different testing needs:'],
        codeExplanation: 'Hard assertions (Assert class): Stop test immediately on failure - use for critical validations. Soft assertions (SoftAssert class): Continue execution after failures - collect all failures and report at end with assertAll(). Use soft assertions when you want to verify multiple conditions in one test.',
        code: `// Hard Assertions - Stop on failure
Assert.assertEquals(actual, expected, "Values should match");
Assert.assertTrue(condition, "Condition should be true");
Assert.assertFalse(condition, "Condition should be false");
Assert.assertNotNull(object, "Object should not be null");

// Soft Assertions - Continue after failure
SoftAssert soft = new SoftAssert();
soft.assertEquals(title, "Dashboard");
soft.assertTrue(isLoggedIn);
soft.assertAll(); // Reports all failures at end`,
        codeTitle: 'Assertions',
      },
      {
        title: 'testng.xml Configuration',
        content: ['Configure test suites, parallel execution, and test grouping:'],
        codeExplanation: 'testng.xml structure: <suite> is the root element - parallel="tests" runs tests in parallel, thread-count sets concurrency. <test> groups related classes. <groups> filters tests by @Test(groups="smoke"). <classes> lists test classes to run. This XML enables flexible test organization and CI/CD integration.',
        code: `<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Selenium Test Suite" parallel="tests" thread-count="3">
    <test name="Smoke Tests">
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.HomePageTest"/>
        </classes>
    </test>
    
    <test name="Regression Tests">
        <classes>
            <class name="tests.BookingTest"/>
        </classes>
    </test>
</suite>`,
        codeTitle: 'testng.xml',
      },
    ],
  },
  'exception-handling': {
    sectionTitle: 'Exception Handling',
    sectionNumber: 9,
    slides: [
      {
        title: 'Handling Alerts',
        content: ['JavaScript alerts require switching context to interact:'],
        codeExplanation: 'Alert handling process: 1) Use ExpectedConditions.alertIsPresent() to wait for and detect alerts. 2) driver.switchTo().alert() returns the Alert object. 3) getText() retrieves the alert message. 4) accept() clicks OK/Yes. 5) dismiss() clicks Cancel/No. 6) sendKeys() types into prompt dialogs.',
        code: `// Wait for and switch to alert
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
Alert alert = wait.until(ExpectedConditions.alertIsPresent());

// Get alert text
String alertText = alert.getText();

// Accept alert (OK button)
alert.accept();

// Dismiss alert (Cancel button)
alert.dismiss();

// Send text to prompt
alert.sendKeys("User input");
alert.accept();`,
        codeTitle: 'Alert Handling',
      },
      {
        title: 'Handling Frames',
        content: ['Frames (iframes) create separate DOM contexts:'],
        codeExplanation: 'Frame switching: Elements inside frames are invisible until you switch context. Switch by index (0-based), name/ID attribute, or WebElement reference. After switching, all findElement calls operate within that frame. defaultContent() returns to the main page. parentFrame() moves up one level in nested frames.',
        code: `// Switch by index
driver.switchTo().frame(0);

// Switch by name or ID
driver.switchTo().frame("iframe-name");

// Switch by WebElement
WebElement frameElement = driver.findElement(By.cssSelector("iframe.content"));
driver.switchTo().frame(frameElement);

// Interact with elements inside frame
driver.findElement(By.id("frame-button")).click();

// Switch back to main document
driver.switchTo().defaultContent();

// Switch to parent frame
driver.switchTo().parentFrame();`,
        codeTitle: 'Frame Handling',
      },
      {
        title: 'Handling Multiple Windows',
        content: ['Managing multiple browser windows and tabs:'],
        codeExplanation: 'Window handling: getWindowHandle() stores current window ID. After clicking a link that opens new window, getWindowHandles() returns all open window IDs. Loop through and switch to the new window using switchTo().window(). Perform actions, then close() the new window and switch back to original.',
        code: `// Store original window handle
String originalWindow = driver.getWindowHandle();

// Click link that opens new window
driver.findElement(By.linkText("Open New Tab")).click();

// Get all window handles
Set<String> allWindows = driver.getWindowHandles();

// Switch to new window
for (String window : allWindows) {
    if (!window.equals(originalWindow)) {
        driver.switchTo().window(window);
        break;
    }
}

// Perform actions in new window
System.out.println("New window title: " + driver.getTitle());

// Close new window and switch back
driver.close();
driver.switchTo().window(originalWindow);`,
        codeTitle: 'Window Handling',
      },
      {
        title: 'Screenshot on Failure',
        content: ['Capture screenshots for debugging failed tests:'],
        codeExplanation: 'Screenshot utility: Cast driver to TakesScreenshot interface. getScreenshotAs(OutputType.FILE) captures the visible viewport. Create a timestamped filename for uniqueness. FileUtils.copyFile() saves to disk. Call this from @AfterMethod when test fails, or integrate with TestNG listeners for automatic capture.',
        code: `public class ScreenshotUtil {
    public static void captureScreenshot(WebDriver driver, String testName) {
        try {
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);
            
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss")
                .format(new Date());
            String path = "screenshots/" + testName + "_" + timestamp + ".png";
            
            FileUtils.copyFile(source, new File(path));
            System.out.println("Screenshot saved: " + path);
        } catch (IOException e) {
            System.out.println("Failed to capture screenshot");
        }
    }
}`,
        codeTitle: 'ScreenshotUtil.java',
      },
    ],
  },
  'framework-best-practices': {
    sectionTitle: 'Framework Best Practices',
    sectionNumber: 10,
    slides: [
      {
        title: 'Page Object Model Benefits',
        content: ['Why POM is the industry standard for test automation frameworks:'],
        bulletPoints: [
          'Separation of concerns - Test logic vs Page structure',
          'Reusability - Page methods used across multiple tests',
          'Maintainability - Locator changes in one place',
          'Readability - Tests read like user actions',
          'Scalability - Easy to add new pages and tests',
        ],
      },
      {
        title: 'Page Factory Pattern',
        content: ['An enhanced approach to Page Object Model using annotations:'],
        codeExplanation: 'Page Factory benefits: @FindBy annotations declare locators directly on WebElement fields - cleaner than By objects. PageFactory.initElements() initializes all annotated elements using lazy loading. Elements are found only when first accessed. This reduces boilerplate code and improves readability.',
        code: `public class LoginPage {
    private WebDriver driver;
    
    @FindBy(id = "email")
    private WebElement emailField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(css = "[data-testid='login-btn']")
    private WebElement loginButton;
    
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }
    
    public void login(String email, String password) {
        emailField.sendKeys(email);
        passwordField.sendKeys(password);
        loginButton.click();
    }
}`,
        codeTitle: 'Page Factory Example',
      },
      {
        title: 'Logging with Log4j',
        content: ['Implement comprehensive logging for debugging and reporting:'],
        codeExplanation: 'Log4j implementation: LogManager.getLogger() creates a logger for each class. logger.info() records important events. logger.debug() records detailed info for troubleshooting. logger.error() records failures. ITestResult in @AfterMethod provides test outcome. Combine with screenshot capture for complete failure documentation.',
        code: `public class BaseTest {
    protected static final Logger logger = LogManager.getLogger(BaseTest.class);
    protected WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        logger.info("Starting test setup");
        driver = DriverManager.getDriver();
        logger.debug("Browser launched successfully");
    }
    
    @AfterMethod
    public void tearDown(ITestResult result) {
        if (result.getStatus() == ITestResult.FAILURE) {
            logger.error("Test failed: " + result.getName());
            ScreenshotUtil.capture(driver, result.getName());
        }
        driver.quit();
        logger.info("Browser closed");
    }
}`,
        codeTitle: 'Logging Implementation',
      },
      {
        title: 'Folder Structure',
        content: ['Recommended project structure for enterprise automation frameworks:'],
        bulletPoints: [
          'src/main/java/pages - Page Object classes',
          'src/main/java/utils - Utility classes (DriverManager, ConfigReader)',
          'src/main/java/constants - Constants and enums',
          'src/test/java/tests - Test classes',
          'src/test/java/base - BaseTest class',
          'src/test/resources - testng.xml, config.properties, test data',
          'reports - Extent Reports output',
          'screenshots - Failure screenshots',
        ],
      },
    ],
  },
  'advanced-concepts': {
    sectionTitle: 'Shadow DOM & Advanced Concepts',
    sectionNumber: 11,
    slides: [
      {
        title: 'What is Shadow DOM?',
        content: ['Shadow DOM provides encapsulation for web components, isolating CSS and JavaScript.'],
        bulletPoints: [
          'Elements inside Shadow DOM are hidden from regular DOM queries',
          'Used by modern web components and frameworks',
          'Open Shadow DOM - Accessible via shadowRoot',
          'Closed Shadow DOM - Cannot be accessed externally',
        ],
      },
      {
        title: 'Accessing Shadow DOM (Selenium 4)',
        code: `// Find the shadow host element
WebElement shadowHost = driver.findElement(By.cssSelector("custom-element"));

// Get the shadow root using Selenium 4 native method
SearchContext shadowRoot = shadowHost.getShadowRoot();

// Find elements within shadow DOM
WebElement shadowInput = shadowRoot.findElement(By.cssSelector("input"));
WebElement shadowButton = shadowRoot.findElement(By.cssSelector("button"));

// Interact with shadow DOM elements
shadowInput.sendKeys("Text inside Shadow DOM");
shadowButton.click();`,
        codeTitle: 'Selenium 4 Shadow DOM',
      },
      {
        title: 'Headless Browser Execution',
        code: `ChromeOptions options = new ChromeOptions();

// Enable headless mode
options.addArguments("--headless=new");
options.addArguments("--disable-gpu");
options.addArguments("--window-size=1920,1080");
options.addArguments("--no-sandbox");

// Create driver with headless options
WebDriver driver = new ChromeDriver(options);

// Run tests without visible browser
driver.get("https://www.coursera.org");
System.out.println("Title: " + driver.getTitle());

driver.quit();`,
        codeTitle: 'Headless Chrome',
      },
      {
        title: 'Chrome DevTools Protocol',
        code: `ChromeDriver driver = new ChromeDriver();
DevTools devTools = driver.getDevTools();
devTools.createSession();

// Mock geolocation
devTools.send(Emulation.setGeolocationOverride(
    Optional.of(19.0760),  // Latitude (Mumbai)
    Optional.of(72.8777),  // Longitude
    Optional.of(100.0)     // Accuracy
));

// Capture network traffic
devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));
devTools.addListener(Network.requestWillBeSent(), request -> {
    System.out.println("Request: " + request.getRequest().getUrl());
});`,
        codeTitle: 'CDP Features',
      },
      {
        title: 'Mobile Emulation',
        code: `Map<String, Object> deviceMetrics = new HashMap<>();
deviceMetrics.put("width", 390);
deviceMetrics.put("height", 844);
deviceMetrics.put("pixelRatio", 3.0);
deviceMetrics.put("mobile", true);

Map<String, Object> mobileEmulation = new HashMap<>();
mobileEmulation.put("deviceMetrics", deviceMetrics);
mobileEmulation.put("userAgent", "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)...");

ChromeOptions options = new ChromeOptions();
options.setExperimentalOption("mobileEmulation", mobileEmulation);

WebDriver driver = new ChromeDriver(options);`,
        codeTitle: 'Mobile Emulation',
      },
    ],
  },
  'interview-prep': {
    sectionTitle: 'Interview & Real Project',
    sectionNumber: 12,
    slides: [
      {
        title: 'Top Selenium Interview Questions',
        bulletPoints: [
          'What is the difference between findElement and findElements?',
          'Explain the difference between close() and quit()',
          'What are the different types of waits in Selenium?',
          'How do you handle dynamic elements?',
          'What is Page Object Model and why use it?',
          'How do you handle alerts, frames, and multiple windows?',
          'What is the difference between CSS Selector and XPath?',
        ],
      },
      {
        title: 'Sample Answer: Waits',
        content: ['Question: What are the different types of waits in Selenium?'],
        bulletPoints: [
          'Implicit Wait: Set globally, waits for element to appear',
          'Explicit Wait: Waits for specific condition (recommended)',
          'Fluent Wait: Explicit wait with polling interval and exception handling',
          'Thread.sleep(): Static wait, NOT recommended in automation',
        ],
      },
      {
        title: 'Explaining Your Framework',
        bulletPoints: [
          'Tech Stack: Java, Selenium 4, TestNG, Maven',
          'Design Pattern: Page Object Model with Page Factory',
          'Project Structure: Pages, Tests, Utilities, Configs',
          'Reporting: Extent Reports with screenshots on failure',
          'CI/CD: Jenkins pipeline with parallel execution',
          'Version Control: Git with feature branching',
          'Test Data: External files (Excel, JSON, Properties)',
        ],
      },
      {
        title: 'Real Project Challenges & Solutions',
        table: {
          headers: ['Challenge', 'Solution'],
          rows: [
            ['Dynamic elements', 'Use contains(), starts-with(), relative XPath'],
            ['Flaky tests', 'Explicit waits, retry logic, stable locators'],
            ['Slow execution', 'Parallel execution, headless mode'],
            ['Test data management', 'External data sources, data providers'],
            ['Cross-browser issues', 'Selenium Grid, browser-specific handling'],
          ],
        },
      },
      {
        title: 'Key Takeaways',
        bulletPoints: [
          'Master locator strategies - ID > CSS > XPath',
          'Always use explicit waits over implicit waits',
          'Implement Page Object Model from day one',
          'Write maintainable, readable test code',
          'Handle exceptions gracefully with screenshots',
          'Use version control and CI/CD integration',
          'Practice with real applications like Coursera, BookMyShow',
        ],
      },
    ],
  },
};
