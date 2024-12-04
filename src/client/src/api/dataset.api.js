import axios from 'axios';

const createDataset = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3000/datasets', formData);
    console.log('Dataset created:', response.data);
  } catch (error) {
    console.error('Error creating dataset:', error.response.data.message);
  }
};