import puppeteer from 'puppeteer';
import { AuctionItem } from './scraper';

class MascusScraper {
  private baseUrl = 'https://www.mascus.com';

  async getAllInventory(): Promise<AuctionItem[]> {
    try {
      console.log('Launching browser...');
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
      
      // Navigate to the excavators page
      console.log('Navigating to Mascus excavators page...');
      await page.goto(`${this.baseUrl}/construction-equipment/used-excavators`, {
        waitUntil: 'networkidle0'
      });

      // Wait for the product grid to load
      await page.waitForSelector('.product-grid', { timeout: 10000 });

      console.log('Extracting product data...');
      const items: AuctionItem[] = [];

      // Get all products from the current page
      const products = await page.evaluate(() => {
        const productElements = document.querySelectorAll('.product-item');
        return Array.from(productElements).map(element => {
          const titleElement = element.querySelector('.product-item__title');
          const priceElement = element.querySelector('.product-item__price');
          const descriptionElement = element.querySelector('.product-item__description');
          const linkElement = element.querySelector('a.product-item__link');
          const locationElement = element.querySelector('.product-item__location');
          const yearElement = element.querySelector('.product-item__year');

          return {
            title: titleElement ? titleElement.textContent?.trim() : '',
            price: priceElement ? parseFloat(priceElement.textContent?.replace(/[^0-9.]/g, '') || '0') : 0,
            description: descriptionElement ? descriptionElement.textContent?.trim() : '',
            url: linkElement ? linkElement.getAttribute('href') : '',
            location: locationElement ? locationElement.textContent?.trim() : '',
            year: yearElement ? yearElement.textContent?.trim() : ''
          };
        });
      });

      // Process the products
      for (const product of products) {
        if (product.title && product.url) {
          items.push({
            title: `${product.year ? product.year + ' ' : ''}${product.title}`,
            url: product.url.startsWith('http') ? product.url : this.baseUrl + product.url,
            price: product.price,
            description: `Location: ${product.location}\n${product.description}`,
            timestamp: Date.now(),
            source: 'mascus'
          });
        }
      }

      // Check for pagination
      const hasNextPage = await page.evaluate(() => {
        const nextButton = document.querySelector('.pagination__next:not(.disabled)');
        return !!nextButton;
      });

      let currentPage = 1;
      const maxPages = 5;

      while (hasNextPage && currentPage < maxPages) {
        console.log(`Navigating to page ${currentPage + 1}...`);
        await page.click('.pagination__next');
        await page.waitForSelector('.product-grid', { timeout: 10000 });

        // Get products from the next page
        const nextPageProducts = await page.evaluate(() => {
          const productElements = document.querySelectorAll('.product-item');
          return Array.from(productElements).map(element => {
            const titleElement = element.querySelector('.product-item__title');
            const priceElement = element.querySelector('.product-item__price');
            const descriptionElement = element.querySelector('.product-item__description');
            const linkElement = element.querySelector('a.product-item__link');
            const locationElement = element.querySelector('.product-item__location');
            const yearElement = element.querySelector('.product-item__year');

            return {
              title: titleElement ? titleElement.textContent?.trim() : '',
              price: priceElement ? parseFloat(priceElement.textContent?.replace(/[^0-9.]/g, '') || '0') : 0,
              description: descriptionElement ? descriptionElement.textContent?.trim() : '',
              url: linkElement ? linkElement.getAttribute('href') : '',
              location: locationElement ? locationElement.textContent?.trim() : '',
              year: yearElement ? yearElement.textContent?.trim() : ''
            };
          });
        });

        // Process the products from the next page
        for (const product of nextPageProducts) {
          if (product.title && product.url) {
            items.push({
              title: `${product.year ? product.year + ' ' : ''}${product.title}`,
              url: product.url.startsWith('http') ? product.url : this.baseUrl + product.url,
              price: product.price,
              description: `Location: ${product.location}\n${product.description}`,
              timestamp: Date.now(),
              source: 'mascus'
            });
          }
        }

        currentPage++;

        // Check if there's another page
        const hasMorePages = await page.evaluate(() => {
          const nextButton = document.querySelector('.pagination__next:not(.disabled)');
          return !!nextButton;
        });

        if (!hasMorePages) break;

        // Add a small delay between pages
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      await browser.close();
      console.log('Finished scraping');
      return items;
    } catch (error) {
      console.error('Error fetching Mascus inventory:', error);
      return [];
    }
  }
}

export const mascusScraper = new MascusScraper(); 