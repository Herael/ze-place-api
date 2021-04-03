import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';

const app = 'http://localhost:3000';

describe('AppController (e2e)', () => {

  it('/ (GET)', () => {
    return request(app())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
