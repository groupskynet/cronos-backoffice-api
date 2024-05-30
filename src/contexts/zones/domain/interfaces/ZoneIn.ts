import { Currency } from "@contexts/shared/domain/Money"
import { DemographyDto } from "@contexts/shared/domain/interfaces/DemographyDto"

export interface ZoneIn{
    currencyIn: Currency;
    demographyDto: DemographyDto;
    userName: string;
}