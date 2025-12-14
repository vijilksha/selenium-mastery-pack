import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';
import { AlertTriangle, Layers, Monitor, List, Upload, Camera, Code, MousePointer } from 'lucide-react';

export const ExceptionHandling = () => {
  const section = sections.find(s => s.id === 'exception-handling')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={9} />

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
