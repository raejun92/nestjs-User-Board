import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMconfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	database: 'board-app',
	username: 'postgres',
	password: 'postgres',
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	synchronize: true,
}