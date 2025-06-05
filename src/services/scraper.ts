import axios from 'axios';
import * as cheerio from 'cheerio';

export interface AuctionItem {
  title: string;
  url: string;
  price: number;
  description: string;
  timestamp: number;
  source: string;
}

export interface AuctionEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  itemCount: number;
  type: 'Live' | 'Timed' | 'Online';
  status: 'Upcoming' | 'In Progress' | 'Closed';
}

export interface Scraper {
  getAllInventory(): Promise<AuctionItem[]>;
}

class RBAuctionScraper {
  private baseUrl = 'https://www.rbauction.com';

  private async fetchPage(url: string) {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    return cheerio.load(response.data);
  }

  async getUpcomingAuctions(): Promise<AuctionEvent[]> {
    try {
      const $ = await this.fetchPage(`${this.baseUrl}/heavy-equipment-auctions`);
      const auctions: AuctionEvent[] = [];

      $('.auction-list-item').each((_, element) => {
        const $el = $(element);
        const id = $el.attr('data-auction-id') || String(Date.now());
        const title = $el.find('.auction-title').text().trim();
        const date = $el.find('.auction-date').text().trim();
        const location = $el.find('.auction-location').text().trim();
        const itemCountText = $el.find('.item-count').text().trim();
        const itemCount = parseInt(itemCountText.replace(/\D/g, '')) || 0;
        const typeText = $el.find('.auction-type').text().trim().toLowerCase();

        auctions.push({
          id,
          title,
          date,
          location,
          itemCount,
          type: typeText.includes('live') ? 'Live' : 
                typeText.includes('timed') ? 'Timed' : 'Online',
          status: 'Upcoming'
        });
      });

      return auctions;
    } catch (error) {
      console.error('Error fetching auctions:', error);
      return [];
    }
  }

  async getAuctionItems(auctionId: string): Promise<AuctionItem[]> {
    try {
      const $ = await this.fetchPage(`${this.baseUrl}/heavy-equipment-auction/${auctionId}`);
      const items: AuctionItem[] = [];

      $('.item-list-item').each((_, element) => {
        const $el = $(element);
        const id = $el.attr('data-item-id') || String(Date.now());
        const title = $el.find('.item-title').text().trim();
        const priceText = $el.find('.current-price').text().trim();
        const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
        const image = $el.find('img').attr('src') || '/placeholder-equipment.jpg';
        const condition = $el.find('.condition').text().trim() || 'Used';
        const location = $el.find('.item-location').text().trim();
        const lotNumber = $el.find('.lot-number').text().trim();
        const description = $el.find('.item-description').text().trim();
        const auctionDate = $el.find('.auction-date').text().trim();

        items.push({
          id,
          title,
          url: '',
          price,
          image,
          seller: 'Ritchie Bros. Auctioneers',
          condition,
          location,
          lotNumber,
          description,
          timestamp: Date.now(),
          source: 'Ritchie Bros. Auctioneers'
        });
      });

      return items;
    } catch (error) {
      console.error('Error fetching auction items:', error);
      return [];
    }
  }

  async getAllCurrentInventory(): Promise<AuctionItem[]> {
    try {
      const auctions = await this.getUpcomingAuctions();
      const allItems: AuctionItem[] = [];

      // Only process the first 3 auctions to avoid overwhelming the server
      for (const auction of auctions.slice(0, 3)) {
        const items = await this.getAuctionItems(auction.id);
        items.forEach(item => {
          item.auctionDate = auction.date;
        });
        allItems.push(...items);
      }

      return allItems;
    } catch (error) {
      console.error('Error getting all inventory:', error);
      return [];
    }
  }
}

export const rbAuctionScraper = new RBAuctionScraper(); 