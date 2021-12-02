import React from 'react'
import { Container, Navbar } from 'react-bootstrap';

function Header() {
    return (
        <header style={{marginBottom:"3rem"}}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Employee Management App</Navbar.Brand>            
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;
