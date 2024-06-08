import { Currency } from "@contexts/shared/domain/Money"
import { UserDto } from "./UserDto"
import { DemographyDto } from "@contexts/shared/domain/interfaces/DemographyDto"

export interface ZoneIn{
    id: string;
    currencyIn: Currency;
    demographyDto: DemographyDto;
    userDto: UserDto;
}