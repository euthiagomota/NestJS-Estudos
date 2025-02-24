import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosEntity } from './entites/recados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecadosEntity])],
  providers: [RecadosService],
  controllers: [RecadosController]
})
export class RecadosModule {}
