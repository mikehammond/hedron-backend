
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface ProductFilter {
    trashed: boolean;
}

export interface ProductInput {
    name: string;
    description: string;
}

export interface IMutation {
    addProduct(product: ProductInput): ProductType | Promise<ProductType>;
    trashProduct(productId: string): ProductType | Promise<ProductType>;
    restoreProduct(productId: string): ProductType | Promise<ProductType>;
    deleteProduct(productId: string): ProductType | Promise<ProductType>;
}

export interface ProductType {
    _id: string;
    name: string;
    description: string;
    ibmDiscoveryDocumentId: string;
    trashed: boolean;
}

export interface IQuery {
    products(filter: ProductFilter): ProductType[] | Promise<ProductType[]>;
}
