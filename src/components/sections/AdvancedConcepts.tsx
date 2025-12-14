import React from 'react';
import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { Zap, Globe, Lock, Database, Monitor } from 'lucide-react';
import { sections } from '@/data/sections';

export const AdvancedConcepts: React.FC = () => {
  const section = sections.find(s => s.id === 'advanced-concepts')!;
  
  return (
    <section id="advanced-concepts" className="scroll-mt-8">
      <SectionHeader section={section} number={11} />

      <div className="space-y-12 mt-8">
        {/* Shadow DOM Introduction */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <Lock className="w-6 h-6 text-primary" />
            Understanding Shadow DOM
          </h3>
          
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Shadow DOM is a web standard that provides encapsulation for JavaScript, CSS, and templating. 
              Elements inside Shadow DOM are isolated from the main document, making them invisible to 
              standard Selenium locators. This is commonly used by modern web components and frameworks.
            </p>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Shadow DOM Structure</h4>
              <CodeBlock
                code={`<!-- Regular DOM -->
<div id="host-element">
  #shadow-root (open)
    <!-- Shadow DOM - Encapsulated Content -->
    <div class="shadow-content">
      <input type="text" id="shadow-input" />
      <button class="shadow-btn">Submit</button>
    </div>
</div>

<!-- Example: Custom Web Components -->
<custom-dropdown>
  #shadow-root (open)
    <div class="dropdown-wrapper">
      <input class="search-input" placeholder="Search..." />
      <ul class="options-list">
        <li>Option 1</li>
        <li>Option 2</li>
      </ul>
    </div>
</custom-dropdown>`}
                language="html"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h5 className="font-semibold text-primary mb-2">Open Shadow DOM</h5>
                <p className="text-sm text-muted-foreground">
                  Can be accessed via JavaScript using <code className="text-primary">element.shadowRoot</code>. 
                  Selenium can interact with these elements.
                </p>
              </div>
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <h5 className="font-semibold text-destructive mb-2">Closed Shadow DOM</h5>
                <p className="text-sm text-muted-foreground">
                  Cannot be accessed externally. <code className="text-destructive">shadowRoot</code> returns null. 
                  Very difficult to automate.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Accessing Shadow DOM */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">Accessing Shadow DOM Elements</h3>
          
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">Method 1: Using JavaScriptExecutor (Selenium 3 & 4)</h4>
              <CodeBlock
                code={`// ShadowDOMHandler.java - Utility class for Shadow DOM
public class ShadowDOMHandler {
    private WebDriver driver;
    private JavascriptExecutor js;
    
    public ShadowDOMHandler(WebDriver driver) {
        this.driver = driver;
        this.js = (JavascriptExecutor) driver;
    }
    
    /**
     * Get Shadow Root of an element using JavaScript
     * Works with Selenium 3 and 4
     */
    public WebElement getShadowRoot(WebElement hostElement) {
        return (WebElement) js.executeScript(
            "return arguments[0].shadowRoot", hostElement
        );
    }
    
    /**
     * Find element inside Shadow DOM
     */
    public WebElement findElementInShadow(WebElement shadowRoot, String cssSelector) {
        return (WebElement) js.executeScript(
            "return arguments[0].querySelector(arguments[1])", 
            shadowRoot, cssSelector
        );
    }
    
    /**
     * Find multiple elements inside Shadow DOM
     */
    @SuppressWarnings("unchecked")
    public List<WebElement> findElementsInShadow(WebElement shadowRoot, String cssSelector) {
        return (List<WebElement>) js.executeScript(
            "return arguments[0].querySelectorAll(arguments[1])", 
            shadowRoot, cssSelector
        );
    }
    
    /**
     * Complete example: Access nested Shadow DOM
     * Useful for complex web components
     */
    public WebElement getNestedShadowElement(String... selectors) {
        WebElement current = null;
        
        for (int i = 0; i < selectors.length; i++) {
            if (i == 0) {
                // First selector - find in regular DOM
                current = driver.findElement(By.cssSelector(selectors[i]));
            } else if (i == selectors.length - 1) {
                // Last selector - find element (not shadow root)
                current = findElementInShadow(getShadowRoot(current), selectors[i]);
            } else {
                // Middle selectors - get shadow root and find next host
                WebElement shadowRoot = getShadowRoot(current);
                current = findElementInShadow(shadowRoot, selectors[i]);
            }
        }
        return current;
    }
}`}
                title="ShadowDOMHandler.java"
                showLineNumbers
              />
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">Method 2: Selenium 4 Native Shadow DOM Support</h4>
              <p className="text-muted-foreground mb-4">
                Selenium 4 introduced native support for Shadow DOM with the <code className="text-primary">getShadowRoot()</code> method.
              </p>
              <CodeBlock
                code={`// Selenium 4 - Native Shadow DOM Support
public class Selenium4ShadowDOM {
    
    @Test
    public void testShadowDOMSelenium4() {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/shadow-dom-page");
        
        // Find the shadow host element
        WebElement shadowHost = driver.findElement(By.cssSelector("custom-element"));
        
        // Get the shadow root using Selenium 4 native method
        SearchContext shadowRoot = shadowHost.getShadowRoot();
        
        // Find elements within shadow DOM
        WebElement shadowInput = shadowRoot.findElement(By.cssSelector("input.shadow-input"));
        WebElement shadowButton = shadowRoot.findElement(By.cssSelector("button.shadow-btn"));
        
        // Interact with shadow DOM elements
        shadowInput.sendKeys("Test input in Shadow DOM");
        shadowButton.click();
        
        // Find multiple elements
        List<WebElement> listItems = shadowRoot.findElements(By.cssSelector("li"));
        for (WebElement item : listItems) {
            System.out.println("Item: " + item.getText());
        }
        
        driver.quit();
    }
    
    /**
     * Handling Nested Shadow DOM in Selenium 4
     */
    @Test
    public void testNestedShadowDOM() {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/nested-shadow");
        
        // Level 1: Get first shadow root
        WebElement outerHost = driver.findElement(By.cssSelector("outer-component"));
        SearchContext outerShadow = outerHost.getShadowRoot();
        
        // Level 2: Find inner shadow host and get its shadow root
        WebElement innerHost = outerShadow.findElement(By.cssSelector("inner-component"));
        SearchContext innerShadow = innerHost.getShadowRoot();
        
        // Level 3: Access deeply nested element
        WebElement deepElement = innerShadow.findElement(By.cssSelector(".deep-content"));
        System.out.println("Deep element text: " + deepElement.getText());
        
        driver.quit();
    }
}`}
                title="Selenium4ShadowDOM.java"
                showLineNumbers
              />
            </div>
          </div>
        </div>

        {/* Real-World Shadow DOM Examples */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">Real-World Shadow DOM Examples</h3>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-4">Example: Chrome Settings Page Automation</h4>
            <p className="text-muted-foreground mb-4">
              Chrome's settings page uses extensive Shadow DOM. Here's how to automate it:
            </p>
            <CodeBlock
              code={`// ChromeSettingsAutomation.java
public class ChromeSettingsAutomation {
    private WebDriver driver;
    
    @Test
    public void automationChromeSettings() {
        driver = new ChromeDriver();
        driver.get("chrome://settings/");
        
        // Navigate through nested shadow DOMs to reach search box
        // Path: settings-ui -> settings-main -> settings-basic-page -> settings-section
        
        // Using Selenium 4 approach
        WebElement settingsUI = driver.findElement(By.cssSelector("settings-ui"));
        SearchContext shadowUI = settingsUI.getShadowRoot();
        
        WebElement settingsMain = shadowUI.findElement(By.cssSelector("settings-main"));
        SearchContext shadowMain = settingsMain.getShadowRoot();
        
        WebElement settingsBasicPage = shadowMain.findElement(By.cssSelector("settings-basic-page"));
        SearchContext shadowBasic = settingsBasicPage.getShadowRoot();
        
        // Now find the search input
        WebElement searchInput = shadowBasic.findElement(By.cssSelector("#searchInput"));
        searchInput.sendKeys("privacy");
        
        driver.quit();
    }
    
    /**
     * Generic method for deep shadow DOM traversal
     */
    public WebElement traverseShadowDOM(String... cssSelectors) {
        SearchContext context = driver;
        
        for (int i = 0; i < cssSelectors.length; i++) {
            WebElement element = context.findElement(By.cssSelector(cssSelectors[i]));
            
            // If not the last selector, get shadow root
            if (i < cssSelectors.length - 1) {
                context = element.getShadowRoot();
            } else {
                return element;
            }
        }
        return null;
    }
}`}
              title="ChromeSettingsAutomation.java"
              showLineNumbers
            />
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-4">Example: Modern Web Components (Coursera Custom Elements)</h4>
            <CodeBlock
              code={`// CourseraShadowDOMPage.java
public class CourseraShadowDOMPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    public CourseraShadowDOMPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    /**
     * Handle custom video player with Shadow DOM
     */
    public void interactWithVideoPlayer() {
        // Wait for video player to load
        WebElement videoPlayer = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.cssSelector("cds-video-player")
            )
        );
        
        // Access shadow root
        SearchContext shadowRoot = videoPlayer.getShadowRoot();
        
        // Find play button inside shadow DOM
        WebElement playButton = shadowRoot.findElement(
            By.cssSelector("button[aria-label='Play']")
        );
        playButton.click();
        
        // Find progress bar
        WebElement progressBar = shadowRoot.findElement(
            By.cssSelector(".video-progress-bar")
        );
        System.out.println("Video progress: " + progressBar.getAttribute("value") + "%");
        
        // Find volume control
        WebElement volumeSlider = shadowRoot.findElement(
            By.cssSelector("input[type='range'].volume-slider")
        );
        
        // Set volume using JavaScript (slider interaction)
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].value = 50; arguments[0].dispatchEvent(new Event('input'));", 
            volumeSlider);
    }
    
    /**
     * Handle custom dropdown with Shadow DOM
     */
    public void selectFromCustomDropdown(String optionText) {
        WebElement dropdown = driver.findElement(By.cssSelector("cds-dropdown"));
        SearchContext shadowRoot = dropdown.getShadowRoot();
        
        // Click to open dropdown
        WebElement trigger = shadowRoot.findElement(By.cssSelector(".dropdown-trigger"));
        trigger.click();
        
        // Wait for options to be visible
        wait.until(driver -> {
            List<WebElement> options = shadowRoot.findElements(By.cssSelector(".dropdown-option"));
            return options.size() > 0;
        });
        
        // Find and click the desired option
        List<WebElement> options = shadowRoot.findElements(By.cssSelector(".dropdown-option"));
        for (WebElement option : options) {
            if (option.getText().contains(optionText)) {
                option.click();
                break;
            }
        }
    }
}`}
              title="CourseraShadowDOMPage.java"
              showLineNumbers
            />
          </div>
        </div>

        {/* Headless Browser Execution */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <Monitor className="w-6 h-6 text-primary" />
            Headless Browser Execution
          </h3>
          
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Headless mode runs the browser without a visible UI, making tests faster and suitable for 
              CI/CD pipelines. All major browsers support headless execution.
            </p>
            
            <CodeBlock
              code={`// HeadlessExecution.java
public class HeadlessExecution {
    
    /**
     * Chrome Headless Mode
     */
    public WebDriver getChromeHeadless() {
        ChromeOptions options = new ChromeOptions();
        
        // Enable headless mode
        options.addArguments("--headless=new");  // New headless mode (Chrome 109+)
        // options.addArguments("--headless");   // Legacy headless mode
        
        // Recommended headless arguments
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-extensions");
        options.addArguments("--disable-notifications");
        
        // Prevent detection as headless browser
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.setExperimentalOption("excludeSwitches", 
            Collections.singletonList("enable-automation"));
        
        return new ChromeDriver(options);
    }
    
    /**
     * Firefox Headless Mode
     */
    public WebDriver getFirefoxHeadless() {
        FirefoxOptions options = new FirefoxOptions();
        
        // Enable headless mode
        options.addArguments("-headless");
        options.addArguments("--width=1920");
        options.addArguments("--height=1080");
        
        // Additional preferences
        options.addPreference("dom.webnotifications.enabled", false);
        options.addPreference("geo.enabled", false);
        
        return new FirefoxDriver(options);
    }
    
    /**
     * Edge Headless Mode
     */
    public WebDriver getEdgeHeadless() {
        EdgeOptions options = new EdgeOptions();
        
        options.addArguments("--headless=new");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--no-sandbox");
        
        return new EdgeDriver(options);
    }
    
    /**
     * Headless with Screenshot Capability
     */
    @Test
    public void headlessWithScreenshot() throws IOException {
        WebDriver driver = getChromeHeadless();
        
        try {
            driver.get("https://www.coursera.org");
            
            // Take screenshot in headless mode
            File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            FileUtils.copyFile(screenshot, new File("headless_screenshot.png"));
            
            // Verify page loaded correctly
            Assert.assertTrue(driver.getTitle().contains("Coursera"));
            
        } finally {
            driver.quit();
        }
    }
}`}
              title="HeadlessExecution.java"
              showLineNumbers
            />

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
              <h5 className="font-semibold text-yellow-400 mb-2">⚠️ Headless Mode Considerations</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Some websites detect and block headless browsers</li>
                <li>• Visual rendering might differ slightly from headed mode</li>
                <li>• File downloads require additional configuration</li>
                <li>• Debug with headed mode first, then switch to headless</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Browser DevTools Protocol */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <Zap className="w-6 h-6 text-primary" />
            Chrome DevTools Protocol (CDP)
          </h3>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground mb-4">
              Selenium 4 provides direct access to Chrome DevTools Protocol for advanced browser control, 
              network interception, and performance monitoring.
            </p>
            
            <CodeBlock
              code={`// CDPAdvancedFeatures.java
public class CDPAdvancedFeatures {
    private ChromeDriver driver;
    private DevTools devTools;
    
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        devTools = driver.getDevTools();
        devTools.createSession();
    }
    
    /**
     * Network Interception - Block specific requests
     */
    @Test
    public void blockNetworkRequests() {
        // Enable network tracking
        devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));
        
        // Block image and CSS requests for faster loading
        devTools.send(Network.setBlockedURLs(
            Arrays.asList("*.png", "*.jpg", "*.gif", "*.css")
        ));
        
        driver.get("https://www.bookmyshow.com");
        // Page loads without images and CSS
    }
    
    /**
     * Capture Network Traffic
     */
    @Test
    public void captureNetworkTraffic() {
        devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));
        
        // Listen to network requests
        devTools.addListener(Network.requestWillBeSent(), request -> {
            System.out.println("Request URL: " + request.getRequest().getUrl());
            System.out.println("Request Method: " + request.getRequest().getMethod());
        });
        
        // Listen to network responses
        devTools.addListener(Network.responseReceived(), response -> {
            System.out.println("Response URL: " + response.getResponse().getUrl());
            System.out.println("Status Code: " + response.getResponse().getStatus());
        });
        
        driver.get("https://www.coursera.org");
    }
    
    /**
     * Geolocation Mocking
     */
    @Test
    public void mockGeolocation() {
        // Set custom geolocation (Mumbai, India)
        devTools.send(Emulation.setGeolocationOverride(
            Optional.of(19.0760),   // Latitude
            Optional.of(72.8777),   // Longitude
            Optional.of(100.0)      // Accuracy
        ));
        
        driver.get("https://www.bookmyshow.com");
        // Website will detect location as Mumbai
    }
    
    /**
     * Device Emulation
     */
    @Test
    public void emulateDevice() {
        // Emulate iPhone 12 Pro
        Map<String, Object> deviceMetrics = new HashMap<>();
        deviceMetrics.put("width", 390);
        deviceMetrics.put("height", 844);
        deviceMetrics.put("deviceScaleFactor", 3);
        deviceMetrics.put("mobile", true);
        
        driver.executeCdpCommand("Emulation.setDeviceMetricsOverride", deviceMetrics);
        
        // Set user agent
        driver.executeCdpCommand("Emulation.setUserAgentOverride", 
            Map.of("userAgent", 
                "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15"));
        
        driver.get("https://www.coursera.org");
    }
    
    /**
     * Console Log Capture
     */
    @Test
    public void captureConsoleLogs() {
        devTools.send(Runtime.enable());
        
        devTools.addListener(Runtime.consoleAPICalled(), event -> {
            System.out.println("Console " + event.getType() + ": ");
            event.getArgs().forEach(arg -> {
                System.out.println("  " + arg.getValue().orElse(""));
            });
        });
        
        driver.get("https://www.example.com");
    }
    
    /**
     * Performance Metrics Collection
     */
    @Test
    public void collectPerformanceMetrics() {
        devTools.send(Performance.enable(Optional.empty()));
        
        driver.get("https://www.coursera.org");
        
        List<Metric> metrics = devTools.send(Performance.getMetrics());
        
        for (Metric metric : metrics) {
            System.out.println(metric.getName() + ": " + metric.getValue());
        }
        
        // Key metrics to look for:
        // - Timestamp
        // - Documents
        // - JSEventListeners
        // - LayoutCount
        // - RecalcStyleCount
        // - JSHeapUsedSize
    }
    
    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`}
              title="CDPAdvancedFeatures.java"
              showLineNumbers
            />
          </div>
        </div>

        {/* Cookies and Storage Management */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <Database className="w-6 h-6 text-primary" />
            Cookies & Storage Management
          </h3>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <CodeBlock
              code={`// CookiesAndStorageManager.java
public class CookiesAndStorageManager {
    private WebDriver driver;
    private JavascriptExecutor js;
    
    public CookiesAndStorageManager(WebDriver driver) {
        this.driver = driver;
        this.js = (JavascriptExecutor) driver;
    }
    
    // ==================== COOKIES ====================
    
    /**
     * Get all cookies
     */
    public Set<Cookie> getAllCookies() {
        return driver.manage().getCookies();
    }
    
    /**
     * Get specific cookie by name
     */
    public Cookie getCookie(String name) {
        return driver.manage().getCookieNamed(name);
    }
    
    /**
     * Add a new cookie
     */
    public void addCookie(String name, String value, String domain, String path, 
                          Date expiry, boolean isSecure, boolean isHttpOnly) {
        Cookie cookie = new Cookie.Builder(name, value)
            .domain(domain)
            .path(path)
            .expiresOn(expiry)
            .isSecure(isSecure)
            .isHttpOnly(isHttpOnly)
            .build();
        
        driver.manage().addCookie(cookie);
    }
    
    /**
     * Delete specific cookie
     */
    public void deleteCookie(String name) {
        driver.manage().deleteCookieNamed(name);
    }
    
    /**
     * Delete all cookies
     */
    public void deleteAllCookies() {
        driver.manage().deleteAllCookies();
    }
    
    /**
     * Save cookies to file for session persistence
     */
    public void saveCookiesToFile(String filePath) throws IOException {
        Set<Cookie> cookies = driver.manage().getCookies();
        
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream(filePath))) {
            oos.writeObject(cookies);
        }
    }
    
    /**
     * Load cookies from file
     */
    @SuppressWarnings("unchecked")
    public void loadCookiesFromFile(String filePath) throws IOException, ClassNotFoundException {
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream(filePath))) {
            Set<Cookie> cookies = (Set<Cookie>) ois.readObject();
            
            for (Cookie cookie : cookies) {
                driver.manage().addCookie(cookie);
            }
        }
    }
    
    // ==================== LOCAL STORAGE ====================
    
    /**
     * Set item in localStorage
     */
    public void setLocalStorageItem(String key, String value) {
        js.executeScript(
            String.format("window.localStorage.setItem('%s', '%s');", key, value)
        );
    }
    
    /**
     * Get item from localStorage
     */
    public String getLocalStorageItem(String key) {
        return (String) js.executeScript(
            String.format("return window.localStorage.getItem('%s');", key)
        );
    }
    
    /**
     * Remove item from localStorage
     */
    public void removeLocalStorageItem(String key) {
        js.executeScript(
            String.format("window.localStorage.removeItem('%s');", key)
        );
    }
    
    /**
     * Clear all localStorage
     */
    public void clearLocalStorage() {
        js.executeScript("window.localStorage.clear();");
    }
    
    /**
     * Get all localStorage keys
     */
    @SuppressWarnings("unchecked")
    public List<String> getLocalStorageKeys() {
        return (List<String>) js.executeScript(
            "return Object.keys(window.localStorage);"
        );
    }
    
    // ==================== SESSION STORAGE ====================
    
    /**
     * Set item in sessionStorage
     */
    public void setSessionStorageItem(String key, String value) {
        js.executeScript(
            String.format("window.sessionStorage.setItem('%s', '%s');", key, value)
        );
    }
    
    /**
     * Get item from sessionStorage
     */
    public String getSessionStorageItem(String key) {
        return (String) js.executeScript(
            String.format("return window.sessionStorage.getItem('%s');", key)
        );
    }
    
    /**
     * Clear all sessionStorage
     */
    public void clearSessionStorage() {
        js.executeScript("window.sessionStorage.clear();");
    }
    
    // ==================== PRACTICAL EXAMPLE ====================
    
    /**
     * Login once, save session, reuse in other tests
     */
    @Test
    public void reuseLoginSession() throws Exception {
        // First test: Login and save cookies
        driver.get("https://www.coursera.org/login");
        // Perform login...
        saveCookiesToFile("coursera_session.dat");
        
        // Later test: Load cookies and skip login
        driver.get("https://www.coursera.org");
        loadCookiesFromFile("coursera_session.dat");
        driver.navigate().refresh();
        
        // Now logged in without entering credentials
    }
}`}
              title="CookiesAndStorageManager.java"
              showLineNumbers
            />
          </div>
        </div>

        {/* Mobile Emulation */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <Globe className="w-6 h-6 text-primary" />
            Mobile Web Testing & Responsive Design
          </h3>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <CodeBlock
              code={`// MobileWebTesting.java
public class MobileWebTesting {
    
    /**
     * Predefined mobile device configurations
     */
    public enum MobileDevice {
        IPHONE_12_PRO(390, 844, 3.0, 
            "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15"),
        IPHONE_14_PRO_MAX(430, 932, 3.0,
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15"),
        SAMSUNG_GALAXY_S21(360, 800, 3.0,
            "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36"),
        IPAD_PRO(1024, 1366, 2.0,
            "Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15"),
        PIXEL_5(393, 851, 2.75,
            "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36");
        
        public final int width;
        public final int height;
        public final double pixelRatio;
        public final String userAgent;
        
        MobileDevice(int width, int height, double pixelRatio, String userAgent) {
            this.width = width;
            this.height = height;
            this.pixelRatio = pixelRatio;
            this.userAgent = userAgent;
        }
    }
    
    /**
     * Create Chrome driver with mobile emulation
     */
    public WebDriver getMobileEmulatedDriver(MobileDevice device) {
        Map<String, Object> deviceMetrics = new HashMap<>();
        deviceMetrics.put("width", device.width);
        deviceMetrics.put("height", device.height);
        deviceMetrics.put("pixelRatio", device.pixelRatio);
        deviceMetrics.put("mobile", true);
        deviceMetrics.put("touch", true);
        
        Map<String, Object> mobileEmulation = new HashMap<>();
        mobileEmulation.put("deviceMetrics", deviceMetrics);
        mobileEmulation.put("userAgent", device.userAgent);
        
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("mobileEmulation", mobileEmulation);
        
        return new ChromeDriver(options);
    }
    
    /**
     * Use Chrome's built-in device presets
     */
    public WebDriver getDevicePresetDriver(String deviceName) {
        // Available presets: "iPhone X", "iPad", "Pixel 2", "Galaxy S5", etc.
        Map<String, String> mobileEmulation = new HashMap<>();
        mobileEmulation.put("deviceName", deviceName);
        
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("mobileEmulation", mobileEmulation);
        
        return new ChromeDriver(options);
    }
    
    /**
     * Responsive design testing across multiple viewports
     */
    @Test
    public void testResponsiveDesign() {
        WebDriver driver = new ChromeDriver();
        
        // Define viewport sizes to test
        int[][] viewports = {
            {375, 667},   // iPhone SE
            {414, 896},   // iPhone 11
            {768, 1024},  // iPad
            {1024, 768},  // iPad Landscape
            {1280, 800},  // Small laptop
            {1920, 1080}  // Full HD
        };
        
        try {
            for (int[] viewport : viewports) {
                // Set window size
                driver.manage().window().setSize(
                    new Dimension(viewport[0], viewport[1])
                );
                
                driver.get("https://www.bookmyshow.com");
                Thread.sleep(1000);
                
                // Take screenshot
                File screenshot = ((TakesScreenshot) driver)
                    .getScreenshotAs(OutputType.FILE);
                FileUtils.copyFile(screenshot, 
                    new File("viewport_" + viewport[0] + "x" + viewport[1] + ".png"));
                
                // Verify responsive elements
                verifyResponsiveElements(driver, viewport[0]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
    
    private void verifyResponsiveElements(WebDriver driver, int width) {
        // Check if hamburger menu appears on mobile
        if (width < 768) {
            Assert.assertTrue(
                driver.findElements(By.cssSelector(".hamburger-menu, .mobile-menu")).size() > 0,
                "Mobile menu should be visible on small screens"
            );
        }
        
        // Check if sidebar is hidden on mobile
        if (width < 1024) {
            List<WebElement> sidebar = driver.findElements(By.cssSelector(".sidebar"));
            if (sidebar.size() > 0) {
                Assert.assertFalse(sidebar.get(0).isDisplayed(),
                    "Sidebar should be hidden on tablets and mobile");
            }
        }
    }
    
    /**
     * Touch gestures simulation
     */
    @Test
    public void simulateTouchGestures() {
        WebDriver driver = getMobileEmulatedDriver(MobileDevice.IPHONE_12_PRO);
        
        try {
            driver.get("https://www.bookmyshow.com");
            
            Actions actions = new Actions(driver);
            WebElement carousel = driver.findElement(By.cssSelector(".carousel"));
            
            // Simulate swipe left
            actions.moveToElement(carousel)
                   .clickAndHold()
                   .moveByOffset(-200, 0)
                   .release()
                   .perform();
            
            // Simulate tap
            WebElement button = driver.findElement(By.cssSelector(".book-now"));
            actions.click(button).perform();
            
            // Simulate long press
            actions.clickAndHold(button)
                   .pause(Duration.ofSeconds(2))
                   .release()
                   .perform();
            
        } finally {
            driver.quit();
        }
    }
}`}
              title="MobileWebTesting.java"
              showLineNumbers
            />
          </div>
        </div>

        {/* Best Practices Summary */}
        <div className="bg-gradient-to-br from-primary/10 via-card to-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Advanced Concepts Quick Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Concept</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Use Case</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Key Method/Approach</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-primary">Shadow DOM</td>
                  <td className="py-3 px-4">Web Components, Custom Elements</td>
                  <td className="py-3 px-4"><code>element.getShadowRoot()</code></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-primary">Headless Mode</td>
                  <td className="py-3 px-4">CI/CD, Faster execution</td>
                  <td className="py-3 px-4"><code>--headless=new</code></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-primary">CDP</td>
                  <td className="py-3 px-4">Network mocking, Performance</td>
                  <td className="py-3 px-4"><code>driver.getDevTools()</code></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-primary">Cookies</td>
                  <td className="py-3 px-4">Session persistence</td>
                  <td className="py-3 px-4"><code>manage().getCookies()</code></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-primary">LocalStorage</td>
                  <td className="py-3 px-4">State management</td>
                  <td className="py-3 px-4"><code>executeScript("localStorage...")</code></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-primary">Mobile Emulation</td>
                  <td className="py-3 px-4">Responsive testing</td>
                  <td className="py-3 px-4"><code>mobileEmulation</code> option</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
