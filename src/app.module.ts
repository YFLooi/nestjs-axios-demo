import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AxiosReqsModule } from './modules/axios-reqs/axios-reqs.module';
import { RxjsReqsModule } from './modules/rxjs-reqs/rxjs-reqs.module';

@Module({
  imports: [HttpModule, AxiosReqsModule, RxjsReqsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
