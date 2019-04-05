import { ZendeskResponse, Locale } from './index'

export interface Article {
  id: number
  url: string
  html_url: string
  author_id: number
  comments_disabled: boolean
  draft: boolean
  promoted: boolean
  position: number
  vote_sum: number
  vote_count: number
  section_id: number
  created_at: string
  updated_at: string
  name: string
  title: string
  source_locale: Locale
  locale: Locale
  outdated: boolean
  outdated_locales: Locale[]
  edited_at: string
  user_segment_id: number
  permission_group_id: number
  body: string
}

export interface ArticleSeed {
  title: string
  body: string
}

export type ListArticlesResponse = ZendeskResponse & {
  articles: Article[]
}
