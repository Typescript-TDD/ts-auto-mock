export interface SpyMethodFactory<T> {
    create(name: string): T;
}