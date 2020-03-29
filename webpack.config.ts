import * as Dotenv from "dotenv"
import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as HtmlWebpackHarddiskPlugin from "html-webpack-harddisk-plugin"
import * as MiniCssExtractPlugin from "mini-css-extract-plugin"
import * as path from "path"
import * as webpack from "webpack"
import * as serialize from "serialize-javascript"

Dotenv.config()

const mode = process.env.NODE_ENV === "production"
? "production" : "development"
const devtool: webpack.Options.Devtool = "source-map"
const distDir = path.resolve(__dirname, "dist")
const distClientDir = path.join(distDir, "client")
const srcDir = path.resolve(__dirname, "src")
const baseModule: webpack.Module = {
	rules: [
		{
			exclude: /node_modules/,
			loader: "ts-loader",
			test: /\.tsx?$/
		}
	]
}
const resolve: webpack.Resolve = {
	alias: {
		"client": path.join(srcDir, "client"),
		"env": path.join(srcDir, "env.ts"),
		"server": path.join(srcDir, "server"),
		"models": path.join(srcDir, "models"),
		"pg-native": path.join(__dirname, "aliases/pg-native.js"),
	},
	extensions: [".js", ".jsx", ".ts", ".tsx"]
}

const clientModule: webpack.Module = { ...baseModule }
clientModule.rules.push({
	use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
	test: /\.(css|sass|scss)$/
})

const clientConfig: webpack.Configuration = {
	context: srcDir,
	devServer: {
		contentBase: distClientDir,
		historyApiFallback: true,
		port: process.env.PORT ? parseInt(process.env.PORT) : undefined,
		watchContentBase: true
	},
	devtool,
	entry: "./client/index.tsx",
	mode,
	module: clientModule,
	output: {
		filename: "js/index.js",
		path: distClientDir,
		libraryTarget: "umd"
	},
	plugins: [
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			inject: "head",
			template: path.join(srcDir, "client", "static", "index.ejs"),
			templateParameters: {
				__env__: serialize({
					WS_HOST: process.env.WS_HOST,
					WS_PORT: process.env.WS_PORT
				})
			},
			xhtml: true
		}),
		new HtmlWebpackHarddiskPlugin(),
		new MiniCssExtractPlugin({ filename: "css/[name].css" })
	],
	resolve
}

const serverConfig: webpack.Configuration = {
	context: srcDir,
	devtool,
	entry: "./server/index.ts",
	externals: {
		express: "express",
		ws: "ws"
	},
	module: baseModule,
	mode,
	output: {
		filename: "index.js",
		path: path.join(distDir, "server"),
		libraryTarget: "commonjs2"
	},
	resolve,
	target: "node",
	node: {
		__dirname: false,
		__filename: false
	}
}

export default [
	clientConfig,
	serverConfig
]
