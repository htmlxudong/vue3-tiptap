<template>
    <div class="v-model-test">
        <div class="editor-container">
            <h2 class="h2-title">Vue3-Tiptap V-Model Demo</h2>
            <div class="controls">
                <h3>控制按钮：</h3>
                <a-button type="primary" @click="updateContent">更新内容</a-button>
                <a-button type="default" @click="clearContent">清空内容</a-button>
                <a-button type="default" @click="setRichContent">设置富文本内容</a-button>
            </div>
            <Vue3Tiptap v-model="editorContent" />
        </div>

        <h3 class="h3-title">当前内容预览：</h3>
        <div class="content-display">
            <div class="html-content">
                <h4>HTML 内容：</h4>
                <pre>{{ editorContent }}</pre>
            </div>
            <div class="rendered-content">
                <h4>渲染效果：</h4>
                <div v-html="editorContent"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Vue3Tiptap from "@/components/vue3-tiptap";

const editorContent = ref("<p>欢迎使用 Vue3-Tiptap 编辑器！</p><p>这是一个支持 v-model 双向绑定的富文本编辑器。</p>")

const updateContent = () => {
    editorContent.value = `<p>内容已更新 - ${new Date().toLocaleTimeString()}</p>`
}

const clearContent = () => {
    editorContent.value = ""
}

const setRichContent = () => {
    editorContent.value = `
    <h2>富文本示例</h2>
    <p>这是一个包含多种格式的<strong>富文本</strong>内容：</p>
    <ul>
      <li><em>斜体文本</em></li>
      <li><strong>粗体文本</strong></li>
      <li><u>下划线文本</u></li>
    </ul>
    <blockquote>
      <p>这是一个引用块</p>
    </blockquote>
    <p>您可以在编辑器中修改内容，或者通过按钮更新内容。</p>
  `
}

</script>

<style lang="scss" scoped>
.v-model-test {
    max-width: 1500px;
    margin: 0 auto;
    padding-bottom: 20px;
}

.editor-container {
    .h2-title {
        text-align: center;
        font-weight: 600;
        font-size: 18px;
    }

    h2,
    h3 {
        color: #333;
    }

    .controls {
        .ant-btn {
            margin-right: 10px;
            margin-bottom: 10px;
        }
    }
}



.h3-title {
    padding: 15px 0;
    color: #333;
}

.content-display {
    border: 1px solid #eee;
    display: grid;
    display: flex;
    gap: 20px;

    h4 {
        margin-bottom: 10px;
        color: #666;
    }

    .html-content {
        background-color: #f5f5f5;
        width: 50%;

        pre {
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
            font-size: 12px;
            line-height: 1.4;

        }
    }

    .rendered-content {
        width: 50%;
        div {
            padding: 15px;
            border-radius: 4px;
            background-color: #fff;
            min-height: 100px;
        }
    }
}

@media (max-width: 768px) {
    .content-display {
        grid-template-columns: 1fr;
    }
}
</style>