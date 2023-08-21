import { Injectable } from '@nestjs/common';
import { PokemonResponse } from './interfaces/Pokemon.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly Http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.Http.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=600&offset=0',
    );

    const arrPokemones: { name: string; no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      arrPokemones.push({ name, no });
    });

    await this.pokemonModel.insertMany(arrPokemones);
    return 'Seed executed';
  }
}
