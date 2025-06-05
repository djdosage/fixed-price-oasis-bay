import { rbAuctionScraper } from './services/scraper';

async function testScraper() {
  console.log('Starting scraper test...');
  
  try {
    console.log('Fetching upcoming auctions...');
    const auctions = await rbAuctionScraper.getUpcomingAuctions();
    console.log(`Found ${auctions.length} auctions`);
    
    if (auctions.length > 0) {
      console.log('\nFirst auction:', JSON.stringify(auctions[0], null, 2));
      
      console.log('\nFetching items from first auction...');
      const items = await rbAuctionScraper.getAuctionItems(auctions[0].id);
      console.log(`Found ${items.length} items`);
      
      if (items.length > 0) {
        console.log('\nFirst item:', JSON.stringify(items[0], null, 2));
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during scraping:', error.message);
    } else {
      console.error('Unknown error during scraping');
    }
  }
}

testScraper(); 