import { mixin } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class MessagesType {
  message: string;
  property: string;
}

export class ApiResponseDto<T> {
  statusCode: number;
  message: string;
  data?: T | null;
  errors?: string[] | null;
  additionalInfo?: any | null;
}

type Constructor = new (...args: any[]) => any;

export function apiDtoResponse<TBase extends Constructor>(
  Base: TBase,
  isArray: boolean = false,
) {
  class ApiResponseDto {
    @Expose()
    statusCode: number;

    @Expose()
    message: string;

    @ApiProperty({ type: Base, isArray })
    @Expose()
    @Type(() => Base)
    data!: InstanceType<TBase>;
  }

  return mixin(ApiResponseDto);
}
