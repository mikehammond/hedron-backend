import {
  Injectable,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import slugify from 'slugify';

import { ProductInput } from '../../graphql/products/dto/product.input';
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

  async allProducts(filter: object): Promise<IProduct[]> {
    try {
      return await this.productModel.find(filter);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async productById(_id: string): Promise<IProduct> {
    try {
      return this.productModel.findById(_id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async productByName(slug: string): Promise<IProduct> {
    try {
      return this.productModel.findOne({ slug });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addProduct(userId: string, product: ProductInput): Promise<IProduct> {
    try {
      const response = await this.watsonDiscoveryService.addDocument(product);

      return await this.productModel.create({
        userId,
        ...product,
        slug: slugify(product.name, { lower: true }),
        ibmDiscoveryDocumentId: response.result.document_id
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async archiveProduct(_id: string): Promise<IProduct> {
    try {
      return await this.productModel.findByIdAndUpdate(_id, { archived: true }, { new: true });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async restoreProduct(_id: string): Promise<IProduct> {
    try {
      return await this.productModel.findByIdAndUpdate(_id, { archived: false }, { new: true });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteProduct(_id: string): Promise<IProduct> {
    try {
      const product = await this.productModel.findById(_id);

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
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateProduct(_id: string, update: ProductInput): Promise<IProduct> {
    try {
      return await this.productModel.findByIdAndUpdate(_id, update, { new: true, runValidators: true });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
