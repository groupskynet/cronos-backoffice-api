import { Currency } from "@contexts/shared/domain/Money"
import { DemographyDto } from "@contexts/shared/domain/interfaces/DemographyDto"
import { UserDto } from "./UserDto"

export interface ZoneIn{
    id: string;
    currencyIn: Currency;
    demographyDto: DemographyDto;
    userDto: UserDto;
}