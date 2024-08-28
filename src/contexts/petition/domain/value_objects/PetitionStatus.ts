import { ValueObject} from "@contexts/shared/domain/value_objects/ValueObject";
import { InvalidArgumentError} from "@contexts/shared/domain/exceptions/InvalidArgumentError";

export class PetitionStatus extends ValueObject<string> {

  private static instances: Map<string, PetitionStatus> = new Map();
  private constructor(value: string) {
    super(value);
  }

  static readonly PETITION_IN_PROGRESS = new PetitionStatus("PETITION_IN_PROGRESS");
  static readonly PETITION_CLOSED = new PetitionStatus("PETITION_CLOSED");
  static readonly PETITION_REJECTED = new PetitionStatus("PETITION_REJECTED");


  static getInstance(value: string): PetitionStatus {
    if(!this.instances.has(value)) {
      throw new InvalidArgumentError("PetitionStatus does not exist");
    }
    return this.instances.get(value)!;
  }

  static initialize(): void {
    this.instances.set(PetitionStatus.PETITION_IN_PROGRESS.value, PetitionStatus.PETITION_IN_PROGRESS);
    this.instances.set(PetitionStatus.PETITION_CLOSED.value, PetitionStatus.PETITION_CLOSED);
    this.instances.set(PetitionStatus.PETITION_REJECTED.value, PetitionStatus.PETITION_REJECTED);
  }
}
