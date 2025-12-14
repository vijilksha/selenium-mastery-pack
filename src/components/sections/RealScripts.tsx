import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const RealScripts = () => {
  const section = sections.find(s => s.id === 'real-scripts')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={7} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Coursera Login Automation</h3>
        <CodeBlock
          title="CourseraLoginPage.java"
          code={`public class CourseraLoginPage {
    private WebDriver driver;
    private By emailField = By.id("email");
    private By passwordField = By.id("password");
    private By loginBtn = By.xpath("//button[text()='Login']");
    
    public CourseraLoginPage(WebDriver driver) {
        this.driver = driver;
    }
    
    public HomePage login(String email, String password) {
        driver.findElement(emailField).sendKeys(email);
        driver.findElement(passwordField).sendKeys(password);
        driver.findElement(loginBtn).click();
        return new HomePage(driver);
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">BookMyShow Booking</h3>
        <CodeBlock
          title="BookMyShowTest.java"
          code={`@Test
public void testMovieBooking() {
    homePage.selectCity("Mumbai");
    homePage.searchMovie("Jawan");
    
    moviePage.selectTheatre("PVR Phoenix");
    moviePage.selectShowtime("7:00 PM");
    
    seatPage.selectSeats("A1", "A2");
    seatPage.proceedToPayment();
    
    Assert.assertTrue(paymentPage.isDisplayed());
}`}
        />
      </div>
    </section>
  );
};
