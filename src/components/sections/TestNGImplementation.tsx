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
        <CodeBlock
          title="TestNG Example"
          code={`public class LoginTest extends BaseTest {
    
    @BeforeClass
    public void setupClass() {
        // Runs once before all tests in class
    }
    
    @BeforeMethod
    public void setupTest() {
        driver.get(baseUrl + "/login");
    }
    
    @Test(priority = 1, description = "Valid login test")
    public void testValidLogin() {
        loginPage.login("user@test.com", "password123");
        Assert.assertTrue(homePage.isDisplayed());
    }
    
    @Test(priority = 2, groups = {"smoke"})
    public void testInvalidLogin() {
        loginPage.login("invalid", "wrong");
        Assert.assertEquals(loginPage.getError(), "Invalid credentials");
    }
    
    @AfterMethod
    public void teardownTest() {
        // Runs after each test
    }
    
    @AfterClass
    public void teardownClass() {
        driver.quit();
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Assertions</h3>
        <CodeBlock
          title="TestNG Assertions"
          code={`// Hard Assertions - stop on failure
Assert.assertEquals(actual, expected);
Assert.assertTrue(condition);
Assert.assertFalse(condition);
Assert.assertNotNull(object);

// Soft Assertions - continue on failure
SoftAssert soft = new SoftAssert();
soft.assertEquals(title, "Expected Title");
soft.assertTrue(element.isDisplayed());
soft.assertAll(); // Report all failures`}
        />
      </div>
    </section>
  );
};
