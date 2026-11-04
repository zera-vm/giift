const music =
  document.getElementById("music");

const musicButton =
  document.getElementById("musicButton");

musicButton.addEventListener(
  "click",
  async()=>{

    if(music.paused){

      try{
        await music.play();
      }catch(error){
        console.log(
          "Musik tidak dapat diputar:",
          error
        );
      }

    }else{

      music.pause();

    }

  }
);

music.addEventListener(
  "play",
  ()=>{

    musicButton.classList.add(
      "playing"
    );

  }
);

music.addEventListener(
  "pause",
  ()=>{

    musicButton.classList.remove(
      "playing"
    );

  }
);

const giftImage =
  document.getElementById(
    "giftImage"
  );

giftImage.addEventListener(
  "click",
  event=>{

    event.stopPropagation();

    const link =
      document.createElement("a");

    link.href =
      "gift.jpg";

    link.download =
      "gift.jpg";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

  }
);

const snow =
  document.createElement(
    "div"
  );

snow.className =
  "snow-container";

document.body.appendChild(
  snow
);

for(let i=0;i<55;i++){

  const flake =
    document.createElement(
      "div"
    );

  flake.className =
    "snowflake";

  const size =
    Math.random()*4+2;

  const fall =
    Math.random()*8+9;

  const sway =
    Math.random()*3+2.5;

  flake.style.left =
    Math.random()*100+"vw";

  flake.style.width =
    size+"px";

  flake.style.height =
    size+"px";

  flake.style.opacity =
    Math.random()*.5+.4;

  flake.style.animationDuration =
    `${fall}s,${sway}s`;

  flake.style.animationDelay =
    `${-Math.random()*fall}s,${-Math.random()*sway}s`;

  snow.appendChild(
    flake
  );

}

function rotate3D(
  viewport,
  target,
  opt={}
){

  let x =
    opt.x || 0;

  let y =
    opt.y || 0;

  let dragging =
    false;

  let lastX;
  let lastY;

  let moved =
    false;

  let idle;

  const clamp =
    opt.clamp ||
    [-60,60];

  const sensitivity =
    opt.sensitivity ||
    .4;

  const apply=()=>{

    target.style.transform =
      `rotateX(${x}deg) rotateY(${y}deg)`;

  };

  const stopIdle=()=>{

    if(idle){

      cancelAnimationFrame(
        idle
      );

      idle=null;

    }

  };

  const startIdle=()=>{

    stopIdle();

    let t=0;

    const loop=()=>{

      t+=.006;

      y+=
        Math.sin(t)*.05;

      apply();

      idle =
        requestAnimationFrame(
          loop
        );

    };

    idle =
      requestAnimationFrame(
        loop
      );

  };

  viewport.addEventListener(
    "pointerdown",
    e=>{

      dragging=true;

      moved=false;

      lastX =
        e.clientX;

      lastY =
        e.clientY;

      stopIdle();

      try{

        viewport.setPointerCapture(
          e.pointerId
        );

      }catch{}

    }
  );

  window.addEventListener(
    "pointermove",
    e=>{

      if(!dragging)
        return;

      const dx =
        e.clientX-lastX;

      const dy =
        e.clientY-lastY;

      if(
        Math.abs(dx)+
        Math.abs(dy)>4
      ){

        moved=true;

      }

      y +=
        dx*sensitivity;

      x -=
        dy*sensitivity;

      x =
        Math.max(
          clamp[0],
          Math.min(
            clamp[1],
            x
          )
        );

      lastX =
        e.clientX;

      lastY =
        e.clientY;

      apply();

      e.preventDefault();

    },
    {
      passive:false
    }
  );

  window.addEventListener(
    "pointerup",
    ()=>{

      if(!dragging)
        return;

      dragging=false;

      if(
        !moved &&
        opt.tap
      ){

        opt.tap();

      }

      if(opt.idle){

        setTimeout(
          ()=>{

            if(!dragging)
              startIdle();

          },
          3000
        );

      }

    }
  );

  apply();

  if(opt.idle)
    startIdle();

}

const boxViewport =
  document.getElementById(
    "boxViewport"
  );

const box =
  document.getElementById(
    "box3d"
  );

const giftScene =
  document.getElementById(
    "giftScene"
  );

const cardScene =
  document.getElementById(
    "cardScene"
  );

const card =
  document.getElementById(
    "card3d"
  );

let opened=false;

function sparks(){

  const rect =
    boxViewport.getBoundingClientRect();

  const colors=[
    "#fff",
    "#f1f1f1",
    "#ffeaa7",
    "#ff3333"
  ];

  for(
    let i=0;
    i<16;
    i++
  ){

    const s =
      document.createElement(
        "div"
      );

    s.className =
      "spark";

    const size =
      5+Math.random()*6;

    const angle =
      Math.random()*
      Math.PI*2;

    const distance =
      60+Math.random()*90;

    s.style.width =
      size+"px";

    s.style.height =
      size+"px";

    s.style.background =
      colors[
        i%colors.length
      ];

    s.style.left =
      rect.left+
      rect.width/2+
      "px";

    s.style.top =
      rect.top+
      rect.height*.3+
      "px";

    s.style.setProperty(
      "--dx",
      Math.cos(angle)*
      distance+
      "px"
    );

    s.style.setProperty(
      "--dy",
      Math.sin(angle)*
      distance+
      "px"
    );

    document.body.appendChild(
      s
    );

    setTimeout(
      ()=>s.remove(),
      950
    );

  }

}

rotate3D(
  boxViewport,
  box,
  {

    x:-16,

    y:-28,

    clamp:[
      -45,
      45
    ],

    sensitivity:.4,

    idle:true,

    tap(){

      if(opened)
        return;

      opened=true;

      music.play().catch(
        error=>{
          console.log(
            "Musik gagal diputar:",
            error
          );
        }
      );

      box.classList.add(
        "open"
      );

      document
        .querySelector(".biskuit")
        .classList.add("senang");

      ajakKotakSurat();

      goyangkanLonceng();

      sparks();

      setTimeout(
        ()=>{

          giftScene.classList.remove(
            "active"
          );

          cardScene.classList.add(
            "active"
          );

          card.classList.add(
            "entering"
          );

        },
        600
      );

    }

  }
);

const cardViewport =
  document.getElementById(
    "cardViewport"
  );

card.addEventListener(
  "animationend",
  ()=>{

    card.classList.remove(
      "entering"
    );

  }
);

rotate3D(
  cardViewport,
  card,
  {

    x:-8,

    y:-16,

    clamp:[
      -50,
      50
    ],

    sensitivity:.5,

    idle:true

  }
);

document.querySelectorAll(".tempat-rusa").forEach(tempat=>{

  const salinan =
    document.getElementById("rusa").cloneNode(true);

  salinan.removeAttribute("id");

  tempat.appendChild(salinan);

});

const rusaEl =
  document.querySelector(".rusa-terbang");

const muatanEl =
  rusaEl.querySelector(".muatan");

const hemat =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

function acak(a, b){

  return a + Math.random()*(b-a);

}

const SUDUT = ["kiriAtas","kananAtas","kiriBawah","kananBawah"];

let sudutSebelumnya = null;

function pilihSudut(){

  if(!sudutSebelumnya)
    return "kiriAtas";

  const pilihan =
    SUDUT.filter(s=> s !== sudutSebelumnya);

  return pilihan[
    Math.floor(Math.random()*pilihan.length)
  ];

}

function terbang(){

  const W = window.innerWidth;
  const H = window.innerHeight;

  const w = rusaEl.offsetWidth;
  const h = rusaEl.offsetHeight;

  const sudutAsal = pilihSudut();

  sudutSebelumnya = sudutAsal;

  const kanan = sudutAsal.startsWith("kanan");
  const bawah = sudutAsal.endsWith("Bawah");

  const cx0 = kanan ? W : 0;
  const cy0 = bawah ? H : 0;

  const sudut =
    acak(12,56) * Math.PI/180;

  const dx = Math.cos(sudut) * (kanan ? -1 : 1);
  const dy = Math.sin(sudut) * (bawah ? -1 : 1);

  const nx = -dy;
  const ny =  dx;

  const s0 = -(w/2 + h/2 + 20);

  const sX = dx>0 ? (W-cx0)/dx : (0-cx0)/dx;
  const sY = dy>0 ? (H-cy0)/dy : (0-cy0)/dy;

  const s1 =
    Math.min(sX,sY) + w/2 + h/2 + 20;

  const amp    = acak(0,34);
  const siklus = acak(.8,2.2);
  const fase   = acak(0,Math.PI*2);

  const kecepatan = acak(120,200);

  const durasi =
    (s1-s0)/kecepatan*1000;

  const tSudut =
    (-w/2 - s0)/(s1-s0);

  const N = 48;
  const frame = [];

  const balik = dx < 0;

  for(let i=0;i<=N;i++){

    const t = i/N;
    const s = s0 + (s1-s0)*t;

    const env =
      Math.min(1, Math.max(0,(t-tSudut)/.25));

    const ph =
      Math.PI*2*siklus*t + fase;

    const off =
      amp*env*Math.sin(ph);

    const lereng =
      amp*env*Math.cos(ph)
      * Math.PI*2*siklus/(s1-s0);

    const cx = cx0 + dx*s + nx*off;
    const cy = cy0 + dy*s + ny*off;

    const hx = dx + nx*lereng;
    const hy = dy + ny*lereng;

    const arah =
      balik
        ? Math.atan2(-hy,-hx)
        : Math.atan2(hy,hx);

    frame.push({
      offset:t,
      transform:
        `translate(${cx-w/2}px,${cy-h/2}px) rotate(${arah}rad)` +
        (balik ? " scaleX(-1)" : "")
    });

  }

  const anim =
    rusaEl.animate(
      frame,
      { duration:durasi, easing:"linear", fill:"forwards" }
    );

  rusaEl.style.visibility = "visible";

  anim.onfinish = ()=>{

    rusaEl.style.visibility = "hidden";

    anim.cancel();

    setTimeout(terbang, acak(300,1100));

  };

}

if(!hemat){

  setTimeout(terbang, 500);

}

const KONFIG_SURAT = {
  web3formsKey:     "",
  cloudinaryCloud:  "",
  cloudinaryPreset: ""
};

const kotakSurat   = document.getElementById("kotakSurat");
const suratOverlay = document.getElementById("suratOverlay");
const suratTutup   = document.getElementById("suratTutup");
const suratNama    = document.getElementById("suratNama");
const suratCatatan = document.getElementById("suratCatatan");
const suratBerkas  = document.getElementById("suratBerkas");
const suratPratinjau = document.getElementById("suratPratinjau");
const suratFoto    = suratPratinjau.querySelector("img");
const suratHapusFoto = document.getElementById("suratHapusFoto");
const suratKirim   = document.getElementById("suratKirim");
const suratStatus  = document.getElementById("suratStatus");
const suratBot     = document.getElementById("suratBot");

let gambarBlob = null;
let gambarUrl  = null;

function tampilStatus(teks, jenis){

  suratStatus.textContent = teks || "";

  suratStatus.className =
    "kertas-status" + (jenis ? " " + jenis : "");

}

function ajakKotakSurat(){

  kotakSurat.classList.add("terbuka","bergetar");

  setTimeout(()=>{

    kotakSurat.classList.remove("bergetar");

    if(suratOverlay.hidden)
      kotakSurat.classList.remove("terbuka");

  }, 2400);

}

function bukaSurat(){

  if(!opened){

    kotakSurat.classList.add("menolak");

    setTimeout(()=>{

      kotakSurat.classList.remove("menolak");

    }, 480);

    return;

  }

  kotakSurat.classList.add("terbuka");

  setTimeout(()=>{

    suratOverlay.hidden = false;

    kotakSurat.classList.add("terbuka");

    document.body.style.overflow = "hidden";

    suratCatatan.focus({ preventScroll:true });

  }, 380);

}

function tutupSurat(){

  suratOverlay.hidden = true;

  document.body.style.overflow = "";

  kotakSurat.classList.remove("terbuka");

}

kotakSurat.addEventListener("click", bukaSurat);

suratTutup.addEventListener("click", tutupSurat);

suratOverlay.addEventListener("pointerdown", e=>{

  if(e.target === suratOverlay)
    tutupSurat();

});

window.addEventListener("keydown", e=>{

  if(e.key === "Escape" && !suratOverlay.hidden)
    tutupSurat();

});

async function kecilkanGambar(file){

  let bmp;

  try{

    bmp = await createImageBitmap(
      file,
      { imageOrientation:"from-image" }
    );

  }catch{

    bmp = await new Promise((ok,gagal)=>{

      const img = new Image();

      img.onload  = ()=> ok(img);
      img.onerror = gagal;

      img.src = URL.createObjectURL(file);

    });

  }

  const lebar  = bmp.width  || bmp.naturalWidth;
  const tinggi = bmp.height || bmp.naturalHeight;

  const skala =
    Math.min(1, 1280 / Math.max(lebar, tinggi));

  const kanvas =
    document.createElement("canvas");

  kanvas.width  = Math.round(lebar  * skala);
  kanvas.height = Math.round(tinggi * skala);

  kanvas.getContext("2d")
    .drawImage(bmp, 0, 0, kanvas.width, kanvas.height);

  return new Promise(ok=>{

    kanvas.toBlob(ok, "image/jpeg", .82);

  });

}

function hapusGambar(){

  if(gambarUrl)
    URL.revokeObjectURL(gambarUrl);

  gambarBlob = null;
  gambarUrl  = null;

  suratBerkas.value = "";
  suratPratinjau.hidden = true;
  suratFoto.removeAttribute("src");

}

suratBerkas.addEventListener("change", async ()=>{

  const file = suratBerkas.files[0];

  if(!file)
    return;

  if(!file.type.startsWith("image/")){

    tampilStatus("Pilih file gambar saja ya.", "salah");

    suratBerkas.value = "";

    return;

  }

  if(file.size > 15*1024*1024){

    tampilStatus("Gambar terlalu besar (maksimal 15 MB).", "salah");

    suratBerkas.value = "";

    return;

  }

  try{

    tampilStatus("Menyiapkan gambar…");

    const blob = await kecilkanGambar(file);

    if(gambarUrl)
      URL.revokeObjectURL(gambarUrl);

    gambarBlob = blob;
    gambarUrl  = URL.createObjectURL(blob);

    suratFoto.src = gambarUrl;
    suratPratinjau.hidden = false;

    tampilStatus("");

  }catch{

    tampilStatus("Gambar tidak bisa dibaca.", "salah");

    suratBerkas.value = "";

  }

});

suratHapusFoto.addEventListener("click", hapusGambar);

async function kirimSurat(){

  const catatan = suratCatatan.value.trim();
  const nama    = suratNama.value.trim();

  if(suratBot.checked)
    return;

  if(!opened){

    return;

  }

  if(!catatan && !gambarBlob){

    tampilStatus("Tulis catatan atau pilih gambar dulu ya.", "salah");

    return;

  }

  if(!KONFIG_SURAT.web3formsKey){

    tampilStatus(
      "Fitur kirim belum diaktifkan oleh pembuat website.",
      "salah"
    );

    return;

  }

  suratKirim.disabled = true;

  tampilStatus("Mengirim…");

  try{

    let pesan = catatan;
    let lampiran = null;

    if(gambarBlob){

      if(
        KONFIG_SURAT.cloudinaryCloud &&
        KONFIG_SURAT.cloudinaryPreset
      ){

        const unggah = new FormData();

        unggah.append("file", gambarBlob, "gambar.jpg");
        unggah.append("upload_preset", KONFIG_SURAT.cloudinaryPreset);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${KONFIG_SURAT.cloudinaryCloud}/image/upload`,
          { method:"POST", body:unggah }
        );

        const data = await res.json();

        if(!res.ok || !data.secure_url)
          throw new Error("unggah gambar gagal");

        pesan += (pesan ? "\n\n" : "") + "Gambar: " + data.secure_url;

      }else{

        lampiran = gambarBlob;

      }

    }

    const kirim = new FormData();

    kirim.append("access_key", KONFIG_SURAT.web3formsKey);
    kirim.append("subject", "Pesan baru dari website Natal");
    kirim.append("from_name", "Kotak surat website Natal");
    kirim.append("name", nama || "Tanpa nama");
    kirim.append("message", pesan || "(hanya gambar)");

    if(lampiran)
      kirim.append("attachment", lampiran, "gambar.jpg");

    const res2 = await fetch(
      "https://api.web3forms.com/submit",
      { method:"POST", body:kirim }
    );

    const hasil = await res2.json();

    if(!hasil.success)
      throw new Error(hasil.message || "gagal");

    tampilStatus("Terkirim. Terima kasih!", "berhasil");

    suratCatatan.value = "";
    suratNama.value = "";

    hapusGambar();

    setTimeout(()=>{

      tutupSurat();
      tampilStatus("");

    }, 1600);

  }catch(error){

    console.log("Gagal mengirim:", error);

    tampilStatus(
      "Belum berhasil terkirim. Coba lagi nanti ya.",
      "salah"
    );

  }finally{

    suratKirim.disabled = false;

  }

}

suratKirim.addEventListener("click", kirimSurat);

function pasangLampuHuruf(){

  const NS = "http://www.w3.org/2000/svg";

  document.querySelectorAll(".lampu-run").forEach(potongan=>{

    potongan
      .querySelectorAll(":scope > .lampu-s")
      .forEach(e=> e.remove());

    let teks = "";

    potongan.childNodes.forEach(n=>{

      if(n.nodeType === 3)
        teks += n.nodeValue;

    });

    teks = teks.trim();

    if(!teks)
      return;

    const tanda =
      document.createElement("i");

    tanda.style.cssText =
      "display:inline-block;width:0;height:0;vertical-align:baseline";

    potongan.appendChild(tanda);

    const dasar =
      tanda.getBoundingClientRect().bottom -
      potongan.getBoundingClientRect().top;

    tanda.remove();

    const svg =
      document.createElementNS(NS, "svg");

    svg.setAttribute("class", "lampu-s");
    svg.setAttribute("aria-hidden", "true");

    ["ls-kabel","ls-a","ls-b","ls-c","ls-d"].forEach(kelas=>{

      const t =
        document.createElementNS(NS, "text");

      t.setAttribute("class", "ls " + kelas);
      t.setAttribute("x", "0");
      t.setAttribute("y", dasar.toFixed(1));

      t.textContent = teks;

      svg.appendChild(t);

    });

    potongan.appendChild(svg);

  });

}

pasangLampuHuruf();

if(document.fonts && document.fonts.ready)
  document.fonts.ready.then(pasangLampuHuruf);

window.addEventListener("resize", pasangLampuHuruf);

let audioCtx = null;

function suaraLonceng(nada){

  const AC =
    window.AudioContext || window.webkitAudioContext;

  if(!AC)
    return;

  if(!audioCtx)
    audioCtx = new AC();

  if(audioCtx.state === "suspended")
    audioCtx.resume();

  const t = audioCtx.currentTime;

  const utama = audioCtx.createGain();
  const kompresor = audioCtx.createDynamicsCompressor();

  utama.gain.value = .75;
  utama.connect(kompresor);
  kompresor.connect(audioCtx.destination);

  const dasar =
    nada * (0.99 + Math.random()*.02);

  const bagian = [
    [1,    1,   2.4],
    [2.76, .55, 1.5],
    [5.4,  .32, .9],
    [8.93, .16, .5],
    [11.3, .08, .3]
  ];

  bagian.forEach(([rasio, kuat, lama])=>{

    [0, 2.5].forEach((geser, i)=>{

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.value = dasar*rasio + geser;

      gain.gain.setValueAtTime(0, t);

      gain.gain.linearRampToValueAtTime(
        kuat * (i ? .5 : 1),
        t + .004
      );

      gain.gain.exponentialRampToValueAtTime(
        .0001,
        t + lama
      );

      osc.connect(gain);
      gain.connect(utama);

      osc.start(t);
      osc.stop(t + lama + .05);

    });

  });

  const panjang =
    Math.floor(audioCtx.sampleRate * .03);

  const penyangga =
    audioCtx.createBuffer(1, panjang, audioCtx.sampleRate);

  const data = penyangga.getChannelData(0);

  for(let i=0;i<panjang;i++)
    data[i] = (Math.random()*2-1) * (1 - i/panjang);

  const derau = audioCtx.createBufferSource();
  derau.buffer = penyangga;

  const saring = audioCtx.createBiquadFilter();
  saring.type = "highpass";
  saring.frequency.value = 4500;

  const gainDerau = audioCtx.createGain();
  gainDerau.gain.value = .25;

  derau.connect(saring);
  saring.connect(gainDerau);
  gainDerau.connect(utama);

  derau.start(t);

}

document.querySelectorAll(".lonceng-ayun").forEach(lonceng=>{

  let terakhir = 0;

  function bunyikan(){

    const sekarang = performance.now();

    if(sekarang - terakhir < 220)
      return;

    terakhir = sekarang;

    lonceng.classList.remove("berayun");

    void lonceng.getBoundingClientRect();

    lonceng.classList.add("berayun");

    suaraLonceng(parseFloat(lonceng.dataset.nada) || 880);

  }

  lonceng.addEventListener("animationend", e=>{

    if(e.animationName === "loncengBunyi")
      lonceng.classList.remove("berayun");

  });

  lonceng.addEventListener("pointerdown", e=>{

    e.preventDefault();

    bunyikan();

  });

  lonceng.addEventListener("pointermove", e=>{

    if(e.buttons)
      bunyikan();

  });

  lonceng.addEventListener("keydown", e=>{

    if(e.key === "Enter" || e.key === " "){

      e.preventDefault();

      bunyikan();

    }

  });

});

function goyangkanLonceng(){

  document.querySelectorAll(".lonceng-ayun").forEach((lonceng,i)=>{

    const bunyikan = ()=>{

      lonceng.classList.remove("berayun");

      void lonceng.getBoundingClientRect();

      lonceng.classList.add("berayun");

      suaraLonceng(parseFloat(lonceng.dataset.nada) || 880);

    };

    if(i === 0)
      bunyikan();
    else
      setTimeout(bunyikan, i*140);

  });

}
