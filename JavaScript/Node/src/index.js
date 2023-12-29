import express from 'express'

const app = express()

app.get('/', (res,res)=> res.send('hello mundo'))

app.listen(3000)
console.log("server listenig ", 3000)