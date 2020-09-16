export interface OtherInterface extends StandardInterface {
  '[]': string;
}

export interface StandardInterface {
  prop<K extends keyof this>(): this[K];
}
