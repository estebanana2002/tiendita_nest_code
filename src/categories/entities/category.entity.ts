import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn() id: number;
    @Column({unique: true}) category: string;
    @Column() description: string;
    @Column({default: true}) state: boolean;
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) created_at: Date;
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) updated_at: Date;

    @OneToMany(() => Product, product => product.category) product: Product[];
}