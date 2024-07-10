import express from 'express';
import setMood from '../controllers/setMood.js';
const SetJournalRoute = express.Router ();

SetJournalRoute.post ('/journal/createJournal', setMood);

export default SetJournalRoute;
