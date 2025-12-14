import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const TestNGImplementation = () => {
  const section = sections.find(s => s.id === 'testng-implementation')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={8} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">TestNG Annotations</h3>
        <p className="text-muted-foreground">TestNG provides powerful annotations that control test execution flow, setup, and teardown operations.</p>
        <CodeBlock
          title="Complete TestNG Annotations Example"
          code={`public class LoginTest extends BaseTest {
    
    @BeforeSuite
    public void setupSuite() {
        // Runs once before all tests in the suite
        System.out.println("Setting up test suite...");
    }
    
    @BeforeTest
    public void setupTest() {
        // Runs before <test> tag in testng.xml
    }
    
    @BeforeClass
    public void setupClass() {
        // Runs once before all tests in class
        driver = DriverFactory.createDriver("chrome");
    }
    
    @BeforeMethod
    public void setupMethod() {
        // Runs before each @Test method
        driver.get(baseUrl + "/login");
    }
    
    @Test(priority = 1, description = "Valid login test")
    public void testValidLogin() {
        loginPage.login("user@test.com", "password123");
        Assert.assertTrue(homePage.isDisplayed());
    }
    
    @Test(priority = 2, groups = {"smoke", "regression"})
    public void testInvalidLogin() {
        loginPage.login("invalid", "wrong");
        Assert.assertEquals(loginPage.getError(), "Invalid credentials");
    }
    
    @Test(enabled = false) // Skip this test
    public void testSkippedFeature() {
        // This test will be skipped
    }
    
    @AfterMethod
    public void teardownMethod() {
        // Runs after each @Test method
    }
    
    @AfterClass
    public void teardownClass() {
        driver.quit();
    }
    
    @AfterTest
    public void teardownTest() {
        // Runs after <test> tag completes
    }
    
    @AfterSuite
    public void teardownSuite() {
        // Runs once after all tests complete
        System.out.println("Test suite completed!");
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Assertions</h3>
        <p className="text-muted-foreground">TestNG provides hard and soft assertions for validation. Hard assertions stop execution on failure, while soft assertions continue and report all failures at the end.</p>
        <CodeBlock
          title="TestNG Assertions"
          code={`// Hard Assertions - stop on failure
Assert.assertEquals(actual, expected, "Error message");
Assert.assertTrue(condition, "Condition should be true");
Assert.assertFalse(condition, "Condition should be false");
Assert.assertNotNull(object, "Object should not be null");
Assert.assertNull(object, "Object should be null");
Assert.assertNotEquals(actual, expected);
Assert.assertSame(obj1, obj2); // Same reference
Assert.assertNotSame(obj1, obj2);

// Soft Assertions - continue on failure, report all at end
SoftAssert soft = new SoftAssert();
soft.assertEquals(title, "Expected Title", "Title mismatch");
soft.assertTrue(element.isDisplayed(), "Element not visible");
soft.assertFalse(errorMessage.isDisplayed(), "Error shown");
soft.assertAll(); // MUST call to report all failures

// Example in test
@Test
public void testCheckoutPage() {
    SoftAssert soft = new SoftAssert();
    soft.assertTrue(cartIcon.isDisplayed(), "Cart icon missing");
    soft.assertEquals(itemCount.getText(), "3", "Item count wrong");
    soft.assertTrue(checkoutBtn.isEnabled(), "Checkout disabled");
    soft.assertAll(); // Reports all failures together
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">TestNG Listeners</h3>
        <p className="text-muted-foreground">Listeners allow you to modify TestNG's behavior by implementing interfaces that get notified of test events like pass, fail, skip, etc.</p>
        <CodeBlock
          title="ITestListener Implementation"
          code={`public class TestListener implements ITestListener {
    
    @Override
    public void onStart(ITestContext context) {
        System.out.println("Test Suite Started: " + context.getName());
        ExtentReports.createReport();
    }
    
    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("Test Started: " + result.getName());
        ExtentReports.createTest(result.getName());
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("Test Passed: " + result.getName());
        ExtentReports.logPass("Test passed successfully");
    }
    
    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("Test Failed: " + result.getName());
        
        // Capture screenshot on failure
        String screenshotPath = captureScreenshot(result.getName());
        ExtentReports.logFail(result.getThrowable());
        ExtentReports.attachScreenshot(screenshotPath);
    }
    
    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("Test Skipped: " + result.getName());
        ExtentReports.logSkip("Test was skipped");
    }
    
    @Override
    public void onFinish(ITestContext context) {
        System.out.println("Test Suite Finished: " + context.getName());
        ExtentReports.flushReports();
    }
    
    private String captureScreenshot(String testName) {
        TakesScreenshot ts = (TakesScreenshot) driver;
        File source = ts.getScreenshotAs(OutputType.FILE);
        String destination = "screenshots/" + testName + "_" + 
                            System.currentTimeMillis() + ".png";
        FileUtils.copyFile(source, new File(destination));
        return destination;
    }
}`}
        />
        <CodeBlock
          title="IRetryAnalyzer - Retry Failed Tests"
          code={`public class RetryAnalyzer implements IRetryAnalyzer {
    private int retryCount = 0;
    private static final int MAX_RETRY = 2;
    
    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < MAX_RETRY) {
            retryCount++;
            System.out.println("Retrying test: " + result.getName() + 
                             " Attempt: " + retryCount);
            return true; // Retry the test
        }
        return false; // Don't retry
    }
}

// Using RetryAnalyzer in test
@Test(retryAnalyzer = RetryAnalyzer.class)
public void testFlakeyOperation() {
    // This test will be retried up to 2 times on failure
    driver.get("https://coursera.org");
    Assert.assertTrue(homePage.isLoaded());
}

// Apply to all tests using Listener
public class RetryListener implements IAnnotationTransformer {
    @Override
    public void transform(ITestAnnotation annotation, 
                         Class testClass, 
                         Constructor testConstructor, 
                         Method testMethod) {
        annotation.setRetryAnalyzer(RetryAnalyzer.class);
    }
}`}
        />
        <CodeBlock
          title="ISuiteListener - Suite Level Events"
          code={`public class SuiteListener implements ISuiteListener {
    
    @Override
    public void onStart(ISuite suite) {
        System.out.println("Suite Started: " + suite.getName());
        
        // Initialize resources
        DatabaseConnection.init();
        TestDataLoader.loadTestData();
        ReportManager.initializeReport(suite.getName());
    }
    
    @Override
    public void onFinish(ISuite suite) {
        System.out.println("Suite Finished: " + suite.getName());
        
        // Cleanup resources
        DatabaseConnection.close();
        ReportManager.generateFinalReport();
        
        // Send email notification
        EmailNotifier.sendTestReport(suite.getAllMethods().size(),
                                     suite.getResults().size());
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Data Providers</h3>
        <p className="text-muted-foreground">Data Providers enable data-driven testing by supplying multiple sets of test data to a single test method.</p>
        <CodeBlock
          title="DataProvider Examples"
          code={`public class LoginDataDrivenTest {
    
    // Simple DataProvider
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            {"user1@coursera.org", "pass123", true},
            {"user2@coursera.org", "pass456", true},
            {"invalid@test.com", "wrongpass", false},
            {"", "password", false},
            {"user@test.com", "", false}
        };
    }
    
    @Test(dataProvider = "loginData")
    public void testLogin(String email, String password, boolean shouldPass) {
        loginPage.login(email, password);
        if (shouldPass) {
            Assert.assertTrue(homePage.isDisplayed(), 
                "Login should succeed for: " + email);
        } else {
            Assert.assertTrue(loginPage.getErrorMessage().isDisplayed(),
                "Error should show for: " + email);
        }
    }
    
    // DataProvider from Excel file
    @DataProvider(name = "excelData")
    public Object[][] getExcelData() throws IOException {
        return ExcelReader.readTestData("testdata/LoginData.xlsx", "Sheet1");
    }
    
    // DataProvider from external class
    @Test(dataProvider = "bookingData", 
          dataProviderClass = TestDataProvider.class)
    public void testBooking(String movie, String theater, int seats) {
        bookingPage.selectMovie(movie);
        bookingPage.selectTheater(theater);
        bookingPage.selectSeats(seats);
        Assert.assertTrue(bookingPage.isBookingConfirmed());
    }
    
    // Parallel DataProvider execution
    @DataProvider(name = "parallelData", parallel = true)
    public Object[][] getParallelData() {
        return new Object[][] {
            {"Chrome", "https://coursera.org"},
            {"Firefox", "https://bookmyshow.com"},
            {"Edge", "https://redbus.in"}
        };
    }
}`}
        />
        <CodeBlock
          title="Excel Data Reader for DataProvider"
          code={`public class ExcelReader {
    
    public static Object[][] readTestData(String filePath, String sheetName) 
            throws IOException {
        FileInputStream fis = new FileInputStream(filePath);
        XSSFWorkbook workbook = new XSSFWorkbook(fis);
        XSSFSheet sheet = workbook.getSheet(sheetName);
        
        int rowCount = sheet.getPhysicalNumberOfRows();
        int colCount = sheet.getRow(0).getPhysicalNumberOfCells();
        
        // Skip header row
        Object[][] data = new Object[rowCount - 1][colCount];
        
        for (int i = 1; i < rowCount; i++) {
            XSSFRow row = sheet.getRow(i);
            for (int j = 0; j < colCount; j++) {
                XSSFCell cell = row.getCell(j);
                data[i-1][j] = getCellValue(cell);
            }
        }
        
        workbook.close();
        return data;
    }
    
    private static Object getCellValue(XSSFCell cell) {
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return (int) cell.getNumericCellValue();
            case BOOLEAN:
                return cell.getBooleanCellValue();
            default:
                return "";
        }
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">TestNG XML Configuration</h3>
        <p className="text-muted-foreground">The testng.xml file controls test execution including suite configuration, test groups, parallel execution, and parameters.</p>
        <CodeBlock
          title="Complete testng.xml Configuration"
          language="xml"
          code={`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Coursera Regression Suite" 
       parallel="tests" 
       thread-count="3"
       verbose="2">
    
    <!-- Global Parameters -->
    <parameter name="browser" value="chrome"/>
    <parameter name="environment" value="staging"/>
    
    <!-- Listeners -->
    <listeners>
        <listener class-name="com.coursera.listeners.TestListener"/>
        <listener class-name="com.coursera.listeners.RetryListener"/>
        <listener class-name="com.coursera.listeners.SuiteListener"/>
    </listeners>
    
    <!-- Smoke Test Suite -->
    <test name="Smoke Tests">
        <parameter name="browser" value="chrome"/>
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="com.coursera.tests.LoginTest"/>
            <class name="com.coursera.tests.SearchTest"/>
            <class name="com.coursera.tests.CourseEnrollTest"/>
        </classes>
    </test>
    
    <!-- Regression Test Suite -->
    <test name="Regression Tests" parallel="methods" thread-count="2">
        <groups>
            <run>
                <include name="regression"/>
                <exclude name="broken"/>
            </run>
        </groups>
        <packages>
            <package name="com.coursera.tests.*"/>
        </packages>
    </test>
    
    <!-- Cross Browser Tests -->
    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="com.coursera.tests.CrossBrowserTest"/>
        </classes>
    </test>
    
    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="com.coursera.tests.CrossBrowserTest"/>
        </classes>
    </test>
    
    <test name="Edge Tests">
        <parameter name="browser" value="edge"/>
        <classes>
            <class name="com.coursera.tests.CrossBrowserTest"/>
        </classes>
    </test>
</suite>`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Parallel Execution</h3>
        <p className="text-muted-foreground">TestNG supports parallel execution at suite, test, class, or method level to reduce test execution time.</p>
        <CodeBlock
          title="Parallel Execution Configuration"
          code={`// Thread-safe WebDriver using ThreadLocal
public class DriverFactory {
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    
    public static WebDriver getDriver() {
        return driver.get();
    }
    
    public static void setDriver(String browser) {
        switch (browser.toLowerCase()) {
            case "chrome":
                driver.set(new ChromeDriver());
                break;
            case "firefox":
                driver.set(new FirefoxDriver());
                break;
            case "edge":
                driver.set(new EdgeDriver());
                break;
        }
    }
    
    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}

// Base Test with ThreadLocal
public class BaseTest {
    
    @Parameters({"browser"})
    @BeforeMethod
    public void setup(@Optional("chrome") String browser) {
        DriverFactory.setDriver(browser);
        DriverFactory.getDriver().manage().window().maximize();
    }
    
    @AfterMethod
    public void teardown() {
        DriverFactory.quitDriver();
    }
    
    protected WebDriver getDriver() {
        return DriverFactory.getDriver();
    }
}`}
        />
        <CodeBlock
          title="Parallel Test Classes"
          code={`// Tests can run in parallel safely
public class SearchTest extends BaseTest {
    
    @Test(groups = "smoke")
    public void testCourseSearch() {
        getDriver().get("https://coursera.org");
        SearchPage searchPage = new SearchPage(getDriver());
        searchPage.searchCourse("Python Programming");
        Assert.assertTrue(searchPage.getResultsCount() > 0);
    }
}

public class LoginTest extends BaseTest {
    
    @Test(groups = "smoke")
    public void testValidLogin() {
        getDriver().get("https://coursera.org/login");
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.login("user@test.com", "password123");
        Assert.assertTrue(new HomePage(getDriver()).isDisplayed());
    }
}

// testng.xml for parallel execution
// parallel="classes" - Run test classes in parallel
// parallel="methods" - Run test methods in parallel
// parallel="tests" - Run <test> tags in parallel
// thread-count="5" - Number of parallel threads`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Test Dependencies</h3>
        <p className="text-muted-foreground">TestNG allows defining dependencies between tests to ensure proper execution order.</p>
        <CodeBlock
          title="Test Dependencies Examples"
          code={`public class BookingFlowTest extends BaseTest {
    
    // Method dependencies
    @Test
    public void testLogin() {
        loginPage.login("user@bookmyshow.com", "password");
        Assert.assertTrue(homePage.isDisplayed());
    }
    
    @Test(dependsOnMethods = {"testLogin"})
    public void testSearchMovie() {
        homePage.searchMovie("Avengers");
        Assert.assertTrue(searchResults.hasResults());
    }
    
    @Test(dependsOnMethods = {"testSearchMovie"})
    public void testSelectTheater() {
        searchResults.selectFirstMovie();
        moviePage.selectTheater("PVR Cinemas");
        Assert.assertTrue(seatSelectionPage.isDisplayed());
    }
    
    @Test(dependsOnMethods = {"testSelectTheater"})
    public void testBookSeats() {
        seatSelectionPage.selectSeats(2);
        seatSelectionPage.proceedToPayment();
        Assert.assertTrue(paymentPage.isDisplayed());
    }
    
    // Group dependencies
    @Test(groups = "setup")
    public void testDatabaseSetup() {
        TestDataManager.prepareTestData();
    }
    
    @Test(groups = "tests", dependsOnGroups = "setup")
    public void testFeatureA() {
        // Runs after all "setup" group tests pass
    }
    
    // alwaysRun - Run even if dependent test fails
    @Test(dependsOnMethods = {"testLogin"}, alwaysRun = true)
    public void testLogout() {
        // Will run even if testLogin fails
        if (homePage.isLoggedIn()) {
            homePage.logout();
        }
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Expected Exceptions & Timeout</h3>
        <p className="text-muted-foreground">TestNG can verify that tests throw expected exceptions and enforce time limits.</p>
        <CodeBlock
          title="Exception and Timeout Handling"
          code={`public class ExceptionTimeoutTest extends BaseTest {
    
    // Expected Exception
    @Test(expectedExceptions = NoSuchElementException.class)
    public void testElementNotFound() {
        driver.findElement(By.id("nonexistent-element"));
        // Test passes if NoSuchElementException is thrown
    }
    
    // Expected Exception with Message
    @Test(expectedExceptions = IllegalArgumentException.class,
          expectedExceptionsMessageRegExp = ".*invalid.*")
    public void testInvalidInput() {
        validator.validate(null);
        // Passes if exception message contains "invalid"
    }
    
    // Timeout - Test fails if takes longer
    @Test(timeOut = 5000) // 5 seconds
    public void testPageLoad() {
        driver.get("https://coursera.org");
        Assert.assertTrue(homePage.isLoaded());
        // Fails if page doesn't load within 5 seconds
    }
    
    // Timeout with invocation count
    @Test(timeOut = 10000, invocationCount = 3)
    public void testRepeatedOperation() {
        // Runs 3 times, each must complete in 10 seconds
        performOperation();
    }
    
    // Invocation with thread pool
    @Test(invocationCount = 10, threadPoolSize = 5)
    public void testConcurrentOperations() {
        // Runs 10 times with 5 parallel threads
        // Useful for load testing
        api.makeRequest();
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">TestNG Parameters</h3>
        <p className="text-muted-foreground">Parameters allow passing values from testng.xml to test methods for configuration.</p>
        <CodeBlock
          title="Using Parameters"
          code={`public class ParameterizedTest {
    
    // Single parameter
    @Parameters({"browser"})
    @BeforeMethod
    public void setup(String browser) {
        DriverFactory.setDriver(browser);
    }
    
    // Multiple parameters
    @Parameters({"username", "password", "expectedResult"})
    @Test
    public void testLogin(String username, String password, 
                          String expectedResult) {
        loginPage.login(username, password);
        Assert.assertEquals(getResult(), expectedResult);
    }
    
    // Optional parameter with default value
    @Parameters({"environment"})
    @Test
    public void testEnvironment(@Optional("staging") String env) {
        String url = ConfigReader.getUrl(env);
        driver.get(url);
    }
    
    // Combining Parameters with DataProvider
    @Parameters({"browser"})
    @BeforeMethod
    public void setup(String browser) {
        DriverFactory.setDriver(browser);
    }
    
    @Test(dataProvider = "searchData")
    public void testSearch(String query, int expectedCount) {
        // Browser from parameter, test data from DataProvider
        searchPage.search(query);
        Assert.assertEquals(searchPage.getResultCount(), expectedCount);
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">IReporter - Custom Reports</h3>
        <p className="text-muted-foreground">IReporter interface allows creating custom test reports with complete control over format and content.</p>
        <CodeBlock
          title="Custom Reporter Implementation"
          code={`public class CustomHTMLReporter implements IReporter {
    
    @Override
    public void generateReport(List<XmlSuite> xmlSuites, 
                               List<ISuite> suites, 
                               String outputDirectory) {
        
        StringBuilder html = new StringBuilder();
        html.append("<html><head><title>Test Report</title>");
        html.append("<style>/* CSS styles */</style></head><body>");
        
        for (ISuite suite : suites) {
            html.append("<h1>Suite: " + suite.getName() + "</h1>");
            
            Map<String, ISuiteResult> results = suite.getResults();
            
            for (ISuiteResult result : results.values()) {
                ITestContext context = result.getTestContext();
                
                // Passed tests
                html.append("<h2>Passed Tests: " + 
                    context.getPassedTests().size() + "</h2>");
                appendTestResults(html, context.getPassedTests(), "passed");
                
                // Failed tests
                html.append("<h2>Failed Tests: " + 
                    context.getFailedTests().size() + "</h2>");
                appendTestResults(html, context.getFailedTests(), "failed");
                
                // Skipped tests
                html.append("<h2>Skipped Tests: " + 
                    context.getSkippedTests().size() + "</h2>");
                appendTestResults(html, context.getSkippedTests(), "skipped");
            }
        }
        
        html.append("</body></html>");
        
        // Write to file
        try (FileWriter writer = new FileWriter(
                outputDirectory + "/custom-report.html")) {
            writer.write(html.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private void appendTestResults(StringBuilder html, 
                                   IResultMap results, 
                                   String status) {
        for (ITestResult result : results.getAllResults()) {
            html.append("<div class='" + status + "'>");
            html.append("<p>Test: " + result.getName() + "</p>");
            html.append("<p>Duration: " + 
                (result.getEndMillis() - result.getStartMillis()) + "ms</p>");
            if (result.getThrowable() != null) {
                html.append("<p>Error: " + 
                    result.getThrowable().getMessage() + "</p>");
            }
            html.append("</div>");
        }
    }
}`}
        />
      </div>
    </section>
  );
};