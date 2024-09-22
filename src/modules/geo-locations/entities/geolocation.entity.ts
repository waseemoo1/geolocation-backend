import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Geolocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 55 })
  address: string;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;
}
