import React, { useState } from 'react';
import { EditGreyIcon, TrashIcon } from '../../public/svg';
import { AddressDetail } from '../../services/Address';
import styles from './addressListCard.module.css';
import { AddressCard, Button } from '../UI';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { AddressDelect, AddressId } from '../../redux/addressSlice';
import { toast } from 'react-toastify';

export const AddressListCard = () => {
  // const addressId = useSelector(state => state?.address?.deleteId);
  const [modal, setModal] = useState(false);
  const user_id = useSelector(state => state?.auth?.user?.user_id);
  const dispatch = useDispatch();
  const addressList = useSelector(state => state.address?.Addresses);
  const [addressId, setAddressId] = useState('');

  const deleteAddress = async (addressId, user_id) => {
    try {
      const deleteaddress = await AddressDetail.deleteaddress(
        addressId,
        user_id,
      );
      if (deleteaddress) {
        toast.success('your address has been deleted');
        dispatch(AddressDelect(addressId));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleModelClick = address_id => {
    setAddressId(address_id);
    setModal(true);
  };

  return (
    <>
      {addressList?.map((address, i) => (
        <>
          <AddressCard>
            <div className={styles.detailCard}>
              <div className="d-flex justify-content-between">
                <h5 className={styles.addressTitle}>
                  {address.address_type === 'w' ? 'Work' : 'Home'}
                </h5>
                <div className={`d-flex gap-2 ${styles.Icons}`}>
                  <Link href="/user/address/edit-address">
                    <EditGreyIcon
                      onClick={() => dispatch(AddressId(address))}
                    />
                  </Link>
                  <TrashIcon
                    onClick={() => handleModelClick(address.address_id)}
                  />
                  {modal && addressId === address.address_id && (
                    <>
                      <div
                        key={i}
                        className={`d-flex align-items-center flex-column ${styles.modal}`}
                      >
                        <div>
                          <p>Do you really want to delete your address?</p>
                          <div
                            style={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'space-evenly',
                            }}
                          >
                            <Button onClick={() => setModal(false)}>
                              Cancel
                            </Button>
                            <Button
                              key={i}
                              onClick={() => {
                                deleteAddress(addressId, user_id),
                                  setModal(false);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.addressDetail}>
                <h4>{address?.first_name}</h4>
                <p>
                  {address?.addressline1 +
                    ',' +
                    address?.addressline2 +
                    ',' +
                    address?.country_name +
                    ',' +
                    address?.state_name +
                    ',' +
                    address?.city_name}
                </p>
                <p>{address?.mobile}</p>
              </div>
            </div>
          </AddressCard>
        </>
      ))}
    </>
  );
};
