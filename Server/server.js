const express = require('express')
const app = express()
const pool = require("./db");
var cors = require('cors')

const port = 3001

app.use(cors())

// Query users
app.get('/query', async (req, res) => {
    try {
        const { username } = req.query
        console.log([username])
        //const user = await pool.query("SELECT * FROM users WHERE username = '" + username + "'");
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        res.json(user.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})