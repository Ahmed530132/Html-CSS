
document.addEventListener('DOMContentLoaded', () => {

  
  const linksBox = document.querySelector('.header .links');
  const icon = document.querySelector('.header .links .icon');
  if (icon && linksBox) {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      linksBox.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!linksBox.contains(e.target)) linksBox.classList.remove('open');
    });
    document.querySelectorAll('.header .links ul li a').forEach(a => {
      a.addEventListener('click', () => linksBox.classList.remove('open'));
    });
  }

  
  const header = document.querySelector('.header');
  const onScrollHeader = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScrollHeader);
  onScrollHeader();

  
  const sections = document.querySelectorAll('div[id]');
  const navLinks = document.querySelectorAll('.header .links ul li a');
  const activateLink = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', activateLink);
  activateLink();

  
  const revealTargets = document.querySelectorAll(
    '.feat, .srv, .card, .about-content, .contact .info'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  
  const backToTop = document.createElement('button');
  backToTop.id = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  
  const emailLink = document.querySelector('.contact .info .link');
  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      const email = emailLink.textContent.trim();
      if (navigator.clipboard) {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
          const original = emailLink.textContent;
          emailLink.textContent = 'Copied! ✔ Opening mail app...';
          setTimeout(() => {
            emailLink.textContent = original;
            window.location.href = emailLink.getAttribute('href');
          }, 900);
        });
      }
    });
  }

  
  const heading = document.querySelector('.landing .intro h1');
  if (heading) {
    const text = heading.textContent;
    heading.textContent = '';
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        heading.textContent = text.slice(0, i);
        i++;
        setTimeout(type, 70);
      }
    };
    type();
  }

});
