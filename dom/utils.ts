type Constructor<T = {}> = new (...args: any[]) => T;

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

export function applyMixins<T extends Constructor, S extends Constructor[]>(
  target: T,
  sources: [...S],
): T & Constructor<UnionToIntersection<InstanceType<S[number]>>> {
  for (const source of sources) {
    for (const name of Object.getOwnPropertyNames(source.prototype)) {
      if (name === "constructor") continue;

      Object.defineProperty(
        target.prototype,
        name,
        Object.getOwnPropertyDescriptor(source.prototype, name)!,
      );
    }
  }
  return target as any;
}
