const express = require('express');
const axios = require('axios');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// OpenAI API endpoint
app.post('/api/openai', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: message,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const reply = response.data.choices[0].text.trim();
    res.json({ reply });
  } catch (error) {
    res.status(500).send('Error communicating with OpenAI');
  }
});

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
