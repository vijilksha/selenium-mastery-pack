import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';
import { HelpCircle, Briefcase, AlertTriangle, CheckCircle, Code } from 'lucide-react';

export const InterviewPrep = () => {
  const section = sections.find(s => s.id === 'interview-prep')!;

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

      {/* Question 1 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-section-interview" />
          <h3 className="text-2xl font-semibold text-foreground">Q1: What is Selenium and its Components?</h3>
        </div>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            Selenium is an open-source web automation framework with 4 components: Selenium IDE (record/playback), 
            Selenium RC (deprecated), Selenium WebDriver (browser automation API), and Selenium Grid (parallel execution).
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: Automating Coursera login</p>
        </div>
        <CodeBlock
          title="Real Example - Coursera Login Automation"
          code={`// This demonstrates WebDriver component in action
public class CourseraLoginDemo {
    public static void main(String[] args) {
        // Initialize WebDriver (core component)
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to Coursera
            driver.get("https://www.coursera.org/");
            driver.manage().window().maximize();
            
            // Click Sign In
            driver.findElement(By.linkText("Log In")).click();
            
            // Enter credentials
            driver.findElement(By.id("email")).sendKeys("user@email.com");
            driver.findElement(By.id("password")).sendKeys("password123");
            
            // Click login button
            driver.findElement(By.xpath("//button[text()='Login']")).click();
            
            // Verify login success
            String welcomeText = driver.findElement(By.className("welcome-message")).getText();
            System.out.println("Login successful: " + welcomeText);
            
        } finally {
            driver.quit();
        }
    }
}`}
        />
      </div>

      {/* Question 2 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Q2: Difference between driver.close() and driver.quit()?</h3>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            close() closes only the current window. quit() closes all windows and ends the WebDriver session.
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: BookMyShow opens payment gateway in new window</p>
        </div>
        <CodeBlock
          title="Real Example - BookMyShow Payment Window Handling"
          code={`public class BookMyShowPaymentDemo {
    
    @Test
    public void testPaymentWindowHandling() {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.bookmyshow.com");
        
        // Complete booking till payment
        // ... booking steps ...
        
        // Store main booking window
        String bookingWindow = driver.getWindowHandle();
        
        // Click "Pay Now" - opens payment gateway in new window
        driver.findElement(By.id("payNow")).click();
        
        // Switch to payment window
        Set<String> allWindows = driver.getWindowHandles();
        for (String window : allWindows) {
            if (!window.equals(bookingWindow)) {
                driver.switchTo().window(window);
                break;
            }
        }
        
        // Complete payment in new window
        driver.findElement(By.id("cardNumber")).sendKeys("4111111111111111");
        driver.findElement(By.id("submitPayment")).click();
        
        // Payment window closes automatically after success
        // OR use close() to close ONLY payment window
        driver.close();  // Closes only payment window, booking window stays open
        
        // Switch back to booking window
        driver.switchTo().window(bookingWindow);
        
        // Verify booking confirmation
        Assert.assertTrue(driver.findElement(By.id("bookingConfirmed")).isDisplayed());
        
        // quit() closes all windows and ends session
        driver.quit();  // Closes booking window and terminates WebDriver
    }
}`}
        />
      </div>

      {/* Question 3 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Q3: What are Different Types of Waits?</h3>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            Implicit Wait (global timeout), Explicit Wait (condition-specific with ExpectedConditions), 
            and Fluent Wait (custom polling and exception handling).
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: Coursera course search with loading spinner</p>
        </div>
        <CodeBlock
          title="Real Example - Coursera Search with Different Waits"
          code={`public class CourseraSearchWaitDemo {
    WebDriver driver;
    
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        
        // IMPLICIT WAIT - applies to ALL findElement calls
        // Good for: Simple pages with consistent load times
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        
        driver.get("https://www.coursera.org");
    }
    
    @Test
    public void testCourseSearchWithExplicitWait() {
        // Search for a course
        driver.findElement(By.id("searchInput")).sendKeys("Python Programming");
        driver.findElement(By.id("searchBtn")).click();
        
        // EXPLICIT WAIT - wait for specific condition
        // Good for: AJAX calls, dynamic content, specific conditions
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        
        // Wait for loading spinner to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.className("loading-spinner")
        ));
        
        // Wait for search results to be visible
        WebElement results = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("search-results"))
        );
        
        // Wait for at least 5 course cards to load
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(
            By.className("course-card"), 5
        ));
        
        System.out.println("Search results loaded successfully!");
    }
    
    @Test
    public void testDynamicContentWithFluentWait() {
        // FLUENT WAIT - custom polling, ignore specific exceptions
        // Good for: Slow-loading AJAX, unreliable elements, complex conditions
        Wait<WebDriver> fluentWait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(30))
            .pollingEvery(Duration.ofMillis(500))  // Check every 500ms
            .ignoring(NoSuchElementException.class)
            .ignoring(StaleElementReferenceException.class)
            .withMessage("Course cards did not load within 30 seconds");
        
        // Navigate to course catalog
        driver.findElement(By.linkText("Browse")).click();
        
        // Wait for courses with custom condition
        List<WebElement> courses = fluentWait.until(driver -> {
            List<WebElement> cards = driver.findElements(By.className("course-card"));
            System.out.println("Found " + cards.size() + " courses, waiting for 10...");
            return cards.size() >= 10 ? cards : null;
        });
        
        System.out.println("Loaded " + courses.size() + " courses");
    }
    
    @AfterMethod
    public void teardown() {
        driver.quit();
    }
}`}
        />
      </div>

      {/* Question 4 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Q4: How to Handle Dynamic Elements?</h3>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            Use partial matching (contains, starts-with), explicit waits, stable parent elements, 
            or data-testid attributes for reliable locators.
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: BookMyShow dynamic seat IDs and movie cards</p>
        </div>
        <CodeBlock
          title="Real Example - BookMyShow Dynamic Elements"
          code={`public class BookMyShowDynamicElementsDemo {
    WebDriver driver;
    WebDriverWait wait;
    
    @Test
    public void testDynamicSeatSelection() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("https://www.bookmyshow.com");
        
        // Scenario 1: Movie cards with dynamic IDs
        // BAD: ID changes on each page load - movie_12345, movie_67890
        // driver.findElement(By.id("movie_12345")); // Will break!
        
        // GOOD: Use partial matching
        WebElement jawanMovie = driver.findElement(
            By.xpath("//div[contains(@id,'movie_') and .//h4[text()='Jawan']]")
        );
        jawanMovie.click();
        
        // Scenario 2: Seat IDs with session-based prefix
        // Actual ID: seat_abc123_A1, seat_abc123_A2 (abc123 is session ID)
        
        // GOOD: Use data attribute or partial match
        WebElement seatA1 = wait.until(ExpectedConditions.elementToBeClickable(
            By.cssSelector("[data-seat='A1']")  // Using data attribute
        ));
        seatA1.click();
        
        // Alternative: Partial ID match
        WebElement seatA2 = driver.findElement(
            By.xpath("//div[contains(@id,'_A2') and contains(@class,'seat')]")
        );
        seatA2.click();
        
        // Scenario 3: Dynamic class names (CSS modules)
        // Actual class: seat_module__active__x7y2z (hash changes on build)
        
        // GOOD: Use partial class match
        List<WebElement> selectedSeats = driver.findElements(
            By.cssSelector("[class*='seat'][class*='selected']")
        );
        System.out.println("Selected seats: " + selectedSeats.size());
        
        // Scenario 4: Find button in row with specific text
        // Find "Book" button for 7:00 PM show at PVR
        WebElement bookBtn = driver.findElement(By.xpath(
            "//div[contains(@class,'theater')]" +
            "[.//h4[contains(text(),'PVR')]]" +
            "//div[contains(@class,'showtime')]" +
            "[.//span[text()='7:00 PM']]" +
            "//button[text()='Book']"
        ));
        bookBtn.click();
        
        driver.quit();
    }
}`}
        />
      </div>

      {/* Question 5 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Q5: What is Page Object Model (POM)?</h3>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            POM is a design pattern where each web page is a class with elements as variables and actions as methods. 
            Benefits: reusability, maintainability, separation of concerns.
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: Complete Coursera Login Page Object</p>
        </div>
        <CodeBlock
          title="Real Example - Coursera Login with POM"
          code={`// ========== PAGE OBJECT CLASS ==========
public class CourseraLoginPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // LOCATORS - centralized, easy to maintain
    private By emailField = By.id("email");
    private By passwordField = By.id("password");
    private By loginButton = By.xpath("//button[text()='Login']");
    private By errorMessage = By.className("error-message");
    private By googleLoginBtn = By.cssSelector("[data-testid='google-login']");
    private By forgotPasswordLink = By.linkText("Forgot password?");
    
    // CONSTRUCTOR
    public CourseraLoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    // PAGE METHODS - reusable actions
    public void enterEmail(String email) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(emailField))
            .sendKeys(email);
    }
    
    public void enterPassword(String password) {
        driver.findElement(passwordField).sendKeys(password);
    }
    
    public void clickLogin() {
        driver.findElement(loginButton).click();
    }
    
    // COMBINED ACTION - common flow
    public CourseraHomePage login(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        clickLogin();
        return new CourseraHomePage(driver);
    }
    
    // VERIFICATION METHODS
    public String getErrorMessage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(errorMessage))
                   .getText();
    }
    
    public boolean isLoginPageDisplayed() {
        return driver.findElement(loginButton).isDisplayed();
    }
}

// ========== TEST CLASS - Clean and readable ==========
public class CourseraLoginTest extends BaseTest {
    private CourseraLoginPage loginPage;
    
    @BeforeMethod
    public void navigateToLogin() {
        driver.get("https://www.coursera.org/login");
        loginPage = new CourseraLoginPage(driver);
    }
    
    @Test
    public void testValidLogin() {
        // Test is clean - no locators, just business logic
        CourseraHomePage homePage = loginPage.login("user@email.com", "password123");
        Assert.assertTrue(homePage.isHomePageDisplayed());
    }
    
    @Test
    public void testInvalidLogin() {
        loginPage.login("invalid@email.com", "wrongpassword");
        Assert.assertEquals(loginPage.getErrorMessage(), "Invalid credentials");
    }
    
    @Test
    public void testEmptyEmail() {
        loginPage.enterPassword("password123");
        loginPage.clickLogin();
        Assert.assertTrue(loginPage.getErrorMessage().contains("Email is required"));
    }
}

// BENEFIT: If email field ID changes from "email" to "userEmail"
// You update ONLY ONE place: private By emailField = By.id("userEmail");
// All 50+ tests using login will work without any changes!`}
        />
      </div>

      {/* Question 6 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Q6: How to Handle Frames/iFrames?</h3>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            Use driver.switchTo().frame() with index, name/ID, or WebElement. 
            Use defaultContent() to return to main page, parentFrame() for nested frames.
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: Coursera video player inside iframe</p>
        </div>
        <CodeBlock
          title="Real Example - Coursera Video Player in iFrame"
          code={`public class CourseraVideoPlayerDemo {
    WebDriver driver;
    WebDriverWait wait;
    
    @Test
    public void testVideoPlaybackInFrame() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        driver.get("https://www.coursera.org/learn/python/lecture/1");
        
        // Video player is inside an iframe
        // HTML structure:
        // <div class="video-container">
        //   <iframe id="video-player" src="player.coursera.org/...">
        //     #document
        //       <video id="lecture-video">...</video>
        //       <button class="play-btn">Play</button>
        //       <div class="progress-bar">...</div>
        //   </iframe>
        // </div>
        
        // Step 1: Wait for iframe to load
        WebElement videoFrame = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.id("video-player"))
        );
        
        // Step 2: Switch to iframe (3 ways)
        // Method 1: By WebElement (most reliable)
        driver.switchTo().frame(videoFrame);
        
        // Method 2: By name or ID
        // driver.switchTo().frame("video-player");
        
        // Method 3: By index (0-based, not recommended)
        // driver.switchTo().frame(0);
        
        // Step 3: Now interact with elements INSIDE the frame
        WebElement playButton = wait.until(
            ExpectedConditions.elementToBeClickable(By.className("play-btn"))
        );
        playButton.click();
        
        // Verify video is playing
        WebElement video = driver.findElement(By.id("lecture-video"));
        String paused = video.getAttribute("paused");
        Assert.assertNull(paused, "Video should be playing");
        
        // Get video progress
        WebElement progressBar = driver.findElement(By.className("progress-bar"));
        System.out.println("Progress: " + progressBar.getAttribute("value") + "%");
        
        // Step 4: Switch back to main content
        driver.switchTo().defaultContent();
        
        // Now you can interact with elements outside the frame
        WebElement courseTitle = driver.findElement(By.className("course-title"));
        System.out.println("Course: " + courseTitle.getText());
        
        driver.quit();
    }
    
    @Test
    public void testNestedFrames() {
        // Some pages have frames inside frames
        // Main page -> Outer frame -> Inner frame -> Element
        
        // Switch to outer frame first
        driver.switchTo().frame("outerFrame");
        
        // Then switch to inner frame
        driver.switchTo().frame("innerFrame");
        
        // Interact with element in innermost frame
        driver.findElement(By.id("deepElement")).click();
        
        // Go up one level
        driver.switchTo().parentFrame();  // Now in outer frame
        
        // Go back to main content
        driver.switchTo().defaultContent();  // Now in main page
    }
}`}
        />
      </div>

      {/* Question 7 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Q7: How to Handle Alerts?</h3>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            Use driver.switchTo().alert() to get Alert object. Methods: accept() for OK, 
            dismiss() for Cancel, getText() for message, sendKeys() for prompts.
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: BookMyShow booking confirmation and cancellation alerts</p>
        </div>
        <CodeBlock
          title="Real Example - BookMyShow Alert Handling"
          code={`public class BookMyShowAlertDemo {
    WebDriver driver;
    WebDriverWait wait;
    
    @Test
    public void testBookingConfirmationAlert() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("https://www.bookmyshow.com");
        
        // Complete booking steps...
        // Select movie, theater, seats, etc.
        
        // Click "Confirm Booking" - triggers JavaScript alert
        driver.findElement(By.id("confirmBooking")).click();
        
        // SIMPLE ALERT - just OK button
        // Alert message: "Your booking is confirmed! Booking ID: BMS123456"
        
        // Wait for alert to appear
        Alert confirmAlert = wait.until(ExpectedConditions.alertIsPresent());
        
        // Get alert message
        String alertText = confirmAlert.getText();
        System.out.println("Alert Message: " + alertText);
        
        // Extract booking ID from message
        String bookingId = alertText.split(": ")[1];
        System.out.println("Booking ID: " + bookingId);
        
        // Accept the alert (click OK)
        confirmAlert.accept();
        
        // Verify navigation to confirmation page
        Assert.assertTrue(driver.getCurrentUrl().contains("/booking-confirmed"));
    }
    
    @Test
    public void testCancellationConfirmAlert() {
        // CONFIRM ALERT - OK and Cancel buttons
        // User tries to cancel a booking
        
        driver.findElement(By.id("cancelBooking")).click();
        
        // Alert: "Are you sure you want to cancel this booking? 
        //         Cancellation charges may apply."
        
        Alert cancelAlert = wait.until(ExpectedConditions.alertIsPresent());
        String message = cancelAlert.getText();
        
        if (message.contains("Cancellation charges")) {
            // User decides NOT to cancel
            cancelAlert.dismiss();  // Click Cancel
            Assert.assertTrue(driver.findElement(By.id("bookingDetails")).isDisplayed());
        } else {
            // Proceed with cancellation
            cancelAlert.accept();  // Click OK
        }
    }
    
    @Test
    public void testPromptAlertForFeedback() {
        // PROMPT ALERT - text input field
        // After booking, prompt for feedback
        
        driver.findElement(By.id("giveFeedback")).click();
        
        // Alert: "Please enter your feedback:"
        // With text input field
        
        Alert promptAlert = wait.until(ExpectedConditions.alertIsPresent());
        
        // Enter text in prompt
        promptAlert.sendKeys("Great experience! Easy booking process.");
        
        // Submit feedback
        promptAlert.accept();
        
        // Verify thank you message
        WebElement thankYou = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("thank-you"))
        );
        Assert.assertTrue(thankYou.getText().contains("Thank you"));
    }
    
    @Test
    public void testUnexpectedAlertHandling() {
        // Handle alerts that may or may not appear
        try {
            driver.findElement(By.id("someAction")).click();
            
            // Check if alert appeared
            Alert alert = driver.switchTo().alert();
            System.out.println("Unexpected alert: " + alert.getText());
            alert.accept();
            
        } catch (NoAlertPresentException e) {
            // No alert - continue with test
            System.out.println("No alert present, continuing...");
        }
    }
}`}
        />
      </div>

      {/* Question 8 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Q8: How to Handle Multiple Windows?</h3>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            Store main window handle with getWindowHandle(). Use getWindowHandles() to get all windows. 
            Loop through and switchTo().window(handle) to switch between them.
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: RedBus opens train details in new tab</p>
        </div>
        <CodeBlock
          title="Real Example - RedBus Multiple Windows"
          code={`public class RedBusMultipleWindowsDemo {
    WebDriver driver;
    WebDriverWait wait;
    
    @Test
    public void testTrainDetailsInNewWindow() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("https://www.redbus.in/railways");
        
        // Store the main window handle
        String mainWindow = driver.getWindowHandle();
        System.out.println("Main Window Handle: " + mainWindow);
        
        // Search for trains
        driver.findElement(By.id("fromStation")).sendKeys("Chennai");
        driver.findElement(By.id("toStation")).sendKeys("Bangalore");
        driver.findElement(By.id("searchTrains")).click();
        
        // Wait for results
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("train-list")));
        
        // Click "View Details" - opens in new window
        driver.findElement(By.xpath("(//button[text()='View Details'])[1]")).click();
        
        // Wait for new window to open
        wait.until(ExpectedConditions.numberOfWindowsToBe(2));
        
        // Get all window handles
        Set<String> allWindows = driver.getWindowHandles();
        System.out.println("Total Windows: " + allWindows.size());
        
        // Switch to new window
        for (String window : allWindows) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                System.out.println("Switched to: " + driver.getTitle());
                break;
            }
        }
        
        // Perform actions in new window
        WebElement trainName = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("train-name"))
        );
        String name = trainName.getText();
        
        WebElement departureTime = driver.findElement(By.className("departure"));
        String departure = departureTime.getText();
        
        WebElement fare = driver.findElement(By.className("fare"));
        String price = fare.getText();
        
        System.out.println("Train: " + name);
        System.out.println("Departure: " + departure);
        System.out.println("Fare: " + price);
        
        // Close only the details window
        driver.close();
        
        // Switch back to main window
        driver.switchTo().window(mainWindow);
        
        // Continue with booking in main window
        System.out.println("Back to: " + driver.getTitle());
        Assert.assertTrue(driver.findElement(By.className("train-list")).isDisplayed());
        
        driver.quit();
    }
    
    @Test
    public void testOpeningNewTabProgrammatically() {
        driver = new ChromeDriver();
        driver.get("https://www.redbus.in");
        
        String mainTab = driver.getWindowHandle();
        
        // Selenium 4 way - open new tab directly
        driver.switchTo().newWindow(WindowType.TAB);
        driver.get("https://www.bookmyshow.com");
        
        System.out.println("New tab title: " + driver.getTitle());
        
        // Switch back to original tab
        driver.switchTo().window(mainTab);
        System.out.println("Main tab title: " + driver.getTitle());
        
        driver.quit();
    }
}`}
        />
      </div>

      {/* Question 9 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Q9: Explain StaleElementReferenceException</h3>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            Occurs when element reference is no longer valid (DOM changed, page refreshed). 
            Handle by re-finding element, using explicit waits, or implementing retry logic.
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: Coursera course list refreshes after filter</p>
        </div>
        <CodeBlock
          title="Real Example - Handling Stale Element on Coursera"
          code={`public class StaleElementDemo {
    WebDriver driver;
    WebDriverWait wait;
    
    @Test
    public void testStaleElementScenario() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("https://www.coursera.org/browse");
        
        // Get first course card
        WebElement firstCourse = wait.until(
            ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector(".course-card:first-child")
            )
        );
        String originalTitle = firstCourse.findElement(By.tagName("h3")).getText();
        System.out.println("Original course: " + originalTitle);
        
        // Apply filter - this REFRESHES the course list via AJAX
        driver.findElement(By.xpath("//label[text()='Beginner']")).click();
        
        // Wait for loading
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.className("loading-spinner")
        ));
        
        // BUG: firstCourse reference is now STALE!
        // The DOM was rebuilt, old element reference is invalid
        try {
            String newTitle = firstCourse.getText();  // THROWS StaleElementReferenceException!
        } catch (StaleElementReferenceException e) {
            System.out.println("Caught StaleElementReferenceException as expected!");
        }
        
        // SOLUTION 1: Re-find the element
        WebElement refreshedCourse = driver.findElement(
            By.cssSelector(".course-card:first-child")
        );
        System.out.println("After filter: " + refreshedCourse.getText());
    }
    
    // SOLUTION 2: Wrapper method with retry logic
    public WebElement findElementWithRetry(By locator, int maxRetries) {
        int attempts = 0;
        while (attempts < maxRetries) {
            try {
                WebElement element = driver.findElement(locator);
                // Try to interact to verify it's not stale
                element.isDisplayed();
                return element;
            } catch (StaleElementReferenceException e) {
                attempts++;
                System.out.println("Retry attempt: " + attempts);
            }
        }
        throw new RuntimeException("Element still stale after " + maxRetries + " retries");
    }
    
    // SOLUTION 3: Use explicit wait with refreshed reference
    public WebElement waitForFreshElement(By locator) {
        return wait.until(driver -> {
            try {
                WebElement element = driver.findElement(locator);
                element.isDisplayed();  // Verify not stale
                return element;
            } catch (StaleElementReferenceException e) {
                return null;  // Return null to keep waiting
            }
        });
    }
    
    @Test
    public void testWithStaleElementHandling() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("https://www.coursera.org/browse");
        
        // Click filter
        driver.findElement(By.xpath("//label[text()='Beginner']")).click();
        
        // Use safe method that handles staleness
        WebElement course = waitForFreshElement(By.cssSelector(".course-card:first-child"));
        System.out.println("Course: " + course.getText());
        
        driver.quit();
    }
}`}
        />
      </div>

      {/* Question 10 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Q10: How to Handle Dropdowns?</h3>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            For &lt;select&gt; elements, use Select class with selectByVisibleText(), selectByValue(), selectByIndex().
            For custom dropdowns, click to open and select option element.
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: BookMyShow city selection (custom dropdown) and ticket quantity (select dropdown)</p>
        </div>
        <CodeBlock
          title="Real Example - BookMyShow Dropdown Handling"
          code={`public class BookMyShowDropdownDemo {
    WebDriver driver;
    WebDriverWait wait;
    
    @Test
    public void testCitySelectionCustomDropdown() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("https://www.bookmyshow.com");
        
        // CUSTOM DROPDOWN (not a <select> element)
        // HTML structure:
        // <div class="city-selector">
        //   <span class="selected-city">Select City</span>
        //   <ul class="city-list" style="display:none">
        //     <li data-city="Mumbai">Mumbai</li>
        //     <li data-city="Delhi">Delhi</li>
        //   </ul>
        // </div>
        
        // Step 1: Click to open dropdown
        WebElement citySelectorTrigger = wait.until(
            ExpectedConditions.elementToBeClickable(By.className("city-selector"))
        );
        citySelectorTrigger.click();
        
        // Step 2: Wait for dropdown to be visible
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("city-list")));
        
        // Step 3: Type in search box (if available)
        WebElement searchBox = driver.findElement(By.cssSelector(".city-search input"));
        searchBox.sendKeys("Mumbai");
        
        // Step 4: Click the matching city
        WebElement mumbaiOption = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//li[@data-city='Mumbai']")
            )
        );
        mumbaiOption.click();
        
        // Verify city is selected
        WebElement selectedCity = driver.findElement(By.className("selected-city"));
        Assert.assertEquals(selectedCity.getText(), "Mumbai");
    }
    
    @Test
    public void testTicketQuantitySelectDropdown() {
        // Navigate to seat selection page...
        
        // STANDARD SELECT DROPDOWN
        // HTML: <select id="ticketQuantity">
        //         <option value="1">1 Ticket</option>
        //         <option value="2">2 Tickets</option>
        //         <option value="3">3 Tickets</option>
        //       </select>
        
        WebElement ticketDropdown = driver.findElement(By.id("ticketQuantity"));
        Select select = new Select(ticketDropdown);
        
        // Method 1: Select by visible text
        select.selectByVisibleText("2 Tickets");
        
        // Method 2: Select by value attribute
        select.selectByValue("2");
        
        // Method 3: Select by index (0-based)
        select.selectByIndex(1);  // Selects "2 Tickets"
        
        // Get selected option
        WebElement selected = select.getFirstSelectedOption();
        System.out.println("Selected: " + selected.getText());
        Assert.assertEquals(selected.getText(), "2 Tickets");
        
        // Get all options
        List<WebElement> allOptions = select.getOptions();
        System.out.println("Available quantities:");
        for (WebElement option : allOptions) {
            System.out.println("- " + option.getText());
        }
        
        // Check if it's multi-select
        boolean isMultiple = select.isMultiple();
        System.out.println("Is multi-select: " + isMultiple);
    }
    
    @Test
    public void testDatePickerDropdown() {
        // Date picker - click to open calendar dropdown
        driver.findElement(By.id("journeyDate")).click();
        
        // Wait for calendar to appear
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("calendar")));
        
        // Navigate to next month if needed
        while (!driver.findElement(By.className("month-year")).getText().contains("December")) {
            driver.findElement(By.className("next-month")).click();
        }
        
        // Select specific date
        driver.findElement(By.xpath("//td[@data-date='2024-12-25']")).click();
        
        // Verify selected date
        String selectedDate = driver.findElement(By.id("journeyDate")).getAttribute("value");
        Assert.assertEquals(selectedDate, "25-Dec-2024");
        
        driver.quit();
    }
}`}
        />
      </div>

      {/* Question 11 - TestNG DataProvider */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Q11: How to Implement Data-Driven Testing?</h3>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            Use TestNG @DataProvider to supply test data. Return Object[][] or Iterator. 
            Link to test with @Test(dataProvider="name"). Can read from Excel, JSON, or database.
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: Coursera login with multiple user credentials from Excel</p>
        </div>
        <CodeBlock
          title="Real Example - Data-Driven Login Testing"
          code={`public class CourseraDataDrivenTest extends BaseTest {
    
    // ========== DATA PROVIDER FROM CODE ==========
    @DataProvider(name = "loginCredentials")
    public Object[][] getLoginData() {
        return new Object[][] {
            // email, password, expectedResult, description
            {"valid@coursera.org", "Password@123", true, "Valid credentials"},
            {"invalid@email.com", "wrongpass", false, "Invalid credentials"},
            {"", "password123", false, "Empty email"},
            {"user@test.com", "", false, "Empty password"},
            {"valid@coursera.org", "wrongpass", false, "Valid email, wrong password"},
            {"test@@invalid", "pass123", false, "Invalid email format"}
        };
    }
    
    @Test(dataProvider = "loginCredentials")
    public void testLoginWithMultipleData(String email, String password, 
                                          boolean shouldPass, String description) {
        System.out.println("Testing: " + description);
        
        driver.get("https://www.coursera.org/login");
        CourseraLoginPage loginPage = new CourseraLoginPage(driver);
        
        loginPage.enterEmail(email);
        loginPage.enterPassword(password);
        loginPage.clickLogin();
        
        if (shouldPass) {
            Assert.assertTrue(driver.getCurrentUrl().contains("/browse"),
                "Should navigate to home after valid login");
        } else {
            Assert.assertTrue(loginPage.isErrorDisplayed(),
                "Should show error for: " + description);
        }
    }
    
    // ========== DATA PROVIDER FROM EXCEL ==========
    @DataProvider(name = "excelData")
    public Object[][] getExcelData() throws IOException {
        String filePath = "src/test/resources/testdata/LoginData.xlsx";
        return ExcelReader.readTestData(filePath, "LoginTests");
    }
    
    @Test(dataProvider = "excelData")
    public void testLoginFromExcel(String email, String password, String expected) {
        driver.get("https://www.coursera.org/login");
        
        new CourseraLoginPage(driver).login(email, password);
        
        if (expected.equals("PASS")) {
            Assert.assertTrue(driver.getCurrentUrl().contains("/browse"));
        } else {
            Assert.assertTrue(driver.findElement(By.className("error")).isDisplayed());
        }
    }
    
    // ========== DATA PROVIDER FROM EXTERNAL CLASS ==========
    @Test(dataProvider = "bookingData", dataProviderClass = TestDataProvider.class)
    public void testMovieBooking(String city, String movie, int seats) {
        BookMyShowHomePage homePage = new BookMyShowHomePage(driver);
        homePage.selectCity(city);
        homePage.searchMovie(movie);
        
        SeatSelectionPage seatPage = new SeatSelectionPage(driver);
        seatPage.selectSeats(seats);
        
        Assert.assertEquals(seatPage.getSelectedSeatCount(), seats);
    }
}

// ========== EXTERNAL DATA PROVIDER CLASS ==========
public class TestDataProvider {
    
    @DataProvider(name = "bookingData")
    public static Object[][] getBookingData() {
        return new Object[][] {
            {"Mumbai", "Jawan", 2},
            {"Delhi", "Tiger 3", 4},
            {"Bangalore", "Animal", 3}
        };
    }
    
    @DataProvider(name = "cityData")
    public static Object[][] getCityData() {
        return new Object[][] {
            {"Mumbai", 15},
            {"Delhi", 12},
            {"Bangalore", 10},
            {"Chennai", 8}
        };
    }
}

// ========== EXCEL READER UTILITY ==========
public class ExcelReader {
    public static Object[][] readTestData(String filePath, String sheetName) 
            throws IOException {
        FileInputStream fis = new FileInputStream(filePath);
        XSSFWorkbook workbook = new XSSFWorkbook(fis);
        XSSFSheet sheet = workbook.getSheet(sheetName);
        
        int rows = sheet.getPhysicalNumberOfRows();
        int cols = sheet.getRow(0).getPhysicalNumberOfCells();
        
        Object[][] data = new Object[rows - 1][cols];  // Skip header
        
        for (int i = 1; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                data[i-1][j] = sheet.getRow(i).getCell(j).toString();
            }
        }
        
        workbook.close();
        return data;
    }
}`}
        />
      </div>

      {/* Question 12 - TestNG Listeners */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Q12: What are TestNG Listeners?</h3>
        <div className="p-5 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary font-medium">Answer: </span>
            Listeners intercept test events. ITestListener (pass/fail/skip events), ISuiteListener (suite start/finish),
            IReporter (custom reports), IRetryAnalyzer (retry failed tests).
          </p>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Real-Time Scenario: Screenshot on failure, Extent Reports, retry flaky tests</p>
        </div>
        <CodeBlock
          title="Real Example - Complete Listener Implementation"
          code={`// ========== ITEST LISTENER - Screenshot on Failure ==========
public class TestListener implements ITestListener {
    
    @Override
    public void onStart(ITestContext context) {
        System.out.println("========================================");
        System.out.println("TEST SUITE STARTED: " + context.getName());
        System.out.println("========================================");
        ExtentReportManager.initReport(context.getName());
    }
    
    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("Starting Test: " + result.getName());
        ExtentReportManager.createTest(result.getName());
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("✓ PASSED: " + result.getName());
        ExtentReportManager.logPass("Test passed successfully");
    }
    
    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("✗ FAILED: " + result.getName());
        System.out.println("Reason: " + result.getThrowable().getMessage());
        
        // CAPTURE SCREENSHOT ON FAILURE
        WebDriver driver = ((BaseTest) result.getInstance()).getDriver();
        String screenshotPath = captureScreenshot(driver, result.getName());
        
        // Attach to report
        ExtentReportManager.logFail(result.getThrowable());
        ExtentReportManager.attachScreenshot(screenshotPath);
    }
    
    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("⊘ SKIPPED: " + result.getName());
        ExtentReportManager.logSkip("Test was skipped");
    }
    
    @Override
    public void onFinish(ITestContext context) {
        System.out.println("========================================");
        System.out.println("PASSED: " + context.getPassedTests().size());
        System.out.println("FAILED: " + context.getFailedTests().size());
        System.out.println("SKIPPED: " + context.getSkippedTests().size());
        System.out.println("========================================");
        ExtentReportManager.flushReport();
    }
    
    private String captureScreenshot(WebDriver driver, String testName) {
        TakesScreenshot ts = (TakesScreenshot) driver;
        File source = ts.getScreenshotAs(OutputType.FILE);
        String path = "screenshots/" + testName + "_" + System.currentTimeMillis() + ".png";
        try {
            FileUtils.copyFile(source, new File(path));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return path;
    }
}

// ========== IRETRY ANALYZER - Retry Failed Tests ==========
public class RetryAnalyzer implements IRetryAnalyzer {
    private int retryCount = 0;
    private static final int MAX_RETRY = 2;
    
    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < MAX_RETRY) {
            retryCount++;
            System.out.println("Retrying " + result.getName() + " - Attempt " + retryCount);
            return true;  // Retry the test
        }
        return false;  // Don't retry
    }
}

// Apply RetryAnalyzer to all tests automatically
public class RetryListener implements IAnnotationTransformer {
    @Override
    public void transform(ITestAnnotation annotation, Class testClass,
                         Constructor testConstructor, Method testMethod) {
        annotation.setRetryAnalyzer(RetryAnalyzer.class);
    }
}

// ========== USING LISTENERS ==========
// Method 1: In testng.xml
// <listeners>
//     <listener class-name="com.automation.listeners.TestListener"/>
//     <listener class-name="com.automation.listeners.RetryListener"/>
// </listeners>

// Method 2: Using @Listeners annotation
@Listeners({TestListener.class, RetryListener.class})
public class BookMyShowTest extends BaseTest {
    
    @Test
    public void testMovieBooking() {
        // If this test fails, it will:
        // 1. Capture screenshot (TestListener)
        // 2. Retry up to 2 times (RetryAnalyzer)
        // 3. Log to Extent Report (TestListener)
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
