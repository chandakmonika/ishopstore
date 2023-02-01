import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { activePage } from '../../redux/pagination';
const Paginations = ({ totalPage }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  dispatch(activePage(pageNumber));

  let active = Number(pageNumber);
  let items = [];
  for (let number = 1; number <= totalPage.totalpages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <>
      <Pagination
        onClick={e => setPageNumber(e.target.text)}
        totalPage={totalPage}
        pageNumber={pageNumber}
      >
        {items}
      </Pagination>
    </>
  );
};
export default Paginations;
