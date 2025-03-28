import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from '../projects/projects.entity'; // Asegúrate de que la ruta sea correcta

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Project, project => project.categoria)
  projects: Project[];
}