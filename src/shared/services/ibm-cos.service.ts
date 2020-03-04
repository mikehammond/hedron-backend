import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { S3 } from 'ibm-cos-sdk';

import { IFile } from "../interfaces/file.interface";

@Injectable()
export class IBMCloudObjectStorageService {
  private cloudObjectStorage: S3;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.cloudObjectStorage = new S3({
      endpoint: this.configService.get<string>('IBM_COS_ENDPOINT'),
      apiKeyId: this.configService.get<string>('IBM_COS_API_KEY'),
      ibmAuthEndpoint: this.configService.get<string>('IBM_AUTH_ENDPOINT'),
      serviceInstanceId: this.configService.get<string>('IBM_COS_SERVICE_INSTANCE_ID')
    });
  }

  async addObjects(files: IFile[]) {
    const s3Uploads = files.map(file => this.addObject(file));
    return await Promise.all(s3Uploads);
  }

  private addObject(file: IFile) {
    return this.cloudObjectStorage.putObject({
      Bucket: this.configService.get<string>('IBM_COS_BUCKET_NAME'),
      Key: `${file.uuid}_${file.originalname}`,
      Body: file.buffer
    }).promise();
  }
}