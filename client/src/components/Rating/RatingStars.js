import React, {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar as EmptyStar} from '@fortawesome/free-regular-svg-icons';
import {faStar as SolidStar} from '@fortawesome/free-solid-svg-icons';
import './RatingStyles.css';
import {useHttp} from "../../hooks/useHttp";
import {AppContext} from "../../context/AppContext";

export const RatingStars = ({className, place, classes, showRateCard, index}) => {
    const {request} = useHttp()
    const {userId} = useContext(AppContext)
    const stars = new Array(5).fill('EmptyStar');
    const starColor = {color: 'FDBF5A'};
    const starIndices = [0, 1, 2, 3, 4,];
    const [starSet, setStarSet] = useState(stars);

    //save data from server:
    const [rating, setRating] = useState({
        averageRate: place.rate, //yes
        totalMarks: 4, //no
        place: place._id, //no
        userId //no
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
        // console.log('not Saved') //TODO: добавить запрос на сервер  //NO
    }

    const ratingSaveHandler = async (body) => {
        try {
            return await request('/api/country/setstar', 'POST', {...body})
        } catch (e) {
            return {message: "Something gonna wrong", e}
        }
    }

    const onStarClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const starId = e.currentTarget.id;
        changeStars(+starId);
        const currectAverage = averageMarkCalc(+starId, rating.averageRate, rating.totalMarks);

        const {
            newRate,
            newRateCount,
            message
        } = await ratingSaveHandler({showplace: place._id, user: userId, value: Number(starId)+1})
        if(!message){
            setRating({
                ...rating, //you can remove this
                averageRate: newRate,
                totalMarks: newRateCount, //and this
            })
        }

    }

    const onHover = (e) => {
        if (!rating) {
            changeStars(e.target.id)
        }
    }

    const onMouseLeave = () => {
        if (!rating) {
            changeStars(-1);
        }
    }

    return (
        <div className={className}>
            <div className="Rating">
                <ul className="Rating__list">
                    {
                        starIndices.map(star =>
                            <li className="Rating__item" key={star}>
                                <a className="Rating__link"><FontAwesomeIcon
                                    icon={starSet[star] === 'EmptyStar' ? EmptyStar : SolidStar} id={star}
                                    onMouseLeave={onMouseLeave} onMouseEnter={onHover} onClick={onStarClick}
                                    style={starColor}/></a>
                            </li>)
                    }
                </ul>
                <p
                    onMouseEnter={() => showRateCard(index)}
                    onMouseLeave={() => showRateCard(-1)}
                    className={["Rating__total", classes.rate].join(' ')}>
                    {rating.averageRate}
                </p>
            </div>
        </div>
    )
}