# Zendesk Help Center API Client for Node.js

Node.js client for [Zendesk Help Center API](https://developer.zendesk.com/rest_api/docs/help_center/introduction).

# How to use

```js
import { createClient } from '<libPath>'

const client = createClient({
  username: 'hoge@example.com/token', // Required
  accessToken: 'xxxxxxxxxxxxxxxx', // Required
  host: 'https://<Your Domain>.zendesk.com' //Required
})

client.Article.getArticles({ page: 2, perPage: 30, locale: 'ja' })
```

# Supported APIs

## getArticles
Get articles by pages.

```js
const articles = await client.Article.getArticles({
  locale: 'ja', // Optional. Default: ja
  page: 1, // Optional. Default: 1
  perPage: 30 // Optional. Default: 30
})
```

## getAllArticles
Get articles from all pages recursively.
Be aware, this api sends requests as many as maximum page counts.

```js
const articles = await client.Article.getAllArticles({
  locale: 'ja', // Optional. Default: ja
  perPage: 30 // Optional. Default: 30
})
```

## createArticle
Create new article.

```js
const articleData = {
  title: 'New Article Test', // Required
  body: 'Extraordinary exciting text contents' // Required
}
const sectionId: 189276557

await client.Article.createArticle(articleData, sectionId)
```

## deleteArticle
Delete article.

```js
const articleId = 122152111

await client.Article.deleteArticle(articleId)
```

