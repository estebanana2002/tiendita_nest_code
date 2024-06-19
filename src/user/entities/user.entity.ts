import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
    @Column() last_name: string;
    @Column({unique: true}) email: string;
    @Column({unique: true}) uid: string;
    @Column() password: string;
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) created_at: Date;
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) updated_at: Date;
}
