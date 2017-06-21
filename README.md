# RN-Gank

## 简介(Introduce)

RN-Gank 是使用 React Native 完成的 APP，感谢 [http://gank.io](http://gank.io) 提供 API。

**支持: Android 4.1 (API 16)+   IOS(8.0+)**

## 截图(Screenshots)

### iOS

![Android](./RNGank/assets/screenshots/Android.png)
![iOS](./RNGank/assets/screenshots/iOS.png)
![福利](./RNGank/assets/screenshots/welfare.png)

### Android

![Android](./RNGank/assets/screenshots/Android1.png)
![iOS](./RNGank/assets/screenshots/iOS1.png)
![福利](./RNGank/assets/screenshots/welfare1.png)

## 技术栈(Technology Stack)

-   [React Native](https://github.com/facebook/react-native) 跨平台构建 Android 和 iOS 应用
-   [React Navigation](https://github.com/react-community/react-navigation) 轻松实现 React Native 应用的流畅导航
-   [Redux](https://github.com/reactjs/redux) 状态管理，搭配 [React Navigation](https://github.com/react-community/react-navigation) 使用
-   [Standard](https://github.com/feross/standard) 便捷的代码风格管理
-   [Immutable](https://github.com/facebook/immutable-js) 不可变对象

## 开发流程(Development Workflow)

### 环境配置(Setup)

首先确保 [React Native](https://github.com/facebook/react-native) 环境配置成功

### 步骤(Step)
-   依赖
```
npm install && npm install immutable
```
-   代码检查
```
npm run lint
```
-   代码格式化
```
npm run fix
```
-   运行iOS
```
react-native run-ios
```
-   运行Android
```
react-native run-android
```
