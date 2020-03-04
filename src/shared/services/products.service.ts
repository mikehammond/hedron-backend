import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';

import { ProductInput } from 'src/app-graphql/products/dto/product.input';
import { IBMDicoveryService } from './ibm-discovery.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from 'src/shared/interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    private readonly ibmDiscoveryService: IBMDicoveryService,
    @InjectModel('Product') private readonly productModel: Model<IProduct>
  ) {}

  async products(filter: object): Promise<IProduct[]> {
    try {
      return await this.productModel.find(filter);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addProduct(userId: string, product: ProductInput): Promise<IProduct> {
    try {
      const response = await this.ibmDiscoveryService.addDocument(product);

      return await this.productModel.create({
        userId,
        ...product,
        ibmDiscoveryDocumentId: response.result.document_id
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async archiveProduct(userId: string, _id: string): Promise<IProduct> {
    try {
      const product = await this.productModel.findById(_id);

      if (!product) {
        throw new NotFoundException(`Product with id ${_id} Not Found`);
      }

      if (userId !== product.userId) {
        throw new UnauthorizedException('You are not the owner of this product');
      }

      await product.update({ archived: true });

      return await this.productModel.findById(_id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async restoreProduct(userId: string, _id: string): Promise<IProduct> {
    try {
      const product = await this.productModel.findById(_id);

      if (!product) {
        throw new NotFoundException(`Product with id ${_id} Not Found`);
      }

      if (userId !== product.userId) {
        throw new UnauthorizedException('You are not the owner of this product');
      }

      await product.update({ archived: false });

      return await this.productModel.findById(_id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteProduct(_id: string): Promise<IProduct> {
    try {
      const product = await this.productModel.findById(_id);

      if (!product) {
        throw new NotFoundException(`Product with id ${_id} Not Found`);
      }

      await this.ibmDiscoveryService.deleteDocument(product.ibmDiscoveryDocumentId);

      return await product.remove();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}