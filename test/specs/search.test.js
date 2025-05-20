describe('Search Functionality', () => {
    beforeEach(async () => {
        await browser.url('http://localhost:3001/#products');
        // Wait for the search form to be visible
        await $('#search-input').waitForDisplayed();
    });

    it('should show no results for non-existent product', async () => {
        const searchInput = await $('#search-input');
        const searchButton = await $('#search-btn');

        await searchInput.waitForDisplayed();
        await searchButton.waitForClickable();

        await searchInput.setValue('nonexistentproduct');
        await searchButton.click();

        const results = await $('#search-results');
        await results.waitForDisplayed();
        const resultsText = await results.getText();
        expect(resultsText).toBe('No products found');
    });

    it('should find products matching search term', async () => {
        const searchInput = await $('#search-input');
        const searchButton = await $('#search-btn');

        await searchInput.waitForDisplayed();
        await searchButton.waitForClickable();

        await searchInput.setValue('Laptop');
        await searchButton.click();

        const results = await $('#search-results');
        await results.waitForDisplayed();
        const resultsText = await results.getText();
        expect(resultsText).toContain('Laptop');
        expect(resultsText).toContain('1299.99');
    });

    it('should add product to cart from search results', async () => {
        const searchInput = await $('#search-input');
        const searchButton = await $('#search-btn');

        await searchInput.waitForDisplayed();
        await searchButton.waitForClickable();

        await searchInput.setValue('Laptop');
        await searchButton.click();

        const addToCartButton = await $('.product button');
        await addToCartButton.waitForClickable();
        await addToCartButton.click();

        await browser.url('http://localhost:3001/#cart');
        const cartItems = await $('#cart-items');
        await cartItems.waitForDisplayed();
        const cartText = await cartItems.getText();
        expect(cartText).toContain('Laptop');
        expect(cartText).toContain('1299.99');
    });
}); 