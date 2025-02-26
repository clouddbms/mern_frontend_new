import React from 'react'
import styles from './TopicCard.module.css'
import Card from 'react-bootstrap/Card';

export default function TopicCard({id,imageSrc,description,topicName}) {
  return (
    <Card id={id} className={`${styles.card} wow fadeInLeft`} data-wow-delay="0.3s">
      <Card.Img src={imageSrc} className={styles["card-img-top"]} />
      <Card.Body className={styles["card-body"]}>
        <Card.Title className={styles["card-title"]}>{topicName}</Card.Title>
        <Card.Text className={styles["card-text"]} style={{fontSize:"15px",textAlign:"justify"}}>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}
