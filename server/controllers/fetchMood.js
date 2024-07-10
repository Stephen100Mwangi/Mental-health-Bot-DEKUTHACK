import Moods from '../models/Moods.js';

const fetchMood = async (req, res) => {
  try {
    const all_Entries = await Moods.find();
    if (!all_Entries) {
      res.status (204).json ({message: 'Journal is empty'}); //Silent or No content
      return;
    }
    if (all_Entries) {
      res.status (200).json ({message: 'Journal fetched successfully',moods:all_Entries});
      return;
    }
  } catch (error) {
    res.status (500).json ({message: 'Error fetching journal'});
    console.log (error);
    return;
  }
};

export default fetchMood;
