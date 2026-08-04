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

const LOOKBOOK = [
  { label: "2026 Collection", tone: "dark1" },
  { label: "Bestseller", tone: "dark2" },
  { label: "Sunglasses", tone: "dark3" },
  { label: "Glasses", tone: "light1" },
];
