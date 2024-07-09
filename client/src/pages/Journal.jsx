import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../public/css/styles.css';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [entryText, setEntryText] = useState('');
  const [mood, setMood] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('/api/journal');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = { entryText, mood };
      await axios.post('/api/journal', newEntry);
      setEntryText('');
      setMood('');
      fetchEntries();
    } catch (error) {
      console.error('Error submitting entry:', error);
    }
  };

  return (
    <div className="container">
      <h1>JOURNAL YOUR THOUGHTS</h1>
      <div className="journal-entry-form">
        <h2>New Journal Entry</h2>
        <form id="journalForm" onSubmit={handleSubmit}>
          <label htmlFor="entryText">Your Entry</label>
          <textarea
            id="entryText"
            name="entryText"
            rows="5"
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

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="journal-entries">
        <h2>Previous Entries</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Entry</th>
              <th>Mood</th>
            </tr>
          </thead>
          <tbody id="entryList">
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.createdAt).toLocaleString()}</td>
                <td>{entry.entryText}</td>
                <td>{entry.mood}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Journal;

