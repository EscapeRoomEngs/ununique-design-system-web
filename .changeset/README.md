# Changesets

사용자에게 영향을 주는 변경을 추가할 때 `npm run changeset`을 실행합니다.

- `patch`: 버그 수정, 내부 구현 개선
- `minor`: 이전 버전과 호환되는 컴포넌트·토큰 추가
- `major`: prop 제거·의미 변경 등 호환성 파괴 변경

누적된 changeset은 `npm run version-packages`로 `package.json` 버전과 `CHANGELOG.md`에 반영합니다. 이 저장소는 `@escaperoomengs/ununique-design-system-web`을 GitHub Packages로만 배포하며, 패키지 접근 권한은 `EscapeRoomEngs` 조직과 연결 저장소에서 관리합니다.
