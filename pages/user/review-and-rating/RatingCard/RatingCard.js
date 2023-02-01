import Link from 'next/link';
import React from 'react';
import { GreyStarIcon } from '../../../../public/svg';

import styles from './ratingCard.module.css';

const RatingCard = ({ title }) => {
  return (
    <>
      <div className={styles.detailCard}>
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex gap-3">
            <div className={styles.image}>
              <img src="/images/p-1.png" alt="img" />
            </div>
            <div className={styles.addressDetail}>
              <h4>{title}</h4>
              <div className="d-flex gap-2 align-items-center my-2">
                <GreyStarIcon />
                <GreyStarIcon />
                <GreyStarIcon />
                <GreyStarIcon />
                <GreyStarIcon />
              </div>
              <span className={styles.Link}>
                <Link href="/user/review-and-rating/add-rating">
                  Add Rating
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RatingCard