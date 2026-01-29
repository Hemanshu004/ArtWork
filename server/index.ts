import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/artworks', async (req, res) => {
    const page = req.query.page || 1;

    try {
        const resp = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=12`);
        const data = await resp.json();
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'api error' });
    }
});

app.listen(3001, () => {
    console.log('running on 3001');
});
