import React, { useState } from 'react';
import { Col, Form as BForm, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ProfileLayout } from '../../../../components';
import { EyeHideIcon, EyeShowIcon } from '../../../../public/svg';
import styles from '../../index.module.css';
import { Formik, Form } from 'formik';
import { AuthService } from '../../../../services/Auth';
import { authenticating, editData } from '../../../../redux/authSlice';
import { toast, ToastContainer } from 'react-toastify';
export default function EditProfile() {
  const [passwordShown, setPasswordShown] = useState(false);
  const user = useSelector(state=> state.auth.user)
  const dispatch = useDispatch();

  const handleSubmit = async values => {
    dispatch(authenticating());
    
    try {
      const { data } = await AuthService.update(values);
      dispatch(editData(data));
      toast.success('authenticated');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <ProfileLayout>
        <div className={styles.profileWrapper}>
          <h3 className={styles.title}>Personal Information</h3>
          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
              email: user?.email,
              gender: '',
              password: '',
              phone: user?.phone,
            }}
            // validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, isSubmitting, setFieldValue }) => (
              <Form className={`mb-5 ${styles.Form}`}>
                <Row>
                  <Col md={4}>
                    <BForm.Group className="mb-3" controlId="first_name">
                      <BForm.Control
                        type="text"
                        placeholder="first name"
                        name="first_name"
                        value={values.first_name}
                        onChange={handleChange}
                      />
                    </BForm.Group>
                  </Col>
                  <Col md={4}>
                    <BForm.Group className="mb-3" controlId="last_name">
                      <BForm.Control
                        type="text"
                        placeholder="last name"
                        name="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                      />
                    </BForm.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <BForm.Group className="mb-3" controlId="email">
                      <BForm.Control
                        type="email"
                        placeholder="e.g:vidya@gmail.com"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                      />
                    </BForm.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <BForm.Group className="mb-3" controlId="radio">
                      <BForm.Label>Gender</BForm.Label>
                      <div className="d-flex gap-3 align-items-center">
                        <BForm.Check
                          name="gender"
                          type="radio"
                          id={`default-radio`}
                          label={`Male`}
                          // value="M"
                          onChange={() => setFieldValue('gender', 'M')}
                          checked={values.gender === 'M'}
                          className={styles.check}
                        />
                        <BForm.Check
                          name="gender"
                          type="radio"
                          id={`default-radio1`}
                          label={`Female`}
                          // value="F"
                          onChange={() => setFieldValue('gender', 'F')}
                          checked={values.gender === 'F'}
                          className={styles.check}
                        />
                      </div>
                    </BForm.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <BForm.Group
                      className="mb-3 position-relative"
                      controlId="formBasicPassword"
                    >
                      <BForm.Label>Password</BForm.Label>
                      <BForm.Control
                        autoComplete="new-password"
                        name="password"
                        type={passwordShown ? 'text' : 'password'}
                        placeholder="************"
                        value={values.password}
                        onChange={handleChange}
                      />
                      <span
                        className={styles.Icon}
                        onClick={() => setPasswordShown(prev => !prev)}
                      >
                        {passwordShown ? <EyeHideIcon /> : <EyeShowIcon />}
                      </span>
                    </BForm.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <BForm.Group className="mb-3" controlId="formBasicEmail">
                      <BForm.Label>Mobile Number</BForm.Label>
                      <BForm.Control
                        type="tel"
                        placeholder="8830436811"
                        name="phone"
                        value={values.phone}
                        maxLength="10"
                        onChange={handleChange}
                      />
                    </BForm.Group>
                  </Col>
                </Row>
                <Button type="submit" loading={isSubmitting}>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </ProfileLayout>
    </>
  );
}
