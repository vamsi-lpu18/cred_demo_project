describe('Navigation Functionality', () => {
    beforeEach(async () => {
        await browser.url('http://localhost:3001');
    });

    it('should navigate to products section', async () => {
        const productsLink = await $('a[data-section="products"]');
        await productsLink.click();
        
        const productsSection = await $('#products-section');
        const isDisplayed = await productsSection.isDisplayed();
        expect(isDisplayed).toBe(true);
        
        const url = await browser.getUrl();
        expect(url).toContain('#products');
    });

    it('should navigate to cart section', async () => {
        const cartLink = await $('a[data-section="cart"]');
        await cartLink.click();
        
        const cartSection = await $('#cart-section');
        const isDisplayed = await cartSection.isDisplayed();
        expect(isDisplayed).toBe(true);
        
        const url = await browser.getUrl();
        expect(url).toContain('#cart');
    });

    it('should navigate to home section', async () => {
        const homeLink = await $('a[data-section="home"]');
        await homeLink.click();
        
        const homeSection = await $('#home-section');
        const isDisplayed = await homeSection.isDisplayed();
        expect(isDisplayed).toBe(true);
        
        const url = await browser.getUrl();
        expect(url).toContain('#home');
    });

    it('should maintain active state in navigation', async () => {
        const productsLink = await $('a[data-section="products"]');
        await productsLink.click();
        
        const isActive = await productsLink.getAttribute('class');
        expect(isActive).toContain('active');
        
        const cartLink = await $('a[data-section="cart"]');
        await cartLink.click();
        
        const cartIsActive = await cartLink.getAttribute('class');
        expect(cartIsActive).toContain('active');
        
        const productsIsNotActive = await productsLink.getAttribute('class');
        expect(productsIsNotActive).not.toContain('active');
    });
}); 