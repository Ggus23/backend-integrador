import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Resource } from '../resources/resources.entity';
import { Participants } from 'src/participants/participants.entity';
import { Chats } from '../chat/chat.entity';
import { CulturalExchange } from 'src/cultura-exchange/cultura-exchange.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contrasena_hasheada: string;

  @Column()
  rol: string;

  @OneToMany(() => Resource, resource => resource.usuario)
  recursos: Resource[];

  @OneToMany(() => Participants, participanteProyecto => participanteProyecto.usuario)
  participaciones: Participants[];

  @OneToMany(() => Chats, mensaje => mensaje.usuario)
  mensajes: Chats[];

  @OneToMany(() => CulturalExchange, culturalExchange => culturalExchange.usuario)
  intercambiosCulturales: CulturalExchange[];
}
