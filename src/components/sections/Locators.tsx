import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const Locators = () => {
  const section = sections.find(s => s.id === 'locators')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={4} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Locators</h3>
        <p className="text-muted-foreground leading-relaxed">
          Selenium provides 8 built-in locator strategies. Choose the right one based on element uniqueness and stability.
        </p>
        <CodeBlock
          title="Basic Locator Strategies"
          code={`// 1. By ID - Most preferred (unique, fast)
driver.findElement(By.id("loginBtn"));
driver.findElement(By.id("email-input"));

// 2. By Name - Good for form inputs
driver.findElement(By.name("username"));
driver.findElement(By.name("password"));

// 3. By Class Name - Single class only
driver.findElement(By.className("submit-btn"));
driver.findElement(By.className("form-control"));
// Note: Cannot use multiple classes like "btn btn-primary"

// 4. By Tag Name - Returns first matching element
driver.findElement(By.tagName("input"));
driver.findElement(By.tagName("button"));
// Usually used with findElements for lists
List<WebElement> links = driver.findElements(By.tagName("a"));

// 5. By Link Text - Exact match for <a> elements
driver.findElement(By.linkText("Sign In"));
driver.findElement(By.linkText("Forgot Password?"));

// 6. By Partial Link Text - Partial match for <a> elements
driver.findElement(By.partialLinkText("Sign"));
driver.findElement(By.partialLinkText("Forgot"));

// 7. By CSS Selector - Powerful and fast
driver.findElement(By.cssSelector("#loginForm input[type='email']"));

// 8. By XPath - Most flexible, can traverse anywhere
driver.findElement(By.xpath("//input[@id='username']"));`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">CSS Selectors - Complete Guide</h3>
        <CodeBlock
          title="CSS Selector Syntax"
          code={`// Basic Selectors
driver.findElement(By.cssSelector("#id"));           // By ID
driver.findElement(By.cssSelector(".classname"));    // By class
driver.findElement(By.cssSelector("tagname"));       // By tag
driver.findElement(By.cssSelector("#id.classname")); // ID + class

// Attribute Selectors
driver.findElement(By.cssSelector("[name='email']"));           // Exact match
driver.findElement(By.cssSelector("[type='submit']"));
driver.findElement(By.cssSelector("[placeholder='Search']"));
driver.findElement(By.cssSelector("input[type='text']"));       // Tag + attribute

// Partial Attribute Matching
driver.findElement(By.cssSelector("[id^='user']"));     // Starts with
driver.findElement(By.cssSelector("[id$='name']"));     // Ends with
driver.findElement(By.cssSelector("[id*='login']"));    // Contains
driver.findElement(By.cssSelector("[class~='active']")); // Word in space-separated list

// Combinators
driver.findElement(By.cssSelector("div.form input"));       // Descendant (any level)
driver.findElement(By.cssSelector("form > input"));          // Direct child only
driver.findElement(By.cssSelector("label + input"));         // Adjacent sibling
driver.findElement(By.cssSelector("h2 ~ p"));                // General sibling

// Pseudo-classes
driver.findElement(By.cssSelector("li:first-child"));        // First child
driver.findElement(By.cssSelector("li:last-child"));         // Last child
driver.findElement(By.cssSelector("li:nth-child(2)"));       // 2nd child
driver.findElement(By.cssSelector("li:nth-child(odd)"));     // Odd children
driver.findElement(By.cssSelector("li:nth-child(even)"));    // Even children
driver.findElement(By.cssSelector("input:not([disabled])")); // Not disabled
driver.findElement(By.cssSelector("input:enabled"));         // Enabled inputs
driver.findElement(By.cssSelector("input:checked"));         // Checked checkbox

// Multiple Classes
driver.findElement(By.cssSelector(".btn.btn-primary"));      // Both classes
driver.findElement(By.cssSelector(".course-card.featured")); // Both classes

// Multiple Conditions
driver.findElement(By.cssSelector("input[type='text'][name='email']"));

// Coursera Examples
driver.findElement(By.cssSelector("#header-search-input"));
driver.findElement(By.cssSelector(".rc-SearchBox input"));
driver.findElement(By.cssSelector("[data-testid='course-card']"));
driver.findElement(By.cssSelector(".course-link[href*='python']"));`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">XPath - Complete Guide</h3>
        <CodeBlock
          title="XPath Fundamentals"
          code={`// Absolute XPath (NOT Recommended - fragile)
driver.findElement(By.xpath("/html/body/div[1]/div[2]/form/input"));

// Relative XPath (Recommended - flexible)
driver.findElement(By.xpath("//input[@id='username']"));

// Basic Syntax
driver.findElement(By.xpath("//tagname[@attribute='value']"));
driver.findElement(By.xpath("//input[@type='email']"));
driver.findElement(By.xpath("//button[@id='submit']"));

// Text-based XPath
driver.findElement(By.xpath("//button[text()='Login']"));           // Exact text
driver.findElement(By.xpath("//a[text()='Sign Up']"));
driver.findElement(By.xpath("//span[.='Welcome']"));                 // Alternative

// Partial Text Matching
driver.findElement(By.xpath("//button[contains(text(),'Submit')]"));
driver.findElement(By.xpath("//a[contains(.,'Learn More')]"));

// Attribute Functions
driver.findElement(By.xpath("//input[contains(@id,'user')]"));       // Contains
driver.findElement(By.xpath("//input[starts-with(@id,'login')]"));   // Starts with
driver.findElement(By.xpath("//input[ends-with(@id,'Field')]"));     // Ends with (XPath 2.0)

// Multiple Conditions (AND/OR)
driver.findElement(By.xpath("//input[@type='text' and @name='email']"));
driver.findElement(By.xpath("//input[@type='text' or @type='email']"));
driver.findElement(By.xpath("//button[@type='submit' and contains(@class,'primary')]"));

// Not condition
driver.findElement(By.xpath("//input[not(@disabled)]"));
driver.findElement(By.xpath("//div[not(contains(@class,'hidden'))]"));

// Wildcard (*)
driver.findElement(By.xpath("//*[@id='uniqueId']"));           // Any tag with ID
driver.findElement(By.xpath("//input[@*='email']"));            // Any attribute = email

// Normalize space (handles extra whitespace)
driver.findElement(By.xpath("//button[normalize-space()='Log In']"));`}
        />
        <CodeBlock
          title="XPath Axes - DOM Navigation"
          code={`// Parent - Get parent element
driver.findElement(By.xpath("//input[@id='email']/parent::div"));
driver.findElement(By.xpath("//input[@id='email']/.."));  // Shorthand

// Ancestor - Any ancestor (parent, grandparent, etc.)
driver.findElement(By.xpath("//input[@id='email']/ancestor::form"));
driver.findElement(By.xpath("//span[@class='error']/ancestor::div[@class='form-group']"));

// Child - Direct children
driver.findElement(By.xpath("//form[@id='login']/child::input"));
driver.findElement(By.xpath("//ul[@class='menu']/child::li[1]"));

// Descendant - Any descendant (child, grandchild, etc.)
driver.findElement(By.xpath("//div[@id='container']/descendant::button"));
driver.findElement(By.xpath("//form/descendant::input[@type='text']"));

// Following-sibling - Siblings after current element
driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input"));
driver.findElement(By.xpath("//h2[text()='Courses']/following-sibling::div[1]"));

// Preceding-sibling - Siblings before current element
driver.findElement(By.xpath("//input[@id='password']/preceding-sibling::input"));

// Following - All nodes after current (not just siblings)
driver.findElement(By.xpath("//div[@id='header']/following::footer"));

// Preceding - All nodes before current
driver.findElement(By.xpath("//footer/preceding::header"));

// Self - Current node
driver.findElement(By.xpath("//input[@id='email']/self::input"));

// Practical Examples - BookMyShow
// Get theater name from seat row
driver.findElement(By.xpath("//div[@class='seat' and @data-seat='A1']/ancestor::div[@class='theater']//h3"));

// Get price from movie card
driver.findElement(By.xpath("//h3[text()='Jawan']/following-sibling::span[@class='price']"));

// Get all movies in a category
driver.findElements(By.xpath("//h2[text()='Now Showing']/following-sibling::div//div[@class='movie-card']"));`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">XPath Indexing</h3>
        <CodeBlock
          title="XPath Index Examples"
          code={`// Position-based selection (1-indexed in XPath)
driver.findElement(By.xpath("(//input[@type='text'])[1]"));  // First input
driver.findElement(By.xpath("(//input[@type='text'])[2]"));  // Second input
driver.findElement(By.xpath("(//div[@class='card'])[last()]"));  // Last card
driver.findElement(By.xpath("(//li)[last()-1]"));            // Second to last

// Index within parent
driver.findElement(By.xpath("//ul[@id='menu']/li[1]"));      // First li in ul
driver.findElement(By.xpath("//table//tr[2]/td[3]"));        // Row 2, Column 3

// Position functions
driver.findElement(By.xpath("//tr[position()>1]"));          // All rows except first
driver.findElement(By.xpath("//li[position()<=3]"));         // First 3 items

// Count function
int rowCount = driver.findElements(By.xpath("//table//tr")).size();
// Or in XPath: count(//table//tr)

// Coursera - Select specific course from list
driver.findElement(By.xpath("(//div[@class='course-card'])[3]"));  // 3rd course
driver.findElement(By.xpath("(//div[contains(@class,'course-card')])[1]//a"));  // First course link`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Relative Locators (Selenium 4)</h3>
        <p className="text-muted-foreground leading-relaxed">
          Selenium 4 introduced Relative Locators (Friendly Locators) to find elements based on their visual position relative to other elements.
        </p>
        <CodeBlock
          title="Relative Locators Examples"
          code={`import static org.openqa.selenium.support.locators.RelativeLocator.with;

// Find element ABOVE another element
WebElement emailField = driver.findElement(By.id("email"));
WebElement labelAboveEmail = driver.findElement(
    with(By.tagName("label")).above(emailField)
);

// Find element BELOW another element
WebElement submitBtn = driver.findElement(
    with(By.tagName("button")).below(emailField)
);

// Find element to the LEFT OF another element
WebElement cancelBtn = driver.findElement(
    with(By.tagName("button")).toLeftOf(submitBtn)
);

// Find element to the RIGHT OF another element
WebElement helpIcon = driver.findElement(
    with(By.tagName("span")).toRightOf(emailField)
);

// Find element NEAR another element (within 50px by default)
WebElement errorMsg = driver.findElement(
    with(By.className("error")).near(emailField)
);

// Custom distance for near()
WebElement tooltip = driver.findElement(
    with(By.className("tooltip")).near(emailField, 100)  // Within 100px
);

// Chaining relative locators
WebElement password = driver.findElement(
    with(By.tagName("input"))
        .below(emailField)
        .above(submitBtn)
);

// Practical Example - Login Form
WebElement emailLabel = driver.findElement(By.xpath("//label[text()='Email']"));
WebElement emailInput = driver.findElement(
    with(By.tagName("input")).toRightOf(emailLabel)
);

WebElement passwordLabel = driver.findElement(
    with(By.tagName("label")).below(emailLabel)
);
WebElement passwordInput = driver.findElement(
    with(By.tagName("input")).toRightOf(passwordLabel)
);

// BookMyShow - Find Buy button near movie title
WebElement movieTitle = driver.findElement(By.xpath("//h3[text()='Jawan']"));
WebElement buyButton = driver.findElement(
    with(By.tagName("button")).below(movieTitle).near(movieTitle, 200)
);`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Dynamic Element Locators</h3>
        <CodeBlock
          title="Handling Dynamic Elements"
          code={`// Dynamic IDs (e.g., id="user_12345" where numbers change)
// Use contains, starts-with, or ends-with
driver.findElement(By.xpath("//input[contains(@id,'user_')]"));
driver.findElement(By.xpath("//input[starts-with(@id,'user_')]"));
driver.findElement(By.cssSelector("[id^='user_']"));  // CSS starts with

// Dynamic class names
driver.findElement(By.xpath("//div[contains(@class,'course') and contains(@class,'card')]"));
driver.findElement(By.cssSelector("[class*='course'][class*='card']"));

// Elements with changing text
driver.findElement(By.xpath("//span[contains(text(),'items in cart')]"));

// Use data attributes (more stable)
driver.findElement(By.cssSelector("[data-testid='submit-button']"));
driver.findElement(By.xpath("//*[@data-automation='login-form']"));

// Find by visible text nearby (table scenario)
// Find "Edit" button in row containing "John Doe"
driver.findElement(By.xpath(
    "//tr[td[text()='John Doe']]//button[text()='Edit']"
));

// Dynamic tables - BookMyShow showtimes
// Find "Book" button for 7:00 PM show at PVR
driver.findElement(By.xpath(
    "//div[contains(@class,'theater') and .//h4[text()='PVR Cinemas']]" +
    "//div[contains(@class,'showtime') and .//span[text()='7:00 PM']]//button"
));

// Wait for dynamic element
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement dynamicElement = wait.until(
    ExpectedConditions.presenceOfElementLocated(
        By.xpath("//div[@id='dynamic-content']//span")
    )
);`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Finding Multiple Elements</h3>
        <CodeBlock
          title="Working with Lists of Elements"
          code={`// findElements returns List<WebElement>
List<WebElement> courseCards = driver.findElements(By.className("course-card"));

// Check if elements exist (returns empty list, not exception)
List<WebElement> errors = driver.findElements(By.className("error-message"));
if (errors.isEmpty()) {
    System.out.println("No errors found");
} else {
    System.out.println("Found " + errors.size() + " errors");
}

// Iterate through elements
List<WebElement> links = driver.findElements(By.tagName("a"));
for (WebElement link : links) {
    System.out.println(link.getText() + " - " + link.getAttribute("href"));
}

// Get specific element from list
WebElement thirdCourse = courseCards.get(2);  // 0-indexed

// Find element with specific text in list
List<WebElement> menuItems = driver.findElements(By.cssSelector(".menu-item"));
for (WebElement item : menuItems) {
    if (item.getText().equals("Data Science")) {
        item.click();
        break;
    }
}

// Using Stream API (Java 8+)
String courseTitle = courseCards.stream()
    .filter(card -> card.findElement(By.className("price")).getText().equals("Free"))
    .findFirst()
    .map(card -> card.findElement(By.className("title")).getText())
    .orElse("No free course found");

// Count elements
int courseCount = driver.findElements(By.className("course-card")).size();

// Verify element count
Assert.assertEquals(courseCards.size(), 10, "Should display 10 courses");`}
        />
      </div>
    </section>
  );
};
