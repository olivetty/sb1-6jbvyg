import React, { useState } from 'react'

interface SearchBarProps {
  onSearch: (term: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  return (
    <input
      type="text"
      placeholder="Search icons..."
      value={searchTerm}
      onChange={handleChange}
      className="border p-2 rounded w-full"
    />
  )
}

export default SearchBar