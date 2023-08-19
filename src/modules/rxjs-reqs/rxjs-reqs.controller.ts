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
import { catchError, firstValueFrom } from 'rxjs';
import {
  AddNewObjectDto,
  PartiallyUpdateExistingObjectDto,
  UpdateExistingObjectDto,
} from './rxjs-reqs.dto';

@ApiBearerAuth()
@ApiTags('rxjs-reqs')
@Controller('rxjs-reqs')
export class RxjsReqsController {
  constructor(private readonly httpService: HttpService) {}

  @Get('get-people/:itemNumber')
  @ApiOperation({
    description: 'Pass in any positive integer to return a Star Wars biography',
  })
  async getSwapiPeople(@Param('itemNumber') itemNumber: string) {
    try {
      // Returns axios response wrapped in rxjs observable object
      // Utility of using rxjs with requests? It bundles together response and error handling in a more compact form vs regular axios
      const { data } = await firstValueFrom(
        this.httpService.get(`https://swapi.dev/api/people/${itemNumber}`).pipe(
          catchError((error) => {
            throw `An error happened. Msg: ${JSON.stringify(
              error?.response?.data,
            )}`;
          }),
        ),
      );
      return data;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  @Get('get-all-objects')
  @ApiOperation({
    description: 'Get all objects in list',
  })
  async getAllObjects(): Promise<AxiosResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`https://api.restful-api.dev/objects`).pipe(
          catchError((error) => {
            throw `An error happened. Msg: ${JSON.stringify(
              error?.response?.data,
            )}`;
          }),
        ),
      );

      return data;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  @Post('add-new-object')
  @ApiOperation({
    description:
      'Adds new object to list. Note returned itemId for subsequent POST, PUT, and DELETE requests',
  })
  async addNewObject(@Body('') body: AddNewObjectDto): Promise<AxiosResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .post(`https://api.restful-api.dev/objects`, body, {
            headers: { 'Content-Type': 'application/json' },
          })
          .pipe(
            catchError((error) => {
              throw `An error happened. Msg: ${JSON.stringify(
                error?.response?.data,
              )}`;
            }),
          ),
      );

      return data;
    } catch (err) {
      throw new Error(err?.message);
    }
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
    try {
      console.error(`inputs`, {
        itemId,
        body: JSON.stringify(body),
      });

      const { data } = await firstValueFrom(
        this.httpService
          .put(`https://api.restful-api.dev/objects/${itemId}`, body, {
            headers: { 'Content-Type': 'application/json' },
          })
          .pipe(
            catchError((error) => {
              console.error(`An error happened. Msg:`, {
                msg: error?.message,
                data: JSON.stringify(error?.response?.data),
              });

              throw `An error happened. Msg: ${JSON.stringify(
                error?.response?.data,
              )}`;
            }),
          ),
      );

      return data;
    } catch (err) {
      throw new Error(err?.message);
    }
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
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .patch(`https://api.restful-api.dev/objects/${itemId}`, body, {
            headers: { 'Content-Type': 'application/json' },
          })
          .pipe(
            catchError((error) => {
              throw `An error happened. Msg: ${JSON.stringify(
                error?.response?.data,
              )}`;
            }),
          ),
      );

      return data;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  @Delete('delete-object/:itemId')
  @ApiOperation({
    description:
      'Delete object in list. itemId returned by POST to /add-new-object',
  })
  async deleteObject(@Param('itemId') itemId: string): Promise<AxiosResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .delete(`https://api.restful-api.dev/objects/${itemId}`, {
            headers: { 'Content-Type': 'application/json' },
          })
          .pipe(
            catchError((error) => {
              throw `An error happened. Msg: ${JSON.stringify(
                error?.response?.data,
              )}`;
            }),
          ),
      );

      return data;
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}
