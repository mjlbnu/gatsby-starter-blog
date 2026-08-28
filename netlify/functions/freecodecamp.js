const cheerio = require('cheerio');

function timeAgoFromISO(iso) {
  if (!iso) return '';
  const then = new Date(iso);
  const now = new Date();
  const diffSec = Math.floor((now - then) / 1000);
  if (diffSec < 60) return `${diffSec} second${diffSec === 1 ? '' : 's'} ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} hour${diffHour === 1 ? '' : 's'} ago`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth} month${diffMonth === 1 ? '' : 's'} ago`;
  const diffYear = Math.floor(diffDay / 365);
  return `${diffYear} year${diffYear === 1 ? '' : 's'} ago`;
}

async function getResume(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        const articleResumeText = $('.post-content > p:first').text().trim();
        return articleResumeText;
    } catch (error) {
        console.log(error);
        return '';
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

        const articlePromises = $('.post-card').map(async function () {
            const title = $(this).find('h2').text().trim();
            const imgLink = $(this).find('.post-card-image-link').find('img').attr('src');
            const url = `${baseUrl}${$(this).find('a').attr('href')}`;
            const tag = $(this).find('.post-card-tags').text().trim().replace('#', '');
            const author = $(this).find('.post-card-meta').find('.meta-content > a').text().trim();
            const authorImg = $(this).find('.post-card-meta').find('.static-avatar > img').attr('src');

            const timeEl = $(this).find('.post-card-meta').find('.meta-content > time');
            const date = timeEl.attr('datetime') || null;
            const timePassed = timeAgoFromISO(date);

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
