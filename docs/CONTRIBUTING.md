# Contributing to Gatsby Source NYTimes Books API Plugin
This is an open source project started and maintained by [Yuraima Estevez](https://www.yuraima.com).  Issues and Pull Requests are always welcome!

## Filing Issues
Feel free to open issues for bugs, feature requests, and general questions.

1. What version of node.js/npm are you using (`node --version` and `npm --version`) ?
2. What version of Gatsby.js are you using (`gatsby --version`)
2. What did you expect to see?
3. What did you see instead?

## Contributing code
Pull requests are very welcome! Before submitting changes, please follow these guidelines:

- Check the open issues and pull requests for existing discussions.
- Open an issue to discuss a new feature.
- Write/run tests and lint your code.
- Open a Pull Request.

## License
Unless otherwise noted, the `gatsby-source-nytimes-books-api` source files are distributed under the Apache 2.0-style license found in the LICENSE file.

## Local Development

### Installation
Clone the repo in the `plugins` folder of an existing Gatsby project, as is documented in the Gatsby [docs](https://www.gatsbyjs.org/docs/creating-a-local-plugin/) for developing a plugin locally

```bash
$  cd your-gatsby-project-directory
$  mkdir plugins
$  cd plugins
$  git clone https://github.com/yurm04/gatsby-source-nytimes-books-api
$  cd gatsby-source-nytimes-books-api
$  npm install
```

### Setup
To set up the plugin in your Gatsby project you will have to add it to your project's `gatsby-config.js`.  Check out the [README](../README.md#how-to-use) for details on what properties to include.  Once you include the plugin, you can run Gatsby locally and you should be able to query data:

```
gatsby develop
```

#### Validating Locally
To validate changes made locally, make sure you are querying and receiving the data you expect.  Refer to the [README](../README.md#how-to-query-for-data) to find out what is queryable.

#### Tests and Linting
This project uses the git hooks via the [`husky`](https://github.com/typicode/husky/tree/v0.14.3) package to run tests and lint code before each commit.  When making changes to the codebase please make sure to lint and write tests against your work.

#### How to run tests

`npm test`
