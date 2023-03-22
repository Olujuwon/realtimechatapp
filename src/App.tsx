import React from 'react';
import './App.css';
import {HelmetProvider, Helmet} from "react-helmet-async";
import {useRoutes} from "react-router-dom";
import routes from "./routes";
import { Container } from 'react-bootstrap';
function App() {
    const content = useRoutes(routes);
    return (
        <HelmetProvider>
            <Helmet
                titleTemplate="%s | Messaging App"
                defaultTitle="Messaging App"
            />
            <Container fluid className="App">
                {content}
            </Container>
        </HelmetProvider>
    );
}

export default App;
