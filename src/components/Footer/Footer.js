import './Footer.css';
import { useState } from 'react';

export default function Footer({ currentPage, pageNumbers, onChangePage }) {
  const [minPage, setMinPage] = useState(0);
  const [maxPage, setMaxPage] = useState(10);

  function handlePageClick(page) {
    onChangePage(page)
  }

  function handleLeft(page) {
    onChangePage(page)
    if(page<pageNumbers[minPage]) {
      setMinPage(minPage-10)
      setMaxPage(maxPage-10)
    }
  }

  function handleRight(page) {
    onChangePage(page)
    if(page>=pageNumbers[maxPage]) {
      setMinPage(minPage+10)
      setMaxPage(maxPage+10)
    }
  }

  return (
    <div className='footer'>
      <div className='pagination'>
        {
          currentPage === 1 ? null : <button type='button' className='button-left' onClick={() => handleLeft(currentPage - 1)} />
        }
        <nav className='pages'>
          {
            pageNumbers.slice(minPage, maxPage).map(page => {
              return (
                <button className={`button-page ${currentPage === page ? 'button-page_active' : null}`} onClick={() => handlePageClick(page)}>{page}</button>
              )
            })
          }
        </nav>
        {
          currentPage === pageNumbers[pageNumbers.length - 1] ? null : <button type='button' className='button-right' onClick={() => handleRight(currentPage + 1)} />
        }
      </div>
      <form>
        <label htmlFor='size-select'>Показывать по:</label>
        <select name='page-size' id='size-select'>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </form>
    </div>
  )
}