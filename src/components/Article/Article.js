import React from "react";
import Styles from "./Article.module.css";

export default function Article({ setClickedId, article_data, i }) {
  const getArticleSize = (i) => {
    if (i % 9 <= 2) return "article-30";
    else if (i % 9 === 3 || i % 9 === 6) return "article-60";
    else if (i % 9 === 4 || i % 9 === 5) return "article-40";
    else return "article-50";
  };

  const articleClickHandler = (e) => {
    if(article_data.article_link!==undefined) {
      // open the article in new tab
      window.open(article_data.article_link, "_blank");
    }
    else{
      console.log(article_data);
      let modal = document.querySelector(".modal-image");
      let popImage = document.querySelector(".pop-image");
      let descriptionText = document.querySelector(".description-text");
      popImage.src = article_data["image_link"];
      descriptionText.innerHTML = article_data["content"].slice(0, 350);
  
      // scroll to top of page
      setClickedId(article_data["_id"]);
      window.scrollTo(0, 0);
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <div
      onClick={articleClickHandler}
      id="article_data['_id']"
      className={`${Styles[getArticleSize(i)]} ${Styles["article"]}`}
    >
      <div className={Styles["clip-img"]}>
        <img src={article_data["image_link"]} alt="H-1" />
      </div>
      <div className={Styles["short-desc"]}>
        <h6 className={Styles["article-title"]}> {article_data["title"]}</h6>
        <div className={Styles["tags"]}>
          {article_data["tags"].map((tag, index) => {
            if (index < 4)
              return <span className={Styles["singleTag"]}>{tag}</span>;
          })}
        </div>
        <span className={`${Styles["text-desc"]} ${Styles["dontshow"]}`}>
          {article_data["content"].substring(0, 350)} ...
        </span>
        <div style={{ justifyContent: "right", display: "flex" }}>
          <i
            style={{
              fontSize: "18px",
              marginRight: "5px",
              marginTop: "3px",
              color: "rgb(6,108,191)",
            }}
            className="fa-solid fa-arrow-up"
          ></i>
          <h5>{article_data["likes"]}</h5>
        </div>
      </div>
    </div>
  );
}
