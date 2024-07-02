# Ununique Design System Web 🌎

Web, Android App 기반 유통 사업 공통 디자인 시스템 프로젝트입니다.<br/>
React with Typescript 기반으로 디자인 시스템을 따라 UI 컴포넌트를 구현합니다.

## Goals 💡

- Atomic Design Pattern React App 구현<br />
  (Foundation -> Atomic -> Component -> Template -> Page)
- Design System 적용한 컴포넌트 주도 개발 (Component-Driven Development)
- Storybook 활용한 UI Component 문서화

## Updates 📝

- 240522 React with Storybook 프로젝트 생성
- 240626 Storybook - Color Guide 문서화
- 240627 Storybook - Chromatic 연동
- - [Component Guide Docs (Storybook)](https://667cc5b39b0826f0a57d0da5-ubsrekksct.chromatic.com/)
- - [Chromatic to review published UI components](https://www.chromatic.com/builds?appId=667cc5b39b0826f0a57d0da5)

## Folder Structure 📁

```
src/

+-- assets/
|   +-- font/
|   +-- icon/ (.svg files for icon)
|   +-- background/

+-- foundation/ (definitions of design attributes and values)
|   +-- layout.ts : align, padding, margin, corner radius
|   +-- color.ts : color palette, color theme (surface/text/border/icon/divider)
|   +-- icon.ts : icon size, icon name
|   +-- spacing.ts : spacing sizes (px)
|   +-- typography.ts : font size, font weight, line height

+-- atom/ (default & smallest UI Component)
|   +-- Container.tsx (body container for aligning with grid or flex)
|   +-- Text.tsx (Display, Heading, Title, Body, Lable)
|   +-- Input.tsx (Text Field, Dropdown, Radio, Checkbox...)
|   +-- Icon.tsx

+-- component/ (reusable UI Components having atoms combined)
|   +-- Button.tsx
|   +-- Toggle.tsx
|   +-- Tab.tsx
|   +-- ListItem.tsx
|   +-- CardItem.tsx

+-- template/ (UI Componets for specific context)
|   +-- main
|   |   +-- CardSlider.tsx
|   |   +-- RankList.tsx
|   +-- product
|   |   +-- ProductInfo.tsx
|   |   +-- ProductIngredient.tsx
|   |   +-- OptionList.tsx
|   +-- order
|   |   +-- OrderForm.tsx

+-- pages/
|   +-- myorder
|   |   +-- MyOrderDetail.tsx
|   |   +-- MyOrderList.tsx
.
.
.
```

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
