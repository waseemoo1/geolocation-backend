import { Inject, Injectable } from '@nestjs/common';
import { AddressGeoLocationDto } from './dto';
import {
  GEOLOCATION_SERVICE,
  GeoLocationsServiceInterface,
} from './interfaces/geo-location-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Geolocation } from './entities/geolocation.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class GeoLocationsService {
  constructor(
    @Inject(GEOLOCATION_SERVICE)
    private readonly geoLocationThirdPartyService: GeoLocationsServiceInterface,
    @InjectRepository(Geolocation)
    private readonly repo: Repository<Geolocation>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async checkOrCreate({ address, email }: AddressGeoLocationDto) {
    let geo = await this.repo.findOne({ where: { address } });

    if (!geo) {
      const { latitude, longitude } =
        await this.geoLocationThirdPartyService.getGeolocation(address);

      geo = this.repo.create({ address, latitude, longitude });
      geo = await this.repo.save(geo);
    }

    if (email) {
      this.emitGeolocationCreatedEvent({
        address,
        email,
        latitude: geo.latitude,
        longitude: geo.longitude,
      });
    }

    return geo;
  }

  // Helper method to emit the event
  private emitGeolocationCreatedEvent(payload: {
    address: string;
    email: string;
    latitude: number;
    longitude: number;
  }) {
    this.eventEmitter.emit('geolocation.created', payload);
  }
}
