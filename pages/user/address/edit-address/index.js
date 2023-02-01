import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Button, ProfileLayout } from '../../../../components';
import { useSelector } from 'react-redux';
import styles from '../../index.module.css';
import { AddressDetail } from '../../../../services/Address';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { StateId } from '../../../../redux/addressSlice';

export default function AddAddress() {
  const router = useRouter();
  const user_id = useSelector(state => state?.auth?.user?.user_id);
  const email = useSelector(state => state?.auth?.user?.email);
  const updateddata = useSelector(state => state.address.AddressId);
  //states
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [form, setForm] = useState({});
  //to handle input fields filled by user

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const CountryId = useSelector(state => state.address?.CountryId);
  //to handle submit edit data
  const handleSubmit = e => {
    e.preventDefault();
    //updatted data
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
    console.info(data)
    //edit data

    const editAddress = async () => {
      try {
        const editAddress = await AddressDetail.editaddress({
          ...updateddata,
          ...form,
        });

        if (editAddress) {
          toast.success(' Your address has been edited');
          router.push('/user/address/list-address');
        }
      } catch (error) {
        console.error(error);
      }
    };
    editAddress({ ...updateddata, ...form });
    router.push('/user/address/list-address');
  };
  //navigation

  useEffect(() => {
    fetchContAddress();
  }, [form.country]);
  useEffect(() => {
    fetchStateAddress();
  }, [form.country]);
  useEffect(() => {
    fetchCityAddress();
  }, [form.country, form.state]);
  //country
  const fetchContAddress = async () => {
    try {
      const Countrydata = await AddressDetail.getcountry();

      setCountry(Countrydata?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  //state
  const fetchStateAddress = async () => {
    try {
      const Statedata = await AddressDetail.getstate(CountryId);

      setState(Statedata?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  //city
  const fetchCityAddress = async () => {
    try {
      const Citydata = await AddressDetail.getcity(StateId);

      setCity(Citydata?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
                    defaultValue={updateddata?.first_name}
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
                    defaultValue={updateddata?.last_name}
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
                    placeholder="Enter mobile number"
                    value={form.mobile}
                    onChange={handleInputChange}
                    defaultValue={updateddata?.mobile}
                    name="phone"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="radio">
                  <Form.Label>Address Type</Form.Label>
                  <div className="d-flex gap-3 align-items-center">
                    <Form.Check
                      type="radio"
                      id={`default-radio`}
                      label={`Home`}
                      value={'h'}
                      onChange={handleInputChange}
                      checked={form.address_type === 'h'}
                      name="address_type"
                      defaultChecked={updateddata?.address_type}
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
                      defaultChecked={updateddata?.address_type}
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
                    defaultValue={updateddata?.addressline1}
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
                    defaultValue={updateddata?.addressline2}
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
                  defaultValue={updateddata?.country}
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
                  defaultValue={updateddata?.state_name}
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
                  defaultValue={updateddata?.city_id}
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
                    type="text"
                    placeholder="Enter pincode"
                    name="zipcode"
                    defaultValue={updateddata?.zipcode}
                    value={form.zipcode}
                    onChange={handleInputChange}
                    style={{ height: '100%' }}
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
