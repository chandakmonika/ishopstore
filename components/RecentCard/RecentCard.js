import styles from './recentCard.module.css';

export const RecentCard = () => {
  return (
    <div className={styles.wishListCard}>
      <div className={`mb-3 ${styles.image}`}>
        <img src="/images/wishlist.png" alt="wishliat" />
      </div>
      <div className={styles.content}>
        <h4>Kellogg’s Fruit Museli</h4>
        <p className="mb-1">900 gms</p>
        <div className="d-flex gap-2 align-items-center">
          <span className={styles.Price}>Rs. 400</span>
          <span className={styles.orgPrice}>Rs. 500</span>
          <span className={styles.off}>35% off</span>
        </div>
      </div>
    </div>
  );
};
