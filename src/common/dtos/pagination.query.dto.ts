import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ default: '1', required: false })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Transform(({ value }) => Number.parseInt(value))
  page = 1;

  @ApiProperty({ default: '10', required: false , description: "send 0 to get all records"})
  @IsInt()
  @Min(0)
  @Transform(({ value }) => Number.parseInt(value))
  @IsNotEmpty()
  limit = 10;
}
