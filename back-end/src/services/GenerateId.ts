import { v4 } from "uuid"

export class GenerateId {

  public generate(): string {
    return v4()
  }
}