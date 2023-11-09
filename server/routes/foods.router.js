const express = require('express');
const foodsRouter = express.Router();

const pool = require('../modules/pool.js');

foodsRouter.get('/', (req,res) => {
    // console.log("Getting Data from server.")
    let text = `
    SELECT * FROM "foods"
    ORDER BY "mealtime";`
    pool.query(text)
    .then((dbResult) => {
      res.send(dbResult.rows)
    }).catch((dbError)=>{
      res.sendStatus(500)
    })
})

foodsRouter.post('/', (req,res) => {
    let text = `
    INSERT INTO "foods"
      ("food", "mealtime")
    VALUES
      ($1, $2)`

    let sqlValues = [
        req.body.food,
        req.body.mealTime
    ]
    pool.query(text, sqlValues)
    .then((dbResult)=> {
        res.sendStatus(201)
    }).catch((dbError)=>{
        res.sendStatus(500)
    })
})

foodsRouter.delete('/:food', (req,res) => {
    console.log("Delete Called!")
    let text = `
        DELETE FROM "foods"
        WHERE "id" = $1`
    let sqlValues=[req.params.food]
    pool.query(text,sqlValues)
    .then((dbResult)=>{
        res.sendStatus(201)
    }).catch((dbError) =>{
        res.sendStatus(500)
    })

})

module.exports = foodsRouter