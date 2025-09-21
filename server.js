const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint to get all songs

//Crud for Artists
app.post('/artists', async (req, res) => {
  try {
    const { artist_name, country } = req.body;
    const [result] = await db.query('INSERT INTO Artists (artist_name, country) VALUES (?, ?)', [artist_name, country]);
    res.json({ message: 'Artist created', artistId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all artists
app.get('/artists', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Artists');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read single artist by ID
app.get('/artists/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Artists WHERE artist_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Artist not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an artist
app.put('/artists/:id', async (req, res) => {
  try {
    const { artist_name, country } = req.body;
    const [result] = await db.query('UPDATE Artists SET artist_name = ?, country = ? WHERE artist_id = ?', [artist_name, country, req.params.id]);
    res.json({ message: 'Artist updated', affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an artist
app.delete('/artists/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Artists WHERE artist_id = ?', [req.params.id]);
    res.json({ message: 'Artist deleted', affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ CRUD for Albums ------------------

// Create a new album
app.post('/albums', async (req, res) => {
  try {
    const { album_name, artist_id, release_year } = req.body;
    const [result] = await db.query('INSERT INTO Albums (album_name, artist_id, release_year) VALUES (?, ?, ?)', [album_name, artist_id, release_year]);
    res.json({ message: 'Album created', albumId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all albums
app.get('/albums', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Albums');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an album
app.put('/albums/:id', async (req, res) => {
  try {
    const { album_name, artist_id, release_year } = req.body;
    const [result] = await db.query('UPDATE Albums SET album_name = ?, artist_id = ?, release_year = ? WHERE album_id = ?', [album_name, artist_id, release_year, req.params.id]);
    res.json({ message: 'Album updated', affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an album
app.delete('/albums/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Albums WHERE album_id = ?', [req.params.id]);
    res.json({ message: 'Album deleted', affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Start server ------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});