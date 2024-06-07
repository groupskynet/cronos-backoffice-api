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
    toPrimitives(): unknown {
        throw new Error("Method not implemented.")
    }
    private _currency: ZoneCurrency
    private _balance: number
    private _user: User
    private _clubs: Club[]
    private _demography: Demography

    constructor({id,currency,demography, user}: ZoneDto){
        super({id})
        this._currency = currency
        this._demography = demography
        this._user = user
        this._clubs = []
        this._balance = 0
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
    get balance(): number{
        return this._balance
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

    public editBalance(newBalance: number, isAdd: boolean, clubId: string = ''): void{

        if(newBalance <= 0) throw new InvalidArgumentError(`The new balance incorrect, must be positive`)

        if(isAdd && clubId && (this._balance - newBalance) < 0) throw new InvalidArgumentError(`The balance of the zone cannot be negative`)

        if(clubId){
            this.editBalanceClub(newBalance,isAdd,clubId)
        }else{
            if(isAdd){
                this._balance += newBalance
            }else{
                this._balance -= newBalance
            }
        }
        
    }

    private editBalanceClub(newBalance: number, isAdd: boolean, clubId: string){

        const club = this._clubs.find( x => x.id === clubId)
        
        if(!club) throw new InvalidArgumentError(`Club ${clubId} was not found`)
        
        if(isAdd){
            club.addBalance(newBalance)
        }else{
            club.substractBalance(newBalance)
        }
        this._clubs = this._clubs.filter( x => x.id !== clubId)
        this._clubs.push(club)
        this.editBalance(newBalance,!isAdd)
    }
}

