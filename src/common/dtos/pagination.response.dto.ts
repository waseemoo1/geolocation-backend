import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { mixin } from '@nestjs/common';
import { Type } from 'class-transformer';

type Constructor = new (...args: any[]) => any;

export function paginationDtoResponse<TBase extends Constructor>(Base: TBase) {
  class PaginationDtoResponse {
    @Expose()
    page: number;

    @Expose()
    limit: number;

    @Expose()
    total: number;

    @Expose()
    lastPage: number;

    @ApiProperty({ type: Base, isArray: true })
    @Expose()
    @Type(() => Base)
    data!: Array<InstanceType<TBase>>;
  }

  return mixin(PaginationDtoResponse);
}
