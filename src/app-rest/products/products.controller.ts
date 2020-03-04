import {
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  UnauthorizedException,
  Body,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

import { ProductsService } from '../../shared/services/products.service';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { IUser } from '../../shared/interfaces/user.interface';
import { IFile } from '../../shared/interfaces/file.interface';
import { ProductInput } from './dto/product.input';
import { IBMCloudObjectStorageService } from '../../shared/services/ibm-cos.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ibmCloudObjectStorageService: IBMCloudObjectStorageService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() request) {
    if (!(request.user as IUser).permissions.includes('read:products')) {
      throw new UnauthorizedException('You do not have the permission to retrieve products');
    }

    return this.productsService.products(request.query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBody({ type: ProductInput })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'featured', maxCount: 1 },
    { name: 'attachments' },
  ]))
  create(@Req() request, @UploadedFiles() files, @Body() productInput: ProductInput) {
    console.log(files);
    if (!(request.user as IUser).permissions.includes('create:products')) {
      throw new UnauthorizedException('You do not have the permission to create a product');
    }
    
    const modifiedLogo = { ...files.logo[0], uuid: uuidv4() };
    const modifiedFeatured = { ...files.featured[0], uuid: uuidv4() };
    const modifiedAttachments = files.attachments.map(attachment => ({ ...attachment, uuid: uuidv4() }));

    const { IBM_COS_ENDPOINT, IBM_COS_BUCKET_NAME } = process.env;
    const featured = {
      filename: modifiedFeatured.originalname,
      url: `https://${IBM_COS_ENDPOINT}/${IBM_COS_BUCKET_NAME}/${modifiedFeatured.uuid}_${modifiedFeatured.originalname}`,
      mimetype: modifiedFeatured.mimetype,
      size: modifiedFeatured.size
    }

    const logo = {
      filename: modifiedLogo.originalname,
      url: `https://${IBM_COS_ENDPOINT}/${IBM_COS_BUCKET_NAME}/${modifiedLogo.uuid}_${modifiedLogo.originalname}`,
      mimetype: modifiedLogo.mimetype,
      size: modifiedLogo.size
    }
    const attachments = modifiedAttachments.map((file: IFile) => {
      return {
        filename: file.originalname,
        url: `https://${IBM_COS_ENDPOINT}/${IBM_COS_BUCKET_NAME}/${file.uuid}_${file.originalname}`,
        mimetype: file.mimetype,
        size: file.size
      }
    })

    return Promise.all([
      this.ibmCloudObjectStorageService.addObjects([modifiedLogo, ...modifiedAttachments, modifiedFeatured]),
      this.productsService.addProduct(request.user.sub, { ...productInput, attachments, logo, featured }),
    ]);
  }
}
