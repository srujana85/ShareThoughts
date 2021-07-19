import React, { useState } from "react";
import "./card.css";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { delPost, editPost, getComment } from "./apihelpers";

const Card = ({ id, title, body, userId }) => {
  const [modale, setModale] = useState(false);
  const [modald, setModald] = useState(false);
  const [comments, setcomments] = useState();

  const [state, setstate] = useState({
    _title: title,
    _body: body,
    _id: id,
  });

  const { _title, _body, _id } = state;

  const handleChange = (name) => (e) => {
    setstate({ ...state, [name]: e.target.value });
  };

  const editThePost = () => {
    editPost(state).then((data) => {
      alert(`
          Post with id ${data.id} been Edited Succeefully`);
      console.log("EDIT RESPONSE");
      console.log(data);

      setModale(false);
    });
  };

  const delThePost = () => {
    delPost().then((data) => {
      alert(`
          Post Has been Deleted Succeefully
          ok: ${data.ok} 
          Url: ${data.url} 
          status: ${data.status}`);
      console.log("DELETE RESPONSE");
      console.log(data);
    });
  };

  const commentsSection = () => {
    setModald(true);
    getComment(_id).then((data) => {
      console.log("COMMENTS");
      console.log(data);
      setcomments(data);
    });
  };

  return (
    <>
      <PureModal
        header="Edit Post"
        footer={
          <div>
            <button className="modal_btn_save" onClick={editThePost}>
              Save
            </button>
          </div>
        }
        isOpen={modale}
        closeButton="X"
        closeButtonPosition="bottom"
        onClose={() => {
          setModale(false);
          return true;
        }}
      >
        <div className="add_post_cont">
          <form>
            <input
              className="modal_title_input"
              type="text"
              placeholder="Edit Post Title"
              required
              value={_title}
              onChange={handleChange("_title")}
            />
            <textarea
              className="modal_desc_input"
              rows="12"
              type="text"
              placeholder="Edit Post Body"
              value={_body}
              onChange={handleChange("_body")}
              required
            />
          </form>
        </div>
      </PureModal>

      <PureModal
        header={`All Comments of Post id ${_id}`}
        footer={
          <div>
            <p>Share Thoughts Comments...</p>
          </div>
        }
        isOpen={modald}
        closeButton="X"
        closeButtonPosition="bottom"
        onClose={() => {
          setModald(false);
          return true;
        }}
      >
        <div>
          {comments &&
            comments.map((comment) => {
              return (
                <div key={comment.id} className="comment_cont">
                  <p className="comment_email">{comment.email}</p>
                  <p className="comment_title">{comment.name}</p>
                  <p className="comment_body">{comment.body}</p>
                </div>
              );
            })}
        </div>
      </PureModal>
      <div className="card_container">
        <div className="card_text">
          <p className="card_title_text">{title}</p>
          <p className="card_desc_text">{body}</p>
          <p className="card_comments_btn" onClick={commentsSection}>
            view comments
          </p>
        </div>
        <div className="card_btns">
          <button className="edit_post" onClick={() => setModale(true)}>
            Edit post
          </button>
          <button className="del_post" onClick={delThePost}>
            Delete post
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
