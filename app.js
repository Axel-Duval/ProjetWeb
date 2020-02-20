const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000


const server = app.listen(PORT, () => {
    console.log('Server is running on port 3000...');
});