import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';

@Module({
  providers: [RecadosService],
  controllers: [RecadosController]
})
export class RecadosModule {}
