import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request for clients', () => {
    const email = 'mytest2@test.com';
    return request(app.getHttpServer())
      .post('/users/client')
      .send({
        email,
        password: 'test',
      })
      .expect(201)
      .then((res) => {
        const { email, id } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as new user and then get currently logged in user', async () => {
    const email = 'mytest2@test.com';
    await request(app.getHttpServer())
      .post('/users/client')
      .send({
        email,
        password: 'test',
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/users/client/login')
      .send({
        email,
        password: 'test',
      })
      .expect(201);

    const cookie = response.get('Set-Cookie');
    const { body } = await request(app.getHttpServer())
      .get('/users/client')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
