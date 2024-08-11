import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Tree, Modal, TreeProps, Flex } from 'antd'
import { catalogStore } from '../stores/CatalogStore'
import { toJS } from 'mobx'
import { Category } from '../types'
import { DataNode } from 'antd/lib/tree'
import { SubCategoryForm } from './SubCategoryForm'
import { CategoryForm } from './CategoryForm'
import { Button, Search, Title, Wrapper } from './uikit'

const findNodeByKey = (data: Category[], key: number): Category | null => {
  // eslint-disable-next-line prefer-const
  for (let item of data) {
    if (item.id === key) {
      return item
    }
    if (item.children) {
      const found = findNodeByKey(item.children, key)
      if (found) {
        return found
      }
    }
  }
  return null
}

const getParentKey = (key: string, tree: Category[]): string | null => {
  let parentKey: string | null = null
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item) => item.id.toString() === key)) {
        parentKey = node.id.toString()
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

interface CategoryDataNode extends DataNode {
  dataRef: Category
}

const CatalogView: React.FC = observer(() => {
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false)
  const [isSubCategoryModalVisible, setSubCategoryModalVisible] =
    useState(false)
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onExpand = (expandedKeys: React.Key[]) => {
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, toJS(catalogStore.catalog))
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    setExpandedKeys(expandedKeys as React.Key[])
    setSearchValue(value)
    setAutoExpandParent(true)
  }

  const dataList: { key: string; title: string }[] = []
  const generateList = (data: Category[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const { id, name } = node
      dataList.push({ key: id.toString(), title: name })
      if (node.children) {
        generateList(node.children)
      }
    }
  }
  generateList(toJS(catalogStore.catalog))

  const renderTreeNodes = (data: Category[]): CategoryDataNode[] =>
    data.map((item) => {
      const index = item.name.indexOf(searchValue)
      const beforeStr = item.name.substr(0, index)
      const afterStr = item.name.substr(index + searchValue.length)
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: 'red' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.name}</span>
        )
      if (item.children) {
        return {
          key: item.id.toString(),
          title,
          children: renderTreeNodes(item.children),
          dataRef: item,
          disabled: item.parentId === null,
        }
      }
      return {
        key: item.id.toString(),
        title,
        dataRef: item,
        disabled: item.parentId === null,
      }
    })

  const onDrop: TreeProps['onDrop'] = (info) => {
    const dropKey = Number(info.node.key)
    const dragKey = Number(info.dragNode.key)

    const dragObj = findNodeByKey(catalogStore.catalog, dragKey)
    const dropObj = findNodeByKey(catalogStore.catalog, dropKey)

    if (!dragObj || !dropObj) return

    // Prevent dropping categories into subcategories
    if (dropObj.parentId !== null) {
      return
    }

    // Move subcategory
    catalogStore.moveSubCategory(dragKey, dropKey)
  }

  return (
    <Wrapper>
      <Flex
        gap='large'
        vertical
      >
        <Title>Каталог</Title>
        <Search
          placeholder='Поиск'
          onChange={onChange}
        />
        <Tree
          draggable
          onDrop={onDrop}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={renderTreeNodes(toJS(catalogStore.catalog))}
        />
        <Flex
          gap='small'
          justify='center'
        >
          <Button onClick={() => setCategoryModalVisible(true)}>
            Добавить/изменить категорию
          </Button>
          <Button onClick={() => setSubCategoryModalVisible(true)}>
            Добавить/изменить подкатегорию
          </Button>
        </Flex>
      </Flex>
      <Modal
        title='Добавить категорию'
        open={isCategoryModalVisible}
        onCancel={() => setCategoryModalVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <CategoryForm onClose={() => setCategoryModalVisible(false)} />
      </Modal>

      <Modal
        title='Добавить подкатегорию'
        open={isSubCategoryModalVisible}
        onCancel={() => setSubCategoryModalVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <SubCategoryForm onClose={() => setSubCategoryModalVisible(false)} />
      </Modal>
    </Wrapper>
  )
})

export default CatalogView
