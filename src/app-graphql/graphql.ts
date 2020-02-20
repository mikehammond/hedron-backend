
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface ProductType {
    _id: string;
    name: string;
}

export interface IQuery {
    products(): ProductType[] | Promise<ProductType[]>;
}
