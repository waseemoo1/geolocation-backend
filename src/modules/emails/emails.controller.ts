import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @OnEvent('geolocation.created')
  async handleGeolocationCreatedEvent(payload: {
    email: string;
    address: string;
    latitude: number;
    longitude: number;
  }) {
    const { email, address, latitude, longitude } = payload;
    await this.emailsService.sendGeolocationEmail(
      email,
      address,
      latitude,
      longitude,
    );
  }
}
