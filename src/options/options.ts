export interface TsAutoMockOptions {
    debug: TsAutoMockDebugOptions;
}

const defaultOptions: TsAutoMockOptions = {
    debug: false,
};

let options: TsAutoMockOptions = null;

export type TsAutoMockDebugOptions = 'file' | 'console' | boolean;

export function SetTsAutoMockOptions(_options: TsAutoMockOptions): void {
    options = _options;
}

export function GetTsAutoMockDebugOptions(): TsAutoMockDebugOptions {
    return GetOptionByKey('debug');
}

function GetOptionByKey<T extends keyof TsAutoMockOptions>(optionKey: keyof TsAutoMockOptions): TsAutoMockOptions[T] {
    if (options) {
        return options[optionKey] || defaultOptions[optionKey];
    }

    return defaultOptions[optionKey];
}
