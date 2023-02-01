import React from 'react';
import styles from './explore.module.css';


export const Card = () => {
  return (
    <div>
      <div className={styles.Card}>
        <script
          src="https://cdn.lightwidget.com/widgets/lightwidget.js"
          defer
        ></script>

        <iframe
          src="//lightwidget.com/widgets/e6124a9306235f4fbb59328ff6918c4a.html"
          scrolling="no"
          allowtransparency="true"
          className={styles.widget}
          style={{
            width: '100%',
            border: '0',
            overflow: 'hidden',
            height: '100%',
          }}
        ></iframe>
      </div>
    </div>
  );
};
