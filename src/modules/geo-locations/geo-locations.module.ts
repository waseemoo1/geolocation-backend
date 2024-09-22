import { GEOLOCATION_SERVICE } from './interfaces';
import { GeoLocationsService } from './geo-locations.service';
import { Module } from '@nestjs/common';
import { GeoLocationsController } from './geo-locations.controller';
import { MockGeolocationService } from './services/mock-geolocation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geolocation } from './entities/geolocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Geolocation])],
  controllers: [GeoLocationsController],
  providers: [
    GeoLocationsService,
    {
      provide: GEOLOCATION_SERVICE,
      useClass: MockGeolocationService,
    },
  ],
})
export class GeoLocationsModule {}
