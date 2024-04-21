import './Popup.css';
import { useEffect, useRef, useState } from 'react';
import { createItem, changeItem } from '../../utils/Api';

export default function Popup({ isOpened, closePopup, itemToChange, token }) {
  const dialogRef = useRef();
  const [name, setName] = useState('');
  const [units, setUnits] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpened) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close();
    }
  }, [isOpened])

  useEffect(() => {
    if (itemToChange) {
      setName(itemToChange.name);
      setUnits(itemToChange.measurement_units);
      setCode(itemToChange.code);
      setDescription(itemToChange.description);
    } else {
      setName('');
      setUnits('');
      setCode('');
      setDescription('');
    }
  }, [itemToChange]);
  

  function handleSubmit(e) {
    e.preventDefault();
    const item = {
      name,
      measurement_units: units,
      code,
      description
    };

    if(itemToChange) {
      itemToChange.name = name;
      itemToChange.measurement_units = units;
      itemToChange.code = code;
      itemToChange.description = description;
      changeItem(itemToChange, token)
    } else {
      createItem(item, token)
    }
    console.log(item)
    handleClose();
  }

  function handleClose() {
    setName('')
    setUnits('')
    setCode('')
    setDescription('')
    closePopup()
  }

  return (
    <dialog className='popup' ref={dialogRef}>
      <div className='popup__header'>
        <div className='popup__logo' />
        <button type='reset' form='change-popup' className='popup__button-close' onClick={handleClose} />
      </div>
      <form className='popup__form' id='change-popup'>
        <h3 className='popup__form-name'>{itemToChange === null ? 'Новая позиция' : itemToChange.name}</h3>
        <p className='popup__form-description'>{itemToChange === null ? 'Заполните все поля для создания новой номенклатуры' : 'Внесите изменения'}</p>
        <label htmlFor='item-name' className='popup__form-label'>Название</label>
        <input type='text' id='item-name' className='popup__form-input' required value={name} onChange={e => setName(e.target.value)}></input>
        <label htmlFor='item-units' className='popup__form-label'>Единицы измерения</label>
        <input type='text' id='item-units' className='popup__form-input' required value={units} onChange={e => setUnits(e.target.value)}></input>
        <label htmlFor='item-code' className='popup__form-label'>Артикул/код</label>
        <input type='text' id='item-code' className='popup__form-input' value={code} onChange={e => setCode(e.target.value)}></input>
        <label htmlFor='item-description' className='popup__form-label'>Описание</label>
        <textarea type='text' id='item-description' className='popup__form-input input-description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
        <div className='popup__form-controls'>
          <button type='reset' form='change-popup' className='popup__form-return' onClick={handleClose}>Отмена</button>
          <button type='submit' form='change-popup' className='popup__form-submit' onClick={handleSubmit}>Подтвердить</button>
        </div>
      </form>
    </dialog>
  )
}