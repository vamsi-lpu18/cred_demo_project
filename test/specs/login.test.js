describe('Login Functionality', () => {
    beforeEach(async () => {
        await browser.url('http://localhost:3001/#login');
        // Wait for the login form to be visible
        await $('#login-form').waitForDisplayed({ timeout: 15000 });
    });

    it('should show error message with empty fields', async () => {
        const loginButton = await $('#login-form button[type="submit"]');
        await loginButton.waitForClickable();
        await loginButton.click();
        
        // Wait for alert and verify its text
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Please fill in all fields');
        await browser.acceptAlert();
    });

    it('should successfully login with valid credentials', async () => {
        const usernameInput = await $('#username');
        const passwordInput = await $('#password');
        const loginButton = await $('#login-form button[type="submit"]');

        await usernameInput.waitForDisplayed();
        await passwordInput.waitForDisplayed();
        await loginButton.waitForClickable();

        await usernameInput.setValue('testuser');
        await passwordInput.setValue('password123');
        await loginButton.click();

        // Wait for alert and verify its text
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Login successful!');
        await browser.acceptAlert();

        // Verify form is reset
        const usernameValue = await usernameInput.getValue();
        const passwordValue = await passwordInput.getValue();
        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');
    });
}); 