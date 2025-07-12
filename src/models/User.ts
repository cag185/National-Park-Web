// A temporary Location model.
// export interface Location {
//     id: string
//     name: string
// }
import { Location } from './Location';

export class User {
    name: string
    existingLocations: Location[] = []
    newLocations: Location[] = []

    constructor(name: string, existingLocations?: Location[], newLocations?: Location[]) {
        this.name = name;
        this.existingLocations = existingLocations || [];
        this.newLocations = newLocations || [];
    }

    addNewLocation(location: Location): void {
        if (!this.newLocations.some(loc => loc.id === location.id)) 
        {
            this.newLocations.push(location);
        }
    }

    addExisitngLocation(location: Location): void {
        if (!this.existingLocations.some(loc => loc.id === location.id)) 
        {
            this.existingLocations.push(location);
        }

        // Check if this location is already in newLocations, then remove from new and add to exisiting.
        if(this.newLocations.some(loc => loc.id === location.id)) 
        {
            // removes the location from new.
            this.removeLocation(location, true);
        }
    }

    removeLocation(location: Location, removeFromNew: boolean): void {
        if (removeFromNew) {
            this.newLocations = this.newLocations.filter(loc => loc.id !== location.id);
        }
        else {
        this.existingLocations = this.existingLocations.filter(loc => loc.id !== location.id);
        }
    }
}