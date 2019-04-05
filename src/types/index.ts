export * from './article'

export interface BaseOptions {
  locale?: string
  page?: number
  perPage?: number
}

export interface ZendeskResponse {
  count: number
  next_page: string | null
  page: number
  page_count: number
  per_page: number
  previous_page: string | null
}

export type Locale = 'ja' | string
