import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Styles from './Slideshow.module.css' 
import {useNavigate} from 'react-router-dom';


const Slideshow = ({ sliderData: highLightArticles }) => {

  const navigate = useNavigate();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const highlightClickHandler = (slide)=>{
    // redirect to single article page
    const id = slide._id;
    if(id){
      navigate("/articles/"+id)
    }
    else{
      window.open(slide.article_link, "_blank");
    }
  }

  return (
    <div className={`${Styles["slideshow-container"]}`} data-wow-delay="0.1s">
      <Slider {...settings}>
        {highLightArticles.map((slide) => (
          <div onClick={()=>highlightClickHandler(slide)} key={slide._id} className={`${Styles.slide} active`}>
            <div className={Styles["image-part"]}>
              
              <img src={slide.image_link} alt="mindmeld" />
            </div>
            <div className={Styles["title-part"]}>{slide.title.substring(0, 200)}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;
