import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const Welcome = (props) => {
  
  const [requests, setRequests] = useState("");

  useEffect(() => {
    if (requests === "") {
      props.history.push("/login");
    }
  }, [requests]);

  return (
    <Card bg="dark" text="light">
      <Card.Header>Welcome to User Request Portal
 

      </Card.Header>
      <Card.Body style={{ overflowY: "scroll", height: "570px" }}>
        {requests &&
          requests.map((quote, id) => (
            <blockrequest className="blockquote mb-0" key={id}>
            </blockrequest>
          ))}
      </Card.Body>
    </Card>
  );
};

export default Welcome;
