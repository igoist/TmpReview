import { IConfig } from 'umi-types';
import path from 'path';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'TmpReview',
        dll: false,

        routes: {
          exclude: [/models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/, /components\//],
        },
      },
    ],
  ],
  // proxy: {
  //   '/api': {
  //     target: 'http://event64.huaban.com/',
  //     changeOrigin: true,
  //     pathRewrite: { '': '' },
  //   },
  // },
  alias: {
    '@Components': path.resolve(__dirname, 'src/components'),
    '@Services': path.resolve(__dirname, 'src/services'),
    '@Utils': path.resolve(__dirname, 'src/utils'),
  },
  outputPath: 'dist/audit/',
  publicPath: '/audit/',
};

export default config;
