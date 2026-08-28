const cheerio = require('cheerio');

async function getResume(url) {
    try {
        const response = await await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        const articleResumeText = $('.post-content > p:first').text().trim();
        return articleResumeText;
    } catch (error) {
        console.log(error);
    }
}

exports.handler = async function() {
    const baseUrl = 'https://www.freecodecamp.org'
    const path = '/news'
    try {
        const response = await fetch(`${baseUrl}${path}`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const articlePromises = $('.post-card', html).map(async function () {
            const title = $(this).find('h2').text().trim();
            const imgLink = $(this).find('.post-card-image-link').find('img').attr('src');
            const url = `${baseUrl}${$(this).find('a').attr('href')}`;
            const tag = $(this).find('.post-card-tags').text().trim().replace('#', '');
            const author = $(this).find('.post-card-meta').find('.meta-content > a').text().trim();
            const authorImg = $(this).find('.post-card-meta').find('.static-avatar > img').attr('src');
            const timePassed = $(this).find('.post-card-meta').find('.meta-content > time').text().trim();
            const date = $(this).find('.post-card-meta').find('.meta-content > time').attr('datetime');

            const resume = await getResume(url);

            return {
                title,
                imgLink,
                url,
                tag,
                author,
                authorImg,
                date,
                timePassed,
                resume,
            };
        }).get();

        const articlesData = await Promise.all(articlePromises);

        return {
            statusCode: 200,
            body: JSON.stringify(articlesData),
        };
    } catch (error) {
        console.error('Error fetching FreeCodeCamp data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch FreeCodeCamp data' }),
        };
    }
};