import axios from 'axios';
import { AuctionItem } from './scraper';

class JMWoodScraper {
  private baseUrl = 'https://www.jmwood.com/api';

  async getAllInventory(): Promise<AuctionItem[]> {
    try {
      console.log('Fetching inventory from JM Wood API...');
      
      // First get the auction list
      const auctionListResponse = await axios.post(`${this.baseUrl}/auctions/list`, {
        status: 'active',
        type: 'construction',
        page: 1,
        limit: 100
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      console.log('Got auction list, fetching inventory...');
      const items: AuctionItem[] = [];

      if (auctionListResponse.data.auctions) {
        for (const auction of auctionListResponse.data.auctions) {
          if (auction.title.includes('Annual')) {
            console.log('Found auction:', auction.title);

            // Get the auction inventory
            const inventoryResponse = await axios.post(`${this.baseUrl}/auctions/${auction.id}/inventory`, {
              page: 1,
              limit: 100,
              sort: 'lot_number',
              order: 'asc'
            }, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'X-Requested-With': 'XMLHttpRequest'
              }
            });

            if (inventoryResponse.data.items) {
              items.push(...inventoryResponse.data.items.map((item: any) => ({
                title: `${auction.title} - ${item.title}`,
                url: `${this.baseUrl}/auctions/${auction.id}/lots/${item.lot_number}`,
                price: item.current_bid || 0,
                description: `Date: ${auction.start_date}\nLocation: ${auction.location}\n${item.description}`,
                timestamp: Date.now(),
                source: 'jmwood'
              })));
            }
          }
        }
      }

      return items;
    } catch (error) {
      console.error('Error fetching JM Wood inventory:', error);
      return [];
    }
  }
}

export const jmWoodScraper = new JMWoodScraper(); 