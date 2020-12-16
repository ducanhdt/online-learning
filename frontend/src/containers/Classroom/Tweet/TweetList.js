import React, {Component,useState, useEffect} from "react";
import {connect} from "react-redux";
import TweetItem from "./TweetItem";
import axios from 'axios';
import MaterialTable from 'material-table';

const TweetList = ({userName,classId}) => {

    const [tweetList, setTweetList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        const getTweetList = async () => {
          try {
            
            const { data } = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/v1/getAllTweets`);
            //console.log(data);
            setErrorMsg('');
            
            setTweetList(data.result);
            //console.log(filesList);
          } catch (error) {
            error.response && setErrorMsg(error.response.data);
          }
        };
    
        getTweetList();
      }, []);



    return (
        <div className="row col-sm-8">
            <div className="row col-sm-12">
                <ul className="list-group col-sm-12" id="tweets">
                <table className="files-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {tweetList.length > 0 ? (
            tweetList.map(
              ({ id, text, user,createdAt }) => (
                <TweetItem
                author={userName}
                date ={createdAt}
                content={text}
                //profileImgURL={t.user.profileImgURL}
                //removeTweet={deleteTweet.bind(this, t.user._id ,t._id)}
                //isOwner={currentUser === t.user._id}
            />
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
                </ul>
            </div>
        </div>
    );
};

export default TweetList;