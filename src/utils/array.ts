export function isDifferentArray(a: unknown[] = [], b: unknown[] = []) {
  return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
}

export function enumToArray<T>(enumObj: T): Array<T[keyof T]> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => enumObj[key as keyof T]);
}

export function createArray<T>(length: number, mapFn?: (index: number) => T): T[] {
  return Array.from({ length }, (_, index) => (mapFn ? mapFn(index) : (undefined as T)));
}
