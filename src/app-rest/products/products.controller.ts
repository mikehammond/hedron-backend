import {
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  UnauthorizedException,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';

import { ProductsService } from '../../shared/services/products.service';
import { IBMCloudObjectStorageService } from '../../shared/services/ibm-cos.service';
import { IBMDicoveryService } from '../../shared/services/ibm-discovery.service';

import { AuthGuard } from '../../shared/guards/auth.guard';
import { IUser } from '../../shared/interfaces/user.interface';
import { IFile } from '../../shared/interfaces/file.interface';
import { SearchQueryInput } from './dto/product.input';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ibmCloudObjectStorageService: IBMCloudObjectStorageService,
    private readonly ibmDiscoveryService: IBMDicoveryService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() request) {
    if (!(request.user as IUser).permissions.includes('read:products')) {
      throw new UnauthorizedException('You do not have the permission to retrieve products');
    }

    return this.productsService.products(request.query);
  }

  @Get('/search')
  searchProducts(@Query() query: SearchQueryInput) {
    return this.ibmDiscoveryService.queryCollection(query);
  }

  @Delete('/documents/:id')
  deleteDocument(@Param() params) {
    return this.ibmDiscoveryService.deleteDocument(params.id);
  }

  @Post('/uploads')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'featured', maxCount: 1 },
    { name: 'attachments' },
  ]))
  async upload(@UploadedFiles() files) {
    const modifiedLogo = { ...files.logo[0], uuid: uuidv4() };
    const modifiedFeatured = { ...files.featured[0], uuid: uuidv4() };
    const modifiedAttachments = files.attachments.map(
      attachment => ({ ...attachment, uuid: uuidv4() })
    );

    const { IBM_COS_ENDPOINT, IBM_COS_BUCKET_NAME } = process.env;
    const featured = {
      filename: `${modifiedFeatured.uuid}_${modifiedFeatured.originalname}`,
      url: `https://${IBM_COS_ENDPOINT}/${IBM_COS_BUCKET_NAME}/${modifiedFeatured.uuid}_${modifiedFeatured.originalname}`,
      mimetype: modifiedFeatured.mimetype,
      size: modifiedFeatured.size
    }

    const logo = {
      filename: `${modifiedLogo.uuid}_${modifiedLogo.originalname}`,
      url: `https://${IBM_COS_ENDPOINT}/${IBM_COS_BUCKET_NAME}/${modifiedLogo.uuid}_${modifiedLogo.originalname}`,
      mimetype: modifiedLogo.mimetype,
      size: modifiedLogo.size
    }
    const attachments = modifiedAttachments.map((file: IFile) => {
      return {
        filename: `${file.uuid}_${file.originalname}`,
        url: `https://${IBM_COS_ENDPOINT}/${IBM_COS_BUCKET_NAME}/${file.uuid}_${file.originalname}`,
        mimetype: file.mimetype,
        size: file.size
      }
    })

    await this.ibmCloudObjectStorageService.addObjects(
      [modifiedLogo, ...modifiedAttachments, modifiedFeatured]
    );

    return { featured, logo, attachments };
  }
}
