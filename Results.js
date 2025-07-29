import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Results = ({ results }) => {
  return (
    <List sx={{ mt: 4 }}>
      {results.map((res, idx) => (
        <ListItem key={idx}>
          <ListItemText
            primary={`Short: ${res.short}`}
            secondary={`Original: ${res.original} | Valid for: ${res.expiry}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Results;
