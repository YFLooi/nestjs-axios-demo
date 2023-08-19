import { Module } from '@nestjs/common';
import { AxiosReqsController } from './axios-reqs.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AxiosReqsController],
})
export class AxiosReqsModule {}
