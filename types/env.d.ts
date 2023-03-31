/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'qs'

interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly VITE_TITLE: string
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_OPEN: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
