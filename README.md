# Gatsby Source NYTimes Books API Plugin
This [GatsyJS](https://gatsbyjs.org) source plugin fetches data from the [NYTimes Books API](https://developer.nytimes.com/docs/books-product/1/overview)

[Demo Site](https://addhere.com)


## How to install
`npm install @yurm04/gatsby-source-nytimes-books-api`

## How to use
Add a config object to your Gatsby `config.js` file.

```javascript
// config.js
{
  resolve: "gatsby-source-nytimes-books-api",
  options: {
    token: 'YOUR_API_KEY',
    type: 'history'
    // additional properties for query parameters
  }
}
```

### Available Types
There are six different endpoints available from the NYTimes Books API.  Each endpoint has a corresponding `type` that can be set to pull data from.  Below are the available types and the endpoints they correspond to.  Check out the NYTimes Books API documentation to learn more about what parameters are available and required to successfully create a query.

#### [`lists`](https://developer.nytimes.com/docs/books-product/1/routes/lists.json/get)
Get Best Sellers list. If no date is provided returns the latest list.

#### [`date-list`](https://developer.nytimes.com/docs/books-product/1/routes/lists/%7Bdate%7D/%7Blist%7D.json/get)
Get Best Sellers list by date.

#### [`names-list`](https://developer.nytimes.com/docs/books-product/1/routes/lists/names.json/get)
Get Best Sellers list names.

#### [`overview`](https://developer.nytimes.com/docs/books-product/1/routes/lists/overview.json/get)
Get top 5 books for all the Best Sellers lists for specified date.

#### [`reviews`](https://developer.nytimes.com/docs/books-product/1/routes/reviews.json/get)
Get book reviews.

#### [`history`](https://developer.nytimes.com/docs/books-product/1/routes/lists/best-sellers/history.json/get)
Get Best Sellers list history.

### Passing Query Parameter Values
The books API allows you to query best sellers lists, reviews and books by passing any number of different parameter values.  To pass in parameter values to the source plugin, include the parameter name and value as a property of the `options` object in your `config.js` file.  For example, to use the `overview` type you can set a `publish_date` property:

```javascript
// config.js
{
  resolve: "gatsby-source-nytimes-books-api",
  options: {
    token: 'YOUR_API_KEY',
    type: 'overview'
    published_date: "2018-10-10" // available query param value specified in the NYTimes docs
  }
}
```

The additional properties in the `options` object will be used to construct the URL for the API call:

`https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2018-10-10&api-key=[YOUR_API_KEY]`

Use the NYTimes Books API [documentation](https://developer.nytimes.com/docs/books-product/1/overview) to determine which parameters can be passed.

## How to query for data

### `lists`

```graphql
query {
  allTimesBooksList {
    nodes {
      amazon_product_url
      asterisk
      bestsellers_date
      book_details {
        age_group
        author
        contributor
        contributor_note
        description
        price
        primary_isbn10
        primary_isbn13
        publisher
        title
      }
      dagger
      display_name
      id
      isbns {
        isbn10
        isbn13
      }
      list_name
      published_date
      rank
      rank_last_week
      weeks_on_list
      reviews {
        article_chapter_link
        book_review_link
        first_chapter_link
        sunday_review_link
      }
    }
  }
}

```

### `names-list`

```graphql
query {
  allTimesBooksListName {
    nodes {
      display_name
      list_name
      list_name_encoded
      newest_published_date
      oldest_published_date
      updated
      id
    }
  }
}
```

### `date-list`

```graphql
Explorer
query 
MyQuery
Docs
query {
  allTimesBooksDateList {
    nodes {
      bestsellers_date
      books {
        age_group
        amazon_product_url
        article_chapter_link
        asterisk
        author
        book_image
        book_image_height
        book_image_width
        book_review_link
        book_uri
        buy_links {
          name
          url
        }
        contributor
        contributor_note
        dagger
        description
        first_chapter_link
        isbns {
          isbn10
          isbn13
        }
        price
        primary_isbn10
        primary_isbn13
        publisher
        rank
        rank_last_week
        sunday_review_link
        title
        weeks_on_list
      }
      display_name
      id
      internal {
        content
        contentDigest
        description
        fieldOwners
        ignoreType
        mediaType
        owner
        type
      }
      list_name
      list_name_encoded
      next_published_date
      normal_list_ends_at
      previous_published_date
      published_date
      published_date_description
    }
    totalCount
  }
}
```

### `history`

```graphql

query {
  allTimesBooksBestSellerHistory {
    nodes {
      age_group
      author
      contributor
      contributor_note
      description
      id
      internal {
        content
        contentDigest
        description
        fieldOwners
        ignoreType
        mediaType
        owner
        type
      }
      isbns {
        isbn10
        isbn13
      }
      price
      publisher
      ranks_history {
        asterisk
        bestsellers_date
        dagger
        display_name
        list_name
        primary_isbn10
        primary_isbn13
        published_date
        rank
        weeks_on_list
      }
      reviews {
        article_chapter_link
        book_review_link
        first_chapter_link
        sunday_review_link
      }
      title
    }
  }
}
```

### `overview`

```graphql
query {
  allTimesBooksListOverview {
    nodes {
      bestsellers_date
      id
      internal {
        content
        contentDigest
        description
        fieldOwners
        ignoreType
        mediaType
        owner
        type
      }
      lists {
        display_name
        list_id
        list_image
        list_image_height
        list_image_width
        list_name
        list_name_encoded
        updated
      }
      next_published_date
      previous_published_date
      published_date
      published_date_description
    }
  }
}
```

### `reviews`

```graphql
query MyQuery {
  allTimesBooksReview {
    nodes {
      book_author
      book_title
      byline
      id
      internal {
        content
        contentDigest
        description
        fieldOwners
        ignoreType
        mediaType
        owner
        type
      }
      isbn13
      publication_dt
      summary
      url
      uri
      uuid
    }
  }
}
```

## How to run tests

`npm test`

## How to develop locally
## How to contribute
If you have unanswered questions, would like help with enhancing or debugging the plugin, it is nice to include instructions for people who want to contribute to your plugin.
