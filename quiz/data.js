/* ================================================================
   深夜書店：深夜原形測驗 — 內容資料
   包裝：魔幻童話（一間只對迷路的人營業的書店，第一人稱）
   實測：三軸性格
     Pace   0=衝動直覺派(spark)   1=慢熱沉澱派(steep)
     Motive 0=體驗感受派(feel)    1=探究意義派(why)
     Social 0=獨享世界派(solo)    1=分享連結派(share)
   code = pace*4 + motive*2 + social  →  對應 TYPES 陣列索引
   每題選項數 2–4，votes 由 majority() 統計（每題投一票）。
   scene = { land, port }，由 app.js 依螢幕方向挑選。
   q.sfx = 'page' | 'phone' | 'typewriter'（進場景音效）；option.sfx = 'quill' | 'typewriter'（點選時取代預設音效）
   ================================================================ */

const SCENES = {
  entrance: { land: 'assets/scenes/hero-entrance.webp',  port: 'assets/scenes/hero-entrance-portrait.webp' },
  aisle:    { land: 'assets/scenes/shelves-aisle.webp',  port: 'assets/scenes/shelves-aisle-portrait.webp' },
  fork:     { land: 'assets/scenes/fork-shelves.webp',   port: 'assets/scenes/fork-shelves-portrait.webp' },
  corner:   { land: 'assets/scenes/corner-lamp.webp',    port: 'assets/scenes/corner-lamp-portrait.webp' },
  dawn:     { land: 'assets/scenes/dawn-exit.webp',      port: 'assets/scenes/dawn-exit-portrait.webp' },
};

const TYPES = [
  {
    code: 0, // 衝‧感‧獨
    id: 'persimmon',
    color: '#E5852A', colorDark: '#AA6726', colorWash: '#EFC090',
    avatar: 'assets/avatars/persimmon.webp',
    name: '結局獵人',
    tagline: '全世界的「待續」都是你的敵人',
    desc: '你的字典裡沒有「慢慢等」。追劇先查結局、拿到禮物先搖一搖、聊天最恨人家說「先不告訴你」。不是你沒耐心，是你的好奇心天生裝了渦輪——答案不到手，整個人就像沒對到焦。但你最享受的其實是那股「衝」的感覺：一個人、深夜、無人打擾，那就是你的高速公路。',
    traits: ['禮物永遠先偷拆的人', '「待續」會讓你生理不適', '深夜效率是白天的三倍'],
    books: [
      { title: '控制', author: 'Gillian Flynn' },
      { title: '活著', author: '余華' },
      { title: '夜晚的潛水艇', author: '陳春成' },
    ],
  },
  {
    code: 1, // 衝‧感‧共
    id: 'blush',
    color: '#EDA6AC', colorDark: '#AF7C7B', colorWash: '#F3CFCB',
    avatar: 'assets/avatars/blush.webp',
    name: '尖叫擴音器',
    tagline: '快樂不分享，等於沒發生',
    desc: '你的情緒自帶擴音器：看到好笑的三秒內轉發，遇到好吃的當場拍給全世界。朋友的資訊流有一半是你貢獻的，你的「欸你看這個！」是友情的問候語。有你在的群組不會死，因為你捨不得讓任何熱鬧冷掉。你可能自己都沒發現——大家的日常，因為你的尖叫熱鬧了不少。',
    traits: ['訊息秒回小天使', '限動日更起跳', '口頭禪：欸你看這個'],
    books: [
      { title: '正常人', author: 'Sally Rooney' },
      { title: '三體', author: '劉慈欣' },
      { title: '82年生的金智英', author: '趙南柱' },
    ],
  },
  {
    code: 2, // 衝‧思‧獨
    id: 'navy',
    color: '#254565', colorDark: '#2D3D4C', colorWash: '#99A4AB',
    avatar: 'assets/avatars/navy.webp',
    name: '腦內偵探',
    tagline: '表面在聽你說話，腦內已經破案三次',
    desc: '你話不多，但什麼都逃不過你。朋友的曖昧對象、劇裡的伏筆、老闆今天語氣不太對——你全都在腦內默默建檔分析。你不急著說，因為結論沒想好之前，你寧可保持神秘。等你終於開口，大家都會愣一下：「你怎麼連這個都注意到？」',
    traits: ['搜尋紀錄深不可測', '安靜但精準得可怕', '發言前先在腦內彩排三遍'],
    books: [
      { title: '快思慢想', author: 'Daniel Kahneman' },
      { title: '原子習慣', author: 'James Clear' },
      { title: '人類大歷史', author: '哈拉瑞' },
    ],
  },
  {
    code: 3, // 衝‧思‧共
    id: 'sky',
    color: '#B8D6DF', colorDark: '#7E97A0', colorWash: '#DBE5E2',
    avatar: 'assets/avatars/sky.webp',
    name: '話題點火師',
    tagline: '一句「我不同意」能救活整個群組',
    desc: '你不是愛吵架，你是無法忍受一件事沒被講清楚。任何話題到你手上都能長出三個新角度，你的群組常常因為你一句話變成小型辯論賽——而且大家其實都偷偷期待。跟你聊天很燒腦，但聊完都覺得賺到。你的存在證明了一件事：話題不會死，只是還沒遇到你。',
    traits: ['起手式：可是你有沒有想過', '吵完架感情反而變好', '轉發必附上自己的評論'],
    books: [
      { title: '正義：一場思辨之旅', author: 'Michael Sandel' },
      { title: '被討厭的勇氣', author: '岸見一郎' },
      { title: '異數', author: 'Malcolm Gladwell' },
    ],
  },
  {
    code: 4, // 慢‧感‧獨
    id: 'lavender',
    color: '#9B8FB5', colorDark: '#7A6D80', colorWash: '#CEC5CF',
    avatar: 'assets/avatars/lavender.webp',
    name: '碎片收藏家',
    tagline: '存了一堆別人看不懂為什麼要存的東西',
    desc: '你的相簿裡有個神秘資料夾：一句歌詞、一段對話截圖、一片剛好很好看的雲。你的記性很任性——正事會忘，但誰三年前隨口說過的一句話，你記得一字不差。你不急著跟世界對話，因為你正忙著把世界上好看的碎片，一片一片撿起來收好。你的溫柔是慢熱型，但保存期限特別長。',
    traits: ['備忘錄比日記還厚', '三年前的聊天紀錄還在', '儀式感重度使用者'],
    books: [
      { title: '查令十字路84號', author: 'Helene Hanff' },
      { title: '呼蘭河傳', author: '蕭紅' },
      { title: '世界上最透明的故事', author: '杉井光' },
    ],
  },
  {
    code: 5, // 慢‧感‧共
    id: 'sienna',
    color: '#DA614F', colorDark: '#A3503E', colorWash: '#EAB0A1',
    avatar: 'assets/avatars/sienna.webp',
    name: '深夜寫信人',
    tagline: '話不多，但對一個人可以說一千字',
    desc: '在人群裡你安靜得像背景，但對在乎的人，你可以在半夜認真打出一千字。你記得對方隨口提過的小事，然後在最對的時機拿出來。大家都說你高冷，只有收過你長訊息的人知道真相：你不是冷，你只是把全部的溫度，留給了少數幾個人。',
    traits: ['聊天紀錄捨不得刪', '送禮必中要害', '一對一才是你的主場'],
    books: [
      { title: '風之影', author: 'Carlos Ruiz Zafón' },
      { title: '小王子', author: '聖修伯里' },
      { title: '摯友', author: 'Sigrid Nunez' },
    ],
  },
  {
    code: 6, // 慢‧思‧獨
    id: 'sage',
    color: '#6B8064', colorDark: '#5B644C', colorWash: '#B9BEAA',
    avatar: 'assets/avatars/sage.webp',
    name: '霧中漫遊者',
    tagline: '想事情想到坐過站的常客',
    desc: '你的腦子裡永遠住著一個還沒想完的問題。別人急著要答案，你卻覺得問題本身比較迷人。你走路慢、回訊息慢、連笑點都慢半拍——因為你在認真思考那個笑話的結構。但跟你深聊過一次的人都會上癮：你給出的，從來不是敷衍的答案。',
    traits: ['洗澡時想通人生大事', '回覆慢但句句認真', '口頭禪：等等，我想一下'],
    books: [
      { title: '薛西弗斯的神話', author: '卡繆' },
      { title: '蘇菲的世界', author: '喬斯坦・賈德' },
      { title: '存在主義咖啡館', author: 'Sarah Bakewell' },
    ],
  },
  {
    code: 7, // 慢‧思‧共
    id: 'amber',
    color: '#F5CD71', colorDark: '#B59654', colorWash: '#F7E1B0',
    avatar: 'assets/avatars/amber.webp',
    name: '人間暖爐',
    tagline: '散掉的群組，你一出手就復活',
    desc: '你天生知道怎麼讓一群人變成「我們」。誰跟誰不對盤、誰最近心情不好，你都默默記在心裡；聚會的座位表會在你腦中自動生成。你不一定是最大聲的那個，但只要你缺席，大家就會覺得今天少了什麼。你的超能力是：讓每個人都覺得自己被穩穩接住。',
    traits: ['群組公告專責發布人', '朋友吵架的官方和事佬', '揪團成功率 100%'],
    books: [
      { title: '我輩中人', author: '張曼娟' },
      { title: '你的孩子不是你的孩子', author: '吳曉樂' },
      { title: '恆毅力', author: 'Angela Duckworth' },
    ],
  },
];

// 合拍規則：麻吉=翻social位；來電=翻pace+motive位(保留social)；相反=翻全部
function flipBit(code, bit) { return code ^ (1 << bit); }
function relations(code) {
  return {
    soulmate: flipBit(code, 0),
    spark: flipBit(flipBit(code, 1), 2),
    opposite: code ^ 0b111,
  };
}

const OPENING = {
  title: '深夜書店',
  sub: '一間只對迷路的人營業的店',
  scene: SCENES.entrance,
  text: '你只是想抄個近路，巷子卻越走越長，路燈也比記憶中多了一盞。\n巷底有一扇木門，門牌上寫著：「深夜書店——本店只對迷路的人營業。」\n奇怪的是，你明明沒有迷路。門，卻自己開了一條縫。',
  cta: '推開門',
};

/* ---- ACT 1（共用，測 Pace：衝動 vs 慢熱）---- */
const ACT1 = [
  {
    scene: SCENES.aisle,
    sfx: 'page',
    narration: '門在你身後自己闔上。一本書突然從架上跳下來，在半空中翻到一半停住——像在等你。',
    prompt: '你的第一反應是？',
    options: [
      { label: '直接撿起來從那頁看下去，都翻好了不看白不看', vote: 0,
        echo: '那一頁的字微微發亮，像在說「就知道你會這樣」。' },
      { label: '先環顧四周，搞清楚這裡到底是哪裡', vote: 1,
        echo: '你數了數，這裡的影子比燈多了一個。' },
      { label: '把書放回架上，從第一排慢慢逛起', vote: 1,
        echo: '書乖乖飛回原位，你聽見它小小聲地嘆了口氣。' },
      { label: '大喊「有人嗎」，邊喊邊往裡面走', vote: 0,
        echo: '沒有人回答，但所有的燈同時亮了一格，像在點頭。' },
    ],
  },
  {
    scene: SCENES.aisle,
    narration: '走道深處有一扇半開的小門，門縫透出金光。門上掛著一塊牌子：「還沒準備好的人，請勿進入。」',
    prompt: '你會？',
    options: [
      { label: '推門就進，管他準備好了沒', vote: 0,
        echo: '門「咿呀」一聲讓開，金光裡有東西笑了一下。' },
      { label: '先從門縫偷看，看清楚再決定', vote: 1,
        echo: '門縫裡的光眨了眨，像是也在偷看你。' },
      { label: '深呼吸三次，數到三……再重數一次', vote: 1,
        echo: '你數到第二輪的「二」，門自己等不及開了。' },
      { label: '把牌子翻過來，看背面寫了什麼', vote: 0,
        echo: '背面用很小的字寫著：「好奇心，就是準備好了的意思。」' },
    ],
  },
  {
    scene: SCENES.aisle,
    narration: '一座沙漏突然浮現在你面前，裡面的沙往上流。沙漏上刻著一行小字：「你可以許願，讓今晚變長，或變短。」',
    prompt: '你對今晚許的願是？',
    options: [
      { label: '變長！好玩的事怎麼可以這麼快結束', vote: 0,
        echo: '沙子流得更快了，好像在替你興奮。' },
      { label: '不動它。今晚該多長，就多長', vote: 1,
        echo: '沙漏安靜下來，沙子改成一粒一粒慢慢飄。' },
      { label: '變短一點點，留些懸念下次再來', vote: 1,
        echo: '沙漏輕輕晃了晃，像在跟你打勾勾。' },
      { label: '把沙漏拿起來轉半圈，看它會怎麼辦', vote: 0,
        echo: '沙子困惑地停在半空，你贏了。' },
    ],
  },
];

const ACT1_TO_ACT2 = {
  0: '書架悄悄向兩旁退開，讓出一條本來不存在的路。\n走道深處傳來很輕的一聲翻頁——\n好像有什麼，已經先替你翻好了下一章。',
  1: '你走得很慢，燈就一盞一盞，陪你慢慢亮。\n整間店靜得像一本攤開的書，停在某一頁——\n它不催你。它知道，你會走到那一行。',
};

/* ---- ACT 2（依 Pace 分兩版，測 Motive：體驗感受 vs 探究意義）---- */
const ACT2 = {
  0: [ // 衝動派的岔路
    {
      scene: SCENES.fork,
      narration: '走道在這裡分成兩邊，各立著一座由書堆成的拱門。左邊的深處傳來很遠的浪聲，和一點點心跳；右邊的深處浮著滿天發光的問號，安靜得像星空。拱門之間懸著一塊小木牌：「一晚，只能走一邊。」',
      prompt: '你走向——',
      options: [
        { label: '往浪聲走——先感覺到什麼，再說', vote: 0,
          echo: '浪聲越來越近，你終於聽出來了——那是你自己的心跳。' },
        { label: '往星星走——我想知道它們為什麼亮', vote: 1,
          echo: '你走進去時，一顆小小的問號輕輕落在你的肩上。' },
      ],
    },
    {
      scene: SCENES.fork,
      narration: '一面魔鏡擋住去路。鏡子裡的你搶先開口：「問吧。今晚我只回答一個問題。」',
      prompt: '你會問——',
      options: [
        { label: '「接下來會發生什麼事？」', vote: 0,
          echo: '鏡中的你笑而不答，只比了一個「跟我來」的手勢。' },
        { label: '「這一切到底是為了什麼？」', vote: 1,
          echo: '鏡中的你想了很久，久到你開始懷疑他也不知道。' },
        { label: '「……等等，你是我？」', vote: 1,
          echo: '鏡中的你反問：「你確定你是你嗎？」你們同時沉默了。' },
        { label: '「這裡最好玩的是哪裡？」', vote: 0,
          echo: '鏡中的你眼睛一亮，往深處指了指，比你還興奮。' },
      ],
    },
    {
      scene: SCENES.fork,
      sfx: 'typewriter',
      narration: '鏡子側過身，替你讓出路。岔路的盡頭有一張小桌，一台老打字機自己喀噠喀噠了起來，替你捲好一張新紙：「離開之前，留下一句話，證明你來過。」',
      prompt: '你留下的是——',
      options: [
        { label: '「超好玩，下次再來！」', vote: 0, sfx: 'typewriter',
          echo: '打字機開心地自己蓋了一個星星章。' },
        { label: '「我還有一個問題沒問完。」', vote: 1, sfx: 'typewriter',
          echo: '打字機停了一下，默默把這句話收進抽屜最深處。' },
        { label: '畫一顆愛心，蓋章走人', vote: 0, sfx: 'typewriter',
          echo: '愛心從紙上浮起來，飄到天花板上和其他愛心作伴。' },
        { label: '「等我想到怎麼形容，再回來寫。」', vote: 1, sfx: 'typewriter',
          echo: '打字機替你留了一整頁空白，還標上你的名字。' },
      ],
    },
  ],
  1: [ // 慢熱派的角落
    {
      scene: SCENES.fork,
      narration: '一張搖椅自己輕輕搖著，旁邊的小木牌寫：「坐下的人，今晚會夢到自己最想要的東西。」你坐了下來，開始想——',
      prompt: '你想夢到的是——',
      options: [
        { label: '一場捨不得醒來的冒險', vote: 0,
          echo: '搖椅搖出了海浪的節奏，你已經聞到夢的味道。' },
        { label: '一個一直沒想通的答案', vote: 1,
          echo: '搖椅慢了下來，像是也跟著你一起沉思。' },
      ],
    },
    {
      scene: SCENES.fork,
      sfx: 'page',
      narration: '一本書輕輕發著抖飄過來，小小聲地說：「我、我會讓你失眠喔……」它又得意地補了一句：「但每個人失眠的原因都不一樣。」',
      prompt: '你猜你會是哪一種失眠？',
      options: [
        { label: '太想知道後來發生什麼事', vote: 0,
          echo: '書得意地抖了抖封面：「那你今晚完蛋了。」' },
        { label: '有一句話在腦子裡走來走去', vote: 1,
          echo: '書小聲說：「那句話在第 89 頁，等你。」' },
        { label: '捨不得裡面的某個人', vote: 0,
          echo: '書忽然安靜下來，輕輕靠了靠你的手心。' },
        { label: '它戳中一件我一直沒想通的事', vote: 1,
          echo: '書認真地說：「那不是我戳的，是你自己帶進來的。」' },
      ],
    },
    {
      scene: SCENES.fork,
      narration: '一張紙條從高處飄下來，是店主的字跡：「離開的時候，只能帶走一樣東西。其他的，會變成星星。」',
      prompt: '你決定帶走——',
      options: [
        { label: '那種心跳漏一拍的感覺', vote: 0,
          echo: '它變成一顆小小的光，鑽進你的口袋裡繼續跳。' },
        { label: '那個還沒想完的問題', vote: 1,
          echo: '問題乖乖跟在你身後，像一隻慢慢走的貓。' },
        { label: '某一個瞬間的畫面', vote: 0,
          echo: '那個畫面自己裱了框，掛進你心裡的某面牆。' },
        { label: '「原來如此」的那一下', vote: 1,
          echo: '那一下亮了一次就不滅了，像口袋裡的小燈。' },
      ],
    },
  ],
};

const ACT2_TO_ACT3 = {
  0: '你懷裡多了一顆小小的、還在跳的光。\n書店更深處，有什麼東西醒了——鈴聲很輕，只響給你聽。',
  1: '那個念頭在你心裡繞到第三圈的時候，\n角落有一盞燈輕輕晃了一下，像在對你招手。',
};

/* ---- ACT 3（依 Motive 分兩版，測 Social：獨享 vs 分享）---- */
const ACT3 = {
  0: [ // 感受派的角落
    {
      scene: SCENES.corner,
      sfx: 'phone',
      narration: '角落那支老電話突然響了兩聲，又安靜下來。話筒下壓著一張紙條：「接起來。另一頭，是今晚同樣迷路進來的另一個人。」',
      prompt: '你會？',
      options: [
        { label: '不接。今晚是我一個人的', vote: 0,
          echo: '電話安靜地陪你坐了一會兒，像個懂事的朋友。' },
        { label: '秒接：「喂？你也在這裡？！」', vote: 1,
          echo: '對面的聲音和你一樣興奮，你們同時笑出來。' },
        { label: '盯著電話，等它再響一次再說', vote: 0,
          echo: '電話沒有再響。它在等你，你也在等它。' },
        { label: '接起來，但先不出聲，聽聽對方是誰', vote: 1,
          echo: '對面也沒出聲。你們安靜地共享了十秒鐘的呼吸。' },
      ],
    },
    {
      scene: SCENES.corner,
      narration: '打烊前，天花板飄下來一盞會飛的小燈，繞著你轉了一圈。燈罩上繡著一行小字：「本燈可容納兩人。」',
      prompt: '你會？',
      options: [
        { label: '帶著燈找個角落，自己窩到最後', vote: 0,
          echo: '燈把光調成剛剛好只夠一個人的大小，很專業。' },
        { label: '提著燈，去找電話那頭的人', vote: 1,
          echo: '燈開心地變亮了一倍，原來它一直想這樣。' },
      ],
    },
    {
      scene: SCENES.corner,
      narration: '出口的留言本自己翻開，一支羽毛筆浮在半空中等你。第一頁寫著：「留下記號的人，會被同一個晚上記住。」',
      prompt: '你會？',
      options: [
        { label: '不留。今晚的事，是我的秘密', vote: 0,
          echo: '留言本輕輕闔上，替你保守了這個秘密。' },
        { label: '留一行字：「找到這行字的人，我們見過同一個晚上」', vote: 1, sfx: 'quill',
          echo: '字跡落下的瞬間泛起微光，像丟進湖裡的一顆小石頭。' },
        { label: '只畫一個小小的圖，看得懂的人自然懂', vote: 1, sfx: 'quill',
          echo: '羽毛筆幫你把圖描得更好看了一點，你們都很滿意。' },
        { label: '把留言本闔上，帶著故事走', vote: 0,
          echo: '留言本沒有生氣。有些故事，本來就不是用寫的。' },
      ],
    },
  ],
  1: [ // 思考派的角落
    {
      scene: SCENES.corner,
      sfx: 'phone',
      narration: '角落那支老電話突然響了兩聲，又安靜下來。話筒下壓著一張紙條：「接起來。另一頭的人，今晚正想著和你同一個問題。」',
      prompt: '你會？',
      options: [
        { label: '不接。這個問題，我要自己想完', vote: 0,
          echo: '電話理解地安靜下來。有些問題確實只能一個人走完。' },
        { label: '接。「你也覺得那件事很怪，對吧？」', vote: 1,
          echo: '對面秒回：「對！我就知道有人跟我想一樣！」' },
        { label: '把紙條翻過來，看背面有沒有提示', vote: 0,
          echo: '背面寫著：「沒有提示。你這種人我們見多了。」' },
        { label: '接起來先問：「你想到哪裡了？」', vote: 1,
          echo: '你們接力把那個問題想到了一個誰都沒到過的地方。' },
      ],
    },
    {
      scene: SCENES.corner,
      narration: '打烊前，天花板飄下來一盞會飛的小燈，繞著你轉了一圈。燈罩上繡著一行小字：「本燈可容納兩人。」',
      prompt: '你會？',
      options: [
        { label: '一個人窩著，把想法慢慢想完', vote: 0,
          echo: '燈替你把光調暗了一格——思考專用的亮度。' },
        { label: '提著燈去找那個人，把兩個腦袋拼在一起', vote: 1,
          echo: '兩個影子在燈下疊在一起，像一個新的想法的形狀。' },
        { label: '自己窩著，但故意把筆記攤開放在桌上', vote: 1,
          echo: '燈懂了，把你的筆記照得特別亮。真有默契。' },
      ],
    },
    {
      scene: SCENES.corner,
      narration: '出口的留言本自己翻開，一支羽毛筆浮在半空中等你。第一頁寫著：「留下記號的人，會被同一個晚上記住。」',
      prompt: '你會？',
      options: [
        { label: '不留。想法還沒長大，先帶回家養', vote: 0,
          echo: '留言本點點頭，替你留了一頁空白，說好了下次見。' },
        { label: '留下一個問題，等某天有人來回答', vote: 1, sfx: 'quill',
          echo: '你的問題在紙上發著微光，像一顆等待被撿到的星星。' },
      ],
    },
  ],
};

const ENDING = [
  { scene: SCENES.dawn, // 0 結局獵人
    text: '天快亮了。你是今晚走得最快的客人，卻在門口停了下來。\n原來你不是急著離開——你只是急著抵達。\n門牌輕輕晃了晃：「下次的結局，也留給你。」' },
  { scene: SCENES.dawn, // 1 尖叫擴音器
    text: '天快亮了。你的口袋裝滿了今晚想說給別人聽的事，多到快要滿出來。\n門在你身後闔上之前，小聲說：\n「快去吧。有人正等著聽。」' },
  { scene: SCENES.dawn, // 2 腦內偵探
    text: '天快亮了。你回頭看了最後一眼——\n這間店的每個祕密你都注意到了，包括它沒說出口的那一個。\n門牌翻了個面：「聰明的客人，下次見。」' },
  { scene: SCENES.dawn, // 3 話題點火師
    text: '天快亮了。你和這間書店辯了一整晚，誰也沒贏，\n但你們都變聰明了一點。\n門牌翻了個面：「歡迎再來吵。」' },
  { scene: SCENES.dawn, // 4 碎片收藏家
    text: '天快亮了。你什麼都沒帶走，只帶走了幾個瞬間。\n但你知道——那幾個瞬間，會活得比整個晚上都久。\n門在你身後，輕輕替你把它們收好。' },
  { scene: SCENES.dawn, // 5 深夜寫信人
    text: '天快亮了。你在留言本的最角落，留了一行只有一個人看得懂的字。\n門輕輕闔上，替你守住了。\n門牌翻了個面：「放心，我不會說。」' },
  { scene: SCENES.dawn, // 6 霧中漫遊者
    text: '天快亮了。你還有一個問題沒想完，走到門口又停下來。\n門牌體貼地翻了個面：\n「慢慢想。本店，不趕客。」' },
  { scene: SCENES.dawn, // 7 人間暖爐
    text: '天快亮了。離開前，你把搖椅擺回原位、把燈調回原本的亮度，\n還順手替下一個迷路的人留了一盞。\n門牌翻了個面：「這間店，喜歡你。」' },
];

if (typeof module !== 'undefined') {
  module.exports = { SCENES, TYPES, OPENING, ACT1, ACT1_TO_ACT2, ACT2, ACT2_TO_ACT3, ACT3, ENDING, relations };
}
