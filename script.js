/* =====================================================
   MUSIK
   ===================================================== */

const music =
  document.getElementById("music");

const musicButton =
  document.getElementById("musicButton");


/* Tombol play / pause */

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


/* Saat musik mulai */

music.addEventListener(
  "play",
  ()=>{

    musicButton.classList.add(
      "playing"
    );

  }
);


/* Saat musik berhenti */

music.addEventListener(
  "pause",
  ()=>{

    musicButton.classList.remove(
      "playing"
    );

  }
);


/* =====================================================
   GAMBAR KARTU
   ===================================================== */

const giftImage =
  document.getElementById(
    "giftImage"
  );


/*
  Klik gambar kartu untuk
  menyimpan gift.jpg
*/

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


/* =====================================================
   SALJU
   ===================================================== */

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


/* =====================================================
   ROTASI 3D
   ===================================================== */

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


  /* Terapkan rotasi */

  const apply=()=>{

    target.style.transform =
      `rotateX(${x}deg) rotateY(${y}deg)`;

  };


  /* Hentikan idle */

  const stopIdle=()=>{

    if(idle){

      cancelAnimationFrame(
        idle
      );

      idle=null;

    }

  };


  /* Mulai idle */

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


  /* Mulai drag */

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


  /* Gerakan drag */

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


  /* Selesai drag / tap */

  window.addEventListener(
    "pointerup",
    ()=>{

      if(!dragging)
        return;


      dragging=false;


      /*
        Jika tidak digeser,
        dianggap sebagai tap.
      */

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


/* =====================================================
   ELEMEN KADO
   ===================================================== */

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


/* =====================================================
   SPARK
   ===================================================== */

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


/* =====================================================
   ROTASI KADO
   ===================================================== */

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


      /*
        MUSIK DIMULAI
        ketika kado dipencet.
      */

      music.play().catch(
        error=>{
          console.log(
            "Musik gagal diputar:",
            error
          );
        }
      );


      /* Buka kado */

      box.classList.add(
        "open"
      );


      /* ✨ BARU: biskuit jahe senang & melambai */

      document
        .querySelector(".biskuit")
        .classList.add("senang");


      /* Spark */

      sparks();


      /*
        Setelah 600ms,
        tampilkan kartu.
      */

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


/* =====================================================
   ROTASI KARTU
   ===================================================== */

const cardViewport =
  document.getElementById(
    "cardViewport"
  );


/* Hapus animasi masuk */

card.addEventListener(
  "animationend",
  ()=>{

    card.classList.remove(
      "entering"
    );

  }
);


/* Aktifkan rotasi kartu */

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


/* =====================================================
   ✨ BARU: KERETA RUSA PUTIH + KADO, TERBANG ACAK
   ===================================================== */

/* salin bentuk rusa ke tiap tempatnya */

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


/* pasangan warna kado: [kotak, pita] */

const warnaKado = [
  ["#ff4d6d","#ffe066"],
  ["#3ec7ff","#ffffff"],
  ["#7bff6b","#ff4d6d"],
  ["#ffd23f","#ff4d6d"],
  ["#b57bff","#ffe066"],
  ["#ff9f1c","#ffffff"],
  ["#ff6ad5","#ffffff"]
];


/* ---------- kado jatuh ---------- */

function jatuhkanKado(arahX, kecepatan){

  const r =
    muatanEl.getBoundingClientRect();

  const W = window.innerWidth;
  const H = window.innerHeight;

  const x = r.left + r.width  * acak(.1,.9);
  const y = r.top  + r.height * acak(.2,.9);

  /* hanya jatuh bila kereta terlihat di layar */
  if(x<12 || x>W-12 || y<12 || y>H-60)
    return false;

  const [c, p] =
    warnaKado[
      Math.floor(Math.random()*warnaKado.length)
    ];

  const u = Math.round(acak(20,34));

  const luar =
    document.createElement("div");

  luar.className = "kado-jatuh";

  const dalam =
    document.createElement("div");

  dalam.innerHTML =
    `<svg viewBox="0 0 40 40" width="${u}" height="${u}">
       <rect x="4" y="14" width="32" height="24" rx="3" fill="${c}"/>
       <rect x="2" y="11" width="36" height="8" rx="2.5" fill="${c}"
             stroke="rgba(0,0,0,.2)" stroke-width="1"/>
       <rect x="17" y="11" width="6" height="27" fill="${p}"/>
       <ellipse cx="14.5" cy="8.5" rx="5.5" ry="4" fill="${p}"/>
       <ellipse cx="25.5" cy="8.5" rx="5.5" ry="4" fill="${p}"/>
       <circle cx="20" cy="9.5" r="2.6" fill="${p}"/>
     </svg>`;

  luar.appendChild(dalam);
  document.body.appendChild(luar);

  const jarak = (H - y) + 60;

  /* jatuh dipercepat — gravitasi besar supaya cepat */
  const durasi =
    Math.sqrt(2*jarak/2600) * 1000;

  /* terbawa sedikit ke arah terbang + sebaran acak */
  const geser =
    arahX * kecepatan * (durasi/1000) * .6
    + acak(-40,40);

  const putar =
    acak(240,720) * (Math.random()<.5 ? -1 : 1);

  luar.animate(
    [
      { transform:`translate(${x-u/2}px,${y-u/2}px)` },
      { transform:`translate(${x-u/2+geser}px,${y-u/2}px)` }
    ],
    { duration:durasi, easing:"linear", fill:"forwards" }
  );

  const jatuh =
    dalam.animate(
      [
        { transform:"translateY(0) rotate(0deg)" },
        { transform:`translateY(${jarak}px) rotate(${putar}deg)` }
      ],
      {
        duration:durasi,
        easing:"cubic-bezier(.2,0,.6,.1)",
        fill:"forwards"
      }
    );

  jatuh.onfinish = ()=> luar.remove();

  return true;

}


/* ---------- sudut asal ---------- */

const SUDUT = ["kiriAtas","kananAtas","kiriBawah","kananBawah"];

let sudutSebelumnya = null;


/* sudut pertama selalu kiri atas, berikutnya acak (selalu berbeda) */

function pilihSudut(){

  if(!sudutSebelumnya)
    return "kiriAtas";

  const pilihan =
    SUDUT.filter(s=> s !== sudutSebelumnya);

  return pilihan[
    Math.floor(Math.random()*pilihan.length)
  ];

}


/* ---------- satu kali terbang ---------- */

function terbang(){

  const W = window.innerWidth;
  const H = window.innerHeight;

  const w = rusaEl.offsetWidth;
  const h = rusaEl.offsetHeight;

  const sudutAsal = pilihSudut();

  sudutSebelumnya = sudutAsal;

  /* titik sudut layar & arah masuk ke dalam layar */
  const kanan = sudutAsal.startsWith("kanan");
  const bawah = sudutAsal.endsWith("Bawah");

  const cx0 = kanan ? W : 0;
  const cy0 = bawah ? H : 0;

  const sudut =
    acak(12,56) * Math.PI/180;

  const dx = Math.cos(sudut) * (kanan ? -1 : 1);
  const dy = Math.sin(sudut) * (bawah ? -1 : 1);

  /* tegak lurus arah terbang (untuk goyangan) */
  const nx = -dy;
  const ny =  dx;

  const s0 = -(w/2 + h/2 + 20);

  /* jarak sampai keluar dari sisi seberang */
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

  /* ujung hidung rusa melewati sudut pada t ini */
  const tSudut =
    (-w/2 - s0)/(s1-s0);

  const N = 48;
  const frame = [];

  /* menghadap kiri bila terbang ke kiri */
  const balik = dx < 0;

  for(let i=0;i<=N;i++){

    const t = i/N;
    const s = s0 + (s1-s0)*t;

    /* goyangan baru dimulai setelah keluar dari sudut */
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

  /* kado jatuh berkelompok selama terbang */

  let terakhir = 0;
  let jumlah = 0;

  const pewaktu = setInterval(()=>{

    const sekarang = performance.now();

    if(
      jumlah < 0 &&
      sekarang - terakhir > 350 &&
      Math.random() < .6
    ){

      /* satu rentetan 2–4 kado hampir bersamaan */
      const banyak =
        1 + Math.floor(Math.random()*1);

      for(let k=0;k<banyak;k++){

        setTimeout(()=>{

          if(jatuhkanKado(dx, kecepatan))
            jumlah++;

        }, k*acak(30,130));

      }

      terakhir = sekarang;

    }

  }, 160);

  anim.onfinish = ()=>{

    clearInterval(pewaktu);

    rusaEl.style.visibility = "hidden";

    anim.cancel();

    /* cepat kembali dari sudut lain */
    setTimeout(terbang, acak(300,1100));

  };

}


if(!hemat){

  setTimeout(terbang, 500);

}
