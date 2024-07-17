const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const testData = [
  {
    title: 'Testi1',
    author: 'veigar',
    url: 'http//test',
    likes: 2,
  },
  {
    title: 'Testi2',
    author: 'veigar',
    url: 'http//test',
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(testData);
});

test('blogs are 2 blogs returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(response.body.length, 2);
});

test('response json has id field', async () => {
  const response = await api.get('/api/blogs').expect(200);
  console.log(response.body);
  response.body.forEach((item) => {
    assert('id' in item, 'should have "id"');
  });
});

test('blogs can be added', async () => {
  const newBlog = {
    tittle: 'Test3',
    author: 'veigar',
    url: 'http//test3',
    likes: 3,
  };

  await api.post('/api/blogs').send(newBlog).expect(201);

  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, testData.length + 1);
});

test.only('blogs can be deleted', async () => {
  const response = await api.get('/api/blogs');

  bloglist = response.body;

  await api.delete(`/api/blogs/${bloglist[1].id}`).expect(204);

  blogListAtEnd = await api.get('/api/blogs');
  assert.strictEqual(blogListAtEnd.body.length, bloglist.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});
