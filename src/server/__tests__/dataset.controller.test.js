const request = require('supertest');
const app = require('../server'); // Adjust the path to your main server file
const mockData = require('../utils/mockData');

describe('Dataset Routes', () => {
  
  // Dataset Core Operations
  describe('GET /', () => {
    it('should return all datasets', async () => {
      const response = await request(app).get('/api/datasets');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('GET /:datasetId', () => {
    it('should return a specific dataset', async () => {
      const datasetId = mockData.datasets[0].datasetId;
      const response = await request(app).get(`/api/datasets/${datasetId}`);
      expect(response.status).toBe(200);
      expect(response.body.datasetId).toBe(datasetId);
    });

    it('should return 404 for non-existent dataset', async () => {
      const response = await request(app).get('/api/datasets/nonexistent');
      expect(response.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('should create a new dataset', async () => {
      const newDataset = { name: 'New Dataset', description: 'Test dataset' };
      const response = await request(app).post('/api/datasets').send(newDataset);
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(newDataset.name);
    });
  });

  describe('PUT /:datasetId', () => {
    it('should update an existing dataset', async () => {
      const datasetId = mockData.datasets[0].datasetId;
      const updateData = { name: 'Updated Dataset' };
      const response = await request(app).put(`/api/datasets/${datasetId}`).send(updateData);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updateData.name);
    });
  });

  describe('DELETE /:datasetId', () => {
    it('should delete a dataset', async () => {
      const datasetId = mockData.datasets[0].datasetId;
      const response = await request(app).delete(`/api/datasets/${datasetId}`);
      expect(response.status).toBe(204);
    });
  });

  // Dataset Workflow
  describe('POST /:datasetId/submit', () => {
    it('should submit a dataset', async () => {
      const datasetId = mockData.datasets[0].datasetId;
      const response = await request(app).post(`/api/datasets/${datasetId}/submit`);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('PENDING');
    });
  });

  describe('POST /:datasetId/approve', () => {
    it('should approve a dataset', async () => {
      const datasetId = mockData.datasets[0].datasetId;
      const response = await request(app).post(`/api/datasets/${datasetId}/approve`);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('APPROVED');
    });
  });

  describe('POST /:datasetId/reject', () => {
    it('should reject a dataset', async () => {
      const datasetId = mockData.datasets[0].datasetId;
      const response = await request(app).post(`/api/datasets/${datasetId}/reject`);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('REJECTED');
    });
  });

  // Dataset Comments
  describe('GET /:datasetId/comments', () => {
    it('should return comments for a dataset', async () => {
      const datasetId = mockData.datasets[0].datasetId;
      const response = await request(app).get(`/api/datasets/${datasetId}/comments`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('POST /:datasetId/comments', () => {
    it('should add a comment to a dataset', async () => {
      const datasetId = mockData.datasets[0].datasetId;
      const newComment = { text: 'Test comment', userId: 'user123' };
      const response = await request(app).post(`/api/datasets/${datasetId}/comments`).send(newComment);
      expect(response.status).toBe(201);
      expect(response.body.text).toBe(newComment.text);
    });
  });
});