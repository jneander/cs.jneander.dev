const configureApp = require('@jneander/dev-tools/configuration/configureApp')
const {getEnv} = require('@jneander/dev-tools/utils/cli')

module.exports = configureApp({
  env: getEnv(),
  pages: [
    {
      context: 'data-grids',
      outputPath: 'data-grids',
      pages: [
        {
          name: 'data-grid',
          outputPath: 'data-grid',
          sourcePath: 'data-grid'
        },
        {
          name: 'static-grid',
          outputPath: 'static-grid',
          sourcePath: 'static-grid'
        },
        {
          name: 'wai-data-grid',
          outputPath: 'wai-data-grid',
          sourcePath: 'wai-data-grid'
        }
      ],
      sourcePath: 'data-grids',
      template: 'shared/markup/index.html'
    },
    {
      name: 'genetic-algorithms',
      outputPath: 'genetic-algorithms',
      sourcePath: 'genetic-algorithms',
      template: 'shared/markup/index.html'
    },
    {
      name: 'home',
      outputPath: '',
      sourcePath: 'home',
      template: 'shared/markup/index.html'
    }
  ]
})
