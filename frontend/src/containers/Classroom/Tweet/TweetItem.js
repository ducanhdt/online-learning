
import React from "react";


//const TweetItem = ({date, text, username, removeTweet, isOwner}) => {
//     function PostHeader({ author, date }) {
//   return (
//     <div className="post-header">
//       <img className="avatar" src={author.avatar} />
//       <div className="details">
//         <span>{author.name}</span>
//         <span>{date}</span>
//       </div>
//     </div>
//   );
// }

// function PostComments({ comments }) {
//   return (
//     <div className="post-comments">
//       <div className="divider" />
//       {comments.map(comment => (
//         <div key={comment.id} className="comment">
//           <img className="avatar" src={comment.author.avatar} />
//           <p>
//             <span>{comment.author.name}</span>
//             {comment.content}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

const TweetItem=({ author, date, content, comments })=> {

    function PostHeader({ author, date }) {
        return (
          <div className="post-header">
            {/* <img className="avatar" src={author.avatar} /> */}
            <div className="details">
              <span>{author}</span>
              <span>{date}</span>
            </div>
          </div>
        );
      }
      
      function PostComments({ comments }) {
        return (
          <div className="post-comments">
            <div className="divider" />
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <img className="avatar" src={comment.author.avatar} />
                <p>
                  <span>{comment.author.name}</span>
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        );
      }

  return (
    <div className="post">
      <PostHeader author={author} date={date} />
      <p className="post-content">{content}</p>
      {/* <PostComments comments={comments} /> */}
    </div>
  );
}
//}

export default TweetItem;