const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const path = require('path')
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()}  ${req.method} ${req.originalUrl}`)
    next()
})
const url = process.env.MONGO_URI
if (!url) {
    console.error('ERROR: MONGO_URI is not defined in .env file')
    process.exit(1)
}

const client = new MongoClient(url)
client.connect()
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err)
        process.exit(1)
    })

const dbName = process.env.DB_NAME || 'passop'
console.log(`🔧 Using database: ${dbName}`)
app.get('/', async (req, res, next) => {
    try {
        const db = client.db(dbName)
        const collection = db.collection('passwords')
        const findResult = await collection.find({}).toArray()
        res.json(findResult)
    } catch (err) {
        next(err)
    }
})

app.get('/api/passwords', async (req, res, next) => {
    try {
        const db = client.db(dbName)
        const collection = db.collection('passwords')
        const findResult = await collection.find({}).toArray()
        res.json(findResult)
    } catch (err) {
        next(err)
    }
})

app.post('/api/passwords', async (req, res, next) => {
    try {
        const password = req.body
        const db = client.db(dbName)
        const collection = db.collection('passwords')
        const result = await collection.insertOne(password)
        res.send({ success: true, result })
    } catch (err) {
        next(err)
    }
})

app.delete('/api/passwords', async (req, res, next) => {
    try {
        const { id } = req.body
        const db = client.db(dbName)
        const collection = db.collection('passwords')
        const result = await collection.deleteOne({ id })
        res.send({ success: true, result })
    } catch (err) {
        next(err)
    }
})
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err && (err.stack || err.message || err))
    res.status(500).json({ success: false, error: (err && err.message) || 'Internal Server Error' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📊 API endpoints:`)
    console.log(`   GET    http://localhost:${PORT}/api/passwords`)
    console.log(`   POST   http://localhost:${PORT}/api/passwords`)
    console.log(`   DELETE http://localhost:${PORT}/api/passwords`)
})