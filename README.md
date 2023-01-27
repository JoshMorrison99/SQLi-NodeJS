# SQLi-NodeJS

![image](https://user-images.githubusercontent.com/25315255/215185536-bcb86237-0f02-4b11-8366-9e7457245d08.png)

## Express 
```js
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
        const user = await pool.query("SELECT * FROM users WHERE username = '" + username + "'");
        console.log(user.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

**Vulnerability 1) User Controlled Variable without Sanitization**
The query below is vulnerable to SQL injection attack.
```js
const user = await pool.query("SELECT * FROM users WHERE username = '" + username + "'");
```

The following payload can be used to retrive all users from the database.
```sql
' OR 1=1-- -
```

```sql
SELECT * FROM users WHERE username = '' OR 1=1-- -'
```

**Vulnerability 2) NodeJS SQL Injection in mysqljs Library**
https://flattsecurity.medium.com/finding-an-unseen-sql-injection-by-bypassing-escape-functions-in-mysqljs-mysql-90b27f6542b4

*Payload*
```json
username=admin&password[password]=1
```


**Prevention 1) Prepared Statements**
```js
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
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        res.json(user.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

