import { Maybe } from "@contexts/shared/domain/Maybe"
import { Demography } from "@contexts/shared/domain/value_objects/Demography"
import { Uuid } from "@contexts/shared/domain/value_objects/Uuid"

export interface CLubDto {
    id: string
    demography: Demography
    recorders: Maybe<Uuid[]>
    balance: number
}