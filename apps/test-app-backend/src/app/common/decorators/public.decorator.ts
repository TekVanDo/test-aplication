/* eslint-disable @typescript-eslint/no-explicit-any */

export const PUBLIC_ENDPOINT = 'PUBLIC_ENDPOINT';

export function Public() {
  return (target: any, _?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => {
    if (descriptor) {
      Reflect.defineMetadata(PUBLIC_ENDPOINT, true, descriptor.value);
      return descriptor;
    }
    Reflect.defineMetadata(PUBLIC_ENDPOINT, true, target);
    return target;
  };
}
