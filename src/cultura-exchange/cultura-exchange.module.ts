/**
 * Módulo de Intercambio Cultural
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturalExchangeService } from './cultura-exchange.service';
import { CulturalExchangeController } from './cultura-exchange.controller';
import { CulturalExchange } from './cultura-exchange.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CulturalExchange])],
  controllers: [CulturalExchangeController],
  providers: [CulturalExchangeService],
})
export class CulturalExchangeModule {}