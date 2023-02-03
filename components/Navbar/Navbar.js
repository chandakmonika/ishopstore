import React,{useEffect,useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HeartIcon, UserIcon, CartIcon } from '../../public/svg';
import styles from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { CartModal } from '../CartModal';
import { toggleCartModal } from '../../redux/cartSlice';
import { SearchBar } from '../SearchBar';
import { Dropdown } from 'react-bootstrap';
import { HeaderAndFooter } from '../../services/HeaderAndFooter';
import { HeaderandFooterNav } from '../../redux/commonDataSlice';

export const NavbarHeader = () => {
  const [menuData, setMenuData] = useState()
  const { items, isCartOpen } = useSelector(state => state?.cart);
  // const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state?.auth?.isAuthenticated);
  const username = useSelector(state => state?.auth?.user?.username);
  const headerNavData = useSelector(
    state => state?.navigationBar?.navMenu?.primary_menu,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    fetchfooterData();
  }, []);

  const fetchfooterData = async () => {
    const data = await HeaderAndFooter.commonData();
    dispatch( HeaderandFooterNav(data?.data));
    setMenuData(data.data);
  };

  const menudata1 = useSelector(state => state?.navMenu);

  console.log(23,menudata1);

  const menudata = {
    "mediadata": [
      {
          "media_id": 124,
          "media_title": "kbcollections/2023/0/2/1674542521948-hudderton-backpack-khaki.webp",
          "media_alt_text": "kbcollections/2023/0/2/1674542521948-hudderton-backpack-khaki.webp",
          "media_caption": "kbcollections/2023/0/2/1674542521948-hudderton-backpack-khaki.webp",
          "media_description": "kbcollections/2023/0/2/1674542521948-hudderton-backpack-khaki.webp",
          "media_url": "kbcollections/2023/0/2/1674542521948-hudderton-backpack-khaki.webp",
          "media_type": "i",
          "inserted_date": "2023-01-24T06:42:01.000Z",
          "status": "1",
          "http_url": "https://cdn.worldvectorlogo.com/logos/lorem-lorem-1.svg"
      }
  ]
  }

  const imgUrl = menudata.mediadata[0].http_url
  const imgAlt = menudata.mediadata[0].media_alt_text

  return (
    <>
      <Navbar expand="lg" className={styles.navBar + 'p-0'}>
        {
          console.log(45,menuData)
        }
        <Container>
          <Navbar.Brand href="/">
            <img src={imgUrl} alt={imgAlt} width={75} height={75} />
          </Navbar.Brand>
          <div className="d-flex gap-3 align-items-center">
            <div
              className={`d-flex gap-3 ${styles.CartIcons} ${styles.CartIconsMobile}`}
            >
              <p className={`mb-0 ${styles.username}`}>{username}</p>
              <Link
                href={isAuthenticated ? '/user/profile/edit-profile' : '/login'}
              >
                <Link
                  href={
                    isAuthenticated ? '/user/profile/edit-profile' : '/login'
                  }
                >
                  <UserIcon />
                </Link>
              </Link>
              <Link href="/user/wishlist">
                <HeartIcon />
              </Link>
              <CartModal />
              <div
                onClick={() => dispatch(toggleCartModal(!isCartOpen))}
                className={`d-flex align-items-center ${styles.cartIcon}`}
                style={{ cursor: 'pointer' }}
              >
                {items?.length > 0 && (
                  <span className={styles.count}>{items.length}</span>
                )}
                <CartIcon />
              </div>
            </div>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </div>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-between"
          >
            <div className={`d-flex gap-4  ${styles.flexNav}`}>
              {headerNavData?.map((item, i) =>
                item?.subitems?.length > 0 ? (
                  <Nav
                    className={`my-2 my-lg-0 ${styles['navigation-items']}`}
                    key={item?.menu_label}
                  >
                    <Link href={item.menu_link}>
                      <Dropdown variant="default">
                        <Dropdown.Toggle variant="default" className={`p-0 `}>
                          {item.menu_label}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.menu}>
                          {item.subitems?.map((subItem, i) => (
                            <Dropdown.Item href={subItem.menu_link} key={i}>
                              {subItem.menu_label}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Link>
                  </Nav>
                ) : (
                  <Nav className={`my-2 my-lg-0 ${styles['navigation-items']}`}>
                    <Link href={item.menu_link}>{item.menu_label}</Link>
                  </Nav>
                ),
              )}
              <div className={styles.searchh}>
                <SearchBar />
              </div>
            </div>
            <div
              className={`d-flex gap-3 align-items-center ${styles.CartIcons}`}
            >
              <p className={`mb-0 ${styles.username}`}>{username}</p>
              <Link
                href={isAuthenticated ? '/user/profile/edit-profile' : '/login'}
              >
                <UserIcon />
              </Link>
              <Link href="/user/wishlist">
                <HeartIcon />
              </Link>

              <CartModal />
              <div
                onClick={() => dispatch(toggleCartModal(!isCartOpen))}
                className={`d-flex align-items-center ${styles.cartIcon}`}
                style={{ cursor: 'pointer' }}
              >
                {items?.length > 0 && (
                  <span className={styles.count}>{items.length}</span>
                )}
                <CartIcon />
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
        <div className={styles.searchFormMobile}>
          <SearchBar customFormClass={styles.searchFormMobile} />
        </div>
      </Navbar>
    </>
  );

};
