# Ununique Design System Web 🌎

Web, Android App 기반 유통 사업 공통 디자인 시스템 프로젝트입니다.<br/>
React.js를 기반으로 디자인 시스템을 따라 UI 컴포넌트를 구현합니다.

## Goals 💡

- Design System 적용한 CDD(Component-Driven Development)
- Storybook 활용한 UI 컴포넌트 문서화
- React App의 Atomic Design Patter 구조화
- - (Atomic -> Component -> Template -> Page)

## Updates 📝

- 240522 React with Storybook 프로젝트 생성
- 240626 Storybook - Color Guide 문서화
- 240627 Storybook - Chromatic 연동
- - [디자인 시스템 가이드 문서 (Storybook)](https://667cc5b39b0826f0a57d0da5-ubsrekksct.chromatic.com/)
- - [Chromatic to review published UI components](https://www.chromatic.com/builds?appId=667cc5b39b0826f0a57d0da5)

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

** storybook 실행 시 preset-create-react-app 관련 오류 처리 가이드 **

```
npx -p @storybook/cli sb init
npm install --dev @storybook/preset-create-react-app @storybook/addon-docs
```

[참고 링크](https://velog.io/@velopert/storybook-tips-and-tutorial-conclusion)

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
