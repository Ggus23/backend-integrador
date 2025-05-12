import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Resource } from '../resources/resources.entity';
import { Participants } from 'src/participants/participants.entity';
import { Chats } from '../chat/chat.entity';
import { Project } from 'src/projects/projects.entity';
import { CulturalExchange } from 'src/cultura-exchange/cultura-exchange.entity';
import { School } from 'src/schools/school.entity';
import { Role } from 'src/common/enums/rol.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contrasena: string;

  @Column({type:'enum', default: Role.ESTUDIANTE , enum: Role})
  rol: string;

  @ManyToOne(() => School, school => school.usuarios)
  @JoinColumn({ name: 'CODIGO_UE' })
  colegio: School;
  
  @OneToMany(() => Resource, resource => resource.usuario)
  recursos: Resource[];

  @OneToMany(() => Project, projects => projects.usuario)
  projects: Project[];

  @OneToMany(() => Participants, participanteProyecto => participanteProyecto.usuario)
  participaciones: Participants[];

  @OneToMany(() => Chats, mensaje => mensaje.usuario)
  mensajes: Chats[];

  @OneToMany(() => CulturalExchange, culturalExchange => culturalExchange.usuario)
  intercambiosCulturales: CulturalExchange[];
}
