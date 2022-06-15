import moment from 'moment'
import React from 'react'

const Comment = ({comment}) => {
  return (
    <>
        <div className="comment_show">
        <div className="wrapper">
          <div className="user_img">
            <img
              src={comment?.author?.avatar}
              alt={comment?.author?.username}
            />
          </div>
          <div className="user_comment">
            <h3>{comment?.author?.username}</h3>
            <p>{comment?.text}</p>
            <span>{moment(comment?.date).startOf().fromNow()}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Comment