import { Currency } from "@contexts/shared/domain/Money"
import { DemographyDto } from "@contexts/shared/domain/interfaces/DemographyDto"

export interface CreateNewZoneRequest{
    currencyIn: Currency
    demographyDto: DemographyDto
    userId: string;
}