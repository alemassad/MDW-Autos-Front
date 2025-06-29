interface Location {
    name: string;
}
export interface Auto {
    id: number;
    name: string;
    status: string;
    image: string;
    gender: string;
    species: string;
    location: Location;
    url: string;
}