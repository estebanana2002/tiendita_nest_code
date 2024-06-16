import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn() id: number;
    @Column() product_name: string;
    @Column({default: 15}) price: number;
    @Column({default: 0}) strock: number;
    @Column() description: string;
    @Column({default: true}) is_active: boolean;
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) created_at: Date;
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) updated_at: Date;
}
