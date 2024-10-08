import React from 'react'
import { Category } from '../types'

interface CategoryDropdownProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="border p-2 rounded mr-2"
    >
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  )
}

export default CategoryDropdown