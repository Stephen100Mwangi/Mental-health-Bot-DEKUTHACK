import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema (
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chats',
    },
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model ('Messages', MessageSchema);
export default Messages;
