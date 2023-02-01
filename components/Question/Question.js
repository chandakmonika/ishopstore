import React from 'react';
import styles from './question.module.css';
export const Question = () => {
  return (
    <>
      <div className={styles.questionDiv}>
        <h5>Question : Lorem Ipsum has been the industry`s standard dummy ?</h5>
        <p>
          Ans: Lorem Ipsum has been the industry`s standard dummy text ever
          since the 1500s Lorem Ipsum has been the industry`s
        </p>
      </div>
    </>
  );
};
