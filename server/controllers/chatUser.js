import Chats from '../models/Chats.js';
const chatUser = async (req, res) => {
  const {userIds} = req.body;

  if (!userIds || userIds.length !== 2) {
    res.status (400).json ({message: 'Two user IDs are required'});
    return;
  }

  try {
    let chat = await Chats.findOne ({
      users: {$all: userIds},
      isGroupChat: false,
    });

    if (!chat) {
      chat = await Chats.create ({
        users: userIds,
      });
    }

    chat = await chat.populate ('users', 'username email');
    res.json ({chat});
  } catch (error) {
    res.status (500).json ({message: 'Error fetching/creating chat'});
  }
};

export default chatUser;
