import { Module } from '@nestjs/common';
import { RxjsReqsController } from './rxjs-reqs.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RxjsReqsController],
})
export class RxjsReqsModule {}
