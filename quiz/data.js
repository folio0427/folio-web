/* ================================================================
   深夜書店：閱讀人格測驗 — 內容資料
   軸位元順序：Pace(步調) Motive(動機) Social(社交)
   每軸 0 = 第一極、1 = 第二極
     Pace   0=速讀(fast)   1=慢讀(slow)
     Motive 0=情節(plot)   1=思辨(theme)
     Social 0=獨讀(solo)   1=共讀(share)
   code = pace*4 + motive*2 + social  →  對應 TYPES 陣列索引
   每題 4 個選項：兩個投 0、兩個投 1，選項順序刻意混排。
   scene = { land, port }，由 app.js 依螢幕方向挑選。
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
    code: 0, // 速 情 獨
    id: 'persimmon',
    color: '#E5852A', colorDark: '#AA6726', colorWash: '#EFC090',
    avatar: 'assets/avatars/persimmon.webp',
    name: '疾書夜行客',
    tagline: '熬夜衝完一本，誰打斷都不理',
    desc: '你讀書像在追一場只有自己知道終點的比賽，遇到好看的段落，全世界都可以先等等。比起討論，你更享受一個人把故事看到底的那種暢快。',
    books: [
      { title: '控制', author: 'Gillian Flynn' },
      { title: '活著', author: '余華' },
      { title: '夜晚的潛水艇', author: '陳春成' },
    ],
  },
  {
    code: 1, // 速 情 共
    id: 'blush',
    color: '#EDA6AC', colorDark: '#AF7C7B', colorWash: '#F3CFCB',
    avatar: 'assets/avatars/blush.webp',
    name: '追更尖叫黨',
    tagline: '讀到反轉立刻截圖傳出去',
    desc: '你讀得快、也停不下想講的衝動，看到反轉的當下第一件事就是找人分享。你的書單常常變成朋友之間的共同話題。',
    books: [
      { title: '正常人', author: 'Sally Rooney' },
      { title: '三體', author: '劉慈欣' },
      { title: '82年生的金智英', author: '趙南柱' },
    ],
  },
  {
    code: 2, // 速 思 獨
    id: 'navy',
    color: '#254565', colorDark: '#2D3D4C', colorWash: '#99A4AB',
    avatar: 'assets/avatars/navy.webp',
    name: '拆解偵探',
    tagline: '讀得快也讀得深，邏輯自己拆給自己看',
    desc: '你讀得快、但不是為了追劇情，而是急著把作者想講的東西拆開來看懂。想清楚之前，你更想先自己消化一遍。',
    books: [
      { title: '快思慢想', author: 'Daniel Kahneman' },
      { title: '原子習慣', author: 'James Clear' },
      { title: '人類大歷史', author: '哈拉瑞' },
    ],
  },
  {
    code: 3, // 速 思 共
    id: 'sky',
    color: '#B8D6DF', colorDark: '#7E97A0', colorWash: '#DBE5E2',
    avatar: 'assets/avatars/sky.webp',
    name: '觀點辯士',
    tagline: '讀完就想找人辯論、發文整理重點',
    desc: '你讀完就想找人辯論，一本書對你來說更像是一個討論的起點。你喜歡把讀到的觀點攤開來讓人挑戰。',
    books: [
      { title: '正義：一場思辨之旅', author: 'Michael Sandel' },
      { title: '被討厭的勇氣', author: '岸見一郎' },
      { title: '異數', author: 'Malcolm Gladwell' },
    ],
  },
  {
    code: 4, // 慢 情 獨
    id: 'lavender',
    color: '#9B8FB5', colorDark: '#7A6D80', colorWash: '#CEC5CF',
    avatar: 'assets/avatars/lavender.webp',
    name: '字句收藏家',
    tagline: '一句話反覆讀，抄進筆記本自己收藏',
    desc: '你會為了一句話反覆讀好幾遍，抄進自己的筆記本裡收藏起來。你不急著讀完，也不急著跟誰分享，這份感受先留給自己。',
    books: [
      { title: '查令十字路84號', author: 'Helene Hanff' },
      { title: '呼蘭河傳', author: '蕭紅' },
      { title: '世界上最透明的故事', author: '杉井光' },
    ],
  },
  {
    code: 5, // 慢 情 共
    id: 'sienna',
    color: '#DA614F', colorDark: '#A3503E', colorWash: '#EAB0A1',
    avatar: 'assets/avatars/sienna.webp',
    name: '深夜寫信人',
    tagline: '讀完想寫長長的心得，只給一個人看',
    desc: '你讀得慢，因為捨不得太快讀完，但讀完之後總想寫一封長長的心得，只給一個懂的人看。',
    books: [
      { title: '風之影', author: 'Carlos Ruiz Zafón' },
      { title: '小王子', author: '聖修伯里' },
      { title: '摯友', author: 'Sigrid Nunez' },
    ],
  },
  {
    code: 6, // 慢 思 獨
    id: 'sage',
    color: '#6B8064', colorDark: '#5B644C', colorWash: '#B9BEAA',
    avatar: 'assets/avatars/sage.webp',
    name: '邊界思考者',
    tagline: '難懂的段落反覆咀嚼，筆記寫給未來的自己',
    desc: '難懂的段落你會反覆咀嚼很多遍，寫下的筆記常常是寫給未來的自己看的。你不急著有結論，慢慢想清楚比較重要。',
    books: [
      { title: '薛西弗斯的神話', author: '卡繆' },
      { title: '蘇菲的世界', author: '喬斯坦・賈德' },
      { title: '存在主義咖啡館', author: 'Sarah Bakewell' },
    ],
  },
  {
    code: 7, // 慢 思 共
    id: 'amber',
    color: '#F5CD71', colorDark: '#B59654', colorWash: '#F7E1B0',
    avatar: 'assets/avatars/amber.webp',
    name: '讀書會靈魂',
    tagline: '讀得慢但每次都能整理成能討論的重點',
    desc: '你讀得不快，但每次讀完都能整理出一套可以跟大家討論的重點，天生就是那種把讀書會撐起來的人。',
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
  sub: '9 個選擇，找到你的讀感人格',
  scene: SCENES.entrance,
  text: '你走在巷子裡，看到一盞你從沒注意過的暖黃燈光。推開門，是一間書店，但沒有店員。桌上留著一張紙條：\n「今晚只能待到我回來為止，隨便逛，但每一步都算數。」',
  cta: '推開門',
};

/* ---- ACT 1（共用，測 Pace）---- */
const ACT1 = [
  {
    scene: SCENES.aisle,
    narration: '你走近門邊那張矮桌，桌上擺著一本翻到一半的書，書籤還夾在裡面。',
    prompt: '你會怎麼做？',
    options: [
      { label: '順手拿起來接著讀，想知道後面發生什麼事', vote: 0,
        echo: '書頁還停在你翻開的那一頁，指尖沾了一點油墨味。' },
      { label: '先放回原位，要從頭讀才對得起這本書', vote: 1,
        echo: '那本書安安靜靜躺回桌上，像什麼都沒發生過。' },
      { label: '直接翻到最後幾頁，偷看一眼結局', vote: 0,
        echo: '你偷看了結局，心跳快了半拍，又假裝若無其事。' },
      { label: '把書籤的位置記下來，想著改天慢慢讀', vote: 1,
        echo: '你在心裡記下那一頁，像跟這本書約好了下次。' },
    ],
  },
  {
    scene: SCENES.aisle,
    narration: '沿著書架往裡走，你發現一本書最後幾頁被撕掉了，夾著一張紙條：「結局遺失，你要自己想像，還是下次來再補完？」',
    prompt: '你會？',
    options: [
      { label: '現在就腦補一個結局，先讀完這種爽感', vote: 0,
        echo: '你在心裡編完了自己的結局，滿意地闔上書。' },
      { label: '先擱著，下次來補完整版，不急這幾天', vote: 1,
        echo: '你把書輕輕放回架上，把這個懸念留給下一次。' },
      { label: '馬上找同作者的另一本，把懸念蓋過去', vote: 0,
        echo: '你抽出另一本，翻開第一頁，懸念被新的故事接走了。' },
      { label: '把斷掉的那一行抄下來，回家慢慢想像', vote: 1,
        echo: '你抄下那半句話，紙條放進口袋，像收好一顆種子。' },
    ],
  },
  {
    scene: SCENES.aisle,
    narration: '牆角貼著一張泛黃紙條，是書店主人留的：「這本書我故意不告訴你多長，你猜要多久看完？」',
    prompt: '你會？',
    options: [
      { label: '今晚一定要看完才甘心', vote: 0,
        echo: '你已經開始盤算今晚要看到第幾章。' },
      { label: '慢慢看，看多久算多久', vote: 1,
        echo: '你把書夾進臂彎裡，決定不去想時間這件事。' },
      { label: '先偷估頁數，排一個衝刺計畫', vote: 0,
        echo: '你用指腹量了量書的厚度，訂下一個只有自己知道的期限。' },
      { label: '故意不猜，讓這本書自己決定節奏', vote: 1,
        echo: '你決定把節奏交給這本書，它想走多慢都可以。' },
    ],
  },
];

const ACT1_TO_ACT2 = {
  0: '你翻書的速度比你自己想像得快，書店深處的燈還亮著，好像在等你走過去。',
  1: '你還站在第一排書架前，一點也不急，遠處隱約傳來另一種安靜的氣息。',
};

/* ---- ACT 2（依 Pace 分兩版，測 Motive）---- */
const ACT2 = {
  0: [ // fast lean
    {
      scene: SCENES.fork,
      narration: '走到書店深處，眼前是兩座拱門書架，一邊掛著紙牌「結局你猜不到」，一邊掛著「讀完會讓你想很久」。',
      prompt: '你會走向哪一邊？',
      options: [
        { label: '「結局你猜不到」那邊', vote: 0,
          echo: '你抽出最上面那本，封面燙著一行小字：「你確定要現在知道嗎？」' },
        { label: '「讀完會讓你想很久」那邊', vote: 1,
          echo: '你抽出的那本書很輕，第一頁卻讓你停下來多看了幾秒。' },
        { label: '兩邊各抽一本，但先翻懸疑那本', vote: 0,
          echo: '你左右手各拿一本，翻開的還是那本懸疑。' },
        { label: '站在中間，挑問題問得最尖銳的那本', vote: 1,
          echo: '你挑了一本書名像一句反問的書，還沒翻就開始想答案。' },
      ],
    },
    {
      scene: SCENES.fork,
      narration: '你在一本書裡夾到一張讀者留下的舊書籤，上面寫著幾句不同筆跡的話。',
      prompt: '你比較想成為留下哪句話的人？',
      options: [
        { label: '「我到最後一刻才知道兇手是誰」', vote: 0,
          echo: '你把書籤翻回正面，決定假裝自己還不知道結局。' },
        { label: '「這本書讓我開始懷疑自己一直以來的想法」', vote: 1,
          echo: '你把書籤夾回原本的那一頁，那句話你反覆看了兩次。' },
        { label: '「後半段每一頁都在反轉」', vote: 0,
          echo: '你光看這句話就開始手癢，很想現在就翻到後半段。' },
        { label: '「有一句話，我想了一整個禮拜」', vote: 1,
          echo: '你開始好奇那是哪一句話，好奇到有點羨慕。' },
      ],
    },
    {
      scene: SCENES.fork,
      narration: '出口前有一台老打字機，紙條寫著「打一句你想對這本書說的話」。',
      prompt: '你腦中先跳出的是？',
      options: [
        { label: '「接下來到底會怎樣」的懸念句', vote: 0,
          echo: '打字機喀噠喀噠，你打完那句就迫不及待想翻下一頁。' },
        { label: '「這讓我想到⋯」的感想句', vote: 1,
          echo: '打字機喀噠喀噠，你打到一半停下來想了很久。' },
        { label: '「兇手絕對是那個人」的推理句', vote: 0,
          echo: '你邊打邊笑，賭上了自己的偵探自尊。' },
        { label: '「作者真正想說的是⋯」的解讀句', vote: 1,
          echo: '你打完那句，覺得自己好像更接近這本書一點了。' },
      ],
    },
  ],
  1: [ // slow lean
    {
      scene: SCENES.fork,
      narration: '你在角落找到一張搖椅，旁邊立著一塊小木牌：「你想被什麼樣的書留住？」',
      prompt: '你會？',
      options: [
        { label: '想被劇情帶著走的故事', vote: 0,
          echo: '你在搖椅上坐下，隨手翻開一本，馬上被開頭拉走。' },
        { label: '想被一句話留住的書', vote: 1,
          echo: '你在搖椅上坐下，隨手翻開一本，反覆讀著同一段。' },
        { label: '想遇到捨不得闔上的角色', vote: 0,
          echo: '你翻了幾頁，已經開始擔心某個角色的命運。' },
        { label: '想遇到會改變想法的書', vote: 1,
          echo: '你翻了幾頁，心裡有個想法悄悄鬆動了。' },
      ],
    },
    {
      scene: SCENES.fork,
      narration: '書架最上層有本書探出一角，書脊上手寫著：「這本書讀完會讓你失眠，但原因每個人不一樣。」',
      prompt: '你猜自己會是哪一種失眠？',
      options: [
        { label: '因為很想知道後面發生了什麼', vote: 0,
          echo: '你踮起腳把書抽下來，光是書名就讓你坐立難安。' },
        { label: '因為書裡有一句話放不下', vote: 1,
          echo: '你把書抱在懷裡，開始想像那句話會是什麼。' },
        { label: '因為主角的命運讓人放不下', vote: 0,
          echo: '你還沒翻開，就已經決定要陪這個主角走到最後。' },
        { label: '因為它戳中一個你一直沒想通的問題', vote: 1,
          echo: '你有預感，這本書會把你心裡那個結攤開來。' },
      ],
    },
    {
      scene: SCENES.fork,
      narration: '書店主人另留了一張紙條夾在書裡：「如果只能記住一件事，你想記住的是？」',
      prompt: '你會？',
      options: [
        { label: '那個讓你意想不到的轉折', vote: 0,
          echo: '你把這句話默念了一遍，決定先記住那個轉折。' },
        { label: '那句讓你重新想事情的話', vote: 1,
          echo: '你把這句話默念了一遍，決定把它抄下來。' },
        { label: '那個捨不得說再見的角色', vote: 0,
          echo: '你想起某個角色的名字，嘴角不自覺揚了一下。' },
        { label: '那個它丟給你、你還沒回答的問題', vote: 1,
          echo: '你決定把那個問題帶回家，慢慢還它一個答案。' },
      ],
    },
  ],
};

const ACT2_TO_ACT3 = {
  0: '你開始有點坐不住，好像很想知道接下來會發生什麼事。書店深處傳來一點聲音。',
  1: '你把手上那句話又想了一次，心裡還在消化。書店深處有一盞燈安靜地亮著。',
};

/* ---- ACT 3（依 Motive 分兩版，測 Social）---- */
const ACT3 = {
  0: [ // plot lean
    {
      scene: SCENES.corner,
      narration: '角落有支老電話，紙條寫著「打通這支電話，能跟另一個此刻也在書店裡的人聊聊剛剛看到的轉折」。',
      prompt: '你會？',
      options: [
        { label: '不打，自己先把結局猜完再說', vote: 0,
          echo: '電話安靜地擺在那，你決定自己先把答案想出來。' },
        { label: '打打看，好奇對方猜到哪裡了', vote: 1,
          echo: '電話那頭傳來一個聲音，你們馬上聊起剛剛那個轉折。' },
        { label: '不打，怕一開口就被劇透', vote: 0,
          echo: '你護住手上的書後退一步，像護住一個還沒拆的禮物。' },
        { label: '打了，想確認有沒有人注意到同一個細節', vote: 1,
          echo: '「你也發現那個伏筆了？」對方的聲音聽起來跟你一樣興奮。' },
      ],
    },
    {
      scene: SCENES.corner,
      narration: '打烊前十分鐘，廣播說「還有一盞閱讀燈，可以跟另一位讀者共用，一起讀到最後一頁」。',
      prompt: '你會？',
      options: [
        { label: '自己找角落，結局要自己第一個知道', vote: 0,
          echo: '你找了個安靜的角落，一個人把最後幾頁看完。' },
        { label: '走過去坐旁邊，想看對方讀到同一段的反應', vote: 1,
          echo: '你走過去坐下，兩個人的呼吸聲混在翻頁聲裡。' },
        { label: '自己窩著，精彩處不想被任何人打斷', vote: 0,
          echo: '你把自己縮進椅子裡，整個世界只剩你和這本書。' },
        { label: '走過去，讀完剛好可以立刻對答案', vote: 1,
          echo: '你們同時讀完最後一行，對看了一眼，都笑了。' },
      ],
    },
    {
      scene: SCENES.corner,
      narration: '離開前，留言本問你要不要留下聯絡方式，讓「猜到同個結局的人」能找到你。',
      prompt: '你會？',
      options: [
        { label: '不留，這個結局留給自己就好', vote: 0,
          echo: '你闔上留言本，把這個結局留在心裡就好。' },
        { label: '留了，希望有天有人跟你對答案', vote: 1,
          echo: '你在留言本上留了一行字，希望有天真的有人會回。' },
        { label: '不留，寫下來感覺會破壞餘韻', vote: 0,
          echo: '你把筆放下，讓那份餘韻完整地跟你回家。' },
        { label: '留了，還附上一句「千萬不要先翻結局」', vote: 1,
          echo: '你留下警告的同時，忍不住想像對方看到的表情。' },
      ],
    },
  ],
  1: [ // theme lean
    {
      scene: SCENES.corner,
      narration: '角落有支老電話，紙條寫著「打通這支電話，能跟另一個此刻也在書店裡的人聊聊那句話為什麼打中你」。',
      prompt: '你會？',
      options: [
        { label: '不打，自己安靜想清楚就好', vote: 0,
          echo: '電話安靜地擺在那，你決定自己把這件事想透。' },
        { label: '打打看，好奇對方會怎麼理解那句話', vote: 1,
          echo: '電話那頭傳來一個聲音，你們開始討論那句話在說什麼。' },
        { label: '不打，這種問題要自己跟自己辯論', vote: 0,
          echo: '你在心裡同時扮演正方跟反方，辯得不亦樂乎。' },
        { label: '打了，想找一個跟你想得完全相反的人', vote: 1,
          echo: '對方的第一句話就跟你想的相反，你眼睛亮了起來。' },
      ],
    },
    {
      scene: SCENES.corner,
      narration: '打烊前十分鐘，廣播說「還有一盞閱讀燈，可以跟另一位讀者共用，把彼此的想法說完」。',
      prompt: '你會？',
      options: [
        { label: '自己找角落，把想法寫進筆記本就好', vote: 0,
          echo: '你找了個安靜的角落，把心裡的想法寫進筆記本。' },
        { label: '走過去坐旁邊，想聽聽對方怎麼想', vote: 1,
          echo: '你走過去坐下，兩個人的想法慢慢疊在一起。' },
        { label: '自己窩著，想法還沒成形不想被打擾', vote: 0,
          echo: '你守著那個還沒成形的想法，像守著一撮小火苗。' },
        { label: '走過去，說不定能吵出一個更好的答案', vote: 1,
          echo: '你們一來一往，答案真的長出了新的形狀。' },
      ],
    },
    {
      scene: SCENES.corner,
      narration: '離開前，留言本問你要不要留下聯絡方式，讓「也被同一句話打中的人」能找到你。',
      prompt: '你會？',
      options: [
        { label: '不留，這個想法留給自己就好', vote: 0,
          echo: '你闔上留言本，把這個想法留在心裡就好。' },
        { label: '留了，希望有天有人懂你在說什麼', vote: 1,
          echo: '你在留言本上留了一行字，希望有天真的有人會懂。' },
        { label: '不留，想法會變，現在寫下來太早', vote: 0,
          echo: '你決定讓這個想法再長大一點，才讓它見人。' },
        { label: '留了，還附上一個問題等人回答', vote: 1,
          echo: '你留下一個問題，像在漂流瓶裡放進一張紙條。' },
      ],
    },
  ],
};

const ENDING = {
  0: {
    scene: SCENES.dawn,
    text: '你走到門口，天快亮了。留言本闔著，你沒有留下什麼，但今晚的書店，你會一直記得。',
  },
  1: {
    scene: SCENES.dawn,
    text: '你走到門口，天快亮了。留言本攤開在那，最後一頁寫著：\n「如果有一天你想再回到這種晚上，去找一群也還在深夜讀書的人吧。」',
  },
};

if (typeof module !== 'undefined') {
  module.exports = { SCENES, TYPES, OPENING, ACT1, ACT1_TO_ACT2, ACT2, ACT2_TO_ACT3, ACT3, ENDING, relations };
}
