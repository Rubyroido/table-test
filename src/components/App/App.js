import { useState, useEffect } from 'react';
import './App.css';
import { login, getItems } from '../../utils/Api';
import Header from '../Header/Header';
import Table from '../Table/Table';
import Footer from '../Footer/Footer';

function App() {
  const [token, setToken] = useState('');
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);

  function countPages(totalItems, pageSize) {
    const numOfPages = Math.ceil(totalItems / pageSize);
    setTotalPages(numOfPages)
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
    getItems(currentPage, pageSize, token)
      .then(data => {
        setTotalItems(data.total)
        setCurrentItems(data.result)
        countPages(totalItems, pageSize)
      })
      .catch(err => console.log(err))
  }, [currentPage, loggedIn, pageSize, token, totalItems])

  return (
    <div className="App">
      <Header totalItems={totalItems} />
      <Table currentItems={currentItems} />
      <Footer currentPage={currentPage} pageNumbers={pageNumbers} onChangePage={onChangePage} onChangePageSize={onChangePageSize}/>
    </div>
  );
}

export default App;
