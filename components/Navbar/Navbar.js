import React from 'react';
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

export const NavbarHeader = () => {
  const { items, isCartOpen } = useSelector(state => state?.cart);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state?.auth?.isAuthenticated);
  const username = useSelector(state => state?.auth?.user?.username);
  const headerNavData = useSelector(
    state => state?.navigationBar?.navMenu?.primary_menu,
  );

  return (
    <>
      <Navbar expand="lg" className={styles.navBar + 'p-0'}>
        <Container>
          <Navbar.Brand href="/">
            <img src="/images/logo.svg" alt="Logo" width={75} height={75} />
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
