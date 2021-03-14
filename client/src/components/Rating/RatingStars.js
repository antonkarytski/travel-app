import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar as EmptyStar} from '@fortawesome/free-regular-svg-icons';
import {faStar as SolidStar}  from '@fortawesome/free-solid-svg-icons';
import './RatingStyles.css';

export const RatingStars = () => {
  let stars = new Array(5).fill(EmptyStar);
  const [starSet, setStarSet] = useState(stars);
  const [rating, setRating] = useState();

  const changeStars = (rating) => {
    stars = stars.map((star, index) => {
      if(index <= rating) {
        return SolidStar; 
      } else {
        return EmptyStar;
      }
    })
    setStarSet(stars)
  }

  const saveOnServer = () => {
    // console.log('Rating '+ ratingForSaving + " stars")
    // console.log('not Saved') //comment: добавить запрос на сервер
  }

  const onStarClick = (e) => {
    e.preventDefault();
    const starId = e.currentTarget.id;
    changeStars(+starId);
    setRating(+starId+1)
    saveOnServer()
    console.log(rating)
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
          <li className="Rating__item">
            <a className="Rating__link"><FontAwesomeIcon icon={starSet[0]} id="0" onMouseLeave={onMouseLeave} onMouseEnter={onHover} onClick={onStarClick} style={{color:'FDBF5A'}}/></a>
          </li>
          <li className="Rating__item">
            <a  className="Rating__link"><FontAwesomeIcon icon={starSet[1]} id="1" onMouseLeave={onMouseLeave} onMouseEnter={onHover} onClick={onStarClick} style={{color:'FDBF5A'}}/></a>
          </li>
          <li className="Rating__item">
            <a  className="Rating__link"><FontAwesomeIcon icon={starSet[2]} id="2" onMouseLeave={onMouseLeave} onMouseEnter={onHover} onClick={onStarClick} style={{color:'FDBF5A'}}/></a>
          </li>
          <li className="Rating__item" >
            <a  className="Rating__link"><FontAwesomeIcon icon={starSet[3]} id="3" onMouseLeave={onMouseLeave} onMouseEnter={onHover} onClick={onStarClick} style={{color:'FDBF5A'}}/></a>
          </li>
          <li className="Rating__item">
            <a  className="Rating__link"><FontAwesomeIcon icon={starSet[4]} id="4" onMouseLeave={onMouseLeave} onMouseEnter={onHover} onClick={onStarClick} style={{color:'FDBF5A'}}/></a>
          </li>
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