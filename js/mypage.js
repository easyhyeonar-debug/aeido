/*
  mypage.js — renders mypage.html

  There's no real auth yet — this is UI only. When Cafe24 is
  connected, this form should POST to the Cafe24 customer login
  endpoint through the same proxy server described in api.js, and
  the order history section should call a getOrders() function
  added to api.js.
------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("카페24 연동 전입니다. 연동 후 실제 로그인이 연결됩니다.");
  });

  document.getElementById("signup-link").addEventListener("click", (e) => {
    e.preventDefault();
    alert("카페24 연동 후 회원가입 페이지로 연결됩니다.");
  });

  document.getElementById("find-pw-link").addEventListener("click", (e) => {
    e.preventDefault();
    alert("카페24 연동 후 비밀번호 찾기 페이지로 연결됩니다.");
  });
});
