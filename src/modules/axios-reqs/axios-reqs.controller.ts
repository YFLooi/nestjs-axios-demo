import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AddNewObjectDto,
  PartiallyUpdateExistingObjectDto,
  UpdateExistingObjectDto,
} from './axios-reqs.dto';

@ApiBearerAuth()
@ApiTags('axios-reqs')
@Controller('axios-reqs')
export class AxiosReqsController {
  constructor(private readonly httpService: HttpService) {}

  @Get('get-biography/:itemNumber')
  @ApiOperation({
    description: 'Pass in any positive integer to return a Star Wars biography',
  })
  async getSwapiBiography(
    @Param('itemNumber') itemNumber: string,
  ): Promise<AxiosResponse> {
    return this.httpService.axiosRef
      .get(`https://swapi.dev/api/people/${itemNumber}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.message);
      });
  }

  @Get('get-all-objects')
  @ApiOperation({
    description: 'Get all objects in list',
  })
  async getAllObjects(): Promise<AxiosResponse> {
    return this.httpService.axiosRef
      .get(`https://api.restful-api.dev/objects`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.message);
      });
  }

  @Post('add-new-object')
  @ApiOperation({
    description:
      'Adds new object to list. Note returned itemId for subsequent POST, PUT, and DELETE requests',
  })
  async addNewObject(@Body('') body: AddNewObjectDto): Promise<AxiosResponse> {
    return this.httpService.axiosRef
      .post(`https://api.restful-api.dev/objects`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.message);
      });
  }

  @Put('update-object/:itemId')
  @ApiOperation({
    description:
      'Update object in list. itemId returned by POST to /add-new-object',
  })
  async updateObject(
    @Param('itemId') itemId: string,
    @Body('') body: UpdateExistingObjectDto,
  ): Promise<AxiosResponse> {
    return this.httpService.axiosRef
      .put(`https://api.restful-api.dev/objects/${itemId}`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.message);
      });
  }

  @Patch('partially-update-object/:itemId')
  @ApiOperation({
    description:
      'Partially update object in list. itemId returned by POST to /add-new-object',
  })
  async partiallyUpdateObject(
    @Param('itemId') itemId: string,
    @Body('') body: PartiallyUpdateExistingObjectDto,
  ): Promise<AxiosResponse> {
    return this.httpService.axiosRef
      .patch(`https://api.restful-api.dev/objects/${itemId}`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.message);
      });
  }

  @Delete('delete-object/:itemId')
  @ApiOperation({
    description:
      'Delete object in list. itemId returned by POST to /add-new-object',
  })
  async deleteObject(@Param('itemId') itemId: string): Promise<AxiosResponse> {
    return this.httpService.axiosRef
      .delete(`https://api.restful-api.dev/objects/${itemId}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.message);
      });
  }
}
