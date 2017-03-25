/**
 * Created by Yura on 24.03.2017.
 */

const express = require('express')
const path = require('path');

const app = express();



app.get("/",(req, res) => {
    res.sendFile(path.join(__dirname, '5.html'))
});
app.get('/main2.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'main2.js'))
});
app.get("*",(req, res) => {
    res.sendFile(path.join(__dirname, '5.html'))
});




app.listen(3000, (err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log('Listening at http://0.0.0.0:3000')
})