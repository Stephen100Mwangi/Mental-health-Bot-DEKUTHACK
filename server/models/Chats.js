import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema (
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Users', // Will refer from the Users model
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Messages',
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  {
    timestamps: true,
  }
);

const Chats = mongoose.model ('Chats', ChatSchema);
export default Chats;
