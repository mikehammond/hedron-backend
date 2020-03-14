import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';

import { ProductInput } from '../../app-graphql/products/dto/product.input';
import { WatsonDicoveryService } from './watson-discovery.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';
import { IBMCloudObjectStorageService } from './ibm-cos.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly watsonDiscoveryService: WatsonDicoveryService,
    private readonly ibmCloudObjectStorage: IBMCloudObjectStorageService,
    @InjectModel('Product') private readonly productModel: Model<IProduct>
  ) {}

  async products(filter: object): Promise<IProduct[]> {
    try {
      return await this.productModel.find(filter);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getProductById(_id: string): Promise<IProduct> {
    try {
      return this.productModel.findById(_id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getProductByName(name: string): Promise<IProduct> {
    try {
      return this.productModel.findOne({ name });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addProduct(userId: string, product: ProductInput): Promise<IProduct> {
    try {
      const response = await this.watsonDiscoveryService.addDocument(product);

      return await this.productModel.create({
        userId,
        ...product,
        ibmDiscoveryDocumentId: response.result.document_id
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
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
      throw new InternalServerErrorException(error);
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
      throw new InternalServerErrorException(error);
    }
  }

  async deleteProduct(_id: string): Promise<IProduct> {
    try {
      const product = await this.productModel.findById(_id);

      if (!product) {
        throw new NotFoundException(`Product with id ${_id} Not Found`);
      }

      const fileKeys = [
        product.featured.filename,
        product.logo.filename,
        ...product.attachments.map(attachment => attachment.filename),
      ];

      await Promise.all([
        this.watsonDiscoveryService.deleteDocument(product.ibmDiscoveryDocumentId),
        this.ibmCloudObjectStorage.deleteObjects(fileKeys),
      ]);

      return await product.remove();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateStatus(_id: string, status: string): Promise<IProduct> {
    try {
      const product = await this.productModel.findById(_id);

      if (!product) {
        throw new NotFoundException(`Product with id ${_id} Not Found`);
      }

      await product.update({ status }, { runValidators: true });

      return await this.productModel.findById(_id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
