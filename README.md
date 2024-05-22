# Ununique Design System Web 🌎

Web, Android App 기반 유통 사업 공통 디자인 시스템 프로젝트입니다.
React.js를 기반으로 디자인 시스템을 따라 UI 컴포넌트를 구현합니다.

## Goals 💡
- Design System 적용한 CDD(Component-Driven Development)
- Storybook 활용한 UI 컴포넌트 문서화

## Updates 📝
- 240522 프로젝트 생성

## Installation 🚀
This project was bootstrapped with [Create React App(CRA)](https://github.com/facebook/create-react-app).

**Node.js 설치 필수**
```
npm install npx -g
npx create-react-app ununique-design-system-web --template typescript
npx -p @storybook/cli sb init
npm i styled-components
```

## Quick Start 🚀

### 1. clone project & install modules
```
git clone https://github.com/LotteRsp/RSP_2.0_DesignSystem.git
npm install
```

### 2-1. start storybook (design components docs)
```
npm run storybook
```
Runs Storybook Docs in the development mode.\
Open [http://localhost:6006](http://localhost:6006) to view Stories in the browser.

### 2-2. start react app (web app)
```
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 3. build
```
npm run build
```
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

