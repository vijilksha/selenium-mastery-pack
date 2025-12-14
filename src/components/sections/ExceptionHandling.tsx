import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';
import { AlertTriangle, Layers, Monitor, List, Upload, Camera, Code, MousePointer, Bug, Zap, Clock, Eye, Link, RefreshCw, XCircle, Search, FileX } from 'lucide-react';

export const ExceptionHandling = () => {
  const section = sections.find(s => s.id === 'exception-handling')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={9} />

      {/* Selenium Exceptions Overview */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Bug className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">Selenium WebDriver Exceptions</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Selenium WebDriver throws various exceptions during test execution. Understanding these exceptions 
          and knowing how to handle them is crucial for writing robust automation scripts. All Selenium 
          exceptions extend from <code className="code-inline">org.openqa.selenium.WebDriverException</code>.
        </p>

        {/* Exception Hierarchy */}
        <div className="p-6 bg-card rounded-xl border border-border">
          <h4 className="text-lg font-semibold text-foreground mb-4">Exception Hierarchy</h4>
          <CodeBlock
            title="SeleniumExceptionHierarchy.txt"
            language="text"
            code={`java.lang.RuntimeException
└── org.openqa.selenium.WebDriverException
    ├── NoSuchElementException
    ├── StaleElementReferenceException
    ├── ElementNotInteractableException
    ├── ElementClickInterceptedException
    ├── TimeoutException
    ├── NoSuchFrameException
    ├── NoSuchWindowException
    ├── NoAlertPresentException
    ├── InvalidElementStateException
    ├── InvalidSelectorException
    ├── SessionNotCreatedException
    ├── UnexpectedAlertPresentException
    └── JavascriptException`}
          />
        </div>
      </div>

      {/* NoSuchElementException */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Search className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">1. NoSuchElementException</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Thrown when <code className="code-inline">findElement()</code> cannot locate an element using the given locator.
          This is the most common exception in Selenium automation.
        </p>

        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 mb-4">
          <h5 className="font-semibold text-foreground mb-2">Common Causes:</h5>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Wrong locator (typo in ID, class, XPath)</li>
            <li>Element not yet loaded (page still loading)</li>
            <li>Element inside frame/iframe</li>
            <li>Element dynamically generated after page load</li>
            <li>Element removed from DOM</li>
          </ul>
        </div>

        <CodeBlock
          title="NoSuchElementExceptionDemo.java"
          language="java"
          code={`import org.openqa.selenium.NoSuchElementException;

public class NoSuchElementExceptionDemo {
    
    WebDriver driver;
    
    // ❌ BAD: Direct findElement without wait
    public void badExample() {
        driver.get("https://www.coursera.org");
        // Element may not be loaded yet - throws NoSuchElementException
        driver.findElement(By.id("searchInput")).sendKeys("Selenium");
    }
    
    // ✅ GOOD: Using Explicit Wait
    public void handleWithExplicitWait() {
        driver.get("https://www.coursera.org");
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        try {
            WebElement searchInput = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.id("searchInput"))
            );
            searchInput.sendKeys("Selenium");
        } catch (TimeoutException e) {
            System.out.println("Element not found within 10 seconds");
            // Take screenshot for debugging
            ScreenshotUtility.takeScreenshot(driver, "search_input_not_found");
        }
    }
    
    // ✅ GOOD: Using try-catch for optional elements
    public void handleOptionalElement() {
        try {
            WebElement popupCloseBtn = driver.findElement(By.id("popupClose"));
            popupCloseBtn.click();
            System.out.println("Popup closed successfully");
        } catch (NoSuchElementException e) {
            System.out.println("No popup present - continuing test");
        }
    }
    
    // ✅ GOOD: Check element existence before action
    public boolean isElementPresent(By locator) {
        try {
            driver.findElement(locator);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
    
    // Real Example: Coursera - Handle cookie consent popup
    public void handleCookieConsent() {
        driver.get("https://www.coursera.org");
        
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
            WebElement acceptCookies = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("onetrust-accept-btn"))
            );
            acceptCookies.click();
        } catch (TimeoutException | NoSuchElementException e) {
            System.out.println("Cookie popup not displayed or already accepted");
        }
    }
    
    // Real Example: BookMyShow - Search for movie
    public void searchMovie(String movieName) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        
        // Wait for search box with multiple possible locators
        By[] possibleLocators = {
            By.id("srcInput"),
            By.cssSelector("input[placeholder*='Search']"),
            By.xpath("//input[@type='text' and contains(@class, 'search')]")
        };
        
        WebElement searchBox = null;
        for (By locator : possibleLocators) {
            try {
                searchBox = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
                break;
            } catch (TimeoutException e) {
                continue;
            }
        }
        
        if (searchBox == null) {
            throw new RuntimeException("Search box not found with any known locator");
        }
        
        searchBox.sendKeys(movieName);
    }
}`}
        />
      </div>

      {/* StaleElementReferenceException */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">2. StaleElementReferenceException</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Thrown when the element reference is no longer valid because the element is no longer attached 
          to the DOM (page refreshed, DOM updated, or element re-rendered).
        </p>

        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 mb-4">
          <h5 className="font-semibold text-foreground mb-2">Common Causes:</h5>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Page refresh or navigation after finding element</li>
            <li>AJAX call updated the DOM</li>
            <li>JavaScript modified or removed the element</li>
            <li>Element was inside a frame that was reloaded</li>
            <li>Single Page Application (SPA) re-rendered component</li>
          </ul>
        </div>

        <CodeBlock
          title="StaleElementReferenceExceptionDemo.java"
          language="java"
          code={`import org.openqa.selenium.StaleElementReferenceException;

public class StaleElementReferenceExceptionDemo {
    
    WebDriver driver;
    
    // ❌ BAD: Element becomes stale after page refresh
    public void badExample() {
        WebElement searchBox = driver.findElement(By.id("search"));
        driver.navigate().refresh();  // Page refreshes
        searchBox.sendKeys("test");   // Throws StaleElementReferenceException!
    }
    
    // ✅ GOOD: Re-find element after DOM changes
    public void handleWithRefind() {
        WebElement searchBox = driver.findElement(By.id("search"));
        driver.navigate().refresh();
        
        // Re-find the element after refresh
        searchBox = driver.findElement(By.id("search"));
        searchBox.sendKeys("test");
    }
    
    // ✅ GOOD: Use retry mechanism
    public void clickWithRetry(By locator, int maxRetries) {
        int attempts = 0;
        while (attempts < maxRetries) {
            try {
                WebElement element = driver.findElement(locator);
                element.click();
                return;
            } catch (StaleElementReferenceException e) {
                attempts++;
                System.out.println("Stale element, retry attempt: " + attempts);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }
        throw new RuntimeException("Element still stale after " + maxRetries + " retries");
    }
    
    // ✅ GOOD: Using FluentWait to ignore StaleElement
    public void handleWithFluentWait() {
        Wait<WebDriver> wait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(30))
            .pollingEvery(Duration.ofSeconds(2))
            .ignoring(StaleElementReferenceException.class);
        
        WebElement element = wait.until(driver -> {
            WebElement el = driver.findElement(By.id("dynamicElement"));
            el.click();  // This action is also protected by wait
            return el;
        });
    }
    
    // Real Example: Coursera - Handle course list after filter
    public void selectCourseAfterFilter() {
        // Apply filter - this triggers AJAX and re-renders course list
        driver.findElement(By.id("filterBeginner")).click();
        
        // Wait for DOM to stabilize after AJAX
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.refreshed(
            ExpectedConditions.presenceOfElementLocated(By.cssSelector(".course-card"))
        ));
        
        // Now safely find and click the course
        WebElement firstCourse = wait.until(
            ExpectedConditions.elementToBeClickable(By.cssSelector(".course-card:first-child"))
        );
        firstCourse.click();
    }
    
    // Real Example: BookMyShow - Seat selection with dynamic updates
    public void selectSeatsWithDynamicUpdate() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        // Seats are dynamically updated when selected
        int retryCount = 3;
        for (int i = 0; i < retryCount; i++) {
            try {
                WebElement seat = wait.until(
                    ExpectedConditions.elementToBeClickable(
                        By.xpath("//div[@class='seat available'][@data-seat='A1']")
                    )
                );
                seat.click();
                
                // Verify seat is selected (DOM updates)
                wait.until(ExpectedConditions.attributeContains(
                    By.xpath("//div[@data-seat='A1']"), "class", "selected"
                ));
                break;
            } catch (StaleElementReferenceException e) {
                System.out.println("Seat element became stale, retrying...");
            }
        }
    }
    
    // Utility: Safe click with automatic stale handling
    public void safeClick(By locator) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.refreshed(
            ExpectedConditions.elementToBeClickable(locator)
        )).click();
    }
}`}
        />
      </div>

      {/* ElementNotInteractableException */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <XCircle className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">3. ElementNotInteractableException</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Thrown when an element is present in the DOM but cannot be interacted with (clicked, typed into, etc.)
          because it's not visible, disabled, or obscured by another element.
        </p>

        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 mb-4">
          <h5 className="font-semibold text-foreground mb-2">Common Causes:</h5>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Element is hidden (display: none or visibility: hidden)</li>
            <li>Element has zero dimensions (height/width = 0)</li>
            <li>Element is off-screen and needs scrolling</li>
            <li>Element is disabled</li>
            <li>Another element overlays the target element</li>
          </ul>
        </div>

        <CodeBlock
          title="ElementNotInteractableExceptionDemo.java"
          language="java"
          code={`import org.openqa.selenium.ElementNotInteractableException;

public class ElementNotInteractableExceptionDemo {
    
    WebDriver driver;
    JavascriptExecutor js;
    
    // ❌ BAD: Click on hidden element
    public void badExample() {
        // Element exists but is hidden - throws ElementNotInteractableException
        driver.findElement(By.id("hiddenButton")).click();
    }
    
    // ✅ GOOD: Wait for element to be visible and clickable
    public void handleWithVisibilityWait() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        WebElement button = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("submitButton"))
        );
        button.click();
    }
    
    // ✅ GOOD: Scroll element into view before interaction
    public void handleWithScroll() {
        WebElement element = driver.findElement(By.id("footerLink"));
        
        // Scroll element into view
        js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
        
        // Small wait for scroll animation
        try { Thread.sleep(500); } catch (InterruptedException e) {}
        
        element.click();
    }
    
    // ✅ GOOD: Use JavaScript click as fallback
    public void handleWithJavaScriptClick() {
        WebElement element = driver.findElement(By.id("overlappedButton"));
        
        try {
            element.click();
        } catch (ElementNotInteractableException e) {
            System.out.println("Regular click failed, using JavaScript click");
            js = (JavascriptExecutor) driver;
            js.executeScript("arguments[0].click();", element);
        }
    }
    
    // ✅ GOOD: Wait for overlay to disappear
    public void handleOverlay() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        // Wait for loading overlay to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.className("loading-overlay")
        ));
        
        // Now click the button
        WebElement button = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("submitBtn"))
        );
        button.click();
    }
    
    // Real Example: Coursera - Click hidden menu item
    public void clickHiddenMenuItem() {
        // First hover on menu to reveal hidden items
        Actions actions = new Actions(driver);
        WebElement mainMenu = driver.findElement(By.id("mainMenu"));
        actions.moveToElement(mainMenu).perform();
        
        // Wait for dropdown to appear
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement menuItem = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("My Courses"))
        );
        menuItem.click();
    }
    
    // Real Example: BookMyShow - Handle sticky header overlap
    public void handleStickyHeaderOverlap() {
        WebElement targetElement = driver.findElement(By.id("theaterDetails"));
        
        // Scroll with offset to account for sticky header
        js = (JavascriptExecutor) driver;
        int headerHeight = driver.findElement(By.tagName("header")).getSize().getHeight();
        
        js.executeScript(
            "window.scrollTo(0, arguments[0].getBoundingClientRect().top + window.scrollY - arguments[1]);",
            targetElement, headerHeight + 20
        );
        
        try { Thread.sleep(500); } catch (InterruptedException e) {}
        targetElement.click();
    }
    
    // Utility: Robust click with multiple fallback strategies
    public void robustClick(By locator) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        
        try {
            // Strategy 1: Wait for clickable and click
            wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
        } catch (ElementNotInteractableException e1) {
            try {
                // Strategy 2: Scroll into view and click
                js = (JavascriptExecutor) driver;
                js.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
                Thread.sleep(500);
                element.click();
            } catch (Exception e2) {
                // Strategy 3: JavaScript click
                js = (JavascriptExecutor) driver;
                js.executeScript("arguments[0].click();", element);
            }
        }
    }
}`}
        />
      </div>

      {/* ElementClickInterceptedException */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">4. ElementClickInterceptedException</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Thrown when the click is intercepted by another element. The target element exists and is visible,
          but another element receives the click instead.
        </p>

        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 mb-4">
          <h5 className="font-semibold text-foreground mb-2">Common Causes:</h5>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Modal/popup overlay covering the element</li>
            <li>Cookie consent banner at bottom of page</li>
            <li>Sticky header/footer overlapping element</li>
            <li>Loading spinner/overlay visible</li>
            <li>Tooltip or dropdown menu covering element</li>
          </ul>
        </div>

        <CodeBlock
          title="ElementClickInterceptedExceptionDemo.java"
          language="java"
          code={`import org.openqa.selenium.ElementClickInterceptedException;

public class ElementClickInterceptedExceptionDemo {
    
    WebDriver driver;
    
    // ✅ GOOD: Wait for overlay to disappear
    public void waitForOverlayToDisappear() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        // Wait for loading spinner to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.cssSelector(".spinner-overlay")
        ));
        
        // Wait for modal backdrop to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.className("modal-backdrop")
        ));
        
        // Now safe to click
        driver.findElement(By.id("targetButton")).click();
    }
    
    // ✅ GOOD: Close intercepting element first
    public void closeInterceptingElement() {
        try {
            driver.findElement(By.id("submitBtn")).click();
        } catch (ElementClickInterceptedException e) {
            // Check for common intercepting elements
            closeIfPresent(By.id("cookieAccept"));
            closeIfPresent(By.className("popup-close"));
            closeIfPresent(By.cssSelector(".modal .close-btn"));
            
            // Retry click
            driver.findElement(By.id("submitBtn")).click();
        }
    }
    
    private void closeIfPresent(By locator) {
        try {
            WebElement closeBtn = driver.findElement(locator);
            if (closeBtn.isDisplayed()) {
                closeBtn.click();
                Thread.sleep(500);
            }
        } catch (Exception e) {
            // Element not present, continue
        }
    }
    
    // ✅ GOOD: Scroll to bring element into clear view
    public void scrollPastStickyHeader() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        WebElement element = driver.findElement(By.id("targetElement"));
        
        // Get header height
        int headerHeight = driver.findElement(By.tagName("header")).getSize().getHeight();
        int footerHeight = driver.findElement(By.tagName("footer")).getSize().getHeight();
        
        // Scroll with offset for header
        js.executeScript(
            "arguments[0].scrollIntoView(true); window.scrollBy(0, -" + (headerHeight + 20) + ");",
            element
        );
        
        try { Thread.sleep(300); } catch (InterruptedException ie) {}
        element.click();
    }
    
    // Real Example: Coursera - Handle cookie consent intercept
    public void handleCourseraClickIntercept() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        // Try to click search button
        try {
            driver.findElement(By.cssSelector("button[type='submit']")).click();
        } catch (ElementClickInterceptedException e) {
            // Cookie consent banner likely intercepting
            try {
                WebElement acceptCookies = driver.findElement(By.id("onetrust-accept-btn"));
                acceptCookies.click();
                wait.until(ExpectedConditions.invisibilityOf(acceptCookies));
            } catch (NoSuchElementException ex) {
                // No cookie banner
            }
            
            // Retry click
            wait.until(ExpectedConditions.elementToBeClickable(
                By.cssSelector("button[type='submit']")
            )).click();
        }
    }
    
    // Real Example: BookMyShow - Handle promotional popup
    public void handleBookMyShowPopup() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        // Close promotional popup if present
        List<By> popupCloseButtons = Arrays.asList(
            By.xpath("//span[contains(@class, 'close-popup')]"),
            By.cssSelector(".promo-modal .close"),
            By.xpath("//button[contains(text(), 'No Thanks')]")
        );
        
        for (By closeBtn : popupCloseButtons) {
            try {
                WebElement popup = wait.withTimeout(Duration.ofSeconds(3))
                    .until(ExpectedConditions.elementToBeClickable(closeBtn));
                popup.click();
                wait.until(ExpectedConditions.invisibilityOfElementLocated(closeBtn));
                break;
            } catch (TimeoutException e) {
                continue;
            }
        }
        
        // Now proceed with main action
        driver.findElement(By.id("selectSeats")).click();
    }
    
    // Utility: Smart click with interception handling
    public void smartClick(By locator) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        int maxAttempts = 3;
        for (int i = 0; i < maxAttempts; i++) {
            try {
                wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
                return;
            } catch (ElementClickInterceptedException e) {
                String interceptor = extractInterceptorInfo(e.getMessage());
                System.out.println("Click intercepted by: " + interceptor);
                
                // Try to close common overlays
                handleCommonOverlays();
                
                try { Thread.sleep(500); } catch (InterruptedException ie) {}
            }
        }
        
        // Final fallback: JavaScript click
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", driver.findElement(locator));
    }
    
    private String extractInterceptorInfo(String message) {
        // Parse exception message to identify intercepting element
        if (message.contains("Other element would receive the click")) {
            int start = message.indexOf("<");
            int end = message.indexOf(">", start) + 1;
            if (start >= 0 && end > start) {
                return message.substring(start, end);
            }
        }
        return "Unknown element";
    }
    
    private void handleCommonOverlays() {
        By[] overlays = {
            By.className("modal-backdrop"),
            By.id("onetrust-consent-sdk"),
            By.className("popup-overlay")
        };
        
        for (By overlay : overlays) {
            try {
                WebElement el = driver.findElement(overlay);
                if (el.isDisplayed()) {
                    JavascriptExecutor js = (JavascriptExecutor) driver;
                    js.executeScript("arguments[0].style.display='none';", el);
                }
            } catch (Exception e) {}
        }
    }
}`}
        />
      </div>

      {/* TimeoutException */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">5. TimeoutException</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Thrown when an explicit wait condition is not met within the specified timeout period.
        </p>

        <CodeBlock
          title="TimeoutExceptionDemo.java"
          language="java"
          code={`import org.openqa.selenium.TimeoutException;

public class TimeoutExceptionDemo {
    
    WebDriver driver;
    
    // ❌ BAD: No exception handling
    public void badExample() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        // If element doesn't appear in 5 seconds - test fails abruptly
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("slowElement")));
    }
    
    // ✅ GOOD: Handle timeout gracefully
    public boolean waitForElementWithTimeout(By locator, int seconds) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(seconds));
        
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
            return true;
        } catch (TimeoutException e) {
            System.out.println("Element not visible after " + seconds + " seconds: " + locator);
            // Take screenshot for debugging
            ScreenshotUtility.takeScreenshot(driver, "timeout_" + locator.toString());
            return false;
        }
    }
    
    // ✅ GOOD: Retry with increasing timeout
    public WebElement waitWithRetry(By locator) {
        int[] timeouts = {5, 10, 20};  // Increasing timeouts
        
        for (int timeout : timeouts) {
            try {
                WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
                return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
            } catch (TimeoutException e) {
                System.out.println("Timeout after " + timeout + "s, retrying with longer wait...");
            }
        }
        
        throw new RuntimeException("Element not found after all retry attempts: " + locator);
    }
    
    // ✅ GOOD: Custom timeout with meaningful message
    public void customTimeoutHandling() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        wait.withMessage("Waiting for payment confirmation page to load");
        
        try {
            wait.until(ExpectedConditions.urlContains("/payment/confirm"));
        } catch (TimeoutException e) {
            System.out.println("Payment page did not load: " + e.getMessage());
            // Log current URL for debugging
            System.out.println("Current URL: " + driver.getCurrentUrl());
            throw e;
        }
    }
    
    // Real Example: Coursera - Wait for video to load
    public void waitForVideoPlayer() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(60));
        
        try {
            // Wait for video player iframe
            wait.until(ExpectedConditions.presenceOfElementLocated(
                By.cssSelector("iframe[src*='player']")
            ));
            
            // Switch to iframe
            driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[src*='player']")));
            
            // Wait for play button
            wait.until(ExpectedConditions.elementToBeClickable(By.className("play-btn")));
            
            driver.switchTo().defaultContent();
        } catch (TimeoutException e) {
            System.out.println("Video player failed to load within 60 seconds");
            // Check if there's an error message
            try {
                String errorMsg = driver.findElement(By.className("video-error")).getText();
                System.out.println("Video Error: " + errorMsg);
            } catch (NoSuchElementException ex) {}
            throw e;
        }
    }
    
    // Real Example: Ticket Booking - Payment processing
    public void waitForPaymentProcessing() {
        // Payment processing can take time
        WebDriverWait longWait = new WebDriverWait(driver, Duration.ofSeconds(120));
        
        try {
            // Wait for either success or failure
            longWait.until(ExpectedConditions.or(
                ExpectedConditions.urlContains("/booking/confirmed"),
                ExpectedConditions.urlContains("/payment/failed"),
                ExpectedConditions.presenceOfElementLocated(By.className("payment-error"))
            ));
            
            // Check result
            if (driver.getCurrentUrl().contains("/booking/confirmed")) {
                System.out.println("Booking successful!");
            } else {
                System.out.println("Payment failed - check error message");
            }
        } catch (TimeoutException e) {
            System.out.println("Payment processing timed out after 120 seconds");
            throw new RuntimeException("Payment processing timeout");
        }
    }
}`}
        />
      </div>

      {/* NoSuchFrameException & NoSuchWindowException */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Monitor className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">6. NoSuchFrameException & NoSuchWindowException</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          <code className="code-inline">NoSuchFrameException</code> is thrown when trying to switch to a frame that doesn't exist.
          <code className="code-inline">NoSuchWindowException</code> is thrown when trying to switch to a window that has been closed or doesn't exist.
        </p>

        <CodeBlock
          title="FrameWindowExceptionDemo.java"
          language="java"
          code={`import org.openqa.selenium.NoSuchFrameException;
import org.openqa.selenium.NoSuchWindowException;

public class FrameWindowExceptionDemo {
    
    WebDriver driver;
    
    // ✅ Handle NoSuchFrameException
    public void handleFrameException() {
        try {
            driver.switchTo().frame("paymentFrame");
        } catch (NoSuchFrameException e) {
            System.out.println("Frame 'paymentFrame' not found");
            
            // Try alternative frame locators
            try {
                driver.switchTo().frame(0);  // First frame by index
            } catch (NoSuchFrameException e2) {
                // Find frame by XPath and switch
                WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
                WebElement frame = wait.until(
                    ExpectedConditions.presenceOfElementLocated(
                        By.xpath("//iframe[contains(@src, 'payment')]")
                    )
                );
                driver.switchTo().frame(frame);
            }
        }
    }
    
    // ✅ Safe frame switch with wait
    public void safeFrameSwitch(By frameLocator) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        try {
            // Wait for frame to be available and switch
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameLocator));
        } catch (TimeoutException e) {
            System.out.println("Frame not available: " + frameLocator);
            throw new RuntimeException("Failed to switch to frame", e);
        }
    }
    
    // ✅ Handle NoSuchWindowException
    public void handleWindowException() {
        String mainWindow = driver.getWindowHandle();
        String popupWindow = null;
        
        // Open popup
        driver.findElement(By.id("openPopup")).click();
        
        // Get popup window handle
        for (String handle : driver.getWindowHandles()) {
            if (!handle.equals(mainWindow)) {
                popupWindow = handle;
                break;
            }
        }
        
        // Switch and work in popup
        driver.switchTo().window(popupWindow);
        driver.findElement(By.id("submitForm")).click();
        
        // Popup might close automatically after submit
        try {
            driver.switchTo().window(popupWindow);
            driver.findElement(By.id("closeBtn")).click();  // May throw exception
        } catch (NoSuchWindowException e) {
            System.out.println("Popup already closed, switching to main window");
        }
        
        // Always switch back to main window
        driver.switchTo().window(mainWindow);
    }
    
    // ✅ Safe window switch with validation
    public boolean switchToWindowSafely(String windowHandle) {
        try {
            driver.switchTo().window(windowHandle);
            return true;
        } catch (NoSuchWindowException e) {
            System.out.println("Window no longer exists: " + windowHandle);
            return false;
        }
    }
    
    // Real Example: BookMyShow - Payment gateway in iframe
    public void handlePaymentIframe() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        
        // Multiple possible iframe identifiers
        By[] iframeLocators = {
            By.id("paymentFrame"),
            By.name("payment-iframe"),
            By.cssSelector("iframe[src*='razorpay']"),
            By.cssSelector("iframe[src*='paytm']"),
            By.xpath("//iframe[contains(@class, 'payment')]")
        };
        
        boolean switched = false;
        for (By locator : iframeLocators) {
            try {
                wait.withTimeout(Duration.ofSeconds(5))
                    .until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(locator));
                switched = true;
                System.out.println("Switched to iframe: " + locator);
                break;
            } catch (TimeoutException e) {
                continue;
            }
        }
        
        if (!switched) {
            throw new RuntimeException("Could not switch to payment iframe");
        }
        
        // Complete payment inside iframe
        driver.findElement(By.id("cardNumber")).sendKeys("4111111111111111");
        driver.findElement(By.id("payNow")).click();
        
        // Switch back to main content
        driver.switchTo().defaultContent();
    }
}`}
        />
      </div>

      {/* NoAlertPresentException */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">7. NoAlertPresentException</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Thrown when trying to switch to an alert when no alert is present on the page.
        </p>

        <CodeBlock
          title="NoAlertPresentExceptionDemo.java"
          language="java"
          code={`import org.openqa.selenium.NoAlertPresentException;

public class NoAlertPresentExceptionDemo {
    
    WebDriver driver;
    
    // ❌ BAD: Direct alert switch without check
    public void badExample() {
        // If no alert present - throws NoAlertPresentException
        Alert alert = driver.switchTo().alert();
        alert.accept();
    }
    
    // ✅ GOOD: Check for alert presence
    public boolean isAlertPresent() {
        try {
            driver.switchTo().alert();
            return true;
        } catch (NoAlertPresentException e) {
            return false;
        }
    }
    
    // ✅ GOOD: Handle alert safely
    public void handleAlertIfPresent() {
        try {
            Alert alert = driver.switchTo().alert();
            String alertText = alert.getText();
            System.out.println("Alert message: " + alertText);
            alert.accept();
        } catch (NoAlertPresentException e) {
            System.out.println("No alert present - continuing execution");
        }
    }
    
    // ✅ GOOD: Wait for alert with timeout
    public void waitForAlert() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("Alert text: " + alert.getText());
            alert.accept();
        } catch (TimeoutException e) {
            System.out.println("Alert did not appear within timeout");
        }
    }
    
    // ✅ GOOD: Dismiss unexpected alerts
    public void dismissUnexpectedAlert() {
        try {
            Alert alert = driver.switchTo().alert();
            System.out.println("Unexpected alert: " + alert.getText());
            alert.dismiss();
        } catch (NoAlertPresentException e) {
            // No unexpected alert - good!
        }
    }
    
    // Real Example: Form submission with confirmation alert
    public void submitFormWithConfirmation() {
        driver.findElement(By.id("submitBtn")).click();
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        
        try {
            Alert confirmAlert = wait.until(ExpectedConditions.alertIsPresent());
            String message = confirmAlert.getText();
            
            if (message.contains("Are you sure")) {
                confirmAlert.accept();  // Click OK
                System.out.println("Form submitted successfully");
            } else {
                confirmAlert.dismiss();  // Click Cancel
                System.out.println("Unexpected alert message, submission cancelled");
            }
        } catch (TimeoutException e) {
            // No confirmation alert - form might have been submitted directly
            System.out.println("No confirmation alert - checking if form was submitted");
        }
    }
}`}
        />
      </div>

      {/* InvalidSelectorException */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FileX className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">8. InvalidSelectorException</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Thrown when the selector syntax is invalid (malformed XPath or CSS selector).
        </p>

        <CodeBlock
          title="InvalidSelectorExceptionDemo.java"
          language="java"
          code={`import org.openqa.selenium.InvalidSelectorException;

public class InvalidSelectorExceptionDemo {
    
    WebDriver driver;
    
    // ❌ BAD: Invalid XPath syntax
    public void invalidXPath() {
        // Missing closing bracket - throws InvalidSelectorException
        driver.findElement(By.xpath("//div[@class='container'"));
    }
    
    // ❌ BAD: Invalid CSS selector
    public void invalidCss() {
        // Invalid pseudo-selector syntax
        driver.findElement(By.cssSelector("div:contains('text')"));  // :contains is not valid CSS
    }
    
    // ✅ GOOD: Valid XPath expressions
    public void validXPathExamples() {
        // Correct XPath syntax
        driver.findElement(By.xpath("//div[@class='container']"));
        driver.findElement(By.xpath("//input[@type='text' and @name='username']"));
        driver.findElement(By.xpath("//button[contains(text(), 'Submit')]"));
        driver.findElement(By.xpath("//ul/li[position()=1]"));
    }
    
    // ✅ GOOD: Valid CSS selectors
    public void validCssExamples() {
        // Correct CSS syntax
        driver.findElement(By.cssSelector("div.container"));
        driver.findElement(By.cssSelector("input[type='text'][name='username']"));
        driver.findElement(By.cssSelector("ul > li:first-child"));
        driver.findElement(By.cssSelector("button#submitBtn"));
    }
    
    // ✅ GOOD: Validate selector before use
    public WebElement findElementSafely(String locatorType, String locatorValue) {
        try {
            switch (locatorType.toLowerCase()) {
                case "xpath":
                    return driver.findElement(By.xpath(locatorValue));
                case "css":
                    return driver.findElement(By.cssSelector(locatorValue));
                case "id":
                    return driver.findElement(By.id(locatorValue));
                default:
                    throw new IllegalArgumentException("Unknown locator type: " + locatorType);
            }
        } catch (InvalidSelectorException e) {
            System.out.println("Invalid selector syntax: " + locatorValue);
            System.out.println("Error: " + e.getMessage());
            throw e;
        }
    }
    
    // Common selector mistakes to avoid
    public void commonMistakes() {
        // ❌ Wrong: Single quotes inside single quotes
        // driver.findElement(By.xpath("//div[@class='user's-name']"));
        
        // ✅ Correct: Escape or use double quotes
        driver.findElement(By.xpath("//div[@class=\"user's-name\"]"));
        
        // ❌ Wrong: Missing @ for attribute
        // driver.findElement(By.xpath("//div[class='container']"));
        
        // ✅ Correct: Include @ for attributes
        driver.findElement(By.xpath("//div[@class='container']"));
        
        // ❌ Wrong: Space issues in XPath
        // driver.findElement(By.xpath("//div[ @id = 'main' ]"));  // May cause issues
        
        // ✅ Correct: Clean XPath syntax
        driver.findElement(By.xpath("//div[@id='main']"));
    }
}`}
        />
      </div>

      {/* SessionNotCreatedException */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">9. SessionNotCreatedException</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Thrown when a new WebDriver session cannot be created. Usually related to driver/browser version mismatch 
          or browser not installed.
        </p>

        <CodeBlock
          title="SessionNotCreatedExceptionDemo.java"
          language="java"
          code={`import org.openqa.selenium.SessionNotCreatedException;

public class SessionNotCreatedExceptionDemo {
    
    // ✅ GOOD: Use WebDriverManager to handle driver versions
    public void setupWithWebDriverManager() {
        // Automatically downloads and sets up correct driver version
        WebDriverManager.chromedriver().setup();
        
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        
        try {
            WebDriver driver = new ChromeDriver(options);
        } catch (SessionNotCreatedException e) {
            System.out.println("Failed to create session: " + e.getMessage());
            
            // Check common causes
            if (e.getMessage().contains("version")) {
                System.out.println("Browser/Driver version mismatch");
                // Try forcing driver update
                WebDriverManager.chromedriver().clearDriverCache().setup();
            }
            throw e;
        }
    }
    
    // ✅ GOOD: Handle with retry and fallback browser
    public WebDriver createDriverWithFallback() {
        String[] browsers = {"chrome", "firefox", "edge"};
        
        for (String browser : browsers) {
            try {
                switch (browser) {
                    case "chrome":
                        WebDriverManager.chromedriver().setup();
                        return new ChromeDriver();
                    case "firefox":
                        WebDriverManager.firefoxdriver().setup();
                        return new FirefoxDriver();
                    case "edge":
                        WebDriverManager.edgedriver().setup();
                        return new EdgeDriver();
                }
            } catch (SessionNotCreatedException e) {
                System.out.println(browser + " session creation failed, trying next browser");
            }
        }
        
        throw new RuntimeException("Could not create WebDriver session with any browser");
    }
    
    // ✅ GOOD: Headless mode fallback for CI/CD
    public WebDriver createDriverForCI() {
        WebDriverManager.chromedriver().setup();
        
        ChromeOptions options = new ChromeOptions();
        
        try {
            // Try regular mode first
            return new ChromeDriver(options);
        } catch (SessionNotCreatedException e) {
            System.out.println("Regular mode failed, trying headless mode");
            
            // Add headless arguments for CI environment
            options.addArguments("--headless=new");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            options.addArguments("--disable-gpu");
            
            return new ChromeDriver(options);
        }
    }
    
    // Common causes and solutions
    /*
    1. Driver/Browser Version Mismatch:
       - Solution: Use WebDriverManager or update driver
       
    2. Browser Not Installed:
       - Solution: Install browser or use different browser
       
    3. Insufficient Permissions:
       - Solution: Run with admin privileges or fix permissions
       
    4. Port Already in Use:
       - Solution: Kill zombie browser processes
       
    5. Memory Issues:
       - Solution: Add --disable-dev-shm-usage for Docker
    */
}`}
        />
      </div>

      {/* Exception Handling Summary Table */}
      <div className="mt-8 p-6 bg-card rounded-xl border border-border">
        <h4 className="text-lg font-semibold text-foreground mb-4">Selenium Exceptions Quick Reference</h4>
        <div className="overflow-x-auto">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Exception</th>
                <th>When Thrown</th>
                <th>Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NoSuchElementException</td>
                <td>Element not found in DOM</td>
                <td>Use explicit waits, verify locator</td>
              </tr>
              <tr>
                <td>StaleElementReferenceException</td>
                <td>Element no longer attached to DOM</td>
                <td>Re-find element, use FluentWait</td>
              </tr>
              <tr>
                <td>ElementNotInteractableException</td>
                <td>Element not visible or interactable</td>
                <td>Wait for visibility, scroll into view</td>
              </tr>
              <tr>
                <td>ElementClickInterceptedException</td>
                <td>Another element receives click</td>
                <td>Close overlays, use JavaScript click</td>
              </tr>
              <tr>
                <td>TimeoutException</td>
                <td>Wait condition not met in time</td>
                <td>Increase timeout, verify condition</td>
              </tr>
              <tr>
                <td>NoSuchFrameException</td>
                <td>Frame doesn't exist</td>
                <td>Wait for frame, verify frame locator</td>
              </tr>
              <tr>
                <td>NoSuchWindowException</td>
                <td>Window closed or doesn't exist</td>
                <td>Verify window handle before switch</td>
              </tr>
              <tr>
                <td>NoAlertPresentException</td>
                <td>No alert on page</td>
                <td>Wait for alert, check if present</td>
              </tr>
              <tr>
                <td>InvalidSelectorException</td>
                <td>Malformed XPath/CSS</td>
                <td>Fix selector syntax</td>
              </tr>
              <tr>
                <td>SessionNotCreatedException</td>
                <td>Cannot start browser session</td>
                <td>Update driver, check browser install</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Handling Alerts */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">Handling JavaScript Alerts</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Selenium provides the <code className="code-inline">Alert</code> interface to handle JavaScript popups 
          including simple alerts, confirm dialogs, and prompt dialogs.
        </p>

        <CodeBlock
          title="AlertHandling.java"
          language="java"
          code={`public class AlertHandlingDemo {
    
    WebDriver driver;
    
    // Handle Simple Alert
    public void handleSimpleAlert() {
        // Switch to alert
        Alert alert = driver.switchTo().alert();
        
        // Get alert text
        String alertText = alert.getText();
        System.out.println("Alert Message: " + alertText);
        
        // Accept the alert (click OK)
        alert.accept();
    }
    
    // Handle Confirm Dialog
    public void handleConfirmDialog() {
        Alert confirm = driver.switchTo().alert();
        
        // Get text
        System.out.println("Confirm Message: " + confirm.getText());
        
        // Dismiss the alert (click Cancel)
        confirm.dismiss();
        
        // OR accept (click OK)
        // confirm.accept();
    }
    
    // Handle Prompt Dialog
    public void handlePromptDialog() {
        Alert prompt = driver.switchTo().alert();
        
        // Enter text in prompt
        prompt.sendKeys("John Doe");
        
        // Accept the prompt
        prompt.accept();
    }
    
    // Wait for Alert and Handle
    public void waitForAlertAndHandle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        // Wait for alert to be present
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());
        
        // Handle the alert
        alert.accept();
    }
    
    // BookMyShow Example - Payment Confirmation Alert
    public void handlePaymentConfirmation() {
        // Click proceed to payment
        driver.findElement(By.id("proceedPayment")).click();
        
        // Wait for confirmation alert
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        Alert confirmAlert = wait.until(ExpectedConditions.alertIsPresent());
        
        String message = confirmAlert.getText();
        if (message.contains("confirm your booking")) {
            confirmAlert.accept();
        } else {
            confirmAlert.dismiss();
        }
    }
}`}
        />
      </div>

      {/* Handling Frames */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">Handling Frames & iFrames</h3>
        </div>

        <CodeBlock
          title="FrameHandling.java"
          language="java"
          code={`public class FrameHandlingDemo {
    
    WebDriver driver;
    
    // Switch to Frame by Index
    public void switchByIndex() {
        driver.switchTo().frame(0); // First frame
        
        // Perform actions inside frame
        driver.findElement(By.id("frameElement")).click();
        
        // Switch back to main content
        driver.switchTo().defaultContent();
    }
    
    // Switch to Frame by Name or ID
    public void switchByNameOrId() {
        driver.switchTo().frame("frameName");
        // OR
        driver.switchTo().frame("frameId");
        
        // Perform actions
        driver.findElement(By.name("username")).sendKeys("testuser");
        
        // Switch back
        driver.switchTo().defaultContent();
    }
    
    // Switch to Frame by WebElement
    public void switchByWebElement() {
        WebElement frameElement = driver.findElement(
            By.xpath("//iframe[@class='video-frame']")
        );
        driver.switchTo().frame(frameElement);
        
        // Perform actions inside frame
        driver.findElement(By.id("playButton")).click();
        
        // Switch to parent frame (if nested)
        driver.switchTo().parentFrame();
        
        // Switch to main content
        driver.switchTo().defaultContent();
    }
    
    // Handle Nested Frames
    public void handleNestedFrames() {
        // Switch to outer frame
        driver.switchTo().frame("outerFrame");
        
        // Switch to inner frame
        driver.switchTo().frame("innerFrame");
        
        // Perform action in innermost frame
        driver.findElement(By.id("submit")).click();
        
        // Go back to outer frame
        driver.switchTo().parentFrame();
        
        // Go back to main content
        driver.switchTo().defaultContent();
    }
    
    // Coursera - Handle Video Player Frame
    public void handleCourseraVideoFrame() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        // Wait for video iframe to load
        WebElement videoFrame = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//iframe[contains(@src, 'player')]")
            )
        );
        
        // Switch to video frame
        driver.switchTo().frame(videoFrame);
        
        // Click play button inside frame
        WebElement playBtn = wait.until(
            ExpectedConditions.elementToBeClickable(By.className("play-button"))
        );
        playBtn.click();
        
        // Switch back to main content
        driver.switchTo().defaultContent();
    }
}`}
        />
      </div>

      {/* Handling Multiple Windows */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Monitor className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">Handling Multiple Windows & Tabs</h3>
        </div>

        <CodeBlock
          title="WindowHandling.java"
          language="java"
          code={`public class WindowHandlingDemo {
    
    WebDriver driver;
    
    // Switch Between Windows
    public void handleMultipleWindows() {
        // Store the main window handle
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
        driver.findElement(By.id("newWindowElement")).click();
        
        // Close new window
        driver.close();
        
        // Switch back to main window
        driver.switchTo().window(mainWindow);
    }
    
    // Handle Multiple Tabs
    public void handleMultipleTabs() {
        String mainTab = driver.getWindowHandle();
        
        // Open new tab using JavaScript
        ((JavascriptExecutor) driver).executeScript("window.open()");
        
        // Get all tabs
        ArrayList<String> tabs = new ArrayList<>(driver.getWindowHandles());
        
        // Switch to new tab
        driver.switchTo().window(tabs.get(1));
        driver.get("https://www.coursera.org");
        
        // Perform actions
        driver.findElement(By.id("searchInput")).sendKeys("Selenium");
        
        // Switch back to original tab
        driver.switchTo().window(mainTab);
    }
    
    // BookMyShow - Handle Payment Gateway Window
    public void handlePaymentGatewayWindow() {
        String bookingWindow = driver.getWindowHandle();
        
        // Click Pay Now - opens payment gateway
        driver.findElement(By.id("payNowBtn")).click();
        
        // Wait for new window
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.numberOfWindowsToBe(2));
        
        // Switch to payment window
        Set<String> windows = driver.getWindowHandles();
        for (String window : windows) {
            if (!window.equals(bookingWindow)) {
                driver.switchTo().window(window);
                break;
            }
        }
        
        // Complete payment in new window
        driver.findElement(By.id("cardNumber")).sendKeys("4111111111111111");
        driver.findElement(By.id("cvv")).sendKeys("123");
        driver.findElement(By.id("submitPayment")).click();
        
        // Wait for payment window to close
        wait.until(ExpectedConditions.numberOfWindowsToBe(1));
        
        // Switch back to booking window
        driver.switchTo().window(bookingWindow);
        
        // Verify booking confirmation
        WebElement confirmation = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("bookingConfirmed"))
        );
        Assert.assertTrue(confirmation.isDisplayed());
    }
}`}
        />
      </div>

      {/* Handling Dropdowns */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <List className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">Handling Dropdowns</h3>
        </div>

        <CodeBlock
          title="DropdownHandling.java"
          language="java"
          code={`public class DropdownHandlingDemo {
    
    WebDriver driver;
    
    // Using Select Class (for <select> elements)
    public void handleSelectDropdown() {
        WebElement dropdown = driver.findElement(By.id("countryDropdown"));
        Select select = new Select(dropdown);
        
        // Select by visible text
        select.selectByVisibleText("India");
        
        // Select by value attribute
        select.selectByValue("IN");
        
        // Select by index (0-based)
        select.selectByIndex(5);
        
        // Get selected option
        WebElement selectedOption = select.getFirstSelectedOption();
        System.out.println("Selected: " + selectedOption.getText());
        
        // Get all options
        List<WebElement> allOptions = select.getOptions();
        for (WebElement option : allOptions) {
            System.out.println(option.getText());
        }
        
        // Check if multi-select
        boolean isMultiple = select.isMultiple();
    }
    
    // Handle Multi-Select Dropdown
    public void handleMultiSelectDropdown() {
        WebElement multiSelect = driver.findElement(By.id("skills"));
        Select select = new Select(multiSelect);
        
        if (select.isMultiple()) {
            select.selectByVisibleText("Java");
            select.selectByVisibleText("Selenium");
            select.selectByVisibleText("TestNG");
            
            // Deselect options
            select.deselectByVisibleText("Java");
            
            // Deselect all
            select.deselectAll();
        }
    }
    
    // Handle Custom Dropdown (non-select)
    public void handleCustomDropdown() {
        // Click to open dropdown
        driver.findElement(By.xpath("//div[@class='custom-dropdown']")).click();
        
        // Wait for options to appear
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//ul[@class='dropdown-options']")
        ));
        
        // Select option
        driver.findElement(
            By.xpath("//li[contains(text(), 'Mumbai')]")
        ).click();
    }
    
    // BookMyShow - City Selection Dropdown
    public void selectCity() {
        // Click city dropdown trigger
        WebElement cityDropdown = driver.findElement(
            By.xpath("//div[contains(@class, 'city-selector')]")
        );
        cityDropdown.click();
        
        // Wait for city list
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//div[contains(@class, 'city-list')]")
        ));
        
        // Search and select city
        driver.findElement(By.xpath("//input[@placeholder='Search city']"))
              .sendKeys("Bangalore");
        
        wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//li[contains(text(), 'Bengaluru')]")
        )).click();
    }
    
    // Ticket Booking - Date Picker Dropdown
    public void selectTravelDate() {
        // Open date picker
        driver.findElement(By.id("travelDate")).click();
        
        // Navigate to next month
        driver.findElement(By.className("next-month")).click();
        
        // Select specific date
        driver.findElement(
            By.xpath("//td[@data-date='2024-02-15']")
        ).click();
    }
}`}
        />
      </div>

      {/* File Upload */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Upload className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">File Upload</h3>
        </div>

        <CodeBlock
          title="FileUpload.java"
          language="java"
          code={`public class FileUploadDemo {
    
    WebDriver driver;
    
    // Standard File Upload (input type="file")
    public void uploadFile() {
        WebElement fileInput = driver.findElement(By.id("fileUpload"));
        
        // Send the file path directly
        String filePath = System.getProperty("user.dir") + "/testdata/document.pdf";
        fileInput.sendKeys(filePath);
        
        // Click upload button
        driver.findElement(By.id("uploadBtn")).click();
        
        // Verify upload success
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement successMsg = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("upload-success"))
        );
        Assert.assertTrue(successMsg.getText().contains("uploaded successfully"));
    }
    
    // Upload Multiple Files
    public void uploadMultipleFiles() {
        WebElement fileInput = driver.findElement(
            By.xpath("//input[@type='file' and @multiple]")
        );
        
        String basePath = System.getProperty("user.dir") + "/testdata/";
        String files = basePath + "file1.pdf\\n" + 
                       basePath + "file2.pdf\\n" + 
                       basePath + "file3.pdf";
        
        fileInput.sendKeys(files);
    }
    
    // Coursera - Upload Assignment
    public void uploadAssignment() {
        // Navigate to assignment submission
        driver.findElement(By.xpath("//a[contains(text(), 'Submit Assignment')]")).click();
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        // Wait for file input
        WebElement fileInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.id("assignment-file"))
        );
        
        // Upload file
        String assignmentPath = System.getProperty("user.dir") + 
                               "/testdata/assignment.pdf";
        fileInput.sendKeys(assignmentPath);
        
        // Wait for file to be processed
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//span[contains(text(), 'assignment.pdf')]")
        ));
        
        // Submit
        driver.findElement(By.id("submitAssignment")).click();
    }
}`}
        />
      </div>

      {/* Screenshot on Failure */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">Screenshot on Failure</h3>
        </div>

        <CodeBlock
          title="ScreenshotUtility.java"
          language="java"
          code={`public class ScreenshotUtility {
    
    // Take Screenshot Method
    public static String takeScreenshot(WebDriver driver, String screenshotName) {
        // Generate timestamp
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss")
                              .format(new Date());
        String fileName = screenshotName + "_" + timestamp + ".png";
        
        // Create screenshots directory
        String screenshotDir = System.getProperty("user.dir") + "/screenshots/";
        File directory = new File(screenshotDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        
        // Take screenshot
        TakesScreenshot ts = (TakesScreenshot) driver;
        File source = ts.getScreenshotAs(OutputType.FILE);
        
        // Save to destination
        String destination = screenshotDir + fileName;
        try {
            FileUtils.copyFile(source, new File(destination));
            System.out.println("Screenshot saved: " + destination);
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return destination;
    }
    
    // Take Element Screenshot
    public static void takeElementScreenshot(WebElement element, String name) {
        File source = element.getScreenshotAs(OutputType.FILE);
        String destination = System.getProperty("user.dir") + 
                            "/screenshots/" + name + ".png";
        try {
            FileUtils.copyFile(source, new File(destination));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // Get Screenshot as Base64 (for reports)
    public static String getScreenshotAsBase64(WebDriver driver) {
        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BASE64);
    }
}

// TestNG Listener for Auto Screenshots on Failure
public class TestListener implements ITestListener {
    
    @Override
    public void onTestFailure(ITestResult result) {
        // Get WebDriver from test class
        Object testClass = result.getInstance();
        WebDriver driver = ((BaseTest) testClass).getDriver();
        
        // Take screenshot
        String screenshotPath = ScreenshotUtility.takeScreenshot(
            driver, 
            result.getName()
        );
        
        // Attach to Extent Report
        ExtentTest test = ExtentReportManager.getTest();
        test.fail("Test Failed - Screenshot attached");
        test.addScreenCaptureFromPath(screenshotPath);
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        ExtentReportManager.getTest().pass("Test Passed");
    }
    
    @Override
    public void onTestSkipped(ITestResult result) {
        ExtentReportManager.getTest().skip("Test Skipped: " + 
            result.getThrowable().getMessage());
    }
}`}
        />
      </div>

      {/* JavaScriptExecutor */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Code className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">JavaScriptExecutor</h3>
        </div>

        <CodeBlock
          title="JavaScriptExecutorDemo.java"
          language="java"
          code={`public class JavaScriptExecutorDemo {
    
    WebDriver driver;
    JavascriptExecutor js;
    
    public void setup() {
        js = (JavascriptExecutor) driver;
    }
    
    // Click using JavaScript (when regular click fails)
    public void jsClick(WebElement element) {
        js.executeScript("arguments[0].click();", element);
    }
    
    // Scroll Operations
    public void scrollOperations() {
        // Scroll to bottom of page
        js.executeScript("window.scrollTo(0, document.body.scrollHeight)");
        
        // Scroll to top
        js.executeScript("window.scrollTo(0, 0)");
        
        // Scroll by pixels
        js.executeScript("window.scrollBy(0, 500)");
        
        // Scroll element into view
        WebElement element = driver.findElement(By.id("footer"));
        js.executeScript("arguments[0].scrollIntoView(true);", element);
        
        // Smooth scroll into view
        js.executeScript(
            "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", 
            element
        );
    }
    
    // Highlight Element (for debugging)
    public void highlightElement(WebElement element) {
        String originalStyle = element.getAttribute("style");
        js.executeScript(
            "arguments[0].setAttribute('style', 'border: 3px solid red; background: yellow;');", 
            element
        );
        Thread.sleep(500);
        js.executeScript(
            "arguments[0].setAttribute('style', '" + originalStyle + "');", 
            element
        );
    }
    
    // Get Page Properties
    public void getPageProperties() {
        // Get page title
        String title = (String) js.executeScript("return document.title;");
        
        // Get page URL
        String url = (String) js.executeScript("return document.URL;");
        
        // Get domain
        String domain = (String) js.executeScript("return document.domain;");
        
        // Get page ready state
        String readyState = (String) js.executeScript("return document.readyState;");
    }
    
    // Modify Element Properties
    public void modifyElements() {
        // Set value in input
        WebElement input = driver.findElement(By.id("searchBox"));
        js.executeScript("arguments[0].value = 'Selenium Testing';", input);
        
        // Remove readonly attribute
        js.executeScript("arguments[0].removeAttribute('readonly');", input);
        
        // Change text content
        WebElement heading = driver.findElement(By.tagName("h1"));
        js.executeScript("arguments[0].innerText = 'Modified Heading';", heading);
    }
    
    // Wait for Page Load
    public void waitForPageLoad() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        wait.until(webDriver -> 
            js.executeScript("return document.readyState").equals("complete")
        );
    }
    
    // BookMyShow - Scroll to Theatre Section
    public void scrollToTheatres() {
        WebElement theatreSection = driver.findElement(
            By.xpath("//section[@class='theatre-list']")
        );
        js.executeScript(
            "arguments[0].scrollIntoView({behavior: 'smooth', block: 'start'});", 
            theatreSection
        );
    }
}`}
        />
      </div>

      {/* Actions Class */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <MousePointer className="w-6 h-6 text-section-exceptions" />
          <h3 className="text-2xl font-semibold text-foreground">Actions Class (Mouse & Keyboard)</h3>
        </div>

        <CodeBlock
          title="ActionsDemo.java"
          language="java"
          code={`public class ActionsDemo {
    
    WebDriver driver;
    Actions actions;
    
    public void setup() {
        actions = new Actions(driver);
    }
    
    // Mouse Hover
    public void mouseHover() {
        WebElement menu = driver.findElement(By.id("mainMenu"));
        actions.moveToElement(menu).perform();
        
        // Wait for submenu
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement subMenu = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("subMenu"))
        );
        subMenu.click();
    }
    
    // Double Click
    public void doubleClick() {
        WebElement element = driver.findElement(By.id("doubleClickBtn"));
        actions.doubleClick(element).perform();
    }
    
    // Right Click (Context Click)
    public void rightClick() {
        WebElement element = driver.findElement(By.id("rightClickArea"));
        actions.contextClick(element).perform();
        
        // Select option from context menu
        driver.findElement(By.id("copyOption")).click();
    }
    
    // Drag and Drop
    public void dragAndDrop() {
        WebElement source = driver.findElement(By.id("draggable"));
        WebElement target = driver.findElement(By.id("droppable"));
        
        actions.dragAndDrop(source, target).perform();
        
        // OR using clickAndHold
        actions.clickAndHold(source)
               .moveToElement(target)
               .release()
               .perform();
    }
    
    // Drag and Drop by Offset
    public void dragByOffset() {
        WebElement slider = driver.findElement(By.id("priceSlider"));
        actions.clickAndHold(slider)
               .moveByOffset(100, 0)  // Move 100 pixels right
               .release()
               .perform();
    }
    
    // Keyboard Actions
    public void keyboardActions() {
        WebElement input = driver.findElement(By.id("textInput"));
        
        // Type with modifier keys
        actions.click(input)
               .keyDown(Keys.SHIFT)
               .sendKeys("hello")  // Types "HELLO"
               .keyUp(Keys.SHIFT)
               .perform();
        
        // Select all and copy
        actions.keyDown(Keys.CONTROL)
               .sendKeys("a")
               .sendKeys("c")
               .keyUp(Keys.CONTROL)
               .perform();
        
        // Paste
        WebElement target = driver.findElement(By.id("pasteArea"));
        actions.click(target)
               .keyDown(Keys.CONTROL)
               .sendKeys("v")
               .keyUp(Keys.CONTROL)
               .perform();
    }
    
    // Chain Multiple Actions
    public void chainedActions() {
        WebElement menu = driver.findElement(By.id("mainMenu"));
        WebElement subItem = driver.findElement(By.id("subMenuItem"));
        WebElement checkbox = driver.findElement(By.id("selectAll"));
        
        actions.moveToElement(menu)
               .pause(Duration.ofMillis(500))
               .moveToElement(subItem)
               .click()
               .moveToElement(checkbox)
               .click()
               .build()
               .perform();
    }
    
    // BookMyShow - Seat Selection with Hover
    public void selectSeatWithHover() {
        // Hover over seat to see price
        WebElement seat = driver.findElement(
            By.xpath("//div[@class='seat available'][@data-seat='A1']")
        );
        
        actions.moveToElement(seat).perform();
        
        // Wait for tooltip
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
        WebElement tooltip = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("seat-tooltip"))
        );
        
        String price = tooltip.getText();
        System.out.println("Seat Price: " + price);
        
        // Click to select
        actions.click(seat).perform();
    }
    
    // Coursera - Slider for Course Filters
    public void adjustPriceFilter() {
        WebElement minSlider = driver.findElement(By.id("minPriceSlider"));
        WebElement maxSlider = driver.findElement(By.id("maxPriceSlider"));
        
        // Drag min slider right
        actions.clickAndHold(minSlider)
               .moveByOffset(50, 0)
               .release()
               .perform();
        
        // Drag max slider left
        actions.clickAndHold(maxSlider)
               .moveByOffset(-30, 0)
               .release()
               .perform();
    }
}`}
        />
      </div>

      {/* Summary Table */}
      <div className="mt-8 p-6 bg-card rounded-xl border border-border">
        <h4 className="text-lg font-semibold text-foreground mb-4">Quick Reference: Exception Handling Methods</h4>
        <div className="overflow-x-auto">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Interface/Class</th>
                <th>Key Methods</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alerts</td>
                <td>Alert</td>
                <td>accept(), dismiss(), getText(), sendKeys()</td>
              </tr>
              <tr>
                <td>Frames</td>
                <td>TargetLocator</td>
                <td>frame(), parentFrame(), defaultContent()</td>
              </tr>
              <tr>
                <td>Windows</td>
                <td>TargetLocator</td>
                <td>window(), getWindowHandle(), getWindowHandles()</td>
              </tr>
              <tr>
                <td>Dropdowns</td>
                <td>Select</td>
                <td>selectByVisibleText(), selectByValue(), selectByIndex()</td>
              </tr>
              <tr>
                <td>File Upload</td>
                <td>WebElement</td>
                <td>sendKeys(filePath)</td>
              </tr>
              <tr>
                <td>Screenshots</td>
                <td>TakesScreenshot</td>
                <td>getScreenshotAs()</td>
              </tr>
              <tr>
                <td>JavaScript</td>
                <td>JavascriptExecutor</td>
                <td>executeScript(), executeAsyncScript()</td>
              </tr>
              <tr>
                <td>Mouse/Keyboard</td>
                <td>Actions</td>
                <td>moveToElement(), click(), doubleClick(), dragAndDrop()</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
