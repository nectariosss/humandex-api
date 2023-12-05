import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific settings
  app.enableCors({
    origin: [
      'http://localhost:8200',
      'https://humandex-325e3.web.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });


  const config = new DocumentBuilder()
  .setTitle('Humandex API')
  .setDescription('The Humandex API description')
  .setVersion('1.0')
  .addTag('humandex')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
