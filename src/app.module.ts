import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { mongoUrl } from 'env';

@Module({
  imports: [MongooseModule.forRoot(mongoUrl), PokemonModule, CommonModule],
})
export class AppModule {}
