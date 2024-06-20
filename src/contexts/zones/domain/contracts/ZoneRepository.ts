import { Zone } from "../Zone"

export abstract class ZoneRepository{
    abstract saveOrUpdate(zone: Zone): Promise<void>;
    abstract getFindbyId(id: string): Promise<Zone|null>;
}