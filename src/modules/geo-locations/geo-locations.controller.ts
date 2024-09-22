import { Controller, Post, Body } from '@nestjs/common';
import { GeoLocationsService } from './geo-locations.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors';
import { GeoLocationDto, AddressGeoLocationDto } from './dto';

@ApiTags('geo-locations')
@Controller('geo-locations')
export class GeoLocationsController {
  constructor(private readonly geolocationService: GeoLocationsService) {}

  @Post('address')
  @Serialize(GeoLocationDto)
  @ApiOkResponse({ type: GeoLocationDto })
  create(@Body() createGeolocationDto: AddressGeoLocationDto) {
    return this.geolocationService.checkOrCreate(createGeolocationDto);
  }
}
