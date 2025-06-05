import { mascusScraper } from './services/mascusScraper';

async function testScraper() {
  console.log('Testing Mascus scraper...');
  
  try {
    console.log('Fetching inventory...');
    const items = await mascusScraper.getAllInventory();
    console.log(`Found ${items.length} items`);
    
    if (items.length > 0) {
      console.log('\nFirst item:', JSON.stringify(items[0], null, 2));
    }
  } catch (error) {
    console.error('Error during scraping:', error);
  }
}

testScraper(); 