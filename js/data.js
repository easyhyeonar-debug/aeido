/*
  data.js
  ------------------------------------------------------------------
  Mock data for aeido. Field names intentionally mirror the shape of
  Cafe24's Admin(EC) API product resource (product_no, product_name,
  price, category_no, quantity, list_image, ...) so that later, when
  a real Cafe24 mall is connected, api.js can be pointed at the real
  endpoints without changing how the rest of the site reads product
  data.

  See api.js for where this file gets swapped out for real API calls.
------------------------------------------------------------------ */

const CATEGORIES = [
  { category_no: 1, category_name: "안경", slug: "glasses" },
  { category_no: 2, category_name: "선글라스", slug: "sunglasses" },
];

/*
  shape_key selects which placeholder line-art (see productArt.js)
  is drawn for a product until real photography is uploaded.
  Swap real photos in later by filling `list_image` / `images` with
  file paths (e.g. "images/products/round-01.jpg") — product.js and
  home.js already prefer a real image over the placeholder art when
  list_image is set.
*/
const PRODUCTS = [
  {
    product_no: 1,
    product_name: "Round frame 01",
    category_no: 1,
    shape_key: "round",
    price: 158000,
    quantity: 12,
    material: "ACETATE",
    weight: "18g",
    size: "143 x 48mm",
    summary_description:
      "불필요한 요소를 덜어낸 원형 프레임. 가벼운 아세테이트 소재로 하루종일 부담 없이 착용할 수 있습니다.",
    options: { lens_color: ["Clear", "Gray", "Brown"] },
    list_image: "",
    images: [],
    detail_shots: [
      { caption: "브릿지 & 코받침", shape_key: "bridge" },
      { caption: "템플 팁", shape_key: "tip" },
      { caption: "림 라인", shape_key: "rim" },
    ],
  },
  {
    product_no: 2,
    product_name: "Square frame 02",
    category_no: 1,
    shape_key: "square",
    price: 172000,
    quantity: 7,
    material: "TITANIUM",
    weight: "16g",
    size: "140 x 46mm",
    summary_description:
      "각진 라인으로 또렷한 인상을 주는 스퀘어 프레임. 티타늄 소재로 가볍고 내구성이 좋습니다.",
    options: { lens_color: ["Clear", "Gray"] },
    list_image: "",
    images: [],
    detail_shots: [
      { caption: "브릿지 & 코받침", shape_key: "bridge" },
      { caption: "템플 팁", shape_key: "tip" },
      { caption: "림 라인", shape_key: "rim" },
    ],
  },
  {
    product_no: 3,
    product_name: "Oval 03",
    category_no: 1,
    shape_key: "oval",
    price: 149000,
    quantity: 20,
    material: "ACETATE",
    weight: "17g",
    size: "141 x 45mm",
    summary_description:
      "부드러운 곡선의 오벌 프레임. 어떤 얼굴형에도 무난하게 어울립니다.",
    options: { lens_color: ["Clear", "Brown"] },
    list_image: "",
    images: [],
    detail_shots: [
      { caption: "브릿지 & 코받침", shape_key: "bridge" },
      { caption: "템플 팁", shape_key: "tip" },
      { caption: "림 라인", shape_key: "rim" },
    ],
  },
  {
    product_no: 4,
    product_name: "Rectangle 04",
    category_no: 1,
    shape_key: "rectangle",
    price: 165000,
    quantity: 0,
    material: "ACETATE",
    weight: "19g",
    size: "144 x 47mm",
    summary_description:
      "슬림한 직사각 프레임. 클래식한 인상을 주는 매일 쓰기 좋은 안경입니다.",
    options: { lens_color: ["Clear", "Gray"] },
    list_image: "",
    images: [],
    detail_shots: [
      { caption: "브릿지 & 코받침", shape_key: "bridge" },
      { caption: "템플 팁", shape_key: "tip" },
      { caption: "림 라인", shape_key: "rim" },
    ],
  },
  {
    product_no: 5,
    product_name: "Browline 05",
    category_no: 1,
    shape_key: "browline",
    price: 168000,
    quantity: 9,
    material: "ACETATE + METAL",
    weight: "20g",
    size: "142 x 46mm",
    summary_description:
      "상단 브로우라인이 강조된 하프림 프레임. 캐주얼과 포멀 어디에도 잘 어울립니다.",
    options: { lens_color: ["Clear"] },
    list_image: "",
    images: [],
    detail_shots: [
      { caption: "브릿지 & 코받침", shape_key: "bridge" },
      { caption: "템플 팁", shape_key: "tip" },
      { caption: "림 라인", shape_key: "rim" },
    ],
  },
  {
    product_no: 6,
    product_name: "Sun — Shade 01",
    category_no: 2,
    shape_key: "round",
    tinted: true,
    price: 189000,
    quantity: 14,
    material: "ACETATE",
    weight: "22g",
    size: "145 x 49mm",
    summary_description: "은은한 그라데이션 렌즈의 라운드 선글라스.",
    options: { lens_color: ["Black", "Brown"] },
    list_image: "",
    images: [],
    detail_shots: [
      { caption: "브릿지 & 코받침", shape_key: "bridge" },
      { caption: "템플 팁", shape_key: "tip" },
      { caption: "림 라인", shape_key: "rim" },
    ],
  },
  {
    product_no: 7,
    product_name: "Sun — Shade 02",
    category_no: 2,
    shape_key: "square",
    tinted: true,
    price: 179000,
    quantity: 11,
    material: "TITANIUM",
    weight: "21g",
    size: "144 x 48mm",
    summary_description: "각진 실루엣의 스퀘어 선글라스. 진한 렌즈로 강한 인상을 줍니다.",
    options: { lens_color: ["Black"] },
    list_image: "",
    images: [],
    detail_shots: [
      { caption: "브릿지 & 코받침", shape_key: "bridge" },
      { caption: "템플 팁", shape_key: "tip" },
      { caption: "림 라인", shape_key: "rim" },
    ],
  },
  {
    product_no: 8,
    product_name: "Oval 06",
    category_no: 2,
    shape_key: "oval",
    tinted: true,
    price: 155000,
    quantity: 3,
    material: "ACETATE",
    weight: "20g",
    size: "142 x 47mm",
    summary_description: "부드러운 오벌 라인의 선글라스. 편안한 착용감이 특징입니다.",
    options: { lens_color: ["Brown", "Gray"] },
    list_image: "",
    images: [],
    detail_shots: [
      { caption: "브릿지 & 코받침", shape_key: "bridge" },
      { caption: "템플 팁", shape_key: "tip" },
      { caption: "림 라인", shape_key: "rim" },
    ],
  },
];

/*
  LOOKBOOK — editorial "stories" shown on lookbook.html and each one's
  own lookbook-detail.html?id=<id> page. `category_no` tells the detail
  page which products to show under "Shop the look" (null = a general
  mix, same as the home page's Selected grid). `photos` is the
  magazine-style spread on the detail page — "full" spans the full
  width, "half" pairs two photos side by side.

  Like the product photos, `cover_image` / each photo's `image` quietly
  fall back to a solid color block (`tone`) until real photography is
  dropped into images/lookbook/ using these filenames.
*/
const LOOKBOOK = [
  {
    id: "2026-collection",
    label: "2026 Collection",
    tone: "tone-dark1",
    cover_image: "images/lookbook/2026-collection-cover.jpg",
    category_no: null,
    description:
      "새로운 계절, 새로운 원형. 2026년 aeido가 제안하는 실루엣과 소재를 한 화보에 담았습니다.",
    photos: [
      { image: "images/lookbook/2026-collection-1.jpg", tone: "tone-dark1", size: "full" },
      { image: "images/lookbook/2026-collection-2.jpg", tone: "tone-dark2", size: "half" },
      { image: "images/lookbook/2026-collection-3.jpg", tone: "tone-light1", size: "half" },
      { image: "images/lookbook/2026-collection-4.jpg", tone: "tone-dark3", size: "full" },
      { image: "images/lookbook/2026-collection-5.jpg", tone: "tone-dark1", size: "half" },
      { image: "images/lookbook/2026-collection-6.jpg", tone: "tone-dark2", size: "half" },
    ],
  },
  {
    id: "bestseller",
    label: "Bestseller",
    tone: "tone-dark2",
    cover_image: "images/lookbook/bestseller-cover.jpg",
    category_no: null,
    description: "가장 많이 사랑받은 프레임들. 이유가 있는 스테디셀러를 모았습니다.",
    photos: [
      { image: "images/lookbook/bestseller-1.jpg", tone: "tone-dark2", size: "full" },
      { image: "images/lookbook/bestseller-2.jpg", tone: "tone-light1", size: "half" },
      { image: "images/lookbook/bestseller-3.jpg", tone: "tone-dark1", size: "half" },
      { image: "images/lookbook/bestseller-4.jpg", tone: "tone-dark3", size: "full" },
      { image: "images/lookbook/bestseller-5.jpg", tone: "tone-dark2", size: "half" },
      { image: "images/lookbook/bestseller-6.jpg", tone: "tone-light1", size: "half" },
    ],
  },
  {
    id: "sunglasses-story",
    label: "Sunglasses",
    tone: "tone-dark3",
    cover_image: "images/lookbook/sunglasses-cover.jpg",
    category_no: 2,
    description: "강한 볕 아래에서 더 선명해지는 표정. aeido 선글라스 컬렉션.",
    photos: [
      { image: "images/lookbook/sunglasses-1.jpg", tone: "tone-dark3", size: "full" },
      { image: "images/lookbook/sunglasses-2.jpg", tone: "tone-dark1", size: "half" },
      { image: "images/lookbook/sunglasses-3.jpg", tone: "tone-dark2", size: "half" },
      { image: "images/lookbook/sunglasses-4.jpg", tone: "tone-light1", size: "full" },
      { image: "images/lookbook/sunglasses-5.jpg", tone: "tone-dark3", size: "half" },
      { image: "images/lookbook/sunglasses-6.jpg", tone: "tone-dark1", size: "half" },
    ],
  },
  {
    id: "glasses-story",
    label: "Glasses",
    tone: "tone-light1",
    cover_image: "images/lookbook/glasses-cover.jpg",
    category_no: 1,
    description: "매일 쓰는 얼굴의 일부. 가볍고 단단한 데일리 안경 컬렉션.",
    photos: [
      { image: "images/lookbook/glasses-1.jpg", tone: "tone-light1", size: "full" },
      { image: "images/lookbook/glasses-2.jpg", tone: "tone-dark2", size: "half" },
      { image: "images/lookbook/glasses-3.jpg", tone: "tone-dark3", size: "half" },
      { image: "images/lookbook/glasses-4.jpg", tone: "tone-dark1", size: "full" },
      { image: "images/lookbook/glasses-5.jpg", tone: "tone-light1", size: "half" },
      { image: "images/lookbook/glasses-6.jpg", tone: "tone-dark2", size: "half" },
    ],
  },
  {
    id: "studio-session",
    label: "Studio Session",
    tone: "tone-dark3",
    cover_image: "images/lookbook/studio-session-cover.jpg",
    category_no: 1,
    description: "군더더기 없는 스튜디오 조명 아래, 안경 하나하나의 라인을 담았습니다.",
    photos: [
      { image: "images/lookbook/studio-session-1.jpg", tone: "tone-dark3", size: "full" },
      { image: "images/lookbook/studio-session-2.jpg", tone: "tone-light1", size: "half" },
      { image: "images/lookbook/studio-session-3.jpg", tone: "tone-dark2", size: "half" },
      { image: "images/lookbook/studio-session-4.jpg", tone: "tone-dark1", size: "full" },
      { image: "images/lookbook/studio-session-5.jpg", tone: "tone-dark3", size: "half" },
      { image: "images/lookbook/studio-session-6.jpg", tone: "tone-light1", size: "half" },
    ],
  },
  {
    id: "off-duty",
    label: "Off-Duty",
    tone: "tone-light1",
    cover_image: "images/lookbook/off-duty-cover.jpg",
    category_no: 2,
    description: "주말의 표정을 위한 선글라스. 힘을 뺀 캐주얼한 룩을 제안합니다.",
    photos: [
      { image: "images/lookbook/off-duty-1.jpg", tone: "tone-light1", size: "full" },
      { image: "images/lookbook/off-duty-2.jpg", tone: "tone-dark1", size: "half" },
      { image: "images/lookbook/off-duty-3.jpg", tone: "tone-dark3", size: "half" },
      { image: "images/lookbook/off-duty-4.jpg", tone: "tone-dark2", size: "full" },
      { image: "images/lookbook/off-duty-5.jpg", tone: "tone-light1", size: "half" },
      { image: "images/lookbook/off-duty-6.jpg", tone: "tone-dark1", size: "half" },
    ],
  },
  {
    id: "portrait",
    label: "Portrait",
    tone: "tone-dark1",
    cover_image: "images/lookbook/portrait-cover.jpg",
    category_no: null,
    description: "얼굴과 프레임이 만나는 방식. 인물 중심으로 담은 aeido의 표정들.",
    photos: [
      { image: "images/lookbook/portrait-1.jpg", tone: "tone-dark1", size: "full" },
      { image: "images/lookbook/portrait-2.jpg", tone: "tone-dark3", size: "half" },
      { image: "images/lookbook/portrait-3.jpg", tone: "tone-light1", size: "half" },
      { image: "images/lookbook/portrait-4.jpg", tone: "tone-dark2", size: "full" },
      { image: "images/lookbook/portrait-5.jpg", tone: "tone-dark1", size: "half" },
      { image: "images/lookbook/portrait-6.jpg", tone: "tone-dark3", size: "half" },
    ],
  },
  {
    id: "campaign-05",
    label: "Campaign 05",
    tone: "tone-dark2",
    cover_image: "images/lookbook/campaign-05-cover.jpg",
    category_no: null,
    description: "다섯 번째 캠페인. aeido가 이번 시즌 전하고 싶은 이야기를 담았습니다.",
    photos: [
      { image: "images/lookbook/campaign-05-1.jpg", tone: "tone-dark2", size: "full" },
      { image: "images/lookbook/campaign-05-2.jpg", tone: "tone-light1", size: "half" },
      { image: "images/lookbook/campaign-05-3.jpg", tone: "tone-dark3", size: "half" },
      { image: "images/lookbook/campaign-05-4.jpg", tone: "tone-dark1", size: "full" },
      { image: "images/lookbook/campaign-05-5.jpg", tone: "tone-dark2", size: "half" },
      { image: "images/lookbook/campaign-05-6.jpg", tone: "tone-light1", size: "half" },
    ],
  },
];
