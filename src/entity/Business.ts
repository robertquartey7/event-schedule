import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity
  } from 'typeorm';
  import { User } from './User'; 
  
  @Entity('business')
  export class Business extends BaseEntity {
    @PrimaryColumn()
    id?: string;
  
    @Column({ length: 600 })
    business_name?: string;
  
    @Column({ type: 'text', nullable: true })
    description?: string;
  
    @Column({ length: 600, nullable: true })
    address?: string;
  
    @Column({ length: 15, nullable: true })
    phone_number?: string;
  
    @Column({ length: 255, nullable: true })
    website?: string;
  
    @ManyToOne(() => User, user => user.businesses, { onDelete: 'CASCADE' })
      
    @Column()
    user_id?: string;
    @JoinColumn({ name: 'user_id' })
    user?: User;
  }
  