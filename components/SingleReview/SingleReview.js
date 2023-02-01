import React from 'react';
import styles from './singleReview.module.css';

export const SingleReview = () => {
  return (
    <>
      <div className={styles.singleReview}>
        <div className="d-flex gap-3 align-items-start">
          <img src="/images/round.svg" alt="round" />
          <div className="">
            <h5 className={styles.ratingTag}>Customer Name</h5>
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
          Farmley source all the nuts & dry fruits directly from the farms which
          are hygienically packed in a HACCP certified unit. We pack almonds
          which are
        </p>
      </div>
    </>
  );
};
