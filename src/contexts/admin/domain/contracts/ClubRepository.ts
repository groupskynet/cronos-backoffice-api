import { Club } from "../entity/Club";
// import { Maybe } from "@contexts/shared/domain/Maybe";
import { ClubId } from "@contexts/admin/domain/value_objects/ClubId";
import { AdminId } from "@contexts/admin/domain/value_objects/AdminId";

export abstract class ClubRepository {
    abstract findById(id: ClubId): Promise<Club | null>;
    abstract findAll(): Promise<Club[]>;
    abstract update(club: Club, adminId: AdminId): Promise<void>;
}