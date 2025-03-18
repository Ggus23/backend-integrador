import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { ResourcesModule } from './resources/resources.module';
import { ProjectsModule } from './projects/projects.module';
import {ParticipantsModule} from './participants/participants.module';
import { CulturalExchangeModule } from './cultura-exchange/cultura-exchange.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'integrador',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule,
    ResourcesModule,
    ProjectsModule,
    ParticipantsModule,
    CulturalExchangeModule,
    ChatModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
