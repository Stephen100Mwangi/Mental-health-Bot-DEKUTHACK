import mongoose from 'mongoose';

const MoodsSchema = new mongoose.Schema (
  {
    username: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
    entry: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Moods = mongoose.model ('Moods', MoodsSchema);
export default Moods;
