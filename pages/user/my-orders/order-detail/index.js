import React from 'react';
import { AddressCard, ProfileLayout } from '../../../../components';
import styles from './index.module.css';
// import { Products } from '../../../../services/Products';
export default function MyOrders() {
  //TODO
  // const [orderDetail, setOrderDetail] = useState([]);

  // useEffect(() => {
  //   fetchOrderDetail();
  // }, []);

  // const fetchOrderDetail = async () => {
  //   try {
  //     const data = await Products.orderDetail();
  //     // setOrderDetail(data.data.data);
  //   } catch (error) {
  //     console.error('error------------------>', error);
  //   }
  // };

  return (
    <>
      <ProfileLayout>
        <div className={styles.profileWrapper}>
          <h3 className={styles.title}>My Orders</h3>
          <div className="py-3">
            <AddressCard>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <h6>
                    Order Number 102545 |{' '}
                    <span className={styles.status}>Delivered </span>{' '}
                  </h6>
                </div>
                <button className={styles.invoiceBtn}>Download Invoice</button>
              </div>
              <AddressCard customClass="mt-3">
                <div className={styles.detailCard}>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex gap-3">
                      <div className={styles.image}>
                        <img src="/images/p-1.png" alt="img" />
                      </div>
                      <div className={styles.addressDetail}>
                        <h5>Order Number 102545</h5>
                        <p className="mb-0">Rs. 1500</p>
                      </div>
                    </div>
                    <div className={``}>
                      <p className={`mb-0 ${styles.date}`}>Delivered on </p>
                      <p className={styles.date}>6 August, 2022</p>
                    </div>
                  </div>
                </div>
              </AddressCard>
            </AddressCard>
            <h4>Order Number 102545 | Details</h4>
            <AddressCard customClass="mt-3">
              <div className={styles.detailCard}>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex gap-3">
                    <div className={styles.image}>
                      <img src="/images/p-1.png" alt="img" />
                    </div>
                    <div className={styles.addressDetail}>
                      <h5>Order Number 102545</h5>
                      <p className={styles.quantity}>Quantity: 1</p>
                      <p className="mb-0">Rs. 1500</p>
                    </div>
                  </div>
                </div>
              </div>
            </AddressCard>
            <AddressCard customClass="mt-3">
              <div className={styles.detailCard}>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex gap-3">
                    <div className={styles.image}>
                      <img src="/images/p-1.png" alt="img" />
                    </div>
                    <div className={styles.addressDetail}>
                      <h5>Order Number 102545</h5>
                      <p className={styles.quantity}>Quantity: 1</p>
                      <p className="mb-0">Rs. 1500</p>
                    </div>
                  </div>
                </div>
              </div>
            </AddressCard>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
}
