import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { getListAct } from "../../actions/listAction";
import CardList from './cardList';
import { Header, Footer } from '../common'
import { DEAFULT_LIST_LIMIT, BASE_URL } from '../../config';
import '../../css/list.css';

const List = ({ getList, listData }) => {

  const [next, setNext] = useState(3);
  const [searchValue, setSearchValue] = useState('naruto');

  const fetchList = useCallback(() => {
    const params = {
      limit: next,
      q: searchValue
    };
    getList(params);
  }, [next, searchValue]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const onSubmit = (ev, searchValue) => {
    ev.preventDefault();
    setSearchValue(searchValue);
    if (!searchValue) {
      setNext(DEAFULT_LIST_LIMIT);
    }
    fetchList();
  };

  const handleLoadMore = () => {
    setNext(next + DEAFULT_LIST_LIMIT);
  };

  const { results } = listData;

  return (
    <div className="container">
      <Header onSubmit={onSubmit} />
      <div className="list-content">
        <div className="title-url">
          {searchValue &&
            <p>Requesting:
            <span> {BASE_URL}/search/anime?q={searchValue}&limit={next}</span>
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