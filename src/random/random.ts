export class Random {
  public static number(): number {
    return Math.random() * (10000 - -10000) + -10000;
  }
}
