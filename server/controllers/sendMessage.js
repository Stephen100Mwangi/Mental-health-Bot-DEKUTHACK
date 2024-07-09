import Chats from '../models/Chats.js';
import Messages from '../models/Messages.js';
import Users from '../models/Users.js';

const sendMessage = async (req, res) => {
  const {content, chatID} = req.body;

  if (!content || !chatID) {
    res.status (400).json ({message: 'Content and chatID needed.'});
    return;
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatID,
  };

  try {
    var message = await Messages.create (newMessage);

    message = await message.populate ('sender', 'username');
    message = await message.populate ('chat');
    message = await Users.populate (message, {
      path: 'chat.users',
      select: 'name pic email',
    });

    await Chats.findByIdAndUpdate (req.body.chatID, {
      latestMessage: message,
    });

    res.json (message);
  } catch (error) {
    res.status (400).json ({message: 'Error sending message ' + error});
  }
};

export default sendMessage;
