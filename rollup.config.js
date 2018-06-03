import typescript from 'rollup-plugin-typescript2';

export default {
  input: './ElasticSwipe.tsx',
  output: {
    name: "ElasticSwipe",
    file: 'ElasticSwipe.js',
    format: 'umd',
  },
  plugins: [typescript()],
}