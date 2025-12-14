import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const LocatorBestPractices = () => {
  const section = sections.find(s => s.id === 'locator-best-practices')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={5} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Locator Priority Order</h3>
        <p className="text-muted-foreground leading-relaxed">
          Always prefer the most reliable and maintainable locator strategy. Follow this priority order for best results.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-foreground">Priority</th>
                <th className="text-left p-3 text-foreground">Locator</th>
                <th className="text-left p-3 text-foreground">Speed</th>
                <th className="text-left p-3 text-foreground">When to Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3 text-primary font-bold">1</td>
                <td className="p-3 font-medium">ID</td>
                <td className="p-3 text-primary">Fastest</td>
                <td className="p-3 text-muted-foreground">Always prefer if unique and stable</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 text-primary font-bold">2</td>
                <td className="p-3 font-medium">Name</td>
                <td className="p-3 text-primary">Fast</td>
                <td className="p-3 text-muted-foreground">Good for form inputs</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 text-primary font-bold">3</td>
                <td className="p-3 font-medium">Data Attributes</td>
                <td className="p-3 text-primary">Fast</td>
                <td className="p-3 text-muted-foreground">data-testid, data-automation (most stable)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 text-primary font-bold">4</td>
                <td className="p-3 font-medium">CSS Selector</td>
                <td className="p-3 text-primary">Fast</td>
                <td className="p-3 text-muted-foreground">Flexible, readable, supports pseudo-classes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 text-primary font-bold">5</td>
                <td className="p-3 font-medium">Link Text</td>
                <td className="p-3 text-muted-foreground">Medium</td>
                <td className="p-3 text-muted-foreground">Only for anchor tags with stable text</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 text-primary font-bold">6</td>
                <td className="p-3 font-medium">XPath</td>
                <td className="p-3 text-muted-foreground">Slower</td>
                <td className="p-3 text-muted-foreground">Text matching, complex DOM traversal</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 text-destructive font-bold">7</td>
                <td className="p-3 font-medium">Class Name</td>
                <td className="p-3 text-destructive">Varies</td>
                <td className="p-3 text-muted-foreground">Only if unique and stable (often not)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 text-destructive font-bold">8</td>
                <td className="p-3 font-medium">Tag Name</td>
                <td className="p-3 text-destructive">Slow</td>
                <td className="p-3 text-muted-foreground">Only with findElements for lists</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
            <h4 className="font-semibold text-primary mb-3">✅ DO</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use unique, stable attributes</li>
              <li>• Prefer data-testid attributes</li>
              <li>• Use relative XPath, not absolute</li>
              <li>• Keep locators short and readable</li>
              <li>• Store locators as constants/variables</li>
              <li>• Use explicit waits before finding</li>
              <li>• Work with developers to add test IDs</li>
              <li>• Test locators in browser DevTools first</li>
            </ul>
          </div>
          <div className="p-5 bg-destructive/10 rounded-xl border border-destructive/20">
            <h4 className="font-semibold text-destructive mb-3">❌ DON'T</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use absolute XPath</li>
              <li>• Rely on auto-generated IDs</li>
              <li>• Use dynamic class names</li>
              <li>• Use index-only locators</li>
              <li>• Hardcode locators in test methods</li>
              <li>• Use Thread.sleep() for waiting</li>
              <li>• Mix locator strategies randomly</li>
              <li>• Use fragile DOM position locators</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Good vs Bad Locators</h3>
        <CodeBlock
          title="Locator Examples - Good vs Bad"
          code={`// ❌ BAD: Absolute XPath - Breaks when DOM changes
driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[3]/form/div[1]/input"));

// ✅ GOOD: ID - Unique and stable
driver.findElement(By.id("email"));

// ❌ BAD: Dynamic/Auto-generated ID
driver.findElement(By.id("j_idt42:j_idt45:email_input"));
driver.findElement(By.id("ember1234"));  // Ember.js generated

// ✅ GOOD: Data attribute
driver.findElement(By.cssSelector("[data-testid='email-input']"));

// ❌ BAD: Fragile class name that might change
driver.findElement(By.className("css-1a2b3c4"));  // Generated hash

// ✅ GOOD: Semantic class name
driver.findElement(By.cssSelector(".login-form .email-field"));

// ❌ BAD: Index-only - Position dependent
driver.findElement(By.xpath("//input[3]"));

// ✅ GOOD: Context-based
driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input"));

// ❌ BAD: Too long, hard to maintain
driver.findElement(By.xpath("//div[@class='main-container']//div[@class='content']//div[@class='form-wrapper']//form//div[@class='form-group'][1]//input"));

// ✅ GOOD: Short, focused
driver.findElement(By.cssSelector("form#login input[name='email']"));

// ❌ BAD: Hardcoded text that might be localized
driver.findElement(By.xpath("//button[text()='Войти']"));  // Russian

// ✅ GOOD: Use aria-label or data attribute
driver.findElement(By.cssSelector("button[aria-label='login']"));`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Data-TestID Strategy</h3>
        <p className="text-muted-foreground leading-relaxed">
          Work with your development team to add data-testid attributes for stable, test-specific locators.
        </p>
        <CodeBlock
          title="Using Data-TestID Attributes"
          code={`// HTML with test IDs (ask developers to add these)
// <input data-testid="email-input" type="email" />
// <button data-testid="submit-btn" type="submit">Login</button>
// <div data-testid="error-message" class="error">Invalid email</div>

// Using in Selenium
driver.findElement(By.cssSelector("[data-testid='email-input']"));
driver.findElement(By.cssSelector("[data-testid='submit-btn']"));
driver.findElement(By.cssSelector("[data-testid='error-message']"));

// Constants in Page Object
public class LoginPage {
    // Locators using data-testid
    private By emailInput = By.cssSelector("[data-testid='email-input']");
    private By passwordInput = By.cssSelector("[data-testid='password-input']");
    private By submitBtn = By.cssSelector("[data-testid='submit-btn']");
    private By errorMessage = By.cssSelector("[data-testid='error-message']");
    private By forgotPasswordLink = By.cssSelector("[data-testid='forgot-password']");
    
    // Clean, maintainable methods
    public void login(String email, String password) {
        driver.findElement(emailInput).sendKeys(email);
        driver.findElement(passwordInput).sendKeys(password);
        driver.findElement(submitBtn).click();
    }
}

// Benefits of data-testid:
// 1. Decoupled from styling (CSS changes won't break tests)
// 2. Decoupled from functionality (ID/name changes won't break tests)
// 3. Clear purpose - developers know not to change/remove them
// 4. Easy to identify test elements in code reviews
// 5. Works well with component libraries (React, Angular, Vue)`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">CSS vs XPath Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-foreground">Criteria</th>
                <th className="text-left p-3 text-foreground">CSS Selector</th>
                <th className="text-left p-3 text-foreground">XPath</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Performance</td>
                <td className="p-3 text-primary">Faster</td>
                <td className="p-3 text-muted-foreground">Slower</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Readability</td>
                <td className="p-3 text-primary">More readable</td>
                <td className="p-3 text-muted-foreground">Can be complex</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Text Matching</td>
                <td className="p-3 text-destructive">Not supported</td>
                <td className="p-3 text-primary">Supported (text(), contains())</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Parent Traversal</td>
                <td className="p-3 text-destructive">Not supported</td>
                <td className="p-3 text-primary">Supported (parent::, ancestor::)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Index-based</td>
                <td className="p-3 text-muted-foreground">:nth-child</td>
                <td className="p-3 text-muted-foreground">[index], position()</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Sibling Traversal</td>
                <td className="p-3 text-muted-foreground">Forward only (+, ~)</td>
                <td className="p-3 text-primary">Both directions</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock
          title="When to Use Each"
          code={`// Use CSS Selector when:
// - Simple attribute matching
driver.findElement(By.cssSelector("[data-testid='login-btn']"));

// - Child/descendant traversal
driver.findElement(By.cssSelector(".form-group input"));

// - Pseudo-class selection
driver.findElement(By.cssSelector("li:first-child"));

// Use XPath when:
// - Text-based selection required
driver.findElement(By.xpath("//button[text()='Submit']"));
driver.findElement(By.xpath("//span[contains(text(),'Welcome')]"));

// - Need to go UP the DOM (parent/ancestor)
driver.findElement(By.xpath("//input[@id='email']/parent::div"));
driver.findElement(By.xpath("//span[@class='error']/ancestor::form"));

// - Complex conditions
driver.findElement(By.xpath("//tr[td[text()='John']]/td[3]"));

// - Finding sibling elements
driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input"));`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Locator Debugging Tips</h3>
        <CodeBlock
          title="Debugging Locators in Browser Console"
          code={`// Test CSS Selector in browser console (F12 -> Console)
document.querySelector("[data-testid='login-btn']")
document.querySelectorAll(".course-card")  // Returns NodeList

// Test XPath in browser console
$x("//button[text()='Login']")
$x("//input[@id='email']")

// Get count of elements
document.querySelectorAll(".course-card").length
$x("//div[@class='course-card']").length

// Highlight element
var el = document.querySelector("#loginBtn");
el.style.border = "3px solid red";

// Common debugging steps:
// 1. Right-click element -> Inspect
// 2. In Elements tab, Ctrl+F to search
// 3. Type your CSS or XPath to test
// 4. Yellow highlight shows matches
// 5. Check match count (e.g., "1 of 3")

// Useful Chrome DevTools features:
// - Copy -> Copy selector (auto-generate CSS)
// - Copy -> Copy XPath (auto-generate XPath)
// - Copy -> Copy JS path
// - $0 in console refers to selected element

// Selenium debug - print all matching elements
List<WebElement> elements = driver.findElements(By.cssSelector(".course-card"));
System.out.println("Found: " + elements.size() + " elements");
for (WebElement el : elements) {
    System.out.println("Text: " + el.getText());
    System.out.println("ID: " + el.getAttribute("id"));
}`}
        />
      </div>

      <div className="p-5 bg-destructive/10 rounded-xl border border-destructive/20">
        <h4 className="font-semibold text-destructive mb-2">⚠️ Avoid Absolute XPath</h4>
        <p className="text-sm text-muted-foreground">
          Absolute XPath like <code className="bg-muted px-1 rounded">/html/body/div[1]/div[2]/form/input</code> breaks easily when DOM structure changes. 
          A single added or removed div will break all downstream locators. Always use relative XPath or CSS selectors instead.
        </p>
      </div>
    </section>
  );
};
