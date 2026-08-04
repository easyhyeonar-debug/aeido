# Aeido

> 보이는 것 너머, 본질을 담다

안경/선글라스를 파는 쇼핑몰 aeido의 프론트엔드입니다. 별도 빌드 도구 없이 순수 HTML/CSS/JS로 작성되었습니다.

## 페이지 구성

| 파일 | 설명 |
|---|---|
| `index.html` | 홈 (히어로 배너, lookbook) |
| `products.html` | 상품 목록 |
| `product.html` | 상품 상세 |
| `cart.html` | 장바구니 |
| `mypage.html` | 마이페이지 |

## 폴더 구조

```
├── css/style.css      # 전체 스타일
├── js/
│   ├── data.js         # 목업 상품/카테고리 데이터
│   ├── api.js           # 데이터 접근 레이어 (추후 실 API로 교체 지점)
│   ├── content.js       # 홈 화면 문구(헤드라인, 캡션 등)
│   ├── layout.js        # 공통 헤더/레이아웃 렌더링
│   ├── productArt.js    # 상품 사진이 없을 때 쓰는 라인아트 플레이스홀더
│   └── *.js              # 페이지별 스크립트 (home, products, product, cart, mypage)
└── images/              # 실제 사진을 넣는 폴더 (images/README.md 참고)
```

## 데이터 & API 연동 예정

`js/data.js`의 목업 데이터는 필드명을 Cafe24 Admin(EC) API의 상품 리소스(`product_no`, `product_name`, `price`, `category_no`, `list_image` 등)와 동일하게 맞춰두었습니다. 추후 실제 Cafe24 몰을 연결할 때 `js/api.js`만 실 API 호출로 교체하면 나머지 코드는 그대로 동작하도록 설계되어 있습니다.

## 이미지 교체

`images/` 폴더에 아래 파일명으로 사진을 넣으면 코드를 건드리지 않고 자동 반영됩니다. 사진이 없으면 기본 색상 블록/라인아트로 안전하게 대체됩니다.

- `hero.jpg` — 홈 상단 배너
- `lookbook-1.jpg` ~ `lookbook-4.jpg` — 홈 lookbook 섹션
- `products/{product_no}.jpg` — 상품 사진 (예: `products/1.jpg`, `js/data.js`의 `list_image`도 함께 수정)

문구를 바꾸고 싶다면 `js/content.js`만 수정하면 됩니다.

## 로컬에서 보기

빌드 과정이 없으므로 정적 파일을 바로 열거나 로컬 서버로 띄우면 됩니다.

```bash
# 방법 1: 파일 직접 열기
open index.html

# 방법 2: 로컬 서버 (권장 — API fetch 등에서 CORS 문제 방지)
python3 -m http.server 8000
# http://localhost:8000 접속
```
