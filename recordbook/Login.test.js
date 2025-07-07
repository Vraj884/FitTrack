const { Builder, By, until, Key } = require("selenium-webdriver");

(async function testReactApp() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // 1️⃣ Open your React website (Change URL if needed)
        await driver.get("http://localhost:3000/Login");

        // 2️⃣ Wait for and fill the first input field (Change 'email-input' if needed)
        let emailField = await driver.wait(until.elementLocated(By.id("email")), 5000);
        await emailField.sendKeys("vraj884@yahoo.com");

        // 3️⃣ Wait for and fill the second input field (Change 'password-input' if needed)
        let passwordField = await driver.wait(until.elementLocated(By.id("password")), 5000);
        await passwordField.sendKeys("884884");

        // 4️⃣ Click the button that fetches something (Change 'fetch-button' if needed)
        let fetchButton = await driver.wait(until.elementLocated(By.id("loginbtn")), 5000);
        await fetchButton.click();

    

        console.log("✅ Test Passed: Successfully Login!");

    } catch (error) {
        console.error("❌ Test Failed:", error);
    } finally {
        // 6️⃣ Close the browser
        await driver.quit();
    }
})();
