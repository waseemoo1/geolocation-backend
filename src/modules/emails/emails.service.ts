import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailsService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    const user = this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('EMAIL_PASS');

    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendGeolocationEmail(
    to: string,
    address: string,
    latitude: number,
    longitude: number,
  ) {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: to,
      subject: `Geolocation for ${address}`,
      text: `The geolocation for ${address} is:\nLatitude: ${latitude}\nLongitude: ${longitude}`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
