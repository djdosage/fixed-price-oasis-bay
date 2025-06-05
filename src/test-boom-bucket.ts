import { boomBucketScraper } from './services/boomBucketScraper';

async function testScraper() {
  console.log('Starting Boom & Bucket scraper test...');
  
  try {
    console.log('Fetching inventory...');
    const items = await boomBucketScraper.getAllInventory();
    console.log(`Found ${items.length} items`);
    
    if (items.length > 0) {
      console.log('\nFirst item:', JSON.stringify(items[0], null, 2));
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