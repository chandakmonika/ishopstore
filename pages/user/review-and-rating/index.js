import React, { useEffect, useState } from 'react';

import { AddressCard, ProfileLayout } from '../../../components';
import styles from '../index.module.css';
import { useSelector } from 'react-redux';
import { Ratings } from '../../../services/Rating';
import ReviewCard from './ReviewCard/ReviewCard';
import RatingCard from './RatingCard/RatingCard';
export default function ListAddress() {
  const user_id = useSelector(state => state.auth.user?.user_id);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetchRating();
  }, []);
  const fetchRating = async () => {
    const data = await Ratings.getAllData(user_id);
    console.error(data.data.data);
    setReviews(data.data.data);
  };
  return (
    <>
      <ProfileLayout>
        <div className={styles.profileWrapper}>
          <h3 className={styles.title}>{`My Reviews(${reviews.length})`}</h3>

          {reviews.map(reviews => (
            <AddressCard key={reviews.product_id}>
              <ReviewCard
              key={reviews.product_id}
                title={reviews.product_name}
                comment={reviews.comment_msg}
                date={reviews.inserted_date}
                image={reviews.rating_media}
                rating={reviews.rating_value}
              />
            </AddressCard>
          ))}
        </div>
        <div className={styles.profileWrapper}>
          <h3 className={styles.title}>Rate and review your order</h3>
          <AddressCard>
            <RatingCard title="Nestle Everyday Milk Powder" />
          </AddressCard>
          <AddressCard>
            <RatingCard title="Govind Milk Powder" />
          </AddressCard>
        </div>
      </ProfileLayout>
    </>
  );
}
