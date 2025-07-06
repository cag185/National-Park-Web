export class Location {
    id: string
    name: string
    description?: string
    imageUrl?: string
    latitude?: number
    longitude?: number

    constructor(
        id: string, 
        name: string,
        description?: string, 
        imageUrl?: string, 
        latitude?: number, 
        longitude?: number
    )
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}