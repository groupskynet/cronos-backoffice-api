import { Demography } from "@src/contexts/shared/domain/value_objects/Demography"
import { Club } from "./Club"
import { User } from "./User"
import { ZoneCurrency } from "./value_objects/zone/ZoneCurrency"
import { ZoneDto } from "./interfaces/ZoneDto"
import { DemographyDto } from "@contexts/shared/domain/interfaces/DemographyDto"
import { ZoneIn } from "./interfaces/ZoneIn"
import { InvalidArgumentError } from "@contexts/shared/domain/exceptions/InvalidArgumentError"
import { AggregateRoot } from "@contexts/shared/domain/AggregateRoot"

export class Zone extends AggregateRoot{
    private _currency: ZoneCurrency
    private _user: User
    private _clubs: Club[]
    private _demography: Demography

    constructor({id,currency,demography, user}: ZoneDto){
        super({id})
        this._currency = currency
        this._demography = demography
        this._user = user
        this._clubs = []
    }

    static create({id,demographyDto,userDto, currencyIn}: ZoneIn): Zone{
        const demography = new Demography(demographyDto)
        const user = User.create(userDto)
        const currency = new ZoneCurrency(currencyIn)

        const zone = new Zone({id,demography,user,currency})

        return zone
    }

    get demography(): Demography{
        return this._demography
    }
    get currency(): string{
        return this._currency.value
    }
    get user(): User{
        return this._user
    }
    get clubs(): Club[]{
        return this._clubs
    }

    public addClub(demographyDto: DemographyDto): void{

        const clubExist = this.clubs.find( x => x.demography.name.value === demographyDto.name)

        if(clubExist)
            throw new InvalidArgumentError(`The area already has a club with this name ${demographyDto.name}`)

        const club = Club.cereate({demographyDto})

        this._clubs.push(club)
    }
}