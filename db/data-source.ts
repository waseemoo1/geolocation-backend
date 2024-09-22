import entities from '../src/modules/index/index.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [...entities],
  synchronize: true, // danger be carful when edit
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
