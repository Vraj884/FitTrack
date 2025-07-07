const { Builder, By, until } = require("selenium-webdriver");

(async function testReactApp() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // 1️⃣ Open your React website (Change URL if needed)
        await driver.get("http://localhost:3000/signup");

        // 2️⃣ Fill the 7 input fields (Change IDs if needed)
        const inputData = {
            "name": "TEST",
            "age": "20",
            "weight": "68",
            "email": "test@example.com",
            "countryCode": "1",
            "phone": "9998962346",
            "password": "10001"
        };

        for (let id in inputData) {
            let inputField = await driver.wait(until.elementLocated(By.id(id)), 5000);
            await inputField.sendKeys(inputData[id]);
        }

        // 3️⃣ Click the button that fetches something (Change 'fetch-button' if needed)
        let fetchButton = await driver.wait(until.elementLocated(By.id("signupbtn")), 5000);
        await fetchButton.click();

        

        console.log("✅ Test Passed: Successfully signed up");

    } catch (error) {
        console.error("❌ Test Failed:", error);
    } finally {
        // 5️⃣ Close the browser
        await driver.quit();
    }
})();
