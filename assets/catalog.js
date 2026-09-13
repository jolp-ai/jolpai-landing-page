'use strict';
document.querySelectorAll('[data-catalog]').forEach(controls=>{
 const area=controls.parentElement;
 const items=Array.from(area.querySelector('[data-catalog-items]').children);
 const buttons=Array.from(controls.querySelectorAll('[data-filter]'));
 const search=controls.querySelector('[data-search-input]');
 const status=controls.querySelector('.catalog-status');
 const empty=area.querySelector('.catalog-empty');
 let category='All';
 function update(){
  const query=(search?.value||'').trim().toLowerCase();
  let count=0;
  items.forEach(item=>{const show=(category==='All'||item.dataset.category===category)&&(!query||(item.dataset.search||item.textContent).toLowerCase().includes(query));item.hidden=!show;if(show)count++;});
  buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
  status.textContent=`${count} ${controls.dataset.catalog==='blog'?'articles':'services'} shown`;
  if(empty)empty.hidden=count!==0;
 }
 buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;update();}));
 search?.addEventListener('input',update);
 update();
});
