import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { isValidUrl, logEvent } from './utils';
import Results from './Results';

const MAX_URLS = 5;

const URLShortener = () => {
  const [entries, setEntries] = useState([{ longUrl: '', shortcode: '', validity: 30 }]);
  const [results, setResults] = useState([]);

  const handleChange = (i, field, value) => {
    const newEntries = [...entries];
    newEntries[i][field] = value;
    setEntries(newEntries);
  };

  const handleAdd = () => {
    if (entries.length < MAX_URLS) {
      setEntries([...entries, { longUrl: '', shortcode: '', validity: 30 }]);
    }
  };

  const handleShorten = async () => {
    const validEntries = entries.filter(e => isValidUrl(e.longUrl));
    if (validEntries.length === 0) {
      alert("Please enter at least one valid URL.");
      return;
    }

    logEvent('Shorten Attempt', validEntries);

    // Simulated shortening logic (replace with API call)
    const shortened = validEntries.map(e => ({
      original: e.longUrl,
      short: `http://short.ly/${e.shortcode || Math.random().toString(36).substring(2, 8)}`,
      expiry: `${e.validity} minutes`
    }));

    setResults(shortened);
    logEvent('Shorten Success', shortened);
  };

  return (
    <>
      {entries.map((entry, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <TextField
            label="Long URL"
            fullWidth
            required
            value={entry.longUrl}
            onChange={(e) => handleChange(i, 'longUrl', e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Custom Shortcode (optional)"
            fullWidth
            value={entry.shortcode}
            onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Validity (minutes)"
            type="number"
            fullWidth
            value={entry.validity}
            onChange={(e) => handleChange(i, 'validity', parseInt(e.target.value))}
          />
        </Box>
      ))}

      {entries.length < MAX_URLS && (
        <Button variant="outlined" onClick={handleAdd}>Add Another</Button>
      )}
      <Box mt={2}>
        <Button variant="contained" onClick={handleShorten}>Shorten URLs</Button>
      </Box>

      {results.length > 0 && <Results results={results} />}
    </>
  );
};

export default URLShortener;
