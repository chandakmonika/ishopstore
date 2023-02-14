import React from 'react';
import styles from './singleReview.module.css';

export const SingleReview = ({review}) => {
  return (
    <>
      <div className={styles.singleReview}>
        <div className="d-flex gap-3 align-items-start">
          <img src={""} alt="round" />
          <div className="">
            <h5 className={styles.ratingTag}>{review.first_name} {review.last_name}</h5>
            <div className="d-flex gap-2">
              <img src="/images/yellow-star.svg" alt="star" />
              <img src="/images/yellow-star.svg" alt="star" />
              <img src="/images/yellow-star.svg" alt="star" />
              <img src="/images/yellow-star.svg" alt="star" />
              <img src="/images/yellow-star.svg" alt="star" />
            </div>
          </div>
        </div>
        <p>
          {review.comment_msg}
        </p>
      </div>
    </>
  );
};
