import { 
    BeforeInsert,
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn 
} from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
    @Column() last_name: string;
    @Column({unique: true}) email: string;
    @Column({unique: true}) uid: string;
    @Column('text', {select: false}) password: string;
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) created_at: Date;
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) updated_at: Date;

    @BeforeInsert()
    public checkEmail() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeInsert()
    public async hashPassword() {
        this.password = await bcrypt.hashSync(this.password, 10); 
    }
}
