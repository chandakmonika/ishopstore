import Link from 'next/link';
import React from 'react';
import {
  AddressCard,
  AddressListCard,
  ProfileLayout,
} from '../../../../components';
import styles from '../../index.module.css';

export default function ListAddress() {
  return (
    <>
      <ProfileLayout>
        <div className={styles.profileWrapper}>
          <h3 className={styles.title}>Addresses</h3>
          <AddressCard customClass={styles.Link}>
            <Link href="/user/address/add-address">+ Add Address</Link>
          </AddressCard>

          <AddressListCard title="Home" />
        </div>
      </ProfileLayout>
    </>
  );
}
