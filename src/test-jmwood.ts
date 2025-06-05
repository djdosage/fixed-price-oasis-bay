import { jmWoodScraper } from './services/jmWoodScraper';

async function testScraper() {
  console.log('Testing JM Wood scraper...');
  
  try {
    console.log('Fetching inventory...');
    const items = await jmWoodScraper.getAllInventory();
    console.log(`Found ${items.length} items`);
    
    if (items.length > 0) {
      console.log('\nFirst item:', JSON.stringify(items[0], null, 2));
    }
  } catch (error) {
    console.error('Error during scraping:', error);
  }
}

testScraper(); 