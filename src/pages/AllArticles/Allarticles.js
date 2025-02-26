import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import styles from "./allarticles.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {toast} from 'sonner'
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle } from "../../store/article-slice";
import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation.js'
import { backendUrl } from "../../backendUrl.js";
const Allarticles = () => {
  
  const articles=useSelector((state)=>state.articles.articles)
  const dispatch=useDispatch();
  function deletearticle(id, e) {
    e.preventDefault();
    axios
      .delete(`${backendUrl}/articles/${id}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.status) {
          dispatch(deleteArticle(id))
          toast.success('Article deleted successfully')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    setLoading(true)
    const timeinterval=setTimeout(() => {
      setLoading(false)
      
    }, 300);
    return () => clearTimeout(timeinterval);
  },[]
  )

  return (
    <>
    {loading && <LoadingAnimation></LoadingAnimation>}
    <div className={styles.body}>
      <AdminNavbar></AdminNavbar>
      <div className={styles.right}>
        <div className={styles.heading}>
          <h2>All Articles</h2>
        </div>
        <div className={styles.allcards}>
          {articles &&
            articles.map((article) => {
              return (
                <div>
                  <Link
                    to={`/articles/${article._id}`}
                    style={{ textDecoration: "none", color: "#0f1c60" }}
                  >
                    <div className={styles.singlecard}>
                      <div className={styles.image}>
                        <img src={article.image_link} alt="" />
                      </div>
                      <div className={styles.content}>
                        <div className={styles.titler}>
                          <div className={styles.title}>
                            {article.title.substring(0, 50)}...
                          </div>
                          <div class={styles.topicsss}>{article.topic}</div>
                        </div>
                        <div className={styles.tags}>
                          {article.tags.slice(0, 3).map((tag) => {
                            return <div className={styles.ettag}>{tag}</div>;
                          })}
                        </div>
                      </div>
                      <div className="bottom">
                        <div className={styles.writer}>
                          --{article.author_name}
                        </div>
                        <div className={styles.deletion}></div>
                        <button
                          className={styles.deleteArticle}
                          onClick={(e) => {
                            deletearticle(article._id, e);
                          }}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </Link>
                  {!articles.length && (
                    <div
                      className="not_available"
                      style={{
                        height: "300px",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img src={require(`../../assets${null.png}`)} alt="" />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
    </>
  );
};
export default Allarticles;
