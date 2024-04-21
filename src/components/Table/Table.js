import { useEffect, useState } from 'react';
import './Table.css';

export default function Table({ currentItems, openItemChange, onSort, order }) {
  const [sortClass, setSortClass] = useState('');

  useEffect(() => {
    if(order==='') {
      setSortClass('')
    } else if(order==='ASC') {
      setSortClass('table__sort_asc')
    } else {
      setSortClass('table__sort_desc')
    }
  }, [order])

  return (
    <table className='table'>
      <thead className='table__header'>
        <tr>
          <th className='table__col'>Название
            <button className={`table__sort ${sortClass}`} onClick={onSort} />
          </th>
          <th className='table__col'>Единица измерения</th>
          <th className='table__col'>Артикул/код</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          currentItems.map(item => {
            return (
              <tr key={item.id} className='table__row'>
                <td className='table__col'>{item.name}</td>
                <td className='table__col'>{item.measurement_units}</td>
                <td className='table__col'>{item.code}</td>
                <td className='table__col-button'>
                  <button className='table__button-edit' onClick={() => openItemChange(item)}></button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}