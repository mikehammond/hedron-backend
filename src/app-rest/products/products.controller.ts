import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';

import { IBMCloudObjectStorageService } from '../../shared/services/ibm-cos.service';

import { IFile } from '../../shared/interfaces/file.interface';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly ibmCloudObjectStorageService: IBMCloudObjectStorageService,
  ) {}

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
