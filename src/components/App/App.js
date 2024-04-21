import { useState, useEffect } from 'react';
import './App.css';
import { login, getItems } from '../../utils/Api';
import Header from '../Header/Header';
import Table from '../Table/Table';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';

function App() {
  const [token, setToken] = useState('');
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [itemToChange, setItemToChange] = useState(null);
  const [query, setQuery] = useState('');
  const sortBy = '';
  const order = '';

  function countPages(totalItems, pageSize) {
    const numOfPages = Math.ceil(totalItems / pageSize);
    const arrayOfPages = [];
    for (let i = 1; i <= numOfPages; i++) {
      arrayOfPages.push(i)
    }
    setPageNumbers(arrayOfPages)
  }

  function onChangePage(page) {
    setCurrentPage(page)
  }

  function onChangePageSize(size) {
    setPageSize(size)
  }

  function openPopup() {
    setIsPopupOpened(true)
  }

  function closePopup() {
    setItemToChange(null)
    setIsPopupOpened(false)
  }

  function openItemChange(item) {
    setItemToChange(item)
    openPopup()
  }

  function onSearch(query) {
    setQuery(query)
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
      setIsLoggedIn(true)
    } else {
      login()
        .then(data => {
          setToken(data.access_token)
          sessionStorage.setItem('token', data.access_token)
          setIsLoggedIn(true)
        })
        .catch(err => console.log(err))
    }
  }, [])

  useEffect(() => {
    getItems(currentPage, pageSize, token, query, sortBy, order)
      .then(data => {
        setTotalItems(data.total)
        setCurrentItems(data.result)
        countPages(totalItems, pageSize)
      })
      .catch(err => console.log(err))
  }, [currentPage, loggedIn, pageSize, query, token, totalItems])

  return (
    <div className="App">
      <Header totalItems={totalItems} openPopup={openPopup} onSearch={onSearch}/>
      <Table currentItems={currentItems} openItemChange={openItemChange}/>
      <Footer currentPage={currentPage} pageNumbers={pageNumbers} onChangePage={onChangePage} onChangePageSize={onChangePageSize} />
      <Popup isOpened={isPopupOpened} closePopup={closePopup} itemToChange={itemToChange} token={token}/>
    </div>
  );
}

export default App;
