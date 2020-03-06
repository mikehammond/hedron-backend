import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as DiscoveryV1 from 'ibm-watson/discovery/v1'
import { IamAuthenticator } from 'ibm-watson/auth'
import { Buffer } from 'buffer';

import { ProductInput } from '../../app-graphql/products/dto/product.input';
import { SearchQueryInput } from 'src/app-rest/products/dto/product.input';

@Injectable()
export class IBMDicoveryService {
  private discoveryV1: DiscoveryV1;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.discoveryV1 = new DiscoveryV1({
      version: '2019-04-30',
      authenticator: new IamAuthenticator({
        apikey: this.configService.get<string>('WATSON_DISCOVERY_API_KEY')
      }),
      serviceUrl: this.configService.get<string>('WATSON_DISCOVERY_SERVICE_URL')
    });
  }

  queryCollection(query: SearchQueryInput) {
    return this.discoveryV1.query({
      environmentId: this.configService.get<string>('WATSON_DISCOVERY_ENVIRONMENT_ID'),
      collectionId: this.configService.get<string>('WATSON_DISCOVERY_COLLECTION_ID'),
      query: query.searchPhrase,
      naturalLanguageQuery: query.searchPhrase,
      filter: query.searchPhrase
    });
  }

  addDocument(document: ProductInput) {
    return this.discoveryV1.addDocument({
      environmentId: this.configService.get<string>('WATSON_DISCOVERY_ENVIRONMENT_ID'),
      collectionId: this.configService.get<string>('WATSON_DISCOVERY_COLLECTION_ID'),
      file: Buffer.from(JSON.stringify(document)),
      filename: document.name,
      fileContentType: DiscoveryV1.AddDocumentConstants.FileContentType.APPLICATION_JSON
    });
  }

  deleteDocument(documentId: string) {
    return this.discoveryV1.deleteDocument({
      environmentId: this.configService.get<string>('WATSON_DISCOVERY_ENVIRONMENT_ID'),
      collectionId: this.configService.get<string>('WATSON_DISCOVERY_COLLECTION_ID'),
      documentId
    });
  }
}
