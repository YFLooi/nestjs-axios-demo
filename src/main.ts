import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  const config = new DocumentBuilder()
    .setTitle('Nestjs axios demo')
    .setDescription('Playgroup to try out @nestjs/axios package')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
  });

  await app.listen(port);
  console.log(
    `====> nestjs app successfully started at port ${port}. Swagger doc reachable at 'http://127.0.0.1:${port}/docs'`,
  );
}
bootstrap();
