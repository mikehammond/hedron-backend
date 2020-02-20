
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface IMutation {
    addProduct(name?: string): Product | Promise<Product>;
}

export interface Product {
    _id?: string;
    name?: string;
    email?: string;
}

export interface IQuery {
    products(): Product[] | Promise<Product[]>;
}
