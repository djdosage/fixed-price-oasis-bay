import axios from 'axios';
import * as cheerio from 'cheerio';
import { AuctionItem } from './scraper';

class BoomBucketScraper {
  private baseUrl = 'https://www.boomandbucket.com';

  private async fetchPage(url: string) {
    try {
      const response = await axios.get(url, {
        headers: {
          'Accept': 'text/html',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });
      return cheerio.load(response.data);
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  }

  async getAllInventory(): Promise<AuctionItem[]> {
    try {
      const items: AuctionItem[] = [];
      let currentPage = 1;
      let hasNextPage = true;

      while (hasNextPage && currentPage <= 5) { // Limit to 5 pages for testing
        const $ = await this.fetchPage(`${this.baseUrl}/equipment?page=${currentPage}`);
        console.log(`Scraping page ${currentPage}...`);

        // Find equipment listings
        $('.equipment-listing').each((_, element) => {
          const $el = $(element);
          
          // Extract basic information
          const title = $el.find('.equipment-title').text().trim();
          const priceText = $el.find('.equipment-price').text().trim();
          const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
          const image = $el.find('.equipment-image img').attr('src') || '/placeholder-equipment.jpg';
          const location = $el.find('.equipment-location').text().trim();
          const condition = $el.find('.equipment-condition').text().trim() || 'Used';
          const description = $el.find('.equipment-description').text().trim();
          const link = $el.find('a').attr('href') || '';
          
          // Generate a unique ID
          const id = `bb-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

          items.push({
            id,
            title,
            url: `https://www.boomandbucket.com${link}`,
            price,
            image,
            seller: 'Boom & Bucket',
            condition,
            location,
            lotNumber: '',
            description,
            timestamp: Date.now(),
            source: 'Boom & Bucket',
            auctionDate: new Date().toLocaleDateString() // Current date since these are direct sales
          });
        });

        // Check if there's a next page
        hasNextPage = $('.pagination .next').length > 0;
        currentPage++;

        // Add a small delay between requests to be polite
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      return items;
    } catch (error) {
      console.error('Error getting inventory:', error);
      return [];
    }
  }
}

export const boomBucketScraper = new BoomBucketScraper(); 