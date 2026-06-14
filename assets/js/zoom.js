// Initialize medium zoom.
$(document).ready(function() {
  mediumZoom('[data-zoomable]', {
    background: getComputedStyle(document.documentElement)
        .getPropertyValue('--global-bg-color') + 'ee',  // 기존 배경색 설정 등
    margin: 100  // 이 값을 늘릴수록 확대 시 상하좌우 여백이 커져 이미지가 작게 표시됩니다.
  });
});
