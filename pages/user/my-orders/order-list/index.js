import moment from 'moment/moment';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AddressCard, ProfileLayout } from '../../../../components';
import { Products } from '../../../../services/Products';
import styles from './index.module.css';

export default function MyOrders() {
  const [orderList, setOrderList] = useState([]);
  const user = useSelector(state => state.auth.user?.user_id);

  useEffect(() => {
    fetchOrderList();
  }, []);
  console.info(orderList)

  const fetchOrderList = async () => {
    try {
      const data = await Products.orderList(user);
      setOrderList(data.data.data);
    } catch (error) {
      console.error('error------------------>', error);
    }
  };

  return (
    <>
      <ProfileLayout>
        <div className={styles.profileWrapper}>
          <h3 className={styles.title}>My Order List</h3>
          <div className="py-3">
            <AddressCard>
              {orderList.map((item)=>(
                <AddressCard key={item.order_id} customClass="mt-3">
                <Link href="/user/my-orders/order-detail">
                  <div className={styles.detailCard}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex gap-3">
                        <div className={styles.image}>
                          <img src="/images/p-1.png" alt="img" />
                        </div>
                        <div className={styles.addressDetail}>
                          <h5>Order Name - Vidya Shinde</h5>
                          <p>Order Number : {item.order_number}</p>
                          {/* <p className={styles.total}> Total Items: 9 </p> */}
                          <p className={`mb-0 ${styles.rate}`}>Rs. {item.subtotal_amount}</p>
                        </div>
                      </div>
                      <div className="d-flex gap-3">
                        <div className={styles.addressDetail}>
                          <h5>Order Status</h5>
                          <p className={styles.dispatch}>{item.order_status}</p>
                        </div>
                      </div>
                      <div className={styles.addressDetail}>
                        <h5>Order Date </h5>
                        <p className={styles.date}>{moment(item?.inserted_date).subtract(1, 'days').format('YYYY-MM-DD')}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </AddressCard>
              ))}
              
              {/* <AddressCard customClass="mt-3">
                <Link href="/user/my-orders/order-detail">
                  <div className={styles.detailCard}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex gap-3">
                        <div className={styles.image}>
                          <img src="/images/p-1.png" alt="img" />
                        </div>
                        <div className={styles.addressDetail}>
                          <h5>Order Name - Vidya Shinde</h5>
                          <p>Order Number : 102545</p>
                          <p className={styles.total}> Total Items: 9 </p>
                          <p className={`mb-0 ${styles.rate}`}>Rs. 800</p>
                        </div>
                      </div>
                      <div className="d-flex gap-3">
                        <div className={styles.addressDetail}>
                          <h5>Order Status</h5>
                          <p className={styles.progress}>In Progress</p>
                        </div>
                      </div>
                      <div className={styles.addressDetail}>
                        <h5>Order Date </h5>
                        <p className={styles.date}>6 August, 2022</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </AddressCard>
              <AddressCard customClass="mt-3">
                <Link href="/user/my-orders/order-detail">
                  <div className={styles.detailCard}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex gap-3">
                        <div className={styles.image}>
                          <img src="/images/p-1.png" alt="img" />
                        </div>
                        <div className={styles.addressDetail}>
                          <h5>Order Name - Vidya Shinde</h5>
                          <p>Order Number : 102545</p>
                          <p className={styles.total}> Total Items: 9 </p>
                          <p className={`mb-0 ${styles.rate}`}>Rs. 800</p>
                        </div>
                      </div>
                      <div className="d-flex gap-3">
                        <div className={styles.addressDetail}>
                          <h5>Order Status</h5>
                          <p className={styles.complete}>Completed</p>
                        </div>
                      </div>
                      <div className={styles.addressDetail}>
                        <h5>Order Date </h5>
                        <p className={styles.date}>6 August, 2022</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </AddressCard> */}
            </AddressCard>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
}
