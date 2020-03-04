
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Attachement {
    filename: string;
    url: string;
    mimetype: string;
    size: number;
}

export interface Plan {
    name: string;
    price: string;
    details: string;
}

export interface ProductFilter {
    archived: boolean;
    status: string;
}

export interface ProductInput {
    name: string;
    description: string;
    pricing: string[];
    devices: string[];
    categories: string[];
    plans: Plan[];
    logo: Attachement;
    attachments: Attachement[];
}

export interface Attachment {
    _id: string;
    filename: string;
    url: string;
    mimetype: string;
    size: number;
}

export interface IMutation {
    addProduct(uploads: Upload[], product: ProductInput): ProductType | Promise<ProductType>;
    archiveProduct(productId: string): ProductType | Promise<ProductType>;
    restoreProduct(productId: string): ProductType | Promise<ProductType>;
    deleteProduct(productId: string): ProductType | Promise<ProductType>;
}

export interface ProductType {
    _id: string;
    userId: string;
    name: string;
    description: string;
    ibmDiscoveryDocumentId: string;
    attachments: Attachment[];
    status: string;
    archived: boolean;
}

export interface IQuery {
    products(filter: ProductFilter): ProductType[] | Promise<ProductType[]>;
}

export type Upload = any;
