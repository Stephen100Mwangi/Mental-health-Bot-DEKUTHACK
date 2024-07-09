import Message from '../models/Messages.js'
const updateMessage = async (req, res) => {
  try {
    const messages = await Message.find ({chat: req.params.chatId}).populate (
      'sender',
      'username email'
    );
    res.json ({messages});
  } catch (error) {
    res.status (500).json ({message: 'Error fetching messages'});
  }
};

export default updateMessage