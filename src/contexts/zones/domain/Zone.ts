import { Demography } from "@src/contexts/shared/domain/value_objects/Demography";
import { Club } from "./Club";
import { User } from "./User";
import { ZoneCurrency } from "./value_objects/zone/ZoneCurrency";
import { ZoneDto } from "./interfaces/ZoneDto";

export class Zone{
    private currency: ZoneCurrency;
    private user: User;
    private clubs: Club[];
    private demography: Demography;

    constructor({currency,demography, user}: ZoneDto){
        this.currency = currency;
        this.demography = demography;
        this.user = user;
        this.clubs = [];
    }

}