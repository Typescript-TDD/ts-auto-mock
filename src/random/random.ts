export class Random {
  public static number(): number {
    return Math.random() * (10000 - -10000) + -10000;
  }

  public static string(prefix: string, length: number): string {
    return prefix + Math.random().toString(20).substr(2, length);
  }

  public static boolean(): boolean {
    return !Math.round(Math.random());
  }
}
