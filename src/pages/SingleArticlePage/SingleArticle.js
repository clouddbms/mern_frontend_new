import React from "react";
import MyNavbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Styles from "./SingleArticle.module.css";
import CommentsSection from "../../components/CommentsSection/CommentsSection";
import { toast } from "sonner";
import { useUser } from "../../providers/UserProvider";
import { backendUrl } from "../../backendUrl";

export default function SingleArticle() {
  const { user } = useUser();
  let { articleId } = useParams();
  const [article, setArticle] = useState({
    title: "Demo Title",
    author_name: "Demo Author",
    date_of_publish: new Date(),
    image_link: "",
    content: "Demo Content",
    likes: 0,
    dislikes: 0,
  });
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    // fetch data from backend
    axios.get(`${backendUrl}/articles/${articleId}`).then((res) => {
      const data = res.data;
      setArticle({
        title: data.title,
        author_name: data.author_name,
        date_of_publish: new Date(data.date_of_publish),
        content: data.content,
        image_link: data.image_link,
        likes: data.likes,
        dislikes: data.dislikes,
      });
      // console.log(data.liked_userids);
      if (data.liked_userids.includes(user._id)) {
        setLiked(true);
      }
      if (data.disliked_userids.includes(user._id)) {
        setDisliked(true);
      }
    });
  }, [articleId]);

  let {
    title,
    author_name,
    date_of_publish,
    content,
    likes,
    dislikes,
    image_link,
  } = article;

  const handleAddToBookmarks = () => {
    // add to bookmarks
    const url =
    backendUrl+"/user/" + user._id + "/bookmarks/" + articleId;
      axios.post(url).then((res)=>{
        toast.success("successfully added to your bookmarks");
      })
      .catch((err)=>console.log(err));
  };
  function userdislike() {
    if (disliked) return;
    else {
      if (liked) {
        setLiked(false);
        setDisliked(true);

        setArticle((oldata) => {
          return {
            ...oldata,
            dislikes: oldata.dislikes + 1,
            likes: oldata.likes - 1,
          };
        });
      } else {
        setLiked(false);
        setDisliked(true);
        setArticle((oldata) => {
          return { ...oldata, dislikes: oldata.dislikes + 1 };
        });
      }
      axios
        .post(`${backendUrl}/articles/disliked/${articleId}`, {
          userid: user._id,
        })
        .then((res) => res.data)
        .then((data) => {
          if (data.success) {
            console.log("disliked");
          } else {
            console.log("error occured");
          }
        });
    }
  }
  function userlike() {
    if (liked) return;
    else {
      if (disliked) {
        setLiked(true);
        setDisliked(false);
        setArticle((oldata) => {
          return {
            ...oldata,
            likes: oldata.likes + 1,
            dislikes: oldata.dislikes - 1,
          };
        });
      } else {
        setLiked(true);
        setDisliked(false);
        setArticle((oldata) => {
          return { ...oldata, likes: oldata.likes + 1 };
        });
      }
      axios
        .post(`${backendUrl}/articles/liked/${articleId}`, {
          userid: user._id,
        })
        .then((res) => res.data)
        .then((data) => {
          if (data.success) {
            console.log("liked");
          } else {
            console.log("error occured");
          }
        });
    }
  }
  return (
    <>
      <MyNavbar />
      <div className={Styles.body}>
        <h1 className={Styles.heading}>{title}</h1>
        {/* <img className={Styles.image} src={'../../assets'+image_link} alt="" width="1000px" height="500px"/> */}
        <img
          className={Styles.image}
          src={image_link}
          alt=""
          width="1000px"
          height="500px"
        />
        <h2 className={Styles.written}>
          -- Written by <i>{author_name}</i> --
        </h2>
        <h3 className={Styles.date}>
          {date_of_publish.getDate()}-{date_of_publish.getMonth() + 1}-
          {date_of_publish.getFullYear()}
        </h3>
        <button
          onClick={handleAddToBookmarks}
          style={{ border: "none" }}
          className={Styles.addtowishlist}
        >
          <i className="fa-solid fa-bookmark"></i>Add to Bookmarks
        </button>
        <div
          className={Styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className={Styles.rating}>
          <div className={Styles.liked}>
            <button
              onClick={userlike}
              className={`${Styles.submitlike} ${Styles.like_btn}`}
            >
              <i
                style={{
                  fontSize: "40px",
                  paddingRight: "10px",
                  color: liked ? "rgb(6, 108, 191)" : "",
                }}
                className={`fa-solid fa-thumbs-up ${Styles.rated}`}
              ></i>
            </button>
            <h4>{likes}</h4>
          </div>
          <div className={Styles.disliked}>
            <button
              onClick={userdislike}
              className={`${Styles.submitdislike} ${Styles.like_btn}`}
            >
              <i
                style={{
                  fontSize: "40px",
                  color: disliked ? "rgb(6, 108, 191)" : "",
                }}
                className={`fa-solid fa-thumbs-down ${Styles.unrated}`}
              ></i>
            </button>
            <h4>{dislikes}</h4>
          </div>
        </div>
        <h2 style={{ textAlign: "center" }}>***** Thank You *****</h2>
        <div className={Styles["comments-section"]}>

          Comments Section
          <CommentsSection articleId={articleId} />

        </div>
      </div>
      <Footer />
    </>
  );
}
