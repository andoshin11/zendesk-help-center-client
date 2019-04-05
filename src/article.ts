import { AxiosInstance } from 'axios'
import { perPageLimit } from './index'
import { BaseOptions, ListArticlesResponse, Article, ArticleSeed } from './types'

export default class ArticleClient {
  http: AxiosInstance

  constructor(http: AxiosInstance) {
    this.http = http
  }

  async getArticles (options: BaseOptions = {}): Promise<ListArticlesResponse> {
    const { page, perPage, locale } = options
  
    const res = await this.http({
      method: 'get',
      url: `/api/v2/help_center/${ locale || 'ja' }/articles.json`,
      params: {
        page: page || 1,
        per_page: perPage || 30
      }
    })
    return res.data
  }

  async getAllArticles (options: BaseOptions = {}): Promise<Article[]> {
    console.warn('This method invokes several request calls until it retrives all known articles. Please be sure to know exactly what you do!')

    let allArticles: Article[] = []
    const _self = this

    // Recursively get articles
    async function getPage(page: number) {
      const { page_count, articles } = await _self.getArticles({ page, perPage: perPageLimit, locale: options.locale })
      allArticles = [...allArticles, ...articles]

      if (page === page_count) return
      
      await getPage(page + 1)
    }

    await getPage(1)

    console.log(`Fetched ${allArticles.length} articles`)
    return allArticles
  }

  async createArticle(article: ArticleSeed, sectionId: number, options: BaseOptions = {}) {
    const { locale } = options

    const res = await this.http({
      method: 'post',
      url: `https://photocreate-support.zendesk.com/api/v2/help_center/${ locale || 'ja' }/sections/${sectionId}/articles.json`,
      data: {
        article
      }
    })
    return res
  }

  async deleteArticle(articleId: number) {
    const res = await this.http({
      method: 'delete',
      url: `https://photocreate-support.zendesk.com/api/v2/help_center/articles/${articleId}.json`
    })
    return res
  }
}
