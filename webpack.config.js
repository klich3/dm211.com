const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const util = require('util');
const glob = require('glob');
const commonConfig = require('@vue/cli-service/webpack.config');
const fromRoot = (filepath = '') => path.resolve(__dirname, filepath);

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin'); //clean un used css
const HtmlWebpackPlugin = require('html-webpack-plugin'); //inyecting to static file
const CompressionPlugin = require('compression-webpack-plugin'); //gz compress
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin"); //convert to webp

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { DuplicatesPlugin } = require("inspectpack/plugin"); 

let productionConfig = {
	mode: 'production',
	optimization: {
		runtimeChunk: true,
		minimize: true,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					name: 'vendors',
					test: '/[\\/]node_modules[\\/]/',
					chunks: 'all',
					priority: -10,
					enforce: true,
					reuseExistingChunk: true,
					maxSize: 550000,
					minSize: 250000,
				},
				common: {
					name: 'common',
					test: '/[\\/]node_modules[\\/]/',
					minChunks: 2,
					priority: -20,
					//chunks: 'initial',
					chunks: 'all',
					reuseExistingChunk: true,
					maxSize: 550000,
					minSize: 250000,
				}
			}
		},
		minimizer: [
			new TerserPlugin({
				 test: /\.js(\?.*)?$/i,
				 cache: path.resolve(__dirname, 'node_modules/.cache/uglify/'),
				 parallel: true,
				 sourceMap: false,
				 extractComments: 'all'
			})
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: 'src/assets/js/[name].[hash:4].js',
		publicPath: '/',
		chunkFilename: 'src/assets/js/[name].[hash:4].js'
	},
	module: {
 		rules:[
			/*
			//images
			{
				test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 4096,
						fallback: {
							loader: 'file-loader',
							options: {
								name: 'src/assets/images/[name].[ext]'
							}
						}
					}
				}]
			},
			{
				test: /\.(svg)(\?.*)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: 'src/assets/images/[name].[hash:8].[ext]'
					}
				}]
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 4096,
						fallback: {
							loader: 'file-loader',
							options: {
								name: 'content/[name].[hash:8].[ext]'
							}
						}
					}
				}]
			},
			*/
			
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 4096,
						fallback: {
							loader: 'file-loader',
							options: {
								name: 'src/assets/fonts/[name].[ext]'
							}
						}
					}
				}]
			},
			
			//js
			{
				test: /\.js$/,
				use: ['cache-loader', 'babel-loader'],
				include: path.resolve(__dirname, 'src/'),
			}
		]
	},
	plugins: [
		/*
			loader de componentes que solo usamos en el proyecto.
		*/
		//new VuetifyLoaderPlugin(),
		
		/*
			lipiamos la antigua compilacion
			https://github.com/johnagan/clean-webpack-plugin
		*/
		new CleanWebpackPlugin(),
		
		/*
			minimizamos scripts
			webpack < 4 > 4 depricated
		*/
		/*
	    new webpackUglifyJsPlugin({
 			cacheFolder: path.resolve(__dirname, 'node_modules/.cache/uglify/'),
 			debug: false,
 			minimize: true,
 			sourceMap: false,
 			output: {
 				comments: false
 			},
 			compressor: {
 				warnings: false
 			}
 		}),
 		*/
 		
 		/*
	 		reduccion de css
 		*/
 		/*
 		new PurgecssPlugin({
			paths: glob.sync(`src/ * * / *`,  { nodir: true }),
			only: ['bundle', 'vendor'],
			//whitelist: [ // Only if you need it!
		    //    'pr3','pv2','ph3',
		    //    'mb1',
		    //    'input',
		    //    'tracked-mega'
		    //  ],
		}),
 		*/
 		
 		/*
	 		template donde inyectamos contenido
		*/
		new HtmlWebpackPlugin({
  			template: path.resolve(__dirname, 'static/index.html'),
  			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				collapseBooleanAttributes: true,
				removeScriptTypeAttributes: true
			},
  			inject: true
  		}),
  		
  		/*
			creamos gzip static files compresion
			acceleramos la carga
		*/
  		new CompressionPlugin({
			test: /\.(js|css|html)$/,
			cache: true,
			filename: '[path].gz[query]',
			algorithm: 'gzip'
		}),
		
		/*
			creamos botli static files compresion
			acceleramos la carga
		*/
		new CompressionPlugin({
			test: /\.(js|css|html)$/,
			cache: true,
			filename: '[path].br[query]',
			algorithm: 'brotliCompress',
			compressionOptions: { level: 11 },
			threshold: 10240,
			minRatio: 0.8,
			deleteOriginalAssets: false
		}),
		
		/* 
			compress images to webp
		*/
		new ImageminWebpWebpackPlugin({
			config: [{
				test: /\.(jpe?g|png)/,
					options: {
						quality:  80
					}
			}],
			overrideExtension: true,
			detailedLogs: false,
			silent: true,
			strict: true
		}),
		
		/*
			creamos hashesh de 4 digitos en vez de identificar num segun array
			optimizamos tiempo de compilacion
		*/
		new webpack.HashedModuleIdsPlugin({
			hashFunction: 'md4',
			hashDigest: 'base64',
			hashDigestLength: 4
		}),
		
		/*
			otro optimizador compresor de scripts
			crea cache, recorta solo el codigo que es necesario para su
			ejecucion
			
			https://github.com/mzgoddard/hard-source-webpack-plugin
		*/
		new HardSourceWebpackPlugin(),
		
		/*
			checker dublicated bundles
		*/
		new DuplicatesPlugin({
			verbose: true
		}),
	]
};

//------ Export -> app

module.exports = mode => {
	if (mode === "production")
	{
		const isAnalyze = typeof process.env.BUNDLE_ANALYZE !== "undefined";
		
		if (isAnalyze)
		{
			productionConfig.plugins.push(new BundleAnalyzerPlugin({
				analyzerMode: 'static',
			    generateStatsFile: true,
			    statsOptions: { source: false }
			}));
			productionConfig.plugins.push(new Visualizer({
				filename: 'visualizer-statistics.html'
			}));
		}
		
		return merge(commonConfig, productionConfig, { mode });
	}
}