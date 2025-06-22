declare module 'vue3-tiptap' {
  import { DefineComponent, InjectionKey } from 'vue'

  export interface TiptapProps {
    mode?: "bubble" | "classic" | undefined
    content?: string
    modelValue?: string
  }

  export const IsFullScreenKey: symbol
  export const ToggleFullScreenKey: InjectionKey<() => void>

  const Vue3TipTap: DefineComponent<TiptapProps, {}, any>
  
  export { Vue3TipTap }
  export default Vue3TipTap
}

// 为全局模块声明
declare global {
  interface Window {
    Vue3TipTap: any
  }
} 