import './Header.css';
import { useState } from 'react';

export default function Header({ totalItems, openPopup, onSearch }) {
  const [query, setQuery] = useState('');

  function handleSumbmit(e) {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div className='header'>
      <div className='header__description'>
        <h1 className='header__name'>Номенклатура</h1>
        <span className='header__total'>{totalItems} единиц</span>
      </div>
      <div className='header__controls'>
        <form className='header__search'>
          <div className='header__search-icon' />
          <input className='header__search-input' placeholder='Поиск по названию' type='text' onChange={e => setQuery(e.target.value)}></input>
          <button className='header__search-submit' type='submit' onClick={e => handleSumbmit(e)}>Поиск</button>
        </form>
        <button className='header__add-item' type='button' onClick={openPopup}>
          <div className='header__add-icon' />
          Новая позиция</button>
      </div>
    </div>
  )
}