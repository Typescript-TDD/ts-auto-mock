const MIN_NUMBER: number = -10000;
const MAX_NUMBER: number = 10000;

export class Random {
  public static number(): number {
    return Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER;
  }

  public static enumValue(...args: Array<string | number>): string | number {
    return args[Math.floor(Math.random() * args.length)] ?? 0;
  }

  public static string(prefix: string): string {
    return prefix + Math.random().toString(20).substr(2, 6);
  }

  public static boolean(): boolean {
    return !Math.round(Math.random());
  }
}
