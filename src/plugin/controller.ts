let isDragging = false

figma.showUI(__html__, { width: 300, height: 400 })

figma.ui.onmessage = (msg) => {
  if (msg.type === 'drag-start') {
    isDragging = true
  } else if (msg.type === 'drag-end') {
    isDragging = false
  }
}

figma.on('drop', (event) => {
  if (isDragging) {
    const { svg } = figma.ui.getPluginData() as { svg: string }
    const node = figma.createNodeFromSvg(svg)
    node.x = event.absoluteX
    node.y = event.absoluteY
    figma.currentPage.appendChild(node)
    figma.currentPage.selection = [node]
  }
})