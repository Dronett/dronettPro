
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', (e)=>{
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});
const backdrop = document.getElementById('modal-backdrop');
const modal = document.getElementById('modal');
function openModal(){ if(!backdrop) return; backdrop.classList.add('open'); setTimeout(()=>modal.classList.add('show'), 10); }
function closeModal(){ if(!backdrop) return; modal.classList.remove('show'); setTimeout(()=>backdrop.classList.remove('open'), 150); }
document.querySelectorAll('[data-open-modal]').forEach(btn=>btn.addEventListener('click', openModal));
document.querySelectorAll('[data-close-modal]').forEach(btn=>btn.addEventListener('click', closeModal));
if(backdrop){ backdrop.addEventListener('click', (e)=>{ if(e.target === backdrop) closeModal(); }); }
const form = document.getElementById('quote-form');
const formStatus = document.getElementById('form-status');
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(formStatus) formStatus.textContent = 'Envoi en cours…';
    const data = new FormData(form);
    try{
      const endpoint = form.getAttribute('action') || '';
      let ok = false;
      if(endpoint){
        const r = await fetch(endpoint, { method:'POST', body:data, headers: { 'Accept':'application/json' }});
        ok = r.ok;
      } else { ok = true; }
      if(ok){
        form.reset();
        if(formStatus) formStatus.textContent = 'Votre demande a bien été envoyée ✅';
      } else {
        if(formStatus) formStatus.textContent = 'Une erreur est survenue. Réessayez dans un instant.';
      }
    }catch(err){
      if(formStatus) formStatus.textContent = 'Une erreur réseau est survenue.';
    }
  });
}
