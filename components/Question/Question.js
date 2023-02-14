import React from 'react';
import styles from './question.module.css';
export const Question = ({ques,ans}) => {
  return (
    <>
      <div className={styles.questionDiv}>
        <h5>Question : {ques}</h5>
        <p>
          Ans: {ans}
        </p>
      </div>
    </>
  );
};
