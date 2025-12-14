import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const ProjectSetup = () => {
  const section = sections.find(s => s.id === 'project-setup')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={2} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Maven Project Structure</h3>
        <p className="text-muted-foreground leading-relaxed">
          A well-organized project structure is essential for maintainability. Follow the standard Maven structure with clear separation of concerns.
        </p>
        <CodeBlock
          title="Project Directory Structure"
          language="plaintext"
          code={`selenium-automation-framework/
├── pom.xml
├── testng.xml
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── automation/
│   │               ├── base/
│   │               │   ├── BaseTest.java
│   │               │   └── BasePage.java
│   │               ├── pages/
│   │               │   ├── LoginPage.java
│   │               │   ├── HomePage.java
│   │               │   └── CourseSearchPage.java
│   │               ├── utils/
│   │               │   ├── ConfigReader.java
│   │               │   ├── ExcelReader.java
│   │               │   ├── ScreenshotUtil.java
│   │               │   └── WaitHelper.java
│   │               ├── listeners/
│   │               │   ├── TestListener.java
│   │               │   └── RetryAnalyzer.java
│   │               └── factory/
│   │                   └── DriverFactory.java
│   └── test/
│       ├── java/
│       │   └── com/
│       │       └── automation/
│       │           └── tests/
│       │               ├── LoginTest.java
│       │               ├── SearchTest.java
│       │               └── BookingTest.java
│       └── resources/
│           ├── config.properties
│           ├── log4j2.xml
│           └── testdata/
│               ├── loginData.xlsx
│               └── testData.json
├── logs/
├── screenshots/
├── reports/
└── drivers/ (optional - if not using WebDriverManager)`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Complete Maven pom.xml</h3>
        <CodeBlock
          title="pom.xml"
          language="xml"
          code={`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.automation</groupId>
    <artifactId>selenium-framework</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <selenium.version>4.15.0</selenium.version>
        <testng.version>7.8.0</testng.version>
        <webdrivermanager.version>5.6.2</webdrivermanager.version>
    </properties>

    <dependencies>
        <!-- Selenium WebDriver -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>\${selenium.version}</version>
        </dependency>

        <!-- TestNG -->
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>\${testng.version}</version>
        </dependency>

        <!-- WebDriverManager -->
        <dependency>
            <groupId>io.github.bonigarcia</groupId>
            <artifactId>webdrivermanager</artifactId>
            <version>\${webdrivermanager.version}</version>
        </dependency>

        <!-- Apache POI for Excel -->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi</artifactId>
            <version>5.2.5</version>
        </dependency>
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>5.2.5</version>
        </dependency>

        <!-- Log4j2 for Logging -->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.22.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-api</artifactId>
            <version>2.22.0</version>
        </dependency>

        <!-- Extent Reports -->
        <dependency>
            <groupId>com.aventstack</groupId>
            <artifactId>extentreports</artifactId>
            <version>5.1.1</version>
        </dependency>

        <!-- JSON Parsing -->
        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
            <version>2.10.1</version>
        </dependency>

        <!-- Commons IO -->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.15.1</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- Compiler Plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                </configuration>
            </plugin>

            <!-- Surefire Plugin for TestNG -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.2.2</version>
                <configuration>
                    <suiteXmlFiles>
                        <suiteXmlFile>testng.xml</suiteXmlFile>
                    </suiteXmlFiles>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Configuration Properties</h3>
        <CodeBlock
          title="config.properties"
          language="properties"
          code={`# Browser Configuration
browser=chrome
headless=false

# Application URLs
baseUrl=https://www.coursera.org
bookmyshowUrl=https://www.bookmyshow.com
ticketBookingUrl=https://www.redbus.in

# Timeouts (in seconds)
implicitWait=10
explicitWait=15
pageLoadTimeout=30

# Test Data
testDataPath=src/test/resources/testdata/

# Reporting
screenshotPath=screenshots/
reportPath=reports/

# Parallel Execution
parallelExecution=true
threadCount=3

# Environment
environment=staging
# Valid values: dev, staging, production`}
        />
        <CodeBlock
          title="ConfigReader.java"
          code={`public class ConfigReader {
    
    private static Properties properties;
    private static final String CONFIG_PATH = "src/test/resources/config.properties";
    
    static {
        try {
            FileInputStream fis = new FileInputStream(CONFIG_PATH);
            properties = new Properties();
            properties.load(fis);
        } catch (IOException e) {
            throw new RuntimeException("Config file not found at: " + CONFIG_PATH);
        }
    }
    
    public static String getProperty(String key) {
        String value = properties.getProperty(key);
        if (value == null) {
            throw new RuntimeException("Property " + key + " not found in config");
        }
        return value.trim();
    }
    
    public static String getProperty(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue).trim();
    }
    
    public static int getIntProperty(String key) {
        return Integer.parseInt(getProperty(key));
    }
    
    public static boolean getBooleanProperty(String key) {
        return Boolean.parseBoolean(getProperty(key));
    }
    
    public static String getBrowser() {
        return getProperty("browser");
    }
    
    public static String getBaseUrl() {
        return getProperty("baseUrl");
    }
    
    public static int getImplicitWait() {
        return getIntProperty("implicitWait");
    }
    
    public static int getExplicitWait() {
        return getIntProperty("explicitWait");
    }
    
    public static boolean isHeadless() {
        return getBooleanProperty("headless");
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Driver Factory with ThreadLocal</h3>
        <p className="text-muted-foreground leading-relaxed">
          ThreadLocal ensures thread safety during parallel execution by giving each thread its own WebDriver instance.
        </p>
        <CodeBlock
          title="DriverFactory.java"
          code={`public class DriverFactory {
    
    // ThreadLocal for thread-safe WebDriver instances
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    
    public static WebDriver getDriver() {
        return driver.get();
    }
    
    public static void initDriver(String browser) {
        WebDriver webDriver = createDriver(browser);
        driver.set(webDriver);
        configureDriver();
    }
    
    private static WebDriver createDriver(String browser) {
        WebDriver webDriver;
        boolean isHeadless = ConfigReader.isHeadless();
        
        switch (browser.toLowerCase()) {
            case "chrome":
                ChromeOptions chromeOptions = new ChromeOptions();
                if (isHeadless) {
                    chromeOptions.addArguments("--headless=new");
                }
                chromeOptions.addArguments("--disable-notifications");
                chromeOptions.addArguments("--disable-popup-blocking");
                chromeOptions.addArguments("--start-maximized");
                webDriver = new ChromeDriver(chromeOptions);
                break;
                
            case "firefox":
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                if (isHeadless) {
                    firefoxOptions.addArguments("-headless");
                }
                firefoxOptions.addPreference("dom.webnotifications.enabled", false);
                webDriver = new FirefoxDriver(firefoxOptions);
                break;
                
            case "edge":
                EdgeOptions edgeOptions = new EdgeOptions();
                if (isHeadless) {
                    edgeOptions.addArguments("--headless=new");
                }
                edgeOptions.addArguments("--start-maximized");
                webDriver = new EdgeDriver(edgeOptions);
                break;
                
            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }
        
        return webDriver;
    }
    
    private static void configureDriver() {
        WebDriver webDriver = driver.get();
        webDriver.manage().window().maximize();
        webDriver.manage().timeouts().implicitlyWait(
            Duration.ofSeconds(ConfigReader.getImplicitWait())
        );
        webDriver.manage().timeouts().pageLoadTimeout(
            Duration.ofSeconds(ConfigReader.getIntProperty("pageLoadTimeout"))
        );
    }
    
    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">BaseTest Class</h3>
        <CodeBlock
          title="BaseTest.java"
          code={`public class BaseTest {
    
    protected WebDriver driver;
    protected static final Logger log = LogManager.getLogger(BaseTest.class);
    
    @Parameters({"browser"})
    @BeforeMethod
    public void setUp(@Optional("chrome") String browser) {
        log.info("Initializing WebDriver for browser: " + browser);
        DriverFactory.initDriver(browser);
        driver = DriverFactory.getDriver();
        log.info("WebDriver initialized successfully");
    }
    
    @AfterMethod
    public void tearDown(ITestResult result) {
        if (result.getStatus() == ITestResult.FAILURE) {
            log.error("Test FAILED: " + result.getName());
            captureScreenshot(result.getName());
        } else if (result.getStatus() == ITestResult.SUCCESS) {
            log.info("Test PASSED: " + result.getName());
        } else if (result.getStatus() == ITestResult.SKIP) {
            log.warn("Test SKIPPED: " + result.getName());
        }
        
        DriverFactory.quitDriver();
        log.info("WebDriver closed");
    }
    
    protected void navigateTo(String url) {
        log.info("Navigating to: " + url);
        driver.get(url);
    }
    
    protected void captureScreenshot(String testName) {
        try {
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String destination = ConfigReader.getProperty("screenshotPath") + 
                                testName + "_" + timestamp + ".png";
            FileUtils.copyFile(source, new File(destination));
            log.info("Screenshot saved: " + destination);
        } catch (IOException e) {
            log.error("Failed to capture screenshot: " + e.getMessage());
        }
    }
    
    protected WebDriverWait getWait() {
        return new WebDriverWait(driver, 
            Duration.ofSeconds(ConfigReader.getExplicitWait()));
    }
    
    protected WebDriverWait getWait(int seconds) {
        return new WebDriverWait(driver, Duration.ofSeconds(seconds));
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Maven Commands</h3>
        <CodeBlock
          title="Common Maven Commands"
          language="bash"
          code={`# Clean and compile the project
mvn clean compile

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=LoginTest

# Run specific test method
mvn test -Dtest=LoginTest#testValidLogin

# Run with specific TestNG suite
mvn test -DsuiteXmlFile=testng.xml

# Run with browser parameter
mvn test -Dbrowser=firefox

# Run in headless mode
mvn test -Dheadless=true

# Skip tests during build
mvn clean install -DskipTests

# Generate test report
mvn surefire-report:report

# Run with multiple parameters
mvn test -Dbrowser=chrome -Dheadless=true -DthreadCount=5`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">TestNG XML Configuration</h3>
        <CodeBlock
          title="testng.xml"
          language="xml"
          code={`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Selenium Automation Suite" 
       parallel="methods" 
       thread-count="3"
       verbose="2">
    
    <parameter name="browser" value="chrome"/>
    
    <listeners>
        <listener class-name="com.automation.listeners.TestListener"/>
        <listener class-name="com.automation.listeners.RetryListener"/>
    </listeners>
    
    <test name="Smoke Tests">
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="com.automation.tests.LoginTest"/>
            <class name="com.automation.tests.SearchTest"/>
        </classes>
    </test>
    
    <test name="Regression Tests">
        <classes>
            <class name="com.automation.tests.LoginTest"/>
            <class name="com.automation.tests.SearchTest"/>
            <class name="com.automation.tests.BookingTest"/>
        </classes>
    </test>
</suite>`}
        />
      </div>
    </section>
  );
};
