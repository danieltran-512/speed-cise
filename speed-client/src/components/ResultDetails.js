import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


export const ResultDetails = () => {
  const navigate = useNavigate(); 
  const location = useLocation();

  return (
    <div>
        <div className='text-center m-3'>
            <Link to='/' className='text-dark text-decoration-none'>
            <h1>SPEED</h1>
            </Link>
            <p>Software Practice Empirical Evidence Database</p>
            <hr></hr>
            <h3 className='m-5'> {location.state.data.title}</h3>
        </div>
        <Container 
        className='d-flex justify-content-center align-items-center border rounded p-4 w-50'>
        <Container>
          <Row>
            <Col>
              <h5>Authors</h5>
              <p>{location.state.data.authors}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Source</h5>
              <p>{location.state.data.journal}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Publication Year</h5>
              <p>{location.state.data.publicationYear}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Level of Evidence</h5>
              <p>{location.state.data.evidenceResults}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>RATINGS</h5>
              <p className='text-warning'>Under development</p>
            </Col>
          </Row>

          <Button onClick={()=>alert('Not yet developed.')}>
            Submit a rating
          </Button>
        </Container>
        </Container>
        
        <div className='text-center m-5'>
        <Button variant='outline-primary' onClick={()=>navigate(-1)}>Go back</Button>
        </div>
    </div>
  )
}
