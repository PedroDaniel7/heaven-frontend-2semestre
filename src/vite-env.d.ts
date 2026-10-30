/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base da API Heaven, sem barra no final (ex.: http://localhost:8080). */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
