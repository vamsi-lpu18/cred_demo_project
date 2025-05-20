describe('Products Functionality', () => {
    beforeEach(async () => {
        await browser.url('http://localhost:3001/#products');
    });

    it('should display all products initially', async () => {
        const products = await $$('.product');
        expect(products.length).toBeGreaterThan(0);
    });

    it('should filter products by search term', async () => {
        const searchInput = await $('#search-input');
        const searchButton = await $('#search-btn');

        await searchInput.setValue('Laptop');
        await searchButton.click();

        const products = await $$('.product');
        const productText = await products[0].getText();
        expect(productText).toContain('Laptop Pro X1');
    });

    it('should show no results for non-existent product', async () => {
        const searchInput = await $('#search-input');
        const searchButton = await $('#search-btn');

        await searchInput.setValue('nonexistentproduct');
        await searchButton.click();

        const results = await $('#search-results');
        const resultsText = await results.getText();
        expect(resultsText).toBe('No products found');
    });

    it('should filter products by category', async () => {
        const searchInput = await $('#search-input');
        const searchButton = await $('#search-btn');

        await searchInput.setValue('Electronics');
        await searchButton.click();

        const products = await $$('.product');
        const productText = await products[0].getText();
        expect(productText).toContain('Electronics');
    });
}); 