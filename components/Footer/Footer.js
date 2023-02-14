import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FacebookIcon, InstaIcon, TwitterIcon } from '../../public/svg';
import { HeaderandFooterNav } from '../../redux/commonDataSlice';
import { HeaderAndFooter } from '../../services/HeaderAndFooter';
import styles from './footer.module.css';

// const about = [
//   {
//     item: 'Contact Us',
//     link: '',
//   },
//   {
//     item: 'About Us',
//     link: '',
//   },
//   {
//     item: 'Ipsum',
//     link: '',
//   },
//   {
//     item: 'Dolor',
//     link: '',
//   },
//   {
//     item: 'Sit',
//     link: '',
//   },
// ];
// const aboutPolicy = [
//   {
//     item: 'Return Policy',
//     link: '',
//   },
//   {
//     item: 'Terms of Use',
//     link: '',
//   },
//   {
//     item: 'Security',
//     link: '',
//   },
//   {
//     item: 'Privacy',
//     link: '',
//   },
//   {
//     item: 'Sitemap',
//     link: '',
//   },
// ];
// const aboutAccount = [
//   {
//     item: 'Purchase History',
//     link: '',
//   },
//   {
//     item: 'Log In',
//     link: '',
//   },
//   {
//     item: 'Sign Up',
//     link: '',
//   },
// ];
// const aboutLink = [
//   {
//     item: 'Privacy Policy',
//     link: '',
//   },
//   {
//     item: 'Legal Mentions',
//     link: '',
//   },
// ];
// Connect with Footer Data
export const Footer = () => {
  const [footerNavData, setFooterNavData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchfooterData();
  }, []);

  const fetchfooterData = async () => {
    const data = await HeaderAndFooter.commonData();
    dispatch(HeaderandFooterNav(data?.data));
    setFooterNavData(data.data);
  };

  return (
    <footer className="pt-3" style={{ background: '#493D45' }}>
      <Container>
        <Row className="pt-3 pb-4">
          <div className={styles.Wrapper}>
            <h4 className={styles.title}>Ishop</h4>
            <p className="pt-2">
              Ishop Pride Icon, Shop No 2, Baner Pune - 411008
            </p>
            <a href="mailto:info@ishop.com">info@ishop.com</a>
          </div>
          <div className={styles.Wrapper}>
            <h4 className={styles.title}>About</h4>
            <ListGroup>
              {footerNavData && footerNavData?. footer1_menu && footer1_menu?.map((data, id) => (
                <ListGroup.Item className={styles.listItem} key={id}>
                  <a href={data?.menu_link}>{data?.menu_label}</a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className={styles.Wrapper}>
            <h4 className={styles.title}>Policy</h4>
            <ListGroup>
              {footerNavData && footerNavData?. footer2_menu && footer2_menu?.map((data, id) => (
                <ListGroup.Item className={styles.listItem} key={id}>
                  <a href={data?.menu_link}>{data?.menu_label}</a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className={styles.Wrapper}>
            <h4 className={styles.title}>Account</h4>
            <ListGroup>
              {footerNavData.footer3_menu && footer3_menu?.map((data, id) => (
                <ListGroup.Item className={styles.listItem} key={id}>
                  <a href={data?.menu_link}>{data?.menu_label}</a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className={styles.Wrapper}>
            <h4 className={styles.title}>Links</h4>
            <ListGroup>
              {footerNavData.footer4_menu && footer4_menu?.map((data, id) => (
                <ListGroup.Item className={styles.listItem} key={id}>
                  <a href={data?.menu_link}>{data?.menu_label}</a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className={`${styles.Content} ${styles.mobileDiv}`}>
            <h4 className={styles.title}>Follow us</h4>
            <div className={`d-flex gap-2 pt-2 ${styles.socialIcons}`}>
              <FacebookIcon />
              <InstaIcon />
              <TwitterIcon />
            </div>
          </div>
        </Row>
        <div className="d-flex justify-content-between flex-wrap pb-4">
          <div className={`${styles.Content} ${styles.deskDiv}`}>
            <h4 className={styles.title}>Follow us</h4>
            <div className={`d-flex gap-2 ${styles.socialIcons}`}>
              <FacebookIcon />
              <InstaIcon />
              <TwitterIcon />
            </div>
          </div>
          <div className={styles.Content}>
            <h4 className={styles.title}>Pay with</h4>
            <div className={styles.paymentIcon}>
              <img src="/images/payment.svg" alt="payment" />
            </div>
          </div>
        </div>
      </Container>
      <div className={`py-3 ${styles.copyright}`}>
        <Container>
          <p className="mb-0 text-white ">© 2022-2023 ishop.com</p>
        </Container>
      </div>
    </footer>
  );
};
