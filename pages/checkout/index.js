import Link from 'next/link';
import { useState, React } from 'react';
import { Col, Container, Form, Modal, Row, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AddressCard, AppLayout, Button } from '../../components';
import AddAddress from '../../components/add-address';
import styles from './index.module.css';


const data = [
  {
    key: '0',
    date: ' Saturday, 10th october 2022',
    time: [
      { zone: 'Morning', time: '10:00 am to 11:00 am' },
      { zone: 'Afternoon', time: '01:00 pm to 03:00 pm' },
      { zone: 'Evening', time: '04:00 pm to 07:00 pm' },
    ],
  },
  {
    key: '1',
    date: ' Sunday, 11th october 2022',
    time: [
      { zone: 'Morning', time: '10:00 am to 11:00 am' },
      { zone: 'Afternoon', time: '01:00 pm to 03:00 pm' },
      { zone: 'Evening', time: '04:00 pm to 07:00 pm' },
    ],
  },
  {
    key: '2',
    date: 'tuesday, 12th october 2022',
    time: [
      { zone: 'Morning', time: '10:00 am to 11:00 am' },
      { zone: 'Afternoon', time: '01:00 pm to 03:00 pm' },
      { zone: 'Evening', time: '04:00 pm to 07:00 pm' },
    ],
  },
];
const pickup = [
  {
    key: '0',
    name: 'Pashan',
    address: 'NCL Market shop 45 , Pune - 411017 ',
  },
  {
    key: '1',
    name: 'Auth',
    address: 'NCL Market shop 45 , Pune - 411017 Pickup date & time slot',
  },
];

export default function SelectAddress({props}) {
  const addressdetail = useSelector(state => state.address.Addresses);
  console.error(addressdetail);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState({
    deliveryAddress: true,
    pickPoint: false,
  });
  const [coupon, setCoupon] = useState('');
  const [isNewAddressFormVisible, setIsNewAddressVisible] = useState(false);
  const Rs = useSelector(state => state.ui.currancy);
  const [addoption, setAddoption] = useState(true);
  const [pickupAdressDetails, setPickUpAddressDetails] = useState({
    address: null,
    timeslot: null,
  });
  const [deliveryAddressDetails, setdeliveryAddressDetails] = useState({
    address: null,
  });
  const handleSelectDeliveryPoint = t => {
    if (deliveryAddressDetails?.address?.key === t.key) {
      setdeliveryAddressDetails({
        address: null,
      });

      return;
    }

    setdeliveryAddressDetails({
      address: t,
    });
  };

  const handleSelectPickUpPoint = address => {
    // if pickup address is already selected
    // de-select the address
    if (pickupAdressDetails?.address?.key === address.key) {
      setPickUpAddressDetails({
        address: null,
        timeslot: null,
      });

      return;
    }

    // select pickup address and open the timeslot modal
    setPickUpAddressDetails({
      address,
      timeslot: null,
    });
    setModalShow(true);
  };

  // console.log("maindAta  " , {deliveryAddress : selectedDeliveryOption.deliveryAddress , pickPoint : selectedDeliveryOption.pickPoint})
  const price = 100;
  const discount = 30;
  const totaldisc = ((discount / price) * 100).toFixed(2);

  const deliverycharge = 30;
  const totalprice = (price - totaldisc + deliverycharge - coupon).toFixed(2);

  const savings = Number(coupon) + discount;

  const handlcoupon = e => {
    e.target.value < Number(totalprice) ? setCoupon(e.target.value) : null;
  };
  const handleAdd = e => {
    setAddoption(e.target.id);
  };
  
  return (
    <>
      <AppLayout>
        <Container className={`py-3 ${styles.headTitle}`}>
          <h3>
            Checkout <span> 9 items</span>
          </h3>
        </Container>
        <section className="pb-5">
          <Container>
            <Row>
              <Col md={8}>
                <div className={styles.viewCart}>
                  <AddressCard>
                    <div className={styles.addressDetailsList}>
                      <div className="d-flex justify-content-between">
                        <h4 className={styles.title}>
                          Select Delivery options
                        </h4>

                        {addoption === 'pick-up' ? null : (
                          <p
                            className={styles.addNew}
                            onClick={() => setIsNewAddressVisible(true)}
                          >
                            Add new address
                          </p>
                        )}
                      </div>
                      <div className="d-flex gap-3 address-radio">
                        <AddressCard customClass={styles.widthBox}>
                          <Form.Check
                            type={'radio'}
                            id={`pick-up`}
                            label={`Pick up Point `}
                            onClick={e => {
                              handleAdd(e);
                              setIsNewAddressVisible(false);
                              setSelectedDeliveryOption(prev => ({
                                ...prev,
                                deliveryAddress: false,
                                pickPoint: true,
                              }));
                            }}
                            name="deliveryOption"
                            checked={selectedDeliveryOption.pickPoint}
                          />
                        </AddressCard>
                        <AddressCard customClass={styles.widthBox}>
                          <Form.Check
                            type={'radio'}
                            id={`delivery-address`}
                            label={`Delivery Address `}
                            name="deliveryOption"
                            checked={selectedDeliveryOption.deliveryAddress}
                            onClick={e => {
                              handleAdd(e);
                              setIsNewAddressVisible(false);
                              setSelectedDeliveryOption(prev => ({
                                ...prev,
                                deliveryAddress: true,
                                pickPoint: false,
                              }));
                            }}
                          />
                        </AddressCard>
                      </div>
                      {isNewAddressFormVisible ? (
                        <AddAddress
                          setIsNewAddressVisible={setIsNewAddressVisible}
                        />
                      ) : selectedDeliveryOption.pickPoint ? (
                        <div
                          className={`${styles.addressList} ${styles.pickupList}`}
                        >
                          <h4 className={styles.title}>Select Pickup Point</h4>
                          {pickup.map((address, i) => (
                            <>
                              <AddressCard>
                                <div
                                  className="d-flex gap-3 align-items-start"
                                  onClick={() => {
                                    handleSelectPickUpPoint(address);
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      pickupAdressDetails?.address?.key ===
                                      address.key
                                    }
                                    id={`${i}`}
                                  />

                                  <div className={styles.content}>
                                    <h5 className={styles.title}>
                                      {address?.name}
                                    </h5>
                                    <p className={`mb-0 ${styles.addNew}`}>
                                      {address?.address}
                                    </p>
                                    {pickupAdressDetails?.address?.key ===
                                      address.key &&
                                      pickupAdressDetails.timeslot && (
                                        <>
                                          <p
                                            className={`${styles.pickupTime} mb-0`}
                                          >
                                            Pickup date & time slot
                                          </p>
                                          <p className={styles.addNew}>
                                            <span className={styles.startTime}>
                                              {
                                                pickupAdressDetails.timeslot
                                                  ?.date
                                              }
                                            </span>{' '}
                                            <span className={styles.endTime}>
                                              |{' '}
                                              {
                                                pickupAdressDetails.timeslot
                                                  ?.time
                                              }
                                            </span>
                                          </p>
                                        </>
                                      )}
                                  </div>
                                </div>
                              </AddressCard>
                            </>
                          ))}
                        </div>
                      ) : (
                        <div className={styles.addressList}>
                          <h4 className={styles.title}>
                            Select Delivery Address
                          </h4>
                          {addressdetail?.map((t,i) => (
                            <>
                              {' '}
                              <AddressCard>
                                <div
                                  className="d-flex gap-3 align-items-start"
                                  onClick={() => {
                                    handleSelectDeliveryPoint(t);
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      deliveryAddressDetails?.address?.key ===
                                      t.key
                                    }
                                    id={i}
                                  />

                                  <div className={styles.content}>
                                    <h5 className={styles.title}>
                                      {t.first_name}
                                    </h5>
                                    <p className={styles.addNew}>
                                      {t.country_name +
                                        ',' +
                                        t.state_name +
                                        ',' +
                                        t.city_name}
                                    </p>
                                  </div>
                                </div>
                              </AddressCard>
                            </>
                          ))}
                        </div>
                      )}
                    </div>
                  </AddressCard>
                </div>
              </Col>
              <Col md={4}>
                <div className={`mb-4 ${styles.priceDetailCard}`}>
                  <AddressCard>
                    <div className={`pb-2 ${styles.header}`}>Price Details</div>
                    <ul className={`list-unstyled mt-3 ${styles.ulList}`}>
                      <li>
                        <span className={styles.list}>Price ( 3 item )</span>
                        <span className={styles.price}>{Rs + price} </span>
                      </li>
                      <li>
                        <span className={styles.list}>Discount</span>
                        <span className={styles.price}>-{discount}%</span>
                      </li>

                      <li>
                        <span className={styles.list}>Delivery Charges</span>
                        <span className={styles.free}>
                          {' '}
                          {Rs + deliverycharge}
                        </span>
                      </li>
                      <li>
                        <span className={styles.list}>Your Savings</span>
                        <span className={styles.price}> {Rs + savings}</span>
                      </li>
                      <li>
                        <span className={styles.list}>Total Price</span>
                        <span className={styles.price}>{Rs + totalprice}</span>
                      </li>
                    </ul>
                    {/* <div className="d-flex justify-content-between"> */}
                    <label>Apply coupon</label>
                    <div
                      className={`d-flex ${styles.totalRate} justify-content-space-around; `}
                    >
                      <input
                        type="text"
                        style={{
                          width: '100%',
                          border: '2px dashed',
                        }}
                        onChange={e => handlcoupon(e)}
                      />

                      <button
                        className={`${styles.applycoupon} ms-2  `}
                        onClick={handlcoupon}
                      >
                        {' '}
                        <span>Apply </span>
                      </button>
                    </div>
                  </AddressCard>
                  <div className="d-flex gap-3 flex-column">
                    {totalprice < 200 ? (
                      <Button className={styles.minOdrBtn}>
                        Minimum order above Rs.200
                      </Button>
                    ) : null}
                    <Link href="/cart-confirmation" passHref>
                      <Button className={styles.checkoutBtn}>
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </AppLayout>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className={styles.modalTitle}
          >
            Select A Pickup Time Slot
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion className={`modal-accordion ${styles.modalAccordion}`}>
            {data?.map((s, i) => (
              <>
                {' '}
                <Accordion.Item
                  eventKey={i}
                  className={`${styles.accordion_border} accordion-border`}
                >
                  <Accordion.Header
                    onClick={() =>
                      setPickUpAddressDetails(prev => ({
                        ...prev,
                        timeslot: {
                          date: s.date,
                          time: null,
                        },
                      }))
                    }
                  >
                    {s.date}
                  </Accordion.Header>
                  <div className="d-flex">
                    {s.time.map((t, i) => (
                      <>
                        {' '}
                        <Accordion.Body eventKey={i}>
                          <h4>{t.zone}</h4>
                          <button
                            onClick={() => {
                              setPickUpAddressDetails(prev => ({
                                ...prev,
                                timeslot: {
                                  date: prev?.timeslot?.date,
                                  time: t.time,
                                },
                              }));
                            }}
                            className={
                              pickupAdressDetails?.timeslot?.time === t.time
                                ? styles.time_but
                                : styles.outline
                            }
                          >
                            {t.time}
                          </button>
                        </Accordion.Body>
                      </>
                    ))}
                  </div>
                </Accordion.Item>
              </>
            ))}
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={pickupAdressDetails.timeslot?.time&&pickupAdressDetails.timeslot?.date !== null ? false : true} onClick={()=>setModalShow(false)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
