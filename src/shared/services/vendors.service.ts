import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { IVendor } from "../interfaces/vendor.interface";
import { VendorInput } from "../../graphql/vendors/dto/vendor.input";

@Injectable()
export class VendorsService {
  constructor(
    @InjectModel('Vendor') private readonly vendorModel: Model<IVendor>
  ) {}

  async allVendors(): Promise<IVendor[]> {
    try {
      return await this.vendorModel.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async vendorByUserId(userId: string): Promise<IVendor> {
    try {
      return await this.vendorModel.findOne({ userId });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async vendorById(_id: string): Promise<IVendor> {
    try {
      return await this.vendorModel.findById(_id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addVendor(userId: string, vendor: VendorInput): Promise<IVendor> {
    try {
      return await this.vendorModel.create({ userId, ...vendor });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateVendor(_id: string, update: VendorInput): Promise<IVendor> {
    try {
      return await this.vendorModel.findByIdAndUpdate(_id, update, { new: true, runValidators: true });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteVendor(_id: string): Promise<IVendor> {
    try {
      return await this.vendorModel.findByIdAndDelete(_id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}