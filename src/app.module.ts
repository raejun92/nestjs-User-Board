import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { typeORMconfig } from './config/typeorm.config';

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRoot(typeORMconfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
