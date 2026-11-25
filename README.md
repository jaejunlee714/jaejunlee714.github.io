# jaejunlee714.github.io

Editorial Minimal + Interactive Knowledge Graph 기반 개인 연구자 홈페이지입니다.
Ruby/Jekyll 빌드 없이 순수 정적 다중 페이지 구조(`/`, `/publications/`, `/cv/`)로 동작합니다.

## 단일 수정 구조 (Single Source of Truth)

- 프로필, 소속, 이메일, 소셜 링크, 논문, 학력, 튜토리얼, 리뷰어 이력은 모두 `assets/js/data.js` 한 파일에서 관리됩니다.
- Publications 페이지의 학회 필터 탭(`ICML`, `KDD`, `EMNLP`, `IEEE RA-L` 등)은 `data.js`의 `publications` 내 `venueGroup` 값을 읽어 논문 편수 순으로 자동 생성됩니다.
- 검색 엔진용 `<meta name="description">`만 각 HTML `<head>`에 정적으로 남아 있으며, 소속 변경 등 큰 변화가 있을 때만 선택적으로 수정하면 됩니다.

## 폴더 구조

```text
.
├── .nojekyll
├── index.html                     # About + Selected Publications
├── publications/index.html        # All Publications + 자동 학회 필터·검색·BibTeX
├── cv/index.html                  # CV (Basics, Education, Publications, Tutorials, Peer Review)
└── assets/
    ├── css/style.css              # 라이트/다크 테마 및 레이아웃 스타일
    ├── js/data.js                 # 모든 콘텐츠 데이터 (평소 이 파일만 수정)
    ├── js/main.js                 # 공통 내비게이션, 그래프 캔버스, 페이지 렌더러
    ├── img/profile_jj.jpg         # (기존 파일 유지)
    ├── img/publication_preview/   # (기존 논문 썸네일 유지)
    └── pdf/cv.pdf                 # (기존 CV PDF 유지)
```
