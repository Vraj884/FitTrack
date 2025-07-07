// const { Builder, By, until } = require("selenium-webdriver");

// (async function testReactApp() {
//     let driver = await new Builder().forBrowser("chrome").build();

//     try {
//         // 1️⃣ Open your React website (Change URL if needed)
//         await driver.get("http://localhost:3000/profile");

//         // 2️⃣ Define the 7 input fields and their values
//         const inputData = [
//             "name",
//             "age",
//             "weight",
//             "email",
//             "countryCode",
//             "phone",
//             "password"
//         ]

//         // // 3️⃣ Fill the input fields
//         // for (let id in inputData) {
//         //     let inputField = await driver.wait(until.elementLocated(By.id(id)), 5000);
//         //     await inputField.sendKeys(inputData[id]);
//         // }

//         // 4️⃣ Check that all input fields are not empty
//         for (let id in inputData) {
//             let inputField = await driver.findElement(By.id(id));
//             let value = await inputField.getAttribute("value");

//             if (!value) {
//                 throw new Error(`❌ Test Failed: Input field '${id}' is empty!`);
//             }
//         }

//         console.log("✅ Test Passed: All input fields are filled!");

//         // 5️⃣ Click the button that fetches something (Change 'fetch-button' if needed)
//         let fetchButton = await driver.wait(until.elementLocated(By.id("fetch-button")), 5000);
//         await fetchButton.click();

//         // 6️⃣ Wait for the fetched result to appear (Change 'result-output' if needed)
//         let result = await driver.wait(until.elementLocated(By.id("result-output")), 5000);
//         let resultText = await result.getText();

//         console.log("✅ Test Passed: Data fetched successfully!");
//         console.log("Fetched Result:", resultText);

//     } catch (error) {
//         console.error("❌ Test Failed:", error);
//     } finally {
//         // 7️⃣ Close the browser
//         await driver.quit();
//     }
// })();
const { Builder, By, until } = require("selenium-webdriver");

(async function testReactApp() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // 1️⃣ Open your React website (Change URL if needed)
        await driver.get("http://localhost:3000/login");
        let emailField = await driver.wait(until.elementLocated(By.id("email")), 5000);
        await emailField.sendKeys("vraj884@yahoo.com");

        // 3️⃣ Wait for and fill the second input field (Change 'password-input' if needed)
        let passwordField = await driver.wait(until.elementLocated(By.id("password")), 5000);
        await passwordField.sendKeys("884884");

        // 2️⃣ Click the button that performs a task (Change 'task-button' if needed)
        let taskButton = await driver.wait(until.elementLocated(By.id("loginbtn")), 5000);
        await taskButton.click();
        console.log("✅ Task button clicked!");

        // 3️⃣ Wait for task completion (Modify as per your app's behavior)
        await driver.sleep(3000); // Wait for 3 seconds (Adjust as needed)

        console.log("⚡ Please manually change the URL in the browser...");

        // 4️⃣ Wait for the user to navigate to a specific URL
        let expectedUrl = "http://localhost:3000/profile"; // Change as needed
        await driver.wait(async () => {
            let currentUrl = await driver.getCurrentUrl();
            return currentUrl === expectedUrl;
        }, 60000); // Wait up to 60 seconds

        console.log("✅ URL changed successfully!");

        // 5️⃣ Define the 7 input fields on the new page
        const inputData = [
            "name",
            "age",
            "weight",
            "email",
            "countryCode",
            "phone"        ];

        // 6️⃣ Check that all input fields are not empty
        for (let id of inputData) {
            let inputField = await driver.wait(until.elementLocated(By.id(id)), 5000);
            let value = await inputField.getAttribute("value");

            if (!value) {
                throw new Error(`❌ Test Failed: Input field '${id}' is empty!`);
            }
        }

        console.log("✅ Test Passed: All input fields are filled!");

    } catch (error) {
        console.error("❌ Test Failed:", error);
    } finally {
        // 7️⃣ Close the browser
        await driver.quit();
    }
})();

