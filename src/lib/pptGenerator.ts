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
  
  pptx.author = 'Selenium Training Platform';
  pptx.title = data.sectionTitle;
  pptx.subject = 'Selenium WebDriver Training';
  
  pptx.defineSlideMaster({
    title: 'MAIN_SLIDE',
    background: { color: THEME.background },
  });

  // Title Slide
  const titleSlide = pptx.addSlide({ masterName: 'MAIN_SLIDE' });
  titleSlide.addText(`Section ${String(data.sectionNumber).padStart(2, '0')}`, {
    x: 0.5, y: 1.5, w: '90%', fontSize: 18, color: THEME.primary, fontFace: 'Arial',
  });
  titleSlide.addText(data.sectionTitle, {
    x: 0.5, y: 2, w: '90%', fontSize: 36, bold: true, color: THEME.text, fontFace: 'Arial',
  });
  titleSlide.addText('Selenium WebDriver Training Platform', {
    x: 0.5, y: 4.5, w: '90%', fontSize: 14, color: THEME.muted, fontFace: 'Arial',
  });

  // Content Slides
  for (const slideData of data.slides) {
    const slide = pptx.addSlide({ masterName: 'MAIN_SLIDE' });
    
    slide.addText(slideData.title, {
      x: 0.5, y: 0.3, w: '90%', fontSize: 24, bold: true, color: THEME.primary, fontFace: 'Arial',
    });

    let currentY = 0.9;

    if (slideData.content && slideData.content.length > 0) {
      for (const paragraph of slideData.content) {
        slide.addText(paragraph, {
          x: 0.5, y: currentY, w: '90%', fontSize: 12, color: THEME.text, fontFace: 'Arial', breakLine: true,
        });
        currentY += 0.5;
      }
    }

    if (slideData.bulletPoints && slideData.bulletPoints.length > 0) {
      const bullets = slideData.bulletPoints.map(point => ({
        text: point,
        options: { bullet: { type: 'bullet' as const }, color: THEME.text },
      }));
      
      slide.addText(bullets, {
        x: 0.5, y: currentY, w: '90%', fontSize: 11, fontFace: 'Arial',
      });
      currentY += slideData.bulletPoints.length * 0.35;
    }

    if (slideData.code) {
      if (slideData.codeExplanation) {
        slide.addText('💡 Code Explanation:', {
          x: 0.5, y: currentY, w: '90%', fontSize: 10, bold: true, color: THEME.secondary, fontFace: 'Arial',
        });
        currentY += 0.25;
        
        slide.addText(slideData.codeExplanation, {
          x: 0.5, y: currentY, w: '90%', fontSize: 9, color: THEME.muted, fontFace: 'Arial', breakLine: true,
        });
        currentY += 0.5;
      }

      if (slideData.codeTitle) {
        slide.addText(`📄 ${slideData.codeTitle}`, {
          x: 0.5, y: currentY, w: '90%', fontSize: 10, color: THEME.secondary, fontFace: 'Arial',
        });
        currentY += 0.25;
      }
      
      slide.addShape('rect', {
        x: 0.5, y: currentY, w: 9,
        h: Math.min(3.2, slideData.code.split('\n').length * 0.18 + 0.3),
        fill: { color: THEME.codeBg },
        line: { color: THEME.primary, width: 1 },
      });
      
      slide.addText(slideData.code, {
        x: 0.6, y: currentY + 0.1, w: 8.8, fontSize: 8, color: THEME.text, fontFace: 'Courier New', valign: 'top',
      });
    }

    if (slideData.table) {
      const tableData = [
        slideData.table.headers.map(h => ({ text: h, options: { bold: true, fill: { color: THEME.codeBg }, color: THEME.primary } })),
        ...slideData.table.rows.map(row => 
          row.map(cell => ({ text: cell, options: { fill: { color: THEME.background }, color: THEME.text } }))
        ),
      ];
      
      slide.addTable(tableData, {
        x: 0.5, y: currentY, w: 9, fontSize: 9, fontFace: 'Arial',
        border: { type: 'solid', color: THEME.primary, pt: 0.5 },
      });
    }
  }

  // End slide
  const endSlide = pptx.addSlide({ masterName: 'MAIN_SLIDE' });
  endSlide.addText('End of Section', {
    x: 0.5, y: 2, w: '90%', fontSize: 32, bold: true, color: THEME.primary, fontFace: 'Arial', align: 'center',
  });
  endSlide.addText(`${data.sectionTitle} - Completed`, {
    x: 0.5, y: 3, w: '90%', fontSize: 18, color: THEME.text, fontFace: 'Arial', align: 'center',
  });

  await pptx.writeFile({ fileName: `Section_${String(data.sectionNumber).padStart(2, '0')}_${data.sectionTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pptx` });
};

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
          'Selenium IDE - Record and playback browser extension for quick test creation',
          'Selenium WebDriver - Core automation API for browser control (industry standard)',
          'Selenium Grid - Parallel execution across multiple machines and browsers',
          'Selenium RC (Deprecated) - Legacy component replaced by WebDriver',
        ],
      },
      {
        title: 'WebDriver Architecture',
        content: ['WebDriver follows client-server architecture using W3C WebDriver Protocol.'],
        bulletPoints: [
          'Test Script (Java) → Selenium Client Library → JSON Wire Protocol',
          'JSON Wire Protocol → Browser Driver (ChromeDriver/GeckoDriver)',
          'Browser Driver → Browser (Chrome/Firefox/Edge)',
          'Browser Driver translates commands to browser-native actions',
        ],
      },
      {
        title: 'Selenium 3 vs Selenium 4',
        table: {
          headers: ['Feature', 'Selenium 3', 'Selenium 4'],
          rows: [
            ['Protocol', 'JSON Wire Protocol', 'W3C WebDriver Protocol'],
            ['Relative Locators', 'Not Available', 'Available (above, below, near)'],
            ['Chrome DevTools', 'Not Supported', 'Native CDP Support'],
            ['New Window/Tab', 'JavaScript workaround', 'driver.switchTo().newWindow()'],
            ['Shadow DOM', 'JavaScript only', 'Native getShadowRoot()'],
          ],
        },
      },
      {
        title: 'Basic WebDriver Example',
        codeExplanation: 'This code shows the basic Selenium workflow: 1) new ChromeDriver() creates browser instance. 2) driver.get() navigates to URL and waits for page load. 3) driver.getTitle() retrieves the page title. 4) driver.quit() closes browser and ends session.',
        code: `// Initialize ChromeDriver (Selenium 4.6+ auto-manages drivers)
WebDriver driver = new ChromeDriver();

// Navigate to URL
driver.get("https://www.coursera.org");

// Get page title
String title = driver.getTitle();
System.out.println("Page Title: " + title);

// Get current URL
String url = driver.getCurrentUrl();

// Close browser and end session
driver.quit();`,
        codeTitle: 'BasicSeleniumTest.java',
      },
      {
        title: 'Browser Options Configuration',
        codeExplanation: 'ChromeOptions customizes browser behavior: addArguments() sets command-line flags. --headless runs without UI. --disable-notifications prevents popups. setExperimentalOption() configures advanced settings like download directory.',
        code: `ChromeOptions options = new ChromeOptions();
options.addArguments("--start-maximized");
options.addArguments("--headless=new");
options.addArguments("--disable-notifications");
options.addArguments("--incognito");

// Set download directory
HashMap<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", "/path/to/downloads");
options.setExperimentalOption("prefs", prefs);

WebDriver driver = new ChromeDriver(options);`,
        codeTitle: 'Browser Configuration',
      },
    ],
  },
  'project-setup': {
    sectionTitle: 'Project Setup',
    sectionNumber: 2,
    slides: [
      {
        title: 'Maven Project Structure',
        content: ['A well-organized Maven project structure for Selenium automation:'],
        bulletPoints: [
          'src/main/java - Page Objects, Utilities, Base classes',
          'src/test/java - Test classes organized by module',
          'src/test/resources - config.properties, testdata files, testng.xml',
          'pom.xml - Maven dependencies and build configuration',
          'drivers/ - Browser drivers (optional with WebDriverManager)',
        ],
      },
      {
        title: 'Essential Maven Dependencies',
        codeExplanation: 'pom.xml dependencies: selenium-java for WebDriver APIs. testng for test framework. webdrivermanager for automatic driver management. poi for Excel data-driven testing. extentreports for HTML reports.',
        code: `<dependencies>
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.15.0</version>
  </dependency>
  <dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.8.0</version>
  </dependency>
  <dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.6.2</version>
  </dependency>
</dependencies>`,
        codeTitle: 'pom.xml',
      },
      {
        title: 'DriverFactory with ThreadLocal',
        codeExplanation: 'ThreadLocal ensures thread safety in parallel execution. Each thread gets its own WebDriver instance. initDriver() creates and configures the driver. quitDriver() closes browser and removes thread reference.',
        code: `public class DriverFactory {
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    
    public static WebDriver getDriver() {
        return driver.get();
    }
    
    public static void initDriver(String browser) {
        WebDriver webDriver;
        switch (browser.toLowerCase()) {
            case "chrome":
                webDriver = new ChromeDriver();
                break;
            case "firefox":
                webDriver = new FirefoxDriver();
                break;
            default:
                webDriver = new ChromeDriver();
        }
        driver.set(webDriver);
        driver.get().manage().window().maximize();
    }
    
    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}`,
        codeTitle: 'DriverFactory.java',
      },
      {
        title: 'BaseTest Class',
        codeExplanation: '@Parameters reads browser from testng.xml. @Optional provides default value. @BeforeMethod runs before each test. @AfterMethod captures screenshot on failure and closes browser.',
        code: `public class BaseTest {
    protected WebDriver driver;
    
    @Parameters({"browser"})
    @BeforeMethod
    public void setUp(@Optional("chrome") String browser) {
        DriverFactory.initDriver(browser);
        driver = DriverFactory.getDriver();
    }
    
    @AfterMethod
    public void tearDown(ITestResult result) {
        if (result.getStatus() == ITestResult.FAILURE) {
            captureScreenshot(result.getName());
        }
        DriverFactory.quitDriver();
    }
}`,
        codeTitle: 'BaseTest.java',
      },
      {
        title: 'Configuration Properties',
        codeExplanation: 'config.properties externalizes settings. Browser and URL can be changed without code changes. Timeouts are configurable for different environments. ConfigReader utility reads and provides type-safe access.',
        code: `# Browser Configuration
browser=chrome
headless=false

# Application URLs
baseUrl=https://www.coursera.org
bookmyshowUrl=https://www.bookmyshow.com

# Timeouts (seconds)
implicitWait=10
explicitWait=15
pageLoadTimeout=30`,
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
        codeExplanation: 'driver.get() loads URL and waits for page load. navigate().to() is similar but supports history. back() and forward() simulate browser buttons. refresh() reloads current page.',
        code: `driver.get("https://www.coursera.org");
driver.navigate().to("https://www.bookmyshow.com");
driver.navigate().back();
driver.navigate().forward();
driver.navigate().refresh();

String title = driver.getTitle();
String url = driver.getCurrentUrl();
String source = driver.getPageSource();`,
        codeTitle: 'Navigation Examples',
      },
      {
        title: 'WebElement Methods',
        codeExplanation: 'findElement() locates element on page. sendKeys() types text. clear() removes text. click() simulates mouse click. getText() gets visible text. getAttribute() gets HTML attribute. isDisplayed()/isEnabled()/isSelected() check state.',
        code: `WebElement element = driver.findElement(By.id("username"));
element.sendKeys("testuser@email.com");
element.clear();
element.click();

String text = element.getText();
String value = element.getAttribute("value");
boolean visible = element.isDisplayed();
boolean enabled = element.isEnabled();
boolean selected = element.isSelected();`,
        codeTitle: 'WebElement Interactions',
      },
      {
        title: 'Actions Class - Advanced Interactions',
        codeExplanation: 'Actions class handles complex interactions: moveToElement() for hover. dragAndDrop() for drag operations. contextClick() for right-click. doubleClick() for double-click. keyDown()/keyUp() for keyboard combinations.',
        code: `Actions actions = new Actions(driver);

// Mouse hover
actions.moveToElement(menuItem).perform();

// Drag and drop
actions.dragAndDrop(source, target).perform();

// Right-click
actions.contextClick(element).perform();

// Keyboard shortcuts (Ctrl+A)
actions.keyDown(Keys.CONTROL).sendKeys("a")
       .keyUp(Keys.CONTROL).perform();

// Chained actions
actions.moveToElement(menu)
       .pause(Duration.ofMillis(500))
       .click(submenu)
       .perform();`,
        codeTitle: 'Actions Class',
      },
      {
        title: 'JavaScript Executor',
        codeExplanation: 'JavaScriptExecutor runs JavaScript in browser. Useful when Selenium methods fail. executeScript() runs synchronous JS. Common uses: scroll, click hidden elements, set values, trigger events.',
        code: `JavascriptExecutor js = (JavascriptExecutor) driver;

// Click element (when regular click fails)
js.executeScript("arguments[0].click();", element);

// Scroll to element
js.executeScript("arguments[0].scrollIntoView(true);", element);

// Scroll to bottom of page
js.executeScript("window.scrollTo(0, document.body.scrollHeight);");

// Set value directly
js.executeScript("arguments[0].value = 'test';", inputField);

// Highlight element (debugging)
js.executeScript("arguments[0].style.border='3px solid red';", element);`,
        codeTitle: 'JavaScript Executor',
      },
      {
        title: 'Select Class for Dropdowns',
        codeExplanation: 'Select class works with <select> HTML elements. selectByVisibleText() matches option text. selectByValue() matches value attribute. selectByIndex() selects by position. getOptions() returns all options.',
        code: `WebElement dropdown = driver.findElement(By.id("country"));
Select select = new Select(dropdown);

// Selection methods
select.selectByVisibleText("India");
select.selectByValue("IN");
select.selectByIndex(5);

// Get selected option
WebElement selected = select.getFirstSelectedOption();
String selectedText = selected.getText();

// Get all options
List<WebElement> options = select.getOptions();

// Check if multi-select
boolean isMultiple = select.isMultiple();`,
        codeTitle: 'Dropdown Handling',
      },
      {
        title: 'Screenshot Capture',
        codeExplanation: 'TakesScreenshot interface captures screenshots. getScreenshotAs() returns file, bytes, or base64. OutputType.FILE saves as file. Selenium 4 supports element-level screenshots.',
        code: `// Full page screenshot
TakesScreenshot ts = (TakesScreenshot) driver;
File source = ts.getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(source, new File("screenshot.png"));

// Get as Base64 (for reports)
String base64 = ts.getScreenshotAs(OutputType.BASE64);

// Element screenshot (Selenium 4)
WebElement logo = driver.findElement(By.id("logo"));
File elementShot = logo.getScreenshotAs(OutputType.FILE);`,
        codeTitle: 'Screenshot Methods',
      },
    ],
  },
  'locators': {
    sectionTitle: 'Locators',
    sectionNumber: 4,
    slides: [
      {
        title: 'Basic Locator Strategies',
        codeExplanation: 'Selenium provides 8 locator strategies. By.id() is fastest and most reliable. By.name() works for form fields. By.className() matches CSS class. By.tagName() finds by HTML tag. By.linkText() matches exact anchor text.',
        code: `// By ID - Most preferred
driver.findElement(By.id("loginBtn"));

// By Name
driver.findElement(By.name("username"));

// By Class Name
driver.findElement(By.className("submit-btn"));

// By Tag Name
driver.findElements(By.tagName("input"));

// By Link Text (exact match)
driver.findElement(By.linkText("Sign In"));

// By Partial Link Text
driver.findElement(By.partialLinkText("Sign"));`,
        codeTitle: 'Basic Locators',
      },
      {
        title: 'CSS Selectors',
        codeExplanation: 'CSS selectors are fast and readable. # prefix selects by ID. . prefix selects by class. [attr="value"] matches attributes. ^= starts-with, *= contains, $= ends-with. > for direct child, space for descendant.',
        code: `// By ID and class
driver.findElement(By.cssSelector("#username"));
driver.findElement(By.cssSelector(".login-btn"));

// By attribute
driver.findElement(By.cssSelector("[type='email']"));
driver.findElement(By.cssSelector("[data-testid='submit']"));

// Partial attribute matching
driver.findElement(By.cssSelector("[id^='user_']"));  // starts-with
driver.findElement(By.cssSelector("[class*='active']"));  // contains

// Child and descendant
driver.findElement(By.cssSelector("form > input"));
driver.findElement(By.cssSelector("div.container input"));`,
        codeTitle: 'CSS Selector Examples',
      },
      {
        title: 'XPath Locators',
        codeExplanation: 'XPath is most flexible but slower. // starts relative path. @ accesses attributes. text() matches element text. contains() for partial matching. starts-with() for prefix matching.',
        code: `// Relative XPath (preferred)
driver.findElement(By.xpath("//input[@id='username']"));

// Text-based selection
driver.findElement(By.xpath("//button[text()='Login']"));
driver.findElement(By.xpath("//a[contains(text(),'Sign')]"));

// Partial attribute matching
driver.findElement(By.xpath("//input[starts-with(@id,'user')]"));
driver.findElement(By.xpath("//div[contains(@class,'active')]"));

// Multiple conditions
driver.findElement(By.xpath("//input[@type='text' and @name='email']"));`,
        codeTitle: 'XPath Examples',
      },
      {
        title: 'XPath Axes',
        codeExplanation: 'XPath axes navigate DOM relationships. parent:: goes up one level. ancestor:: finds any parent. following-sibling:: finds next siblings. preceding-sibling:: finds previous siblings. descendant:: finds any child.',
        code: `// Parent element
driver.findElement(By.xpath("//input[@id='email']/parent::div"));

// Following sibling
driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input"));

// Preceding sibling
driver.findElement(By.xpath("//input[@id='password']/preceding-sibling::label"));

// Ancestor
driver.findElement(By.xpath("//input[@id='email']/ancestor::form"));

// Find by text in row
driver.findElement(By.xpath("//tr[td[text()='John']]/td[3]"));`,
        codeTitle: 'XPath Axes Examples',
      },
      {
        title: 'Relative Locators (Selenium 4)',
        codeExplanation: 'Selenium 4 introduced Friendly Locators based on visual position. above() finds element above. below() finds element below. toLeftOf() and toRightOf() for horizontal. near() finds within 50px.',
        code: `import static org.openqa.selenium.support.locators.RelativeLocator.with;

// Find element below another
WebElement password = driver.findElement(
    with(By.tagName("input")).below(emailField)
);

// Find element to the right
WebElement submitBtn = driver.findElement(
    with(By.tagName("button")).toRightOf(cancelBtn)
);

// Find element near another
WebElement errorMsg = driver.findElement(
    with(By.className("error")).near(emailField)
);

// Chaining relative locators
WebElement field = driver.findElement(
    with(By.tagName("input")).below(label).above(button)
);`,
        codeTitle: 'Relative Locators',
      },
    ],
  },
  'locator-best-practices': {
    sectionTitle: 'Locator Best Practices',
    sectionNumber: 5,
    slides: [
      {
        title: 'Locator Priority Order',
        content: ['Always prefer the most reliable and maintainable locator strategy. Follow this priority order for best results.'],
        table: {
          headers: ['Priority', 'Locator', 'Speed', 'When to Use'],
          rows: [
            ['1', 'ID', 'Fastest', 'Always prefer if unique and stable'],
            ['2', 'Name', 'Fast', 'Good for form inputs'],
            ['3', 'Data Attributes', 'Fast', 'data-testid, data-automation (most stable)'],
            ['4', 'CSS Selector', 'Fast', 'Flexible, readable, supports pseudo-classes'],
            ['5', 'Link Text', 'Medium', 'Only for anchor tags with stable text'],
            ['6', 'XPath', 'Slower', 'Text matching, complex DOM traversal'],
            ['7', 'Class Name', 'Varies', 'Only if unique and stable (often not)'],
            ['8', 'Tag Name', 'Slow', 'Only with findElements for lists'],
          ],
        },
      },
      {
        title: 'Best Practices - DOs',
        content: ['Follow these guidelines for creating reliable, maintainable locators:'],
        bulletPoints: [
          '✅ Use unique, stable attributes',
          '✅ Prefer data-testid attributes',
          '✅ Use relative XPath, not absolute',
          '✅ Keep locators short and readable',
          '✅ Store locators as constants/variables',
          '✅ Use explicit waits before finding',
          '✅ Work with developers to add test IDs',
          '✅ Test locators in browser DevTools first',
        ],
      },
      {
        title: "Best Practices - DON'Ts",
        content: ['Avoid these common mistakes that lead to flaky tests:'],
        bulletPoints: [
          "❌ Use absolute XPath",
          "❌ Rely on auto-generated IDs",
          "❌ Use dynamic class names",
          "❌ Use index-only locators",
          "❌ Hardcode locators in test methods",
          "❌ Use Thread.sleep() for waiting",
          "❌ Mix locator strategies randomly",
          "❌ Use fragile DOM position locators",
        ],
      },
      {
        title: 'Practice HTML Page - Login Form Example',
        content: ['Download the Practice HTML page to test these locator strategies on real elements.'],
        codeExplanation: 'This HTML form includes multiple attributes for practice: id, name, data-testid, aria-label. Each attribute allows different locator strategies. The form simulates a real login page from applications like Coursera.',
        code: `<!-- Login Form HTML Structure -->
<form id="loginForm" data-testid="login-form">
  <input type="email" id="email" name="userEmail" 
         data-testid="email-input" aria-label="Email address input" />
  <input type="password" id="password" name="userPassword" 
         data-testid="password-input" />
  <input type="checkbox" id="rememberMe" name="remember" 
         data-testid="remember-checkbox" />
  <button type="submit" id="loginBtn" data-testid="login-submit-btn" 
          aria-label="login">Login</button>
</form>`,
        codeTitle: 'Practice HTML - Login Form Structure',
      },
      {
        title: 'Login Form Locator Examples',
        codeExplanation: 'Multiple ways to locate the same element. By.id() is fastest. By.name() works for form inputs. By.cssSelector() with data-testid is most stable. By.cssSelector() with aria-label is accessibility-friendly.',
        code: `// ✅ By ID (fastest, unique)
driver.findElement(By.id("email"));
driver.findElement(By.id("loginBtn"));

// ✅ By Name (good for form inputs)
driver.findElement(By.name("userEmail"));
driver.findElement(By.name("userPassword"));

// ✅ By Data-TestID (most stable - recommended)
driver.findElement(By.cssSelector("[data-testid='email-input']"));
driver.findElement(By.cssSelector("[data-testid='login-submit-btn']"));

// ✅ By aria-label (accessibility-friendly)
driver.findElement(By.cssSelector("[aria-label='login']"));

// ✅ Combined CSS Selector
driver.findElement(By.cssSelector("#loginForm input[type='email']"));`,
        codeTitle: 'Selenium Locator Examples for Login Form',
      },
      {
        title: 'Practice HTML Page - Course Cards',
        content: ['Practice finding multiple elements and navigating card structures.'],
        codeExplanation: 'Course cards use data attributes for stable selection: data-testid for element type, data-course-id for unique identification, data-course for action buttons. This pattern is common in e-commerce and learning platforms like Coursera.',
        code: `<!-- Course Card HTML Structure -->
<div class="course-grid" data-testid="course-grid">
  <div class="course-card" data-testid="course-card" data-course-id="COURSE001">
    <h3 class="course-title" data-testid="course-title">
      Selenium WebDriver Masterclass
    </h3>
    <span class="course-instructor" data-testid="course-instructor">
      By John Smith
    </span>
    <div class="course-price" data-testid="course-price">$49.99</div>
    <button class="enroll-btn" data-testid="enroll-btn" 
            data-course="COURSE001">Enroll Now</button>
  </div>
</div>`,
        codeTitle: 'Practice HTML - Course Card Structure',
      },
      {
        title: 'Course Cards Locator Examples',
        codeExplanation: 'findElements() returns a List of WebElements. Use data-course-id to find specific cards. XPath text() function locates elements by visible text. ancestor:: axis navigates from child to parent element.',
        code: `// ✅ Find all course cards
List<WebElement> allCourses = driver.findElements(
    By.cssSelector("[data-testid='course-card']"));
System.out.println("Total courses: " + allCourses.size());

// ✅ Find specific course by data attribute
driver.findElement(By.cssSelector("[data-course-id='COURSE001']"));

// ✅ Find course by title text using XPath
driver.findElement(By.xpath(
    "//h3[text()='Selenium WebDriver Masterclass']"));

// ✅ Find enroll button for specific course
driver.findElement(By.cssSelector("[data-course='COURSE002']"));

// ✅ Navigate from title to enroll button
driver.findElement(By.xpath(
    "//h3[text()='TestNG Framework Deep Dive']" +
    "/ancestor::div[@class='course-card']//button"));`,
        codeTitle: 'Selenium Locator Examples for Course Cards',
      },
      {
        title: 'Practice HTML Page - Booking Table',
        content: ['Practice table row/column navigation and cell selection.'],
        codeExplanation: 'Tables use data attributes on rows (data-movie-id) and cells (data-testid). This structure is common in booking systems like BookMyShow. Header data-column attributes help identify columns programmatically.',
        code: `<!-- Booking Table HTML Structure -->
<table id="bookingTable" data-testid="booking-table">
  <thead>
    <tr>
      <th data-column="movie">Movie</th>
      <th data-column="showtime">Showtime</th>
      <th data-column="seats">Available Seats</th>
      <th data-column="price">Price</th>
      <th data-column="status">Status</th>
      <th data-column="action">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr data-testid="booking-row" data-movie-id="MOV001">
      <td data-testid="movie-name">Avatar 3</td>
      <td data-testid="showtime">10:00 AM</td>
      <td data-testid="seats">45</td>
      <td data-testid="price">$15.00</td>
      <td data-testid="status"><span class="status-available">Available</span></td>
      <td><button data-testid="book-btn" data-movie="MOV001">Book</button></td>
    </tr>
  </tbody>
</table>`,
        codeTitle: 'Practice HTML - Booking Table Structure',
      },
      {
        title: 'Booking Table Locator Examples',
        codeExplanation: 'Table locators use row data attributes for specific rows. XPath conditions like [td[text()=...]] filter rows by cell content. following-sibling:: navigates between cells. These patterns work with any tabular data.',
        code: `// ✅ Find all table rows
List<WebElement> rows = driver.findElements(
    By.cssSelector("#bookingTable tbody tr"));

// ✅ Find specific row by movie ID
driver.findElement(By.cssSelector("tr[data-movie-id='MOV001']"));

// ✅ Find cell by row and column
driver.findElement(By.xpath(
    "//tr[@data-movie-id='MOV003']/td[@data-testid='price']"));

// ✅ Find row containing specific text
driver.findElement(By.xpath("//tr[td[text()='Avatar 3']]"));

// ✅ Find book button for specific movie
driver.findElement(By.xpath(
    "//tr[td[text()='Spider-Man 4']]//button[@data-testid='book-btn']"));

// ✅ Find all available movies
List<WebElement> available = driver.findElements(
    By.xpath("//tr[.//span[@class='status-available']]"));

// ✅ Get price of specific movie using sibling
String price = driver.findElement(By.xpath(
    "//td[text()='The Dark Knight Returns']/following-sibling::td[3]"))
    .getText();`,
        codeTitle: 'Selenium Locator Examples for Tables',
      },
      {
        title: 'Practice HTML - Dropdowns',
        content: ['Practice dropdown selection using Selenium Select class.'],
        codeExplanation: 'HTML select elements require Selenium\'s Select class for proper interaction. The class provides selectByVisibleText(), selectByValue(), and selectByIndex() methods. Always wrap WebElement in new Select() before using select methods.',
        code: `<!-- Dropdown HTML Structure -->
<select id="categoryFilter" name="category" data-testid="category-dropdown">
  <option value="">All Categories</option>
  <option value="automation">Automation Testing</option>
  <option value="manual">Manual Testing</option>
  <option value="api">API Testing</option>
  <option value="performance">Performance Testing</option>
</select>

// Selenium Code:
Select categoryDropdown = new Select(
    driver.findElement(By.id("categoryFilter")));
categoryDropdown.selectByVisibleText("Automation Testing");
categoryDropdown.selectByValue("api");
categoryDropdown.selectByIndex(2);

// Get all options
List<WebElement> options = categoryDropdown.getOptions();

// Get selected option
String selected = categoryDropdown.getFirstSelectedOption().getText();`,
        codeTitle: 'Dropdown Selection Examples',
      },
      {
        title: 'Practice HTML - Checkboxes & Radio Buttons',
        content: ['Practice form element selection and state verification.'],
        codeExplanation: 'Checkboxes and radio buttons use isSelected() to check state. Click the element or its label to toggle. Use :checked pseudo-selector to find selected elements. Radio buttons in a group share the same name attribute.',
        code: `<!-- Checkbox/Radio HTML Structure -->
<input type="checkbox" id="selenium" name="tech" value="selenium" 
       data-testid="tech-selenium" />
<input type="radio" id="exp-senior" name="experience" value="senior" 
       data-testid="exp-senior" />

// ✅ Select checkbox by ID
WebElement seleniumCheckbox = driver.findElement(By.id("selenium"));
if (!seleniumCheckbox.isSelected()) {
    seleniumCheckbox.click();
}

// ✅ Select by data-testid
driver.findElement(By.cssSelector("[data-testid='tech-testng']")).click();

// ✅ Select radio by value
driver.findElement(By.cssSelector(
    "input[name='experience'][value='senior']")).click();

// ✅ Find all checked checkboxes
List<WebElement> checked = driver.findElements(
    By.cssSelector("input[name='tech']:checked"));

// ✅ Click label instead of input (larger click target)
driver.findElement(By.xpath("//label[text()='Selenium WebDriver']")).click();`,
        codeTitle: 'Checkbox & Radio Button Examples',
      },
      {
        title: 'Practice HTML - Dynamic Notifications',
        content: ['Practice locating dynamically appearing elements with explicit waits.'],
        codeExplanation: 'Dynamic elements require explicit waits. visibilityOfElementLocated() waits for element to appear. invisibilityOfElementLocated() waits for element to disappear. Data-type attributes identify notification types (success, error, warning).',
        code: `<!-- Notification HTML Structure -->
<div data-testid="notification" data-type="success">
  <span data-testid="notification-message">Success!</span>
  <button data-testid="close-notification">×</button>
</div>

// ✅ Wait for notification to appear
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement notification = wait.until(
    ExpectedConditions.visibilityOfElementLocated(
        By.cssSelector("[data-testid='notification']")));

// ✅ Find notification by type
driver.findElement(By.cssSelector("[data-type='success']"));
driver.findElement(By.cssSelector("[data-type='error']"));

// ✅ Find notification containing specific text
driver.findElement(By.xpath(
    "//div[@data-testid='notification'][contains(.,'successfully')]"));

// ✅ Close specific notification
driver.findElement(By.xpath(
    "//div[@data-type='error']//button[@data-testid='close-notification']"))
    .click();

// ✅ Wait for notification to disappear
wait.until(ExpectedConditions.invisibilityOfElementLocated(
    By.cssSelector("[data-type='success']")));`,
        codeTitle: 'Dynamic Element Locator Examples',
      },
      {
        title: 'Practice HTML - Modal Dialog',
        content: ['Practice modal interaction with visibility waits.'],
        codeExplanation: 'Modals overlay the page and require waits for visibility. The modal-overlay contains the modal-dialog. Close by clicking X button or Cancel. Wait for invisibility after closing to ensure UI is ready for next action.',
        code: `<!-- Modal HTML Structure -->
<div class="modal-overlay" id="sampleModal" data-testid="modal-overlay">
  <div class="modal" role="dialog" aria-modal="true" 
       data-testid="modal-dialog">
    <button data-testid="modal-close-btn">×</button>
    <button data-testid="modal-confirm-btn">Confirm</button>
    <button data-testid="modal-cancel-btn">Cancel</button>
  </div>
</div>

// ✅ Wait for modal to be visible
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.cssSelector("[data-testid='modal-dialog']")));

// ✅ Find modal elements
driver.findElement(By.cssSelector("[data-testid='modal-confirm-btn']")).click();

// ✅ Wait for modal to close
wait.until(ExpectedConditions.invisibilityOfElementLocated(
    By.cssSelector("[data-testid='modal-overlay']")));`,
        codeTitle: 'Modal Dialog Locator Examples',
      },
      {
        title: 'CSS vs XPath Comparison',
        content: ['Choose the right locator strategy based on your specific needs:'],
        table: {
          headers: ['Criteria', 'CSS Selector', 'XPath'],
          rows: [
            ['Performance', 'Faster', 'Slower'],
            ['Readability', 'More readable', 'Can be complex'],
            ['Text Matching', 'Not supported', 'Supported (text(), contains())'],
            ['Parent Traversal', 'Not supported', 'Supported (parent::, ancestor::)'],
            ['Index-based', ':nth-child', '[index], position()'],
            ['Sibling Traversal', 'Forward only (+, ~)', 'Both directions'],
          ],
        },
      },
      {
        title: 'When to Use CSS Selector',
        codeExplanation: 'CSS Selectors are faster and more readable. Use them for attribute matching, descendant selection, and pseudo-classes. They are the preferred choice for most scenarios where text matching is not required.',
        code: `// ✅ Attribute selection
driver.findElement(By.cssSelector("[data-testid='login-btn']"));
driver.findElement(By.cssSelector("input[type='email']"));

// ✅ Descendant selection
driver.findElement(By.cssSelector(".login-form input"));
driver.findElement(By.cssSelector("#bookingTable td"));

// ✅ Pseudo-classes
driver.findElement(By.cssSelector("tr:first-child"));
driver.findElement(By.cssSelector("li:nth-child(3)"));
driver.findElement(By.cssSelector("input:not([disabled])"));

// ✅ Multiple conditions
driver.findElement(By.cssSelector("input[type='email'][required]"));`,
        codeTitle: 'CSS Selector Use Cases',
      },
      {
        title: 'When to Use XPath',
        codeExplanation: 'XPath is essential when CSS cannot accomplish the task: text-based selection, navigating UP the DOM (parent/ancestor), complex row-cell conditions, and bidirectional sibling traversal.',
        code: `// ✅ Text matching (CSS cannot do this!)
driver.findElement(By.xpath("//button[text()='Login']"));
driver.findElement(By.xpath("//span[contains(text(),'Welcome')]"));

// ✅ Parent traversal (CSS cannot do this!)
driver.findElement(By.xpath("//input[@id='email']/parent::div"));
driver.findElement(By.xpath("//span[@class='error']/ancestor::form"));

// ✅ Sibling traversal (both directions)
driver.findElement(By.xpath(
    "//label[text()='Email']/following-sibling::input"));
driver.findElement(By.xpath(
    "//td[text()='Avatar 3']/preceding-sibling::td"));

// ✅ Complex conditions
driver.findElement(By.xpath("//tr[td[text()='Avatar 3']]/td[3]"));
driver.findElement(By.xpath(
    "//div[@class='course-card' and .//span[text()='$49.99']]"));`,
        codeTitle: 'XPath Use Cases',
      },
      {
        title: 'Debugging Locators - Browser Console',
        codeExplanation: 'Always test locators in browser DevTools before using in code. document.querySelector() tests CSS. $x() tests XPath. Check match count and visually verify the correct element is found.',
        code: `// Test in Browser Console (F12 → Console)

// Test CSS Selector
document.querySelector("[data-testid='login-btn']")
document.querySelectorAll(".course-card")
document.querySelectorAll(".course-card").length

// Test XPath
$x("//button[text()='Login']")
$x("//input[@id='email']")
$x("//div[@class='course-card']").length

// Highlight element (visual debugging)
var el = document.querySelector("#loginBtn");
el.style.border = "3px solid red";
el.style.backgroundColor = "yellow";

// DevTools shortcuts:
// - Ctrl+F in Elements tab to search
// - $0 refers to currently selected element
// - Right-click → Copy → Copy selector/XPath`,
        codeTitle: 'Browser Console Testing',
      },
      {
        title: 'Debugging Locators in Selenium',
        codeExplanation: 'When locators don\'t work as expected, use findElements() to get a count. Iterate through matches and print element details. This helps identify when multiple elements match or when the wrong element is found.',
        code: `// Selenium debugging - print all matching elements
List<WebElement> elements = driver.findElements(
    By.cssSelector(".course-card"));
System.out.println("Found: " + elements.size() + " elements");

for (WebElement el : elements) {
    System.out.println("Text: " + el.getText());
    System.out.println("ID: " + el.getAttribute("id"));
    System.out.println("Class: " + el.getAttribute("class"));
    System.out.println("data-testid: " + el.getAttribute("data-testid"));
    System.out.println("---");
}

// Check if element exists without throwing exception
List<WebElement> results = driver.findElements(By.id("someId"));
if (results.size() > 0) {
    System.out.println("Element found!");
} else {
    System.out.println("Element NOT found");
}`,
        codeTitle: 'Selenium Debugging Code',
      },
      {
        title: '⚠️ Avoid Absolute XPath',
        content: ['This is a critical warning about the most common locator mistake:'],
        bulletPoints: [
          'Absolute XPath like /html/body/div[1]/div[2]/form/input is EXTREMELY FRAGILE',
          'A single added or removed div will break ALL downstream locators',
          'DOM structure changes with every minor UI update',
          'Never use absolute XPath generated by browser tools without modification',
          'Always convert to relative XPath: //form[@id="login"]//input[@name="email"]',
          'Or better: use CSS selectors or data-testid attributes',
        ],
      },
      {
        title: 'Practice HTML Page Summary',
        content: ['Download the Practice HTML page to hands-on practice all these locator strategies.'],
        bulletPoints: [
          '📝 Login Form - Practice ID, Name, data-testid, aria-label locators',
          '📚 Course Cards - Practice list locators, data attributes, XPath text matching',
          '🎫 Booking Table - Practice table row/column navigation, cell selection',
          '🔽 Dropdowns - Practice Select class methods',
          '☑️ Checkboxes/Radio - Practice form element state checking',
          '🔔 Notifications - Practice dynamic element waits',
          '🪟 Modal Dialog - Practice visibility waits and modal interaction',
          '💡 Open HTML in browser, use DevTools (F12) to practice locators before coding!',
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
        content: ['Modern web apps load content dynamically via AJAX and JavaScript.'],
        bulletPoints: [
          'Elements may not be immediately available',
          'AJAX calls load data asynchronously',
          'Animations and transitions take time',
          'Without waits: NoSuchElementException, StaleElementException',
          'Never use Thread.sleep() - it is unreliable!',
        ],
      },
      {
        title: 'Implicit Wait',
        codeExplanation: 'Implicit wait is set once and applies globally to all findElement() calls. Driver polls DOM for specified duration. Returns immediately when element found. Throws exception after timeout.',
        code: `// Set once, applies to ALL findElement calls
driver.manage().timeouts()
    .implicitlyWait(Duration.ofSeconds(10));

// Now all findElement calls wait up to 10 seconds
WebElement element = driver.findElement(By.id("search"));

// Limitations:
// - Same timeout for all elements
// - Cannot wait for specific conditions
// - Can interfere with explicit waits`,
        codeTitle: 'Implicit Wait',
      },
      {
        title: 'Explicit Wait (Recommended)',
        codeExplanation: 'Explicit wait is the recommended approach. WebDriverWait with ExpectedConditions waits for specific conditions. visibilityOfElementLocated() waits until visible. elementToBeClickable() ensures clickable. More precise than implicit wait.',
        code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Wait for visibility
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("results"))
);

// Wait for clickable
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit"))).click();

// Wait for URL change
wait.until(ExpectedConditions.urlContains("/dashboard"));

// Wait for text
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.id("status"), "Complete"
));`,
        codeTitle: 'Explicit Wait Examples',
      },
      {
        title: 'Fluent Wait',
        codeExplanation: 'Fluent wait provides maximum control. withTimeout() sets total duration. pollingEvery() sets check frequency. ignoring() suppresses exceptions during polling. Use for unstable elements or complex conditions.',
        code: `Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class)
    .ignoring(StaleElementReferenceException.class);

WebElement element = fluentWait.until(driver -> {
    WebElement el = driver.findElement(By.id("dynamic"));
    return el.isDisplayed() ? el : null;
});`,
        codeTitle: 'Fluent Wait',
      },
      {
        title: 'Common ExpectedConditions',
        table: {
          headers: ['Condition', 'Use Case'],
          rows: [
            ['visibilityOfElementLocated', 'Element is visible on page'],
            ['elementToBeClickable', 'Element is visible and enabled'],
            ['invisibilityOfElementLocated', 'Loading spinner disappears'],
            ['presenceOfElementLocated', 'Element exists in DOM'],
            ['urlContains', 'Page navigation completed'],
            ['alertIsPresent', 'JavaScript alert appeared'],
            ['frameToBeAvailableAndSwitchToIt', 'iframe is loaded'],
          ],
        },
      },
    ],
  },
  'real-scripts': {
    sectionTitle: 'Real Automation Scripts',
    sectionNumber: 7,
    slides: [
      {
        title: 'Page Object Model Pattern',
        codeExplanation: 'POM separates test logic from page structure. Private locators stored as By objects. Public methods represent user actions. Constructor initializes driver and wait. Changes to UI only require updates in one place.',
        code: `public class CourseraLoginPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    private By emailField = By.id("email");
    private By passwordField = By.id("password");
    private By loginButton = By.xpath("//button[text()='Login']");
    
    public CourseraLoginPage(WebDriver driver) {
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
        codeTitle: 'CourseraLoginPage.java',
      },
      {
        title: 'Complete Login Test',
        codeExplanation: 'Test extends BaseTest for setup/teardown. @BeforeMethod initializes page objects. @Test contains business logic. Assert validates expected outcome. Test reads like user story.',
        code: `public class CourseraLoginTest extends BaseTest {
    private CourseraLoginPage loginPage;
    
    @BeforeMethod
    public void initPages() {
        driver.get("https://www.coursera.org/login");
        loginPage = new CourseraLoginPage(driver);
    }
    
    @Test
    public void testValidLogin() {
        loginPage.login("user@email.com", "Password123");
        Assert.assertTrue(driver.getCurrentUrl().contains("/browse"),
            "Should redirect to home after login");
    }
    
    @Test
    public void testInvalidLogin() {
        loginPage.login("invalid@email.com", "wrongpass");
        Assert.assertTrue(loginPage.isErrorDisplayed(),
            "Should show error message");
    }
}`,
        codeTitle: 'CourseraLoginTest.java',
      },
      {
        title: 'BookMyShow Booking Flow',
        codeExplanation: 'E2E test uses multiple page objects. Each page object handles one screen. Test simulates complete user journey. Assertions verify each step.',
        code: `@Test
public void testMovieBooking() {
    BookMyShowHomePage homePage = new BookMyShowHomePage(driver);
    SeatSelectionPage seatPage = new SeatSelectionPage(driver);
    
    driver.get("https://www.bookmyshow.com");
    
    // Select city and movie
    homePage.selectCity("Mumbai");
    homePage.searchMovie("Jawan");
    
    // Select theater and time
    homePage.selectTheater("PVR Cinemas");
    homePage.selectShowtime("7:00 PM");
    
    // Select seats
    seatPage.selectSeats("A1", "A2");
    Assert.assertEquals(seatPage.getSelectedSeatCount(), 2);
    
    // Proceed to payment
    seatPage.proceedToPayment();
    Assert.assertTrue(paymentPage.isDisplayed());
}`,
        codeTitle: 'BookMyShowTest.java',
      },
      {
        title: 'Handling Dynamic Elements Real Example',
        codeExplanation: 'Real-world scenario: BookMyShow seat IDs are dynamic with session prefix. Use partial matching or data attributes. Wait for elements to be clickable before interaction.',
        code: `public class SeatSelectionPage {
    
    public void selectSeat(String seatNumber) {
        // Seat ID format: seat_abc123_A1 (abc123 is session ID)
        WebElement seat = wait.until(ExpectedConditions.elementToBeClickable(
            By.cssSelector("[data-seat='" + seatNumber + "']")
        ));
        
        if (seat.getAttribute("class").contains("booked")) {
            throw new RuntimeException("Seat already booked");
        }
        
        seat.click();
        
        // Verify selection
        wait.until(ExpectedConditions.attributeContains(
            By.cssSelector("[data-seat='" + seatNumber + "']"),
            "class", "selected"
        ));
    }
}`,
        codeTitle: 'Dynamic Seat Selection',
      },
    ],
  },
  'testng-implementation': {
    sectionTitle: 'TestNG Implementation',
    sectionNumber: 8,
    slides: [
      {
        title: 'TestNG Annotation Lifecycle',
        content: ['TestNG annotations control test execution order:'],
        bulletPoints: [
          '@BeforeSuite → @BeforeTest → @BeforeClass → @BeforeMethod',
          '@Test (your test method runs here)',
          '@AfterMethod → @AfterClass → @AfterTest → @AfterSuite',
          'Suite level runs once per suite',
          'Method level runs for each @Test',
        ],
      },
      {
        title: 'TestNG Annotations Example',
        codeExplanation: '@BeforeClass runs once before any test in class. @BeforeMethod runs before EACH test. @Test with priority controls order. dependsOnMethods creates dependencies. groups categorize tests.',
        code: `public class TestNGExample {
    @BeforeClass
    public void setupClass() {
        System.out.println("Runs once before all tests");
    }
    
    @BeforeMethod
    public void setupTest() {
        System.out.println("Runs before each @Test");
    }
    
    @Test(priority = 1, groups = {"smoke"})
    public void testLogin() {
        System.out.println("Test 1: Login");
    }
    
    @Test(priority = 2, dependsOnMethods = "testLogin")
    public void testDashboard() {
        System.out.println("Test 2: Runs after testLogin");
    }
    
    @AfterMethod
    public void teardownTest() {
        System.out.println("Runs after each @Test");
    }
}`,
        codeTitle: 'TestNG Lifecycle',
      },
      {
        title: 'DataProvider for Data-Driven Testing',
        codeExplanation: '@DataProvider supplies test data as Object[][]. Each array is one test iteration. @Test(dataProvider="name") links to provider. Can be in same class or external class.',
        code: `@DataProvider(name = "loginData")
public Object[][] getLoginData() {
    return new Object[][] {
        {"valid@email.com", "pass123", true},
        {"invalid@email.com", "wrong", false},
        {"", "password", false}
    };
}

@Test(dataProvider = "loginData")
public void testLogin(String email, String password, boolean shouldPass) {
    loginPage.login(email, password);
    
    if (shouldPass) {
        Assert.assertTrue(homePage.isDisplayed());
    } else {
        Assert.assertTrue(loginPage.isErrorDisplayed());
    }
}`,
        codeTitle: 'DataProvider Example',
      },
      {
        title: 'TestNG Listeners',
        codeExplanation: 'ITestListener intercepts test events. onTestFailure captures screenshot. onTestSuccess logs pass. onFinish generates summary. IRetryAnalyzer retries failed tests.',
        code: `public class TestListener implements ITestListener {
    
    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("Starting: " + result.getName());
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("PASSED: " + result.getName());
    }
    
    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("FAILED: " + result.getName());
        // Capture screenshot
        WebDriver driver = ((BaseTest) result.getInstance()).getDriver();
        captureScreenshot(driver, result.getName());
    }
    
    @Override
    public void onFinish(ITestContext context) {
        System.out.println("Passed: " + context.getPassedTests().size());
        System.out.println("Failed: " + context.getFailedTests().size());
    }
}`,
        codeTitle: 'TestListener.java',
      },
      {
        title: 'Retry Failed Tests',
        codeExplanation: 'IRetryAnalyzer retries flaky tests. retry() returns true to retry, false to stop. MAX_RETRY limits attempts. Apply to all tests using IAnnotationTransformer.',
        code: `public class RetryAnalyzer implements IRetryAnalyzer {
    private int retryCount = 0;
    private static final int MAX_RETRY = 2;
    
    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < MAX_RETRY) {
            retryCount++;
            System.out.println("Retrying: " + result.getName() + 
                             " Attempt: " + retryCount);
            return true;  // Retry
        }
        return false;  // Don't retry
    }
}

// Usage
@Test(retryAnalyzer = RetryAnalyzer.class)
public void testFlakyOperation() {
    // This test retries up to 2 times on failure
}`,
        codeTitle: 'RetryAnalyzer.java',
      },
      {
        title: 'testng.xml Configuration',
        codeExplanation: 'testng.xml controls test execution. parallel="methods" runs tests in parallel. thread-count sets concurrency. <listeners> registers custom listeners. <groups> filters tests.',
        code: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Regression Suite" parallel="methods" thread-count="3">
    
    <listeners>
        <listener class-name="listeners.TestListener"/>
        <listener class-name="listeners.RetryListener"/>
    </listeners>
    
    <test name="Smoke Tests">
        <groups>
            <run><include name="smoke"/></run>
        </groups>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
        </classes>
    </test>
</suite>`,
        codeTitle: 'testng.xml',
      },
    ],
  },
  'exception-handling': {
    sectionTitle: 'Exception Handling & Selenium Exceptions',
    sectionNumber: 9,
    slides: [
      {
        title: 'Selenium Exception Hierarchy',
        content: ['All Selenium exceptions extend from WebDriverException. Understanding the hierarchy helps in proper exception handling.'],
        bulletPoints: [
          'RuntimeException → WebDriverException (parent of all Selenium exceptions)',
          'NoSuchElementException - Element not found in DOM',
          'StaleElementReferenceException - Element no longer attached to DOM',
          'ElementNotInteractableException - Element not visible/interactable',
          'ElementClickInterceptedException - Another element receives click',
          'TimeoutException - Wait condition not met in time',
          'NoSuchFrameException / NoSuchWindowException - Frame/Window not found',
        ],
      },
      {
        title: 'NoSuchElementException',
        content: ['Thrown when findElement() cannot locate an element. Most common exception in Selenium.'],
        bulletPoints: [
          'Causes: Wrong locator, element not loaded, inside frame, dynamically generated',
          'Solution: Use explicit waits, verify locator, check for frames',
        ],
        codeExplanation: 'Use WebDriverWait with ExpectedConditions to wait for element presence. Catch TimeoutException for graceful handling. For optional elements like popups, catch NoSuchElementException directly.',
        code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

try {
    WebElement searchInput = wait.until(
        ExpectedConditions.presenceOfElementLocated(By.id("searchInput"))
    );
    searchInput.sendKeys("Selenium");
} catch (TimeoutException e) {
    System.out.println("Element not found within 10 seconds");
    ScreenshotUtility.takeScreenshot(driver, "element_not_found");
}

// For optional elements (popup close button)
try {
    driver.findElement(By.id("popupClose")).click();
} catch (NoSuchElementException e) {
    System.out.println("No popup present - continuing");
}`,
        codeTitle: 'NoSuchElementException Handling',
      },
      {
        title: 'StaleElementReferenceException',
        content: ['Thrown when element reference is no longer valid because DOM was updated.'],
        bulletPoints: [
          'Causes: Page refresh, AJAX update, SPA re-render, JavaScript DOM modification',
          'Solution: Re-find element, use FluentWait with ignoring(), retry mechanism',
        ],
        codeExplanation: 'When DOM changes, element references become stale. Use FluentWait ignoring StaleElementReferenceException or implement retry logic. ExpectedConditions.refreshed() waits for element to be re-attached.',
        code: `// Using FluentWait to ignore stale elements
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofSeconds(2))
    .ignoring(StaleElementReferenceException.class);

WebElement element = wait.until(driver -> {
    WebElement el = driver.findElement(By.id("dynamicElement"));
    el.click();  // Action protected by wait
    return el;
});

// Or use refreshed condition
WebDriverWait webWait = new WebDriverWait(driver, Duration.ofSeconds(10));
webWait.until(ExpectedConditions.refreshed(
    ExpectedConditions.elementToBeClickable(By.id("courseCard"))
)).click();`,
        codeTitle: 'StaleElementReferenceException Handling',
      },
      {
        title: 'ElementNotInteractableException',
        content: ['Thrown when element is in DOM but cannot be interacted with.'],
        bulletPoints: [
          'Causes: Element hidden (display:none), zero dimensions, off-screen, disabled',
          'Solution: Wait for visibility, scroll into view, use JavaScript click',
        ],
        codeExplanation: 'Element exists but is not interactable. Wait for elementToBeClickable() instead of just presence. Scroll element into view. Use JavaScript click as fallback for hidden elements.',
        code: `// Wait for element to be clickable
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement button = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("submitButton"))
);
button.click();

// Scroll element into view if off-screen
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
Thread.sleep(500);  // Wait for scroll animation
element.click();

// JavaScript click as fallback
try {
    element.click();
} catch (ElementNotInteractableException e) {
    js.executeScript("arguments[0].click();", element);
}`,
        codeTitle: 'ElementNotInteractableException Handling',
      },
      {
        title: 'ElementClickInterceptedException',
        content: ['Thrown when click is intercepted by another element (overlay, popup, sticky header).'],
        bulletPoints: [
          'Causes: Modal overlay, cookie banner, sticky header/footer, loading spinner',
          'Solution: Wait for overlay to disappear, close popup, scroll past header',
        ],
        codeExplanation: 'Another element receives the click instead of target. Wait for overlays to disappear using invisibilityOfElementLocated(). Close popups before clicking. Scroll to avoid sticky headers.',
        code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for loading overlay to disappear
wait.until(ExpectedConditions.invisibilityOfElementLocated(
    By.className("loading-overlay")
));

// Wait for modal backdrop to disappear
wait.until(ExpectedConditions.invisibilityOfElementLocated(
    By.className("modal-backdrop")
));

// Close cookie consent if present
try {
    WebElement acceptCookies = driver.findElement(By.id("onetrust-accept-btn"));
    acceptCookies.click();
    wait.until(ExpectedConditions.invisibilityOf(acceptCookies));
} catch (NoSuchElementException e) {
    // No cookie banner
}

// Now safe to click
driver.findElement(By.id("targetButton")).click();`,
        codeTitle: 'ElementClickInterceptedException Handling',
      },
      {
        title: 'TimeoutException',
        content: ['Thrown when explicit wait condition is not met within timeout period.'],
        bulletPoints: [
          'Causes: Slow network, element never appears, wrong condition',
          'Solution: Increase timeout, verify condition is correct, check network',
        ],
        codeExplanation: 'Explicit wait exceeds timeout without condition being met. Handle gracefully with try-catch. Log current state for debugging. Consider retry with increasing timeouts.',
        code: `public boolean waitForElementWithTimeout(By locator, int seconds) {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(seconds));
    
    try {
        wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        return true;
    } catch (TimeoutException e) {
        System.out.println("Element not visible after " + seconds + " seconds");
        System.out.println("Current URL: " + driver.getCurrentUrl());
        ScreenshotUtility.takeScreenshot(driver, "timeout_" + locator);
        return false;
    }
}

// Retry with increasing timeout
int[] timeouts = {5, 10, 20};
for (int timeout : timeouts) {
    try {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    } catch (TimeoutException e) {
        System.out.println("Timeout after " + timeout + "s, retrying...");
    }
}`,
        codeTitle: 'TimeoutException Handling',
      },
      {
        title: 'NoSuchFrameException & NoSuchWindowException',
        content: ['Thrown when trying to switch to non-existent frame or closed window.'],
        bulletPoints: [
          'NoSuchFrameException: Frame doesn\'t exist or hasn\'t loaded yet',
          'NoSuchWindowException: Window has been closed or doesn\'t exist',
          'Solution: Wait for frame/window, validate handle before switch',
        ],
        codeExplanation: 'Use frameToBeAvailableAndSwitchToIt() to wait for frame. Store window handle before operations. Verify handle validity before switching.',
        code: `// Safe frame switch with wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
try {
    wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(
        By.id("paymentFrame")
    ));
} catch (TimeoutException e) {
    // Try alternative locators
    wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(
        By.xpath("//iframe[contains(@src, 'payment')]")
    ));
}

// Safe window switch
String mainWindow = driver.getWindowHandle();
driver.findElement(By.id("openPopup")).click();
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(mainWindow)) {
        driver.switchTo().window(handle);
        break;
    }
}

// Always return to main window in finally block
driver.switchTo().window(mainWindow);`,
        codeTitle: 'Frame & Window Exception Handling',
      },
      {
        title: 'NoAlertPresentException',
        content: ['Thrown when trying to switch to an alert when none is present.'],
        codeExplanation: 'Always wait for alert with ExpectedConditions.alertIsPresent(). Use try-catch for optional alerts. Check alert presence before switching.',
        code: `// Wait for alert with timeout
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

try {
    Alert alert = wait.until(ExpectedConditions.alertIsPresent());
    String alertText = alert.getText();
    System.out.println("Alert message: " + alertText);
    alert.accept();
} catch (TimeoutException e) {
    System.out.println("No alert appeared within timeout");
}

// Check if alert is present
public boolean isAlertPresent() {
    try {
        driver.switchTo().alert();
        return true;
    } catch (NoAlertPresentException e) {
        return false;
    }
}

// Handle alert if present (for unexpected popups)
public void handleAlertIfPresent() {
    try {
        Alert alert = driver.switchTo().alert();
        System.out.println("Unexpected alert: " + alert.getText());
        alert.dismiss();
    } catch (NoAlertPresentException e) {
        // No alert - continue
    }
}`,
        codeTitle: 'NoAlertPresentException Handling',
      },
      {
        title: 'InvalidSelectorException',
        content: ['Thrown when XPath or CSS selector syntax is malformed.'],
        bulletPoints: [
          'Causes: Missing brackets, wrong quotes, invalid XPath functions',
          'Common mistakes: Missing @ for attributes, unescaped quotes, wrong syntax',
        ],
        codeExplanation: 'Validate selector syntax before use. Common errors: missing @, mismatched quotes, invalid pseudo-selectors. Test selectors in browser DevTools first.',
        code: `// ❌ WRONG: Common selector mistakes
driver.findElement(By.xpath("//div[@class='container'")); // Missing ]
driver.findElement(By.cssSelector("div:contains('text')")); // :contains not CSS
driver.findElement(By.xpath("//div[class='name']")); // Missing @

// ✅ CORRECT: Proper syntax
driver.findElement(By.xpath("//div[@class='container']"));
driver.findElement(By.xpath("//div[contains(text(), 'text')]"));
driver.findElement(By.xpath("//div[@class='name']"));

// Validate selector before use
public WebElement findElementSafely(String locatorType, String value) {
    try {
        switch (locatorType.toLowerCase()) {
            case "xpath": return driver.findElement(By.xpath(value));
            case "css": return driver.findElement(By.cssSelector(value));
            default: return driver.findElement(By.id(value));
        }
    } catch (InvalidSelectorException e) {
        System.out.println("Invalid selector: " + value);
        throw e;
    }
}`,
        codeTitle: 'InvalidSelectorException Prevention',
      },
      {
        title: 'SessionNotCreatedException',
        content: ['Thrown when WebDriver session cannot be created (browser/driver issues).'],
        bulletPoints: [
          'Causes: Driver/browser version mismatch, browser not installed, port in use',
          'Solution: Use WebDriverManager, update drivers, kill zombie processes',
        ],
        codeExplanation: 'WebDriverManager automatically manages driver versions. Clear cache if version issues persist. Add headless mode for CI environments. Implement browser fallback.',
        code: `// Use WebDriverManager to handle driver versions
WebDriverManager.chromedriver().setup();

ChromeOptions options = new ChromeOptions();
options.addArguments("--start-maximized");

try {
    WebDriver driver = new ChromeDriver(options);
} catch (SessionNotCreatedException e) {
    System.out.println("Session creation failed: " + e.getMessage());
    
    // Clear cache and retry
    WebDriverManager.chromedriver().clearDriverCache().setup();
    
    // Or try headless mode for CI
    options.addArguments("--headless=new");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    
    WebDriver driver = new ChromeDriver(options);
}`,
        codeTitle: 'SessionNotCreatedException Handling',
      },
      {
        title: 'Selenium Exceptions Quick Reference',
        table: {
          headers: ['Exception', 'When Thrown', 'Solution'],
          rows: [
            ['NoSuchElementException', 'Element not in DOM', 'Use waits, verify locator'],
            ['StaleElementReferenceException', 'DOM updated', 'Re-find element, FluentWait'],
            ['ElementNotInteractableException', 'Hidden/disabled', 'Wait for clickable, scroll'],
            ['ElementClickInterceptedException', 'Overlay present', 'Close overlay, JS click'],
            ['TimeoutException', 'Wait exceeded', 'Increase timeout, verify condition'],
            ['NoSuchFrameException', 'Frame not found', 'Wait for frame'],
            ['NoSuchWindowException', 'Window closed', 'Validate handle'],
            ['NoAlertPresentException', 'No alert', 'Wait for alert'],
            ['InvalidSelectorException', 'Bad syntax', 'Fix XPath/CSS'],
            ['SessionNotCreatedException', 'Driver issue', 'Use WebDriverManager'],
          ],
        },
      },
      {
        title: 'Robust Click Utility',
        codeExplanation: 'Combines all exception handling strategies. Tries normal click first, then scroll, then JavaScript click. Use this utility for reliable element interaction.',
        code: `public void robustClick(By locator) {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    JavascriptExecutor js = (JavascriptExecutor) driver;
    
    try {
        // Strategy 1: Wait for clickable and click
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    } catch (ElementNotInteractableException | ElementClickInterceptedException e1) {
        try {
            // Strategy 2: Scroll into view and click
            js.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
            Thread.sleep(500);
            element.click();
        } catch (Exception e2) {
            // Strategy 3: JavaScript click (last resort)
            js.executeScript("arguments[0].click();", element);
        }
    }
}`,
        codeTitle: 'RobustClickUtility.java',
      },
      {
        title: 'Handling JavaScript Alerts',
        codeExplanation: 'Alerts require context switch. ExpectedConditions.alertIsPresent() waits for alert. accept() clicks OK. dismiss() clicks Cancel. sendKeys() types in prompt.',
        code: `// Wait for alert
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
Alert alert = wait.until(ExpectedConditions.alertIsPresent());

// Get alert text
String alertText = alert.getText();

// Simple alert - click OK
alert.accept();

// Confirm dialog - click Cancel
alert.dismiss();

// Prompt - enter text and accept
alert.sendKeys("User input");
alert.accept();`,
        codeTitle: 'Alert Handling',
      },
      {
        title: 'Handling Frames/iFrames',
        codeExplanation: 'Frames isolate content. Must switch context to interact. switchTo().frame() by index, name, or WebElement. defaultContent() returns to main page.',
        code: `// Switch by name or ID
driver.switchTo().frame("frameName");

// Switch by index
driver.switchTo().frame(0);

// Switch by WebElement
WebElement iframe = driver.findElement(By.tagName("iframe"));
driver.switchTo().frame(iframe);

// Interact inside frame
driver.findElement(By.id("frameElement")).click();

// Return to main content
driver.switchTo().defaultContent();

// Nested frames - go up one level
driver.switchTo().parentFrame();`,
        codeTitle: 'Frame Handling',
      },
      {
        title: 'Handling Multiple Windows',
        codeExplanation: 'Each window has unique handle. getWindowHandle() gets current. getWindowHandles() gets all. switchTo().window(handle) switches context.',
        code: `// Store main window
String mainWindow = driver.getWindowHandle();

// Click link that opens new window
driver.findElement(By.linkText("Open New")).click();

// Wait for new window
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

// Switch to new window
Set<String> windows = driver.getWindowHandles();
for (String window : windows) {
    if (!window.equals(mainWindow)) {
        driver.switchTo().window(window);
        break;
    }
}

// Close new window and return
driver.close();
driver.switchTo().window(mainWindow);`,
        codeTitle: 'Window Handling',
      },
      {
        title: 'File Upload Handling',
        codeExplanation: 'File upload uses sendKeys() on input[type="file"]. Send absolute file path. Works for standard upload inputs.',
        code: `// Standard file upload
WebElement fileInput = driver.findElement(By.id("fileUpload"));
String filePath = System.getProperty("user.dir") + "/testdata/document.pdf";
fileInput.sendKeys(filePath);

// Click upload button
driver.findElement(By.id("uploadBtn")).click();

// Verify upload success
WebElement successMsg = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.className("success"))
);
Assert.assertTrue(successMsg.getText().contains("uploaded"));`,
        codeTitle: 'File Upload',
      },
    ],
  },
  'framework-best-practices': {
    sectionTitle: 'Framework Best Practices',
    sectionNumber: 10,
    slides: [
      {
        title: 'Page Object Model Benefits',
        content: ['POM is the industry-standard design pattern for Selenium automation:'],
        bulletPoints: [
          'Separation of Concerns - Test logic separate from page structure',
          'Reusability - Page methods used across multiple tests',
          'Maintainability - Locator changes in one place only',
          'Readability - Tests read like user actions',
          'Scalability - Easy to add new pages and tests',
        ],
      },
      {
        title: 'Without POM vs With POM',
        table: {
          headers: ['Aspect', 'Without POM', 'With POM'],
          rows: [
            ['Locators', 'Scattered in test files', 'Centralized in page classes'],
            ['Code Duplication', 'High duplication', 'No duplication'],
            ['Maintenance', 'Hard to maintain', 'Easy maintenance'],
            ['Test Readability', 'Hard to understand', 'Clean and readable'],
            ['UI Changes', 'Update all tests', 'Update one page class'],
          ],
        },
      },
      {
        title: 'Page Object Structure',
        codeExplanation: 'Page Object contains: 1) Private locators as By objects for encapsulation. 2) Constructor to initialize driver and wait. 3) Public methods for user actions. 4) Methods return next page object for fluent navigation.',
        code: `public class LoginPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators - Private, centralized
    private By usernameField = By.id("username");
    private By passwordField = By.id("password");
    private By loginButton = By.id("loginBtn");
    private By errorMessage = By.className("error-msg");
    
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    // Methods return next page for fluent navigation
    public HomePage login(String username, String password) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameField))
            .sendKeys(username);
        driver.findElement(passwordField).sendKeys(password);
        driver.findElement(loginButton).click();
        return new HomePage(driver);  // Return next page
    }
    
    public String getErrorMessage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(errorMessage))
                   .getText();
    }
}`,
        codeTitle: 'LoginPage.java',
      },
      {
        title: 'BasePage Pattern',
        codeExplanation: 'Abstract BasePage provides common functionality. Protected members accessible to child pages. Common waits, clicks, and type actions centralized. All page objects extend BasePage for consistency.',
        code: `public abstract class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    protected JavascriptExecutor js;
    
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        this.js = (JavascriptExecutor) driver;
    }
    
    protected WebElement waitForVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }
    
    protected void waitAndClick(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }
    
    protected void waitAndType(By locator, String text) {
        WebElement el = waitForVisible(locator);
        el.clear();
        el.sendKeys(text);
    }
    
    protected void jsClick(WebElement element) {
        js.executeScript("arguments[0].click();", element);
    }
    
    public abstract boolean isPageLoaded();
}`,
        codeTitle: 'BasePage.java',
      },
      {
        title: 'Page Factory Pattern',
        codeExplanation: '@FindBy annotation defines locators declaratively. PageFactory.initElements() initializes elements lazily. @CacheLookup caches static elements for performance. Elements are proxied and located on first use.',
        code: `public class CourseraHomePage {
    private WebDriver driver;
    
    @FindBy(id = "searchInput")
    private WebElement searchBox;
    
    @FindBy(css = ".course-card")
    private List<WebElement> courseCards;
    
    @FindBy(linkText = "Sign In")
    @CacheLookup  // Cache for static elements only
    private WebElement signInLink;
    
    @FindBy(how = How.XPATH, using = "//button[@type='submit']")
    private WebElement searchButton;
    
    public CourseraHomePage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);  // Initialize elements
    }
    
    public void searchCourse(String name) {
        searchBox.clear();
        searchBox.sendKeys(name);
        searchButton.click();
    }
    
    public int getCourseCount() {
        return courseCards.size();
    }
}`,
        codeTitle: 'Page Factory Example',
      },
      {
        title: 'Reusable Components Pattern',
        codeExplanation: 'Common UI components like header, footer, modal, pagination are separate classes. Components are composed in page objects. Reduces duplication across pages that share common elements.',
        code: `public class CommonComponents {
    private WebDriver driver;
    private WebDriverWait wait;
    
    public CommonComponents(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    // Header component methods
    public void searchGlobal(String term) {
        driver.findElement(By.id("globalSearch")).sendKeys(term + Keys.ENTER);
    }
    
    // Modal component methods
    public void closeModal() {
        wait.until(ExpectedConditions.elementToBeClickable(
            By.cssSelector(".modal .close-button")
        )).click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.className("modal-overlay")
        ));
    }
    
    // Pagination component methods
    public void goToPage(int pageNumber) {
        driver.findElement(By.xpath("//a[text()='" + pageNumber + "']")).click();
    }
}`,
        codeTitle: 'CommonComponents.java',
      },
      {
        title: 'Logging with Log4j2',
        codeExplanation: 'Log4j2 provides structured logging. LogManager.getLogger() creates logger per class. log.info() for key actions. log.debug() for details. log.error() for failures. Logs stored in rolling files.',
        code: `public class BookingTest extends BaseTest {
    private static final Logger log = LogManager.getLogger(BookingTest.class);
    
    @Test
    public void testMovieBooking() {
        log.info("Starting movie booking test");
        
        try {
            log.debug("Navigating to BookMyShow");
            driver.get("https://www.bookmyshow.com");
            
            log.info("Selecting city: Mumbai");
            homePage.selectCity("Mumbai");
            
            log.debug("Searching for movie: Jawan");
            homePage.searchMovie("Jawan");
            
            log.info("Test completed successfully");
        } catch (Exception e) {
            log.error("Test failed: " + e.getMessage());
            throw e;
        }
    }
}`,
        codeTitle: 'Logging Example',
      },
      {
        title: 'Log4j2 Configuration',
        codeExplanation: 'XML configuration for Log4j2. Console appender for real-time logs. RollingFile appender for log files with size/time policies. Separate error log file. Pattern includes timestamp, thread, level.',
        code: `<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="INFO">
  <Properties>
    <Property name="logPath">logs</Property>
    <Property name="pattern">
      %d{yyyy-MM-dd HH:mm:ss} [%t] %-5level %logger{36} - %msg%n
    </Property>
  </Properties>
  
  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
      <PatternLayout pattern="\${pattern}"/>
    </Console>
    <RollingFile name="FileLogger" 
                 fileName="\${logPath}/automation.log"
                 filePattern="\${logPath}/automation-%d{yyyy-MM-dd}.log">
      <PatternLayout pattern="\${pattern}"/>
      <Policies>
        <SizeBasedTriggeringPolicy size="10MB"/>
      </Policies>
    </RollingFile>
  </Appenders>
  
  <Loggers>
    <Root level="INFO">
      <AppenderRef ref="Console"/>
      <AppenderRef ref="FileLogger"/>
    </Root>
  </Loggers>
</Configuration>`,
        codeTitle: 'log4j2.xml',
      },
      {
        title: 'Extent Reports Integration',
        codeExplanation: 'ExtentReports generates HTML reports. ExtentSparkReporter configures output. createTest() for each test. log() records pass/fail/info. attachScreenshot() adds images. flush() writes report.',
        code: `public class ExtentReportManager {
    private static ExtentReports extent;
    private static ThreadLocal<ExtentTest> test = new ThreadLocal<>();
    
    public static void initReport() {
        ExtentSparkReporter spark = new ExtentSparkReporter("reports/extent.html");
        spark.config().setTheme(Theme.STANDARD);
        spark.config().setDocumentTitle("Automation Report");
        
        extent = new ExtentReports();
        extent.attachReporter(spark);
        extent.setSystemInfo("Environment", "QA");
        extent.setSystemInfo("Browser", "Chrome");
    }
    
    public static void createTest(String testName) {
        test.set(extent.createTest(testName));
    }
    
    public static void logPass(String message) {
        test.get().log(Status.PASS, message);
    }
    
    public static void logFail(String message, Throwable t) {
        test.get().log(Status.FAIL, message);
        test.get().fail(t);
    }
    
    public static void attachScreenshot(String path) {
        test.get().addScreenCaptureFromPath(path);
    }
    
    public static void flushReport() {
        extent.flush();
    }
}`,
        codeTitle: 'ExtentReportManager.java',
      },
      {
        title: 'Screenshot on Failure',
        codeExplanation: 'TestNG listener captures screenshots on test failure. Get driver from test instance. TakesScreenshot interface captures image. Save with test name and timestamp. Attach to report.',
        code: `public class TestListener implements ITestListener {
    
    @Override
    public void onTestFailure(ITestResult result) {
        WebDriver driver = ((BaseTest) result.getInstance()).getDriver();
        
        // Generate unique filename
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String screenshotName = result.getName() + "_" + timestamp + ".png";
        String screenshotPath = "screenshots/" + screenshotName;
        
        try {
            // Capture screenshot
            File source = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            FileUtils.copyFile(source, new File(screenshotPath));
            
            // Attach to Extent Report
            ExtentReportManager.attachScreenshot(screenshotPath);
            ExtentReportManager.logFail("Test Failed", result.getThrowable());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        ExtentReportManager.logPass("Test Passed: " + result.getName());
    }
}`,
        codeTitle: 'Screenshot Listener',
      },
      {
        title: 'Configuration Management',
        codeExplanation: 'ConfigReader utility loads properties file once. Static block loads on class load. getProperty() provides typed access. Separates config from code for environment flexibility.',
        code: `public class ConfigReader {
    private static Properties properties;
    
    static {
        try {
            FileInputStream fis = new FileInputStream("src/test/resources/config.properties");
            properties = new Properties();
            properties.load(fis);
        } catch (IOException e) {
            throw new RuntimeException("Config file not found!");
        }
    }
    
    public static String getProperty(String key) {
        return properties.getProperty(key);
    }
    
    public static int getIntProperty(String key) {
        return Integer.parseInt(properties.getProperty(key));
    }
    
    public static boolean getBooleanProperty(String key) {
        return Boolean.parseBoolean(properties.getProperty(key));
    }
}

// config.properties
// browser=chrome
// baseUrl=https://www.coursera.org
// implicitWait=10
// headless=false`,
        codeTitle: 'ConfigReader.java',
      },
      {
        title: 'Framework Best Practices Summary',
        bulletPoints: [
          '✅ Use Page Object Model for all page interactions',
          '✅ Create BasePage with common methods',
          '✅ Use Page Factory for cleaner element declaration',
          '✅ Implement proper logging with Log4j2',
          '✅ Generate HTML reports with ExtentReports',
          '✅ Capture screenshots on test failures',
          '✅ Externalize configuration in properties files',
          '✅ Use ThreadLocal for parallel test execution',
          '❌ Avoid hardcoding values in test scripts',
          '❌ Never use Thread.sleep() for synchronization',
        ],
      },
    ],
  },
  'advanced-concepts': {
    sectionTitle: 'Advanced Concepts',
    sectionNumber: 11,
    slides: [
      {
        title: 'Understanding Shadow DOM',
        content: ['Shadow DOM provides encapsulation for web components, isolating elements from main DOM.'],
        bulletPoints: [
          'Open Shadow DOM - Accessible via element.shadowRoot, Selenium can interact',
          'Closed Shadow DOM - shadowRoot returns null, very difficult to automate',
          'Standard locators cannot find elements inside Shadow DOM',
          'Must get shadow root first, then find elements within it',
          'Common in modern web frameworks and custom components',
        ],
      },
      {
        title: 'Shadow DOM - Selenium 4 Native Support',
        codeExplanation: 'Selenium 4 provides native getShadowRoot() method. First find shadow host element. Get shadow root as SearchContext. Then find elements inside shadow DOM using standard locators.',
        code: `// Selenium 4 - Native Shadow DOM support
WebElement shadowHost = driver.findElement(By.cssSelector("custom-element"));

// Get shadow root (returns SearchContext)
SearchContext shadowRoot = shadowHost.getShadowRoot();

// Find elements inside shadow DOM
WebElement shadowInput = shadowRoot.findElement(By.cssSelector("input"));
WebElement shadowButton = shadowRoot.findElement(By.cssSelector("button"));

// Interact with shadow elements
shadowInput.sendKeys("Text in Shadow DOM");
shadowButton.click();

// Find multiple elements
List<WebElement> items = shadowRoot.findElements(By.cssSelector("li"));`,
        codeTitle: 'Shadow DOM Selenium 4',
      },
      {
        title: 'Nested Shadow DOM Handling',
        codeExplanation: 'For deeply nested shadow DOMs, traverse level by level. Get shadow root at each level. Find next host element within shadow root. Repeat until reaching target element.',
        code: `// Nested Shadow DOM traversal
public WebElement getNestedShadowElement() {
    // Level 1: Outer component
    WebElement outerHost = driver.findElement(By.cssSelector("outer-component"));
    SearchContext outerShadow = outerHost.getShadowRoot();
    
    // Level 2: Inner component inside outer's shadow
    WebElement innerHost = outerShadow.findElement(By.cssSelector("inner-component"));
    SearchContext innerShadow = innerHost.getShadowRoot();
    
    // Level 3: Target element in innermost shadow
    WebElement targetElement = innerShadow.findElement(By.cssSelector(".target"));
    return targetElement;
}

// Generic traversal method
public WebElement traverseShadowDOM(String... selectors) {
    SearchContext context = driver;
    for (int i = 0; i < selectors.length - 1; i++) {
        WebElement host = context.findElement(By.cssSelector(selectors[i]));
        context = host.getShadowRoot();
    }
    return context.findElement(By.cssSelector(selectors[selectors.length - 1]));
}`,
        codeTitle: 'Nested Shadow DOM',
      },
      {
        title: 'Shadow DOM - JavaScript Approach',
        codeExplanation: 'For Selenium 3 or complex scenarios, use JavaScriptExecutor. executeScript() can access shadowRoot property. querySelector inside shadow root finds elements. Works with both Selenium 3 and 4.',
        code: `public class ShadowDOMHandler {
    private JavascriptExecutor js;
    
    public ShadowDOMHandler(WebDriver driver) {
        this.js = (JavascriptExecutor) driver;
    }
    
    // Get shadow root using JavaScript
    public WebElement getShadowRoot(WebElement host) {
        return (WebElement) js.executeScript(
            "return arguments[0].shadowRoot", host
        );
    }
    
    // Find element in shadow DOM
    public WebElement findInShadow(WebElement shadowRoot, String css) {
        return (WebElement) js.executeScript(
            "return arguments[0].querySelector(arguments[1])", 
            shadowRoot, css
        );
    }
    
    // One-liner for simple shadow access
    public WebElement getShadowElement(String hostCss, String elementCss) {
        return (WebElement) js.executeScript(
            "return document.querySelector('" + hostCss + "')" +
            ".shadowRoot.querySelector('" + elementCss + "')"
        );
    }
}`,
        codeTitle: 'JavaScript Shadow DOM',
      },
      {
        title: 'Headless Browser Execution',
        content: ['Headless mode runs browser without UI. Faster execution, ideal for CI/CD.'],
        bulletPoints: [
          '--headless=new for Chrome 109+ (improved headless mode)',
          'Set window size explicitly: --window-size=1920,1080',
          '--no-sandbox and --disable-dev-shm-usage for Docker/CI',
          'Screenshots still work in headless mode',
          'Useful for servers without display (Jenkins, GitHub Actions)',
        ],
      },
      {
        title: 'Headless Configuration',
        codeExplanation: 'Configure headless mode with browser options. Chrome uses --headless=new for new mode. Firefox uses -headless. Set window size explicitly. Add anti-detection options.',
        code: `// Chrome Headless
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.addArguments("--headless=new");       // New headless mode
chromeOptions.addArguments("--window-size=1920,1080");
chromeOptions.addArguments("--disable-gpu");
chromeOptions.addArguments("--no-sandbox");
chromeOptions.addArguments("--disable-dev-shm-usage");

// Prevent detection as headless
chromeOptions.addArguments("--disable-blink-features=AutomationControlled");
WebDriver driver = new ChromeDriver(chromeOptions);

// Firefox Headless
FirefoxOptions ffOptions = new FirefoxOptions();
ffOptions.addArguments("-headless");
ffOptions.addArguments("--width=1920");
ffOptions.addArguments("--height=1080");
WebDriver driver = new FirefoxDriver(ffOptions);

// Edge Headless
EdgeOptions edgeOptions = new EdgeOptions();
edgeOptions.addArguments("--headless=new");
WebDriver driver = new EdgeDriver(edgeOptions);`,
        codeTitle: 'Headless Configuration',
      },
      {
        title: 'Chrome DevTools Protocol (CDP)',
        content: ['Selenium 4 provides native CDP integration for advanced browser control.'],
        bulletPoints: [
          'Network interception and monitoring',
          'Console log capture',
          'Performance metrics collection',
          'Network condition emulation (slow 3G, offline)',
          'Geolocation mocking',
          'Device emulation for mobile testing',
        ],
      },
      {
        title: 'CDP - Network & Console',
        codeExplanation: 'DevTools class provides CDP access. Enable Log domain to capture console. Enable Network domain for request monitoring. Add listeners for events. Useful for debugging and performance testing.',
        code: `ChromeDriver driver = new ChromeDriver();
DevTools devTools = driver.getDevTools();
devTools.createSession();

// Capture console logs
devTools.send(Log.enable());
devTools.addListener(Log.entryAdded(), entry -> {
    System.out.println("Console [" + entry.getLevel() + "]: " + entry.getText());
});

// Monitor network requests
devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));
devTools.addListener(Network.requestWillBeSent(), request -> {
    System.out.println("Request: " + request.getRequest().getUrl());
});
devTools.addListener(Network.responseReceived(), response -> {
    System.out.println("Response: " + response.getResponse().getStatus());
});

driver.get("https://www.coursera.org");`,
        codeTitle: 'CDP Network & Console',
      },
      {
        title: 'CDP - Network Throttling',
        codeExplanation: 'Emulate slow network conditions for testing. Set latency, download/upload speeds. Test application behavior on slow networks. Useful for performance and UX testing.',
        code: `ChromeDriver driver = new ChromeDriver();
DevTools devTools = driver.getDevTools();
devTools.createSession();

// Enable network domain
devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));

// Simulate slow 3G network
devTools.send(Network.emulateNetworkConditions(
    false,           // offline
    100,             // latency (ms)
    750 * 1024 / 8,  // download throughput (bytes/sec) - 750 kbps
    250 * 1024 / 8,  // upload throughput (bytes/sec) - 250 kbps
    Optional.of(ConnectionType.CELLULAR3G)
));

// Test page load on slow network
long startTime = System.currentTimeMillis();
driver.get("https://www.coursera.org");
long loadTime = System.currentTimeMillis() - startTime;
System.out.println("Page load time on 3G: " + loadTime + "ms");`,
        codeTitle: 'Network Throttling',
      },
      {
        title: 'Cookie Management',
        codeExplanation: 'Cookies maintain session state. getCookies() retrieves all. addCookie() creates new cookie with builder. deleteCookieNamed() removes specific cookie. Useful for bypassing login in tests.',
        code: `// Get all cookies
Set<Cookie> cookies = driver.manage().getCookies();
for (Cookie cookie : cookies) {
    System.out.println(cookie.getName() + " = " + cookie.getValue());
}

// Get specific cookie
Cookie sessionCookie = driver.manage().getCookieNamed("session_id");
System.out.println("Session: " + sessionCookie.getValue());

// Add cookie (e.g., to bypass login)
Cookie authCookie = new Cookie.Builder("auth_token", "abc123xyz")
    .domain(".coursera.org")
    .path("/")
    .isSecure(true)
    .expiresOn(new Date(System.currentTimeMillis() + 3600000))
    .build();
driver.manage().addCookie(authCookie);
driver.navigate().refresh();  // Reload with new cookie

// Delete cookies
driver.manage().deleteCookieNamed("promo_shown");
driver.manage().deleteAllCookies();  // Clear all`,
        codeTitle: 'Cookie Management',
      },
      {
        title: 'Local & Session Storage',
        codeExplanation: 'Access browser storage via JavaScriptExecutor. localStorage persists across sessions. sessionStorage cleared when tab closes. Useful for testing storage-dependent features.',
        code: `JavascriptExecutor js = (JavascriptExecutor) driver;

// Get localStorage item
String token = (String) js.executeScript(
    "return localStorage.getItem('authToken');"
);

// Set localStorage item
js.executeScript(
    "localStorage.setItem('userPrefs', JSON.stringify({theme: 'dark'}));"
);

// Remove localStorage item
js.executeScript("localStorage.removeItem('tempData');");

// Clear all localStorage
js.executeScript("localStorage.clear();");

// Session storage (same API)
js.executeScript("sessionStorage.setItem('pageVisited', 'true');");
String visited = (String) js.executeScript(
    "return sessionStorage.getItem('pageVisited');"
);`,
        codeTitle: 'Browser Storage',
      },
      {
        title: 'Mobile Web Emulation',
        codeExplanation: 'Chrome DevTools can emulate mobile devices. Set device metrics for screen size. Enable touch events. Set mobile user agent. Useful for responsive design testing.',
        code: `ChromeDriver driver = new ChromeDriver();
DevTools devTools = driver.getDevTools();
devTools.createSession();

// Emulate iPhone 12 Pro
devTools.send(Emulation.setDeviceMetricsOverride(
    390,              // width
    844,              // height  
    3,                // deviceScaleFactor (retina)
    true,             // mobile
    Optional.empty(), // scale
    Optional.empty(), // screenWidth
    Optional.empty(), // screenHeight
    Optional.empty(), // positionX
    Optional.empty(), // positionY
    Optional.empty(), // dontSetVisibleSize
    Optional.empty(), // screenOrientation
    Optional.empty(), // viewport
    Optional.empty()  // displayFeature
));

// Set mobile user agent
devTools.send(Emulation.setUserAgentOverride(
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)...",
    Optional.empty(), Optional.empty(), Optional.empty()
));

driver.get("https://www.coursera.org");`,
        codeTitle: 'Mobile Emulation',
      },
      {
        title: 'Advanced Concepts Summary',
        table: {
          headers: ['Concept', 'Use Case', 'Key Method'],
          rows: [
            ['Shadow DOM', 'Web components', 'getShadowRoot()'],
            ['Headless Mode', 'CI/CD pipelines', '--headless=new'],
            ['CDP Network', 'Performance testing', 'Network.enable()'],
            ['CDP Console', 'Debug logging', 'Log.enable()'],
            ['Cookies', 'Session management', 'manage().getCookies()'],
            ['Storage', 'Client-side data', 'localStorage API'],
            ['Mobile Emulation', 'Responsive testing', 'setDeviceMetricsOverride()'],
          ],
        },
      },
    ],
  },
  'interview-prep': {
    sectionTitle: 'Interview Preparation',
    sectionNumber: 12,
    slides: [
      {
        title: 'Q1: What is Selenium and Components?',
        content: ['Selenium is an open-source web automation framework with 4 components:'],
        bulletPoints: [
          'Selenium IDE - Record and playback browser extension',
          'Selenium WebDriver - Core API for browser automation (industry standard)',
          'Selenium Grid - Distributed parallel execution',
          'Selenium RC - Deprecated, replaced by WebDriver',
        ],
        codeExplanation: 'Real Scenario: Automating Coursera login demonstrates WebDriver component. Create driver, navigate to URL, interact with elements, verify results, close browser.',
        code: `WebDriver driver = new ChromeDriver();
driver.get("https://www.coursera.org/login");
driver.findElement(By.id("email")).sendKeys("user@email.com");
driver.findElement(By.id("password")).sendKeys("password123");
driver.findElement(By.xpath("//button[text()='Login']")).click();
Assert.assertTrue(driver.getCurrentUrl().contains("/browse"));
driver.quit();`,
        codeTitle: 'Coursera Login Example',
      },
      {
        title: 'Q2: close() vs quit()',
        content: ['close() closes current window only. quit() closes all windows and ends session.'],
        codeExplanation: 'Real Scenario: BookMyShow opens payment gateway in new window. Use close() on payment window, then switch back to booking window. Use quit() at end to close everything.',
        code: `String mainWindow = driver.getWindowHandle();
driver.findElement(By.id("payNow")).click(); // Opens new window

// Switch to payment window
for (String window : driver.getWindowHandles()) {
    if (!window.equals(mainWindow)) {
        driver.switchTo().window(window);
        break;
    }
}

driver.findElement(By.id("cardNumber")).sendKeys("4111111111111111");
driver.close();  // Close payment window ONLY
driver.switchTo().window(mainWindow);  // Back to booking
driver.quit();  // Close all at end`,
        codeTitle: 'BookMyShow Payment Window',
      },
      {
        title: 'Q3: Types of Waits',
        content: ['Implicit (global), Explicit (condition-specific), Fluent (custom polling)'],
        codeExplanation: 'Real Scenario: Coursera search shows loading spinner. Implicit wait for basic elements. Explicit wait for spinner to disappear and results to load.',
        code: `// Implicit - global, applies to all findElement
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// Explicit - condition-specific (RECOMMENDED)
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Wait for spinner to disappear
wait.until(ExpectedConditions.invisibilityOfElementLocated(
    By.className("loading-spinner")
));

// Wait for results
WebElement results = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.className("search-results"))
);`,
        codeTitle: 'Coursera Search Waits',
      },
      {
        title: 'Q4: Handle Dynamic Elements',
        content: ['Use partial matching, data attributes, or element relationships.'],
        codeExplanation: 'Real Scenario: BookMyShow seat IDs include session prefix (seat_abc123_A1). Use data-seat attribute or partial ID matching instead of full dynamic ID.',
        code: `// BAD: Full dynamic ID
driver.findElement(By.id("seat_abc123_A1")); // Changes each session!

// GOOD: Use data attribute
driver.findElement(By.cssSelector("[data-seat='A1']"));

// GOOD: Partial ID matching
driver.findElement(By.cssSelector("[id*='_A1']"));

// GOOD: Find by relationship
driver.findElement(By.xpath(
    "//div[@class='theater'][.//h4[text()='PVR']]" +
    "//div[@class='showtime'][.//span[text()='7:00 PM']]//button"
));`,
        codeTitle: 'BookMyShow Dynamic Seats',
      },
      {
        title: 'Q5: Page Object Model',
        content: ['Design pattern: Each page is a class with locators and actions.'],
        codeExplanation: 'Real Scenario: Coursera login page as Page Object. Private locators centralized. Public methods for user actions. Test classes use page methods, not direct locators.',
        code: `public class CourseraLoginPage {
    private By emailField = By.id("email");
    private By passwordField = By.id("password");
    private By loginButton = By.xpath("//button[text()='Login']");
    
    public void login(String email, String password) {
        driver.findElement(emailField).sendKeys(email);
        driver.findElement(passwordField).sendKeys(password);
        driver.findElement(loginButton).click();
    }
}

// Test class - clean, readable
loginPage.login("user@email.com", "password123");
Assert.assertTrue(homePage.isDisplayed());`,
        codeTitle: 'Coursera Login POM',
      },
      {
        title: 'Q6: Handle Frames',
        content: ['switchTo().frame() by index, name, or WebElement. defaultContent() to return.'],
        codeExplanation: 'Real Scenario: Coursera video player in iframe. Switch to frame before interacting with player controls. Switch back after.',
        code: `// Wait for iframe
WebElement videoFrame = wait.until(
    ExpectedConditions.presenceOfElementLocated(By.id("video-player"))
);

// Switch to frame
driver.switchTo().frame(videoFrame);

// Interact inside frame
WebElement playBtn = driver.findElement(By.className("play-btn"));
playBtn.click();

// Return to main page
driver.switchTo().defaultContent();

// Continue with main page elements
driver.findElement(By.className("course-title"));`,
        codeTitle: 'Coursera Video Frame',
      },
      {
        title: 'Q7: Handle Alerts',
        content: ['switchTo().alert() returns Alert. accept() for OK, dismiss() for Cancel.'],
        codeExplanation: 'Real Scenario: BookMyShow booking confirmation alert. Wait for alert, get message, accept or dismiss based on content.',
        code: `driver.findElement(By.id("confirmBooking")).click();

// Wait for alert
Alert alert = wait.until(ExpectedConditions.alertIsPresent());

// Get alert text
String message = alert.getText();
System.out.println("Alert: " + message);

// Accept (OK) or Dismiss (Cancel)
if (message.contains("confirm your booking")) {
    alert.accept();
} else {
    alert.dismiss();
}`,
        codeTitle: 'BookMyShow Confirmation Alert',
      },
      {
        title: 'Q8: Handle Multiple Windows',
        content: ['getWindowHandle() for current, getWindowHandles() for all, switchTo().window()'],
        codeExplanation: 'Real Scenario: RedBus opens train details in new window. Store main window, switch to new, interact, close, return.',
        code: `String mainWindow = driver.getWindowHandle();
driver.findElement(By.linkText("View Details")).click();

// Wait for new window
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

// Switch to new window
for (String window : driver.getWindowHandles()) {
    if (!window.equals(mainWindow)) {
        driver.switchTo().window(window);
        break;
    }
}

// Work in new window
System.out.println("New: " + driver.getTitle());

// Close and return
driver.close();
driver.switchTo().window(mainWindow);`,
        codeTitle: 'RedBus Train Details Window',
      },
      {
        title: 'Q9: StaleElementReferenceException',
        content: ['Element reference invalid after DOM change. Solution: re-find element.'],
        codeExplanation: 'Real Scenario: Coursera filter changes course list via AJAX. Old element references become stale. Re-find after DOM changes.',
        code: `WebElement firstCourse = driver.findElement(By.cssSelector(".course-card"));
System.out.println("Before: " + firstCourse.getText());

// Apply filter - DOM refreshes
driver.findElement(By.xpath("//label[text()='Beginner']")).click();
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("spinner")));

// firstCourse is now STALE!
// Solution: Re-find the element
WebElement refreshedCourse = driver.findElement(By.cssSelector(".course-card"));
System.out.println("After: " + refreshedCourse.getText());`,
        codeTitle: 'Coursera Filter Stale Element',
      },
      {
        title: 'Q10: Handle Dropdowns',
        content: ['Select class for <select>. Custom dropdowns: click to open, find option.'],
        codeExplanation: 'Real Scenario: BookMyShow city is custom dropdown (not <select>). Click trigger, wait for list, type to search, click option.',
        code: `// CUSTOM dropdown (BookMyShow city)
driver.findElement(By.className("city-selector")).click();
wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("city-list")));
driver.findElement(By.cssSelector(".city-search input")).sendKeys("Mumbai");
driver.findElement(By.xpath("//li[text()='Mumbai']")).click();

// STANDARD <select> dropdown
WebElement dropdown = driver.findElement(By.id("ticketCount"));
Select select = new Select(dropdown);
select.selectByVisibleText("2 Tickets");
select.selectByValue("2");
select.selectByIndex(1);`,
        codeTitle: 'BookMyShow Dropdowns',
      },
      {
        title: 'Q11: DataProvider for Data-Driven Testing',
        content: ['@DataProvider supplies test data. Each row is one test execution.'],
        codeExplanation: 'Real Scenario: Test Coursera login with multiple credentials. DataProvider returns array of test data. Test runs once per row.',
        code: `@DataProvider(name = "loginData")
public Object[][] getLoginData() {
    return new Object[][] {
        {"valid@email.com", "Pass123", true},
        {"invalid@email.com", "wrong", false},
        {"", "password", false}
    };
}

@Test(dataProvider = "loginData")
public void testLogin(String email, String pass, boolean shouldPass) {
    loginPage.login(email, pass);
    if (shouldPass) {
        Assert.assertTrue(homePage.isDisplayed());
    } else {
        Assert.assertTrue(loginPage.isErrorDisplayed());
    }
}`,
        codeTitle: 'Coursera Login DataProvider',
      },
      {
        title: 'Q12: TestNG Listeners',
        content: ['ITestListener intercepts events. IRetryAnalyzer retries failed tests.'],
        codeExplanation: 'Real Scenario: Capture screenshot on failure, log results, retry flaky tests. Listener integrates with CI/CD pipeline.',
        code: `public class TestListener implements ITestListener {
    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("FAILED: " + result.getName());
        WebDriver driver = ((BaseTest) result.getInstance()).getDriver();
        TakesScreenshot ts = (TakesScreenshot) driver;
        File source = ts.getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(source, new File("screenshots/" + result.getName() + ".png"));
    }
}

public class RetryAnalyzer implements IRetryAnalyzer {
    private int count = 0;
    public boolean retry(ITestResult result) {
        if (count < 2) { count++; return true; }
        return false;
    }
}`,
        codeTitle: 'Listener with Screenshot',
      },
      {
        title: 'How to Explain Your Project',
        content: ['Structure your answer: Framework, Tech Stack, Features, Applications, Metrics'],
        bulletPoints: [
          'Framework: Hybrid Selenium with Page Object Model',
          'Tech Stack: Java, Selenium 4, TestNG, Maven, Jenkins',
          'Features: Parallel execution, Extent Reports, Log4j, Data-driven',
          'Applications: Coursera, BookMyShow, Ticket Booking',
          'Metrics: 200+ tests, 60% manual effort reduction, 40% more bugs caught',
        ],
      },
      {
        title: 'Common Challenges & Solutions',
        table: {
          headers: ['Challenge', 'Solution'],
          rows: [
            ['StaleElementException', 'Re-find element, explicit waits, retry logic'],
            ['Dynamic locators', 'Partial matching, data-testid, XPath axes'],
            ['Synchronization', 'Explicit waits, fluent waits, custom conditions'],
            ['Parallel execution', 'ThreadLocal WebDriver, isolated test data'],
            ['Flaky tests', 'RetryAnalyzer, stable locators, proper waits'],
          ],
        },
      },
    ],
  },
};
