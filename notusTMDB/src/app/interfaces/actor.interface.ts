export interface ActorResponse {
    page:          number;
    results:       Actor[];
    total_pages:   number;
    total_results: number;
}

export interface Actor {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for:            FilmActor[];
    known_for_department: KnownForDepartment;
    name:                 string;
    popularity:           number;
    profile_path:         null | string;
}

export interface FilmActor {
    adult?:            boolean;
    genre_ids:         number[];
    id:                number;
    media_type:        MediaType;
    original_language: OriginalLanguage;
    original_title?:   string;
    overview:          string;
    poster_path:       string;
    release_date?:     string;
    title?:            string;
    video?:            boolean;
    vote_average:      number;
    vote_count:        number;
    backdrop_path?:    string;
    first_air_date?:   string;
    name?:             string;
    origin_country?:   string[];
    original_name?:    string;
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
}

export enum OriginalLanguage {
    En = "en",
    Ko = "ko",
    Tl = "tl",
}

export enum KnownForDepartment {
    Acting = "Acting",
    Directing = "Directing",
}
