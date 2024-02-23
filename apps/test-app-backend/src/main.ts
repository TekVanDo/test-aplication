import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { promises } from 'fs';
import { join } from 'path';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { formatClassValidatorErrors } from './app/common/errors/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      exceptionFactory: (errors) => {
        throw new BadRequestException({ validations: formatClassValidatorErrors(errors) });
      },
    })
  );
  app.enableCors({
    origin: [
      'http://localhost:4200',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true,
  });

  const pkg = JSON.parse(await promises.readFile(join('.', 'package.json'), 'utf8'));
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion(pkg.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-swagger', app, document);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  console.log('port', process.env.PORT ?? 3003);
  await app.listen(process.env.PORT ?? 3003);
}

bootstrap();

process.on('unhandledRejection', (e) => {
  console.error('Unhandled rejection', e.toString());
});
