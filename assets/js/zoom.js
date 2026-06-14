// Initialize medium zoom.
$(document).ready(function () {
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee";

  // 1. 일반 이미지는 기존처럼 화면에 꽉 차게 확대
  medium_zoom = mediumZoom("[data-zoomable]:not(.preview)", {
    background: bgColor,
  });

  // 2. preview 이미지는 margin을 크게 주어 확대 크기를 제한
  mediumZoom(".preview[data-zoomable]", {
    background: bgColor,
    margin: 150, // 💡 이 값을 늘릴수록 확대 시 이미지가 작아집니다. 원하는 크기에 맞춰 조절하세요! (예: 100 ~ 300)
  });
});
