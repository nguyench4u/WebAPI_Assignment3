const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if the connection fails (optional)
  }
};

connectDB();

// Movie schema, from the assignment instructions. Added required and index for validation and performance
const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  releaseDate: { type: Number, required: true, min: [1900, 'Must be greater than 1899']},
  genre: {
    type: String,
    required: true,
    enum: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery','Thriller', 'Western', 'Science Fiction'],
  },
  actors: {
    type: [{
      actorName: { type: String, required: true },
      characterName: { type: String, required: true },
    }],
    required: true,
    validate: [arr => arr.length >= 3, 'Must have at least 3 actors'],
  },
});

module.exports = mongoose.model('Movie', MovieSchema);