import React, { Component } from "react";
import { Link } from "react-router-dom";

const ThreadPost = ({
  threads,
  ellipsify,
  ellipse,
  toggleKarma,
  currentKarma,
  addDefaultSrc,
  handleDelete
}) => {
  return (
    <div className="threads backc">
      <div className="">
        {threads.map(thread => (
          <div key={thread._id} className="thread-outer">
            <div className="thread-container">
              {thread.imageURL && (
                <div className="blackc">
                  <a href={thread.imageURL}>
                    <img
                      className="thread-image blackc"
                      src={thread.imageURL}
                      alt=""
                      onError={addDefaultSrc}
                    />
                  </a>
                </div>
              )}
              <div className="thread-details pl-2">
                <div className="thread-username text-secondary">
                  /{thread.username} - {thread._id}
                </div>
                <Link to={`/thread/${thread._id}`} className="link-opt">
                  <div className="thread-subject">
                    {ellipsify(thread.subject, ellipse[0])}
                  </div>
                  <div className="thread-message">
                    {ellipsify(thread.message, ellipse[1])}
                  </div>
                </Link>
                <div className="toggle-karma">
                  +{thread.karma}
                  <div onClick={() => toggleKarma(thread)}>
                    {thread.karma === currentKarma(thread._id) ? (
                      <i className="far fa-thumbs-up pl-2"></i>
                    ) : (
                      <i className="fas fa-thumbs-up text-primary pl-2"></i>
                    )}
                  </div>
                </div>
                <div className="thread-info">
                  <div className="thread-date">{thread.datePosted}</div>
                  <div className="delete-btn-container">
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => handleDelete(thread._id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadPost;
