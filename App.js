import React from 'react';
import URLShortener from './URLShortener';
import Container from '@mui/material/Container';

function App() {
    return (
        <Container maxwidth="md">
            <h1>React URL Shortener</h1>
            <URLShortener />
        </Container>


    );
}
export default App;