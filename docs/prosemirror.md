# prosemirror

## 核心包

- `prosemirror-model`定义编辑器的文档模型，用于描述编辑器内容的数据结构。
- `prosemirror-state`提供描述编辑器整个状态（包括选择）的数据结构以及从一个状态移动到下一个状态的事务系统。
- `prosemirror-view`实现一个用户界面组件，将给定的编辑器状态显示为浏览器中的可编辑元素，并处理用户与该元素的交互。
- `prosemirror-transform`包含以可记录和重放的方式修改文档的功能，这是 state 模块中交易的基础，并使撤消历史记录和协作编辑成为可能。
