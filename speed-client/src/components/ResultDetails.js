import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Rating } from 'react-simple-star-rating';
import Modal from 'react-bootstrap/Modal';

export const ResultDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //creating IP state
  const [ip, setIP] = useState('');

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  useEffect( () => {
    //passing getData method to the lifecycle method
    getData()
  }, [])


  //Retrieve rating from the database
  const [rating, setRating] = useState(0);

  //Handle dialog open and close
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //User rating
  const [userRating, setUserRating] = useState(0);

  const submitRating = () => {
    const ratingParams = {
      articleID: location.state.data.id,
      practitionerID: ip,
      score: userRating,
    }

    axios.post(`${process.env.REACT_APP_DB_URL}/ratings/addRating`, ratingParams)
    .then(() => {
      //Close the dialog
      handleClose();

      //Reload the page
      window.location.reload();
    }
    )
    .catch(err => {
      console.log(err);
    }
    )
  }

  //retrieve list of practice from database
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DB_URL}/ratings/getRatingsForArticle/${location.state.data.id}`)
      .then((res) => {
        setRating(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid min-vh-100 bg-dark text-white">
      <div className="text-center p-3">
        <Link to="/" className="text-white text-decoration-none">
          <h1>SPEED</h1>
        </Link>
        <p>Software Practice Empirical Evidence Database</p>
        <hr></hr>
        <h3 className="m-5"> {location.state.data.title}</h3>
      </div>
      <Container className="bg-light text-dark d-flex justify-content-center align-items-center border rounded p-4 w-50">
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
              <Rating 
              showTooltip={true}
              className="mb-2" initialValue={rating.average} readonly={true} allowFraction={true} size={25}/>
              <p>Rating is based on {rating.count} users</p>
            </Col>
          </Row>

          <Button onClick={handleShow}>
            Submit a rating
          </Button>
        </Container>
      </Container>


      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Rate this article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          On a scale from 1 to 5, how would you rate this article?
          <div className="text-center">
          <Rating className="mb-2" 
            initialValue={0} 
            onClick={(value) => setUserRating(value)}
            allowFraction={true} size={25}/>
          </div>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={submitRating}>Submit</Button>
        </Modal.Footer>
      </Modal>

      <div className="text-center p-5">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    </div>
  );
};
