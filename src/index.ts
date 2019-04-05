import axios from 'axios'
import ArticleClient from './article'
export * from './types'

export const perPageLimit = 100

export interface ZendeskClient {
  Article: ArticleClient
}

export interface CreateClientParams {
  accessToken: string
  username: string
  host: string
}

export function createClient (params: CreateClientParams): ZendeskClient {
  if (!params.accessToken) {
    throw new TypeError('Expected parameter: accessToken')
  }

  if (!params.username) {
    throw new TypeError('Expected parameter: username')
  }

  const defaultConfig: Partial<CreateClientParams> = {
  }

  const config: CreateClientParams = {
    ...defaultConfig,
    ...params
  }

  const { accessToken, username, host } = config

  const httpClient = axios.create({
    baseURL: host,
    auth: { username, password: accessToken }
  })

  return {
    Article: new ArticleClient(httpClient)
  }
}
