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