import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Vue3Tiptap from "@/components/vue3-tiptap/index.vue";
import { nextTick } from 'vue';

// Mock Tiptap extensions
vi.mock('@tiptap/vue-3', () => ({
  useEditor: vi.fn(() => ({
    value: {
      getText: vi.fn(() => 'Test content'),
      on: vi.fn(),
      off: vi.fn(),
      destroy: vi.fn(),
      isDestroyed: false,
      commands: {
        focus: vi.fn(),
        setContent: vi.fn(),
        clearContent: vi.fn(),
        toggleBold: vi.fn(),
        toggleItalic: vi.fn(),
        toggleUnderline: vi.fn(),
        setTextAlign: vi.fn(),
        insertTable: vi.fn(),
        addColumnBefore: vi.fn(),
        addColumnAfter: vi.fn(),
        deleteColumn: vi.fn(),
        addRowBefore: vi.fn(),
        addRowAfter: vi.fn(),
        deleteRow: vi.fn(),
        deleteTable: vi.fn(),
        toggleCodeBlock: vi.fn(),
        toggleBlockquote: vi.fn(),
        toggleBulletList: vi.fn(),
        toggleOrderedList: vi.fn(),
        setLink: vi.fn(),
        unsetLink: vi.fn(),
        insertImage: vi.fn(),
        insertVideo: vi.fn(),
        setColor: vi.fn(),
        setHighlight: vi.fn(),
        setFontFamily: vi.fn(),
        setFontSize: vi.fn(),
        setLineHeight: vi.fn(),
        indent: vi.fn(),
        outdent: vi.fn(),
        undo: vi.fn(),
        redo: vi.fn(),
        clearNodes: vi.fn(),
        unsetAllMarks: vi.fn(),
        setNodeSelection: vi.fn(),
        updateAttributes: vi.fn()
      },
      state: {
        doc: {
          content: {
            content: [
              {
                content: [
                  {
                    text: 'Test content'
                  }
                ]
              }
            ]
          }
        }
      },
      view: {
        dom: document.createElement('div'),
        state: {
          selection: {
            empty: true,
            from: 0,
            to: 0
          }
        }
      },
      can: vi.fn(() => true),
      isActive: vi.fn(() => false),
      getHTML: vi.fn(() => '<p>Test content</p>'),
      getJSON: vi.fn(() => ({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Test content'
              }
            ]
          }
        ]
      }))
    }
  })),
  EditorContent: {
    name: 'EditorContent',
    template: '<div class="editor-content"><slot /></div>'
  },
  NodeViewWrapper: {
    name: 'NodeViewWrapper',
    template: '<div class="node-view-wrapper"><slot /></div>',
    props: ['as']
  },
  nodeViewProps: {
    node: {
      attrs: {
        src: '',
        title: '',
        alt: '',
        width: 0,
        height: 0,
        display: 'inline'
      }
    },
    editor: null,
    getPos: vi.fn(() => 0),
    updateAttributes: vi.fn(),
    deleteNode: vi.fn()
  }
}));

// Mock Tiptap extensions
vi.mock('@tiptap/starter-kit', () => ({
  default: {
    configure: vi.fn(() => ({
      name: 'starter-kit'
    }))
  }
}));

// Mock custom extensions
vi.mock('@/components/vue3-tiptap/extensions/index', () => ({
  Underline: {
    configure: vi.fn(() => ({ name: 'underline' }))
  },
  Color: { name: 'color' },
  Highlight: {
    configure: vi.fn(() => ({ name: 'highlight' }))
  },
  TextAlign: {
    configure: vi.fn(() => ({ name: 'text-align' }))
  },
  FontFamily: { name: 'font-family' },
  Link: {
    configure: vi.fn(() => ({ name: 'link' }))
  },
  Images: { name: 'images' },
  Video: { name: 'video' },
  Table: { name: 'table' },
  TableHeader: { name: 'table-header' },
  TableRow: { name: 'table-row' },
  CustomTableCell: { name: 'custom-table-cell' },
  CustomOrderedList: { name: 'custom-ordered-list' },
  CustomBulletList: { name: 'custom-bullet-list' },
  CustomIndent: { name: 'custom-indent' },
  CodeBlockLights: {
    configure: vi.fn(() => ({ name: 'code-block-lights' }))
  },
  searchReplace: { name: 'search-replace' },
  Iframe: { name: 'iframe' },
  CustomTextStyle: { name: 'custom-text-style' },
  FormatBrush: { name: 'format-brush' },
  LineHeight: { name: 'line-height' },
  lowlight: {}
}));

// Mock lowlight
vi.mock('lowlight', () => ({
  default: {}
}));

// Mock Ant Design Vue components
vi.mock('ant-design-vue', () => ({
  Button: {
    name: 'AButton',
    template: '<button class="ant-btn"><slot /></button>'
  },
  Modal: {
    name: 'AModal',
    template: '<div class="ant-modal"><slot /></div>'
  },
  Input: {
    name: 'AInput',
    template: '<input class="ant-input" />'
  },
  Select: {
    name: 'ASelect',
    template: '<select class="ant-select"><slot /></select>'
  },
  ColorPicker: {
    name: 'AColorPicker',
    template: '<div class="ant-color-picker"><slot /></div>'
  },
  Popover: {
    name: 'APopover',
    template: '<div class="ant-popover"><slot /></div>',
    props: ['placement', 'trigger']
  }
}));

// Mock Ant Design Icons
vi.mock('@ant-design/icons-vue', () => ({
  DeleteOutlined: {
    name: 'DeleteOutlined',
    template: '<span class="delete-icon">删除</span>'
  }
}));

// Mock utility functions
vi.mock('@/utils/image', () => ({
  resolveImg: vi.fn(() => Promise.resolve({
    complete: true,
    width: 100,
    height: 100
  }))
}));

vi.mock('@/utils/index', () => ({
  clamp: vi.fn((value, min, max) => Math.min(Math.max(value, min), max))
}));

// Mock hooks
vi.mock('@/hooks/useModal', () => ({
  useModal: vi.fn(() => ({
    visible: false,
    toggleModal: vi.fn(),
    closeModal: vi.fn()
  }))
}));

describe('Vue3Tiptap Editor 基础测试', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Vue3Tiptap, {
      props: {
        mode: 'classic'
      },
      global: {
        stubs: {
          'editor-content': true,
          'Toolbar': true
        }
      }
    });
  });

  it('应该正确渲染编辑器组件', () => {
    expect(wrapper.find('.vue3-tiptap').exists()).toBe(true);
    expect(wrapper.find('.editor').exists()).toBe(true);
  });

  it('应该根据mode属性正确设置编辑器模式', () => {
    expect(wrapper.props('mode')).toBe('classic');
  });

  it('应该包含工具栏', () => {
    expect(wrapper.findComponent({ name: 'Toolbar' }).exists()).toBe(true);
  });

  it('应该支持自定义工具栏插槽', async () => {
    const customWrapper = mount(Vue3Tiptap, {
      props: {
        mode: 'classic'
      },
      slots: {
        tool: '<div class="custom-tool">自定义工具</div>'
      },
      global: {
        stubs: {
          'editor-content': true,
          'Toolbar': true
        }
      }
    });

    await nextTick();
    const toolbar = customWrapper.findComponent({ name: 'Toolbar' });
    expect(toolbar.exists()).toBe(true);
  });

  it('应该正确设置CSS类名', () => {
    const editorContainer = wrapper.find('.vue3-tiptap');
    expect(editorContainer.classes()).toContain('vue3-tiptap');
  });

  it('应该正确卸载组件', async () => {
    await wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });
});

describe('Vue3Tiptap Editor 功能测试', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Vue3Tiptap, {
      props: {
        mode: 'classic'
      },
      global: {
        stubs: {
          'editor-content': true,
          'Toolbar': true
        }
      }
    });
  });

  it('应该支持classic模式', () => {
    const classicWrapper = mount(Vue3Tiptap, {
      props: {
        mode: 'classic'
      },
      global: {
        stubs: {
          'editor-content': true,
          'Toolbar': true
        }
      }
    });
    
    expect(classicWrapper.props('mode')).toBe('classic');
    expect(classicWrapper.find('.vue3-tiptap').exists()).toBe(true);
  });

  it('应该支持bubble模式', () => {
    const bubbleWrapper = mount(Vue3Tiptap, {
      props: {
        mode: 'bubble'
      },
      global: {
        stubs: {
          'editor-content': true,
          'Toolbar': true
        }
      }
    });
    
    expect(bubbleWrapper.props('mode')).toBe('bubble');
    expect(bubbleWrapper.find('.vue3-tiptap').exists()).toBe(true);
  });

  it('应该支持无mode属性', () => {
    const noModeWrapper = mount(Vue3Tiptap, {
      global: {
        stubs: {
          'editor-content': true,
          'Toolbar': true
        }
      }
    });
    
    expect(noModeWrapper.find('.vue3-tiptap').exists()).toBe(true);
  });

  it('应该正确传递editor给Toolbar组件', () => {
    const toolbar = wrapper.findComponent({ name: 'Toolbar' });
    expect(toolbar.exists()).toBe(true);
  });

  it('应该包含编辑器内容区域', () => {
    expect(wrapper.find('.editor').exists()).toBe(true);
  });

  it('应该正确设置组件样式', () => {
    const editorContainer = wrapper.find('.vue3-tiptap');
    expect(editorContainer.attributes('class')).toContain('vue3-tiptap');
  });
});

describe('Vue3Tiptap Editor 集成测试', () => {
  it('应该能够完整渲染编辑器', () => {
    const wrapper = mount(Vue3Tiptap, {
      props: {
        mode: 'classic'
      },
      global: {
        stubs: {
          'editor-content': true,
          'Toolbar': true
        }
      }
    });

    // 检查主要结构
    expect(wrapper.find('.vue3-tiptap').exists()).toBe(true);
    expect(wrapper.find('.editor').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Toolbar' }).exists()).toBe(true);
  });

  it('应该支持不同的props组合', () => {
    const wrapper1 = mount(Vue3Tiptap, {
      props: {
        mode: 'classic'
      },
      global: {
        stubs: {
          'editor-content': true,
          'Toolbar': true
        }
      }
    });

    const wrapper2 = mount(Vue3Tiptap, {
      props: {
        mode: 'bubble'
      },
      global: {
        stubs: {
          'editor-content': true,
          'Toolbar': true
        }
      }
    });

    expect(wrapper1.find('.vue3-tiptap').exists()).toBe(true);
    expect(wrapper2.find('.vue3-tiptap').exists()).toBe(true);
  });

  it('应该正确处理插槽内容', async () => {
    const wrapper = mount(Vue3Tiptap, {
      props: {
        mode: 'classic'
      },
      slots: {
        tool: '<div class="test-slot">测试插槽</div>'
      },
      global: {
        stubs: {
          'editor-content': true,
          'Toolbar': true
        }
      }
    });

    await nextTick();
    expect(wrapper.findComponent({ name: 'Toolbar' }).exists()).toBe(true);
  });
}); 