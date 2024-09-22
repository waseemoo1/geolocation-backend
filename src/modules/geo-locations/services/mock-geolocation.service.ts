import { Injectable } from '@nestjs/common';
import { GeoLocationsServiceInterface } from '../interfaces/geo-location-service.interface';

@Injectable()
export class MockGeolocationService implements GeoLocationsServiceInterface {
  async getGeolocation(
    address: string,
  ): Promise<{ latitude: number; longitude: number }> {
    const randomLatitude = this.getRandomLatitude();
    const randomLongitude = this.getRandomLongitude();

    return {
      latitude: randomLatitude,
      longitude: randomLongitude,
    };
  }

  private getRandomLatitude(): number {
    // Latitude ranges from -90 to +90
    return (Math.random() * 180 - 90).toFixed(6) as unknown as number;
  }

  private getRandomLongitude(): number {
    // Longitude ranges from -180 to +180
    return (Math.random() * 360 - 180).toFixed(6) as unknown as number;
  }
}
