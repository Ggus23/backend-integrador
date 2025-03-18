import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Project } from 'src/projects/projects.entity';
@Entity()
export class CulturalExchange {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, usuario => usuario.intercambiosCulturales)
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

  @ManyToOne(() => Project, proyecto => proyecto.intercambiosCulturales)
  @JoinColumn({ name: 'id_proyecto' })
  proyecto: Project;

  @Column()
  tipo_contenido: string;

  @Column()
  descripcion: string;
}