import { createMock } from './create-mock';

export class ClassThatUseDifferentCreateMock {
  public property: string;
  public propertyGenerated: string;

  constructor() {
    this.propertyGenerated = createMock();
  }
}
