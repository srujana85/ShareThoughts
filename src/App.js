import react, { useState, useEffect } from "react";
import { addPost, getAllPost, getFilteredPost } from "./apihelpers";
import "./App.css";
import Card from "./Card";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

function App() {
  const [search, setsearch] = useState(1);
  const [allPost, setallPost] = useState([]);
  const [modal, setModal] = useState(false);
  const [post, setpost] = useState({
    title: "",
    body: "",
    userId: 1,
  });

  const { title, body } = post;

  useEffect(() => {
    getAllPost().then((data) => {
      setallPost(data);
      console.log("GET RESPONSE");
      console.log(data);
    });
  }, []);

  const handleChange = (name) => (e) => {
    setpost({ ...post, [name]: e.target.value });
  };
  const seachChange = (e) => {
    setsearch(e.target.value);
  };

  const filterPosts = () => {
    if (search > 10 || search < 1) {
      alert("No user Found");
      return;
    }
    getFilteredPost(search).then((data) => {
      setallPost(data);
      console.log("FILTERED RESPONSE");
      console.log(data);
    });
  };
  const savepost = async () => {
    await addPost(post).then((data) => {
      console.log("POST ADD RESPONSE");
      console.log(data);
      alert(`
      Post Has been Created Succeefully
      with id ${data.id}`);
    });

    setModal(false);
    setpost({ ...post, body: "" });
    setpost({ ...post, title: "" });
  };

  return (
    <>
      <PureModal
        header="App Post"
        footer={
          <div>
            <button className="modal_btn_save" onClick={savepost}>
              Save
            </button>
          </div>
        }
        isOpen={modal}
        closeButton="X"
        closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div className="add_post_cont">
          <form>
            <input
              className="modal_title_input"
              type="text"
              placeholder="Enter Post Title"
              required
              value={title}
              onChange={handleChange("title")}
            />
            <textarea
              className="modal_desc_input"
              rows="4"
              type="text"
              placeholder="Enter Post Body"
              value={body}
              onChange={handleChange("body")}
              required
            />
          </form>
        </div>
      </PureModal>
      <div className="App">
        <h1 className="main_head">Share Thoughts</h1>
        <button className="add_post_btn" onClick={() => setModal(true)}>
          Add Post
        </button>
        <hr />
        <div className="main_container">
          <div className="link_cont">
            <h3 className="link_text">Share your thoughts on the go...</h3>
            <div className="searchCont">
              <input
                type="text"
                value={search}
                className="search_input"
                placeholder="Enter User ID to filter"
                onChange={seachChange}
              />
              <button className="search_btn" onClick={filterPosts}>
                Filter
              </button>
            </div>
          </div>
          <div className="cards_list_container">
            {
              allPost &&
                allPost.map((post) => (
                  <Card
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    user_id={post.userId}
                    body={post.body}
                  />
                ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
