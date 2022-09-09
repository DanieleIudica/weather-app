import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container className="notFound">
      <Row className="justify-content-center mt-4">
        <Col md={6} className="text-center">
          <h2 className="text-danger my-5">404 - Page Not Found</h2>
          <Button
            variant="light"
            onClick={() => {
              setTimeout(() => {
                navigate("/");
              }, 500);
            }}
          >
            Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
