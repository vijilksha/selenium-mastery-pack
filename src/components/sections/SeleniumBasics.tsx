import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const SeleniumBasics = () => {
  const section = sections.find(s => s.id === 'selenium-basics')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={1} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">What is Selenium?</h3>
        <p className="text-muted-foreground leading-relaxed">
          Selenium is an open-source web automation framework for testing web applications across different browsers and platforms. It supports multiple programming languages including Java, Python, C#, and JavaScript.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Selenium Components</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Selenium IDE', desc: 'Record and playback browser extension for quick test creation' },
            { name: 'Selenium WebDriver', desc: 'Core automation API for browser control - industry standard' },
            { name: 'Selenium Grid', desc: 'Parallel execution across multiple machines and browsers' },
            { name: 'Selenium RC', desc: 'Deprecated - replaced by WebDriver in Selenium 2.0' },
          ].map(item => (
            <div key={item.name} className="p-4 bg-card rounded-xl border border-border">
              <h4 className="font-semibold text-foreground">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Selenium WebDriver Architecture</h3>
        <p className="text-muted-foreground leading-relaxed">
          WebDriver follows a client-server architecture. The test script (client) sends commands via HTTP to the browser driver (server), which translates them into browser-specific actions using native browser support.
        </p>
        <div className="p-5 bg-card rounded-xl border border-border">
          <h4 className="font-semibold text-foreground mb-3">How WebDriver Works</h4>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="px-3 py-2 bg-primary/20 text-primary rounded-lg">Test Script (Java)</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-2 bg-primary/20 text-primary rounded-lg">Selenium Client Library</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-2 bg-primary/20 text-primary rounded-lg">JSON Wire Protocol</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-2 bg-primary/20 text-primary rounded-lg">Browser Driver</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-2 bg-primary/20 text-primary rounded-lg">Browser</span>
          </div>
        </div>
        <CodeBlock
          title="Basic WebDriver Example"
          code={`// Initialize ChromeDriver
WebDriver driver = new ChromeDriver();

// Navigate to URL
driver.get("https://www.coursera.org");

// Get page title
String title = driver.getTitle();
System.out.println("Page Title: " + title);

// Get current URL
String currentUrl = driver.getCurrentUrl();
System.out.println("Current URL: " + currentUrl);

// Get page source
String pageSource = driver.getPageSource();

// Close browser
driver.quit();`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Selenium 3 vs Selenium 4</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-foreground">Feature</th>
                <th className="text-left p-3 text-foreground">Selenium 3</th>
                <th className="text-left p-3 text-foreground">Selenium 4</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Protocol</td>
                <td className="p-3 text-muted-foreground">JSON Wire Protocol</td>
                <td className="p-3 text-muted-foreground">W3C WebDriver Protocol</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Relative Locators</td>
                <td className="p-3 text-muted-foreground">Not Available</td>
                <td className="p-3 text-muted-foreground">Available (above, below, near)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Chrome DevTools</td>
                <td className="p-3 text-muted-foreground">Not Supported</td>
                <td className="p-3 text-muted-foreground">Native CDP Support</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">New Window/Tab</td>
                <td className="p-3 text-muted-foreground">JavaScript workaround</td>
                <td className="p-3 text-muted-foreground">driver.switchTo().newWindow()</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Shadow DOM</td>
                <td className="p-3 text-muted-foreground">JavaScript only</td>
                <td className="p-3 text-muted-foreground">Native getShadowRoot()</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Element Screenshots</td>
                <td className="p-3 text-muted-foreground">Full page only</td>
                <td className="p-3 text-muted-foreground">Element-level screenshots</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Selenium 4 New Features</h3>
        <CodeBlock
          title="Selenium 4 New Features Examples"
          code={`// 1. Relative Locators (Friendly Locators)
WebElement emailField = driver.findElement(By.id("email"));
WebElement passwordField = driver.findElement(
    RelativeLocator.with(By.tagName("input")).below(emailField)
);

// Find element to the right of another
WebElement submitBtn = driver.findElement(
    RelativeLocator.with(By.tagName("button")).toRightOf(cancelBtn)
);

// Find element near another (within 50 pixels)
WebElement label = driver.findElement(
    RelativeLocator.with(By.tagName("label")).near(inputField)
);

// 2. Open New Window/Tab
driver.switchTo().newWindow(WindowType.TAB);    // Opens new tab
driver.switchTo().newWindow(WindowType.WINDOW); // Opens new window

// 3. Element Screenshots
WebElement logo = driver.findElement(By.id("logo"));
File screenshot = logo.getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(screenshot, new File("logo_screenshot.png"));

// 4. Get Element Rect (size and position)
Rectangle rect = element.getRect();
System.out.println("Height: " + rect.getHeight());
System.out.println("Width: " + rect.getWidth());
System.out.println("X: " + rect.getX());
System.out.println("Y: " + rect.getY());

// 5. BiDi APIs (Bi-directional communication)
// Listen to console logs
DevTools devTools = ((ChromeDriver) driver).getDevTools();
devTools.createSession();
devTools.send(Log.enable());
devTools.addListener(Log.entryAdded(), entry -> {
    System.out.println("Console Log: " + entry.getText());
});`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Browser Drivers</h3>
        <p className="text-muted-foreground leading-relaxed">
          Each browser requires its specific driver executable. WebDriverManager automates driver management.
        </p>
        <CodeBlock
          title="Browser Driver Setup"
          code={`// Using WebDriverManager (Recommended - Automatic driver management)
// Chrome
WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();

// Firefox
WebDriverManager.firefoxdriver().setup();
WebDriver driver = new FirefoxDriver();

// Edge
WebDriverManager.edgedriver().setup();
WebDriver driver = new EdgeDriver();

// Safari (macOS only - no driver download needed)
WebDriver driver = new SafariDriver();

// Manual Driver Setup (Not Recommended)
System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
WebDriver driver = new ChromeDriver();

// Selenium 4.6+ - Selenium Manager (Automatic)
// No setup needed - Selenium automatically manages drivers
WebDriver driver = new ChromeDriver(); // Just works!`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Browser Options & Capabilities</h3>
        <CodeBlock
          title="Browser Configuration Options"
          code={`// Chrome Options
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.addArguments("--start-maximized");
chromeOptions.addArguments("--incognito");
chromeOptions.addArguments("--disable-notifications");
chromeOptions.addArguments("--disable-popup-blocking");
chromeOptions.addArguments("--disable-extensions");
chromeOptions.addArguments("--headless=new"); // Headless mode

// Set download directory
HashMap<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", "/path/to/downloads");
prefs.put("download.prompt_for_download", false);
chromeOptions.setExperimentalOption("prefs", prefs);

// Disable automation flags (avoid detection)
chromeOptions.setExperimentalOption("excludeSwitches", 
    Collections.singletonList("enable-automation"));
chromeOptions.setExperimentalOption("useAutomationExtension", false);

WebDriver driver = new ChromeDriver(chromeOptions);

// Firefox Options
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.addArguments("-private"); // Private browsing
firefoxOptions.addPreference("dom.webnotifications.enabled", false);
firefoxOptions.addPreference("browser.download.folderList", 2);
firefoxOptions.addPreference("browser.download.dir", "/path/to/downloads");
WebDriver driver = new FirefoxDriver(firefoxOptions);

// Edge Options
EdgeOptions edgeOptions = new EdgeOptions();
edgeOptions.addArguments("--start-maximized");
edgeOptions.addArguments("--inprivate");
WebDriver driver = new EdgeDriver(edgeOptions);`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Why Selenium for Automation?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">Advantages</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Open source and free</li>
              <li>• Supports multiple browsers</li>
              <li>• Supports multiple languages</li>
              <li>• Large community support</li>
              <li>• Integration with CI/CD tools</li>
              <li>• Parallel execution with Grid</li>
            </ul>
          </div>
          <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
            <h4 className="font-semibold text-destructive mb-2">Limitations</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Web applications only (no desktop/mobile native)</li>
              <li>• No built-in reporting</li>
              <li>• No native image comparison</li>
              <li>• Cannot automate captcha</li>
              <li>• Requires programming knowledge</li>
              <li>• Browser driver dependency</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
