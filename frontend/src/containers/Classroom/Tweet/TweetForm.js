import React, {Component, useState, useRef} from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import {connect} from "react-redux";
import axios from 'axios';


const TweetForm = ({userName,classId}) => {
    

    const [state, setState] = useState({
        tweet: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
          const { tweet } = state;
          if (tweet.trim() !== '' ) {
              console.log(state.tweet);
              setErrorMsg('');
            //   console.log(classId);
              const res = await axios.post(`http://localhost:8080/api/v1/tweet`,{
                user: userName,
                tweet: state.tweet
              })
              .then((response) => {
                console.log(response);
              }, (error) => {
                console.log(error);
              });
          } else {
            setErrorMsg('Please enter all the field values.');
          }
        } catch (error) {
          error.response && setErrorMsg(error.response.data);
        }
      };


    const handleInputChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.value
        });
      };
    
    return (
            <div className="row align-items-center justify-content-center">
                <div className="col-sm-10">
                    <form onSubmit={handleOnSubmit}>
                        {/* {this.props.errors.message && (
                            <div className="alert alert-danger">
                                {this.props.errors.message}
                            </div>
                        )} */}
                        <div className="row">
                            <div className="col-md-9">
                            <Form.Control
                                type="text"
                                name="tweet"
                                value={state.tweet || ''}
                                placeholder="Enter title"
                                onChange={handleInputChange}
                            />
                            </div>
                            <div className="col-md-2 text-center d-inline-block">
                                <button type="submit" className="btn btn-success tweeter">
                                    Tweet
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )

}


export default TweetForm;