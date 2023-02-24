import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../products/entities/product.entity";
import { PurchaseEntity } from '../../purchase/entities/purchase.entity';

@Entity({name:"purchases_products"})
export class PurchaseProductsEntity extends BaseEntity{
    
    @Column()
    quantityProduct!: number;

    @Column()
    totalPrice!: number;
    
    @ManyToOne( () => PurchaseEntity, ( purchase ) => purchase.purchaseProducts )
    @JoinColumn({ name: "purchase_id"})
    purchase!: PurchaseEntity;
    
    @ManyToOne( () => ProductEntity, ( product ) => product.purchaseProducts )
    @JoinColumn({ name: "product_id"})
    product!: ProductEntity;

}