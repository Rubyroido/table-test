import './Popup.css';
import { useEffect, useRef } from 'react';

export default function Popup({isOpened, closePopup, itemToChange}) {
  const dialogRef = useRef();

  useEffect(() => {
    if(isOpened) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close();
    }
  },[isOpened])

  function handleSubmit(e) {
    e.preventDefault();
    closePopup();
  }

  return (
    <dialog className='popup' ref={dialogRef}>
      <div className='popup__header'>
        <div className='popup__logo' />
        <button type='reset' className='popup__button-close' onClick={closePopup}/>
      </div>
      <form className='popup__form'>
        <h3 className='popup__form-name'>{itemToChange===null?'Новая позиция':'Изменить позицию'}</h3>
        <p className='popup__form-description'>{itemToChange===null?'Заполните все поля для создания новой номенклатуры':'Внесите изменения'}</p>
        <label htmlFor='item-name' className='popup__form-label'>Название</label>
        <input type='text' id='item-name' className='popup__form-input' required value={itemToChange ? itemToChange.name : ''}></input>
        <label htmlFor='item-units' className='popup__form-label'>Единицы измерения</label>
        <input type='text' id='item-units' className='popup__form-input' required value={itemToChange ? itemToChange.measurement_units : ''}></input>
        <label htmlFor='item-code' className='popup__form-label'>Артикул/код</label>
        <input type='text' id='item-code' className='popup__form-input' value={itemToChange ? itemToChange.code : ''}></input>
        <label htmlFor='item-description' className='popup__form-label'>Описание</label>
        <textarea type='text' id='item-description' className='popup__form-input input-description' value={itemToChange ? itemToChange.description : ''}></textarea>
        <div className='popup__form-controls'>
          <button type='reset' className='popup__form-return' onClick={closePopup}>Отмена</button>
          <button type='submit' className='popup__form-submit' onClick={handleSubmit}>Подтвердить</button>
        </div>
      </form>
    </dialog>
  )
}