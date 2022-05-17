const connecttoMongo=require('./db')
const express = require('express')
connecttoMongo();
const cors=require('cors')
const app = express()
const port = 5000
app.use(cors())


app.use(express.json())
// defing routes as b
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`i notebook backend listening on http://localhost:${port}`)
})