import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { getListAct } from "../../actions/listAction";
import CardList from './cardList';
import { Header, Footer } from '../common'
import { DEAFULT_PAGE_LIMIT, DEAFULT_LIMIT, BASE_URL } from '../../config';
import '../../css/list.css';

const List = ({ getList, listData }) => {

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('naruto');

  const fetchList = useCallback(() => {
    const params = {
      limit: DEAFULT_LIMIT,
      q: searchValue,
      page: page
    };
    getList(params);
  }, [page, searchValue]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const onSubmit = (ev, searchValue) => {
    ev.preventDefault();
    setSearchValue(searchValue);
    if (!searchValue) {
      setPage(DEAFULT_PAGE_LIMIT);
    }
    fetchList();
  };

  const handleLoadMore = () => {
    setPage(page + DEAFULT_PAGE_LIMIT);
  };

  const { results } = listData;

  return (
    <div className="container">
      <Header onSubmit={onSubmit} />
      <div className="list-content">
        <div className="title-url">
          {searchValue &&
            <p>Requesting:
            <span> {BASE_URL}/search/anime?q={searchValue}&limit={16}&page={page}</span>
            </p>
          }
        </div>
        <CardList cardsToRender={results} />
      </div>
      <Footer>
        <button type="button" className="footer-btn" onClick={handleLoadMore}>Load more</button>
      </Footer>
    </div>
  )
};

export default connect(
  ({ list }) => ({
    listData: list.listData,
  }),
  dispatch => ({
    getList: params => dispatch(getListAct(params)),
  })
)(List);