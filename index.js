require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const YourModel = mongoose.model('YourModel', new mongoose.Schema({
  name: String,
  age: Number,
}));

app.put('/update-data/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const result = await YourModel.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update data' });
  }
});

app.delete('/delete-data/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await YourModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
