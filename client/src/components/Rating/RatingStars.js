import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar as EmptyStar} from '@fortawesome/free-regular-svg-icons';
import {faStar as SolidStar}  from '@fortawesome/free-solid-svg-icons';
import './RatingStyles.css';
import {useHttp} from "../../hooks/useHttp";

export const RatingStars = () => {
  const {request} = useHttp()
  const stars = new Array(5).fill('EmptyStar');
  const starColor = {color:'FDBF5A'};
  const starIndices = [0,1,2,3,4,];
  const [starSet, setStarSet] = useState(stars);
  const [rating, setRating] = useState({   //TODO : сохраняются данные пришедшие с сервера
    averageRate: 4,
    totalMarks: 4,
    placeId: "something",
    userId: null
  });

  const changeStars = (rating) => {
    const newStarsSet = stars.map((star, index) => {
      return index <= rating ? 'SolidStar' : 'EmptyStar'
    })
    setStarSet(newStarsSet)
  }

  const averageMarkCalc = (mark, averageMark, marksNumber) => {
    return (Math.floor((averageMark * marksNumber + mark) / (marksNumber + 1) * 10) / 10)
  }

  const saveOnServer = () => {
    // console.log('Rating '+ ratingForSaving + " stars")
    // console.log('not Saved') //TODO: добавить запрос на сервер
  }

  const ratingSaveHandler = async(body) => {
    try{
        const data = await request('/api/rating/save', 'POST', {...body})    ///TODO: вставить  правильный адрес
    } catch(e) {
    }
  }

  const onStarClick = (e) => {
    e.preventDefault();
    const starId = e.currentTarget.id;
    changeStars(+starId);
    const currectAverage = averageMarkCalc(+starId, rating.averageRate, rating.totalMarks);
    const ratingStats = {
        averageRate: currectAverage,
        totalMarks: rating.totalMarks + 1,
        placeId: null,  // TODO
        userId: null   //todo? наддо ли вообще ?
      }
    setRating(ratingStats)
    // ratingSaveHandler(ratingStats) //TODO: раззлокировать когда будет готов сервер
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
        <p className="Rating__total">{rating.averageRate}</p>
      </div>
    </div>
  )
}