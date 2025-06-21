import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Toolbar from "@/components/vue3-tiptap/toolbar/classic/index.vue";

// Mock editor
const mockEditor = {
  commands: {
    toggleBold: vi.fn(),
    toggleItalic: vi.fn(),
    toggleUnderline: vi.fn(),
    setTextAlign: vi.fn(),
    insertTable: vi.fn(),
    toggleBulletList: vi.fn(),
    toggleOrderedList: vi.fn(),
    setLink: vi.fn(),
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
    unsetAllMarks: vi.fn()
  },
  can: vi.fn(() => true),
  isActive: vi.fn(() => false),
  on: vi.fn(),
  off: vi.fn()
};

// Mock child components
const mockComponents = {
  ToolTemplate: {
    name: 'ToolTemplate',
    template: '<button class="tool-template">工具</button>',
    props: ['editor', 'option']
  },
  Dvider: {
    name: 'Dvider',
    template: '<div class="divider">|</div>'
  },
  FontColor: {
    name: 'FontColor',
    template: '<div class="font-color">字体颜色</div>',
    props: ['editor']
  },
  BgColor: {
    name: 'BgColor',
    template: '<div class="bg-color">背景颜色</div>',
    props: ['editor']
  },
  HeaderTool: {
    name: 'HeaderTool',
    template: '<div class="header-tool">标题</div>',
    props: ['editor']
  },
  FontFamily: {
    name: 'FontFamily',
    template: '<div class="font-family">字体</div>',
    props: ['editor']
  },
  ImageTool: {
    name: 'ImageTool',
    template: '<div class="image-tool">图片</div>',
    props: ['editor']
  },
  VideoTool: {
    name: 'VideoTool',
    template: '<div class="video-tool">视频</div>',
    props: ['editor']
  },
  PdfTool: {
    name: 'PdfTool',
    template: '<div class="pdf-tool">PDF</div>',
    props: ['editor']
  },
  TableTool: {
    name: 'TableTool',
    template: '<div class="table-tool">表格</div>',
    props: ['editor']
  },
  OrderedList: {
    name: 'OrderedList',
    template: '<div class="ordered-list">有序列表</div>',
    props: ['editor']
  },
  BulletList: {
    name: 'BulletList',
    template: '<div class="bullet-list">无序列表</div>',
    props: ['editor']
  },
  LinkTool: {
    name: 'LinkTool',
    template: '<div class="link-tool">链接</div>',
    props: ['editor']
  },
  FullScreen: {
    name: 'FullScreen',
    template: '<div class="fullscreen">全屏</div>',
    props: ['editor']
  },
  FindReplace: {
    name: 'FindReplace',
    template: '<div class="find-replace">查找替换</div>',
    props: ['editor', 'visible', 'closeModal']
  },
  FontSize: {
    name: 'FontSize',
    template: '<div class="font-size">字号</div>',
    props: ['editor']
  },
  FontAlign: {
    name: 'FontAlign',
    template: '<div class="font-align">对齐</div>',
    props: ['editor']
  },
  FormatBrush: {
    name: 'FormatBrush',
    template: '<div class="format-brush">格式刷</div>',
    props: ['editor']
  },
  LineHeight: {
    name: 'LineHeight',
    template: '<div class="line-height">行高</div>',
    props: ['editor']
  }
};

describe('Toolbar Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Toolbar, {
      props: {
        editor: mockEditor
      },
      global: {
        stubs: mockComponents
      }
    });
  });

  it('应该正确渲染工具栏', () => {
    expect(wrapper.find('.toolbar').exists()).toBe(true);
  });

  it('应该包含所有工具栏组件', () => {
    expect(wrapper.findComponent({ name: 'LinkTool' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'FormatBrush' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'FontSize' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'LineHeight' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'FontColor' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'BgColor' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'HeaderTool' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'FontFamily' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'ImageTool' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'VideoTool' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'PdfTool' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TableTool' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'FontAlign' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'OrderedList' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'BulletList' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'FullScreen' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'FindReplace' }).exists()).toBe(true);
  });

  it('应该正确传递editor属性给子组件', () => {
    const linkTool = wrapper.findComponent({ name: 'LinkTool' });
    expect(linkTool.props('editor')).toBe(mockEditor);
  });

  it('应该支持自定义工具栏插槽', async () => {
    const customWrapper = mount(Toolbar, {
      props: {
        editor: mockEditor
      },
      slots: {
        tool: '<div class="custom-tool">自定义工具</div>'
      },
      global: {
        stubs: mockComponents
      }
    });

    expect(customWrapper.find('.custom-tool').exists()).toBe(true);
  });

  it('应该包含分隔符', () => {
    expect(wrapper.findComponent({ name: 'Dvider' }).exists()).toBe(true);
  });

  it('应该正确设置工具栏样式', () => {
    const toolbar = wrapper.find('.toolbar');
    expect(toolbar.classes()).toContain('toolbar');
  });
});

describe('Toolbar 功能测试', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Toolbar, {
      props: {
        editor: mockEditor
      },
      global: {
        stubs: mockComponents
      }
    });
  });

  it('应该能够切换查找替换模态框', async () => {
    // 初始状态
    expect(wrapper.vm.visible).toBe(false);
    
    // 触发切换
    await wrapper.vm.toggleModal();
    
    expect(wrapper.vm.visible).toBe(true);
  });

  it('应该能够关闭查找替换模态框', async () => {
    // 先打开模态框
    await wrapper.vm.toggleModal();
    expect(wrapper.vm.visible).toBe(true);
    
    // 关闭模态框
    await wrapper.vm.closeModal();
    expect(wrapper.vm.visible).toBe(false);
  });

  it('应该正确传递模态框状态给FindReplace组件', async () => {
    await wrapper.vm.toggleModal();
    
    const findReplace = wrapper.findComponent({ name: 'FindReplace' });
    expect(findReplace.props('visible')).toBe(true);
    expect(findReplace.props('closeModal')).toBe(wrapper.vm.closeModal);
  });
}); 