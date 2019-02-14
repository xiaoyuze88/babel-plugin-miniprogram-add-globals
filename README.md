# babel-plugin-miniprogram-add-globals
帮助微信小程序项目添加全局变量

目前微信小程序虽然有 global 变量可以全局访问，但是并不能像 NodeJS 或者 浏览器那样直接不带前缀的访问全局变量，使用起来非常不方便。

如：

```
// globals.js

global.sayHi = () => console.log('hi');

// pageX.js

sayHi(); // Uncaught ReferenceError: sayHi is not defined
global.sayHi(); // hi

```

通过此插件，会在所有需要的文件顶部添加 global 变量的解构，如：

```
// pageX.js

const { sayHi } = global; // 插件自动插入该行代码

sayHi(); // hi

```

## Usage

1. 在 babel.plugins 配置中添加插件

```
{
	plugins: [
		['miniprogram-add-globals', {
			globals: [
				'babelHelpers',
				'regeneratorRuntime',
				'pify',
			],
			exclude: [
				/\/app\.js/,
				/\/vendor/,
			],
		}],
	]
}

```

2. 将需要的全局变量，在一个文件中加载，并挂载到 global 上，如： 

```
// globals.js

const babelHelpers = require('./vendors/babelHelpers');
const regeneratorRuntime = require('./vendors/regeneratorRuntime');
const pify = require('./vendors/pify');

Object.assign(global, {
	babelHelpers,
	regeneratorRuntime,
	pify,
});
```

3. 在小程序入口文件 app.js 中，加载 globals.js

## 配置

miniprogram-add-globals 接受一个对象作为插件参数，里面接受如下参数

### {String[]} globals 需要解构的全局变量

### {String[]|RegExp[]} exclude 需要排除的文件

### {String[]|RegExp[]} include 需要排除的文件

### {RegExp[]} test 需要排除的文件

exclude/include/test 三个配置的用法同 webpack4 中 loader 的 rules 一致，具体用法可以参考 [webpack4 配置](https://webpack.js.org/configuration/)