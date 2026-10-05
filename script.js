const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const selected = tab.dataset.example;
    document.querySelectorAll('.tab').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('[data-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === selected));
  });
});

const dialog = document.querySelector('#demo-dialog');
function showArtwork(source, title) {
  dialog.classList.remove('phone-detail');
  dialog.querySelector('img').src = source;
  dialog.querySelector('img').alt = title;
  dialog.querySelector('p').textContent = title;
  dialog.showModal();
}
document.querySelector('#open-demo').addEventListener('click', () => showArtwork('assets/tarjetas-negocio.png', 'Tarjetas digitales JC Creativo'));
const packageArt = [
  ['basico', 'Paquete Básico'], ['plus', 'Paquete Plus'], ['premium', 'Paquete Premium']
];
document.querySelectorAll('.package').forEach((card, index) => {
  const [slug, title] = packageArt[index];
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `package-art phone-only phone-${slug}`;
  button.setAttribute('aria-label', `Ampliar imagen del ${title}`);
  const img = document.createElement('img');
  img.src = `assets/telefono-${slug}.png`;
  img.alt = `${title}: diseño y características de la tarjeta digital`;
  img.width = 1122;
  img.height = 1402;
  button.append(img);
  const label = document.createElement('span');
  label.textContent = 'Ver tarjeta';
  button.append(label);
  button.addEventListener('click', () => {
    showArtwork(img.src, title);
    dialog.classList.add('phone-detail');
  });
  card.prepend(button);
  const symbols = index === 0 ? ['👤','🔗','☎','✏️'] : index === 1 ? ['⭐','🖼️','📍','🎨'] : ['⭐','🛒','🖼️','📅'];
  card.querySelectorAll('li').forEach((li, i) => {
    const icon = document.createElement('span');
    icon.className = `color-icon icon-${i}`;
    icon.textContent = symbols[i];
    icon.setAttribute('aria-hidden', 'true');
    li.prepend(icon);
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
const featureIcons = ['☎','◎','▧','📍','▣','✦'];
document.querySelectorAll('.feature>b').forEach((icon,index) => {
  icon.textContent = featureIcons[index];
  icon.setAttribute('aria-hidden','true');
});
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('#copy-demo').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText('jc-creativo.site/tu-marca');
    button.textContent = 'Copiado';
    setTimeout(() => button.textContent = 'Copiar', 1600);
  } catch {
    event.currentTarget.textContent = 'Listo';
  }
});

document.querySelector('#quote-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Hola, soy ${data.get('name')} de ${data.get('business')}. Me interesa una tarjeta digital: ${data.get('package')}. ¿Me pueden compartir más información?`;
  const status = document.querySelector('#form-status');
  try {
    await navigator.clipboard.writeText(message);
    status.textContent = 'Mensaje copiado. Se abrirá WhatsApp para que elijas el contacto de JC Creativo.';
  } catch {
    status.textContent = 'Se abrirá WhatsApp con tu mensaje preparado.';
  }
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
