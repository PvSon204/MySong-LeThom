

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Đường Tôi Chở Em Về (Lofi)",
      singer: "buitruonglinh x Freak D",
      path: "https://stream.nixcdn.com/NhacCuaTui1017/DuongToiChoEmVeLofiVersion-buitruonglinhFreakD-7025960.mp3?st=gHgltfe37DwS1xDkoeuRUw&e=1665418306",
      image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/8/3/2/c83247bc75a132fdd93982c10b2cc152.jpg"
    },
    {
      name: "Tie Me Down",
      singer: "Gryffin Ft.Euey Duhé",
      path: "https://ve58.aadika.xyz/download/HGVZVIXDqYU/mp3/64/1671693556/aa16b6a11a1105051619c5013f98a4f2bbf0a490c7e57baff586013a91457012/1?f=y2meta.com",
      image: "https://avatar-ex-swe.nixcdn.com/song/2018/08/03/0/8/5/4/1533314109594_500.jpg"
    },
    {
      name: "The Ocean",
      singer: "Mike Perry ft. Shy Martin",
      path: "https://ve61.aadika.xyz/download/DBkcTYJXiXY/mp3/64/1671693507/7efd61af308c0d8194a6d7272df5e9bb8a70182acaedd2f816f7aea57c03abce/1?f=y2meta.com",
      image: "https://i.ytimg.com/vi/DBkcTYJXiXY/mqdefault.jpg"
    },
    {
      name: "Safari",
      singer: "Serena",
      path: "https://ve43.aadika.xyz/download/Y_qu56ZXpvk/mp3/64/1671693436/a2452978fc4166b3cbf43c47fe3cc6b7d42521c7d8c29e4f8adb04ef036819d8/1?f=y2meta.com",
      image: "https://i.ytimg.com/vi/Y_qu56ZXpvk/mqdefault.jpg"
    },
    {
      name: "2AM",
      singer: "JustaTee x BigDaddy",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui903/2am-JustaTeeBigDaddy-4067498.mp3?st=0_EyCT9bzX4T2QjmsSEl_Q&e=1671717762&download=true",
      image: "https://avatar-ex-swe.nixcdn.com/song/2017/12/19/1/e/0/d/1513679633652_500.jpg"
    },
    {
      name: "Thế Phong Tình ",
      singer: "Thái Vũ (BlackBi), Elbi",
      path: "https://ve32.aadika.xyz/download/KNcVKLhHgjw/mp3/64/1671693610/6e6b0ccbfa954202f4d6ee152124e10f120bf61d0fa74e71b2fe868fd20e30c1/1?f=y2meta.com",
      image: "	https://avatar-ex-swe.nixcdn.com/song/2020/01/11/e/b/c/8/1578724469135.jpg  "
    },
    {
      name: "As Long As You Love Me",
      singer: "Justin Bieber",
      path: "https://ve48.aadika.xyz/download/wtN10SBcJKQ/mp3/64/1671693654/eeadc4d04b853ad6082107b45d3572cd606de45e47b95ee77a2b76b5fc05165b/1?f=y2meta.com",
      image: "https://i.ytimg.com/vi/wtN10SBcJKQ/mqdefault.jpg"
    },
    {
      name: "Where We Started",
      singer: "Lost Sky ft. Jex",
      path: "https://ve63.aadika.xyz/download/f186dvntdDs/mp3/64/1671693697/879784e1067ae3a5545fe1afb397908828df9ccd4d66ced93cc5539712ba7588/1?f=y2meta.com",
      image: "https://i.ytimg.com/vi/f186dvntdDs/mqdefault.jpg"
    },
    {
      name: "Once Upon A Time",
      singer: "Max Oazo ft. Moonessa",
      path: "https://ve46.aadika.xyz/download/4CuBR9VGDG8/mp3/64/1671693751/bc9d841cb2c74d4d566d2d20a94ce441ce2240fda75a396ebad49a54471c8e8c/1?f=y2meta.com",
      image:"https://i.ytimg.com/vi/4CuBR9VGDG8/mqdefault.jpg",
    },
    {
      name: "Ava Max",
      singer: "Syn Cole Remix",
      path:"https://ve63.aadika.xyz/download/d1BB1tFn-5g/mp3/64/1671693795/0752f4dd5aae3f1333948aeb66451d1d8c29e579af1746e69c1938ba6812eb7a/1?f=y2meta.com",
      image: "https://i.ytimg.com/vi/d1BB1tFn-5g/mqdefault.jpg"
    },
    {
      name: "Đom Đóm",
      singer: "Jack",
      path: "https://ve31.aadika.xyz/download/Ion5DazeiPE/mp3/64/1671693848/4bc35b080866bc244b33211ddbd095c954360c5c2552f2981f3475d3eea92c10/1?f=y2meta.com",
      image: "https://i.ytimg.com/vi/4CCGI83vOVo/mqdefault.jpg"
    },
    {
      name: "Tình Sầu Thiên Thu Muôn Lối",
      singer: "Doãn Hiếu",
      path: "https://ve83.aadika.xyz/download/Lm3UG2GXLHk/mp3/64/1671693905/e190255cd013e5cd8061a106a5a8a6b3b3004fee70247a05e7464a47b7664daa/1?f=y2meta.com",
      image:
        "https://i.ytimg.com/vi/Lm3UG2GXLHk/mqdefault.jpg"
    },
    {
      name: "Một Triệu Khả Năng Remix",
      singer: "Quaniam Remix",
      path:"https://ve47.aadika.xyz/download/Z-uYgPtL0m4/mp3/64/1671693956/7c4cc16df2b3284e70503e2d5ab051db135172619940872f2430d99d870c5571/1?f=y2meta.com",
      image:"https://i.ytimg.com/vi/Z-uYgPtL0m4/mqdefault.jpg"
    },
    {
      name: "MẶT TRỜI CỦA EM",
      singer: "PHƯƠNG LY",
      path: "https://ve31.aadika.xyz/download/3ZnG0Dr1Et0/mp3/64/1671693997/e3382ead8293201d1dde36e8afc3c7b0e51100a9071e86c4ad1d5de0fd102be5/1?f=y2meta.com",
      image:"https://i.ytimg.com/vi/3ZnG0Dr1Et0/mqdefault.jpg"
    },
    {
        name: "The Way I Still Love You",
        singer: "Reynard Silva",
        path:"https://ve61.aadika.xyz/download/qIM56IoaL34/mp3/64/1671694039/4f9947c34bd3a46d3074f03b58310015dee05f2e91c1ec03570b4faec67aea6c/1?f=y2meta.com",
        image: "https://i.ytimg.com/vi/bj7XLs_N0Ng/mqdefault.jpg"
      },
      {
        name: "Ôm em lần cuối - lofi",
        singer: "Nit ft. Sing x Freak D",
        path:"https://stream.nixcdn.com/NhacCuaTui1023/OmEmLanCuoiLofiVersion-FreakDNITSing-7099594.mp3?st=3sdNeQMwUVHtbjqlKJi6rQ&e=1665410513",
        image: "https://i.scdn.co/image/ab67616d0000b2737dc7c048785d6ab347328274"
      },
      {
        name: "Bước Qua Nhau",
        singer: "Vũ",
        path:"https://stream.nixcdn.com/Warner_Audio86/BuocQuaNhau-Vu-7847964.mp3?st=02MW0qikRmfV6ZMAierjoQ&e=1665410812",
        image: "https://avatar-ex-swe.nixcdn.com/song/share/2021/11/19/b/e/5/0/1637317185220.jpg"
      },
      {
        name: "Bước Qua Mùa Cô Đơn",
        singer: "Vũ",
        path:"https://stream.nixcdn.com/Warner_Audio86/BuocQuaMuaCoDon-Vu-7847965.mp3?st=7bWSXaSY6mM0cFyBiHugUg&e=1665410914",
        image: "https://avatar-ex-swe.nixcdn.com/song/2020/12/11/4/0/f/e/1607643612541_640.jpg"
      },
      
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    // randomBtn.onclick = function (e) {
    //   _this.isRandom = !_this.isRandom;
    //   _this.setConfig("isRandom", _this.isRandom);
    //   randomBtn.classList.toggle("active", _this.isRandom);
    // };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    // repeatBtn.onclick = function (e) {
    //   _this.isRepeat = !_this.isRepeat;
    //   _this.setConfig("isRepeat", _this.isRepeat);
    //   repeatBtn.classList.toggle("active", _this.isRepeat);
    // };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();



let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function(e) {
audio.volume = e.currentTarget.value / 100;
})


var sound = document.getElementById('audio');
var NotMute = document.getElementById('muted-volume')
var mute = document.getElementById('open-volume')
mute.onclick = function(){
    sound.muted = true;
    NotMute.style.display = 'block'
    mute.style.display = 'none'
}
NotMute.onclick = function(){
  sound.muted = false;
  NotMute.style.display = 'none'
  mute.style.display = 'block'
}

