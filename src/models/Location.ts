export class Location {
    id: string
    name: string
    description?: string
    imageUrls?: string[]
    latitude?: number
    longitude?: number

    constructor(
        id: string, 
        name: string,
        description?: string, 
        imageUrls?: string[], 
        latitude?: number, 
        longitude?: number
    )
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrls = imageUrls || [];
        this.latitude = latitude;
        this.longitude = longitude;
    }
}