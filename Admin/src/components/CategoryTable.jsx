import React from 'react'

const CategoryTable = (
    {
        categories,
        handleEdit,
        handleDelete,
    }
) => {
  return (
    <table className='table'>
        <thead>
            <tr>
                <th className='th'>Category</th>
                <th className='th'>Actions</th>
            </tr>
        </thead>
        <tbody className='table-body'>
            {categories.map((category)=>(
                 <tr key={category.id}>
                <td className='td'>{category.name}</td>
                <td className='td'>
                    <button className='btn-small'
                    onClick={()=>handleEdit(category)}>Edit</button>
                    <button className='btn-small-danger'
                    onClick={()=>handleDelete(category.id)}>Delete</button>

                </td>
            </tr>

            ))}
        </tbody>
    </table>
  )
}

export default CategoryTable