document.addEventListener('DOMContentLoaded', function() {
  var urlPrefixInput = document.getElementById('url-prefix');
  var generateUrlButton = document.getElementById('generate-url');

  // 从 Chrome 本地存储中读取上次保存的 URL 前缀
  chrome.storage.local.get('urlPrefix', function(data) {
    if (data.urlPrefix) {
      urlPrefixInput.value = data.urlPrefix;
    }
  });

  generateUrlButton.addEventListener('click', function() {
    var urlPrefix = urlPrefixInput.value.trim();
    if (urlPrefix) {
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        var currentUrl = tabs[0].url;
        var newUrl = urlPrefix + currentUrl;
        navigator.clipboard.writeText(newUrl);

        document.getElementById('generated-url').textContent = 
          "已复制到剪贴板：\r\n" +newUrl;

        // 将 URL 前缀保存到 Chrome 本地存储
        chrome.storage.local.set({'urlPrefix': urlPrefix}, function() {
          console.log('URL 前缀已保存到 Chrome 存储中');
        });
      });
    } else {
      alert('请输入 URL 前缀');
    }
  });
});