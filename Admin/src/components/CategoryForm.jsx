import React from 'react'

const CategoryForm = (
    {
    categoryName,
    setCategoryName,
    handleAddCategory,
    handleUpdateCategory,
    editId,
    message
}
) => {
  return (
    <div>
        <label className='label'>Category Name</label>
        <br/>

        <input 
        className='input'
        type='text'
        placeholder='Enter category name'
        value={categoryName}
        onChange={(e)=>setCategoryName(e.target.value)}/>
        <br/>

        <button 
        className='btn-primary'
        onClick={editId ? handleUpdateCategory : handleAddCategory}>
            {editId ? "Update Category" : "Add Category"} 
        </button>

        <p className='message'>{message}</p>

    </div>
  )
}

export default CategoryForm