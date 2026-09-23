
let s=document.currentScript||[...document.querySelectorAll("script[data-p]")].pop();
if(!document.body)document.documentElement.appendChild(document.createElement("body"));
let P=s?s.dataset.p:"";
if(!P){document.body.innerHTML="no data-p on the script tag";throw Error("no data-p")}
let c="",st=document.createElement("b");
st.textContent="loading…";
let o=document.createElement("select");
o.innerHTML='<option value="a">about:blank</option><option value="b">blob</option><option value="c">current</option><option value="z">link</option>';
let w=document.createElement("select");
w.innerHTML='<option value="a">tab</option><option value="b">window</option>';
let r=document.createElement("button");
r.textContent="Open";r.disabled=true;
let l=document.createElement("a");
l.target="_blank";l.rel="noopener";l.style.display="none";l.textContent="link";
document.body.append(o,w,r,l,st);
const rf=async u=>{for(let i=0;i<8;i++){try{const x=await fetch(u,{cache:"no-store"});if(x.ok)return await x.text()}catch(e){}st.textContent="waiting for cdn "+(i+1)+"…";await new Promise(y=>setTimeout(y,4000))}throw Error("404 "+u)};
(async()=>{try{
 const B="https://cdn.jsdelivr.net/gh/"+P;
 const m=await rf(B+"m.json");
 const n=+m;
 if(n>0){
  let s2="";
  for(let i=0;i<n;i++){st.textContent="part "+(i+1)+"/"+n;s2+=await rf(B+"s."+i+".txt")}
  const b=atob(s2),u=new Uint8Array(b.length);
  for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);
  let out;
  if(u[0]==1)out=new Uint8Array(await new Response(new Blob([u.subarray(1)]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer());
  else out=u.subarray(1);
  c=new TextDecoder().decode(out);
 }else{
  c=await rf(B+"x.html");
 }
 r.disabled=false;st.textContent="ready";
}catch(e){st.textContent="load failed: "+e.message}})();
r.onclick=()=>{
 if(!c)return;
 const f=(w.value=="b")?"width=800,height=600":"";
 if(o.value=="a"){const ab=window.open("about:blank","_blank",f);if(ab){ab.document.write(c);ab.document.close()}else alert("blocked")}
 else if(o.value=="c"){document.open();document.write(c);document.close()}
 else{const u2=URL.createObjectURL(new Blob([c],{type:"text/html"}));
  if(o.value=="b"){const p=window.open(u2,"_blank",f);if(!p)alert("blocked")}
  else{l.href=u2;l.style.display="block";r.style.display="none"}}
};
