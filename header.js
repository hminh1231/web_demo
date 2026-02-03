function renderHeader() {
  const isAdmin = localStorage.getItem('olyAdmin') === 'true';
  let currentLang = localStorage.getItem('olyLang') || 'en';

  const translations = {
    about: { en: 'About Us', vi: 'Về Chúng Tôi', ko: '회사 소개' },
    login: { en: 'Login', vi: 'Đăng nhập', ko: '로그인' },
    admin: { en: 'Admin', vi: 'Admin', ko: '관리자' },
    productManagement: { en: 'Product Management', vi: 'Quản lý sản phẩm', ko: '제품 관리' },
    signOut: { en: 'Sign out', vi: 'Đăng xuất', ko: '로그아웃' }
  };

  document.getElementById('site-header').innerHTML = `
    <header class="bg-white border-b">
      <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
        <a href="index.html" class="leading-tight">
          <div class="font-serif text-2xl">Links</div>
          <div class="text-xs tracking-widest text-gold uppercase">Beauty & Health Center</div>
        </a>

        <div class="flex items-center gap-4">
          <select id="langSelect" class="border rounded px-2 py-1">
            <option value="en">EN</option>
            <option value="vi">VI</option>
            <option value="ko">KO</option>
          </select>

          <button onclick="window.location.href='about.html'"
            class="border px-4 py-1 rounded-full hover:bg-black hover:text-white">
            ${translations.about[currentLang]}
          </button>

          ${
            isAdmin
              ? `<div class="relative">
                  <button id="adminBtn" class="border px-4 py-1 rounded-full">
                    ${translations.admin[currentLang]} ▼
                  </button>
                  <div id="adminDropdown"
                    class="absolute right-0 mt-2 bg-white border rounded shadow hidden w-48 z-10">
                    <button onclick="goAdmin()"
                      class="block w-full text-left px-4 py-2 hover:bg-neutral-100">
                      ${translations.productManagement[currentLang]}
                    </button>
                    <button onclick="signOut()"
                      class="block w-full text-left px-4 py-2 hover:bg-neutral-100">
                      ${translations.signOut[currentLang]}
                    </button>
                  </div>
                </div>`
              : `<button onclick="goLogin()"
                  class="border px-4 py-1 rounded-full">
                  ${translations.login[currentLang]}
                </button>`
          }
        </div>
      </div>
    </header>
  `;

  // Language select
  const select = document.getElementById('langSelect');
  select.value = currentLang;
  select.addEventListener('change', e => {
    localStorage.setItem('olyLang', e.target.value);
    renderHeader();
    if (typeof applyLanguage === 'function') applyLanguage();
  });

  // Admin dropdown
  const adminBtn = document.getElementById('adminBtn');
  if (adminBtn) {
    const dropdown = document.getElementById('adminDropdown');
    adminBtn.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => dropdown.classList.add('hidden'));
  }
}

// ===== Navigation helpers =====

function goAdmin() {
  localStorage.setItem('olyAdmin', 'true');
  window.location.href = 'index.html#admin';
}

function goLogin() {
  const current = encodeURIComponent(window.location.pathname);
  window.location.href = `login.html?redirect=${current}`;
}

function signOut() {
  localStorage.removeItem('olyAdmin');
  window.location.href = 'index.html';
}
