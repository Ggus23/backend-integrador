import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/projects.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id_resource: number;

  @ManyToOne(() => User, usuario => usuario.recursos)
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

  @ManyToOne(() => Project, proyecto => proyecto.recursos)
  @JoinColumn({ name: 'id_proyecto' })
  proyecto: Project;

  @Column()
  tipo_proyecto: string;

  @Column()
  url: string;
}