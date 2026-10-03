(function () {
  var root = document.documentElement;
  var theme = 'dark';
  try {
    var saved = localStorage.getItem('careerhq.theme.v1');
    if (saved === 'light' || saved === 'dark') {
      theme = saved;
    } else if (saved !== null) {
      root.dataset.themeNotice = 'The saved theme was not recognized. DeepSeaFoam is selected.';
    }
  } catch {
    root.dataset.themeNotice = 'Theme preferences could not be read. DeepSeaFoam is selected for this tab.';
  }
  root.dataset.theme = theme;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#000F13' : '#F3F2E9');
})();
