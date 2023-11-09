const express = require('express');
const songsRouter = express.Router();

const pool = require('../modules/pool.js');

let sortBy = 'id'

songsRouter.get('/', (req,res) => {
    // console.log("Getting Data from server.")
    let text = `
    SELECT * FROM "songs"
    ORDER BY "${sortBy}";`
    pool.query(text)
    .then((dbResult) => {
      res.send(dbResult.rows)
    }).catch((dbError)=>{
      res.sendStatus(500)
    })
})

songsRouter.delete('/:id', (req, res) => {
  console.log("Delete Route called!")
  let text = `
  DELETE FROM "songs"
  WHERE "id" = $1;`
  let sqlValues = [req.params.id]
  pool.query(text, sqlValues)
  .then((dbResult) =>{
    res.sendStatus(201)
  }).catch((dbError) => {
    res.sendStatus(500)
  })
})

songsRouter.post('/', (req,res) => {
  console.log("Post Route Called!")
  let text = `
  INSERT INTO "songs"
    ("artist", "songName", "notes")
  VALUES
    ($1,$2,$3)
  `
  let sqlValues = [
    req.body.artist, 
    req.body.songName,
    req.body.notes
  ]

  pool.query(text, sqlValues)
  .then((dbResult) => {
    res.sendStatus(201)
  }).catch((dbError) => {
    res.sendStatus(500)
  })
})

songsRouter.post('/sortBy', (req,res) =>{
  sortBy = req.body.sortBy
  res.sendStatus(201)
})


module.exports = songsRouter