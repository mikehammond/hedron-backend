import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

import { VendorsService } from '../../shared/services/vendors.service';
import { VendorType } from './dto/vendor.dto';
import { VendorInput } from './dto/vendor.input';
import { IUser } from '../../shared/interfaces/user.interface';

@Resolver('Vendors')
export class VendorsResolver {
  constructor(
    private readonly vendorsService: VendorsService
  ) {}

  @Query(() => [VendorType])
  allVendors(
    @Context('user') user: IUser,
  ) {
    if (!user || !user.permissions.includes('approve_changes:products')) {
      throw new UnauthorizedException('unauthorized to retrieve all vendors');
    }

    return this.vendorsService.allVendors();
  }

  @Query(() => VendorType, { nullable: true })
  vendor(
    @Context('user') user: IUser,
  ) {
    if (!user) {
      throw new UnauthorizedException('unauthorized to retrieve a vendor profile');
    }

    return this.vendorsService.vendorByUserId(user.sub);
  }

  @Mutation(() => VendorType)
  addVendor(
    @Context('user') user: IUser,
    @Args('vendor') vendor: VendorInput
  ) {
    if (!user) {
      throw new UnauthorizedException('unauthorized to create a vendor profile');
    }

    return this.vendorsService.addVendor(user.sub, vendor);
  }

  @Mutation(() => VendorType)
  async updateVendor(
    @Context('user') user: IUser,
    @Args('vendorId') vendorId: string,
    @Args('update') update: VendorInput
  ) {
    if (!user) {
      throw new UnauthorizedException('unauthorized to update a vendor profile');
    }

    const vendor = await this.vendorsService.vendorById(vendorId);

    if (!vendor) {
      throw new NotFoundException(`vendor with id ${vendorId} does not exists`);
    }

    if (user.sub !== vendor.userId) {
      throw new UnauthorizedException('vendor profile is not yours to update');
    }

    return await this.vendorsService.updateVendor(vendorId, update);
  }

  @Mutation(() => VendorType)
  async deleteVendor(
    @Context('user') user: IUser,
    @Args('vendorId') vendorId: string,
  ) {
    if (!user) {
      throw new UnauthorizedException('unauthorized to delete a vendor profile');
    }

    const vendor = await this.vendorsService.vendorById(vendorId);

    if (!vendor) {
      throw new NotFoundException(`vendor with id ${vendorId} does not exists`);
    }

    if (user.sub !== vendor.userId) {
      throw new UnauthorizedException('vendor profile is not yours to delete');
    }

    return await this.vendorsService.deleteVendor(vendorId);
  }
}
