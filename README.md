# Ununique Design System Web

React 기반 개인 디자인 시스템 PoC입니다. CRA와 `styled-components`를 제거하고, Vite · Tailwind CSS v4 · Storybook 기반의 배포 가능한 컴포넌트 패키지로 구성합니다.

## 개발

Node.js 22.22.2 이상이 필요합니다.

```bash
npm install
npm run dev
npm run storybook
```

`npm run build`는 배포용 ESM/CJS 번들, 타입 선언 파일, `styles.css`를 `dist/`에 생성합니다. 데모 앱 정적 빌드는 `npm run build:demo`입니다.

## 패키지 사용

조직 전용 GitHub Packages로 배포한 뒤에는 소비자 저장소의 `.npmrc`에 registry를 연결합니다.

```ini
@escaperoomengs:registry=https://npm.pkg.github.com
```

GitHub personal access token 또는 GitHub Actions token에 해당 패키지의 `read:packages` 권한을 부여한 뒤 설치합니다.

```bash
npm install @escaperoomengs/ununique-design-system-web
```

```tsx
import { Button, Container, Title } from "@escaperoomengs/ununique-design-system-web";
import "@escaperoomengs/ununique-design-system-web/styles.css";

export function Example() {
  return (
    <Container display="flex" direction="column" spacing={16}>
      <Title>주문 확인</Title>
      <Button text="계속" property="contained" />
    </Container>
  );
}
```

`react`와 `react-dom`은 peer dependency이므로 사용하는 앱에 React 18.3 이상 또는 React 19가 설치되어 있어야 합니다. 패키지 CSS는 폰트를 포함하지 않아 번들 크기를 작게 유지합니다. 앱의 기본 폰트는 소비자 프로젝트에서 설정하세요.

`npm run release:package`는 `https://npm.pkg.github.com`으로 배포합니다. 패키지의 visibility와 접근 권한은 GitHub Packages 설정에서 `EscapeRoomEngs` 조직 및 이 저장소에만 부여합니다. 공개 npm registry에는 배포하지 않습니다.

## 버전 관리

Changesets를 사용합니다. 컴포넌트·토큰의 사용자 영향 변경마다 `npm run changeset`을 실행하고, 배포할 때 `npm run version-packages`로 버전과 변경 이력을 갱신합니다. `patch`는 수정, `minor`는 호환 가능한 추가, `major`는 호환성 파괴 변경입니다. 이번 현대화는 첫 패키지 릴리스로 v1.0.0 메이저 변경으로 기록합니다.

## 검증

```bash
npm run test
npm run build
npm run build-storybook
npm audit --omit=dev --audit-level=high
```
