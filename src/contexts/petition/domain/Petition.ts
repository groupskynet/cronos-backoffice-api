import { AggregateRoot } from '@contexts/shared/domain/AggregateRoot'
import { PetitionId } from '@contexts/petition/domain/value_objects/PetitionId'
import { PetitionAdminCount } from '@contexts/petition/domain/value_objects/PetitionAdminCount'
import { PetitionClubCount } from '@contexts/petition/domain/value_objects/PetitionClubCount'
import { PetitionUserCount } from '@contexts/petition/domain/value_objects/PetitionUserCount'
import { PetitionEmail } from '@contexts/petition/domain/value_objects/PetitionEmail'
import { PetitionDescription } from '@contexts/petition/domain/value_objects/PetitionDescription'
import { PetitionPhone } from '@contexts/petition/domain/value_objects/PetitionPhone'
import { PetitionDate } from '@contexts/petition/domain/value_objects/PetitionDate'
import { PetitionStatus } from '@contexts/petition/domain/value_objects/PetitionStatus'
import { AdminId } from '@contexts/admin/domain/value_objects/AdminId'

export class Petition extends AggregateRoot {
    private _id: PetitionId
    private _adminCount: PetitionAdminCount
    private _clubCount: PetitionClubCount
    private _userCount: PetitionUserCount
    private _email: PetitionEmail
    private _description: PetitionDescription
    private _phone: PetitionPhone
    private _status: PetitionStatus
    private _adminId: AdminId
    private _createdAt: PetitionDate

    constructor(
        id: PetitionId,
        adminCount: PetitionAdminCount,
        clubCount: PetitionClubCount,
        userCount: PetitionUserCount,
        email: PetitionEmail,
        description: PetitionDescription,
        phone: PetitionPhone,
        status: PetitionStatus,
        adminId: AdminId,
        createdAt: PetitionDate
    ) {
        super()
        this._id = id
        this._adminCount = adminCount
        this._clubCount = clubCount
        this._userCount = userCount
        this._email = email
        this._description = description
        this._phone = phone
        this._status = status
        this._adminId = adminId
        this._createdAt = createdAt
    }

    static create(id: string, adminCount: number, clubCount: number, userCount: number, email: string, description: string, phone: string, status: string, adminId: string): Petition {
        return new Petition(
            new PetitionId(id),
            new PetitionAdminCount(adminCount),
            new PetitionClubCount(clubCount),
            new PetitionUserCount(userCount),
            new PetitionEmail(email),
            new PetitionDescription(description),
            new PetitionPhone(phone),
            PetitionStatus.getInstance(status),
            new AdminId(adminId),
            new PetitionDate(new Date()))
    }

    toPrimitives() {
        return {
            id: this._id.value,
            adminCount: this._adminCount.value,
            clubCount: this._clubCount.value,
            userCount: this._userCount.value,
            email: this._email.value,
            description: this._description.value,
            phone: this._phone.value,
            status: this._status.value,
            adminId: this._adminId.value,
            date: this._createdAt.value
        }
    }

    get id(): string {
        return this._id.value
    }

    get adminCount(): number {
        return this._adminCount.value
    }

    get clubCount(): number {
        return this._clubCount.value
    }

    get userCount(): number {
        return this._userCount.value
    }

    get email(): string {
        return this._email.value
    }

    get description(): string {
        return this._description.value
    }

    get phone(): string {
        return this._phone.value
    }

    get status(): string {
        return this._status.value
    }

    get adminId(): string {
        return this._adminId.value
    }

    get createdAt(): Date {
        return this._createdAt.value
    }
}