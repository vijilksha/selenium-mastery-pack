import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';
import { Layers, Factory, Repeat, Settings, FileText, BarChart3, FolderTree, Code } from 'lucide-react';

export const FrameworkBestPractices = () => {
  const section = sections.find(s => s.id === 'framework-best-practices')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={10} />

      {/* Page Object Model */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-section-framework" />
          <h3 className="text-2xl font-semibold text-foreground">Page Object Model (POM)</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          The Page Object Model is a design pattern that creates an object repository for storing web elements. 
          It reduces code duplication and improves test maintenance.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <h4 className="font-semibold text-destructive mb-2">❌ Without POM</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Locators scattered in test files</li>
              <li>• Duplicate code across tests</li>
              <li>• Hard to maintain when UI changes</li>
              <li>• No separation of concerns</li>
            </ul>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">✅ With POM</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Centralized element repository</li>
              <li>• Reusable page methods</li>
              <li>• Easy maintenance</li>
              <li>• Clean test scripts</li>
            </ul>
          </div>
        </div>

        <CodeBlock
          title="LoginPage.java - Page Object"
          language="java"
          code={`public class LoginPage {
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    // ============ LOCATORS ============
    private By usernameField = By.id("username");
    private By passwordField = By.id("password");
    private By loginButton = By.id("loginBtn");
    private By errorMessage = By.className("error-msg");
    private By forgotPasswordLink = By.linkText("Forgot Password?");
    
    // ============ CONSTRUCTOR ============
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    // ============ PAGE METHODS ============
    public void enterUsername(String username) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameField))
            .sendKeys(username);
    }
    
    public void enterPassword(String password) {
        driver.findElement(passwordField).sendKeys(password);
    }
    
    public void clickLogin() {
        driver.findElement(loginButton).click();
    }
    
    // Combined login method
    public HomePage login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLogin();
        return new HomePage(driver);
    }
    
    public String getErrorMessage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(errorMessage))
                   .getText();
    }
    
    public ForgotPasswordPage clickForgotPassword() {
        driver.findElement(forgotPasswordLink).click();
        return new ForgotPasswordPage(driver);
    }
    
    // ============ VERIFICATION METHODS ============
    public boolean isLoginPageDisplayed() {
        return driver.findElement(loginButton).isDisplayed();
    }
}`}
        />

        <CodeBlock
          title="LoginTest.java - Clean Test Script"
          language="java"
          code={`public class LoginTest extends BaseTest {
    
    private LoginPage loginPage;
    
    @BeforeMethod
    public void setupTest() {
        driver.get(ConfigReader.getProperty("baseUrl") + "/login");
        loginPage = new LoginPage(driver);
    }
    
    @Test(priority = 1, description = "Verify valid user login")
    public void testValidLogin() {
        HomePage homePage = loginPage.login("validuser@email.com", "Password123");
        Assert.assertTrue(homePage.isHomePageDisplayed());
        Assert.assertEquals(homePage.getWelcomeMessage(), "Welcome, Valid User!");
    }
    
    @Test(priority = 2, description = "Verify invalid login error message")
    public void testInvalidLogin() {
        loginPage.login("invalid@email.com", "wrongpassword");
        String error = loginPage.getErrorMessage();
        Assert.assertEquals(error, "Invalid credentials. Please try again.");
    }
    
    @Test(priority = 3, description = "Verify empty fields validation")
    public void testEmptyFieldsValidation() {
        loginPage.clickLogin();
        Assert.assertTrue(loginPage.getErrorMessage().contains("required"));
    }
}`}
        />
      </div>

      {/* Page Factory */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Factory className="w-6 h-6 text-section-framework" />
          <h3 className="text-2xl font-semibold text-foreground">Page Factory</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Page Factory is an extension of Page Object Model that uses annotations to initialize web elements. 
          It provides lazy initialization and caching of elements.
        </p>

        <CodeBlock
          title="CourseraHomePage.java - Using Page Factory"
          language="java"
          code={`public class CourseraHomePage {
    
    private WebDriver driver;
    
    // ============ PAGE FACTORY ANNOTATIONS ============
    @FindBy(id = "searchInput")
    private WebElement searchBox;
    
    @FindBy(xpath = "//button[@type='submit']")
    private WebElement searchButton;
    
    @FindBy(css = ".course-card")
    private List<WebElement> courseCards;
    
    @FindBy(how = How.LINK_TEXT, using = "Sign In")
    private WebElement signInLink;
    
    @FindBy(how = How.CSS, using = ".category-nav > li")
    private List<WebElement> categoryItems;
    
    @FindBy(xpath = "//div[@class='user-menu']//span[@class='username']")
    private WebElement usernameDisplay;
    
    // ============ CONSTRUCTOR WITH INIT ============
    public CourseraHomePage(WebDriver driver) {
        this.driver = driver;
        // Initialize all @FindBy elements
        PageFactory.initElements(driver, this);
    }
    
    // ============ PAGE METHODS ============
    public void searchCourse(String courseName) {
        searchBox.clear();
        searchBox.sendKeys(courseName);
        searchButton.click();
    }
    
    public int getCourseCount() {
        return courseCards.size();
    }
    
    public void selectCourseByIndex(int index) {
        courseCards.get(index).click();
    }
    
    public void selectCategory(String categoryName) {
        for (WebElement category : categoryItems) {
            if (category.getText().equalsIgnoreCase(categoryName)) {
                category.click();
                break;
            }
        }
    }
    
    public LoginPage clickSignIn() {
        signInLink.click();
        return new LoginPage(driver);
    }
    
    public String getLoggedInUsername() {
        return usernameDisplay.getText();
    }
}

// Using @CacheLookup for static elements
public class StaticElementsPage {
    
    @FindBy(id = "logo")
    @CacheLookup  // Element is cached, not looked up every time
    private WebElement logo;
    
    @FindBy(css = ".footer-links")
    @CacheLookup
    private WebElement footerLinks;
    
    // Don't use @CacheLookup for dynamic elements!
}`}
        />
      </div>

      {/* Reusability Patterns */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Repeat className="w-6 h-6 text-section-framework" />
          <h3 className="text-2xl font-semibold text-foreground">Reusability Patterns</h3>
        </div>

        <CodeBlock
          title="BasePage.java - Common Methods"
          language="java"
          code={`public abstract class BasePage {
    
    protected WebDriver driver;
    protected WebDriverWait wait;
    protected JavascriptExecutor js;
    protected Actions actions;
    
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        this.js = (JavascriptExecutor) driver;
        this.actions = new Actions(driver);
    }
    
    // ============ COMMON WAIT METHODS ============
    protected WebElement waitForVisibility(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }
    
    protected WebElement waitForClickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }
    
    protected void waitForInvisibility(By locator) {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }
    
    // ============ COMMON ACTION METHODS ============
    protected void click(By locator) {
        waitForClickable(locator).click();
    }
    
    protected void type(By locator, String text) {
        WebElement element = waitForVisibility(locator);
        element.clear();
        element.sendKeys(text);
    }
    
    protected String getText(By locator) {
        return waitForVisibility(locator).getText();
    }
    
    protected void selectDropdown(By locator, String visibleText) {
        WebElement dropdown = waitForVisibility(locator);
        new Select(dropdown).selectByVisibleText(visibleText);
    }
    
    // ============ JAVASCRIPT METHODS ============
    protected void jsClick(WebElement element) {
        js.executeScript("arguments[0].click();", element);
    }
    
    protected void scrollToElement(WebElement element) {
        js.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
    }
    
    protected void highlightElement(WebElement element) {
        js.executeScript(
            "arguments[0].style.border='3px solid red'", element
        );
    }
    
    // ============ VERIFICATION METHODS ============
    protected boolean isDisplayed(By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
    
    protected boolean isEnabled(By locator) {
        return driver.findElement(locator).isEnabled();
    }
    
    // ============ PAGE VERIFICATION ============
    public abstract boolean isPageLoaded();
}`}
        />

        <CodeBlock
          title="CommonComponents.java - Reusable Components"
          language="java"
          code={`public class CommonComponents {
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    public CommonComponents(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    // ============ HEADER COMPONENT ============
    public void searchGlobal(String searchTerm) {
        WebElement searchBox = driver.findElement(By.id("globalSearch"));
        searchBox.clear();
        searchBox.sendKeys(searchTerm);
        searchBox.sendKeys(Keys.ENTER);
    }
    
    public void selectLanguage(String language) {
        driver.findElement(By.id("languageSelector")).click();
        driver.findElement(
            By.xpath("//li[@data-lang='" + language + "']")
        ).click();
    }
    
    // ============ NOTIFICATION COMPONENT ============
    public int getNotificationCount() {
        WebElement badge = driver.findElement(By.className("notification-badge"));
        String count = badge.getText();
        return count.isEmpty() ? 0 : Integer.parseInt(count);
    }
    
    public void clearAllNotifications() {
        driver.findElement(By.id("notificationIcon")).click();
        wait.until(ExpectedConditions.elementToBeClickable(
            By.linkText("Clear All")
        )).click();
    }
    
    // ============ MODAL COMPONENT ============
    public void closeModal() {
        WebElement closeBtn = wait.until(ExpectedConditions.elementToBeClickable(
            By.cssSelector(".modal .close-button")
        ));
        closeBtn.click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.className("modal-overlay")
        ));
    }
    
    public String getModalTitle() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector(".modal-header h2")
        )).getText();
    }
    
    // ============ PAGINATION COMPONENT ============
    public void goToPage(int pageNumber) {
        driver.findElement(
            By.xpath("//ul[@class='pagination']//a[text()='" + pageNumber + "']")
        ).click();
    }
    
    public void nextPage() {
        driver.findElement(By.cssSelector(".pagination .next")).click();
    }
    
    public int getCurrentPage() {
        WebElement active = driver.findElement(
            By.cssSelector(".pagination .active")
        );
        return Integer.parseInt(active.getText());
    }
}`}
        />
      </div>

      {/* Logging */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-section-framework" />
          <h3 className="text-2xl font-semibold text-foreground">Logging with Log4j2</h3>
        </div>

        <CodeBlock
          title="log4j2.xml"
          language="xml"
          code={`<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="INFO">
    <Properties>
        <Property name="logPath">logs</Property>
        <Property name="logPattern">
            %d{yyyy-MM-dd HH:mm:ss} [%t] %-5level %logger{36} - %msg%n
        </Property>
    </Properties>
    
    <Appenders>
        <!-- Console Appender -->
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="\${logPattern}"/>
        </Console>
        
        <!-- File Appender - All logs -->
        <RollingFile name="FileLogger" 
                     fileName="\${logPath}/automation.log"
                     filePattern="\${logPath}/automation-%d{yyyy-MM-dd}-%i.log">
            <PatternLayout pattern="\${logPattern}"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="10MB"/>
                <TimeBasedTriggeringPolicy interval="1"/>
            </Policies>
            <DefaultRolloverStrategy max="10"/>
        </RollingFile>
        
        <!-- Error File Appender -->
        <RollingFile name="ErrorLogger" 
                     fileName="\${logPath}/errors.log"
                     filePattern="\${logPath}/errors-%d{yyyy-MM-dd}.log">
            <PatternLayout pattern="\${logPattern}"/>
            <ThresholdFilter level="ERROR"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
            </Policies>
        </RollingFile>
    </Appenders>
    
    <Loggers>
        <Logger name="com.automation" level="DEBUG" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="FileLogger"/>
            <AppenderRef ref="ErrorLogger"/>
        </Logger>
        <Root level="INFO">
            <AppenderRef ref="Console"/>
        </Root>
    </Loggers>
</Configuration>`}
        />

        <CodeBlock
          title="Using Logger in Tests"
          language="java"
          code={`public class BookingTest extends BaseTest {
    
    private static final Logger log = LogManager.getLogger(BookingTest.class);
    
    @Test
    public void testMovieBooking() {
        log.info("Starting movie booking test");
        
        try {
            log.debug("Navigating to BookMyShow home page");
            driver.get("https://www.bookmyshow.com");
            
            log.info("Selecting city: Mumbai");
            homePage.selectCity("Mumbai");
            
            log.debug("Searching for movie: Jawan");
            homePage.searchMovie("Jawan");
            
            log.info("Selecting theatre and showtime");
            moviePage.selectTheatre("PVR Phoenix");
            moviePage.selectShowtime("7:00 PM");
            
            log.debug("Selecting seats: A1, A2");
            seatPage.selectSeats("A1", "A2");
            
            log.info("Proceeding to payment");
            seatPage.proceedToPayment();
            
            log.info("Test completed successfully - Booking confirmed");
            
        } catch (Exception e) {
            log.error("Test failed with exception: " + e.getMessage());
            log.error("Stack trace: ", e);
            throw e;
        }
    }
}`}
        />
      </div>

      {/* Extent Reports */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-section-framework" />
          <h3 className="text-2xl font-semibold text-foreground">Extent Reports</h3>
        </div>

        <CodeBlock
          title="ExtentReportManager.java"
          language="java"
          code={`public class ExtentReportManager {
    
    private static ExtentReports extent;
    private static ThreadLocal<ExtentTest> test = new ThreadLocal<>();
    
    public static ExtentReports getInstance() {
        if (extent == null) {
            createInstance();
        }
        return extent;
    }
    
    private static void createInstance() {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String reportPath = System.getProperty("user.dir") + 
                           "/reports/TestReport_" + timestamp + ".html";
        
        ExtentSparkReporter sparkReporter = new ExtentSparkReporter(reportPath);
        
        // Configure report
        sparkReporter.config().setTheme(Theme.DARK);
        sparkReporter.config().setDocumentTitle("Automation Test Report");
        sparkReporter.config().setReportName("Selenium Training Framework");
        sparkReporter.config().setTimeStampFormat("EEEE, MMMM dd, yyyy, hh:mm a");
        
        extent = new ExtentReports();
        extent.attachReporter(sparkReporter);
        
        // Add system info
        extent.setSystemInfo("OS", System.getProperty("os.name"));
        extent.setSystemInfo("Java Version", System.getProperty("java.version"));
        extent.setSystemInfo("Browser", ConfigReader.getProperty("browser"));
        extent.setSystemInfo("Environment", ConfigReader.getProperty("environment"));
        extent.setSystemInfo("Tester", System.getProperty("user.name"));
    }
    
    public static ExtentTest createTest(String testName, String description) {
        ExtentTest extentTest = getInstance().createTest(testName, description);
        test.set(extentTest);
        return extentTest;
    }
    
    public static ExtentTest getTest() {
        return test.get();
    }
    
    public static void flush() {
        if (extent != null) {
            extent.flush();
        }
    }
}

// TestNG Listener for Extent Reports
public class ExtentTestListener implements ITestListener {
    
    @Override
    public void onStart(ITestContext context) {
        ExtentReportManager.getInstance();
    }
    
    @Override
    public void onTestStart(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        String description = result.getMethod().getDescription();
        ExtentReportManager.createTest(testName, description);
        ExtentReportManager.getTest().info("Test Started: " + testName);
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        ExtentReportManager.getTest()
            .pass("Test Passed: " + result.getMethod().getMethodName());
    }
    
    @Override
    public void onTestFailure(ITestResult result) {
        ExtentTest test = ExtentReportManager.getTest();
        test.fail("Test Failed: " + result.getThrowable().getMessage());
        
        // Capture screenshot
        WebDriver driver = ((BaseTest) result.getInstance()).getDriver();
        String screenshot = ScreenshotUtility.getScreenshotAsBase64(driver);
        test.fail(MediaEntityBuilder.createScreenCaptureFromBase64String(screenshot).build());
    }
    
    @Override
    public void onTestSkipped(ITestResult result) {
        ExtentReportManager.getTest()
            .skip("Test Skipped: " + result.getThrowable().getMessage());
    }
    
    @Override
    public void onFinish(ITestContext context) {
        ExtentReportManager.flush();
    }
}`}
        />
      </div>

      {/* Folder Structure */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FolderTree className="w-6 h-6 text-section-framework" />
          <h3 className="text-2xl font-semibold text-foreground">Corporate Folder Structure</h3>
        </div>

        <div className="p-6 bg-card rounded-xl border border-border font-mono text-sm">
          <pre className="text-muted-foreground whitespace-pre-wrap">{`selenium-automation-framework/
├── pom.xml
├── testng.xml
├── README.md
│
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/company/automation/
│   │           ├── base/
│   │           │   ├── BaseTest.java
│   │           │   └── BasePage.java
│   │           │
│   │           ├── config/
│   │           │   ├── ConfigReader.java
│   │           │   └── DriverManager.java
│   │           │
│   │           ├── pages/
│   │           │   ├── coursera/
│   │           │   │   ├── CourseraLoginPage.java
│   │           │   │   ├── CourseraHomePage.java
│   │           │   │   └── CourseSearchPage.java
│   │           │   ├── bookmyshow/
│   │           │   │   ├── BookMyShowHomePage.java
│   │           │   │   ├── MoviePage.java
│   │           │   │   └── SeatSelectionPage.java
│   │           │   └── ticketbooking/
│   │           │       ├── TicketSearchPage.java
│   │           │       └── BookingPage.java
│   │           │
│   │           ├── components/
│   │           │   ├── Header.java
│   │           │   ├── Footer.java
│   │           │   └── Modal.java
│   │           │
│   │           ├── utils/
│   │           │   ├── WaitUtils.java
│   │           │   ├── ScreenshotUtils.java
│   │           │   ├── ExcelUtils.java
│   │           │   ├── DateUtils.java
│   │           │   └── RandomDataGenerator.java
│   │           │
│   │           └── listeners/
│   │               ├── TestListener.java
│   │               └── ExtentReportListener.java
│   │
│   └── test/
│       ├── java/
│       │   └── com/company/tests/
│       │       ├── coursera/
│       │       │   ├── LoginTests.java
│       │       │   └── CourseSearchTests.java
│       │       ├── bookmyshow/
│       │       │   └── BookingTests.java
│       │       └── ticketbooking/
│       │           └── E2EBookingTests.java
│       │
│       └── resources/
│           ├── config.properties
│           ├── log4j2.xml
│           └── testdata/
│               ├── loginData.xlsx
│               └── bookingData.json
│
├── reports/
│   └── (generated test reports)
│
├── screenshots/
│   └── (failure screenshots)
│
└── logs/
    └── (log files)`}</pre>
        </div>
      </div>

      {/* Coding Standards */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Code className="w-6 h-6 text-section-framework" />
          <h3 className="text-2xl font-semibold text-foreground">Coding Standards</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-card rounded-xl border border-border">
            <h4 className="font-semibold text-foreground mb-3">Naming Conventions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><code className="code-inline">ClassName</code> → PascalCase</li>
              <li><code className="code-inline">methodName</code> → camelCase</li>
              <li><code className="code-inline">CONSTANT_VALUE</code> → UPPER_SNAKE_CASE</li>
              <li><code className="code-inline">variableName</code> → camelCase</li>
              <li><code className="code-inline">testMethodName</code> → testFeature_Scenario_ExpectedResult</li>
            </ul>
          </div>

          <div className="p-5 bg-card rounded-xl border border-border">
            <h4 className="font-semibold text-foreground mb-3">Page Object Naming</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Pages: <code className="code-inline">LoginPage.java</code></li>
              <li>Tests: <code className="code-inline">LoginTest.java</code></li>
              <li>Utilities: <code className="code-inline">WaitUtils.java</code></li>
              <li>Listeners: <code className="code-inline">TestListener.java</code></li>
              <li>Config: <code className="code-inline">config.properties</code></li>
            </ul>
          </div>

          <div className="p-5 bg-card rounded-xl border border-border">
            <h4 className="font-semibold text-foreground mb-3">Best Practices</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ Use meaningful variable names</li>
              <li>✅ Add JavaDoc comments for public methods</li>
              <li>✅ Keep methods small and focused</li>
              <li>✅ Use constants instead of hardcoded values</li>
              <li>✅ Handle exceptions appropriately</li>
            </ul>
          </div>

          <div className="p-5 bg-card rounded-xl border border-border">
            <h4 className="font-semibold text-foreground mb-3">Avoid These</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>❌ Thread.sleep() for waits</li>
              <li>❌ Hardcoded test data</li>
              <li>❌ Absolute XPath locators</li>
              <li>❌ Duplicate code across tests</li>
              <li>❌ Ignoring test failures</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
