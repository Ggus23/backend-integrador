// src/schools/school.entity.ts
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => User, usuario => usuario.colegio)
  usuarios: User[];
  // Agrega otros campos según sea necesario (dirección, etc.)
}