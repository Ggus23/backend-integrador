import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/projects.entity';

@Entity()
export class Chats {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, usuario => usuario.mensajes)
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

  @ManyToOne(() => Project, proyecto => proyecto.mensajes, { nullable: true }) // Permitir valores nulos
  @JoinColumn({ name: 'id_proyecto' })
  proyecto: Project | null; // Cambiar el tipo a Project | null

  @Column('text')
  mensaje: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}