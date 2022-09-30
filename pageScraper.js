const scraperObject = {
    url: 'https://lol.fandom.com/wiki/LCS/2022_Season/Summer_Season',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url, { waitUntil: 'load', timeout: 0 });
        await page.waitForSelector('.main-container');
        let team = await page.$$eval('.wide-content-scroll .wikitable tbody tr td span .teamname', res => {
            res = res.map(el => el.innerText)
            return res;
        })
        let winner = await page.$$eval('.wide-content-scroll .wikitable tbody tr .md-winner', res => {
            res = res.map(el => el.innerText)
            return res;
        })
        let game = {};
        for(let i = 0; i < team.length; i++) {
            let position = team.length - i;
            if(i % 2 == 0) {
                game['game' + (i / 2 + 1)] =
                {
                    "team1": team[i],
                    "team2": team[i + 1],
                    "winner": winner[(i / 2)]
                }
            }
        }
        console.log(team.length);
        console.log(game);
	}
}

module.exports = scraperObject;