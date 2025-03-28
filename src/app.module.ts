import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { ResourcesModule } from './resources/resources.module';
import { ProjectsModule } from './projects/projects.module';
import {ParticipantsModule} from './participants/participants.module';
import { CulturalExchangeModule } from './cultura-exchange/cultura-exchange.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SchoolsModule } from './schools/schools.module';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5437'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    SchoolsModule,
    UserModule,
    ResourcesModule,
    ProjectsModule,
    ParticipantsModule,
    CulturalExchangeModule,
    ChatModule,
    AuthModule,
    SchoolsModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
