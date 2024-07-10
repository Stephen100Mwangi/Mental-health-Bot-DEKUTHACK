import Moods from '../models/Moods.js';

const setMood = async (req, res) => {
  const {username, mood, entry} = req.body;

  if (!username || !mood || !entry) {
    return res.status (400).json ({message: 'All fields must be provided'});
  }

  try {
    const payload = {username, mood, entry};
    const newMood = await Moods.create (payload);

    if (!newMood) {
      return res.status (400).json ({message: 'Mood journal not created'});
    }

    return res
      .status (201)
      .json ({message: 'Mood journal created successfully', mood: newMood});
  } catch (error) {
    console.error ('Error creating journal:', error);
    return res
      .status (500)
      .json ({message: 'Error creating journal', error: error.message});
  }
};

export default setMood;
