import { visit } from 'unist-util-visit'
import { Plugin } from 'unified'
import { Node, Element } from 'hast'

export const addClassToTitles: Plugin = () => {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName === 'h1' ||
        node.tagName === 'h2' ||
        node.tagName === 'h3' ||
        node.tagName === 'h4' ||
        node.tagName === 'h5' ||
        node.tagName === 'h6'
      ) {
        node.properties = node.properties || {}
        const existingClasses = Array.isArray(node.properties.className)
          ? node.properties.className
          : []

        node.properties.className = [
          'font-extrabold tracking-tighter break-word',
          ...existingClasses,
        ]
      }
    })
  }
}
