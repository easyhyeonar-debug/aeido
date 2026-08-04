# images 폴더

여기에 아래 파일명으로 사진을 넣으면 코드를 건드리지 않고 자동으로 반영됩니다. (파일이 없으면 안전하게 기본 색상 블록으로 대체됩니다.)

- `hero.jpg` — 홈 상단 큰 배너 사진
- `lookbook-1.jpg` ~ `lookbook-4.jpg` — 홈 lookbook 섹션 4장
- `products/{product_no}.jpg` — 상품 사진 (예: `products/1.jpg`). 이 경로를 넣은 다음 `js/data.js`에서 해당 상품의 `list_image` 값을 `"images/products/1.jpg"` 로 바꿔주면 라인 아트 대신 실제 사진이 표시됩니다.

문구(헤드라인, our vision 설명, lookbook 캡션)를 바꾸고 싶으면 `js/content.js` 파일의 텍스트만 수정하면 됩니다.
