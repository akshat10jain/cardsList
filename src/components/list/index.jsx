import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { getListAct, resetDataAct } from "../../actions/listAction";
import CardList from './cardList';
import { Header, Footer } from '../common'
import { DEAFULT_PAGE_LIMIT, DEAFULT_LIMIT, BASE_URL } from '../../config';
import '../../css/list.css';

const List = ({ getList, listData, resetData }) => {

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('naruto');
  const [data, setData] = useState([]);

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

  const { results } = listData;

  const onSubmit = (ev, searchValue) => {
    ev.preventDefault();
    if (!searchValue) {
      resetData();
      setPage(DEAFULT_PAGE_LIMIT);
      setSearchValue('');
      setData([]);
      return;
    }
    setSearchValue(searchValue);
    fetchList();
  };


  useEffect(() => {
    if (results && results.length > 0) {
      setData(data.concat(results));
    }
  }, [results]);

  const handleLoadMore = () => {
    setPage(page + DEAFULT_PAGE_LIMIT);
  };

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
        <CardList cardsToRender={data} />
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
    resetData: () => dispatch(resetDataAct())
  })
)(List);