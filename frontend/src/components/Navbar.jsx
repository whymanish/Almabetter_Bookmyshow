import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import {useEffect} from 'react';
function HeadNavbar(props) {
  // const [cookies] = useCookies([]);

  return (
    <>
      
        <Navbar style={{backgroundColor:"#333545"}} expand="lg">
          <Container fluid>
          {/* <Link to='/'></Link> */}
            <img src="BMS.png" width="130px" height="40px" />
            
          </Container>
        </Navbar>
      
    </>
  );
}

export default HeadNavbar;