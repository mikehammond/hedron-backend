import { Injectable } from '@nestjs/common';

import { ProductInput } from './dto/product.input';
import { IBMDicoveryService } from '../../utils/services/ibm-discovery.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    private readonly ibmDiscoveryService: IBMDicoveryService,
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  async products(filter: object): Promise<Product[]> {
    return await this.productModel.find(filter);
  }

  async addProduct(product: ProductInput): Promise<Product> {
    const response = await this.ibmDiscoveryService.addDocument(product);
    return await this.productModel.create({
      ...product,
      ibmDiscoveryDocumentId: response.result.document_id
    })
  }

  async trashProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(productId, { trashed: true });
    return await product.save();
  }

  async restoreProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(productId, { trashed: false });
    return await product.save();
  }

  async deleteProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    await this.ibmDiscoveryService.deleteDocument(product.ibmDiscoveryDocumentId);
    return await product.remove();
  }
}
