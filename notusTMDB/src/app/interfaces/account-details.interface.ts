export interface AccountDetailsResponse {
    avatar:        Avatar;
    id:            number;
    iso_639_1:     string;
    iso_3166_1:    string;
    name:          string;
    include_adult: boolean;
    username:      string;
}

export interface Avatar {
    gravatar: Gravatar;
    tmdb:     Ruta;
}

export interface Gravatar {
    hash: string;
}

export interface Ruta {
    avatar_path: string;
}
