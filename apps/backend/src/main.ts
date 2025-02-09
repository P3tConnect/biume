import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { startDevServer, getPublicDir } from '@monorepo/shared';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Biume API')
    .setDescription("Documentation de l'API Biume")
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // Ceci est l'identifiant de la sécurité
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await startDevServer(app);

  app.useStaticAssets(getPublicDir(), {
    immutable: true,
    maxAge: '1y',
    index: false,
  });

  const selectedPort = process.env.PORT ?? 3000;
  console.log(`Running on port http://localhost:${selectedPort}`);
  console.log(
    `Swagger documentation available at http://localhost:${selectedPort}/api`,
  );
  await app.listen(selectedPort);
}
bootstrap();
