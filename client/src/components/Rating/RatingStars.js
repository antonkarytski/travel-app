import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar as EmptyStar} from '@fortawesome/free-regular-svg-icons';
import {faStar as SolidStar}  from '@fortawesome/free-solid-svg-icons';
import './RatingStyles.css';

export const RatingStars = () => {
  const stars = new Array(5).fill('EmptyStar');
  const starColor = {color:'FDBF5A'};
  const starIndices = [0,1,2,3,4,];
  const [starSet, setStarSet] = useState(stars);
  const [rating, setRating] = useState();

  const changeStars = (rating) => {
    const newStarsSet = stars.map((star, index) => {
      return index <= rating ? 'SolidStar' : 'EmptyStar'
    })
    setStarSet(newStarsSet)
  }

  const saveOnServer = () => {
    // console.log('Rating '+ ratingForSaving + " stars")
    // console.log('not Saved') //TODO: добавить запрос на сервер
  }

  const onStarClick = (e) => {
    e.preventDefault();
    const starId = e.currentTarget.id;
    changeStars(+starId);
    setRating(+starId+1)
    saveOnServer()
  }

  const onHover = (e) => {
    if(!rating) {
      changeStars(e.target.id)
    }
  }

  const onMouseLeave = () => {
    if(!rating) {
      changeStars(-1);
    }
  }

  return (
    <div>
      <div className="Rating">
        <ul className="Rating__list">
          {
          starIndices.map(star => 
            <li className="Rating__item" key={star}>
                <a  className="Rating__link"><FontAwesomeIcon icon={starSet[star] == 'EmptyStar' ? EmptyStar : SolidStar} id={star} onMouseLeave={onMouseLeave} onMouseEnter={onHover} onClick={onStarClick} style={starColor}/></a>
             </li>)
          }
        </ul>
        <p className="Rating__total">{rating}</p>
      </div>
    </div>
  )
}

// Так ну мы будем сохранять среднюю оценку и количество оценивших, 
// на сервере берем среднюю оценку, умножаем на количество оценивших, 
// прибавляем новую оценку делим на количество оценивших +1 и записываем 
// новое значение, ответ отправляем клиенту и обновляем там рейтинг
// видимо нужно какое то id места, + какое-то id пользователя + рейтинг