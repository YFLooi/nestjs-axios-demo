import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable, catchError, firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@ApiTags('app')
@Controller('')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  @ApiOperation({
    description: 'Simple hello world',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
