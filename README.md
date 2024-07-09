# Quick Start #

Hello and welcome to our Mental Health Chat Bot. This is a full stack web application that allows users to interact with a chatbot, share their feelings, and get feedback regarding their mental wellness.

# Technologies To Use #

## Frontend ##
HTML - For building the basic skeleton of the user interface
CSS - For styling the application

## Backend ##
JavaScript - For functionality. Manipulates logic based on a given action
Node.js
Socket.io - A library that enables low-latency, bidirectional, and event-based communication between a client and a server. The Socket.IO connection can be established with different low-level transports: HTTP long-polling.

## Major Milestones ##

### Journaling ###

Users will be in a position to input occurrences of each day, based on their mood, keep track of the inputs but will not be able to update or change them.

### Anonymous peer support ###

Based on the users' mental problems, the system will connect users with other users (anonymously) where they will chat in real-time, share experiences, and offer or receive any advice.

### Resource Recommendations ###

Besides having a listening ear, patients ought to be empathized with, not just sympathized with. A user will be able to receive information about any necessary medical resources - hospitals, articles, therapists where they can further get the support needed.

### Mood tracking ###

Based on user input, users will receive a message informing them about their mood and valuable insights into their emotional well-being.

## Running ##
To run the app use:
1. Navigate to server directory
     1. cd server
     2. run the command `npm run start` This will start the backend using the express framework. The server is running using `nodemon`. Therefoore you will not need to 
        restart the server as the `nodemon` does that for you
     3. While still on the termial, open another tab of the server and run the command `npx json-server --watch data/Resources.json --port:8800`. This command will start the 
        JSON mock server. This is where all resources for hospitals and Therapists are stored. This is mmeant to connect the patient with the right resources.
   
 
2. Navigate to client directory
   To run the client (friontend side) navigate to the client folder
   1. while in the root directory `PS S:\Mental-HealthBot-DekutHack>`.The path may be different but the root directory is `Mental-HealthBot-DekutHack` run the command
       `cd client` This will naviagte you to the frontend side.
   2. Run the command `npm run dev`. This command will launch you app on developer mode. Since the frontend is build on Vite, you app will most likely run on 
      `http://localhost:5173/` However, if the port is in use, adifferent port will be used.


Now you app is app and running
