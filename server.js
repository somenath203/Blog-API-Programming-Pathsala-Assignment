require('dotenv').config();
const express = require('express');
const { StatusCodes } = require('http-status-codes');

const { connectDB } = require('./config/dbConfig');
const blogRoutes = require('./routes/blogRoutes');
const rankRoutes = require('./routes/rankRoutes');


connectDB();


const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'server of blog api programming pathsala is up and running successfully'
    })
});

app.use(blogRoutes);
app.use(rankRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
});