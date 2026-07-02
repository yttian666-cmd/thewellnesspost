(function () {
  var navToggle = document.querySelector('[data-nav-toggle]');
  var navLinks = document.querySelector('[data-nav-links]');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  var searchInput = document.querySelector('[data-search]');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var query = searchInput.value.trim().toLowerCase();
      document.querySelectorAll('[data-search-card]').forEach(function (card) {
        var text = card.textContent.toLowerCase();
        card.hidden = query && text.indexOf(query) === -1;
      });
    });
  }

  var calcForm = document.querySelector('[data-sugar-form]');
  if (calcForm) {
    var grams = calcForm.querySelector('[name="grams"]');
    var result = document.querySelector('[data-sugar-result]');
    var reset = calcForm.querySelector('[data-reset]');
    calcForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = Number(grams.value);
      if (!value || value < 0) {
        result.textContent = '请输入有效的糖克数。这个工具只做信息换算，不提供医疗建议。';
        return;
      }
      var teaspoons = value / 4;
      result.textContent = value + ' 克糖约等于 ' + teaspoons.toFixed(1) + ' 茶匙。请结合饮料标签和个人健康情况理解结果。';
    });
    reset.addEventListener('click', function () {
      grams.value = '';
      result.textContent = '输入一瓶饮料的含糖克数后，这里会显示茶匙换算结果。';
    });
  }

  var quizForm = document.querySelector('[data-quiz-form]');
  if (quizForm) {
    var quizResult = document.querySelector('[data-quiz-result]');
    quizForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var answers = Array.prototype.slice.call(quizForm.querySelectorAll('input:checked'));
      if (answers.length < 3) {
        quizResult.textContent = '请先完成 3 个问题。';
        return;
      }
      var score = answers.reduce(function (sum, input) { return sum + Number(input.value); }, 0);
      quizResult.textContent = score >= 5
        ? '你的选择显示你已经注意饮料糖分。下一步可以比较标签中的每份含糖量。'
        : '你可能低估了日常饮料中的糖分。先从查看营养标签和减少加糖饮料频率开始。';
    });
    quizForm.querySelector('[data-reset]').addEventListener('click', function () {
      quizForm.reset();
      quizResult.textContent = '提交后会显示一个简短反馈。';
    });
  }

  var pollForm = document.querySelector('[data-poll-form]');
  if (pollForm) {
    var pollResult = document.querySelector('[data-poll-result]');
    pollForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var chosen = pollForm.querySelector('input:checked');
      pollResult.textContent = chosen
        ? '已记录你的选择：' + chosen.dataset.label + '。课堂版本不会收集真实个人资料。'
        : '请选择一个选项再提交。';
    });
  }

  var videoButton = document.querySelector('[data-play-video]');
  if (videoButton) {
    videoButton.addEventListener('click', function () {
      var status = document.querySelector('[data-video-status]');
      status.textContent = '视频占位已激活：替换为你的 MP4 或嵌入链接后，这里将播放主报道视频。';
      videoButton.textContent = '暂停';
    });
  }
}());
