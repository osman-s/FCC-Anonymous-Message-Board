import React, { Component } from "react";
import ThreadForm from "./threadForm";
import {
  getThreads,
  upvoteThread,
  removeUpvoteThread
} from "../services/messageService";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    threads: [],
    threadFormToggle: true,
    ogThreads: [],
    karmaState: true
  };

  async componentDidMount() {
    const { data: threads } = await getThreads();
    this.setState({ threads, ogThreads: threads });
    console.log(threads);
  }

  refreshThreads = async () => {
    const { data: threads } = await getThreads();
    this.setState({ threads });
  };
  currentKarma = id => {
    const thread = this.state.ogThreads.filter(thread => thread._id === id);
    return thread[0].karma;
  };
  handleThreadToggle = async () => {
    await this.setState({ threadFormToggle: !this.state.threadFormToggle });
  };
  toggleKarma = async thread => {
    console.log("typeof threadkarma", thread.karma);
    console.log("typeof threadCurrentkarma", this.currentKarma(thread._id));
    if (thread.karma <= this.currentKarma(thread._id)) {
      await upvoteThread(thread._id);
    } else {
      await removeUpvoteThread(thread._id);
    }
    await this.refreshThreads();
  };
  addDefaultSrc(ev) {
    ev.target.src =
      "https://dubsism.files.wordpress.com/2017/12/image-not-found.png?w=768";
  }
  ellipsify = (str, x = 10) => {
    if (str.length > x) {
      return str.substring(0, x) + "...";
    } else {
      return str;
    }
  };

  render() {
    const { threads } = this.state;

    return (
      <div>
        <div className="toggle-thread">
          <button
            className="btn btn-secondary toggle-thread-button"
            onClick={this.handleThreadToggle}
          >
            Toggle Thread Form
          </button>
        </div>
        {this.state.threadFormToggle && (
          <ThreadForm
            toggle={this.handleThreadToggle}
            refresh={this.refreshThreads}
          />
        )}
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
                          onError={this.addDefaultSrc}
                        />
                      </a>
                    </div>
                  )}
                  <div className="thread-details pl-2">
                    <div className="thread-username text-secondary">
                      /{thread.username}
                    </div>
                    <Link to={`/thread/${thread._id}`} className="link-opt">
                      <div className="thread-subject">
                        {this.ellipsify(thread.subject, 30)}
                      </div>
                      <div className="thread-message">
                        {this.ellipsify(thread.message, 50)}
                      </div>
                    </Link>
                    <div>
                      +{thread.karma}
                      <div
                        onClick={() => this.toggleKarma(thread)}
                        className="toggle-karma"
                      >
                        {thread.karma === this.currentKarma(thread._id) ? (
                          <i className="far fa-thumbs-up pl-2"></i>
                        ) : (
                          <i className="fas fa-thumbs-up text-primary pl-2"></i>
                        )}
                      </div>
                    </div>
                    <div className="thread-date">{thread.datePosted}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
