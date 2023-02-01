import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { SearchIcon } from '../../public/svg';
import styles from './searchbar.module.css';

export const SearchBar = ({ customFormClass }) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <div className={`position-relative ${styles.searchBar}`}>
        <Form className={` ${styles.searchForm} ${customFormClass}`}>
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>

          <Form.Control
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            type="search"
            placeholder="Search on this website"
            className="me-2"
            ari
            a-label="Search"
          />
        </Form>
        {searchValue.length > 3 ? (
          <div className={styles.searchCard}>
            <div className={styles.list}>
              <div className={`d-flex gap-3 ${styles.listItem}`}>
                <img src="/images/p-1.png" alt="img" width="40px" />
                <h4>Kellogg’s Fruit Museli</h4>
              </div>
              <div className={`d-flex gap-3 ${styles.listItem}`}>
                <img src="/images/p-1.png" alt="img" width="40px" />
                <h4>Kellogg’s Fruit Museli</h4>
              </div>
              <div className={`d-flex gap-3 ${styles.listItem}`}>
                <img src="/images/p-1.png" alt="img" width="40px" />
                <h4>Kellogg’s Fruit Museli</h4>
              </div>
              <div className={`d-flex gap-3 ${styles.listItem}`}>
                <img src="/images/p-1.png" alt="img" width="40px" />
                <h4>Kellogg’s Fruit Museli</h4>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
