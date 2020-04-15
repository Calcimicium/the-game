import * as CopyWebpackPlugin from "copy-webpack-plugin"
import * as Dotenv from "dotenv"
import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as MiniCssExtractPlugin from "mini-css-extract-plugin"
import * as path from "path"
import * as webpack from "webpack"

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
		"domains": path.join(srcDir, "domains"),
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
		publicPath: "/",
		libraryTarget: "umd"
	},
	plugins: [
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			inject: "head",
			template: path.join(srcDir, "client", "static", "index.html"),
			xhtml: true
		}),
		new MiniCssExtractPlugin({ filename: "css/[name].css" })
	],
	resolve
}

const distServerDir = path.join(distDir, "server")
const srcServerDir = path.join(srcDir, "server")
const serverModule: webpack.Module = { ...baseModule }
baseModule.rules.push({
	use: "file-loader",
	test: /\.sql$/
})

const serverConfig: webpack.Configuration = {
	context: srcDir,
	devtool,
	entry: {
		serve: "./server/index.ts",
		migrate: "./server/migrate.ts"
	},
	externals: {
		express: "express",
		ws: "ws"
	},
	module: serverModule,
	mode,
	output: {
		filename: "[name].js",
		path: path.join(distDir, "server"),
		libraryTarget: "commonjs2"
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: path.join(srcServerDir, "migrations"),
				to: path.join(distServerDir, "migrations")
			}
		])
	],
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
