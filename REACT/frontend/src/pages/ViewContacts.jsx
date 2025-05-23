import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const API_URL = "http://localhost:8080/contacts";

  useEffect(() => {
    axios.get(API_URL).then((res) => setContacts(res.data));
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">View Contacts</h2>
      <Row>
        {contacts.map((contact) => (
          <Col md={4} sm={6} xs={12} key={contact.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{contact.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {contact.email} <br />
                  <strong>Phone:</strong> {contact.phone}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewContacts;
