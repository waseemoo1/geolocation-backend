import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AddressGeoLocationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(55)
  address: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;
}
