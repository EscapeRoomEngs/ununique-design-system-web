# Ununique Design System Web

Tailwind CSS v4와 Storybook 기반의 React 디자인 시스템 패키지입니다. 시맨틱 토큰과 Red·Orange 브랜드 테마, 접근 가능한 UI 컴포넌트를 제공합니다.

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
      <Button text="계속" property="brand" />
    </Container>
  );
}
```

`react`와 `react-dom`은 peer dependency이므로 사용하는 앱에 React 18.3 이상 또는 React 19가 설치되어 있어야 합니다. 패키지 CSS는 폰트를 포함하지 않아 번들 크기를 작게 유지합니다. 앱의 기본 폰트는 소비자 프로젝트에서 설정하세요.

## 브랜드 테마

색상 scale(`orange.50` 등)은 디자인 시스템 내부 참조값이며 package root API로 제공하지 않습니다. 소비자와 컴포넌트는 `bg-uui-surface-brand`, `text-uui-text-brand`, `border-uui-border-negative`처럼 `uui` 네임스페이스가 붙은 semantic utility만 사용합니다.

`data-uui-theme`는 해당 요소와 그 자식에게 브랜드 semantic token을 적용합니다. 기본값과 `red`는 기존 Red 브랜드이며, `orange`는 Waiting RN 기준 Orange 브랜드입니다. 오류 의미의 `negative` 토큰은 두 테마 모두 Red로 유지됩니다.

React 앱에서는 `ThemeProvider`로 테마 경계를 선언합니다. `theme`을 생략하면 Red 테마가 적용되며, 중첩된 Provider로 화면 일부만 Orange 테마로 전환할 수 있습니다.

```tsx
import { Button, Text, ThemeProvider } from "@escaperoomengs/ununique-design-system-web";

<ThemeProvider theme="orange">
  <Button property="brand" text="웨이팅 시작" />
  <Text usage="body" fontColor="brand">주요 안내</Text>
</ThemeProvider>
```

React Provider를 사용할 수 없는 정적 HTML, 마이크로 프런트엔드 경계, 또는 서버 템플릿에서는 같은 계약의 `data-uui-theme` 속성을 fallback으로 사용합니다. 값은 `red` 또는 `orange`입니다.

```html
<section data-uui-theme="orange">
  <!-- 이 경계 아래의 uui semantic utility가 Orange 브랜드 토큰을 상속합니다. -->
</section>
```

Storybook에서는 상단 toolbar의 `브랜드 테마`에서 `Red` 또는 `Orange`를 선택해 모든 Story를 같은 테마 경계에서 확인할 수 있습니다.

패키지 CSS는 소비자 앱의 전역 CSS와 함께 로드되므로, `uui` prefix를 제거하지 마세요. CSS custom property, theme attribute, semantic utility 모두 이 prefix를 통해 충돌을 방지합니다.

`v<major>.<minor>.<patch>` 태그를 현재 `main` 커밋에 push하면 GitHub Actions가 Changeset으로 버전과 변경 이력을 반영하고, 검증한 뒤 `https://npm.pkg.github.com`으로 배포합니다. 태그 값과 Changeset이 계산한 패키지 버전이 다르면 배포하지 않습니다. 패키지의 visibility와 접근 권한은 GitHub Packages 설정에서 `EscapeRoomEngs` 조직 및 이 저장소에만 부여합니다. 공개 npm registry에는 배포하지 않습니다.

## 버전 관리

Changesets를 사용합니다. 컴포넌트·토큰의 사용자 영향 변경마다 `npm run changeset`을 실행합니다. `patch`는 수정, `minor`는 호환 가능한 추가, `major`는 호환성 파괴 변경입니다. 릴리스 시에는 계산될 버전과 같은 `v<major>.<minor>.<patch>` 태그를 현재 `main`에 push합니다. 버전·변경 이력 반영과 배포는 workflow가 수행하므로 로컬에서 `npm run version-packages`나 `npm publish`를 실행하지 않습니다.

## 검증

```bash
npm run test
npm run build
npm run build-storybook
npm audit --omit=dev --audit-level=high
```
