import { Zone } from "../Zone"

export abstract class ZoneRepository{
    abstract save(zone: Zone): Promise<void>;
    abstract update(zone: Zone): Promise<void>;
    abstract getFindbyId(id: string): Promise<Zone|null>;
}