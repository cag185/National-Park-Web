import axios from 'axios';
import { apiKey } from '@/secrets/keys.json';
import { Location } from '@/models/Location';
const API_BASE_URL = 'https://developer.nps.gov/api/v1/';
const API_KEY = apiKey;

export const getParks = async (): Promise<Location[]> => {
    const { data } = await axios.get(`${API_BASE_URL}parks`, {
        params: {
            api_key: API_KEY,
            limit: 300 // Adjust limit as needed
        },
    });

    const parks = data.data
        .filter((park: any) => park.designation === 'National Park')
        .map((park: any) => new Location(
            park.id,
            park.fullName,
            park.description,
            park.images?.[0]?.url || '',
            parseFloat(park.latitude),
            parseFloat(park.longitude)
        ));

    return parks;
};