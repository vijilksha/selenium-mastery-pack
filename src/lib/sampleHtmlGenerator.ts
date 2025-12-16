// Sample HTML Page Generator for Section 5 - Locator Best Practices

export const generateLocatorBestPracticesHTML = (): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Locator Best Practices - Sample Practice Page</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { color: #2563eb; margin-bottom: 20px; text-align: center; }
        h2 { color: #1e40af; margin: 30px 0 15px; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        h3 { color: #3b82f6; margin: 20px 0 10px; }
        
        .section { 
            background: white; 
            padding: 25px; 
            border-radius: 12px; 
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        /* LOGIN FORM - Practice locators here */
        .login-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .login-section h2 { color: white; border-color: rgba(255,255,255,0.5); }
        .login-form {
            max-width: 400px;
            margin: 20px auto;
            padding: 30px;
            background: rgba(255,255,255,0.95);
            border-radius: 10px;
        }
        .form-group { margin-bottom: 20px; }
        .form-group label { 
            display: block; 
            margin-bottom: 8px; 
            color: #374151;
            font-weight: 600;
        }
        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        .form-group input:focus {
            outline: none;
            border-color: #2563eb;
        }
        .submit-btn {
            width: 100%;
            padding: 14px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        .submit-btn:hover { background: #1d4ed8; }
        .error-message {
            color: #dc2626;
            font-size: 14px;
            margin-top: 10px;
            display: none;
        }
        .forgot-password {
            text-align: center;
            margin-top: 15px;
        }
        .forgot-password a { color: #2563eb; text-decoration: none; }
        
        /* COURSE CARDS - Practice list locators */
        .course-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .course-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .course-card:hover { transform: translateY(-5px); }
        .course-card-header {
            background: linear-gradient(135deg, #2563eb, #3b82f6);
            color: white;
            padding: 20px;
        }
        .course-card-body { padding: 20px; }
        .course-title { font-size: 18px; margin-bottom: 10px; }
        .course-instructor { color: rgba(255,255,255,0.9); font-size: 14px; }
        .course-rating { color: #fbbf24; margin: 10px 0; }
        .course-price { font-weight: bold; color: #2563eb; font-size: 20px; }
        .enroll-btn {
            width: 100%;
            padding: 12px;
            margin-top: 15px;
            background: #10b981;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }
        .enroll-btn:hover { background: #059669; }
        
        /* BOOKING TABLE - Practice table locators */
        .booking-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .booking-table th, .booking-table td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        .booking-table th {
            background: #2563eb;
            color: white;
        }
        .booking-table tr:hover { background: #f3f4f6; }
        .status-available { color: #10b981; font-weight: 600; }
        .status-booked { color: #dc2626; font-weight: 600; }
        .book-btn {
            padding: 8px 20px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
        .book-btn:disabled {
            background: #9ca3af;
            cursor: not-allowed;
        }
        
        /* DROPDOWN AND SELECT - Practice dropdown locators */
        .filter-section { display: flex; gap: 20px; flex-wrap: wrap; margin: 20px 0; }
        .filter-group { flex: 1; min-width: 200px; }
        .filter-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #374151; }
        .filter-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
        }
        
        /* CHECKBOX AND RADIO - Practice form element locators */
        .checkbox-group, .radio-group {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin: 15px 0;
        }
        .checkbox-item, .radio-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        .checkbox-item input, .radio-item input { margin-right: 10px; }
        
        /* DYNAMIC ELEMENTS - Practice dynamic locators */
        .notification {
            padding: 15px 20px;
            border-radius: 8px;
            margin: 10px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-success { background: #d1fae5; color: #065f46; }
        .notification-error { background: #fee2e2; color: #991b1b; }
        .notification-warning { background: #fef3c7; color: #92400e; }
        .close-notification {
            margin-left: auto;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
        }
        
        /* MODAL - Practice modal locators */
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            justify-content: center;
            align-items: center;
        }
        .modal {
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
        
        /* CODE EXAMPLES */
        .code-block {
            background: #1e293b;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            overflow-x: auto;
            margin: 15px 0;
        }
        .code-comment { color: #6b7280; }
        .code-good { color: #10b981; }
        .code-bad { color: #ef4444; }
        
        /* INFO BOX */
        .info-box {
            background: #dbeafe;
            border-left: 4px solid #2563eb;
            padding: 15px 20px;
            border-radius: 0 8px 8px 0;
            margin: 15px 0;
        }
        .warning-box {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px 20px;
            border-radius: 0 8px 8px 0;
            margin: 15px 0;
        }
        
        footer {
            text-align: center;
            padding: 30px;
            color: #6b7280;
            margin-top: 40px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Locator Best Practices - Practice HTML Page</h1>
        <p style="text-align:center; color:#6b7280; margin-bottom:30px;">
            Use this page to practice Selenium locator strategies on real-world elements
        </p>

        <!-- SECTION 1: LOGIN FORM -->
        <section class="section login-section">
            <h2>📝 Login Form - Practice Form Locators</h2>
            <p>Practice ID, Name, Data-TestID, and CSS selector strategies</p>
            
            <form id="loginForm" class="login-form" data-testid="login-form" autocomplete="off">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="userEmail" 
                        data-testid="email-input"
                        placeholder="Enter your email"
                        aria-label="Email address input"
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="userPassword" 
                        data-testid="password-input"
                        placeholder="Enter your password"
                        aria-label="Password input"
                    />
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="rememberMe" name="remember" data-testid="remember-checkbox" />
                    <label for="rememberMe">Remember me</label>
                </div>
                <button type="submit" class="submit-btn" id="loginBtn" data-testid="login-submit-btn" aria-label="login">
                    Login
                </button>
                <div class="error-message" id="errorMsg" data-testid="error-message">
                    Invalid email or password
                </div>
                <div class="forgot-password">
                    <a href="#" id="forgotPasswordLink" data-testid="forgot-password-link">Forgot Password?</a>
                </div>
            </form>
            
            <div class="code-block">
<span class="code-comment">// Selenium Locator Examples for Login Form</span>

<span class="code-good">// ✅ GOOD: By ID (fastest, unique)</span>
driver.findElement(By.id("email"));
driver.findElement(By.id("password"));
driver.findElement(By.id("loginBtn"));

<span class="code-good">// ✅ GOOD: By Name</span>
driver.findElement(By.name("userEmail"));
driver.findElement(By.name("userPassword"));

<span class="code-good">// ✅ BEST: By Data-TestID (most stable)</span>
driver.findElement(By.cssSelector("[data-testid='email-input']"));
driver.findElement(By.cssSelector("[data-testid='password-input']"));
driver.findElement(By.cssSelector("[data-testid='login-submit-btn']"));

<span class="code-good">// ✅ GOOD: By CSS Selector</span>
driver.findElement(By.cssSelector("#loginForm input[type='email']"));
driver.findElement(By.cssSelector("form#loginForm .submit-btn"));

<span class="code-good">// ✅ GOOD: By aria-label</span>
driver.findElement(By.cssSelector("[aria-label='login']"));
            </div>
        </section>

        <!-- SECTION 2: COURSE CARDS -->
        <section class="section">
            <h2>📚 Course Cards - Practice List & Card Locators</h2>
            <p>Practice finding multiple elements, index-based selection, and traversal</p>
            
            <div class="course-grid" data-testid="course-grid">
                <div class="course-card" data-testid="course-card" data-course-id="COURSE001">
                    <div class="course-card-header">
                        <h3 class="course-title" data-testid="course-title">Selenium WebDriver Masterclass</h3>
                        <span class="course-instructor" data-testid="course-instructor">By John Smith</span>
                    </div>
                    <div class="course-card-body">
                        <div class="course-rating" data-testid="course-rating">⭐⭐⭐⭐⭐ (4.9)</div>
                        <p>Complete automation testing course with Java</p>
                        <div class="course-price" data-testid="course-price">$49.99</div>
                        <button class="enroll-btn" data-testid="enroll-btn" data-course="COURSE001">Enroll Now</button>
                    </div>
                </div>
                
                <div class="course-card" data-testid="course-card" data-course-id="COURSE002">
                    <div class="course-card-header">
                        <h3 class="course-title" data-testid="course-title">TestNG Framework Deep Dive</h3>
                        <span class="course-instructor" data-testid="course-instructor">By Jane Doe</span>
                    </div>
                    <div class="course-card-body">
                        <div class="course-rating" data-testid="course-rating">⭐⭐⭐⭐⭐ (4.8)</div>
                        <p>Advanced TestNG with real project examples</p>
                        <div class="course-price" data-testid="course-price">$39.99</div>
                        <button class="enroll-btn" data-testid="enroll-btn" data-course="COURSE002">Enroll Now</button>
                    </div>
                </div>
                
                <div class="course-card" data-testid="course-card" data-course-id="COURSE003">
                    <div class="course-card-header">
                        <h3 class="course-title" data-testid="course-title">API Testing with RestAssured</h3>
                        <span class="course-instructor" data-testid="course-instructor">By Mike Johnson</span>
                    </div>
                    <div class="course-card-body">
                        <div class="course-rating" data-testid="course-rating">⭐⭐⭐⭐ (4.6)</div>
                        <p>REST API automation from scratch</p>
                        <div class="course-price" data-testid="course-price">$44.99</div>
                        <button class="enroll-btn" data-testid="enroll-btn" data-course="COURSE003">Enroll Now</button>
                    </div>
                </div>
            </div>
            
            <div class="code-block">
<span class="code-comment">// Selenium Locator Examples for Course Cards</span>

<span class="code-good">// ✅ GOOD: Find all course cards</span>
List&lt;WebElement&gt; allCourses = driver.findElements(By.cssSelector("[data-testid='course-card']"));
System.out.println("Total courses: " + allCourses.size());

<span class="code-good">// ✅ GOOD: Find specific course by data attribute</span>
driver.findElement(By.cssSelector("[data-course-id='COURSE001']"));

<span class="code-good">// ✅ GOOD: Find course by title text using XPath</span>
driver.findElement(By.xpath("//h3[text()='Selenium WebDriver Masterclass']"));

<span class="code-good">// ✅ GOOD: Find enroll button for specific course</span>
driver.findElement(By.cssSelector("[data-course='COURSE002']"));

<span class="code-good">// ✅ GOOD: Navigate from title to enroll button</span>
driver.findElement(By.xpath("//h3[text()='TestNG Framework Deep Dive']/ancestor::div[@class='course-card']//button"));

<span class="code-bad">// ❌ BAD: Index-only (position dependent)</span>
driver.findElement(By.xpath("//div[@class='course-card'][2]"));

<span class="code-good">// ✅ GOOD: First/Last using CSS</span>
driver.findElement(By.cssSelector(".course-card:first-child"));
driver.findElement(By.cssSelector(".course-card:last-child"));
            </div>
        </section>

        <!-- SECTION 3: BOOKING TABLE -->
        <section class="section">
            <h2>🎫 Booking Table - Practice Table Locators</h2>
            <p>Practice row/column navigation, cell selection, and table traversal</p>
            
            <table class="booking-table" id="bookingTable" data-testid="booking-table">
                <thead>
                    <tr>
                        <th data-column="movie">Movie</th>
                        <th data-column="showtime">Showtime</th>
                        <th data-column="seats">Available Seats</th>
                        <th data-column="price">Price</th>
                        <th data-column="status">Status</th>
                        <th data-column="action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr data-testid="booking-row" data-movie-id="MOV001">
                        <td data-testid="movie-name">Avatar 3</td>
                        <td data-testid="showtime">10:00 AM</td>
                        <td data-testid="seats">45</td>
                        <td data-testid="price">$15.00</td>
                        <td data-testid="status"><span class="status-available">Available</span></td>
                        <td><button class="book-btn" data-testid="book-btn" data-movie="MOV001">Book</button></td>
                    </tr>
                    <tr data-testid="booking-row" data-movie-id="MOV002">
                        <td data-testid="movie-name">Spider-Man 4</td>
                        <td data-testid="showtime">1:30 PM</td>
                        <td data-testid="seats">0</td>
                        <td data-testid="price">$18.00</td>
                        <td data-testid="status"><span class="status-booked">Sold Out</span></td>
                        <td><button class="book-btn" data-testid="book-btn" data-movie="MOV002" disabled>Book</button></td>
                    </tr>
                    <tr data-testid="booking-row" data-movie-id="MOV003">
                        <td data-testid="movie-name">The Dark Knight Returns</td>
                        <td data-testid="showtime">4:00 PM</td>
                        <td data-testid="seats">28</td>
                        <td data-testid="price">$20.00</td>
                        <td data-testid="status"><span class="status-available">Available</span></td>
                        <td><button class="book-btn" data-testid="book-btn" data-movie="MOV003">Book</button></td>
                    </tr>
                    <tr data-testid="booking-row" data-movie-id="MOV004">
                        <td data-testid="movie-name">Jurassic World 4</td>
                        <td data-testid="showtime">7:30 PM</td>
                        <td data-testid="seats">12</td>
                        <td data-testid="price">$22.00</td>
                        <td data-testid="status"><span class="status-available">Available</span></td>
                        <td><button class="book-btn" data-testid="book-btn" data-movie="MOV004">Book</button></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="code-block">
<span class="code-comment">// Selenium Locator Examples for Table</span>

<span class="code-good">// ✅ GOOD: Find all rows</span>
List&lt;WebElement&gt; rows = driver.findElements(By.cssSelector("#bookingTable tbody tr"));

<span class="code-good">// ✅ GOOD: Find specific row by movie ID</span>
driver.findElement(By.cssSelector("tr[data-movie-id='MOV001']"));

<span class="code-good">// ✅ GOOD: Find cell by row and column</span>
driver.findElement(By.xpath("//tr[@data-movie-id='MOV003']/td[@data-testid='price']"));

<span class="code-good">// ✅ GOOD: Find row containing specific text</span>
driver.findElement(By.xpath("//tr[td[text()='Avatar 3']]"));

<span class="code-good">// ✅ GOOD: Find book button for specific movie</span>
driver.findElement(By.xpath("//tr[td[text()='Spider-Man 4']]//button[@data-testid='book-btn']"));

<span class="code-good">// ✅ GOOD: Find all available movies</span>
List&lt;WebElement&gt; available = driver.findElements(By.xpath("//tr[.//span[@class='status-available']]"));

<span class="code-good">// ✅ GOOD: Get price of specific movie</span>
String price = driver.findElement(By.xpath("//td[text()='The Dark Knight Returns']/following-sibling::td[3]")).getText();
            </div>
        </section>

        <!-- SECTION 4: DROPDOWNS AND FILTERS -->
        <section class="section">
            <h2>🔽 Dropdowns & Filters - Practice Select Locators</h2>
            <p>Practice dropdown selection, multi-select, and filter combinations</p>
            
            <div class="filter-section">
                <div class="filter-group">
                    <label for="categoryFilter">Category</label>
                    <select id="categoryFilter" name="category" data-testid="category-dropdown">
                        <option value="">All Categories</option>
                        <option value="automation">Automation Testing</option>
                        <option value="manual">Manual Testing</option>
                        <option value="api">API Testing</option>
                        <option value="performance">Performance Testing</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label for="levelFilter">Experience Level</label>
                    <select id="levelFilter" name="level" data-testid="level-dropdown">
                        <option value="">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label for="priceFilter">Price Range</label>
                    <select id="priceFilter" name="price" data-testid="price-dropdown">
                        <option value="">Any Price</option>
                        <option value="free">Free</option>
                        <option value="under25">Under $25</option>
                        <option value="25to50">$25 - $50</option>
                        <option value="over50">Over $50</option>
                    </select>
                </div>
            </div>
            
            <div class="code-block">
<span class="code-comment">// Selenium Locator Examples for Dropdowns</span>

<span class="code-good">// ✅ GOOD: Using Selenium's Select class</span>
Select categoryDropdown = new Select(driver.findElement(By.id("categoryFilter")));
categoryDropdown.selectByVisibleText("Automation Testing");
categoryDropdown.selectByValue("api");
categoryDropdown.selectByIndex(2);

<span class="code-good">// ✅ GOOD: Find dropdown by data-testid</span>
WebElement levelDropdown = driver.findElement(By.cssSelector("[data-testid='level-dropdown']"));
new Select(levelDropdown).selectByValue("advanced");

<span class="code-good">// ✅ GOOD: Get all options</span>
Select priceSelect = new Select(driver.findElement(By.name("price")));
List&lt;WebElement&gt; options = priceSelect.getOptions();

<span class="code-good">// ✅ GOOD: Get selected option</span>
String selected = priceSelect.getFirstSelectedOption().getText();

<span class="code-good">// ✅ GOOD: Find specific option</span>
driver.findElement(By.cssSelector("#categoryFilter option[value='automation']"));
            </div>
        </section>

        <!-- SECTION 5: CHECKBOX AND RADIO -->
        <section class="section">
            <h2>☑️ Checkboxes & Radio Buttons - Practice Form Element Locators</h2>
            
            <div class="checkbox-group">
                <h3>Select Technologies (Multiple)</h3>
                <div class="checkbox-item">
                    <input type="checkbox" id="selenium" name="tech" value="selenium" data-testid="tech-selenium" />
                    <label for="selenium">Selenium WebDriver</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="testng" name="tech" value="testng" data-testid="tech-testng" />
                    <label for="testng">TestNG</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="cucumber" name="tech" value="cucumber" data-testid="tech-cucumber" />
                    <label for="cucumber">Cucumber BDD</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="restassured" name="tech" value="restassured" data-testid="tech-restassured" />
                    <label for="restassured">RestAssured</label>
                </div>
            </div>
            
            <div class="radio-group">
                <h3>Experience Level (Single)</h3>
                <div class="radio-item">
                    <input type="radio" id="exp-fresher" name="experience" value="fresher" data-testid="exp-fresher" />
                    <label for="exp-fresher">Fresher (0-1 years)</label>
                </div>
                <div class="radio-item">
                    <input type="radio" id="exp-junior" name="experience" value="junior" data-testid="exp-junior" />
                    <label for="exp-junior">Junior (1-3 years)</label>
                </div>
                <div class="radio-item">
                    <input type="radio" id="exp-senior" name="experience" value="senior" data-testid="exp-senior" />
                    <label for="exp-senior">Senior (3-5 years)</label>
                </div>
                <div class="radio-item">
                    <input type="radio" id="exp-lead" name="experience" value="lead" data-testid="exp-lead" />
                    <label for="exp-lead">Lead (5+ years)</label>
                </div>
            </div>
            
            <div class="code-block">
<span class="code-comment">// Selenium Locator Examples for Checkboxes & Radio</span>

<span class="code-good">// ✅ GOOD: Select checkbox by ID</span>
WebElement seleniumCheckbox = driver.findElement(By.id("selenium"));
if (!seleniumCheckbox.isSelected()) {
    seleniumCheckbox.click();
}

<span class="code-good">// ✅ GOOD: Select by data-testid</span>
driver.findElement(By.cssSelector("[data-testid='tech-testng']")).click();

<span class="code-good">// ✅ GOOD: Select radio by value</span>
driver.findElement(By.cssSelector("input[name='experience'][value='senior']")).click();

<span class="code-good">// ✅ GOOD: Find checked checkbox</span>
List&lt;WebElement&gt; checkedTech = driver.findElements(By.cssSelector("input[name='tech']:checked"));

<span class="code-good">// ✅ GOOD: Click label instead of input (larger target)</span>
driver.findElement(By.xpath("//label[text()='Selenium WebDriver']")).click();

<span class="code-good">// ✅ GOOD: Verify checkbox state</span>
boolean isChecked = driver.findElement(By.id("cucumber")).isSelected();
            </div>
        </section>

        <!-- SECTION 6: NOTIFICATIONS -->
        <section class="section">
            <h2>🔔 Notifications - Practice Dynamic Element Locators</h2>
            <p>Practice locating dynamically appearing elements</p>
            
            <div id="notificationContainer" data-testid="notification-container">
                <div class="notification notification-success" data-testid="notification" data-type="success">
                    <span>✅</span>
                    <span data-testid="notification-message">Course enrolled successfully!</span>
                    <button class="close-notification" data-testid="close-notification" aria-label="Close notification">×</button>
                </div>
                
                <div class="notification notification-error" data-testid="notification" data-type="error">
                    <span>❌</span>
                    <span data-testid="notification-message">Payment failed. Please try again.</span>
                    <button class="close-notification" data-testid="close-notification" aria-label="Close notification">×</button>
                </div>
                
                <div class="notification notification-warning" data-testid="notification" data-type="warning">
                    <span>⚠️</span>
                    <span data-testid="notification-message">Only 3 seats remaining!</span>
                    <button class="close-notification" data-testid="close-notification" aria-label="Close notification">×</button>
                </div>
            </div>
            
            <div class="code-block">
<span class="code-comment">// Selenium Locator Examples for Dynamic Notifications</span>

<span class="code-good">// ✅ GOOD: Wait for notification to appear</span>
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement notification = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='notification']"))
);

<span class="code-good">// ✅ GOOD: Find notification by type</span>
driver.findElement(By.cssSelector("[data-type='success']"));
driver.findElement(By.cssSelector("[data-type='error']"));

<span class="code-good">// ✅ GOOD: Find notification containing text</span>
driver.findElement(By.xpath("//div[@data-testid='notification'][contains(.,'successfully')]"));

<span class="code-good">// ✅ GOOD: Close specific notification</span>
driver.findElement(By.xpath("//div[@data-type='error']//button[@data-testid='close-notification']")).click();

<span class="code-good">// ✅ GOOD: Wait for notification to disappear</span>
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("[data-type='success']")));
            </div>
        </section>

        <!-- SECTION 7: CSS VS XPATH COMPARISON -->
        <section class="section">
            <h2>⚖️ CSS Selector vs XPath - When to Use Each</h2>
            
            <div class="info-box">
                <strong>CSS Selectors:</strong> Faster, more readable, great for attribute and class-based selection. Use when you don't need text matching or parent traversal.
            </div>
            
            <div class="info-box">
                <strong>XPath:</strong> More powerful, supports text matching and parent/sibling traversal. Use for complex DOM navigation.
            </div>
            
            <div class="code-block">
<span class="code-comment">// CSS Selector Examples</span>
<span class="code-good">// ✅ Attribute selection</span>
driver.findElement(By.cssSelector("[data-testid='login-btn']"));
driver.findElement(By.cssSelector("input[type='email']"));

<span class="code-good">// ✅ Descendant selection</span>
driver.findElement(By.cssSelector(".login-form input"));
driver.findElement(By.cssSelector("#bookingTable td"));

<span class="code-good">// ✅ Pseudo-classes</span>
driver.findElement(By.cssSelector("tr:first-child"));
driver.findElement(By.cssSelector("li:nth-child(3)"));
driver.findElement(By.cssSelector("input:not([disabled])"));

<span class="code-comment">// XPath Examples</span>
<span class="code-good">// ✅ Text matching</span>
driver.findElement(By.xpath("//button[text()='Login']"));
driver.findElement(By.xpath("//span[contains(text(),'Welcome')]"));

<span class="code-good">// ✅ Parent traversal (CSS cannot do this!)</span>
driver.findElement(By.xpath("//input[@id='email']/parent::div"));
driver.findElement(By.xpath("//span[@class='error']/ancestor::form"));

<span class="code-good">// ✅ Sibling traversal</span>
driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input"));
driver.findElement(By.xpath("//td[text()='Avatar 3']/preceding-sibling::td"));

<span class="code-good">// ✅ Complex conditions</span>
driver.findElement(By.xpath("//tr[td[text()='Avatar 3']]/td[3]"));
driver.findElement(By.xpath("//div[@class='course-card' and .//span[text()='$49.99']]"));
            </div>
        </section>

        <!-- SECTION 8: DEBUGGING TIPS -->
        <section class="section">
            <h2>🔧 Locator Debugging Tips</h2>
            
            <div class="warning-box">
                <strong>Pro Tip:</strong> Always test your locators in browser DevTools before using in Selenium!
            </div>
            
            <div class="code-block">
<span class="code-comment">// Test in Browser Console (F12 → Console)</span>

<span class="code-comment">// Test CSS Selector</span>
document.querySelector("[data-testid='login-btn']")
document.querySelectorAll(".course-card")
document.querySelectorAll(".course-card").length

<span class="code-comment">// Test XPath</span>
$x("//button[text()='Login']")
$x("//input[@id='email']")
$x("//div[@class='course-card']").length

<span class="code-comment">// Highlight element (visual debugging)</span>
var el = document.querySelector("#loginBtn");
el.style.border = "3px solid red";
el.style.backgroundColor = "yellow";

<span class="code-comment">// DevTools shortcuts:</span>
// - Ctrl+F in Elements tab to search
// - $0 refers to currently selected element
// - Right-click → Copy → Copy selector/XPath

<span class="code-comment">// Selenium debugging</span>
List&lt;WebElement&gt; elements = driver.findElements(By.cssSelector(".course-card"));
System.out.println("Found: " + elements.size() + " elements");
for (WebElement el : elements) {
    System.out.println("Text: " + el.getText());
    System.out.println("ID: " + el.getAttribute("id"));
    System.out.println("Class: " + el.getAttribute("class"));
}
            </div>
        </section>

        <!-- MODAL FOR PRACTICE -->
        <section class="section">
            <h2>🪟 Modal Dialog - Practice Modal Locators</h2>
            <button class="submit-btn" id="openModalBtn" data-testid="open-modal-btn" onclick="document.getElementById('sampleModal').style.display='flex'">
                Open Sample Modal
            </button>
        </section>

        <div class="modal-overlay" id="sampleModal" data-testid="modal-overlay">
            <div class="modal" role="dialog" aria-modal="true" data-testid="modal-dialog">
                <div class="modal-header">
                    <h3>Confirm Enrollment</h3>
                    <button class="modal-close" id="closeModalBtn" data-testid="modal-close-btn" onclick="document.getElementById('sampleModal').style.display='none'">×</button>
                </div>
                <p>Are you sure you want to enroll in this course?</p>
                <div style="margin-top:20px; display:flex; gap:10px;">
                    <button class="submit-btn" data-testid="modal-confirm-btn">Confirm</button>
                    <button class="submit-btn" style="background:#6b7280" data-testid="modal-cancel-btn" onclick="document.getElementById('sampleModal').style.display='none'">Cancel</button>
                </div>
            </div>
        </div>

        <div class="code-block">
<span class="code-comment">// Modal Locator Examples</span>

<span class="code-good">// ✅ Wait for modal to be visible</span>
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='modal-dialog']")));

<span class="code-good">// ✅ Find modal elements</span>
driver.findElement(By.cssSelector("[data-testid='modal-confirm-btn']")).click();
driver.findElement(By.cssSelector("[data-testid='modal-cancel-btn']")).click();
driver.findElement(By.cssSelector("[data-testid='modal-close-btn']")).click();

<span class="code-good">// ✅ Wait for modal to close</span>
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("[data-testid='modal-overlay']")));
        </div>

        <footer>
            <p>🎓 Selenium WebDriver Training Platform - Locator Best Practices Practice Page</p>
            <p>Use this HTML file with Selenium to practice all locator strategies!</p>
        </footer>
    </div>

    <script>
        // Simple form validation for practice
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var errorMsg = document.getElementById('errorMsg');
            
            if (email === 'test@example.com' && password === 'password123') {
                errorMsg.style.display = 'none';
                alert('Login successful!');
            } else {
                errorMsg.style.display = 'block';
            }
        });
        
        // Close notification buttons
        document.querySelectorAll('.close-notification').forEach(function(btn) {
            btn.addEventListener('click', function() {
                this.parentElement.style.display = 'none';
            });
        });
    </script>
</body>
</html>`;
};

export const downloadLocatorPracticeHTML = () => {
  const htmlContent = generateLocatorBestPracticesHTML();
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Locator-Best-Practices-Practice-Page.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
