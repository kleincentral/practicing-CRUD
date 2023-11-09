const express = require('express');
const app = express()
const PORT = 5001
const songsRouter = require('./routes/songs.router')
const foodRouter = require('./routes/foods.router')
const activityRouter = require('./routes/activity.router')

app.use(express.json())
app.use(express.static('server/public'));

// ROUTES
app.use('/songs', songsRouter);
app.use('/foods', foodRouter);
app.use('/activities', activityRouter)


// Start listening for requests on PORT
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});