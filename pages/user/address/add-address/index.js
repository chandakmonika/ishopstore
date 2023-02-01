import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Form, Row } from 'react-bootstrap';
import { Button, ProfileLayout } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../index.module.css';
import { AddressDetail } from '../../../../services/Address';
import { ToastContainer, toast } from 'react-toastify';

import { CountryId } from '../../../../redux/addressSlice';
export default function AddAddress() {
  const user_id = useSelector(state => state?.auth?.user?.user_id);
  const email = useSelector(state => state?.auth?.user?.email);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const [form, setForm] = useState({});

  const router = useRouter();
  //to handle input fields filled by user
  const dispatch = useDispatch();
  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: email,
      phone: form.phone,
      addressline1: form.addressline1,
      addressline2: form.addressline2,
      country: form.country,
      state: form.state,
      city: form.city,
      zipcode: form.zipcode,
      gender: 'm',
      isdefault: 'n',
      address_type: form.address_type,
      user_id: user_id,
    };
    // const fetchAddressList = async () => {
    //   try {
    //     const data = await AddressDetail.getaddresslist(user_id);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchAddressList();
    const addNewAddress = async () => {
      try {
        const newAddress = await AddressDetail.addaddress(data);
        if (newAddress) {
          router.push('/user/address/list-address');
          toast.success('Your address has been added');
        }
      } catch (error) {
        console.error(error);
      }
    };
    addNewAddress();
  };

  useEffect(() => {
    fetchcontaddress();
  }, [form.country]);
  useEffect(() => {
    fetchstateaddress();
  }, [form.country]);
  useEffect(() => {
    fetchcityaddress();
  }, [form.country, form.state]);

  const fetchcontaddress = async () => {
    try {
      const Countrydata = await AddressDetail.getcountry();

      setCountry(Countrydata?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchstateaddress = async () => {
    try {
      const Statedata = await AddressDetail.getstate(form.country);
      dispatch(CountryId(form?.country));
      setState(Statedata?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchcityaddress = async () => {
    try {
      const Citydata = await AddressDetail.getcity(form.state);
      // dispatch(StateId(form?.state));
      setCity(Citydata?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <ProfileLayout>
        <div className={styles.profileWrapper}>
          <h3 className={styles.title}>Add Address</h3>
          <Form onSubmit={handleSubmit} className={`mb-5 ${styles.Form}`}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter first name"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter last name"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Control
                    required
                    type="tel"
                    maxlength="10"
                    placeholder="Enter mobile number"
                    value={form.mobile}
                    onChange={handleInputChange}
                    name="phone"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="radio">
                  <Form.Label>Address Type</Form.Label>
                  <div className="d-flex gap-3 align-items-center ">
                    <Form.Check
                      type="radio"
                      id={`default-radio`}
                      label={`Home`}
                      value={'h'}
                      onChange={handleInputChange}
                      checked={form.address_type === 'h'}
                      name="address_type"
                      className={styles.check}
                    />
                    <Form.Check
                      type="radio"
                      id={`default-radio1`}
                      label={`Work`}
                      value={'w'}
                      checked={form.address_type === 'w'}
                      onChange={handleInputChange}
                      name="address_type"
                      className={styles.check}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3" controlId="address1">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Address line 1"
                    value={form.addressline1}
                    onChange={handleInputChange}
                    name="addressline1"
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group className="mb-3" controlId="address2">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Address line 2"
                    value={form.addressline2}
                    onChange={handleInputChange}
                    name="addressline2"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Select
                  required
                  className="mb-3"
                  aria-label="Country"
                  name="country"
                  value={form.country}
                  onChange={handleInputChange}
                >
                  {country.map(country => (
                    <>
                      <option
                        value={country.country_id}
                        key={country.country_id}
                      >
                        {country?.country_name}
                      </option>
                    </>
                  ))}
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Select
                  required
                  className="mb-3"
                  aria-label="State"
                  name="state"
                  value={form.state}
                  onChange={handleInputChange}
                >
                  <option>-Select State-</option>
                  {state.map(state => (
                    <>
                      <option value={state.state_id}>
                        {state?.state_name}
                      </option>
                    </>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Select
                  required
                  className="mb-3"
                  aria-label="City"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                >
                  <option>-Select City-</option>
                  {city.map(city => (
                    <>
                      <option value={city?.city_id}>{city?.city_name}</option>
                    </>
                  ))}
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Group
                  className="mb-3 "
                  controlId="pinCode"
                  style={{ height: '49px' }}
                >
                  <Form.Control
                    required
                    type="tel"
                    placeholder="Enter pincode"
                    name="zipcode"
                    value={form.zipcode}
                    onChange={handleInputChange}
                    style={{ height: '100%' }}
                    maxlength="6"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" onSubmit={e => handleSubmit(e)}>
              Save
            </Button>
          </Form>
        </div>
      </ProfileLayout>
    </>
  );
}
