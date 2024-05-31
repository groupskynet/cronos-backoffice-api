import { EntityId } from "./value_objects/EntityId"

export abstract class Entity{
    private _id: EntityId
    constructor({id}: {id: string}) {
        this._id = new EntityId(id)
    }

    get id(): string{
        return this._id.value
    }
}