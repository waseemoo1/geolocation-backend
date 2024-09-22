export const GEOLOCATION_SERVICE = Symbol('GEOLOCATION_SERVICE');

export interface GeoLocationsServiceInterface {
  getGeolocation(
    address: string,
  ): Promise<{ latitude: number; longitude: number }>;
}
