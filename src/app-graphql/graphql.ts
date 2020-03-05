
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Attachment {
    filename: string;
    url: string;
    mimetype: string;
    size: number;
}

export interface Plan {
    name: string;
    price: string;
    description: string;
}

export interface ProductFilter {
    archived?: boolean;
    status?: string;
    userId?: string;
}

export interface ProductInput {
    name: string;
    description: string;
    values: Selectable[];
    features: Selectable[];
    pricing: Selectable[];
    devices: Selectable[];
    categories: Selectable[];
    plans: Plan[];
    logo: Attachment;
    featured: Attachment;
    attachments: Attachment[];
}

export interface Selectable {
    label: string;
    value: string;
}

export interface AttachmentOutput {
    _id: string;
    filename: string;
    url: string;
    mimetype: string;
    size: number;
}

export interface IMutation {
    addProduct(product: ProductInput): ProductType | Promise<ProductType>;
    archiveProduct(productId: string): ProductType | Promise<ProductType>;
    restoreProduct(productId: string): ProductType | Promise<ProductType>;
    deleteProduct(productId: string): ProductType | Promise<ProductType>;
}

export interface PlanOutput {
    _id: string;
    name: string;
    price: string;
    description: string;
}

export interface ProductType {
    _id: string;
    userId: string;
    ibmDiscoveryDocumentId: string;
    status: string;
    archived: boolean;
    name: string;
    description: string;
    values: SelectableOutput[];
    features: SelectableOutput[];
    pricing: SelectableOutput[];
    devices: SelectableOutput[];
    categories: SelectableOutput[];
    plans: PlanOutput[];
    logo: AttachmentOutput;
    featured: AttachmentOutput;
    attachments: AttachmentOutput[];
}

export interface IQuery {
    products(filter: ProductFilter): ProductType[] | Promise<ProductType[]>;
}

export interface SelectableOutput {
    _id: string;
    label: string;
    value: string;
}
