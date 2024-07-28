import { DemographyDto } from "@contexts/shared/domain/interfaces/DemographyDto"

export interface CreateNewClubRequest {
    id: string, 
    demographyDto: DemographyDto 
}