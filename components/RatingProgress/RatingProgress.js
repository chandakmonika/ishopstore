import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import styles from './ratingProgress.module.css';

export const RatingProgress = ({
  rate = '',
  variant = '',
  progress = '',
  percent = '',
}) => {
  return (
    <>
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="d-flex align-items gap-1">
          <span>{rate}</span>
          <img src="/images/yellow-star.svg" alt="star" />
        </div>
        <ProgressBar variant={variant} now={progress} />
        <span className={styles.percent}>{percent}%</span>
      </div>
    </>
  );
};
