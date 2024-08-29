// eslint-disable-next-line @typescript-eslint/ban-types
export type ConstantOrString<T extends string> = T | (string & {});
