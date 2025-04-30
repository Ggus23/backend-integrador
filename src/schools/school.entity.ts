// src/schools/school.entity.ts
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  CODIGO_UE: string;

  @Column()
  UNIDAD_EDU: string;

  @Column()
  DISTRITO: string;

  @Column()
  ZONA: string;

  @Column()
  DEPARTAMEN: string;

  @Column()
  DIRECCION: string;

  @OneToMany(() => User, usuario => usuario.colegio)
  usuarios: User[];
}