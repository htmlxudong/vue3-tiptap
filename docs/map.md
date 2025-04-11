# map 映射

1.StepMap

`StepMap 记录文档变化的步骤，比如插入、删除或替换。Mapping 则是一组 StepMap，用于处理多个步骤的变化。用户可能需要了解如何创建这些映射，以及如何应用它们来调整位置。`

- 场景： 实际应用场景是，在实现撤销/重做功能时，需要确保光标或选区在文档变化后正确移动。或者在自定义插件或命令时需要处理文档的变化跟踪。这时候，map 映射就非常重要了。

## 核心概念

在第 5 个字符处插入"abc"，StepMap 会记录这个操作如何影响后续位置。

```ts
// 将旧位置映射到新位置
map(pos: number, assoc?: number): number
// 反向映射（新位置→旧位置）
invert(): StepMap

```

2.Mapping
`管理一组连续的 StepMap，用于处理多个连续变更步骤。`

```ts
// 添加一个 StepMap
appendMap(stepMap: StepMap, mirrors?: number)
// 映射位置（旧→新）
map(pos: number, assoc?: number): number
// 反向映射（新→旧）
invert(): Mapping

```

## 使用场景

1. 历史记录（Undo/Redo）
   在撤销/重做时，需要将当前文档的位置映射到历史版本的位置：

```ts
// 示例：撤销时映射选区位置
const tr = history.undo(state);
if (tr) {
  // 使用 mapping 调整选区
  const newSelection = state.selection.map(tr.mapping);
  tr.setSelection(newSelection);
  dispatch(tr);
}
```

2. 协同编辑
   在协同编辑中，远程操作需要本地应用后映射位置：

```ts
// 接收远程步骤并应用
receivedSteps.forEach((step) => {
  const result = applyStep(step); // 应用步骤到本地文档
  mapping.appendMap(result.map); // 记录映射关系
});
```

3. 插件开发
   插件中跟踪文档变化时，需要通过映射保持标记位置正确
