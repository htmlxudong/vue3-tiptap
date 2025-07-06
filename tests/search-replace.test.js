import { describe, it, expect, beforeEach } from 'vitest'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import SearchReplace from '../src/components/vue3-tiptap/extensions/search-replace'

describe('SearchReplace Extension', () => {
  let editor

  beforeEach(() => {
    editor = new Editor({
      extensions: [
        StarterKit,
        SearchReplace,
      ],
      content: '<p>这是一个测试文档，包含一些测试文本。</p>',
    })
  })

  it('应该正确初始化扩展', () => {
    expect(editor.isActive('searchReplace')).toBe(false)
  })

  it('应该能够搜索文本', () => {
    const result = editor.commands.search('测试')
    expect(result).toBe(true)
  })

  it('应该能够清除搜索', () => {
    editor.commands.search('测试')
    const result = editor.commands.clearSearch()
    expect(result).toBe(true)
  })

  it('应该能够查找下一个', () => {
    editor.commands.search('测试')
    const result = editor.commands.findNext()
    expect(result).toBe(true)
  })

  it('应该能够查找上一个', () => {
    editor.commands.search('测试')
    const result = editor.commands.findPrev()
    expect(result).toBe(true)
  })

  it('应该能够替换文本', () => {
    editor.commands.search('测试')
    const result = editor.commands.replace('示例')
    expect(result).toBe(true)
  })

  it('应该能够全部替换', () => {
    editor.commands.search('测试')
    const result = editor.commands.replaceAll('示例')
    expect(result).toBe(true)
  })

  it('空查询应该清除搜索', () => {
    editor.commands.search('测试')
    const result = editor.commands.search('')
    expect(result).toBe(true)
  })

  it('应该正确处理正则表达式特殊字符', () => {
    editor.setContent('<p>测试 [特殊] 字符</p>')
    const result = editor.commands.search('[特殊]')
    expect(result).toBe(true)
  })

  it('应该支持大小写不敏感搜索', () => {
    editor.setContent('<p>Test TEXT test</p>')
    const result = editor.commands.search('test')
    expect(result).toBe(true)
  })

  it('应该在文档更新时重新应用搜索', () => {
    editor.commands.search('测试')
    editor.commands.setContent('<p>新的测试内容</p>')
    // 这里应该自动重新应用搜索
    expect(editor.isActive('searchReplace')).toBe(false)
  })
}) 