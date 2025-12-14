import { SectionHeader } from '../SectionHeader';
import { CodeBlock } from '../CodeBlock';
import { sections } from '@/data/sections';

export const RealScripts = () => {
  const section = sections.find(s => s.id === 'real-scripts')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={7} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Coursera - Complete Login Flow</h3>
        <p className="text-muted-foreground leading-relaxed">
          Complete Page Object implementation for Coursera login functionality with proper waits and error handling.
        </p>
        <CodeBlock
          title="CourseraLoginPage.java"
          code={`public class CourseraLoginPage extends BasePage {
    
    // ========== LOCATORS ==========
    private By emailField = By.id("email");
    private By passwordField = By.id("password");
    private By loginBtn = By.xpath("//button[contains(text(),'Login')]");
    private By googleLoginBtn = By.cssSelector("[data-testid='google-auth-button']");
    private By errorMessage = By.className("error-message");
    private By forgotPasswordLink = By.linkText("Forgot password?");
    private By signupLink = By.linkText("Sign up");
    private By rememberMeCheckbox = By.id("remember-me");
    private By passwordToggle = By.className("password-toggle");
    
    public CourseraLoginPage(WebDriver driver) {
        super(driver);
    }
    
    // ========== PAGE ACTIONS ==========
    public void enterEmail(String email) {
        log.info("Entering email: " + email);
        waitForVisible(emailField).clear();
        driver.findElement(emailField).sendKeys(email);
    }
    
    public void enterPassword(String password) {
        log.info("Entering password");
        driver.findElement(passwordField).clear();
        driver.findElement(passwordField).sendKeys(password);
    }
    
    public void clickLogin() {
        log.info("Clicking login button");
        waitForClickable(loginBtn).click();
    }
    
    public CourseraHomePage login(String email, String password) {
        log.info("Performing login for user: " + email);
        enterEmail(email);
        enterPassword(password);
        clickLogin();
        waitForUrlContains("/browse");
        return new CourseraHomePage(driver);
    }
    
    public void toggleRememberMe() {
        driver.findElement(rememberMeCheckbox).click();
    }
    
    public void togglePasswordVisibility() {
        driver.findElement(passwordToggle).click();
    }
    
    public void clickGoogleLogin() {
        waitForClickable(googleLoginBtn).click();
    }
    
    public ForgotPasswordPage clickForgotPassword() {
        driver.findElement(forgotPasswordLink).click();
        return new ForgotPasswordPage(driver);
    }
    
    public SignupPage clickSignup() {
        driver.findElement(signupLink).click();
        return new SignupPage(driver);
    }
    
    // ========== VERIFICATION METHODS ==========
    public String getErrorMessage() {
        return waitForVisible(errorMessage).getText();
    }
    
    public boolean isErrorDisplayed() {
        try {
            return waitForVisible(errorMessage, 5).isDisplayed();
        } catch (TimeoutException e) {
            return false;
        }
    }
    
    public boolean isLoginPageDisplayed() {
        try {
            return driver.findElement(loginBtn).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
    
    public boolean isRememberMeChecked() {
        return driver.findElement(rememberMeCheckbox).isSelected();
    }
    
    @Override
    public boolean isPageLoaded() {
        return waitForVisible(emailField, 10).isDisplayed();
    }
}`}
        />
        <CodeBlock
          title="CourseraLoginTest.java"
          code={`public class CourseraLoginTest extends BaseTest {
    
    private CourseraLoginPage loginPage;
    
    @BeforeMethod
    public void navigateToLogin() {
        driver.get(ConfigReader.getProperty("courseraUrl") + "/login");
        loginPage = new CourseraLoginPage(driver);
    }
    
    @Test(priority = 1, groups = {"smoke", "login"})
    @Description("Verify successful login with valid credentials")
    public void testValidLogin() {
        String email = TestDataProvider.getValidEmail();
        String password = TestDataProvider.getValidPassword();
        
        CourseraHomePage homePage = loginPage.login(email, password);
        
        Assert.assertTrue(homePage.isHomePageDisplayed(), 
            "Home page should be displayed after login");
        Assert.assertEquals(homePage.getWelcomeMessage(), 
            "Welcome back!", "Welcome message mismatch");
    }
    
    @Test(priority = 2, groups = {"regression", "login"})
    @Description("Verify error message for invalid credentials")
    public void testInvalidLogin() {
        loginPage.login("invalid@email.com", "wrongpassword");
        
        Assert.assertTrue(loginPage.isErrorDisplayed(), 
            "Error message should be displayed");
        Assert.assertEquals(loginPage.getErrorMessage(), 
            "There was a problem with your request", "Error message mismatch");
    }
    
    @Test(priority = 3, groups = {"regression", "login"})
    @Description("Verify empty field validation")
    public void testEmptyFieldValidation() {
        loginPage.clickLogin();
        
        Assert.assertTrue(loginPage.isErrorDisplayed(), 
            "Error should be displayed for empty fields");
    }
    
    @Test(priority = 4, groups = {"regression", "login"})
    @Description("Verify forgot password link navigation")
    public void testForgotPasswordLink() {
        ForgotPasswordPage forgotPage = loginPage.clickForgotPassword();
        
        Assert.assertTrue(forgotPage.isPageLoaded(), 
            "Forgot password page should be displayed");
    }
    
    @Test(priority = 5, groups = {"regression", "login"}, 
          dataProvider = "loginData", dataProviderClass = TestDataProvider.class)
    @Description("Data-driven login test")
    public void testLoginWithMultipleUsers(String email, String password, 
                                            boolean shouldPass) {
        loginPage.enterEmail(email);
        loginPage.enterPassword(password);
        loginPage.clickLogin();
        
        if (shouldPass) {
            Assert.assertTrue(driver.getCurrentUrl().contains("/browse"), 
                "Should navigate to home page");
        } else {
            Assert.assertTrue(loginPage.isErrorDisplayed(), 
                "Error should be displayed");
        }
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Coursera - Course Search & Enrollment</h3>
        <CodeBlock
          title="CourseraSearchPage.java"
          code={`public class CourseraSearchPage extends BasePage {
    
    // ========== LOCATORS ==========
    private By searchInput = By.id("header-search-input");
    private By searchBtn = By.cssSelector("[data-testid='search-button']");
    private By searchResults = By.className("search-results");
    private By courseCards = By.cssSelector("[data-testid='course-card']");
    private By filterSection = By.className("filter-panel");
    private By levelFilter = By.cssSelector("[data-filter='level']");
    private By subjectFilter = By.cssSelector("[data-filter='subject']");
    private By durationFilter = By.cssSelector("[data-filter='duration']");
    private By sortDropdown = By.id("sort-by");
    private By resultsCount = By.className("results-count");
    private By noResultsMessage = By.className("no-results");
    private By loadMoreBtn = By.cssSelector("[data-testid='load-more']");
    
    public CourseraSearchPage(WebDriver driver) {
        super(driver);
    }
    
    // ========== SEARCH ACTIONS ==========
    public void searchCourse(String courseName) {
        log.info("Searching for course: " + courseName);
        WebElement input = waitForVisible(searchInput);
        input.clear();
        input.sendKeys(courseName);
        input.sendKeys(Keys.ENTER);
        waitForVisible(searchResults);
    }
    
    public void clickSearch() {
        waitForClickable(searchBtn).click();
    }
    
    // ========== FILTER ACTIONS ==========
    public void filterByLevel(String level) {
        log.info("Filtering by level: " + level);
        driver.findElement(levelFilter).click();
        waitForClickable(By.xpath("//li[text()='" + level + "']")).click();
        waitForSearchResultsUpdate();
    }
    
    public void filterBySubject(String subject) {
        log.info("Filtering by subject: " + subject);
        driver.findElement(subjectFilter).click();
        waitForClickable(By.xpath("//li[text()='" + subject + "']")).click();
        waitForSearchResultsUpdate();
    }
    
    public void filterByDuration(String duration) {
        driver.findElement(durationFilter).click();
        waitForClickable(By.xpath("//li[text()='" + duration + "']")).click();
        waitForSearchResultsUpdate();
    }
    
    public void sortBy(String sortOption) {
        log.info("Sorting by: " + sortOption);
        Select sort = new Select(driver.findElement(sortDropdown));
        sort.selectByVisibleText(sortOption);
        waitForSearchResultsUpdate();
    }
    
    private void waitForSearchResultsUpdate() {
        // Wait for results to reload
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.className("loading-spinner")
        ));
        wait.until(ExpectedConditions.visibilityOfElementLocated(courseCards));
    }
    
    // ========== COURSE SELECTION ==========
    public CourseDetailsPage selectCourse(int index) {
        log.info("Selecting course at index: " + index);
        List<WebElement> courses = driver.findElements(courseCards);
        if (index < courses.size()) {
            scrollToElement(courses.get(index));
            courses.get(index).click();
            return new CourseDetailsPage(driver);
        }
        throw new IndexOutOfBoundsException("Course index out of range");
    }
    
    public CourseDetailsPage selectCourseByTitle(String title) {
        log.info("Selecting course: " + title);
        WebElement course = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//div[@data-testid='course-card'][.//h3[contains(text(),'" + 
                     title + "')]]")
        ));
        scrollToElement(course);
        course.click();
        return new CourseDetailsPage(driver);
    }
    
    // ========== VERIFICATION METHODS ==========
    public int getResultsCount() {
        String countText = driver.findElement(resultsCount).getText();
        return Integer.parseInt(countText.replaceAll("\\D", ""));
    }
    
    public List<String> getCourseTitles() {
        List<WebElement> courses = driver.findElements(courseCards);
        return courses.stream()
            .map(c -> c.findElement(By.tagName("h3")).getText())
            .collect(Collectors.toList());
    }
    
    public boolean hasResults() {
        return !driver.findElements(courseCards).isEmpty();
    }
    
    public boolean isNoResultsDisplayed() {
        try {
            return driver.findElement(noResultsMessage).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
    
    public void loadMoreResults() {
        if (isLoadMoreVisible()) {
            scrollToElement(driver.findElement(loadMoreBtn));
            driver.findElement(loadMoreBtn).click();
            waitForSearchResultsUpdate();
        }
    }
    
    public boolean isLoadMoreVisible() {
        try {
            return driver.findElement(loadMoreBtn).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
    
    @Override
    public boolean isPageLoaded() {
        return waitForVisible(searchInput, 10).isDisplayed();
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">BookMyShow - Complete Booking Flow</h3>
        <CodeBlock
          title="BookMyShowHomePage.java"
          code={`public class BookMyShowHomePage extends BasePage {
    
    // ========== LOCATORS ==========
    private By citySelector = By.cssSelector(".city-selector");
    private By citySearchInput = By.cssSelector(".city-search input");
    private By cityList = By.className("city-list");
    private By searchInput = By.id("searchInput");
    private By moviesTab = By.xpath("//a[text()='Movies']");
    private By eventsTab = By.xpath("//a[text()='Events']");
    private By nowShowingSection = By.xpath("//h2[text()='Now Showing']");
    private By movieCards = By.className("movie-card");
    private By comingSoonSection = By.xpath("//h2[text()='Coming Soon']");
    
    public BookMyShowHomePage(WebDriver driver) {
        super(driver);
    }
    
    // ========== CITY SELECTION ==========
    public void selectCity(String cityName) {
        log.info("Selecting city: " + cityName);
        
        // Click city selector if not auto-opened
        try {
            waitForClickable(citySelector, 5).click();
        } catch (TimeoutException e) {
            // City popup may already be open on first visit
        }
        
        // Wait for city list to appear
        waitForVisible(cityList);
        
        // Search for city
        WebElement searchBox = driver.findElement(citySearchInput);
        searchBox.clear();
        searchBox.sendKeys(cityName);
        
        // Wait and click matching city
        WebElement city = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//li[contains(@class,'city-item') and contains(text(),'" + 
                     cityName + "')]")
        ));
        city.click();
        
        // Wait for page to reload with selected city
        waitForInvisibility(cityList);
        waitForVisible(nowShowingSection);
    }
    
    public String getCurrentCity() {
        return driver.findElement(citySelector).getText();
    }
    
    // ========== MOVIE SEARCH ==========
    public void searchMovie(String movieName) {
        log.info("Searching for movie: " + movieName);
        WebElement search = waitForVisible(searchInput);
        search.clear();
        search.sendKeys(movieName);
        
        // Wait for suggestions
        waitForVisible(By.className("search-suggestions"));
        
        // Click first matching result
        waitForClickable(By.xpath(
            "//div[@class='suggestion-item'][contains(.,'" + movieName + "')]"
        )).click();
    }
    
    // ========== NAVIGATION ==========
    public MovieListPage clickNowShowing() {
        waitForClickable(nowShowingSection).click();
        return new MovieListPage(driver);
    }
    
    public MovieDetailsPage selectMovie(String movieTitle) {
        log.info("Selecting movie: " + movieTitle);
        WebElement movie = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//div[@class='movie-card'][.//h4[text()='" + movieTitle + "']]")
        ));
        scrollToElement(movie);
        movie.click();
        return new MovieDetailsPage(driver);
    }
    
    public MovieDetailsPage selectMovieByIndex(int index) {
        List<WebElement> movies = driver.findElements(movieCards);
        if (index < movies.size()) {
            movies.get(index).click();
            return new MovieDetailsPage(driver);
        }
        throw new IndexOutOfBoundsException("Movie index out of range");
    }
    
    // ========== VERIFICATION ==========
    public List<String> getNowShowingMovies() {
        return driver.findElements(movieCards).stream()
            .map(card -> card.findElement(By.tagName("h4")).getText())
            .collect(Collectors.toList());
    }
    
    public int getMovieCount() {
        return driver.findElements(movieCards).size();
    }
    
    @Override
    public boolean isPageLoaded() {
        return waitForVisible(searchInput, 10).isDisplayed();
    }
}`}
        />
        <CodeBlock
          title="SeatSelectionPage.java"
          code={`public class SeatSelectionPage extends BasePage {
    
    // ========== LOCATORS ==========
    private By seatMap = By.className("seat-layout");
    private By availableSeats = By.cssSelector(".seat.available");
    private By selectedSeats = By.cssSelector(".seat.selected");
    private By bookedSeats = By.cssSelector(".seat.booked");
    private By seatCategories = By.className("seat-category");
    private By totalAmount = By.id("total-amount");
    private By proceedBtn = By.id("proceed-payment");
    private By clearSelectionBtn = By.id("clear-selection");
    private By seatCountDisplay = By.className("seat-count");
    private By acceptTermsCheckbox = By.id("accept-terms");
    
    public SeatSelectionPage(WebDriver driver) {
        super(driver);
    }
    
    // ========== SEAT SELECTION ==========
    public void selectSeat(String seatNumber) {
        log.info("Selecting seat: " + seatNumber);
        WebElement seat = wait.until(ExpectedConditions.elementToBeClickable(
            By.cssSelector(".seat[data-seat='" + seatNumber + "']")
        ));
        
        // Check if seat is available
        if (seat.getAttribute("class").contains("booked")) {
            throw new IllegalStateException("Seat " + seatNumber + " is already booked");
        }
        
        seat.click();
        
        // Wait for seat to be marked as selected
        wait.until(ExpectedConditions.attributeContains(
            By.cssSelector(".seat[data-seat='" + seatNumber + "']"), 
            "class", "selected"
        ));
    }
    
    public void selectSeats(String... seatNumbers) {
        log.info("Selecting seats: " + Arrays.toString(seatNumbers));
        for (String seat : seatNumbers) {
            selectSeat(seat);
        }
    }
    
    public void selectSeats(int count) {
        log.info("Selecting " + count + " seats");
        List<WebElement> available = driver.findElements(availableSeats);
        
        if (available.size() < count) {
            throw new IllegalStateException(
                "Not enough available seats. Requested: " + count + 
                ", Available: " + available.size()
            );
        }
        
        for (int i = 0; i < count; i++) {
            available.get(i).click();
            // Small delay between selections
            try { Thread.sleep(200); } catch (InterruptedException e) {}
        }
    }
    
    public void deselectSeat(String seatNumber) {
        WebElement seat = driver.findElement(
            By.cssSelector(".seat.selected[data-seat='" + seatNumber + "']")
        );
        seat.click();
    }
    
    public void clearSelection() {
        if (getSelectedSeatCount() > 0) {
            driver.findElement(clearSelectionBtn).click();
            wait.until(ExpectedConditions.numberOfElementsToBe(selectedSeats, 0));
        }
    }
    
    // ========== SEAT CATEGORY ==========
    public void selectCategory(String category) {
        log.info("Selecting category: " + category);
        WebElement categoryElement = driver.findElement(
            By.xpath("//div[@class='seat-category'][.//span[text()='" + category + "']]")
        );
        categoryElement.click();
        waitForVisible(seatMap);
    }
    
    public List<String> getAvailableCategories() {
        return driver.findElements(seatCategories).stream()
            .map(c -> c.findElement(By.tagName("span")).getText())
            .collect(Collectors.toList());
    }
    
    // ========== PROCEED TO PAYMENT ==========
    public void acceptTerms() {
        WebElement checkbox = driver.findElement(acceptTermsCheckbox);
        if (!checkbox.isSelected()) {
            checkbox.click();
        }
    }
    
    public PaymentPage proceedToPayment() {
        log.info("Proceeding to payment");
        acceptTerms();
        waitForClickable(proceedBtn).click();
        return new PaymentPage(driver);
    }
    
    // ========== VERIFICATION ==========
    public int getSelectedSeatCount() {
        return driver.findElements(selectedSeats).size();
    }
    
    public List<String> getSelectedSeatNumbers() {
        return driver.findElements(selectedSeats).stream()
            .map(s -> s.getAttribute("data-seat"))
            .collect(Collectors.toList());
    }
    
    public String getTotalAmount() {
        return driver.findElement(totalAmount).getText();
    }
    
    public double getTotalAmountAsDouble() {
        String amount = getTotalAmount().replaceAll("[^0-9.]", "");
        return Double.parseDouble(amount);
    }
    
    public int getAvailableSeatCount() {
        return driver.findElements(availableSeats).size();
    }
    
    public boolean isSeatAvailable(String seatNumber) {
        WebElement seat = driver.findElement(
            By.cssSelector(".seat[data-seat='" + seatNumber + "']")
        );
        return seat.getAttribute("class").contains("available");
    }
    
    public boolean isProceedEnabled() {
        return driver.findElement(proceedBtn).isEnabled();
    }
    
    @Override
    public boolean isPageLoaded() {
        return waitForVisible(seatMap, 15).isDisplayed();
    }
}`}
        />
        <CodeBlock
          title="BookMyShowTest.java - Complete Test"
          code={`public class BookMyShowTest extends BaseTest {
    
    private BookMyShowHomePage homePage;
    
    @BeforeMethod
    public void navigateToHome() {
        driver.get(ConfigReader.getProperty("bookmyshowUrl"));
        homePage = new BookMyShowHomePage(driver);
        homePage.selectCity("Mumbai");
    }
    
    @Test(priority = 1, groups = {"smoke", "booking"})
    @Description("Complete movie booking flow")
    public void testCompleteMovieBooking() {
        // Search and select movie
        homePage.searchMovie("Jawan");
        
        MovieDetailsPage moviePage = new MovieDetailsPage(driver);
        Assert.assertTrue(moviePage.isPageLoaded(), "Movie page should load");
        
        // Select theater and showtime
        moviePage.selectTheater("PVR Cinemas");
        moviePage.selectShowtime("7:00 PM");
        
        // Select seats
        SeatSelectionPage seatPage = new SeatSelectionPage(driver);
        seatPage.selectCategory("Premium");
        seatPage.selectSeats("A1", "A2");
        
        Assert.assertEquals(seatPage.getSelectedSeatCount(), 2, 
            "Should have 2 seats selected");
        Assert.assertTrue(seatPage.getTotalAmountAsDouble() > 0, 
            "Total amount should be greater than 0");
        
        // Proceed to payment
        PaymentPage paymentPage = seatPage.proceedToPayment();
        Assert.assertTrue(paymentPage.isPageLoaded(), 
            "Payment page should be displayed");
    }
    
    @Test(priority = 2, groups = {"regression", "booking"})
    @Description("Verify seat selection limits")
    public void testSeatSelectionLimit() {
        homePage.selectMovie("Jawan");
        
        MovieDetailsPage moviePage = new MovieDetailsPage(driver);
        moviePage.selectTheater("INOX");
        moviePage.selectShowtime("9:30 PM");
        
        SeatSelectionPage seatPage = new SeatSelectionPage(driver);
        
        // Try to select more than allowed seats
        try {
            seatPage.selectSeats(11);  // Assuming max is 10
            Assert.fail("Should not allow more than 10 seats");
        } catch (Exception e) {
            // Expected behavior
        }
    }
    
    @Test(priority = 3, groups = {"regression", "booking"},
          dataProvider = "cityData")
    @Description("Verify movies available in different cities")
    public void testMoviesInDifferentCities(String city, int minMovies) {
        homePage.selectCity(city);
        
        Assert.assertEquals(homePage.getCurrentCity(), city, 
            "City should be selected");
        Assert.assertTrue(homePage.getMovieCount() >= minMovies, 
            "Should have at least " + minMovies + " movies in " + city);
    }
    
    @DataProvider(name = "cityData")
    public Object[][] getCityData() {
        return new Object[][] {
            {"Mumbai", 10},
            {"Delhi", 10},
            {"Bangalore", 8},
            {"Chennai", 5}
        };
    }
}`}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Online Ticket Booking System</h3>
        <CodeBlock
          title="TicketBookingPage.java"
          code={`public class TicketBookingPage extends BasePage {
    
    // ========== LOCATORS ==========
    private By fromStation = By.id("from-station");
    private By toStation = By.id("to-station");
    private By journeyDate = By.id("journey-date");
    private By returnDate = By.id("return-date");
    private By passengers = By.id("passenger-count");
    private By travelClass = By.id("travel-class");
    private By searchBtn = By.id("search-trains");
    private By swapStations = By.className("swap-stations");
    private By trainResults = By.className("train-card");
    private By sortByDropdown = By.id("sort-trains");
    private By filterPanel = By.className("filter-panel");
    
    public TicketBookingPage(WebDriver driver) {
        super(driver);
    }
    
    // ========== JOURNEY DETAILS ==========
    public void enterFromStation(String station) {
        log.info("Entering from station: " + station);
        WebElement from = waitForClickable(fromStation);
        from.click();
        from.sendKeys(station);
        
        // Wait for autocomplete and select
        waitForClickable(By.xpath(
            "//li[contains(@class,'station-option')][contains(text(),'" + station + "')]"
        )).click();
    }
    
    public void enterToStation(String station) {
        log.info("Entering to station: " + station);
        WebElement to = waitForClickable(toStation);
        to.click();
        to.sendKeys(station);
        
        waitForClickable(By.xpath(
            "//li[contains(@class,'station-option')][contains(text(),'" + station + "')]"
        )).click();
    }
    
    public void swapStations() {
        driver.findElement(swapStations).click();
    }
    
    public void selectJourneyDate(String date) {
        log.info("Selecting journey date: " + date);
        driver.findElement(journeyDate).click();
        selectDateFromCalendar(date);
    }
    
    public void selectReturnDate(String date) {
        driver.findElement(returnDate).click();
        selectDateFromCalendar(date);
    }
    
    private void selectDateFromCalendar(String date) {
        // Date format: dd-MM-yyyy
        String[] parts = date.split("-");
        String day = parts[0];
        String month = parts[1];
        String year = parts[2];
        
        // Navigate to correct month/year if needed
        // Then click the day
        waitForClickable(By.xpath(
            "//td[@data-date='" + date + "']"
        )).click();
    }
    
    public void selectPassengers(int count) {
        Select select = new Select(driver.findElement(passengers));
        select.selectByValue(String.valueOf(count));
    }
    
    public void selectClass(String travelClassName) {
        Select select = new Select(driver.findElement(travelClass));
        select.selectByVisibleText(travelClassName);
    }
    
    public void searchTrains() {
        log.info("Searching for trains");
        waitForClickable(searchBtn).click();
        waitForVisible(trainResults);
    }
    
    // ========== COMBINED SEARCH ==========
    public void searchTrains(String from, String to, String date, 
                            int passengers, String travelClass) {
        enterFromStation(from);
        enterToStation(to);
        selectJourneyDate(date);
        selectPassengers(passengers);
        selectClass(travelClass);
        searchTrains();
    }
    
    // ========== TRAIN SELECTION ==========
    public TrainDetailsPage selectTrain(int index) {
        List<WebElement> trains = driver.findElements(trainResults);
        if (index < trains.size()) {
            trains.get(index).findElement(By.className("book-btn")).click();
            return new TrainDetailsPage(driver);
        }
        throw new IndexOutOfBoundsException("Train index out of range");
    }
    
    public TrainDetailsPage selectTrainByName(String trainName) {
        WebElement train = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//div[@class='train-card'][.//h4[contains(text(),'" + 
                     trainName + "')]]//button[@class='book-btn']")
        ));
        train.click();
        return new TrainDetailsPage(driver);
    }
    
    // ========== FILTERING & SORTING ==========
    public void sortBy(String option) {
        Select sort = new Select(driver.findElement(sortByDropdown));
        sort.selectByVisibleText(option);
        waitForTrainResultsUpdate();
    }
    
    public void filterByDepartureTime(String timeRange) {
        driver.findElement(By.xpath(
            "//label[contains(text(),'" + timeRange + "')]"
        )).click();
        waitForTrainResultsUpdate();
    }
    
    private void waitForTrainResultsUpdate() {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.className("loading")
        ));
    }
    
    // ========== VERIFICATION ==========
    public int getTrainCount() {
        return driver.findElements(trainResults).size();
    }
    
    public List<String> getTrainNames() {
        return driver.findElements(trainResults).stream()
            .map(t -> t.findElement(By.tagName("h4")).getText())
            .collect(Collectors.toList());
    }
    
    @Override
    public boolean isPageLoaded() {
        return waitForVisible(searchBtn, 10).isDisplayed();
    }
}`}
        />
      </div>
    </section>
  );
};
