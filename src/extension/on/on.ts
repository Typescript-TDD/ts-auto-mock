import { ExtensionHandler } from '../extensionHandler';
import { Marker } from '../marker/marker';

export function On<U extends object>(mock: U): ExtensionHandler<U> {
  // @ts-ignore
  if (!mock[Marker.instance.get()]) {
    throw new Error('The provided mock is not valid. Please create a mock first with createMock');
  }
  return new ExtensionHandler(mock);
}
