import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Resource } from '../resources/resources.entity';
import { Participants } from '../participants/participants.entity';
import { Chats } from '../chat/chat.entity';
import { CulturalExchange } from '../cultura-exchange/cultura-exchange.entity';
import { Category } from 'src/categories/category.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id_proyecto: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @CreateDateColumn({ type: 'timestamp' }) // Usa CreateDateColumn en lugar de Column
  fecha_creacion: Date;

  @Column()
  Obj_aprendizaje: string;

  @ManyToOne(() => User, user => user.projects, { eager: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

   @ManyToOne(() => Category, category => category.projects)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Category;

  @OneToMany(() => Resource, resource => resource.proyecto)
  recursos: Resource[];

  @OneToMany(() => Participants, participanteProyecto => participanteProyecto.proyecto)
  participantes: Participants[];

  @OneToMany(() => Chats, mensaje => mensaje.usuario)
  mensajes: Chats[];

  @OneToMany(() => CulturalExchange, culturalExchange => culturalExchange.proyecto)
  intercambiosCulturales: CulturalExchange[];
}