import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import axios from 'axios'; // Import axios if you're using it

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [entryText, setEntryText] = useState('');
  const [mood, setMood] = useState('');
  const user = useSelector((state) => state.bot_User.value);

  useEffect(() => {
    fetchEntries();
  }, [user]); // Add user as a dependency

  const fetchEntries = async () => {
    try {
      const response = await fetch("http://localhost:5680/journal/fetchJournal");
      if (!response.ok) {
        toast.error("Failed to fetch entries");
        return;
      }
      const data = await response.json();
      const filteredData = data.moods.filter(x => x.username === user._id);
      setEntries(filteredData);
    } catch (error) {
      toast.error("Error fetching entries");
      console.error('Error fetching entries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = { username: user._id, mood, entry: entryText };
      const response = await fetch("http://localhost:5680/journal/createJournal", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });
      if (!response.ok) {
        toast.error("Failed to add journal entry");
        return;
      }
      toast.success("Journal added successfully");
      setEntryText('');
      setMood('');
      fetchEntries(); // Refresh entries
    } catch (error) {
      toast.error("Error submitting entry");
      console.error('Error submitting entry:', error);
    }
  };

  return (
    <div className='flex w-full items-center justify-center'>
      <div id="journal" className="flex justify-center items-center flex-col shadow-2xl p-8 mt-20 rounded-sm bg-card mb-20 space-y-6 min-w-96">
        <Toaster position='top-left' />
        <h1 className='w-full text-xl font-bold text-center'>JOURNAL YOUR THOUGHTS</h1>
        <div className="flex flex-col space-y-3">
          <h2 className='font-medium text-xl text-center my-10'>New Journal Entry</h2>
          <form id="journalForm" onSubmit={handleSubmit} className='flex flex-col space-y-3'>
            <label htmlFor="entryText">Your Entry</label>
            <textarea
              id="entryText"
              className='p-2 outline-none'
              name="entryText"
              rows="5"
              cols="40"
              required
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
            />
            <label htmlFor="mood">Your Mood</label>
            <select
              id="mood"
              name="mood"
              required
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="">Select Mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="anxious">Anxious</option>
              <option value="excited">Excited</option>
              <option value="angry">Angry</option>
            </select>
            <div className='flex my-20 justify-center items-center w-full'>
              <Button text_Content='Submit' />
            </div>
          </form>
        </div>
        <div className="journal-entries">
          <h2 className='font-medium text-xl text-center my-10'>Previous Entries</h2>
          <div>
            <div className='flex justify-between space-x-32 my-5 pb-5 border border-b border-black border-l-0 border-t-0 border-r-0'>
              <div className='w-2/6'>Date</div>
              <div className='w-3/6'>Entry</div>
              <div className='w-1/6'>Mood</div>
            </div>
            <div id="entryList" className='flex flex-col space-y-5'>
              {entries.map((item) => (
                <div className='flex justify-between space-x-32' key={item._id}>
                  <div className='w-2/6 font-mono text-sm'>{new Date(item.createdAt).toLocaleString()}</div>
                  <div className='w-3/6 font-normal text-base text-left'>{item.entry}</div>
                  <div className='w-1/6 font-light text-base'>{item.mood}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
