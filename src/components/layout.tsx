import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export function NavBar() {
  return (
    <Navbar expand="lg" className="bg-white border-bottom box-shadow">
      <Container>
        <Navbar.Brand href="#">
          <img src="/icon.png" alt="icon" width="25" className="me-2" />
          React Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className="text-dark">
              Home
            </Nav.Link>
            <Nav.Link href="#action2" className="text-dark">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <NavDropdown title="Admin" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Products</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export function Footer() {
  return (
    <div className="text-center p-4 border-top">
      <img src="/icon.png" alt="icon" width={30} className="me-2" />
    </div>
  );
}
