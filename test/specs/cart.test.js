describe('Cart Functionality', () => {
    beforeEach(async () => {
        await browser.url('http://localhost:3001/#products');
        
        // Wait for search form to be visible
        const searchInput = await $('#search-input');
        const searchButton = await $('#search-btn');
        await searchInput.waitForDisplayed();
        await searchButton.waitForClickable();
        
        await searchInput.setValue('Laptop');
        await searchButton.click();
        
        const addToCartButton = await $('.product button');
        await addToCartButton.waitForClickable();
        await addToCartButton.click();
    });

    it('should add product to cart', async () => {
        await browser.url('http://localhost:3001/#cart');
        const cartItems = await $('#cart-items');
        await cartItems.waitForDisplayed();
        const cartText = await cartItems.getText();
        expect(cartText).toContain('Laptop Pro X1');
        expect(cartText).toContain('1299.99');
    });

    it('should update product quantity', async () => {
        await browser.url('http://localhost:3001/#cart');
        
        // Wait for cart items to be visible
        const cartItems = await $('#cart-items');
        await cartItems.waitForDisplayed();
        
        // Increase quantity
        const increaseButton = await $('.btn-quantity:nth-child(3)');
        await increaseButton.waitForClickable();
        await increaseButton.click();
        
        // Wait for quantity to update
        const quantity = await $('.quantity');
        await quantity.waitForDisplayed();
        await browser.pause(1000); // Add delay to ensure DOM updates
        const quantityText = await quantity.getText();
        expect(quantityText).toBe('2');
        
        // Check total amount
        const totalAmount = await $('#total-amount');
        await totalAmount.waitForDisplayed();
        const totalText = await totalAmount.getText();
        expect(totalText).toBe('2599.98');
    });

    it('should remove product from cart', async () => {
        await browser.url('http://localhost:3001/#cart');
        
        // Wait for cart items to be visible
        const cartItems = await $('#cart-items');
        await cartItems.waitForDisplayed();
        
        const removeButton = await $('.btn-remove');
        await removeButton.waitForClickable();
        await removeButton.click();
        
        // Wait for cart to update
        await browser.pause(1000);
        await cartItems.waitForDisplayed();
        const cartText = await cartItems.getText();
        expect(cartText).toBe('');
        
        const totalAmount = await $('#total-amount');
        await totalAmount.waitForDisplayed();
        const totalText = await totalAmount.getText();
        expect(totalText).toBe('0.00');
    });

    it('should show empty cart message on checkout', async () => {
        await browser.url('http://localhost:3001/#cart');
        
        // Wait for cart items to be visible
        const cartItems = await $('#cart-items');
        await cartItems.waitForDisplayed();
        
        // Remove all items
        const removeButton = await $('.btn-remove');
        await removeButton.waitForClickable();
        await removeButton.click();

        // Try to checkout
        const checkoutButton = await $('#checkout-btn');
        await checkoutButton.waitForClickable();
        await checkoutButton.click();

        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Your cart is empty!');
        await browser.acceptAlert();
    });

    it('should complete checkout successfully', async () => {
        await browser.url('http://localhost:3001/#cart');
        
        // Wait for cart items to be visible
        const cartItems = await $('#cart-items');
        await cartItems.waitForDisplayed();
        
        const checkoutButton = await $('#checkout-btn');
        await checkoutButton.waitForClickable();
        await checkoutButton.click();

        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Checkout successful! Thank you for your purchase.');
        await browser.acceptAlert();

        // Wait for cart to update
        await browser.pause(1000);
        
        // Verify cart is empty
        await cartItems.waitForDisplayed();
        const cartText = await cartItems.getText();
        expect(cartText).toBe('');

        const totalAmount = await $('#total-amount');
        await totalAmount.waitForDisplayed();
        const totalText = await totalAmount.getText();
        expect(totalText).toBe('0.00');
    });
}); 