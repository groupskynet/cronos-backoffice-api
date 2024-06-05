import { Zone } from "../domain/Zone"
import { ZoneRepository } from "../domain/contracts/ZoneRepository"

export class DynamodbZoneRepository extends ZoneRepository{
    save(zone: Zone): Promise<void> {
        console.log(zone)
        throw new Error("Method not implemented.")
    }
    update(zone: Zone): Promise<void> {
        console.log(zone)
        throw new Error("Method not implemented.")
    }
    getFindbyId(id: string): Promise<Zone | null> {
        console.log(id)
        throw new Error("Method not implemented.")
    }

}