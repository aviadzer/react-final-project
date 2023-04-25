import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from "../contexts/AuthContext"

/*
  This component implements a Navigation bar to be displayed at the top of each page in the application.
  If a user is logged-in, his/her name is displayed with a welcome message and a Logout button
*/

function Navigation() {
  const {currentUser} = useAuth();
  return (
    <>
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/Menu">Menu</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/Customers">Customers</Nav.Link>
        <Nav.Link href="/Products">Products</Nav.Link>
        <Nav.Link href="/Purchased">Purchased</Nav.Link>


      </Nav>
      {currentUser.user && <Navbar.Text >Hello, {currentUser.user?.email}&nbsp;&nbsp;&nbsp;</Navbar.Text>}
      {currentUser.user && <Nav className="justify-content-end" >
        <Nav.Link className="text-info" href="/Logout">Logout</Nav.Link>
      </Nav>}


    </Container>
  </Navbar>
  </>
  );
}

export default Navigation;