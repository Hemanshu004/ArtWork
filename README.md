# Artwork Browser

This project displays artwork data using the Art Institute of Chicago API.

Pagination is handled server-side. Data is fetched only for the active page and
previous page data is discarded intentionally.

Row selection persists across pages using an ID-based approach.
Only selected and explicitly deselected IDs are tracked.
No data from other pages is prefetched or remembered.

The custom selection overlay applies selection only to the currently visible rows.
If the input exceeds the page size, it is clamped intentionally to avoid extra API calls.

This was done to strictly follow the assignment constraints.

## Limitations

- Selection does not infer future pages.
- Data is always fetched fresh when revisiting a page.

## Run locally

Backend:
```
cd server
npm install
npm run dev
```

Frontend:
```
cd client
npm install
npm run dev
```

Open http://localhost:5173
