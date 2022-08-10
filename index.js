const puppeteer = require('puppeteer');
const { config, browserConfig } = require('./config.js');

(async () => {
	try {
		/**
		 * Default settings for the browser window size and viewport
		 */
		const browser = await puppeteer.launch(browserConfig);
		const page = await browser.newPage();
		await page.goto('https://quotes.toscrape.com/');

		/**
		 * Getting DOM elements from the page
		 */
		const quotes = await getQuotes(page);
		console.log(JSON.stringify(quotes, null, '  '));

		/**
		 * Clicking on elements and filling in forms
		 */
		login(page);

		// await browser.close();
	} catch (err) {
		console.log(err);
	}
})();

async function login(page) {
	await page.click('a[href="/login"]');
	await page.type('#username', 'jayjay');
	await page.type('#password', '123123');
	await page.click('input[value="Login"]');
}

async function getQuotes(page) {
	const quotes = await page.evaluate(() => {
		const data = [];
		const quotes = document.querySelectorAll('div.quote');
		quotes.forEach((quote) => {
			const text = quote.querySelector('.text').innerText;
			const author = quote.querySelector('span small.author').innerText;
			const domTags = quote.querySelectorAll('a.tag');
			const tags = [];
			domTags.forEach((tag) => {
				tags.push(tag.innerText);
			});

			data.push({ quote: { text, author, tags } });
		});
		return data;
	});

	return quotes;
}
