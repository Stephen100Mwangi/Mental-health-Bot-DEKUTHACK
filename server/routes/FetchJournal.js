import express from 'express';
import fetchMood from '../controllers/fetchMood.js';
const FetchJournalRoute = express.Router ();

FetchJournalRoute.get ('/journal/fetchJournal', fetchMood);

export default FetchJournalRoute;
;
