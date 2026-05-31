const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const SOLFEGE = ["do", "di", "re", "ri", "mi", "fa", "fi", "sol", "si", "la", "li", "ti"];
const ICONS = {
  play: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7Z" /></svg>`,
  pause: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8Z" /><path d="M13 5h3v14h-3Z" /></svg>`,
  stop: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10H7Z" /></svg>`,
  loop: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4" /><path d="M3 11V9a3 3 0 0 1 3-3h15" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a3 3 0 0 1-3 3H3" /></svg>`
};

const EMOTIONS = [
  { id: "joy", name: "喜悦", en: "Joy", plain: "生命狀態全然舒展，靈魂在當下體驗到純粹的圓滿。", color: "#df6a5f" },
  { id: "excitement", name: "興奮", en: "Excitement", plain: "內在能量高度滿溢，迫不及待要投入即將發生的生命體驗。", color: "#e05a9d" },
  { id: "amusement", name: "趣味", en: "Amusement", plain: "在緊繃的現實秩序中，突然發現了荒謬卻安全的裂縫。", color: "#eadf57" },
  { id: "satisfaction", name: "滿足", en: "Satisfaction", plain: "現狀與內在期待完美契合，渴望暫時止息的安詳。", color: "#c9a982" },
  { id: "triumph", name: "成就感", en: "Triumph", plain: "歷經挑戰與對抗後，自我力量得到最高證實的爆發性釋放。", color: "#d89a2f" },
  { id: "admiration", name: "欽佩", en: "Admiration", plain: "在他人身上看到了自身渴望長成的理想模樣。", color: "#9aa85d" },
  { id: "adoration", name: "崇拜", en: "Adoration", plain: "將自我的渺小全然交付給一個崇高或完美的客體。", color: "#9a7656" },
  { id: "aesthetic", name: "欣賞", en: "Aesthetic Appreciation", plain: "內在靈魂與外界的和諧秩序產生了不言而喻的共鳴。", color: "#63b7a6" },
  { id: "interest", name: "興趣", en: "Interest", plain: "好奇心點燃了內在的引力，吸引意識向未知的世界探尋。", color: "#5a9bd8" },
  { id: "entrancement", name: "著迷", en: "Entrancement", plain: "意識全然被某個客體吸納，暫時遺忘了時間與自我的邊界。", color: "#b1799b" },
  { id: "romance", name: "浪漫", en: "Romance", plain: "將理想化的完美相互投射，共同編織一場溫柔的情感幻夢。", color: "#dc7f91" },
  { id: "craving", name: "渴望", en: "Craving", plain: "內在隱蔽的匱乏感，投射成對某個人事物的強烈索求。", color: "#8f6fc8" },
  { id: "sexual", name: "性慾", en: "Sexual Desire", plain: "生命的原始驅力在尋求打破肉體邊界的融合與延續。", color: "#c24b8e" },
  { id: "calmness", name: "平靜", en: "Calmness", plain: "內在與外在的風浪達成和解，回歸生命本源的定錨。", color: "#a9b9ad" },
  { id: "nostalgia", name: "懷舊", en: "Nostalgia", plain: "用帶著濾鏡的記憶，去溫存一段回不去的安全時光。", color: "#c99a72" },
  { id: "sadness", name: "悲傷", en: "Sadness", plain: "靈魂在為已經失去且無法挽回的重要連結進行一場靜默的告別。", color: "#6e8fb8" },
  { id: "empathy", name: "同理", en: "Empathetic Pain", plain: "打破孤立的隔絕，讓另一個生命的痛苦在自身心房裡共振。", color: "#d79ab0" },
  { id: "anxiety", name: "焦慮", en: "Anxiety", plain: "大腦在提前預言並演練一個目前難以接受的不確定未來。", color: "#b69b56" },
  { id: "fear", name: "恐懼", en: "Fear", plain: "生存邊界直接面臨當下可見的威脅，身體發出的最高防禦警報。", color: "#5f83ad" },
  { id: "horror", name: "恐怖", en: "Horror", plain: "目睹了生命秩序與道德底線被殘酷撕裂時的驚駭。", color: "#6b5f87" },
  { id: "anger", name: "憤怒", en: "Anger", plain: "個體邊界受到侵犯時，用火焰般的能量來防禦並宣告主權。", color: "#d73c31" },
  { id: "disgust", name: "厭惡", en: "Disgust", plain: "身心本能地拉起防線，拒絕不潔或有毒的事物進入個體邊界。", color: "#5b8f82" },
  { id: "envy", name: "忮忌", en: "Envy", plain: "在別人的擁有裡，殘忍地照見了自身未被滿足的匱乏。", color: "#5c6f54" },
  { id: "boredom", name: "無聊", en: "Boredom", plain: "生命力失去了聚焦的對象，靈魂在時間的靜止中感到空轉。", color: "#8f9a9c" },
  { id: "confusion", name: "困惑", en: "Confusion", plain: "舊有的認知地圖，無法順利導航眼前出現的全新現實。", color: "#9aa3d2" },
  { id: "awkwardness", name: "尷尬", en: "Awkwardness", plain: "預期的社會形象與當下真實表現產生了不協調的脫節。", color: "#c18aa4" },
  { id: "awe", name: "敬畏", en: "Awe", plain: "在宏大得超越認知的存在面前，體驗到自我的微不足道與溶解。", color: "#7b6682" }
];

const EMOTION_GROUPS = [
  ["joy", "excitement", "amusement", "satisfaction", "triumph"],
  ["admiration", "adoration", "aesthetic", "interest", "entrancement", "awe"],
  ["romance", "craving", "sexual", "calmness", "nostalgia"],
  ["sadness", "empathy", "anxiety", "fear", "horror"],
  ["anger", "disgust", "envy", "boredom", "confusion", "awkwardness"]
];

const EMOTION_GRADIENT_POINTS = [
  ["22%", "30%", "40%"],
  ["72%", "24%", "42%"],
  ["54%", "78%", "44%"],
  ["16%", "72%", "38%"],
  ["84%", "68%", "40%"],
  ["42%", "18%", "36%"],
  ["66%", "50%", "38%"],
  ["32%", "54%", "40%"],
  ["88%", "36%", "34%"]
];

const CHOICES = {
  language: [
    { label: "中文主體", value: "中文", desc: "歌詞主要用中文，押韻與意象也先按中文處理。" },
    { label: "加入英文", value: "中文+English", desc: "保留中文主體，參考英文尾音、短詞和流行歌詞感。" },
    { label: "加入日文", value: "中文+日本語", desc: "保留中文主體，借日語音節、尾音和意象做押韻參考。" },
    { label: "加入韓文", value: "中文+한국어", desc: "保留中文主體，借韓語尾音和 K-pop 式語感做參考。" }
  ],
  dialect: [
    { label: "國語發音", value: "國語發音", desc: "用普通話/國語的韻母判斷押韻。" },
    { label: "粵語口味", value: "粵語口味", desc: "更重視粵語尾音與口語詞，例如 -oi、-ong、-aan 的韻味。" },
    { label: "台語/閩南語", value: "台語/閩南語", desc: "用台語/閩南語的語氣和尾音找更地方感的詞。" },
    { label: "四川話口味", value: "四川話口味", desc: "加入四川話口語節奏與幽默感，押韻可更鬆。" }
  ],
  narrator: [
    { label: "我對你說", value: "第一人稱，像把心事直接唱給某個人", desc: "最像日記或私信，情緒直接、親密。" },
    { label: "對你低語", value: "第二人稱，像在對聽眾或對方低聲說話", desc: "一直對著某個「你」唱，適合告白、質問、告別。" },
    { label: "電影旁白", value: "旁觀者視角，像電影旁白一樣描述故事", desc: "不急著說我愛你或我難過，而是先拍出場景。" },
    { label: "多年後回看", value: "回憶視角，像多年後回看一段關係", desc: "帶距離感，適合懷舊、悲傷、釋然。" },
    { label: "雙人對話", value: "雙人對話，像兩個角色輪流把話唱出來", desc: "適合關係拉扯、和解、互相誤會的故事。" },
    { label: "群像旁白", value: "群像視角，像把一群人的共同情緒唱出來", desc: "適合青春、城市、舞台感，主角不只是一個人。" }
  ],
  lyricStyle: [
    { label: "口語親密", value: "口語、親密、克制", desc: "像真的在說話，詞不要太華麗，適合小白快速完成。" },
    { label: "詩性留白", value: "詩性、意象密集、留白", desc: "畫面感重，不把意思說滿，適合氛圍型歌曲。" },
    { label: "電影敘事", value: "敘事、電影感、具體場景", desc: "像剪一段短片，先有場景、人物和動作。" },
    { label: "宣言節奏", value: "直接、宣言式、強節奏", desc: "句子短、態度明確，適合搖滾、Hip-Hop、舞曲。" },
    { label: "冷感短句", value: "冷感、短句、少形容詞", desc: "像把情緒壓住不說破，適合暗色或高級感方向。" },
    { label: "幽默口語", value: "幽默、生活化、帶一點自嘲", desc: "適合輕快、趣味、尷尬或荒謬感的題材。" }
  ],
  songStructure: [
    { label: "流行完整", value: "Verse - Pre Chorus - Chorus - Verse - Chorus - Bridge - Chorus", desc: "主歌鋪陳，副歌爆點，最通用的完整歌結構。" },
    { label: "電子流行", value: "Intro - Verse - Chorus - Drop - Verse - Chorus - Outro", desc: "有 Drop，適合節拍和氛圍推進。" },
    { label: "Hook 循環", value: "Verse - Hook - Verse - Hook - Bridge - Hook", desc: "重複核心句，適合洗腦、副歌短的歌。" },
    { label: "日系 AABA", value: "A - A' - B - A''", desc: "段落像變奏，旋律和情緒慢慢轉開。" },
    { label: "短歌速寫", value: "Intro - Verse - Chorus - Outro", desc: "少段落、快進入重點，適合片段靈感先成形。" },
    { label: "雙副歌推進", value: "Verse - Pre Chorus - Chorus A - Chorus B - Bridge - Chorus B", desc: "副歌分兩層，適合情緒逐步放大的歌。" }
  ],
  promptFormat: [
    { label: "完整提示詞", value: "professional", desc: "給 AI 音樂工具的完整描述，包含情緒、歌詞、編曲。" },
    { label: "短版提示詞", value: "compact", desc: "比較短，適合貼到限制字數的平台。" },
    { label: "API JSON", value: "json", desc: "給工程接 API 用的資料格式，不是一般使用者必讀。" }
  ],
  providerTarget: [
    { label: "Suno", value: "Suno", desc: "預設平台。可搭配右下角 M 插件，把四個系統筆記帶到 Suno 旁邊看。" },
    { label: "Gemini / Lyria", value: "Gemini Lyria", desc: "偏研究與 Google 生態的音樂生成方向，提示詞會保留較完整的結構。" },
    { label: "Udio", value: "Udio", desc: "偏完整歌曲生成平台，適合把歌詞與風格描述一起貼過去。" },
    { label: "其他工具", value: "其他 AI 音樂工具", desc: "保留通用寫法，之後可以照平台限制再縮短。" }
  ],
  providerMode: [
    { label: "複製到平台", value: "manual", desc: "目前最穩：先生成提示詞，再貼到目標平台。" },
    { label: "後端 API", value: "api", desc: "正式產品才用。API key 放伺服器，前端不直接碰鑰匙。" },
    { label: "自動送出", value: "webhook", desc: "未來流程：整理完後自動送任務，完成後回傳音頻。" }
  ],
  negativePrompt: [
    { label: "乾淨人聲", value: "低清晰度人聲、口齒不清、雜訊、過度混響", desc: "優先避免聽不清楚或糊在一起的人聲。" },
    { label: "自然編曲", value: "突兀轉調、刺耳高頻、低頻糊成一團、過度壓縮", desc: "避免編曲忽然跳走，整體比較順。" },
    { label: "不要太滿", value: "過多樂器、過度堆疊、搶人聲的音效、過度花俏", desc: "讓主旋律和歌詞留出空間。" },
    { label: "保守安全", value: "低清晰度人聲、雜訊、突兀轉調、過度混響、過多樂器", desc: "通用預設，適合第一次生成。" }
  ]
};

const PROVIDER_LINKS = {
  Suno: "https://suno.com/",
  "Gemini Lyria": "https://labs.google/fx/tools/music-fx",
  Udio: "https://www.udio.com/"
};

const EMPTY_CHORD = {
  id: "no-chord",
  title: "不使用和弦",
  style: "已明確選擇留空",
  moodTags: [],
  color: "#8da7c9",
  bpm: null,
  chords: [],
  notes: [],
  empty: true
};

const EMPTY_DRUM = {
  id: "no-drum",
  title: "不使用鼓點",
  style: "已明確選擇留空",
  moodTags: [],
  color: "#c9a06f",
  bpm: null,
  pattern: [],
  empty: true
};

const CHORD_PRESETS = [
  {
    id: "city-pop",
    title: "City Pop 夜行",
    style: "明亮、都市、復古",
    moodTags: ["joy", "interest", "romance", "aesthetic", "satisfaction"],
    color: "#4fa6d8",
    bpm: 104,
    chords: ["Fmaj7", "Em7", "Dm7", "G13"],
    notes: [[65, 69, 72, 76], [64, 67, 71, 74], [62, 65, 69, 72], [55, 59, 65, 69]]
  },
  {
    id: "bedroom",
    title: "Bedroom Pop 雨窗",
    style: "溫柔、低飽和、親密",
    moodTags: ["sadness", "nostalgia", "calmness", "empathy", "romance"],
    color: "#6f86a8",
    bpm: 82,
    chords: ["Cmaj7", "Am7", "Fmaj7", "G6"],
    notes: [[60, 64, 67, 71], [57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 64]]
  },
  {
    id: "future-rnb",
    title: "Future R&B 浮動",
    style: "迷幻、絲滑、低頻",
    moodTags: ["entrancement", "craving", "sexual", "awe", "romance"],
    color: "#8b6ee8",
    bpm: 92,
    chords: ["Dm9", "G13", "Cmaj9", "A7sus"],
    notes: [[62, 65, 69, 72, 76], [55, 59, 65, 69, 72], [60, 64, 67, 71, 74], [57, 62, 64, 67]]
  },
  {
    id: "rock",
    title: "Alt Rock 推進",
    style: "直接、宣言、動態",
    moodTags: ["anger", "triumph", "fear", "excitement", "disgust"],
    color: "#c2654f",
    bpm: 128,
    chords: ["Em", "C", "G", "D"],
    notes: [[52, 55, 59], [48, 52, 55], [55, 59, 62], [50, 54, 57]]
  },
  {
    id: "ballad",
    title: "Piano Ballad 長信",
    style: "抒情、空間、慢慢推開",
    moodTags: ["sadness", "empathy", "nostalgia", "calmness"],
    color: "#e3b866",
    bpm: 72,
    chords: ["Am", "F", "C", "G"],
    notes: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
  },
  {
    id: "dream-pop",
    title: "Dream Pop 雲層",
    style: "漂浮、朦朧、寬闊",
    moodTags: ["awe", "entrancement", "confusion", "aesthetic"],
    color: "#9bc2ee",
    bpm: 96,
    chords: ["Cadd9", "G", "Em7", "Dsus4"],
    notes: [[60, 62, 67, 74], [55, 59, 62, 67], [52, 55, 59, 62], [50, 55, 57, 62]]
  },
  {
    id: "neo-soul",
    title: "Neo Soul 暖燈",
    style: "鬆弛、和聲濃、近距離",
    moodTags: ["romance", "craving", "sexual", "adoration"],
    color: "#c1846a",
    bpm: 88,
    chords: ["Bbmaj9", "Am7", "D7b9", "Gm9"],
    notes: [[58, 62, 65, 69, 72], [57, 60, 64, 67], [50, 54, 60, 63], [55, 58, 62, 65, 69]]
  },
  {
    id: "anthem",
    title: "Anthem 開場",
    style: "開闊、上升、群像感",
    moodTags: ["triumph", "admiration", "joy", "excitement"],
    color: "#efb53f",
    bpm: 118,
    chords: ["G", "D", "Em", "C"],
    notes: [[55, 59, 62], [50, 54, 57], [52, 55, 59], [48, 52, 55]]
  }
];

const DRUM_PRESETS = [
  {
    id: "lofi",
    title: "Lo-Fi Pocket",
    style: "鬆弛、搖擺",
    moodTags: ["calmness", "nostalgia", "boredom", "sadness"],
    color: "#94b58a",
    bpm: 82,
    pattern: ["K", "H", "", "H", "S", "H", "", "H", "K", "H", "K", "H", "S", "", "H", ""]
  },
  {
    id: "dance",
    title: "Four On Floor",
    style: "舞曲、穩定",
    moodTags: ["joy", "excitement", "triumph", "satisfaction"],
    color: "#b95d8b",
    bpm: 122,
    pattern: ["K", "H", "H", "H", "K", "S", "H", "H", "K", "H", "H", "H", "K", "S", "H", "H"]
  },
  {
    id: "trap",
    title: "Trap Half-Time",
    style: "暗色、重拍",
    moodTags: ["anger", "fear", "craving", "envy", "horror"],
    color: "#77607b",
    bpm: 140,
    pattern: ["K", "H", "", "H", "", "H", "S", "H", "K", "H", "", "H", "K", "H", "S", "H"]
  },
  {
    id: "jpop",
    title: "J-Pop Drive",
    style: "開闊、推進",
    moodTags: ["interest", "admiration", "excitement", "awe"],
    color: "#4f9bb2",
    bpm: 154,
    pattern: ["K", "H", "K", "H", "S", "H", "K", "H", "K", "H", "K", "H", "S", "H", "K", "H"]
  },
  {
    id: "ballad-6-8",
    title: "6/8 Ballad",
    style: "慢搖、抒情",
    moodTags: ["sadness", "empathy", "nostalgia", "adoration"],
    color: "#8ca0c8",
    bpm: 72,
    pattern: ["K", "", "H", "S", "", "H", "K", "", "H", "S", "", "H", "K", "", "H", "S"]
  },
  {
    id: "uk-garage",
    title: "UK Garage Skip",
    style: "跳動、明亮",
    moodTags: ["amusement", "joy", "interest", "excitement"],
    color: "#6fbeb8",
    bpm: 132,
    pattern: ["K", "", "H", "H", "", "S", "H", "", "K", "H", "", "H", "", "S", "H", "H"]
  },
  {
    id: "afro-pop",
    title: "Afro Pop Swing",
    style: "律動、暖色、身體感",
    moodTags: ["satisfaction", "joy", "romance", "aesthetic"],
    color: "#d99a58",
    bpm: 108,
    pattern: ["K", "H", "", "H", "K", "", "S", "H", "", "H", "K", "H", "", "S", "H", ""]
  },
  {
    id: "ambient-pulse",
    title: "Ambient Pulse",
    style: "克制、空間、心跳感",
    moodTags: ["calmness", "awe", "entrancement", "fear"],
    color: "#8f9db5",
    bpm: 68,
    pattern: ["K", "", "", "H", "", "", "S", "", "K", "", "", "H", "", "", "S", ""]
  }
];

const LYRIC_BANKS = {
  "中文": {
    rhymes: {
      ang: ["遠方", "月光", "空房", "回響", "倔強", "滾燙"],
      ai: ["窗外", "告白", "塵埃", "偏愛", "等待", "醒來"],
      an: ["晚安", "靠岸", "遺憾", "轉彎", "答案", "勇敢"],
      default: ["海", "來", "愛", "白", "在", "開"]
    },
    images: ["便利店白光", "雨後柏油路", "末班車玻璃", "耳機裡的潮汐", "沒寄出的信", "天橋上的風"],
    synonyms: ["想念: 惦記 / 牽掛 / 回望", "孤獨: 空落 / 靜默 / 失重", "告別: 鬆手 / 離場 / 轉身"]
  },
  "English": {
    rhymes: {
      ight: ["midnight", "streetlight", "rewrite", "satellite", "hold tight", "soft light"],
      ay: ["runaway", "yesterday", "decay", "stay", "grey", "sway"],
      default: ["fire", "higher", "wire", "desire", "choir", "tired"]
    },
    images: ["neon laundromat", "rain on concrete", "cheap headphones", "unanswered calls", "blue motel sign", "static on the radio"],
    synonyms: ["lonely: isolated / hollow / weightless", "love: devotion / gravity / pull", "leave: drift / disappear / let go"]
  },
  "日本語": {
    rhymes: {
      "あい": ["未来", "曖昧", "期待", "嫌い", "願い", "みたい"],
      "お": ["鼓動", "街灯", "残像", "感情", "透明", "夜行"],
      default: ["夢", "雨", "声", "影", "夜", "風"]
    },
    images: ["終電のホーム", "濡れたアスファルト", "コンビニの光", "ほどけたイヤホン", "名前のない朝", "青い信号"],
    synonyms: ["さみしい: 孤独 / 空っぽ / ひとり", "好き: 愛しい / 眩しい / 離せない", "別れ: さよなら / 手放す / 遠ざかる"]
  },
  "한국어": {
    rhymes: {
      "아": ["바다", "남아", "따라", "알아", "살아", "하나"],
      "요": ["멈춰요", "잊어요", "웃어요", "불러요", "흘러요", "기다려요"],
      default: ["밤", "맘", "빛", "길", "비", "숨"]
    },
    images: ["새벽 편의점", "젖은 횡단보도", "꺼진 휴대폰", "창문 위 빗방울", "마지막 지하철", "희미한 간판"],
    synonyms: ["그리움: 보고픔 / 미련 / 남은 마음", "외로움: 공허 / 침묵 / 빈자리", "이별: 안녕 / 놓아주기 / 멀어짐"]
  }
};

const JAPANESE_ROMAJI = {
  "未来": "mirai", "曖昧": "aimai", "期待": "kitai", "嫌い": "kirai", "願い": "negai", "みたい": "mitai",
  "鼓動": "kodou", "街灯": "gaitou", "残像": "zanzou", "感情": "kanjou", "透明": "toumei", "夜行": "yakou",
  "夢": "yume", "雨": "ame", "声": "koe", "影": "kage", "夜": "yoru", "風": "kaze",
  "終電のホーム": "shuuden no hoomu", "濡れたアスファルト": "nureta asufaruto", "コンビニの光": "konbini no hikari",
  "ほどけたイヤホン": "hodoketa iyahon", "名前のない朝": "namae no nai asa", "青い信号": "aoi shingou",
  "古い写真の裏": "furui shashin no ura", "灯りを消した部屋": "akari o keshita heya", "戻れない駅": "modorenai eki",
  "点滅する廊下の灯り": "tenmetsu suru rouka no akari", "手のひらの冷たい汗": "te no hira no tsumetai ase",
  "不在着信": "fuzai chakushin", "近づく息": "chikazuku iki", "半分開いたカーテン": "hanbun hiraita kaaten",
  "指先のためらい": "yubisaki no tamerai", "輝き出す群衆": "kagayakidasu gunshuu", "朝の風": "asa no kaze",
  "トンネルを抜ける光": "tonneru o nukeru hikari", "静かな水面": "shizuka na suimen", "巨大な夜空": "kyodai na yozora",
  "ゆっくり落ちる光": "yukkuri ochiru hikari", "焦げた手紙": "kogeta tegami", "固く閉じた扉": "kataku tojita tobira",
  "まぶしい白い壁": "mabushii shiroi kabe"
};

const REFERENCE_MEANINGS = {
  English: {
    midnight: "午夜", streetlight: "街燈", rewrite: "重寫", satellite: "衛星", "hold tight": "緊緊抓住", "soft light": "柔光",
    runaway: "逃離", yesterday: "昨天", decay: "腐壞/褪色", stay: "留下", grey: "灰色", sway: "搖晃",
    fire: "火", higher: "更高", wire: "線", desire: "渴望", choir: "合唱", tired: "疲憊",
    lonely: "孤獨", love: "愛", leave: "離開",
    "neon laundromat": "霓虹洗衣店", "rain on concrete": "落在水泥地上的雨", "cheap headphones": "廉價耳機",
    "unanswered calls": "未接/未回電話", "blue motel sign": "藍色汽車旅館招牌", "static on the radio": "收音機雜訊"
  },
  "日本語": {
    "未来": "未來", "曖昧": "曖昧", "期待": "期待", "嫌い": "討厭", "願い": "願望", "みたい": "像是",
    "鼓動": "心跳", "街灯": "街燈", "残像": "殘像", "感情": "感情", "透明": "透明", "夜行": "夜行",
    "夢": "夢", "雨": "雨", "声": "聲音", "影": "影子", "夜": "夜晚", "風": "風",
    "さみしい": "寂寞", "好き": "喜歡", "別れ": "離別"
  },
  "한국어": {
    "바다": "海", "남아": "留下", "따라": "跟隨", "알아": "知道", "살아": "活著", "하나": "一個",
    "멈춰요": "停下", "잊어요": "忘記", "웃어요": "微笑", "불러요": "呼喚/唱", "흘러요": "流動", "기다려요": "等待",
    "밤": "夜晚", "맘": "心", "빛": "光", "길": "路", "비": "雨", "숨": "呼吸",
    "그리움": "想念", "외로움": "孤獨", "이별": "離別",
    "새벽 편의점": "凌晨便利店", "젖은 횡단보도": "濕掉的人行橫道", "꺼진 휴대폰": "關掉的手機",
    "창문 위 빗방울": "窗上的雨滴", "마지막 지하철": "末班地鐵", "희미한 간판": "模糊的招牌"
  }
};

const STOP_WORDS = new Set([
  "this", "that", "with", "from", "have", "just", "into", "they", "them", "your", "ours",
  "the", "and", "but", "for", "not", "you", "are", "was", "were", "what", "when", "then",
  "可以", "自己", "沒有", "一个", "一個", "這個", "这个", "那個", "那个", "以及", "就是",
  "因為", "因为", "所以", "如果", "但是", "可是", "然後", "然后", "而且", "或者", "我們",
  "我们", "你們", "你们", "他們", "他们", "什麼", "什么", "覺得", "觉得", "希望", "很多",
  "一些", "一點", "一点", "比較", "比较", "其實", "其实", "真的", "可能", "應該", "应该",
  "不是", "不要", "不能", "不用", "直接", "部分", "地方", "東西", "东西", "這些", "这些",
  "那些", "後來", "后来", "之前", "之後", "之后", "現在", "现在", "今天", "明天", "昨天",
  "突然", "一直", "已經", "已经", "還是", "还是", "只是", "只有", "一起", "開始", "开始",
  "因而", "並且", "并且", "以及", "其後", "其后", "當下", "当下", "每個", "每个", "某個",
  "某个", "所有", "全部", "任何", "一切", "覺", "得", "想", "說", "说", "看", "聽", "听",
  "走", "來", "来", "去", "做", "給", "给", "讓", "让", "被", "把", "有",
  "附近", "這裡", "这里", "上面", "面前", "真正", "樣子", "样子", "應該", "应该", "還", "还",
  "幹什麼", "干什么", "認識", "认识", "建築", "建筑", "韓星海報", "韩星海报", "外牆做", "外墙做",
  "寄出", "打開", "打开", "聽見", "听见", "看見", "看见", "想起", "等待",
  "する", "いる", "ある", "こと", "それ", "これ", "そして", "でも", "から",
  "그리고", "하지만", "있는", "없는", "것은", "나는", "너는"
]);

const CJK_SPLIT_RE = /(?:的|之|了|著|着|過|过|在|把|被|讓|让|和|與|与|跟|同|及|或|但|而|就|又|也|都|很|更|最|還|还|會|会|能|可|要|想|說|说|看|聽|听|到|從|从|往|向|給|给|為|为|於|于|是|有|不|沒|没|無|无)+/u;
const CJK_TRIM_RE = /^(我們|我们|你們|你们|他們|他们|我|你|他|她|它|一個|一个|這個|这个|那個|那个|某個|某个|很多|一些|一點|一点|突然|一直|只是|只有|已經|已经|還是|还是|可以|希望|覺得|觉得|想要|想|要|會|会|很|更|最|在|把|被|讓|让|給|给|為|为|和|與|与|跟|但|而|就|又|也|都|有)|([一二三四五六七八九十兩两\d]+[點点]|裡|里|上|下|中|內|内|外|後|后|前|著|着|了|過|过|們|们)$/gu;
const CJK_KEYWORD_ENDINGS = [
  "便利店", "耳機", "車站", "房間", "回憶", "道歉", "告別", "霓虹", "走廊", "天橋", "人群", "照片", "城市", "名字",
  "聲音", "沉默", "擁抱", "呼吸", "影子", "白光", "玻璃", "耳語", "心跳", "裂縫", "答案", "邊界", "願望", "火焰",
  "潮汐", "清晨", "凌晨", "雨聲", "雨声", "月光", "夜色", "信紙", "信纸", "街燈", "街灯", "路口", "月台", "海邊",
  "末班車", "末班车", "冷汗", "口袋", "走廊燈", "走廊灯", "閃爍", "闪烁", "未接來電", "未接来电", "白牆", "白墙",
  "下雨", "雨停", "冷風", "冷风", "晚風", "晚风", "夜風", "夜风", "海風", "海风", "道歉信",
  "漫步", "聖水洞", "圣水洞", "昏暗", "巷子", "穿越", "白天", "繁華", "繁华", "中心", "商圈",
  "看不懂", "韓語", "韩语", "大樓梯", "大楼梯", "韓星", "韩星", "海報", "海报", "也不知道",
  "練習", "练习", "休息", "睡覺", "睡觉", "打遊戲", "打游戏", "都沒有見過", "都没有见过",
  "營業中", "营业中"
];
const CJK_KEEP_PHRASES = new Set([
  "凌晨三點", "凌晨三点", "凌晨二點", "凌晨二点", "凌晨兩點", "凌晨两点",
  "漫步", "聖水洞", "圣水洞", "昏暗", "巷子", "穿越", "白天", "繁華", "繁华", "中心", "商圈",
  "看不懂", "韓語", "韩语", "大樓梯", "大楼梯", "韓星", "韩星", "海報", "海报", "也不知道",
  "練習", "练习", "休息", "睡覺", "睡觉", "打遊戲", "打游戏", "都沒有見過", "都没有见过",
  "營業中", "营业中"
]);
const CJK_IMAGERY_RE = /[雨風风海月夜光夢梦心眼手窗街城房門门霓虹信橋桥火雪星雲云潮浪聲声影霧雾玻璃耳]/u;
const LEGACY_TRIUMPH_LABEL = "\u52dd\u5229\u611f";

const state = {
  sourceBuffer: null,
  sourceName: "",
  ideas: [],
  keywordMap: new Map(),
  deletedKeywords: new Set(),
  activeIdeaFilters: new Set(),
  lastIdeaId: "",
  promptReturnScroll: 0,
  selectedMoods: new Set(),
  lyricMoods: new Set(),
  analysis: null,
  selectedChord: null,
  selectedDrum: null,
  arrangementStep: "top",
  arrangementAuditioned: false,
  lyricRecommendations: { rhymes: [], images: [], synonyms: [] },
  isArrangementLooping: false,
  audioNodes: [],
  audioTimers: []
};

let audioContext;
let masterGain;
let mediaRecorder;
let recordedChunks = [];
let recordingAnalyser;
let recordingSource;
let recordingAnimationId;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function init() {
  bindEvents();
  restoreIdeas();
  renderChoiceGroups();
  renderEmotionPicker("#moodPicker", state.selectedMoods, "idea");
  renderEmotionPicker("#lyricMoodPicker", state.lyricMoods, "lyrics");
  renderIdeaFilter();
  applyEmotionTheme();
  applyArrangementTheme();
  applyInspirationPanelTheme();
  renderChordCards();
  renderDrumCards();
  renderIdeas();
  renderKeywords();
  drawEmptyWaveform();
  drawEmptyScore();
  recommendLyrics();
  updatePrompt();
  updateProgress();
  setupPanelJumps();
  window.addEventListener("scroll", updateFloatingJump, { passive: true });
  window.addEventListener("resize", updateFloatingJump);
  $("#floatingJumpButton").addEventListener("click", jumpToNextPanel);
  $("#returnPromptButton").addEventListener("click", returnToPrompt);
}

function bindEvents() {
  $$("[data-module-target]").forEach((button) => {
    button.addEventListener("click", () => {
      openModule(button.dataset.moduleTarget);
    });
  });

  $("#backHomeButton").addEventListener("click", () => {
    document.body.classList.remove("in-app");
    applyEmotionTheme();
    $("#floatingJumpButton").hidden = true;
    $("#returnPromptButton").hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  $("#audioFile").addEventListener("change", handleAudioFile);
  $("#analyzeButton").addEventListener("click", analyzeLoadedAudio);
  $("#playInputButton").addEventListener("click", playInputAudio);
  $("#recordButton").addEventListener("click", startRecording);
  $("#stopRecordButton").addEventListener("click", stopRecording);
  $("#applyNotationButton").addEventListener("click", applyNotationPreview);

  $("#saveIdeaButton").addEventListener("click", saveIdea);
  $("#cancelEditButton").addEventListener("click", cancelIdeaEdit);
  $("#clearIdeasButton").addEventListener("click", clearIdeas);
  const recommendLyricsButton = $("#recommendLyricsButton");
  if (recommendLyricsButton) recommendLyricsButton.addEventListener("click", recommendLyrics);
  $("#draftLyricsButton").addEventListener("click", draftLyrics);
  $("#globalLoopButton").addEventListener("click", toggleArrangementLoop);
  $("#globalStopButton").addEventListener("click", stopScheduledAudio);
  $("#playComboButton").addEventListener("click", () => playArrangementCombo({ loop: false }));
  $("#loopComboButton").addEventListener("click", toggleArrangementLoop);
  $("#stopAudioButton").addEventListener("click", stopScheduledAudio);
  $("#generatePromptButton").addEventListener("click", updatePrompt);
  $("#copyPromptButton").addEventListener("click", copyPrompt);
  $("#copyPluginDataButton").addEventListener("click", copyPluginData);

  ["projectTitle", "targetLang", "lyricStyle", "songStructure", "themeInput", "narratorInput", "rhymeInput", "negativePrompt", "providerMode", "providerName", "promptFormat", "lyricsDraft", "dialectInput"].forEach((id) => {
    const element = document.getElementById(id);
    element.addEventListener("input", () => {
      if (["targetLang", "rhymeInput", "themeInput", "narratorInput", "lyricStyle", "songStructure", "dialectInput"].includes(id)) recommendLyrics();
      updatePrompt();
      updateProgress();
      updateFloatingJump();
    });
  });
}

function openModule(moduleId) {
  document.body.classList.add("in-app");
  if (moduleId === "arrangement") state.arrangementStep = "top";
  $$(".module-panel").forEach((panel) => panel.classList.toggle("active", panel.id === moduleId));
  $$("[data-module-target]").forEach((button) => button.classList.toggle("active", button.dataset.moduleTarget === moduleId));
  applyEmotionTheme();
  const activePanel = document.getElementById(moduleId);
  if (activePanel) window.scrollTo({ top: 0, behavior: "smooth" });
  updateFloatingJump();
}

function setupPanelJumps() {
  $$(".panel-jump").forEach((button) => button.remove());
  updateFloatingJump();
}

function isAheadOfViewport(element, offset = 118) {
  return Boolean(element && element.getBoundingClientRect().top > offset);
}

function getWorkflowJumpAction() {
  const activePanel = $(".module-panel.active");
  if (!activePanel) return null;
  const moduleId = activePanel.id;
  if (moduleId === "humming") {
    const scorePanel = $("#humming .score-panel");
    if (isAheadOfViewport(scorePanel)) return { label: "下一頁 · 旋律預覽", target: scorePanel };
    return { label: "下一頁 · 編曲", module: "arrangement" };
  }
  if (moduleId === "inspiration") {
    const libraryPanel = $("#inspiration .idea-library-panel");
    if (isAheadOfViewport(libraryPanel)) return { label: "下一頁 · 靈感原文", target: libraryPanel };
    return { label: "下一頁 · 歌詞", module: "lyrics" };
  }
  if (moduleId === "arrangement") {
    const chordColumn = $("#arrangement .chord-column");
    const drumColumn = $("#arrangement .drum-column");
    if (state.arrangementStep === "top") {
      if (state.arrangementAuditioned && hasPlayableArrangement()) return { label: "下一頁 · 靈感", module: "inspiration" };
      return { label: "下一頁 · 和弦", target: chordColumn, arrangementStep: "chord" };
    }
    if (state.arrangementStep === "chord") {
      if (!hasChordChoice()) return { label: "回到本頁開頭", target: activePanel, arrangementStep: "top" };
      return { label: "下一頁 · 鼓點", target: drumColumn, arrangementStep: "drum" };
    }
    if (hasDrumChoice() && hasPlayableArrangement()) {
      return { label: "回到頂部 · 播放選中", target: activePanel, arrangementStep: "top", highlightPlay: true };
    }
    return { label: "回到本頁開頭", target: activePanel, arrangementStep: "top" };
  }
  if (moduleId === "lyrics") {
    return { label: "下一頁 · 提示詞", module: "prompt" };
  }
  if (moduleId === "prompt") {
    const workbench = $("#promptWorkbench");
    if (isAheadOfViewport(workbench)) return { label: "下一頁 · 輸出設定", target: workbench };
    const provider = getProviderTarget();
    const label = provider === "Suno" ? "下一頁 · Suno（插件可用）" : `下一頁 · ${provider}`;
    return { label, external: true };
  }
  return null;
}

function updateFloatingJump() {
  const button = $("#floatingJumpButton");
  if (!button) return;
  if (!document.body.classList.contains("in-app")) {
    button.hidden = true;
    return;
  }
  const action = getWorkflowJumpAction();
  button.hidden = !action;
  button.textContent = action?.label || "下一頁";
  button.title = action?.external && getProviderTarget() === "Suno"
    ? "會打開 Suno。Suno 頁面右下角 M 插件可以一起查看四個系統筆記。"
    : "";
}

function jumpToNextPanel() {
  const action = getWorkflowJumpAction();
  if (!action) return;
  if (action.module) {
    openModule(action.module);
    return;
  }
  if (action.external) {
    openTargetProvider();
    return;
  }
  if (action.arrangementStep) {
    state.arrangementStep = action.arrangementStep;
    updateFloatingJump();
  }
  action.target?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (action.highlightPlay) window.setTimeout(() => flashElement("#playComboButton"), 360);
  window.setTimeout(updateFloatingJump, 260);
}

function getProviderTarget() {
  return $("#providerName")?.value || "Suno";
}

function openTargetProvider() {
  const provider = getProviderTarget();
  const url = PROVIDER_LINKS[provider];
  if (!url) {
    copyPrompt();
    toast("提示詞已準備好，可貼到你選的 AI 音樂工具。");
    return;
  }
  window.open(url, "_blank", "noopener");
  toast(provider === "Suno" ? "已打開 Suno。右下角 M 插件可同步查看系統筆記。" : `已打開 ${provider}。`);
}

function returnToPrompt() {
  openModule("prompt");
  window.setTimeout(() => window.scrollTo({ top: state.promptReturnScroll || 0, behavior: "smooth" }), 80);
  $("#returnPromptButton").hidden = true;
}

function jumpFromPrompt(moduleId, selector) {
  state.promptReturnScroll = window.scrollY;
  openModule(moduleId);
  const button = $("#returnPromptButton");
  if (button) button.hidden = false;
  window.setTimeout(() => {
    const target = selector ? document.querySelector(selector) : document.getElementById(moduleId);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 120);
}

function renderEmotionPicker(selector, selectedSet, scope) {
  const target = $(selector);
  const emotionById = new Map(EMOTIONS.map((emotion) => [emotion.id, emotion]));
  const groupedIds = new Set(EMOTION_GROUPS.flat());
  const groups = EMOTION_GROUPS.concat([EMOTIONS.filter((emotion) => !groupedIds.has(emotion.id)).map((emotion) => emotion.id)].filter((group) => group.length));
  target.innerHTML = groups.map((group) => {
    const chips = group.map((id) => {
      const emotion = emotionById.get(id);
      if (!emotion) return "";
      const active = selectedSet.has(emotion.id) ? " active" : "";
      return `<button type="button" class="mood-chip${active}" style="--chip-color: ${emotion.color}" data-scope="${scope}" data-emotion-id="${emotion.id}" data-tooltip="${escapeHtml(emotion.name)}（${escapeHtml(emotion.en)}）：${escapeHtml(emotion.plain)}">${escapeHtml(emotion.name)}</button>`;
    }).join("");
    return `<div class="mood-row">${chips}</div>`;
  }).join("");
  target.querySelectorAll(".mood-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.emotionId;
      if (selectedSet.has(id)) selectedSet.delete(id);
      else selectedSet.add(id);
      renderEmotionPicker(selector, selectedSet, scope);
      if (scope === "idea") {
        renderIdeaFilter();
        applyInspirationPanelTheme();
      }
      applyEmotionTheme();
      renderChordCards();
      renderDrumCards();
      recommendLyrics();
      updatePrompt();
      updateProgress();
    });
  });
}

function renderChoiceGroups() {
  renderChoiceGroup("#languageChoices", "#targetLang", CHOICES.language);
  renderChoiceGroup("#dialectChoices", "#dialectInput", CHOICES.dialect);
  renderChoiceGroup("#narratorChoices", "#narratorInput", CHOICES.narrator);
  renderChoiceGroup("#lyricStyleChoices", "#lyricStyle", CHOICES.lyricStyle);
  renderChoiceGroup("#songStructureChoices", "#songStructure", CHOICES.songStructure);
  renderChoiceGroup("#promptFormatChoices", "#promptFormat", CHOICES.promptFormat);
  renderChoiceGroup("#providerChoices", "#providerName", CHOICES.providerTarget);
  renderChoiceGroup("#providerModeChoices", "#providerMode", CHOICES.providerMode);
  renderChoiceGroup("#negativePromptChoices", "#negativePrompt", CHOICES.negativePrompt);
}

function renderChoiceGroup(containerSelector, inputSelector, choices) {
  const container = $(containerSelector);
  const input = $(inputSelector);
  container.innerHTML = choices.map((choice) => {
    const active = input.value === choice.value ? " active" : "";
    return `<button type="button" class="choice-card${active}" data-choice-value="${escapeHtml(choice.value)}" data-input-target="${inputSelector}">
      <strong>${escapeHtml(choice.label)}</strong>
      <small>${escapeHtml(choice.desc)}</small>
    </button>`;
  }).join("");
  container.querySelectorAll(".choice-card").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.choiceValue;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      renderChoiceGroup(containerSelector, inputSelector, choices);
    });
  });
}

function applyEmotionTheme() {
  const ids = [...new Set([...state.lyricMoods])];
  const colors = ids.map((id) => EMOTIONS.find((emotion) => emotion.id === id)?.color).filter(Boolean);
  document.body.classList.toggle("emotion-active", colors.length > 0);
  const strength = document.body.classList.contains("in-app") ? 18 : 26;
  const background = colors.length
    ? colors.map((color, index) => {
      const [x, y, radius] = EMOTION_GRADIENT_POINTS[index % EMOTION_GRADIENT_POINTS.length];
      const opacity = Math.max(16, strength - Math.floor(index / EMOTION_GRADIENT_POINTS.length) * 5);
      return `radial-gradient(circle at ${x} ${y}, color-mix(in srgb, ${color} ${opacity}%, transparent), transparent ${radius})`;
    }).join(", ")
    : "none";
  const [a, b, c] = colors.length
    ? [colors[0], colors[1] || colors[0], colors[2] || colors[1] || colors[0]]
    : ["#ffffff", "#ffffff", "#ffffff"];
  document.documentElement.style.setProperty("--emotion-a", a);
  document.documentElement.style.setProperty("--emotion-b", b);
  document.documentElement.style.setProperty("--emotion-c", c);
  document.documentElement.style.setProperty("--emotion-bg", background);
}

function applyArrangementTheme() {
  document.documentElement.style.setProperty("--selected-chord-color", state.selectedChord?.color || "#8da7c9");
  document.documentElement.style.setProperty("--selected-drum-color", state.selectedDrum?.color || "#c9a06f");
  updateArrangementControls();
}

function hasChordChoice() {
  return state.selectedChord !== null;
}

function hasDrumChoice() {
  return state.selectedDrum !== null;
}

function hasPlayableChord() {
  return Boolean(state.selectedChord && !state.selectedChord.empty);
}

function hasPlayableDrum() {
  return Boolean(state.selectedDrum && !state.selectedDrum.empty);
}

function hasPlayableArrangement() {
  return hasPlayableChord() || hasPlayableDrum();
}

function markArrangementChanged() {
  state.arrangementAuditioned = false;
  applyArrangementTheme();
  updatePrompt();
  updateProgress();
  updateFloatingJump();
}

function flashElement(selector) {
  const element = $(selector);
  if (!element) return;
  element.classList.remove("attention-pulse");
  void element.offsetWidth;
  element.classList.add("attention-pulse");
  window.setTimeout(() => element.classList.remove("attention-pulse"), 1300);
}

function updateArrangementControls() {
  const hasSelection = hasPlayableArrangement();
  const playButton = $("#playComboButton");
  const loopButton = $("#loopComboButton");
  if (playButton) {
    playButton.disabled = !hasSelection;
    playButton.innerHTML = `${ICONS.play}${hasPlayableChord() && hasPlayableDrum() ? "和弦+鼓點" : "播放選中"}`;
  }
  if (loopButton) {
    loopButton.disabled = !hasSelection;
    loopButton.innerHTML = state.isArrangementLooping ? `${ICONS.stop}停止循環` : `${ICONS.loop}循環背景`;
  }
}

function applyInspirationPanelTheme() {
  const editorColors = getEmotionColors(state.selectedMoods);
  const libraryColors = getEmotionColors(state.activeIdeaFilters);
  const editorColor = editorColors[0] || "#f1c84f";
  const libraryColor = libraryColors[0] || "#f1c84f";
  document.documentElement.style.setProperty("--idea-editor-color", editorColor);
  document.documentElement.style.setProperty("--idea-library-color", libraryColor);
  document.documentElement.style.setProperty("--idea-editor-bg", buildSoftPanelGradient(editorColors, "#ffffff"));
  document.documentElement.style.setProperty("--idea-library-bg", buildSoftPanelGradient(libraryColors, "#ffffff"));
}

function getEmotionColors(ids) {
  return [...ids].map((id) => EMOTIONS.find((emotion) => emotion.id === id)?.color).filter(Boolean);
}

function buildSoftPanelGradient(colors, base) {
  if (!colors.length) {
    return `linear-gradient(180deg, color-mix(in srgb, #f1c84f 10%, ${base}), rgba(255, 255, 255, 0.94))`;
  }
  const washes = colors.slice(0, 6).map((color, index) => {
    const [x, y, radius] = EMOTION_GRADIENT_POINTS[index % EMOTION_GRADIENT_POINTS.length];
    return `radial-gradient(circle at ${x} ${y}, color-mix(in srgb, ${color} 18%, transparent), transparent ${radius})`;
  });
  return `${washes.join(", ")}, linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.95))`;
}

async function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.9;
    masterGain.connect(audioContext.destination);
  }
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  return audioContext;
}

function getAudioDestination() {
  return masterGain || audioContext.destination;
}

async function handleAudioFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const ctx = await getAudioContext();
    const buffer = await file.arrayBuffer();
    state.sourceBuffer = await ctx.decodeAudioData(buffer.slice(0));
    state.sourceName = file.name;
    $("#fileLabel").textContent = file.name;
    $("#analyzeButton").disabled = false;
    $("#playInputButton").disabled = false;
    renderWaveform(state.sourceBuffer);
    toast("音頻已載入");
  } catch (error) {
    console.error(error);
    toast("無法解析此音頻文件");
  }
}

async function startRecording() {
  try {
    const ctx = await getAudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    startLiveWaveform(stream, ctx);
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) recordedChunks.push(event.data);
    });
    mediaRecorder.addEventListener("stop", async () => {
      stream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || "audio/webm" });
      await loadRecordedBlob(blob);
    });
    mediaRecorder.start();
    $("#recordButton").disabled = true;
    $("#stopRecordButton").disabled = false;
    $("#recordState").textContent = "錄音中";
  } catch (error) {
    console.error(error);
    toast("麥克風權限未開啟");
  }
}

function stopRecording() {
  if (!mediaRecorder || mediaRecorder.state === "inactive") return;
  mediaRecorder.stop();
  stopLiveWaveform();
  $("#recordButton").disabled = false;
  $("#stopRecordButton").disabled = true;
  $("#recordState").textContent = "處理中";
}

function startLiveWaveform(stream, ctx) {
  stopLiveWaveform();
  recordingAnalyser = ctx.createAnalyser();
  recordingAnalyser.fftSize = 2048;
  recordingSource = ctx.createMediaStreamSource(stream);
  recordingSource.connect(recordingAnalyser);
  drawLiveWaveform();
}

function drawLiveWaveform() {
  if (!recordingAnalyser) return;
  const canvas = $("#waveCanvas");
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  const data = new Uint8Array(recordingAnalyser.fftSize);
  recordingAnalyser.getByteTimeDomainData(data);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  drawGrid(ctx, width, height, "#ececec");
  ctx.strokeStyle = "#111111";
  ctx.lineWidth = 2;
  ctx.beginPath();
  data.forEach((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = (value / 255) * height;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  recordingAnimationId = requestAnimationFrame(drawLiveWaveform);
}

function stopLiveWaveform() {
  if (recordingAnimationId) cancelAnimationFrame(recordingAnimationId);
  recordingAnimationId = null;
  if (recordingSource) recordingSource.disconnect();
  recordingSource = null;
  recordingAnalyser = null;
}

async function loadRecordedBlob(blob) {
  try {
    const ctx = await getAudioContext();
    const data = await blob.arrayBuffer();
    state.sourceBuffer = await ctx.decodeAudioData(data.slice(0));
    state.sourceName = "recorded-hum.webm";
    $("#recordState").textContent = `${formatTime(state.sourceBuffer.duration)} 已錄製`;
    $("#analyzeButton").disabled = false;
    $("#playInputButton").disabled = false;
    renderWaveform(state.sourceBuffer);
    toast("錄音已載入");
  } catch (error) {
    console.error(error);
    $("#recordState").textContent = "解析失敗";
    toast("錄音解析失敗");
  }
}

async function playInputAudio() {
  if (!state.sourceBuffer) return;
  const ctx = await getAudioContext();
  stopScheduledAudio();
  const source = ctx.createBufferSource();
  source.buffer = state.sourceBuffer;
  const gain = ctx.createGain();
  gain.gain.value = 0.95;
  source.connect(gain).connect(getAudioDestination());
  source.start();
  state.audioNodes.push(source);
  setAudioState("正在播放你放入的原音。");
}

function analyzeLoadedAudio() {
  if (!state.sourceBuffer) return;
  const analysis = analyzeAudioBuffer(state.sourceBuffer);
  state.analysis = analysis;
  $("#tempoMetric").textContent = analysis.bpm ? Math.round(analysis.bpm) : "--";
  $("#keyMetric").textContent = analysis.key || "--";
  $("#durationMetric").textContent = formatTime(state.sourceBuffer.duration);
  $("#noteCount").textContent = analysis.notes.length;
  updateMelodySummary(analysis);
  renderScore(analysis);
  updatePrompt();
  updateProgress();
  toast("旋律分析完成");
}

function applyNotationPreview() {
  const raw = $("#notationInput").value.trim();
  if (!raw) {
    toast("先輸入一段簡譜");
    return;
  }
  const degreeToMidi = { "1": 60, "2": 62, "3": 64, "4": 65, "5": 67, "6": 69, "7": 71 };
  const tokens = raw.match(/[1-7][-']*|-|\|/g) || [];
  const notes = [];
  let time = 0;
  tokens.forEach((token) => {
    if (token === "|") return;
    if (token === "-") {
      time += 0.5;
      return;
    }
    const degree = token[0];
    let midi = degreeToMidi[degree];
    const up = (token.match(/'/g) || []).length;
    const down = (token.match(/-/g) || []).length;
    midi += up * 12 - down * 12;
    notes.push({
      midi,
      time,
      duration: 0.48,
      weight: 0.7,
      index: notes.length,
      name: midiToName(midi),
      solfege: SOLFEGE[((midi % 12) + 12) % 12]
    });
    time += 0.5;
  });
  if (!notes.length) {
    toast("暫時只支援 1-7 和延音 - 的簡譜草稿");
    return;
  }
  state.analysis = { notes, bpm: 120, key: "C Major", duration: Math.max(time, 1) };
  $("#tempoMetric").textContent = 120;
  $("#keyMetric").textContent = "C Major";
  $("#durationMetric").textContent = formatTime(state.analysis.duration);
  updateMelodySummary(state.analysis);
  renderScore(state.analysis);
  updatePrompt();
  updateProgress();
  toast("已套用簡譜預覽");
}

function analyzeAudioBuffer(buffer) {
  const sampleRate = buffer.sampleRate;
  const data = getMonoData(buffer);
  const duration = buffer.duration;
  const windowSize = Math.floor(sampleRate * 0.18);
  const hop = Math.floor(sampleRate * 0.11);
  const rmsValues = [];
  const rawNotes = [];

  for (let start = 0; start + windowSize < data.length; start += hop) {
    const slice = data.subarray(start, start + windowSize);
    rmsValues.push(rootMeanSquare(slice));
  }
  const sortedRms = rmsValues.slice().sort((a, b) => a - b);
  const noiseHint = sortedRms[Math.floor(sortedRms.length * 0.35)] || 0;
  const peakHint = sortedRms[sortedRms.length - 1] || 0;
  const dynamicFloor = Math.min(Math.max(noiseHint * 1.35, peakHint * 0.055), peakHint * 0.22);
  const rmsFloor = Math.max(0.0035, dynamicFloor || 0);

  for (let start = 0; start + windowSize < data.length; start += hop) {
    const slice = data.subarray(start, start + windowSize);
    const rms = rootMeanSquare(slice);
    if (rms < rmsFloor) continue;
    const detected = detectPitch(slice, sampleRate);
    if (!detected) continue;
    const pitch = detected.frequency;
    if (!pitch || pitch < 55 || pitch > 1200) continue;
    const midi = Math.round(69 + 12 * Math.log2(pitch / 440));
    const time = start / sampleRate;
    rawNotes.push({ midi, pitch, time, duration: hop / sampleRate, rms, confidence: detected.confidence });
  }

  const notes = mergeNotes(rawNotes);
  const bpm = estimateTempo(data, sampleRate, duration, notes);
  const key = inferKey(notes);
  return { notes, bpm, key, duration, rmsFloor };
}

function getMonoData(buffer) {
  const length = buffer.length;
  const channelCount = Math.min(buffer.numberOfChannels, 2);
  const mono = new Float32Array(length);
  for (let channel = 0; channel < channelCount; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i += 1) mono[i] += data[i] / channelCount;
  }
  return mono;
}

function rootMeanSquare(samples) {
  let sum = 0;
  for (let i = 0; i < samples.length; i += 1) sum += samples[i] * samples[i];
  return Math.sqrt(sum / samples.length);
}

function detectPitch(samples, sampleRate) {
  const size = samples.length;
  let bestOffset = -1;
  let bestCorrelation = 0;
  const correlations = new Map();
  let mean = 0;
  for (let i = 0; i < size; i += 1) mean += samples[i];
  mean /= size;
  const minOffset = Math.floor(sampleRate / 900);
  const maxOffset = Math.floor(sampleRate / 55);
  for (let offset = minOffset; offset <= maxOffset; offset += 1) {
    let correlation = 0;
    let energyA = 0;
    let energyB = 0;
    for (let i = 0; i < size - offset; i += 1) {
      const a = samples[i] - mean;
      const b = samples[i + offset] - mean;
      correlation += a * b;
      energyA += a * a;
      energyB += b * b;
    }
    correlation /= Math.sqrt(energyA * energyB) || 1;
    correlations.set(offset, correlation);
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
  }
  if (bestCorrelation < 0.28 || bestOffset < 0) return null;
  while (bestOffset / 2 >= minOffset) {
    const halfOffset = Math.round(bestOffset / 2);
    const halfCorrelation = correlations.get(halfOffset) || 0;
    if (halfCorrelation < bestCorrelation * 0.88) break;
    bestOffset = halfOffset;
    bestCorrelation = halfCorrelation;
  }
  return { frequency: sampleRate / bestOffset, confidence: bestCorrelation };
}

function mergeNotes(rawNotes) {
  if (!rawNotes.length) return [];
  const merged = [];
  for (const note of rawNotes) {
    const last = merged[merged.length - 1];
    if (last && Math.abs(last.midi - note.midi) <= 1 && note.time - (last.time + last.duration) < 0.18) {
      const totalWeight = last.weight + note.rms;
      last.midi = Math.round((last.midi * last.weight + note.midi * note.rms) / totalWeight);
      last.duration = note.time + note.duration - last.time;
      last.weight = totalWeight;
    } else {
      merged.push({ midi: note.midi, time: note.time, duration: note.duration, weight: note.rms });
    }
  }
  return merged
    .filter((note) => note.duration > 0.075)
    .slice(0, 80)
    .map((note, index) => ({
      ...note,
      index,
      name: midiToName(note.midi),
      solfege: SOLFEGE[((note.midi % 12) + 12) % 12]
    }));
}

function estimateTempo(data, sampleRate, duration, notes) {
  const frame = 1024;
  const hop = 512;
  const energies = [];
  for (let i = 0; i + frame < data.length; i += hop) {
    energies.push(rootMeanSquare(data.subarray(i, i + frame)));
  }
  const avg = energies.reduce((sum, value) => sum + value, 0) / Math.max(energies.length, 1);
  const peaks = [];
  for (let i = 1; i < energies.length - 1; i += 1) {
    if (energies[i] > avg * 1.35 && energies[i] > energies[i - 1] && energies[i] > energies[i + 1]) {
      peaks.push((i * hop) / sampleRate);
    }
  }
  const intervals = [];
  for (let i = 1; i < peaks.length; i += 1) {
    const interval = peaks[i] - peaks[i - 1];
    if (interval >= 0.28 && interval <= 1.5) intervals.push(interval);
  }
  if (intervals.length) {
    const median = intervals.sort((a, b) => a - b)[Math.floor(intervals.length / 2)];
    const bpm = 60 / median;
    if (bpm >= 55 && bpm <= 190) return bpm;
    if (bpm < 55) return bpm * 2;
    if (bpm > 190) return bpm / 2;
  }
  if (notes.length > 2 && duration > 0) {
    const noteRate = notes.length / duration;
    return clamp(noteRate * 60 * 0.62, 64, 146);
  }
  return null;
}

function inferKey(notes) {
  if (!notes.length) return null;
  const counts = new Array(12).fill(0);
  notes.forEach((note) => {
    counts[((note.midi % 12) + 12) % 12] += Math.max(0.4, note.duration);
  });
  let bestIndex = 0;
  counts.forEach((value, index) => {
    if (value > counts[bestIndex]) bestIndex = index;
  });
  const minorHint = [0, 3, 7].reduce((sum, offset) => sum + counts[(bestIndex + offset) % 12], 0);
  const majorHint = [0, 4, 7].reduce((sum, offset) => sum + counts[(bestIndex + offset) % 12], 0);
  return `${NOTE_NAMES[bestIndex]} ${majorHint >= minorHint ? "Major" : "Minor"}`;
}

function midiToName(midi) {
  const name = NOTE_NAMES[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${name}${octave}`;
}

function buildSyllableAdvice(analysis) {
  if (!analysis?.notes?.length) return "--";
  const notes = analysis.notes.length;
  const phraseCount = Math.max(2, Math.round(analysis.duration / 4));
  const perPhrase = Math.max(4, Math.round(notes / phraseCount));
  const shortLine = clamp(perPhrase - 1, 4, 12);
  const longLine = clamp(perPhrase + 2, 6, 16);
  const tempoText = analysis.bpm ? `速度約 ${Math.round(analysis.bpm)}` : "自由速度";
  return `${tempoText}，可切成 ${phraseCount} 句；每句 ${shortLine}-${longLine} 字較貼合，副歌可保留 1-2 個長音給關鍵詞。`;
}

function updateMelodySummary(analysis) {
  const hasNotes = Boolean(analysis?.notes?.length);
  $("#syllableAdvice").textContent = hasNotes ? buildSyllableAdvice(analysis) : "--";
  const note = $("#analysisNote");
  if (note) {
    note.textContent = hasNotes
      ? ""
      : "暫時沒有抓到穩定音高；這常見於錄音環境、哼唱泛音太少或起音太軟，不一定是你唱太小。可以靠近麥克風、單聲部哼唱 8 秒以上，或用進階簡譜先補旋律。";
  }
}

function renderWaveform(buffer) {
  const canvas = $("#waveCanvas");
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  drawGrid(ctx, width, height, "#ececec");

  const data = getMonoData(buffer);
  const step = Math.max(1, Math.floor(data.length / width));
  ctx.strokeStyle = "#111111";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < width; x += 1) {
    let min = 1;
    let max = -1;
    const start = x * step;
    for (let i = 0; i < step; i += 1) {
      const value = data[start + i] || 0;
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
    ctx.moveTo(x, (1 + min) * height * 0.5);
    ctx.lineTo(x, (1 + max) * height * 0.5);
  }
  ctx.stroke();
}

function drawEmptyWaveform() {
  const canvas = $("#waveCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawGrid(ctx, canvas.width, canvas.height, "#ececec");
  ctx.fillStyle = "#667078";
  ctx.font = "18px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("音頻波形", canvas.width / 2, canvas.height / 2 + 6);
}

function renderScore(analysis) {
  const canvas = $("#scoreCanvas");
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  drawStaff(ctx, width, height);

  if (!analysis.notes.length) {
    ctx.fillStyle = "#667078";
    ctx.font = "18px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("未檢測到穩定音高", width / 2, height / 2);
    return;
  }

  const minMidi = Math.min(...analysis.notes.map((note) => note.midi)) - 2;
  const maxMidi = Math.max(...analysis.notes.map((note) => note.midi)) + 2;
  const xScale = width / Math.max(analysis.duration, 1);
  const pitchRange = Math.max(maxMidi - minMidi, 8);

  ctx.fillStyle = "#111111";
  ctx.strokeStyle = "#111111";
  ctx.lineWidth = 2;
  analysis.notes.forEach((note) => {
    const x = clamp(note.time * xScale, 26, width - 28);
    const y = height - 44 - ((note.midi - minMidi) / pitchRange) * (height - 86);
    const w = clamp(note.duration * xScale, 12, 96);
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y, w / 2, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (w > 28) {
      ctx.fillStyle = "#202326";
      ctx.font = "12px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(note.name, x + w / 2, y - 13);
      ctx.fillStyle = "#111111";
    }
  });
}

function drawEmptyScore() {
  const canvas = $("#scoreCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawStaff(ctx, canvas.width, canvas.height);
  ctx.fillStyle = "#667078";
  ctx.font = "18px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("旋律預覽", canvas.width / 2, canvas.height / 2 + 6);
  const note = $("#analysisNote");
  if (note) note.textContent = "";
}

function drawStaff(ctx, width, height) {
  ctx.strokeStyle = "#dadada";
  ctx.lineWidth = 1;
  const top = Math.max(38, Math.round(height * 0.24));
  const gap = Math.max(16, Math.round((height - top - 34) / 4));
  for (let line = 0; line < 5; line += 1) {
    const y = top + line * gap;
    ctx.beginPath();
    ctx.moveTo(18, y);
    ctx.lineTo(width - 18, y);
    ctx.stroke();
  }
  for (let x = 52; x < width; x += 92) {
    ctx.strokeStyle = "#eeeeee";
    ctx.beginPath();
    ctx.moveTo(x, Math.max(24, top - 28));
    ctx.lineTo(x, height - 22);
    ctx.stroke();
  }
}

function drawGrid(ctx, width, height, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 54) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 45) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function saveIdea() {
  const text = $("#ideaInput").value.trim();
  if (!text) {
    toast("先寫下一段靈感");
    return;
  }
  const moods = getSelectedEmotionLabels(state.selectedMoods);
  const editingId = $("#editingIdeaId").value;
  const now = new Date().toISOString();
  if (editingId) {
    const idea = state.ideas.find((item) => item.id === editingId);
    if (!idea) return;
    idea.history = idea.history || [];
    idea.history.push({
      at: now,
      text: idea.text,
      moods: idea.moods || []
    });
    idea.text = text;
    idea.moods = moods;
    idea.updatedAt = now;
    state.lastIdeaId = idea.id;
    rebuildKeywordMap();
    toast("靈感已更新");
  } else {
    const idea = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      text,
      moods,
      createdAt: now,
      updatedAt: now,
      history: []
    };
    state.ideas.unshift(idea);
    state.lastIdeaId = idea.id;
    extractKeywords(text).forEach((word) => addKeyword(word, moods));
    toast("靈感已加入");
  }
  persistIdeas();
  resetIdeaEditor();
  renderIdeaFilter();
  renderIdeas();
  renderKeywords();
  recommendLyrics();
  updatePrompt();
  updateProgress();
}

function clearIdeas() {
  state.ideas = [];
  state.keywordMap.clear();
  state.deletedKeywords.clear();
  state.activeIdeaFilters.clear();
  state.lastIdeaId = "";
  persistIdeas();
  resetIdeaEditor();
  renderIdeaFilter();
  renderIdeas();
  renderKeywords();
  updatePrompt();
  updateProgress();
  toast("靈感已清空");
}

function resetIdeaEditor() {
  $("#editingIdeaId").value = "";
  $("#ideaInput").value = "";
  $("#saveIdeaButton").innerHTML = `<span aria-hidden="true">+</span>加入靈感`;
  $("#cancelEditButton").disabled = true;
  $("#editModeNote").textContent = "新增一條靈感。";
}

function cancelIdeaEdit() {
  resetIdeaEditor();
}

function editIdea(id) {
  const idea = state.ideas.find((item) => item.id === id);
  if (!idea) return;
  state.selectedMoods = new Set((idea.moods || []).map((mood) => {
    const emotion = EMOTIONS.find((item) => item.name === mood || item.id === mood);
    return emotion?.id;
  }).filter(Boolean));
  $("#editingIdeaId").value = idea.id;
  $("#ideaInput").value = idea.text;
  $("#saveIdeaButton").innerHTML = `<span aria-hidden="true">✓</span>保存修改`;
  $("#cancelEditButton").disabled = false;
  $("#editModeNote").textContent = `正在編輯：建立於 ${formatDateTime(idea.createdAt)}`;
  renderEmotionPicker("#moodPicker", state.selectedMoods, "idea");
  applyInspirationPanelTheme();
  openModule("inspiration");
}

function deleteIdea(id) {
  state.ideas = state.ideas.filter((item) => item.id !== id);
  rebuildKeywordMap();
  persistIdeas();
  renderIdeaFilter();
  renderIdeas();
  renderKeywords();
  updatePrompt();
  updateProgress();
}

function rebuildKeywordMap() {
  state.keywordMap.clear();
  state.ideas.forEach((idea) => {
    const moods = Array.isArray(idea.moods) ? idea.moods : [];
    extractKeywords(idea.text).forEach((word) => addKeyword(word, moods));
  });
}

function extractKeywords(text) {
  const scores = new Map();
  const addCandidate = (raw, score = 1) => {
    const word = cleanKeyword(raw);
    if (!isUsefulWord(word)) return;
    const protectedBonus = isProtectedKeyword(word) ? 4 : 0;
    scores.set(word, (scores.get(word) || 0) + score + protectedBonus);
  };

  extractCjkPhrases(text).forEach((word) => addCandidate(word, 2));
  const segmenter = "Segmenter" in Intl ? new Intl.Segmenter(["zh", "en", "ja", "ko"], { granularity: "word" }) : null;
  if (segmenter) {
    for (const part of segmenter.segment(text)) {
      if (part.isWordLike === false) continue;
      addCandidate(part.segment, /[\u3400-\u9fff]/u.test(part.segment) ? 1.4 : 1);
    }
  } else {
    const matches = text.match(/[A-Za-z]{3,}|[\u3400-\u9fff]{2,}|[\u3040-\u30ff]{2,}|[\uac00-\ud7af]{2,}/g) || [];
    matches.forEach((word) => addCandidate(word, 1));
  }

  const words = [...scores.keys()];
  return words
    .filter((word) => !hasBetterPhrase(word, words))
    .sort((a, b) => scores.get(b) - scores.get(a) || keywordQuality(b) - keywordQuality(a) || a.localeCompare(b))
    .slice(0, 24);
}

function cleanKeyword(value) {
  const original = String(value).trim().toLowerCase();
  if (isProtectedKeyword(original)) {
    return original
      .replace(/[「」『』“”"'[\]{}<>《》]/gu, "")
      .trim();
  }
  return original
    .trim()
    .replace(/[「」『』“”"'()[\]{}<>《》]/gu, "")
    .replace(/^[一二三四五六七八九十兩两幾几\d]+[點点]/u, "")
    .replace(CJK_TRIM_RE, "")
    .trim();
}

function isUsefulWord(word) {
  if (!word || STOP_WORDS.has(word)) return false;
  if (isProtectedKeyword(word)) return true;
  if (/^\p{P}+$/u.test(word) || /^\d+$/u.test(word)) return false;
  if (/^[一二三四五六七八九十兩两幾几\d]+[點点年月日時分秒號号]$/u.test(word)) return false;
  if (/^[a-z]+$/i.test(word) && word.length < 3) return false;
  if (/^[\u3400-\u9fff]+$/.test(word)) {
    if (word.length < 2 || word.length > 6) return false;
    if (CJK_SPLIT_RE.test(word)) return false;
    if (/[一二三四五六七八九十兩两幾几\d]+[點点]/u.test(word)) return false;
    if (/[那這这]/u.test(word)) return false;
    if (/^(起|見|见|直|映|放進|放进)/u.test(word)) return false;
    if (/(全|裡一|里一)$/u.test(word)) return false;
    if (/^(沒有|没有|不是|可以|希望|覺得|觉得|直接|很多|一些|這個|这个|那個|那个)/.test(word)) return false;
  }
  return word.length >= 2 && word.length <= 12;
}

function isProtectedKeyword(word) {
  return CJK_KEEP_PHRASES.has(word)
    || /^(凌晨|清晨|上午|下午|晚上|夜裡|夜里|傍晚|中午)[一二三四五六七八九十兩两幾几\d]+[點点]$/u.test(word)
    || /^我坐在[\u3400-\u9fff（）()]{0,14}?[樓楼]梯上[對对][\u3400-\u9fff（）()]{0,8}?[說说]$/u.test(word);
}

function extractCjkPhrases(text) {
  const phrases = [];
  const chunks = text.split(/[，。！？；、,.!?;\n\r]+/).map((item) => item.trim()).filter(Boolean);
  chunks.forEach((chunk) => {
    const protectedPatterns = [
      /(凌晨|清晨|上午|下午|晚上|夜裡|夜里|傍晚|中午)[一二三四五六七八九十兩两幾几\d]+[點点]/gu,
      /我坐在[\u3400-\u9fff（）()]{0,14}?[樓楼]梯上[對对][\u3400-\u9fff（）()]{0,8}?[說说]/gu,
      /都[沒没]有[見见]過|也不知道|看不懂|打(?:遊戲|游戏)|營業中|营业中/gu
    ];
    protectedPatterns.forEach((pattern) => {
      for (const match of chunk.matchAll(pattern)) phrases.push(match[0]);
    });

    const possessiveMatches = chunk.matchAll(/([\u3400-\u9fff]{2,6})(?:的|之)([\u3400-\u9fff]{2,6})/gu);
    for (const match of possessiveMatches) {
      phrases.push(match[1], match[2]);
    }

    CJK_KEYWORD_ENDINGS.forEach((ending) => {
      if (chunk.includes(ending) && isUsefulWord(ending)) phrases.push(ending);
    });

    const sceneMatches = chunk.matchAll(/[\u3400-\u9fff]{2,6}(?:洞|巷|巷子|商圈|中心|樓梯|楼梯|海報|海报|路牌|建築|建筑|外牆|外墙|大樓|大楼)/gu);
    for (const match of sceneMatches) phrases.push(match[0]);

    const cjkRuns = chunk.match(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]{2,12}/gu) || [];
    cjkRuns.forEach((run) => {
      run.split(CJK_SPLIT_RE).forEach((part) => {
        const clean = cleanKeyword(part);
        if (isUsefulWord(clean) && clean.length <= 4) phrases.push(clean);
        collectCjkWindows(clean).forEach((window) => phrases.push(window));
      });
    });
  });
  return phrases;
}

function collectCjkWindows(part) {
  if (!/^[\u3400-\u9fff]{3,12}$/u.test(part)) return [];
  const windows = new Set();

  CJK_KEYWORD_ENDINGS.forEach((ending) => {
    if (ending.length >= 2 && part.includes(ending)) windows.add(ending);
  });

  const chars = [...part];
  for (let index = 0; index + 2 <= chars.length; index += 1) {
    const token = chars.slice(index, index + 2).join("");
    if (!CJK_IMAGERY_RE.test(token)) continue;
    if (!/(光|雨|風|风|海|夜|月|窗|街|門|门|手|眼|心|夢|梦|信|燈|灯|聲|声|影|汗)$/u.test(token)) continue;
    if (isUsefulWord(token)) windows.add(token);
  }

  return [...windows].filter((word) => isUsefulWord(word));
}

function hasBetterPhrase(word, allWords) {
  if (isProtectedKeyword(word)) return false;
  if (!/^[\u3400-\u9fff]{2,4}$/.test(word)) return false;
  return allWords.some((candidate) => (
    candidate !== word
    && candidate.includes(word)
    && candidate.length <= 4
    && candidate.length - word.length <= 2
    && keywordQuality(candidate) >= keywordQuality(word) + 0.6
  ));
}

function keywordQuality(word) {
  if (isProtectedKeyword(word)) return 7;
  let score = 0;
  if (/^[\u3400-\u9fff]{2,6}$/.test(word)) score += 2;
  if (word.length >= 2 && word.length <= 4) score += 1.2;
  if (CJK_KEYWORD_ENDINGS.some((ending) => word.endsWith(ending))) score += 1.8;
  if (/^[a-z]{4,}$/i.test(word)) score += 1;
  return score;
}

function addKeyword(word, moods) {
  if (state.deletedKeywords.has(word)) return;
  const current = state.keywordMap.get(word) || { count: 0, moods: new Set() };
  current.count += 1;
  moods.forEach((mood) => current.moods.add(mood));
  state.keywordMap.set(word, current);
}

function renderIdeas() {
  const list = $("#ideaList");
  const filterNames = new Set([...state.activeIdeaFilters].map((id) => getEmotionNameById(id)));
  const visibleIdeas = state.activeIdeaFilters.size === 0
    ? state.ideas
    : state.ideas.filter((idea) => (idea.moods || []).some((mood) => filterNames.has(mood)));
  if (!visibleIdeas.length) {
    list.innerHTML = `<div class="idea-card"><p>暫無符合條件的靈感</p><footer><span>換一個情緒或新增內容</span><span>--</span></footer></div>`;
  } else {
    list.innerHTML = visibleIdeas
      .map((idea) => {
        const created = formatDateTime(idea.createdAt);
        const updated = formatDateTime(idea.updatedAt || idea.createdAt);
        const moods = Array.isArray(idea.moods) ? idea.moods.join(" / ") : idea.mood || "未分類";
        const history = (idea.history || []).map((entry) => `<li>${formatDateTime(entry.at)}：${escapeHtml((entry.text || "").slice(0, 42))}</li>`).join("");
        return `<article class="idea-card" data-view-idea="${idea.id}">
          <p>${escapeHtml(idea.text)}</p>
          <footer><span>${escapeHtml(moods)}</span><span>建立 ${created} · 更新 ${updated}</span></footer>
          <div class="idea-actions">
            <button class="tiny-action" type="button" data-edit-idea="${idea.id}">編輯</button>
            <button class="tiny-action" type="button" data-delete-idea="${idea.id}">刪除</button>
          </div>
          <details class="idea-history">
            <summary>編輯記錄 ${(idea.history || []).length}</summary>
            <ul>${history || "<li>尚未修改</li>"}</ul>
          </details>
        </article>`;
      })
      .join("");
  }
  $("#ideaCount").textContent = `${state.ideas.length} items`;
  $$("[data-view-idea]").forEach((card) => {
    card.addEventListener("click", () => {
      state.lastIdeaId = card.dataset.viewIdea;
      updatePrompt();
    });
  });
  $$("[data-edit-idea]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    editIdea(button.dataset.editIdea);
  }));
  $$("[data-delete-idea]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteIdea(button.dataset.deleteIdea);
  }));
}

function renderKeywords() {
  const entries = [...state.keywordMap.entries()]
    .sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]))
    .slice(0, 30);
  $("#keywordBank").innerHTML = entries.length
    ? entries.map(([word, meta]) => `<span class="keyword-token" title="情緒來源：${escapeHtml([...meta.moods].join(" / "))}">${escapeHtml(word)} · ${meta.count}<button type="button" data-delete-keyword="${escapeHtml(word)}" aria-label="刪除 ${escapeHtml(word)}">×</button></span>`).join("")
    : `<button class="chip" type="button">詞庫等待靈感</button>`;
  $("#keywordCount").textContent = state.keywordMap.size;
  $$("[data-delete-keyword]").forEach((button) => {
    button.addEventListener("click", () => {
      state.keywordMap.delete(button.dataset.deleteKeyword);
      state.deletedKeywords.add(button.dataset.deleteKeyword);
      persistIdeas();
      renderKeywords();
      recommendLyrics();
      updatePrompt();
    });
  });
}

function persistIdeas() {
  const payload = {
    ideas: state.ideas,
    deletedKeywords: [...state.deletedKeywords],
    keywords: [...state.keywordMap.entries()].map(([word, meta]) => [word, { count: meta.count, moods: [...meta.moods] }])
  };
  localStorage.setItem("motiflab-state", JSON.stringify(payload));
}

function restoreIdeas() {
  const raw = localStorage.getItem("motiflab-state");
  if (!raw) return;
  try {
    const payload = JSON.parse(raw);
    state.ideas = (payload.ideas || []).map((idea) => ({
      ...idea,
      moods: (idea.moods || (idea.mood ? [idea.mood] : [])).map((mood) => mood === LEGACY_TRIUMPH_LABEL ? "成就感" : mood),
      updatedAt: idea.updatedAt || idea.createdAt,
      history: idea.history || []
    }));
    state.deletedKeywords = new Set(payload.deletedKeywords || []);
    rebuildKeywordMap();
  } catch (error) {
    console.warn("Failed to restore local state", error);
  }
}

function renderIdeaFilter() {
  const target = $("#ideaFilterPicker");
  const used = new Set();
  state.ideas.forEach((idea) => (idea.moods || []).forEach((mood) => {
    const emotion = EMOTIONS.find((item) => item.name === mood || (mood === LEGACY_TRIUMPH_LABEL && item.id === "triumph"));
    if (emotion) used.add(emotion.id);
  }));
  const buttons = [`<button type="button" class="filter-chip${state.activeIdeaFilters.size === 0 ? " active" : ""}" style="--chip-color: #111111" data-filter-emotion="all">全部</button>`]
    .concat([...used].map((id) => {
      const emotion = EMOTIONS.find((item) => item.id === id);
      const active = state.activeIdeaFilters.has(id) ? " active" : "";
      return `<button type="button" class="filter-chip${active}" style="--chip-color: ${emotion.color}" data-filter-emotion="${id}" title="${escapeHtml(emotion.plain)}">${escapeHtml(emotion.name)}</button>`;
    }));
  target.innerHTML = buttons.join("");
  applyInspirationPanelTheme();
  target.querySelectorAll("[data-filter-emotion]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.filterEmotion;
      if (id === "all") {
        state.activeIdeaFilters.clear();
      } else if (state.activeIdeaFilters.has(id)) {
        state.activeIdeaFilters.delete(id);
      } else {
        state.activeIdeaFilters.add(id);
      }
      renderIdeaFilter();
      renderIdeas();
      applyInspirationPanelTheme();
    });
  });
}

function getEmotionNameById(id) {
  return EMOTIONS.find((emotion) => emotion.id === id)?.name || id;
}

function getSelectedEmotionLabels(set) {
  return [...set].map((id) => {
    const emotion = EMOTIONS.find((item) => item.id === id);
    return emotion ? emotion.name : id;
  });
}

function getEmotionPromptLine(set) {
  return [...set].map((id) => {
    const emotion = EMOTIONS.find((item) => item.id === id);
    return emotion ? `${emotion.name} (${emotion.en}: ${emotion.plain})` : id;
  }).join("; ");
}

function recommendLyrics() {
  const language = $("#targetLang").value;
  const bankKey = getLyricBankKey(language);
  const bank = LYRIC_BANKS[bankKey] || LYRIC_BANKS["中文"];
  const rhymeKey = ($("#rhymeInput").value.trim() || "default").toLowerCase();
  const rhymes = bank.rhymes[rhymeKey] || Object.entries(bank.rhymes).find(([key]) => rhymeKey.includes(key))?.[1] || bank.rhymes.default;
  const emotionLabels = getSelectedEmotionLabels(state.lyricMoods);
  const keywords = [...state.keywordMap.keys()].slice(0, 6);
  const emotionImages = buildEmotionImages(emotionLabels, language);
  const images = [...keywords, ...emotionImages, ...bank.images].filter(Boolean).slice(0, 12);
  const synonyms = [...buildEmotionSynonyms(emotionLabels, language), ...bank.synonyms].slice(0, 9);
  state.lyricRecommendations = { rhymes, images, synonyms };
  renderChipList("#rhymeList", rhymes, "rhyme");
  renderChipList("#imageList", images, "image");
  renderChipList("#synonymList", synonyms, "synonym");
  renderLyricDirection();
  updatePrompt();
}

function buildEmotionImages(emotions, language) {
  const joined = emotions.join(",");
  const zh = [];
  if (/悲傷|懷舊/.test(joined)) zh.push("舊照片背面", "關燈後的房間", "回不去的車站");
  if (/焦慮|恐懼|恐怖/.test(joined)) zh.push("閃爍的走廊燈", "手心的冷汗", "未接來電");
  if (/浪漫|渴望|性慾/.test(joined)) zh.push("靠近的呼吸", "半開的窗簾", "指尖的停頓");
  if (/喜悦|興奮|成就感|滿足/.test(joined)) zh.push("亮起的人群", "清晨的風", "衝出隧道的光");
  if (/平靜|欣賞|敬畏|著迷/.test(joined)) zh.push("安靜水面", "巨大的夜空", "慢慢落下的光");
  if (/憤怒|厭惡|忮忌/.test(joined)) zh.push("燒焦的信紙", "緊閉的門", "刺眼的白牆");
  if (!zh.length) zh.push("便利店白光", "雨後柏油路", "末班車玻璃");
  const bankKey = getLyricBankKey(language);
  if (bankKey === "English") return zh.map((item) => translateImage(item, "English"));
  if (bankKey === "日本語") return zh.map((item) => translateImage(item, "日本語"));
  if (bankKey === "한국어") return zh.map((item) => translateImage(item, "한국어"));
  return zh;
}

function getLyricBankKey(language) {
  if (language.includes("English")) return "English";
  if (language.includes("日本語")) return "日本語";
  if (language.includes("한국어")) return "한국어";
  return "中文";
}

function translateImage(image, language) {
  const map = {
    "舊照片背面": { English: "back of an old photograph", "日本語": "古い写真の裏", "한국어": "오래된 사진 뒷면" },
    "關燈後的房間": { English: "a room after the lights go out", "日本語": "灯りを消した部屋", "한국어": "불 꺼진 방" },
    "回不去的車站": { English: "a station you cannot return to", "日本語": "戻れない駅", "한국어": "돌아갈 수 없는 역" },
    "閃爍的走廊燈": { English: "flickering hallway lights", "日本語": "点滅する廊下の灯り", "한국어": "깜빡이는 복도등" },
    "手心的冷汗": { English: "cold sweat in the palm", "日本語": "手のひらの冷たい汗", "한국어": "손바닥의 식은땀" },
    "未接來電": { English: "missed calls", "日本語": "不在着信", "한국어": "부재중 전화" },
    "靠近的呼吸": { English: "breath drawing closer", "日本語": "近づく息", "한국어": "가까워지는 숨" },
    "半開的窗簾": { English: "half-open curtains", "日本語": "半分開いたカーテン", "한국어": "반쯤 열린 커튼" },
    "指尖的停頓": { English: "a pause at the fingertips", "日本語": "指先のためらい", "한국어": "손끝의 멈춤" },
    "亮起的人群": { English: "a crowd lighting up", "日本語": "輝き出す群衆", "한국어": "밝아지는 군중" },
    "清晨的風": { English: "morning wind", "日本語": "朝の風", "한국어": "새벽 바람" },
    "衝出隧道的光": { English: "light bursting out of a tunnel", "日本語": "トンネルを抜ける光", "한국어": "터널을 뚫고 나오는 빛" },
    "安靜水面": { English: "a still water surface", "日本語": "静かな水面", "한국어": "고요한 수면" },
    "巨大的夜空": { English: "a vast night sky", "日本語": "巨大な夜空", "한국어": "거대한 밤하늘" },
    "慢慢落下的光": { English: "light slowly falling", "日本語": "ゆっくり落ちる光", "한국어": "천천히 내려앉는 빛" },
    "燒焦的信紙": { English: "burnt letter paper", "日本語": "焦げた手紙", "한국어": "그을린 편지지" },
    "緊閉的門": { English: "a tightly shut door", "日本語": "固く閉じた扉", "한국어": "굳게 닫힌 문" },
    "刺眼的白牆": { English: "a glaring white wall", "日本語": "まぶしい白い壁", "한국어": "눈부신 흰 벽" }
  };
  return map[image]?.[language] || image;
}

function buildEmotionSynonyms(emotions, language) {
  const joined = emotions.join(",");
  const zh = [];
  if (/悲傷/.test(joined)) zh.push("失去: 鬆手 / 空位 / 回不來", "悲傷: 靜默 / 下沉 / 潮濕");
  if (/懷舊/.test(joined)) zh.push("回憶: 舊光 / 濾鏡 / 回聲");
  if (/焦慮/.test(joined)) zh.push("焦慮: 預演 / 失控 / 反覆確認");
  if (/浪漫/.test(joined)) zh.push("浪漫: 靠近 / 互相照亮 / 暫停世界");
  if (/憤怒/.test(joined)) zh.push("憤怒: 邊界 / 火焰 / 宣告");
  if (/平靜/.test(joined)) zh.push("平靜: 定錨 / 呼吸 / 回到身體");
  if (/渴望/.test(joined)) zh.push("渴望: 缺口 / 索求 / 靠近");
  if (!zh.length) zh.push("想念: 惦記 / 牽掛 / 回望");
  if (language === "中文") return zh;
  return zh.map((item) => `${item} (${language})`);
}

function renderLyricDirection() {
  const theme = $("#themeInput").value.trim() || inferTheme();
  const emotions = getSelectedEmotionLabels(state.lyricMoods).join(" / ") || "尚未選擇";
  const narrator = $("#narratorInput").value;
  const style = $("#lyricStyle").value;
  const structure = $("#songStructure").value;
  const dialect = $("#dialectInput").value;
  const structureLabel = getChoiceLabel(CHOICES.songStructure, structure);
  const styleLabel = getChoiceLabel(CHOICES.lyricStyle, style);
  const target = $("#lyricDirection");
  if (target) {
    target.innerHTML = `<strong>目前方向</strong>
      <p>${escapeHtml(theme)}，情緒偏向 ${escapeHtml(emotions)}。${escapeHtml(narrator)}，口吻保持 ${escapeHtml(styleLabel)}，押韻參考 ${escapeHtml(dialect)}。</p>
      <ul>
        <li>主歌：先放具體畫面，不急著解釋情緒。</li>
        <li>副歌：把主題變成一句容易重複的核心句。</li>
        <li>段落骨架：${escapeHtml(structureLabel)}</li>
      </ul>`;
  }
  renderLyricsIdeaBrief();
}

function renderLyricsIdeaBrief() {
  const target = $("#lyricsIdeaBrief");
  if (!target) return;
  const ideas = state.ideas.slice(0, 5).map((idea) => idea.text);
  const keywords = [...state.keywordMap.keys()];
  target.innerHTML = `<h3>從靈感帶入</h3>
    <p>${ideas.length ? escapeHtml(ideas.join(" / ")) : "還沒有靈感原文。先到靈感頁記下一段話，這裡會自動帶入。"}</p>
    <div class="linked-keywords" aria-label="完整詞庫">${keywords.length ? keywords.map((word) => `<span>${escapeHtml(word)}</span>`).join("") : "<span>等待提取</span>"}</div>`;
}

function getChoiceLabel(choices, value) {
  return choices.find((choice) => choice.value === value)?.label || value;
}

function renderChipList(selector, items, category = "reference") {
  $(selector).innerHTML = items.map((item) => {
    const tip = buildReferenceTooltip(item, category);
    const tipAttrs = tip ? ` has-tip" data-tip="${escapeHtml(tip)}` : "";
    return `<button class="chip${tipAttrs}" type="button">${escapeHtml(item)}</button>`;
  }).join("");
  $$(selector + " .chip").forEach((button) => {
    button.addEventListener("click", () => {
      insertAtCursor($("#lyricsDraft"), button.textContent.trim());
      updatePrompt();
    });
  });
}

function buildReferenceTooltip(item, category) {
  const bankKey = getLyricBankKey($("#targetLang").value);
  const dialect = $("#dialectInput").value;
  if (bankKey === "中文" && dialect === "國語發音") return "";

  const term = String(item).split(":")[0].trim();
  const pronunciation = bankKey === "中文"
    ? dialectPronunciationHint(item, dialect)
    : referencePronunciation(item, term, bankKey);
  const meaning = referenceMeaning(item, term, bankKey, category, dialect);
  return `(${pronunciation}) ${referencePartOfSpeech(item, category, bankKey)}.${meaning}`;
}

function dialectPronunciationHint(item, dialect) {
  const hints = {
    "粵語口味": "jyutping ref",
    "台語/閩南語": "tailo ref",
    "四川話口味": "sichuan ref"
  };
  return hints[dialect] || "dialect ref";
}

function referencePronunciation(item, term, bankKey) {
  if (bankKey === "English") return String(item).replace(/\s*:\s*/g, " / ").replace(/\s*\/\s*/g, " / ");
  if (bankKey === "日本語") return JAPANESE_ROMAJI[term] || kanaToRomaji(term) || "按日語實際讀音微調";
  if (bankKey === "한국어") return romanizeHangul(term);
  return String(item);
}

function referenceMeaning(item, term, bankKey, category, dialect) {
  if (bankKey === "中文") {
    if (item.includes(":")) {
      const [head, rest] = item.split(":");
      return `${head.trim()}；近義 ${rest.trim()}`;
    }
    return `${term || item}；${dialect}押韻/語氣參考`;
  }
  if (item.includes(":")) {
    const [head, rest] = item.split(":");
    const baseMeaning = REFERENCE_MEANINGS[bankKey]?.[head.trim()] || head.trim();
    return `${baseMeaning}；近義 ${rest.trim()}`;
  }
  return REFERENCE_MEANINGS[bankKey]?.[term]
    || REFERENCE_MEANINGS[bankKey]?.[item]
    || `${category === "rhyme" ? "押韻詞" : category === "image" ? "意象" : "替換詞"}，按上下文微調`;
}

function referencePartOfSpeech(item, category, bankKey) {
  const term = String(item).split(":")[0].trim().toLowerCase();
  const known = {
    lonely: "adj", isolated: "adj", hollow: "adj", weightless: "adj", tired: "adj",
    love: "n/v", leave: "v", drift: "v", disappear: "v", stay: "v", sway: "v", decay: "v/n",
    fire: "n", higher: "adj", desire: "n/v", midnight: "n", streetlight: "n", satellite: "n"
  };
  if (known[term]) return known[term];
  if (String(item).includes(":")) return "syn";
  if (category === "image" || /\s|\/|[：:]/.test(String(item))) return "phr";
  if (bankKey === "中文" && String(item).length > 2) return "phr";
  return "n";
}

function kanaToRomaji(text) {
  const map = {
    あ: "a", い: "i", う: "u", え: "e", お: "o",
    か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
    さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
    た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
    な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
    は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
    ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
    や: "ya", ゆ: "yu", よ: "yo", ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
    わ: "wa", を: "o", ん: "n", っ: "", ー: "-"
  };
  if (!/[ぁ-んァ-ン]/u.test(text)) return "";
  return [...text].map((char) => map[char] || char).join(" ");
}

function romanizeHangul(text) {
  const initials = ["g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"];
  const vowels = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];
  const finals = ["", "k", "k", "ks", "n", "nj", "nh", "t", "l", "lk", "lm", "lb", "ls", "lt", "lp", "lh", "m", "p", "ps", "t", "t", "ng", "t", "t", "k", "t", "p", "h"];
  return [...String(text)].map((char) => {
    const code = char.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) return char;
    const initial = Math.floor(code / 588);
    const vowel = Math.floor((code % 588) / 28);
    const final = code % 28;
    return `${initials[initial]}${vowels[vowel]}${finals[final]}`;
  }).join(" ");
}

function draftLyrics() {
  recommendLyrics();
  const lang = $("#targetLang").value;
  const theme = $("#themeInput").value.trim() || "尚未命名的心事";
  const words = [...state.keywordMap.keys()].slice(0, 6);
  const [imageA, imageB, imageC] = state.lyricRecommendations.images;
  const [rhymeA, rhymeB] = state.lyricRecommendations.rhymes;
  const emotions = getSelectedEmotionLabels(state.lyricMoods).join(" / ");
  const narrator = $("#narratorInput").value;
  const guide = state.analysis?.notes?.length ? buildSyllableAdvice(state.analysis) : "每句 7-11 字，副歌保留重複 hook。";
  const templates = {
    "中文": `[主歌]\n我在${imageA || "街角"}想起${theme}\n${imageB || "雨聲"}把沉默慢慢打開\n${words[0] || "回憶"}還留在口袋\n\n[副歌前]\n差一點說出的${rhymeA || "告白"}\n繞過人群又回來\n\n[副歌]\n如果你也聽見${rhymeB || "窗外"}\n就讓我把夜色唱成海\n核心句: ${words[1] || "別離"} / ${words[2] || "等待"} / ${theme}`,
    "English": `[Verse]\nI kept ${theme} under a ${imageA || "streetlight"}\nYour name was static in the rain\n${words[0] || "memory"} on my tongue tonight\n\n[Pre Chorus]\nAlmost said it, almost stayed\nEvery silence finds a way\n\n[Chorus]\nMeet me where the ${rhymeA || "midnight"} bends\nTurn the hurt into a ${rhymeB || "soft light"} again\nHook: ${words[1] || "runaway"} / ${words[2] || "afterglow"} / ${theme}`,
    "日本語": `[Verse]\n${imageA || "終電のホーム"}で ${theme} を抱いた\nほどけた声が夜に溶けてく\n${words[0] || "記憶"}だけがまだ光る\n\n[Pre Chorus]\n言えないままの${rhymeA || "願い"}\n胸の奥で揺れている\n\n[Chorus]\n${rhymeB || "未来"}まで届くなら\nこの雨を歌に変えるから\nHook: ${words[1] || "夜"} / ${words[2] || "声"} / ${theme}`,
    "한국어": `[Verse]\n${imageA || "새벽 편의점"} 앞에서 ${theme}을 붙잡아\n젖은 마음이 조용히 흔들려\n${words[0] || "기억"}만 아직 빛나\n\n[Pre Chorus]\n말하지 못한 ${rhymeA || "바다"}\n내 안에서 자꾸 번져가\n\n[Chorus]\n${rhymeB || "하나"}만 남겨줘\n이 밤을 노래로 바꿀 수 있게\nHook: ${words[1] || "밤"} / ${words[2] || "맘"} / ${theme}`
  };
  $("#lyricsDraft").value = `${templates[lang] || templates["中文"]}\n\n[寫作方向]\n情緒：${emotions}\n視角：${narrator}\n跨語參考：${lang}\n\n[節奏參考]\n${guide}`;
  updatePrompt();
  updateProgress();
}

function renderChordCards() {
  const recommended = getRecommendedPresetIds(CHORD_PRESETS);
  const emptySelected = state.selectedChord?.empty ? " selected" : "";
  $("#chordCards").innerHTML = `<div class="arrangement-null${emptySelected}">
      <strong>不使用和弦</strong>
      <button class="tiny-action" type="button" data-empty-chord>${state.selectedChord?.empty ? "取消選空" : "選空"}</button>
    </div>` + CHORD_PRESETS.map((preset) => {
    const selected = !state.selectedChord?.empty && preset.id === state.selectedChord?.id ? " selected" : "";
    const isRecommended = recommended.includes(preset.id) ? " recommended" : "";
    const badge = recommended.includes(preset.id) ? "情緒推薦" : "";
    return `<article class="music-card${selected}${isRecommended}" style="--preset-color: ${preset.color}" data-chord-id="${preset.id}">
      <header><strong>${preset.title}</strong><small title="歌曲速度，數字越大感覺越快。">${badge || "速度 " + preset.bpm}</small></header>
      <div class="chord-line">${preset.chords.map((chord) => `<span>${chord}</span>`).join("")}</div>
      <footer>
        <small>${preset.style} · 速度 ${preset.bpm}</small>
        <div class="music-actions">
          <button class="ghost-action" type="button" data-select-chord="${preset.id}">${selected ? "取消選用" : "選用"}</button>
          <button class="ghost-action" type="button" data-play-chord="${preset.id}"><span aria-hidden="true">▶</span>播放</button>
        </div>
      </footer>
    </article>`;
  }).join("");
  $$("[data-empty-chord]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedChord = state.selectedChord?.empty ? null : EMPTY_CHORD;
      renderChordCards();
      markArrangementChanged();
    });
  });
  $$("[data-select-chord]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = CHORD_PRESETS.find((item) => item.id === button.dataset.selectChord);
      state.selectedChord = !state.selectedChord?.empty && state.selectedChord?.id === preset.id ? null : preset;
      renderChordCards();
      markArrangementChanged();
    });
  });
  $$("[data-play-chord]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = CHORD_PRESETS.find((item) => item.id === button.dataset.playChord);
      playChordPreset(preset);
    });
  });
  updateArrangementControls();
}

function renderDrumCards() {
  const recommended = getRecommendedPresetIds(DRUM_PRESETS);
  const emptySelected = state.selectedDrum?.empty ? " selected" : "";
  $("#drumCards").innerHTML = `<div class="arrangement-null${emptySelected}">
      <strong>不使用鼓點</strong>
      <button class="tiny-action" type="button" data-empty-drum>${state.selectedDrum?.empty ? "取消選空" : "選空"}</button>
    </div>` + DRUM_PRESETS.map((preset) => {
    const selected = !state.selectedDrum?.empty && preset.id === state.selectedDrum?.id ? " selected" : "";
    const isRecommended = recommended.includes(preset.id) ? " recommended" : "";
    const badge = recommended.includes(preset.id) ? "情緒推薦" : "";
    return `<article class="music-card${selected}${isRecommended}" style="--preset-color: ${preset.color}" data-drum-id="${preset.id}">
      <header><strong>${preset.title}</strong><small title="歌曲速度，數字越大感覺越快。">${badge || "速度 " + preset.bpm}</small></header>
      <div class="step-grid">${preset.pattern.map((step) => `<span class="step ${stepClass(step)}"></span>`).join("")}</div>
      <footer>
        <small>${preset.style} · 速度 ${preset.bpm}</small>
        <div class="music-actions">
          <button class="ghost-action" type="button" data-select-drum="${preset.id}">${selected ? "取消選用" : "選用"}</button>
          <button class="ghost-action" type="button" data-play-drum="${preset.id}"><span aria-hidden="true">▶</span>播放</button>
        </div>
      </footer>
    </article>`;
  }).join("");
  $$("[data-empty-drum]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDrum = state.selectedDrum?.empty ? null : EMPTY_DRUM;
      renderDrumCards();
      markArrangementChanged();
    });
  });
  $$("[data-select-drum]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = DRUM_PRESETS.find((item) => item.id === button.dataset.selectDrum);
      state.selectedDrum = !state.selectedDrum?.empty && state.selectedDrum?.id === preset.id ? null : preset;
      renderDrumCards();
      markArrangementChanged();
    });
  });
  $$("[data-play-drum]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = DRUM_PRESETS.find((item) => item.id === button.dataset.playDrum);
      playDrumPreset(preset);
    });
  });
  updateArrangementControls();
}

function getRecommendedPresetIds(presets) {
  const active = new Set([...state.lyricMoods, ...state.selectedMoods]);
  return presets
    .map((preset) => ({
      id: preset.id,
      score: (preset.moodTags || []).filter((tag) => active.has(tag)).length
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((item) => item.id);
}

function stepClass(step) {
  if (step === "K") return "kick";
  if (step === "S") return "snare";
  if (step === "H") return "hat";
  return "";
}

async function playChordPreset(preset) {
  if (!preset || preset.empty || !preset.notes?.length) return;
  const ctx = await getAudioContext();
  stopScheduledAudio();
  const now = ctx.currentTime + 0.05;
  const beat = 60 / preset.bpm;
  preset.notes.forEach((notes, index) => {
    notes.forEach((midi) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = midiToFrequency(midi);
      gain.gain.setValueAtTime(0.0001, now + index * beat * 2);
      gain.gain.exponentialRampToValueAtTime(0.16, now + index * beat * 2 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (index + 1) * beat * 2 - 0.04);
      osc.connect(gain).connect(getAudioDestination());
      osc.start(now + index * beat * 2);
      osc.stop(now + (index + 1) * beat * 2);
      state.audioNodes.push(osc);
    });
  });
  setAudioState(`正在播放：${preset.title}。如果仍然聽不到，請確認瀏覽器分頁和系統音量。`);
}

async function playDrumPreset(preset) {
  if (!preset || preset.empty || !preset.pattern?.length) return;
  const ctx = await getAudioContext();
  stopScheduledAudio();
  const now = ctx.currentTime + 0.05;
  const stepDuration = (60 / preset.bpm) / 4;
  preset.pattern.forEach((step, index) => {
    const time = now + index * stepDuration;
    if (step === "K") scheduleKick(ctx, time);
    if (step === "S") scheduleSnare(ctx, time);
    if (step === "H") scheduleHat(ctx, time);
  });
  setAudioState(`正在播放：${preset.title}。鼓點是瀏覽器即時合成的示意音。`);
}

async function playArrangementCombo({ loop = false } = {}) {
  if (!hasPlayableArrangement()) {
    setAudioState("先選用一組和弦或鼓點，再開始試聽。");
    return;
  }
  state.arrangementStep = "top";
  state.arrangementAuditioned = true;
  updateFloatingJump();
  let ctx;
  try {
    ctx = await getAudioContext();
  } catch (error) {
    setAudioState("瀏覽器暫時無法啟動音訊；選中的編曲已記錄，可以先繼續整理靈感。");
    return;
  }
  stopScheduledAudio({ silent: true });
  state.isArrangementLooping = loop;
  scheduleArrangementCycle(ctx, ctx.currentTime + 0.05);
  updateGlobalPlayer();
  const mode = loop ? "循環播放" : "播放一次";
  const parts = [
    hasPlayableChord() ? state.selectedChord.title : "",
    hasPlayableDrum() ? state.selectedDrum.title : ""
  ].filter(Boolean).join(" + ");
  setAudioState(`${mode}：${parts}。`);
  updateFloatingJump();
}

function toggleArrangementLoop() {
  if (state.isArrangementLooping) {
    stopScheduledAudio();
    return;
  }
  playArrangementCombo({ loop: true });
}

function scheduleArrangementCycle(ctx, startTime) {
  const chord = hasPlayableChord() ? state.selectedChord : null;
  const drum = hasPlayableDrum() ? state.selectedDrum : null;
  if (!chord && !drum) return;
  const bpm = drum?.bpm || chord?.bpm || 96;
  const beat = 60 / bpm;
  const chordSpan = beat * 4;
  const cycleBars = chord?.notes?.length || 4;
  if (chord) {
    chord.notes.forEach((notes, index) => {
      scheduleChordVoicing(ctx, notes, startTime + index * chordSpan, chordSpan, 0.11);
    });
  }
  const stepDuration = beat / 4;
  const cycleSteps = drum ? cycleBars * 16 : 0;
  if (drum) {
    for (let index = 0; index < cycleSteps; index += 1) {
      const step = drum.pattern[index % drum.pattern.length];
      const time = startTime + index * stepDuration;
      if (step === "K") scheduleKick(ctx, time);
      if (step === "S") scheduleSnare(ctx, time);
      if (step === "H") scheduleHat(ctx, time);
    }
  }
  const cycleDuration = cycleBars * chordSpan;
  if (state.isArrangementLooping) {
    const timer = window.setTimeout(() => {
      if (!state.isArrangementLooping) return;
      scheduleArrangementCycle(ctx, ctx.currentTime + 0.05);
    }, Math.max(400, (cycleDuration - 0.1) * 1000));
    state.audioTimers.push(timer);
  }
}

function scheduleChordVoicing(ctx, notes, start, duration, level = 0.14) {
  notes.forEach((midi) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = midiToFrequency(midi);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(level, start + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration - 0.04);
    osc.connect(gain).connect(getAudioDestination());
    osc.start(start);
    osc.stop(start + duration);
    state.audioNodes.push(osc);
  });
}

function scheduleKick(ctx, time) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(120, time);
  osc.frequency.exponentialRampToValueAtTime(48, time + 0.12);
  gain.gain.setValueAtTime(0.62, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
  osc.connect(gain).connect(getAudioDestination());
  osc.start(time);
  osc.stop(time + 0.2);
  state.audioNodes.push(osc);
}

function scheduleSnare(ctx, time) {
  const bufferSize = ctx.sampleRate * 0.18;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1800;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.32, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);
  noise.connect(filter).connect(gain).connect(getAudioDestination());
  noise.start(time);
  noise.stop(time + 0.18);
  state.audioNodes.push(noise);
}

function scheduleHat(ctx, time) {
  const bufferSize = ctx.sampleRate * 0.05;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 6800;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.14, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);
  noise.connect(filter).connect(gain).connect(getAudioDestination());
  noise.start(time);
  noise.stop(time + 0.06);
  state.audioNodes.push(noise);
}

function stopScheduledAudio(options = {}) {
  state.audioNodes.forEach((node) => {
    try {
      node.stop();
    } catch (error) {
      return error;
    }
  });
  state.audioNodes = [];
  state.audioTimers.forEach((timer) => clearTimeout(timer));
  state.audioTimers = [];
  state.isArrangementLooping = false;
  updateGlobalPlayer();
  if (!options.silent) setAudioState("已停止播放。");
}

function setAudioState(message) {
  const target = $("#audioState");
  if (target) target.textContent = message;
  const label = $("#globalPlayerLabel");
  if (label && message) label.textContent = state.isArrangementLooping ? "背景循環中" : "背景試聽";
}

function updateGlobalPlayer() {
  const player = $(".global-player");
  const globalButton = $("#globalLoopButton");
  const loopButton = $("#loopComboButton");
  if (player) player.classList.toggle("is-playing", state.isArrangementLooping);
  if (globalButton) {
    globalButton.innerHTML = `${state.isArrangementLooping ? ICONS.pause : ICONS.play}<span id="globalPlayerLabel">${state.isArrangementLooping ? "背景循環中" : "背景試聽"}</span>`;
  }
  if (loopButton) loopButton.innerHTML = state.isArrangementLooping ? `${ICONS.stop}停止循環` : `${ICONS.loop}循環背景`;
  updateArrangementControls();
}

function updatePrompt() {
  const format = $("#promptFormat").value;
  const prompt = buildPrompt(format);
  $("#promptOutput").value = prompt;
  renderPromptNotes();
  updateProgress();
}

function renderPromptNotes() {
  const target = $("#promptSystemNotes");
  if (!target) return;
  const idea = getFocusedIdea();
  const ideaKeywords = [...state.keywordMap.keys()].slice(0, 8);
  const lyricSettings = [
    ["風格", getChoiceLabel(CHOICES.lyricStyle, $("#lyricStyle").value)],
    ["視角", getChoiceLabel(CHOICES.narrator, $("#narratorInput").value)],
    ["骨架", getChoiceLabel(CHOICES.songStructure, $("#songStructure").value)],
    ["情緒", getSelectedEmotionLabels(state.lyricMoods).join(" / ") || "尚未選擇"],
    ["語言", `${$("#targetLang").value} · ${$("#dialectInput").value}`]
  ];
  const lyricDraft = $("#lyricsDraft").value.trim();
  const chord = state.selectedChord;
  const drum = state.selectedDrum;
  const chordTitle = chord ? chord.title : "尚未選擇";
  const chordDetail = hasPlayableChord() ? `${chord.chords.join(" - ")} · ${chord.style}` : (chord?.empty ? "已選空：這首歌不帶和弦參考。" : "可以只保留鼓點，和弦留待 AI 自行處理。");
  const drumTitle = drum ? drum.title : "尚未選擇";
  const drumDetail = hasPlayableDrum() ? `${drum.style} · 速度 ${drum.bpm}` : (drum?.empty ? "已選空：這首歌不帶鼓點參考。" : "可以只保留和弦，鼓點留待 AI 自行處理。");

  target.innerHTML = `
    <article class="prompt-summary-card summary-humming" style="--module-color:#e7a7bd">
      <h3>哼唱 <small>${escapeHtml(state.analysis?.notes?.length ? `${state.analysis.notes.length} 音` : "未分析")}</small></h3>
      <div class="summary-block is-clickable" data-summary-jump="humming" data-summary-selector="#waveCanvas">
        <span>原音頻</span>
        <strong>${escapeHtml(state.sourceName || "尚未放入音頻")}</strong>
        <canvas class="summary-wave-canvas" width="220" height="44" data-summary-wave></canvas>
        <div class="summary-mini-actions">
          <button class="tiny-action" type="button" data-summary-play="source" ${state.sourceBuffer ? "" : "disabled"}>回聽</button>
          <button class="tiny-action" type="button" data-summary-jump-button="humming" data-summary-selector="#waveCanvas">回到波形</button>
        </div>
      </div>
      <div class="summary-block is-clickable" data-summary-jump="humming" data-summary-selector="#scoreCanvas">
        <span>旋律摘要</span>
        <div class="summary-pill-row">
          <span>速度 ${escapeHtml($("#tempoMetric").textContent)}</span>
          <span>調性 ${escapeHtml($("#keyMetric").textContent)}</span>
          <span>時長 ${escapeHtml($("#durationMetric").textContent)}</span>
        </div>
        <strong>${escapeHtml($("#syllableAdvice").textContent || "--")}</strong>
      </div>
    </article>

    <article class="prompt-summary-card summary-arrangement" style="--module-color:#c8a074">
      <h3>編曲 <small>和弦 / 鼓點</small></h3>
      <div class="summary-grid-two">
        <div class="summary-block is-clickable" data-summary-jump="arrangement" data-summary-selector="#chordCards" style="--module-color:${chord?.color || "#c8a074"}">
          <span>和弦</span>
          <strong>${escapeHtml(chordTitle)}</strong>
          <small>${escapeHtml(chordDetail)}</small>
          <button class="tiny-action" type="button" data-summary-play="chord" ${hasPlayableChord() ? "" : "disabled"}>播放和弦</button>
        </div>
        <div class="summary-block is-clickable" data-summary-jump="arrangement" data-summary-selector="#drumCards" style="--module-color:${drum?.color || "#c9a06f"}">
          <span>鼓點</span>
          <strong>${escapeHtml(drumTitle)}</strong>
          <small>${escapeHtml(drumDetail)}</small>
          <button class="tiny-action" type="button" data-summary-play="drum" ${hasPlayableDrum() ? "" : "disabled"}>播放鼓點</button>
        </div>
      </div>
      <div class="summary-mini-actions">
        <button class="tiny-action" type="button" data-summary-play="combo" ${hasPlayableArrangement() ? "" : "disabled"}>播放選中</button>
      </div>
    </article>

    <article class="prompt-summary-card summary-inspiration" style="--module-color:#f1c84f">
      <h3>靈感 <small>${escapeHtml(idea ? formatDateTime(idea.updatedAt || idea.createdAt) : "空")}</small></h3>
      <div class="summary-block is-clickable" data-summary-jump="inspiration" data-summary-selector="#ideaList">
        <span>最後瀏覽 / 選中的原文</span>
        <strong>${escapeHtml(idea ? idea.text : "尚未加入靈感")}</strong>
      </div>
      <div class="summary-block is-clickable" data-summary-jump="inspiration" data-summary-selector="#keywordBank">
        <span>關鍵詞</span>
        <div class="summary-pill-row">${ideaKeywords.length ? ideaKeywords.map((word) => `<span>${escapeHtml(word)}</span>`).join("") : "<span>等待提取</span>"}</div>
      </div>
    </article>

    <article class="prompt-summary-card summary-lyrics" style="--module-color:#8fb7dc">
      <h3>歌詞 <small>${escapeHtml($("#themeInput").value.trim() || inferTheme())}</small></h3>
      <div class="summary-grid-two">
        <div class="summary-block summary-draft is-clickable" data-summary-jump="lyrics" data-summary-selector="#lyricsDraft">
          <span>歌詞草稿</span>
          <strong>${escapeHtml(lyricDraft || "尚未生成或撰寫歌詞")}</strong>
        </div>
        <div class="summary-block summary-settings is-clickable" data-summary-jump="lyrics" data-summary-selector="#lyricMoodPicker">
          <span>方向詞</span>
          ${lyricSettings.map(([label, value]) => `<small><b>${escapeHtml(label)}</b> ${escapeHtml(value)}</small>`).join("")}
        </div>
      </div>
    </article>`;

  drawPromptSummaryWaveform();
  target.querySelectorAll("[data-summary-jump]").forEach((element) => {
    element.addEventListener("click", () => jumpFromPrompt(element.dataset.summaryJump, element.dataset.summarySelector));
  });
  target.querySelectorAll("[data-summary-jump-button]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      jumpFromPrompt(button.dataset.summaryJumpButton, button.dataset.summarySelector);
    });
  });
  target.querySelectorAll("[data-summary-play]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (button.disabled) return;
      if (button.dataset.summaryPlay === "source") playInputAudio();
      if (button.dataset.summaryPlay === "chord" && hasPlayableChord()) playChordPreset(state.selectedChord);
      if (button.dataset.summaryPlay === "drum" && hasPlayableDrum()) playDrumPreset(state.selectedDrum);
      if (button.dataset.summaryPlay === "combo" && hasPlayableArrangement()) playArrangementCombo({ loop: false });
    });
  });
}

function getFocusedIdea() {
  return state.ideas.find((idea) => idea.id === state.lastIdeaId) || state.ideas[0] || null;
}

function drawPromptSummaryWaveform() {
  const canvas = document.querySelector("[data-summary-wave]");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  if (!state.sourceBuffer) {
    ctx.fillStyle = "#8a8f94";
    ctx.font = "12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("等待原音", width / 2, height / 2 + 4);
    return;
  }
  const data = getMonoData(state.sourceBuffer);
  const step = Math.max(1, Math.floor(data.length / width));
  ctx.strokeStyle = "#111111";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let x = 0; x < width; x += 1) {
    let min = 1;
    let max = -1;
    const start = x * step;
    for (let index = 0; index < step; index += 1) {
      const value = data[start + index] || 0;
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
    ctx.moveTo(x, (1 + min) * height * 0.5);
    ctx.lineTo(x, (1 + max) * height * 0.5);
  }
  ctx.stroke();
}

function buildPrompt(format) {
  const projectTitle = $("#projectTitle").value.trim() || "Untitled Song";
  const mood = getEmotionPromptLine(state.lyricMoods) || getEmotionPromptLine(state.selectedMoods);
  const ideaMoods = getEmotionPromptLine(state.selectedMoods);
  const language = $("#targetLang").value;
  const style = $("#lyricStyle").value;
  const structure = $("#songStructure").value;
  const narrator = $("#narratorInput").value;
  const dialect = $("#dialectInput").value;
  const theme = $("#themeInput").value.trim() || inferTheme();
  const lyrics = $("#lyricsDraft").value.trim();
  const keywords = [...state.keywordMap.keys()].slice(0, 12);
  const chordLine = hasPlayableChord()
    ? state.selectedChord.chords.join(" - ")
    : (state.selectedChord?.empty ? "none (explicitly no chord reference)" : "none");
  const chordStyle = hasPlayableChord()
    ? state.selectedChord.style
    : (state.selectedChord?.empty ? "no chord layer requested" : "no chord reference selected");
  const drumTitle = hasPlayableDrum()
    ? state.selectedDrum.title
    : (state.selectedDrum?.empty ? "none (explicitly no drum reference)" : "none");
  const drumStyle = hasPlayableDrum()
    ? state.selectedDrum.style
    : (state.selectedDrum?.empty ? "no drum layer requested" : "no drum reference selected");
  const melody = state.analysis
    ? `${state.analysis.key || "unknown key"}, ${state.analysis.bpm ? Math.round(state.analysis.bpm) + " BPM" : "free tempo"}, motif notes: ${state.analysis.notes.slice(0, 12).map((note) => note.name).join(" - ")}`
    : "melody reference pending; use a singable, narrow-range topline";
  const payload = {
    title: projectTitle,
    language,
    dialect,
    mood,
    inspirationMoods: ideaMoods,
    theme,
    narrator,
    lyricStyle: style,
    structure,
    keywords,
    melody,
    chords: hasPlayableChord() ? state.selectedChord.chords : [],
    chordStyle,
    drums: drumTitle,
    drumStyle,
    lyrics,
    negativePrompt: $("#negativePrompt").value.trim(),
    provider: $("#providerName").value.trim(),
    delivery: $("#providerMode").value
  };

  if (format === "json") {
    return JSON.stringify(payload, null, 2);
  }

  if (format === "compact") {
    return `${projectTitle} for ${payload.provider}: ${language}, ${dialect}, ${payload.theme}. Emotion: ${mood}. Viewpoint: ${narrator}. Style: ${style}. Structure: ${structure}. Melody: ${melody}. Chords: ${chordLine}. Drums: ${drumTitle}. Keywords: ${keywords.join(", ")}. Avoid: ${payload.negativePrompt}.`;
  }

  const lyricBlock = lyrics ? `\nLyrics draft:\n${lyrics}` : "";
  return `Create a complete AI-generated song called "${projectTitle}".

Core concept:
- Target platform: ${payload.provider} (${payload.delivery})
- Language: ${language}
- Pronunciation flavor: ${dialect}
- Theme: ${payload.theme}
- Emotional direction: ${mood}
- Inspiration emotion tags: ${ideaMoods}
- Singing viewpoint: ${narrator}
- Lyric style: ${style}
- Song structure: ${structure}
- Keywords and imagery: ${keywords.length ? keywords.join(", ") : state.lyricRecommendations.images.join(", ")}

Melody and rhythm:
- Use this topline reference: ${melody}
- Keep the vocal melody natural for non-professional singers.
- Match lyric density to the detected phrase length and leave space on long notes.

Arrangement:
- Chord progression: ${chordLine}
- Harmonic color: ${chordStyle}
- Drum pattern: ${drumTitle}, ${drumStyle}
- Production direction: polished but intimate, clear lead vocal, tasteful stereo width, controlled low end.

Constraints:
- Avoid: ${payload.negativePrompt}
- Preserve the emotional center and make the chorus easy to remember.${lyricBlock}`;
}

function inferTheme() {
  const firstIdea = state.ideas[0]?.text;
  if (firstIdea) return firstIdea.slice(0, 32);
  return "一段還沒命名的記憶";
}

async function copyPrompt() {
  const text = $("#promptOutput").value;
  try {
    await navigator.clipboard.writeText(text);
    toast("提示詞已複製");
  } catch (error) {
    $("#promptOutput").select();
    document.execCommand("copy");
    toast("提示詞已選取");
  }
}

async function copyPluginData() {
  const data = buildPluginData();
  const text = JSON.stringify(data, null, 2);
  try {
    await navigator.clipboard.writeText(text);
    toast("插件資料已複製，可貼到 Suno 面板匯入");
  } catch (error) {
    $("#promptOutput").value = text;
    $("#promptOutput").select();
    document.execCommand("copy");
    toast("插件資料已放入右側文字框");
  }
}

function buildPluginData() {
  const melody = state.analysis
    ? [
        `旋律音：${state.analysis.notes.slice(0, 18).map((note) => note.name).join(" - ") || "未檢測"}`,
        `速度：${state.analysis.bpm ? Math.round(state.analysis.bpm) : "自由"}`,
        `調性感覺：${state.analysis.key || "未判斷"}`,
        `字數建議：${$("#syllableAdvice").textContent}`
      ].join("\n")
    : `旋律：尚未分析\n字數建議：${$("#syllableAdvice").textContent}`;
  const inspiration = [
    `情緒：${getSelectedEmotionLabels(state.selectedMoods).join(" / ")}`,
    `靈感原文：${state.ideas.slice(0, 5).map((idea) => idea.text).join(" ｜ ") || "尚未填寫"}`,
    `詞庫：${[...state.keywordMap.keys()].slice(0, 18).join("、") || "尚未建立"}`
  ].join("\n");
  const lyrics = [
    `主題：${$("#themeInput").value.trim() || inferTheme()}`,
    `語言：${$("#targetLang").value}`,
    `發音口味：${$("#dialectInput").value}`,
    `情緒：${getSelectedEmotionLabels(state.lyricMoods).join(" / ")}`,
    `視角：${$("#narratorInput").value}`,
    `口吻：${getChoiceLabel(CHOICES.lyricStyle, $("#lyricStyle").value)}`,
    `段落：${getChoiceLabel(CHOICES.songStructure, $("#songStructure").value)}`,
    `草稿：${$("#lyricsDraft").value.trim() || "尚未生成"}`
  ].join("\n");
  const arrangement = [
    hasPlayableChord()
      ? `和弦：${state.selectedChord.title}，${state.selectedChord.chords.join(" - ")}`
      : (state.selectedChord?.empty ? "和弦：已選空" : "和弦：尚未選擇"),
    `和弦氣質：${state.selectedChord?.style || "未選擇"}`,
    hasPlayableDrum()
      ? `鼓點：${state.selectedDrum.title}，${state.selectedDrum.style}`
      : (state.selectedDrum?.empty ? "鼓點：已選空" : "鼓點：尚未選擇"),
    `推薦依據：${getSelectedEmotionLabels(new Set([...state.lyricMoods, ...state.selectedMoods])).join(" / ")}`
  ].join("\n");
  return {
    humming: melody,
    inspiration,
    lyrics,
    arrangement,
    prompt: $("#promptOutput").value
  };
}

function updateProgress() {
  const pieces = [
    Boolean(state.analysis?.notes?.length),
    state.keywordMap.size > 0,
    $("#lyricsDraft").value.trim().length > 30,
    hasChordChoice(),
    hasDrumChoice(),
    $("#themeInput").value.trim().length > 0
  ];
  const score = Math.round((pieces.filter(Boolean).length / pieces.length) * 100);
  $("#promptScore").textContent = score;
  $("#noteCount").textContent = state.analysis?.notes?.length || 0;
  $("#keywordCount").textContent = state.keywordMap.size;
}

function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const prefix = textarea.value.slice(0, start);
  const suffix = textarea.value.slice(end);
  textarea.value = `${prefix}${text}${suffix}`;
  textarea.focus();
  textarea.selectionStart = textarea.selectionEnd = start + text.length;
}

function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "--";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function formatDateTime(value) {
  if (!value) return "--";
  return new Intl.DateTimeFormat("zh-Hant", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toast(message) {
  const toastEl = $("#toast");
  toastEl.textContent = message;
  toastEl.classList.add("show");
  window.clearTimeout(toastEl.dataset.timer);
  toastEl.dataset.timer = window.setTimeout(() => toastEl.classList.remove("show"), 2400);
}

window.addEventListener("DOMContentLoaded", init);
