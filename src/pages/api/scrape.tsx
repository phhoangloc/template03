// pages/api/scrape.js

import { NextApiRequest, NextApiResponse } from 'next';
const Parser = require('rss-parser');
const parser = new Parser();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const rssUrl = req.query.rss

    try {
        const feed = await parser.parseURL(rssUrl);
        const data: any[] = []
        feed.items.forEach((item: any) => {
            const body = { title: item.title, link: item.link, content: item.contentSnippet, pubDate: item.pubDate }
            data.push(body)
        });

        res.json(data)
    } catch (error) {
        res.send('error!');
    }
};
