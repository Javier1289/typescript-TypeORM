import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../products/entities/product.entity";

@Entity({name:"category"})
export class CategoryEntity extends BaseEntity{
    
    @Column()
    categoryName!: string;

    @OneToMany( () => ProductEntity, ( product ) => product.category )
    products!: ProductEntity[]; 

}