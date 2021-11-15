import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
import { connect } from "react-redux";
import {
  saveUserRequest,
  fetchUserRequest,
  updateUserRequest,
  // fetchRequestTypes,
} from "../../services/index";

import { Card, Form, Button, Col, InputGroup, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

class Service extends Component {
  constructor(props) {
    super(props);
    this.getGeoLocation();
    this.state = this.initialState;
    this.state = {
      requestTypes: [{"value": "Inquiry", "display": "Inquiry"}, {"value": "Complaint", "display": "Complaint"}],
      show: false,
      currentLocation: { lat: 0, lng: 0 },
      selectedRequestType: "Inquiry",
      statuses: [{"value": "Pending", "display": "Pending"}, {"value": "Completed", "display": "Completed"},{"value": "Hold", "display": "Hold"}],
      selectedStatus: "Pending",

    };
  }

    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };
    

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude: lat, longitude: lng } }) => {
                    const pos = { lat, lng };
                    this.setState({ currentLocation: pos });

                }
            )
        }
    }
  

  initialState = {
    id: "",
    description: "",
    lng: "",
    lat: "",
    requestType: "",
  };
  
  

  componentDidMount() {
    const userRequestId = +this.props.match.params.id;
    if (userRequestId) {
      this.findUserRequestById(userRequestId);
    }
    // this.findAllRequestTypes();
  }



  /*findAllRequestTypes = () => {
    // this.props.fetchRequestTypes();
    setTimeout(() => {
      let userRequestRequestTypes = this.props.serviceObject.requestTypes;
      if (userRequestRequestTypes) {
        this.setState({
          requestTypes: [{ value: "", display: "Select Request Type" }].concat(
            userRequestRequestTypes.map((requestType) => {
              return { value: requestType, display: requestType };
            })
          ),
        });
        
      }
    }, 100);
  };*/

  findUserRequestById = (userRequestId) => {
    this.props.fetchUserRequest(userRequestId);
    setTimeout(() => {
      let service = this.props.serviceObject.service;
      if (service != null) {
        this.setState({
          id: service.id,
          description: service.description,
          requestType: service.requestType,
          lng: service.lng,
          lat: service.lat,
          status: service.status,
        });
      }
    }, 1000);
  };

  resetUserRequest = () => {
    this.setState(() => this.initialState);
  };

  submitUserRequest = (event) => {
    event.preventDefault();

    const service = {
      description: this.state.description,
      lat: this.state.currentLocation.lat,
      lng: this.state.currentLocation.lng,
      requestType: this.state.selectedRequestType,
      status: this.state.selectedStatus,
    };

    this.props.saveUserRequest(service);
    setTimeout(() => {
      
      if (this.props.serviceObject.service != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updateUserRequest = (event) => {
    event.preventDefault();

    const service = {
      id: this.state.id,
      description: this.state.description,
      requestType: this.state.requestType,
      lat: this.state.lat,
      lng: this.state.lng,
      status: this.state.status,
    };
    this.props.updateUserRequest(service);
    setTimeout(() => {
      if (this.props.serviceObject.service != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  }; 

  userRequestChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.state.selectedRequestType= event.target.value;
    console.log(this.state);
  };

  userStatusChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.state.selectedStatus= event.target.value;
    console.log(this.state);
  };

  userDescriptionChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  userRequestList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const { description, requestType, status, lat, lng} =
      this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "User Request Updated Successfully."
                : "User Request Saved Successfully."
            }
            type={"success"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
            {this.state.id ? "Update User Request" : "Add New User Request"}
          </Card.Header>
          <Form
            onReset={this.resetUserRequest}
            onSubmit={this.state.id ? this.updateUserRequest : this.submitUserRequest}
            id="userRequestFormId"
          >
            <Card.Body>
             
              <Form.Row>

              <Form.Group as={Col} controlId="formGridRequestType">
                  <Form.Label>Request Type</Form.Label>
                  <Form.Control 
                    
                    as="select"
                    custom
                    onChange={this.userRequestChange}
                    name="requestType"
                    value={requestType}
                    className={"bg-dark text-white"}
                  >
                    {this.state.requestTypes.map((requestType) => (
                      <option key={requestType.value} value={requestType.value}>
                        {requestType.display}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDescription">
                  <Form.Label>Request Description</Form.Label>
                  <Form.Control 
                    required
                    autoComplete="off"
                    type="test"
                    name="description"
                    value={description}
                    onChange={this.userDescriptionChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Request Description"
                  />
                </Form.Group>
                
                <Form.Group as={Col} controlId="formGridRequestStatus">
                  <Form.Label>Request Status</Form.Label>
                  <Form.Control 
                    
                    as="select"
                    custom
                    onChange={this.userStatusChange}
                    name="status"
                    value={status}
                    className={"bg-dark text-white"}
                  >
                    {this.state.statuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.display}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                
              </Form.Row>


             



            </Card.Body>
            <div style={{ height: '40vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyA2XoGs4Kejgqsy3TimgTV2p4bVSLzlf10" }}
                    center={this.state.currentLocation}
                    zoom={15}
                    
                    
                >
                  <Marker
            lat={this.state.currentLocation.lat}
            lng={this.state.currentLocation.lng}
            name="My Marker"
            color="blue"
          />
              </GoogleMapReact>
            </div>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={() => this.userRequestList()}
              >
                <FontAwesomeIcon icon={faList} /> User Request List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    serviceObject: state.service,
  };
};

const Marker = props => {
  return <div className="SuperAwesomePin"></div>
}


const mapDispatchToProps = (dispatch) => {
  return {
    saveUserRequest: (service) => dispatch(saveUserRequest(service)),
    fetchUserRequest: (userRequestId) => dispatch(fetchUserRequest(userRequestId)),
    updateUserRequest: (service) => dispatch(updateUserRequest(service)),
    // fetchRequestTypes: () => dispatch(fetchRequestTypes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
