import React, { useState, useEffect } from 'react'
import { IconData } from '../types'
import { FixedSizeList as List } from 'react-window'

interface IconListProps {
  icons: IconData[]
}

const IconList: React.FC<IconListProps> = ({ icons }) => {
  const [listHeight, setListHeight] = useState(400)

  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight
      setListHeight(windowHeight - 200) // Adjust this value as needed
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, svg: string) => {
    event.dataTransfer.setData('text/plain', svg)
    parent.postMessage({ pluginMessage: { type: 'drag-start', svg } }, '*')
  }

  const handleDragEnd = () => {
    parent.postMessage({ pluginMessage: { type: 'drag-end' } }, '*')
  }

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const icon = icons[index]
    return (
      <div style={style} className="p-2">
        <div
          key={icon.id}
          className="border p-2 cursor-move hover:bg-gray-100 transition-colors"
          draggable
          onDragStart={(e) => handleDragStart(e, icon.svg)}
          onDragEnd={handleDragEnd}
        >
          <div dangerouslySetInnerHTML={{ __html: icon.svg }} className="w-8 h-8 mx-auto" />
          <p className="text-center mt-2 text-sm">{icon.name}</p>
        </div>
      </div>
    )
  }

  return (
    <List
      height={listHeight}
      itemCount={icons.length}
      itemSize={100}
      width="100%"
      className="grid grid-cols-3 gap-4"
    >
      {Row}
    </List>
  )
}

export default IconList