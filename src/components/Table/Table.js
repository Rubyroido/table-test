import './Table.css';

export default function Table({ currentItems, openItemChange }) {
  return (
    <table className='table'>
      <thead className='table__header'>
        <tr>
          <th className='table__col'>Название</th>
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
                  <button className='table__button-edit' onClick={()=> openItemChange(item)}></button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}