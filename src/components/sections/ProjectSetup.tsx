import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const ProjectSetup = () => {
  const section = sections.find(s => s.id === 'project-setup')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={2} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Maven pom.xml</h3>
        <CodeBlock
          title="pom.xml"
          language="xml"
          code={`<dependencies>
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.15.0</version>
    </dependency>
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.8.0</version>
    </dependency>
    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.6.2</version>
    </dependency>
</dependencies>`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">BaseTest Class</h3>
        <CodeBlock
          title="BaseTest.java"
          code={`public class BaseTest {
    protected WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`}
        />
      </div>
    </section>
  );
};
