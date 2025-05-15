import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule); 

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());
  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('Multi-Branch Education System API')
    .setDescription(
      'This API manages multiple educational centers, their branches, courses, groups, students, enrollments, payments, attendance tracking, and user roles (admin, manager, teacher).',
    )
    .setVersion('1.0')
    .addTag('Education, multi-branch, NestJS, Mongo/PostgreSQL')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter JWT token for authorized access',
    })
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`Server running at: http://localhost:${PORT}/api`),
  );
}

start();
