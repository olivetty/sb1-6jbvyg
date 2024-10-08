import React, { useState, useEffect } from 'react'
import IconList from './components/IconList'
import SearchBar from './components/SearchBar'
import CategoryDropdown from './components/CategoryDropdown'
import { IconData, Category } from './types'

const App: React.FC = () => {
  const [icons, setIcons] = useState<IconData[]>([])
  const [filteredIcons, setFilteredIcons] = useState<IconData[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const loadIcons = async () => {
      try {
        const iconModules = import.meta.glob('./icons/**/*.svg', { as: 'raw' })
        const loadedIcons: IconData[] = []
        const categorySet = new Set<string>()

        for (const path in iconModules) {
          const svg = await iconModules[path]()
          const pathParts = path.split('/')
          const category = pathParts[pathParts.length - 2]
          const filename = pathParts[pathParts.length - 1]
          const name = filename.replace('.svg', '')
          
          loadedIcons.push({ id: name, name, svg, category })
          categorySet.add(category)
        }

        setIcons(loadedIcons)
        setFilteredIcons(loadedIcons)
        setCategories([
          { id: 'all', name: 'All' },
          ...Array.from(categorySet).map(cat => ({ id: cat, name: cat }))
        ])
      } catch (error) {
        console.error('Error loading icons:', error)
      }
    }

    loadIcons()
  }, [])

  useEffect(() => {
    const filtered = icons.filter(icon => 
      (selectedCategory === 'all' || icon.category === selectedCategory) &&
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredIcons(filtered)
  }, [icons, selectedCategory, searchTerm])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">SVG Icon Drag and Drop</h1>
      <div className="flex mb-4">
        <CategoryDropdown 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        <SearchBar onSearch={handleSearch} />
      </div>
      <IconList icons={filteredIcons} />
    </div>
  )
}

export default App