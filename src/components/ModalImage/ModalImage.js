import React from 'react';
import Styles from './MoadalImage.module.css';
import { Link } from 'react-router-dom';

const ModalImage = ({clickedId}) => {

  const handleCloseButtonClick = (e)=>{
    let modal = document.querySelector('.modal-image');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  const handleReadMoreClick = ()=>{
    document.body.style.overflow = 'auto';
  }


  return (
    <div className={`${Styles["modal-image"]} modal-image`}>
      <span onClick={handleCloseButtonClick} className={Styles["close-btn"]}>
        <a className={Styles["close-button"]} href='#a'>
          &times;
        </a>
      </span>
      <img className={`${Styles["pop-image"]} pop-image`} src="./images/health-5.jpg" alt="" />
      <div className={`${Styles["description"]} description`}>
        <span className='description-text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, perspiciatis voluptatem dignissimos vitae eum
          aspernatur nostrum eaque saepe mollitia id temporibus a inventore similique beatae in, ratione dolorum?
          Deleniti sunt suscipit accusamus ex ullam minus distinctio debitis, harum recusandae. Iusto.
        </span>
        <Link onClick={handleReadMoreClick} to={"/articles/"+clickedId} className={Styles["read-more"]} >
          Read More
        </Link>
        
      </div>
    </div>
  );
};

export default ModalImage;
