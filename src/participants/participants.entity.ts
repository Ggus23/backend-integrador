import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Project } from 'src/projects/projects.entity';

@Entity()
export class Participants {
  @PrimaryColumn({ name: 'id_usuario' })
  id_usuario: number;

  @PrimaryColumn({ name: 'id_proyecto' })
  id_proyecto: number;

  @ManyToOne(() => User, usuario => usuario.participaciones)
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

  @ManyToOne(() => Project, proyecto => proyecto.participantes)
  @JoinColumn({ name: 'id_proyecto' })
  proyecto: Project;

  @Column()
  rol: string;
}