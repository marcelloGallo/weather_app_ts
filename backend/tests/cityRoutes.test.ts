import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import cityRoutes from '../routes/cityRoutes';

const app = express();
app.use(express.json());
app.use('/api/cities', cityRoutes);

beforeAll(async () => {
  // Connect to an in-memory database for testing
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weather-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
});

afterAll(async () => {
  // Close the database connection after tests
  await mongoose.connection.close();
});

describe('GET /api/cities', () => {
  it('should return all cities', async () => {
    const response = await request(app).get('/api/cities');
    expect(response.status).toBe(200);
  });
});