import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <Navbar expand="lg" className="bg-white border-bottom box-shadow">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <img src="/icon.png" alt="icon" width="25" className="me-2" />
          </Link>
          React Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="text-dark">
              <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#action2" className="text-dark">
              <Link
                to="/contact"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                Contact
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <NavDropdown title="Admin" id="navbarScrollingDropdown">
          <NavDropdown.Item>
            <Link
              to="/admin/products"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Products
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link
              to="/profile"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Profile
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <Link
              to="/logout"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Logout
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export function Footer() {
  return (
    <div className="text-center p-4 border-top ">
      <img src="/icon.png" alt="icon" width={20} /> React Store
    </div>
  );
}
