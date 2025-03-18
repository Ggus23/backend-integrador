import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Resource } from 'src/resources/resources.entity';
import { Participants } from 'src/participants/participants.entity';
import { Chats } from 'src/chat/chat.entity';
import { CulturalExchange } from 'src/cultura-exchange/cultura-exchange.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id_proyecto: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  fecha_creacion: Date;

  @ManyToOne(() => User, usuario => usuario.recursos)
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

  @OneToMany(() => Resource, resource => resource.proyecto)
  recursos: Resource[];

  @OneToMany(() => Participants, participanteProyecto => participanteProyecto.proyecto)
  participantes: Participants[];

  @OneToMany(() => Chats, mensaje => mensaje.usuario)
  mensajes: Chats[];

  @OneToMany(() => CulturalExchange, culturalExchange => culturalExchange.proyecto)
  intercambiosCulturales: CulturalExchange[];
}