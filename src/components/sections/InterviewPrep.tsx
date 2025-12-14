import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';
import { HelpCircle, Briefcase, AlertTriangle, CheckCircle, Code } from 'lucide-react';

export const InterviewPrep = () => {
  const section = sections.find(s => s.id === 'interview-prep')!;

  const basicQuestions = [
    {
      q: "What is Selenium and what are its components?",
      a: "Selenium is an open-source web automation framework. It has 4 components: Selenium IDE (record/playback), Selenium RC (deprecated), Selenium WebDriver (browser automation API), and Selenium Grid (parallel execution across machines)."
    },
    {
      q: "What is the difference between driver.close() and driver.quit()?",
      a: "close() closes only the current browser window focused by WebDriver. quit() closes all browser windows opened by WebDriver and ends the WebDriver session, terminating the WebDriver process."
    },
    {
      q: "What are the different types of waits in Selenium?",
      a: "Implicit Wait (global timeout for finding elements), Explicit Wait (condition-specific wait using WebDriverWait with ExpectedConditions), and Fluent Wait (explicit wait with custom polling interval and exception handling)."
    },
    {
      q: "How do you handle dynamic elements?",
      a: "Use partial attribute matching with contains(), starts-with() in XPath or CSS [attr*='value']. Use explicit waits, identify stable parent elements, use data-testid attributes, or work with developers to add test IDs."
    },
    {
      q: "What is Page Object Model and why do we use it?",
      a: "POM is a design pattern where each web page is represented as a class. Elements are stored as variables and actions as methods. Benefits: code reusability, maintainability, readability, and separation of test logic from page structure."
    },
  ];

  const advancedQuestions = [
    {
      q: "Difference between findElement() and findElements()?",
      a: "findElement() returns a single WebElement and throws NoSuchElementException if not found. findElements() returns a List<WebElement> and returns an empty list if no elements found (no exception)."
    },
    {
      q: "How do you handle frames in Selenium?",
      a: "Use driver.switchTo().frame() with index, name/ID, or WebElement. To return to main content, use defaultContent(). For nested frames, switch to each frame sequentially. Use parentFrame() to go up one level."
    },
    {
      q: "What is the difference between XPath and CSS Selector?",
      a: "XPath can traverse both forward and backward in DOM (parent, ancestors), supports text matching. CSS is faster, more readable, but can only traverse forward (parent to child). CSS is preferred for performance."
    },
    {
      q: "How do you handle alerts in Selenium?",
      a: "Use driver.switchTo().alert() to get Alert object. Methods: accept() (OK), dismiss() (Cancel), getText() (get message), sendKeys() (for prompts). Use ExpectedConditions.alertIsPresent() to wait for alert."
    },
    {
      q: "What is the Actions class used for?",
      a: "Actions class handles complex user interactions: mouse hover (moveToElement), drag and drop, right-click (contextClick), double-click, keyboard actions (keyDown/keyUp), scrolling, and chained actions."
    },
    {
      q: "How do you handle multiple windows/tabs?",
      a: "Store main window handle with getWindowHandle(). After new window opens, use getWindowHandles() to get all handles. Loop through and switchTo().window(handle) to switch. Use close() for current window, then switch back."
    },
    {
      q: "Explain StaleElementReferenceException and how to handle it.",
      a: "Occurs when element reference is no longer valid (page refreshed, DOM changed). Handle by: 1) Re-finding the element, 2) Using explicit waits, 3) Wrapping in try-catch with retry logic, 4) Using Page Factory's lazy initialization."
    },
    {
      q: "What are Relative Locators in Selenium 4?",
      a: "Selenium 4 introduced Friendly Locators to find elements based on visual position: above(), below(), toLeftOf(), toRightOf(), near(). Example: driver.findElement(with(By.tagName('input')).below(emailLabel))."
    },
    {
      q: "How do you handle Shadow DOM?",
      a: "In Selenium 4, use element.getShadowRoot() to get shadow root, then find elements within. For Selenium 3, use JavaScript: (WebElement)js.executeScript('return arguments[0].shadowRoot', hostElement)."
    },
    {
      q: "What is the difference between Selenium 3 and Selenium 4?",
      a: "Selenium 4 uses W3C WebDriver protocol (vs JSON Wire), adds relative locators, native Shadow DOM support, Chrome DevTools integration, improved window/tab management (newWindow API), element screenshots, and better documentation."
    }
  ];

  const testngQuestions = [
    {
      q: "What are TestNG annotations execution order?",
      a: "@BeforeSuite → @BeforeTest → @BeforeClass → @BeforeMethod → @Test → @AfterMethod → @AfterClass → @AfterTest → @AfterSuite. Methods run in alphabetical order within same annotation level unless priority specified."
    },
    {
      q: "How do you run tests in parallel with TestNG?",
      a: "In testng.xml, set parallel attribute (methods/tests/classes/instances) and thread-count. Use ThreadLocal for WebDriver to ensure thread safety. Example: <suite parallel='methods' thread-count='3'>."
    },
    {
      q: "What are TestNG Listeners?",
      a: "Interfaces that listen to test events. ITestListener (test pass/fail/skip), ISuiteListener (suite start/finish), IReporter (custom reports), IRetryAnalyzer (retry failed tests), IAnnotationTransformer (modify annotations at runtime)."
    },
    {
      q: "Difference between Hard Assert and Soft Assert?",
      a: "Hard Assert (Assert.assertEquals) stops test execution on failure. Soft Assert (SoftAssert) continues execution and collects all failures, reporting them when assertAll() is called at end."
    },
    {
      q: "How do you implement data-driven testing in TestNG?",
      a: "Use @DataProvider annotation to supply test data. Can return Object[][] or Iterator<Object[]>. Link to test with @Test(dataProvider='name'). DataProvider can be in same class or external class with dataProviderClass attribute."
    }
  ];

  const projectExplanation = [
    {
      title: "Framework Overview",
      content: "I built a hybrid Selenium framework using Java, TestNG, and Maven. It follows the Page Object Model with Page Factory for element initialization. The framework supports parallel execution across Chrome, Firefox, and Edge."
    },
    {
      title: "Project Structure",
      content: "The framework has a clear separation: src/main has base classes, page objects, utilities, and configurations. src/test contains test classes organized by module. We use properties files for environment configuration."
    },
    {
      title: "Key Features",
      content: "Thread-safe WebDriver using ThreadLocal, Extent Reports for HTML reporting, Log4j for logging, screenshot capture on failure, data-driven testing with Excel/JSON, and configurable waits using explicit wait strategies."
    },
    {
      title: "Applications Automated",
      content: "I automated three applications: Coursera (login, course search, enrollment), BookMyShow (city selection, movie booking, seat selection), and a ticket booking system (search, passenger details, payment flow)."
    }
  ];

  const challenges = [
    {
      problem: "Stale Element Reference Exception",
      solution: "Implemented retry logic with re-fetching of elements. Used explicit waits before interactions. Created wrapper methods that handle staleness automatically. Added wait for page stability before interactions."
    },
    {
      problem: "Dynamic Element Locators",
      solution: "Used partial attribute matching with contains() and starts-with(). Identified stable parent elements and used relative XPath. Worked with developers to add data-testid attributes."
    },
    {
      problem: "Synchronization Issues",
      solution: "Replaced Thread.sleep with explicit waits. Created custom wait conditions for complex scenarios. Implemented fluent waits with custom polling for AJAX-heavy pages. Added wait for loaders to disappear."
    },
    {
      problem: "Cross-Browser Compatibility",
      solution: "Used WebDriverManager for automatic driver management. Created browser-specific configuration in DriverFactory. Implemented conditional logic for browser-specific behaviors."
    },
    {
      problem: "Parallel Execution Failures",
      solution: "Used ThreadLocal for WebDriver instances. Ensured test independence with proper setup/teardown. Isolated test data to prevent conflicts. Added proper synchronization for shared resources."
    },
    {
      problem: "Flaky Tests",
      solution: "Implemented IRetryAnalyzer to retry failed tests. Added proper waits and assertions. Used video recording for debugging. Created stable locators using data-testid. Reduced test interdependencies."
    }
  ];

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={12} />

      {/* Basic Questions */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-section-interview" />
          <h3 className="text-2xl font-semibold text-foreground">Basic Selenium Interview Questions</h3>
        </div>
        
        <div className="space-y-4">
          {basicQuestions.map((item, index) => (
            <div key={index} className="p-5 bg-card rounded-xl border border-border">
              <h4 className="font-semibold text-foreground mb-2">
                Q{index + 1}: {item.q}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="text-primary font-medium">Answer: </span>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Questions */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Code className="w-6 h-6 text-section-interview" />
          <h3 className="text-2xl font-semibold text-foreground">Advanced Technical Questions</h3>
        </div>
        
        <div className="space-y-4">
          {advancedQuestions.map((item, index) => (
            <div key={index} className="p-5 bg-card rounded-xl border border-border">
              <h4 className="font-semibold text-foreground mb-2">
                Q{index + 6}: {item.q}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="text-primary font-medium">Answer: </span>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TestNG Questions */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">TestNG Interview Questions</h3>
        
        <div className="space-y-4">
          {testngQuestions.map((item, index) => (
            <div key={index} className="p-5 bg-card rounded-xl border border-border">
              <h4 className="font-semibold text-foreground mb-2">
                Q{index + 16}: {item.q}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="text-primary font-medium">Answer: </span>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Coding Questions */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Common Coding Questions</h3>
        
        <CodeBlock
          title="Write code to handle dropdown"
          code={`// Using Select class for <select> element
WebElement dropdown = driver.findElement(By.id("country"));
Select select = new Select(dropdown);

select.selectByVisibleText("India");
select.selectByValue("IN");
select.selectByIndex(5);

// Get selected option
String selected = select.getFirstSelectedOption().getText();

// Get all options
List<WebElement> options = select.getOptions();`}
        />

        <CodeBlock
          title="Write code to handle multiple windows"
          code={`// Store main window handle
String mainWindow = driver.getWindowHandle();

// Click link that opens new window
driver.findElement(By.linkText("Open New Window")).click();

// Get all window handles
Set<String> allWindows = driver.getWindowHandles();

// Switch to new window
for (String window : allWindows) {
    if (!window.equals(mainWindow)) {
        driver.switchTo().window(window);
        break;
    }
}

// Perform actions in new window
System.out.println("New Window Title: " + driver.getTitle());

// Close new window and switch back
driver.close();
driver.switchTo().window(mainWindow);`}
        />

        <CodeBlock
          title="Write explicit wait to wait for element"
          code={`WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for visibility
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("element"))
);

// Wait for clickable
wait.until(ExpectedConditions.elementToBeClickable(By.id("button"))).click();

// Wait for text
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.id("status"), "Complete"
));

// Custom condition
wait.until(driver -> {
    return driver.findElement(By.id("result")).getText().length() > 0;
});`}
        />

        <CodeBlock
          title="Write code to capture screenshot"
          code={`public String captureScreenshot(String testName) {
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

// Element screenshot (Selenium 4)
WebElement element = driver.findElement(By.id("logo"));
File screenshot = element.getScreenshotAs(OutputType.FILE);`}
        />

        <CodeBlock
          title="Write a basic TestNG test with DataProvider"
          code={`public class LoginTest {
    WebDriver driver;
    
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }
    
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            {"valid@email.com", "password123", true},
            {"invalid@email.com", "wrongpass", false},
            {"", "password", false}
        };
    }
    
    @Test(dataProvider = "loginData")
    public void testLogin(String email, String password, boolean shouldPass) {
        driver.get("https://example.com/login");
        
        driver.findElement(By.id("email")).sendKeys(email);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("login")).click();
        
        if (shouldPass) {
            Assert.assertTrue(driver.getCurrentUrl().contains("/dashboard"));
        } else {
            Assert.assertTrue(driver.findElement(By.className("error")).isDisplayed());
        }
    }
    
    @AfterMethod
    public void teardown() {
        driver.quit();
    }
}`}
        />
      </div>

      {/* How to Explain Project */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-section-interview" />
          <h3 className="text-2xl font-semibold text-foreground">How to Explain Your Project</h3>
        </div>

        <div className="p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-primary/20">
          <p className="text-muted-foreground italic mb-4">
            "Tell me about the automation framework you've worked on..."
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {projectExplanation.map((item, index) => (
              <div key={index} className="p-4 bg-background/50 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-card rounded-xl border border-border">
          <h4 className="font-semibold text-foreground mb-3">Sample Answer Script</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            "In my current project, I designed and developed a hybrid Selenium automation framework from scratch. 
            The framework is built using Java, Selenium WebDriver 4, TestNG, and Maven. I implemented the Page Object Model 
            with Page Factory for better maintainability. For reporting, we use Extent Reports which generates detailed 
            HTML reports with screenshots on failure. The framework supports data-driven testing using Apache POI for 
            Excel and JSON files. We run tests in parallel using TestNG's parallel execution feature with ThreadLocal 
            WebDriver instances for thread safety. I also implemented custom listeners for logging, retry logic, and 
            report generation. The framework has been used to automate regression suites for our e-commerce and booking 
            applications, reducing manual testing effort by 60% and catching 40% more bugs before production."
          </p>
        </div>
      </div>

      {/* Real Challenges */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-section-interview" />
          <h3 className="text-2xl font-semibold text-foreground">Common Challenges & Solutions</h3>
        </div>

        <div className="space-y-4">
          {challenges.map((item, index) => (
            <div key={index} className="p-5 bg-card rounded-xl border border-border">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-destructive/20 text-destructive rounded-full flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{item.problem}</h4>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-medium">Solution: </span>
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Usage */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-section-interview" />
          <h3 className="text-2xl font-semibold text-foreground">Framework Usage in Companies</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 bg-card rounded-xl border border-border">
            <h4 className="font-semibold text-foreground mb-3">CI/CD Integration</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Integrated with Jenkins/GitHub Actions</li>
              <li>• Triggered on every code push/PR</li>
              <li>• Runs smoke tests on deployment</li>
              <li>• Full regression on nightly builds</li>
              <li>• Slack/Email notifications on failure</li>
            </ul>
          </div>

          <div className="p-5 bg-card rounded-xl border border-border">
            <h4 className="font-semibold text-foreground mb-3">Test Execution Strategy</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Smoke tests: Every deployment (5 min)</li>
              <li>• Sanity tests: After bug fixes (15 min)</li>
              <li>• Regression: Nightly (2-3 hours)</li>
              <li>• Cross-browser: Before release</li>
              <li>• Performance: Weekly baseline</li>
            </ul>
          </div>

          <div className="p-5 bg-card rounded-xl border border-border">
            <h4 className="font-semibold text-foreground mb-3">Reporting & Metrics</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Pass/Fail rates tracked daily</li>
              <li>• Execution time monitoring</li>
              <li>• Failure analysis & trends</li>
              <li>• Test coverage dashboards</li>
              <li>• Defect leakage reports</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="p-6 bg-gradient-to-br from-section-interview/20 to-transparent rounded-xl border border-section-interview/30">
        <h4 className="font-semibold text-foreground mb-4">Interview Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <ul className="space-y-2 text-muted-foreground">
            <li>✅ Be specific with numbers (60% reduction, 200+ test cases)</li>
            <li>✅ Mention actual tools: Selenium, TestNG, Maven, Jenkins</li>
            <li>✅ Explain your debugging approach with examples</li>
            <li>✅ Show understanding of design patterns (POM, Factory)</li>
            <li>✅ Know the difference between Selenium 3 and 4</li>
          </ul>
          <ul className="space-y-2 text-muted-foreground">
            <li>✅ Discuss challenges you faced and how you solved them</li>
            <li>✅ Mention collaboration with developers for testability</li>
            <li>✅ Explain your approach to flaky test handling</li>
            <li>✅ Be ready to write code on whiteboard/IDE</li>
            <li>✅ Have questions ready about their tech stack</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
