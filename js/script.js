/*  1) Dark/Light Theme
    2) Tip of the Day (Home only: index.html)
    3) Footer
    4) Contact form
    5) Mobile hamburger
*/


/*  1) Dark/Light Theme  */
document.addEventListener('DOMContentLoaded', () => {
  /* Add a small CSS class to the button via JS */
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'theme-toggle-btn';
  btn.textContent = 'Toggle Dark Mode';
  btn.setAttribute('aria-pressed', 'false');

  const header = document.querySelector('header');
  if (header) header.appendChild(btn);

  /* Restore saved theme (default = light) */
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    btn.setAttribute('aria-pressed', 'true');
  }

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    btn.setAttribute('aria-pressed', String(isDark));
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});

/*  2) Tip of the Day (Home only: index.html)  */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.toLowerCase();
  const onHome = path.endsWith('/index.html') || path === '/' || path === '' || path.endsWith('\\index.html');

  if (!onHome) return;

  const tips = [
    'Keep your chin tucked and hands up.',
    'Rotate your hips for power in kicks and punches.',
    'Exhale on impact to tighten your core.',
    'Footwork first: balance beats brute force.',
    'Check kicks early—build the habit!'
  ];
  const index = new Date().getDate() % tips.length;

  const banner = document.createElement('div');
  banner.setAttribute('role', 'note');
  banner.className = 'tip-banner';
  const strong = document.createElement('strong'); strong.textContent = 'Muay Thai Tip: ';
  const span = document.createElement('span');     span.textContent = tips[index];
  banner.append(strong, span);

  const h1 = document.querySelector('main h1, article h1, h1');
  if (h1 && h1.parentNode) h1.parentNode.insertBefore(banner, h1.nextSibling);
});

/*  3) Footer  */
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer');
  if (!footer) return;
  const stamp = document.createElement('div');
  stamp.style.fontSize = '0.85em';
  stamp.style.opacity = '0.9';
  stamp.style.marginTop = '6px';
  const pad = n => String(n).padStart(2, '0');
  const d = new Date();
  stamp.textContent = `Last updated: ${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  footer.appendChild(stamp);
});

/*  4) Contact form  */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#consultationForm') || document.querySelector('form');
  const textarea = document.querySelector('#message');

  if (textarea) {
    const counter = document.createElement('div');
    counter.id = 'messageCounter';
    Object.assign(counter.style, {
      textAlign: 'right',
      fontSize: '0.9em',
      marginTop: '-6px',
      marginBottom: '10px',
      color: '#666'
    });
    textarea.parentNode.insertBefore(counter, textarea.nextSibling);

    const limit = 300;
    const update = () => {
      const used = textarea.value.length;
      counter.textContent = `${used}/${limit} characters`;
      counter.style.color = (limit - used) < 40 ? '#e63946' : '#666';
    };
    update();
    textarea.addEventListener('input', update);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      const name = document.querySelector('#name');
      const email = document.querySelector('#email');
      const interest = document.querySelector('#interest');
      const errors = [];
      if (name && name.value.trim().length < 2) errors.push('Please enter your full name.');
      if (email && !/^\S+@\S+\.\S+$/.test(email.value)) errors.push('Please enter a valid email address.');
      if (interest && !interest.value) errors.push('Please select an interest.');

      if (errors.length) {
        e.preventDefault();
        alert('Please fix the following:\n\n- ' + errors.join('\n- '));
      } else {
        alert('Thank you! Your request has been submitted.');
      }
    });
  }
});

/*  5) Mobile hamburger  */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  if (!header || !nav) return;

  /* Create the button */
  const btn = document.createElement('button');
  btn.className = 'navicon-btn';
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Toggle navigation');

  /* Inline three bars icon */
  const img = document.createElement('img');
  img.alt = '';
  img.src =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true">' +
      '<rect x="3" y="6"  width="18" height="2" fill="white"/>' +
      '<rect x="3" y="11" width="18" height="2" fill="white"/>' +
      '<rect x="3" y="16" width="18" height="2" fill="white"/>' +
      '</svg>'
    );

  const text = document.createElement('span');
  text.textContent = 'Menu';

  btn.append(img, text);

  /* Insert before <nav> */
  header.insertBefore(btn, nav);

  /* Toggle body class to open and close menu */
  btn.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', String(open));
  });
});