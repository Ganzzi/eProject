import React from 'react'
import { formatDateTime } from '../../../utils'

const RepliedCommentCard = ({cmt, onUpdate}) => {
    console.log(cmt);
    // onUpdate(id);
  return (
    <div
        className="card"
        style={{ opacity: "0.7" }}
    >
        <div className="card-body p-2">
            <div className="d-flex align-items-center mb-2">
                <img
                    src={
                        "http://127.0.0.1:8000/api/images/" +
                        cmt.user_image
                    }
                    alt="Replied Commentor Image"
                    className="rounded-circle"
                    style={{
                        width: "20px",
                        height: "20px",
                    }}
                />
                <div>
                    <h6 className="card-title ml-2 mb-0">
                        {cmt.user_name}
                    </h6>
                    <p className="card-subtitle text-muted font-size-xs">
                        {formatDateTime(cmt.created_at)}
                    </p>
                </div>
            </div>
            <p className="card-text font-size-xs">
                {cmt.text}
            </p>
        </div>
    </div>
  )
}

export default RepliedCommentCard