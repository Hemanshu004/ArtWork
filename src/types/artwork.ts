export interface Artwork {
    id: number;
    title: string;
    place_of_origin: string | null;
    artist_display: string | null;
    inscriptions: string | null;
    date_start: number | null;
    date_end: number | null;
}

export interface ApiResponse {
    pagination: {
        total: number;
        limit: number;
        current_page: number;
    };
    data: Artwork[];
}
