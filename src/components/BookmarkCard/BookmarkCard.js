import React from "react";
import Styles from "./BookmarkCard.module.css";
import { useUser } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../backendUrl";

export default function BookmarkCard({ data, removebookmark }) {
  const { user } = useUser();
  data.date_of_publish = new Date(data.date_of_publish);
  const navigate = useNavigate();

  const handleRemoveBookmark = () => {
    // remove bookmark
    const url =
     backendUrl+ "/user/" + user._id + "/bookmarks/" + data._id;

    axios
      .delete(url)
      .then((res) => {
        removebookmark(data._id);
      })
      .catch((err) => console.log(err));
  };

  const handleBookmarkClick = (e) => {
    // redirect to single article page
    if (e.target.className.includes("remove-from-bookmarks")) return;
    navigate("/articles/" + data._id);
  };

  return (
    <div
      onClick={handleBookmarkClick}
      id={data._id}
      className={`card ${Styles["card"]}`}
    >
      <div className={Styles["bookmark-image-container"]}>
        <img
          className={`${Styles["card-img-top"]}`}
          src={data.image_link}
          alt="Card"
        />
      </div>

      <div className={`card-body ${Styles["card-body"]}`}>
        <div className={Styles["body-top"]}>
          <h2 className={`card-title ${Styles["card-title"]}`}>{data.title}</h2>
          <h6 className={Styles["writtenby"]}>
            Written by : {data.author_name}
          </h6>
          <h6 className={Styles["date-part"]}>
            Posted on: {data.date_of_publish.getDate()}-
            {data.date_of_publish.getMonth() + 1}-
            {data.date_of_publish.getFullYear()}
          </h6>
        </div>

        <button
          onClick={handleRemoveBookmark}
          className={Styles["remove-from-bookmarks"]}
        >
          Remove From Bookmarks
        </button>
      </div>
    </div>
  );
}
