export class Random {
  public static number(): number {
    return Math.random() * (10000 - -10000) + -10000;
  }

  public static string(prefix: string): string {
    return prefix + Math.random().toString(20).substr(2, 6);
  }

  public static boolean(): boolean {
    return !Math.round(Math.random());
  }
}
