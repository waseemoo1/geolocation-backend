import { Expose } from 'class-transformer';

export class GeoLocationDto {
  @Expose()
  id: string;

  @Expose()
  address: string;

  @Expose()
  latitude: string;

  @Expose()
  longitude: string;
}
