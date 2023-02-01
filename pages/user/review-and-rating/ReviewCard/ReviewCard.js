import React from 'react';
import {
  EditGreyIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TrashIcon,
  WhiteStarIcon,
} from '../../../../public/svg';
import moment from 'moment';
import styles from './reviewCard.module.css';
import Link from 'next/link';

const ReviewCard = ({ title, comment, rating, date, image }) => {
  return (
    <>
      <div className={styles.detailCard}>
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex gap-3">
            <div className={styles.image}>
              <img src={image} alt="img" />
            </div>
            <div className={styles.addressDetail}>
              <h4>{title}</h4>
              <div className="d-flex gap-3 align-items-center">
                <span className={styles.rating}>
                  <WhiteStarIcon /> {rating}
                </span>
              </div>
              <p className="mb-0">{comment}</p>
              <div className="d-flex gap-3 align-items-center">
                <span className={styles.thumbs}>
                  <ThumbsUpIcon /> {rating}
                </span>
                <span className={styles.thumbs}>
                  <ThumbsDownIcon /> 0
                </span>
              </div>
            </div>
          </div>
          <div className={`d-flex gap-3 align-items-center`}>
            <p className={`mb-0 ${styles.date}`}>
              {moment(date).subtract(1, 'days').format('YYYY-MM-DD')}
            </p>
            <div className={`d-flex gap-2 ${styles.Icons}`}>
              <Link href={'/user/review-and-rating/add-rating'}>
                <EditGreyIcon />
              </Link>

              <TrashIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
