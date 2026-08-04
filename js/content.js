/*
  content.js
  ------------------------------------------------------------------
  Marketing copy + image paths that are NOT product data — the home
  hero photo, the "our vision" copy, and the 4 lookbook photos.

  To swap a photo: drop a file into the images/ folder using the
  same filename referenced below and it will appear automatically —
  no other code needs to change. If a file doesn't exist yet, the
  page quietly falls back to a solid color block so nothing breaks.

  To change headlines/copy, edit the strings below.
------------------------------------------------------------------ */

const CONTENT = {
  hero: {
    image: "images/hero.jpg",
    headline: "보이는 것 너머, 본질을 담다",
  },
  vision: {
    label: "our vision",
    text:
      "세상에 완벽한 안경은 없습니다. 당신 얼굴에 자연스럽게 맞아가는 형태가 있을 뿐입니다.<br>" +
      "aeido는 당신에게 꼭 맞는, 당신만의 원형 하나를 만듭니다.",
  },
  lookbook: [
    { image: "images/lookbook-1.jpg", caption: "2026 Collection", tone: "tone-dark1" },
    { image: "images/lookbook-2.jpg", caption: "Bestseller", tone: "tone-dark2" },
    { image: "images/lookbook-3.jpg", caption: "Sunglasses", tone: "tone-dark3" },
    { image: "images/lookbook-4.jpg", caption: "Glasses", tone: "tone-light1" },
  ],
};
