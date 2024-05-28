import { Currency } from '../../../../shared/domain/Money';

export class ZoneCurrency{
    readonly value: Currency;
    constructor(value: Currency){
        this.value = value;
    }
}