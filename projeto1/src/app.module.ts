import { Module } from '@nestjs/common';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'projeto1',
      password: 'admin',
      autoLoadEntities: true, // Carrega entidades sem precisar especifica-las
      synchronize: true, // Sincroniza com o banco de dados. Não deve ser usando em prod
    }),
    RecadosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
