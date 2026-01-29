import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const page = req.query.page || 1;

    try {
        const resp = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=12`);
        const data = await resp.json();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: 'api error' });
    }
}
