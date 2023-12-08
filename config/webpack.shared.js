const path = require('node:path')

const FastGlob = require('fast-glob')
const AssetsManifestPlugin = require('webpack-assets-manifest')

function selectEnv(env) {
  return ['development', 'production', 'test'].includes(env) ? env : 'development'
}

module.exports = function () {
  const pkgPath = path.join(__dirname, '..')
  const srcPath = path.join(pkgPath, 'src')
  const distPath = path.join(pkgPath, 'dist/webpack')

  const appEnv = selectEnv(process.env.NODE_ENV)

  function getEntries() {
    const entries = {}

    const globs = FastGlob.sync('**/*.entry.*', {cwd: srcPath})
    globs.forEach(filePath => {
      const fileName = path.basename(filePath)
      const [entryName] = fileName.split('.entry.')
      entries[entryName] = filePath
    })

    return entries
  }

  return {
    devtool: 'source-map',
    entry: getEntries(),
    mode: 'none',

    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|ts)$/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },

        {
          exclude: /node_modules/,
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader?limit=10000&name=img/[hash:12]/[ext]',
            },
          ],
        },
      ],
    },

    optimization: {
      minimize: appEnv === 'production',

      splitChunks: {
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },

          defaultVendors: {
            priority: -10,
            reuseExistingChunk: true,
            test: /[\\/]node_modules[\\/]/,
          },
        },

        chunks: 'all',
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        maxSize: 200000,
        minChunks: 1,
        minSize: 30000,

        name(module, chunks, cacheGroupKey) {
          const moduleFileName = module
            .identifier()
            .split('/')
            .reduceRight(part => part)

          const allChunksNames = chunks.map(chunk => chunk.name).join('~')
          return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`
        },
      },

      usedExports: true,
    },

    output: {
      path: distPath,
      publicPath: '/',
    },

    plugins: [
      new AssetsManifestPlugin({
        entrypoints: true,
        output: 'assets.json',
      }),
    ],

    resolve: {
      extensions: ['.js', '.ts'],
      modules: [srcPath, 'node_modules'],
    },

    stats: {
      colors: true,
    },
  }
}