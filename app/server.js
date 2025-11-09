import { Client, GatewayIntentBits, Events } from "discord.js";
// ====== 設定部分 ======
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const channelId = process.env.YOUR_CHANNEL_ID; // ←ここを使用するチャンネルIDへ

// 魔法・バーストアーツ・秘奥義（after欄に後台詞を入れる。改行は\n）
const spells = [
  {
    name: "ファイアーボール！",
    chant: "揺らめく焔、猛追！",
    chant_short: "いっけぇ！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "イラプション！",
    chant: "火焔の帝王、地の底より舞い戻れ！",
    chant_short: "出でよ！",
    is_skill_change: true,
    after: "",
  },
  {
    name: "スパイラルフレア！",
    chant: "灼熱の軌跡を以って野卑なる蛮行を滅せよ",
    chant_short: "せーのぉ！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "フレイムドラゴン！",
    chant: "熱く滾りし炎、聖なる獣となり不道を喰らい尽くせ",
    chant_short: "序でに出て来い！",
    is_skill_change: true,
    after: "",
  },
  {
    name: "クリムゾンフレア！",
    chant: "無慈悲なる劫火は汝らの心をも燃やし尽くす！",
    chant_short: "以下省略！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "ストーンブラスト！",
    chant: "細やかなる大地の騒めき",
    chant_short: "いっけぇ！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "アイヴィーラッシュ！",
    chant: "目覚めよ、無慈悲で名も無き茨の女王",
    chant_short: "茨よ！",
    is_skill_change: true,
    after: "",
  },
  {
    name: "ロックブレイク！",
    chant: "怒りを穂先に変え、前途を阻む障害を貫け",
    chant_short: "せーのぉ！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "ライオットホーン！",
    chant: "地の底を這いし魔神 、汝の角で地上の敵を打ち砕け",
    chant_short: "微塵に砕け！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "グランドダッシャー！",
    chant: "大地の脈動 、その身を贄にして敵を砕かん",
    chant_short: "以下省略！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "シャンパーニュ！",
    chant: "あどけなき水の戯れ",
    chant_short: "いっけぇ！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "スプラッシュ！",
    chant: "穢れなき汝の清浄を彼の者に与えん",
    chant_short: "せーのぉ！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "アクアレイザー！",
    chant: "蒼き命を讃えし母よ 、破断し清烈なる産声を上げよ",
    chant_short: "打ち上げろ！",
    is_skill_change: true,
    after: "",
  },
  {
    name: "フリーズランサー！",
    chant: "氷結せし刃、鋭く空を駆け抜ける",
    chant_short: "鋭く、速く！",
    is_skill_change: true,
    after: "",
  },
  {
    name: "タイダルウェイブ！",
    chant: "狂気と強欲の水流、旋嵐の如く逆巻く！",
    chant_short: "以下省略！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "ブレードロール！",
    chant: "尊貴なる光の斬撃、不滅の悪をも圧倒する！",
    chant_short: "以下省略！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "サンダーブレード！",
    chant: "正義の意志、雷撃の剣となり咎ある者に降り落ちる",
    chant_short: "痺れるんだからね！",
    is_skill_change: true,
    after: "",
  },
  {
    name: "スプレッドゼロ！",
    chant: "揺蕩う闇の微笑",
    chant_short: "いっけぇ！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "デモンズランス！",
    chant: "黒曜の輝き、快速の槍となり、敵を討つ",
    chant_short: "避けられないわよ！",
    is_skill_change: true,
    after: "",
  },
  {
    name: "ネガティブゲイト！",
    chant: "貪欲な暗塊ここに下り、邪を打ち砕かん",
    chant_short: "せーのぉ！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "ヴァイオレントペイン！",
    chant: "解き放たれし不穏なる異界の力、目の前の邪悪に裁きを",
    chant_short: "以下省略！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "ブラッディハウリング！",
    chant: "集え暗き炎よ 、宴の客を戦慄の歌で迎え もて成せ",
    chant_short: "黄泉への誘い！",
    is_skill_change: true,
    after: "",
  },
  {
    name: "トラクタービーム！",
    chant: "誘惑の罠張り巡らし、我が懐中へ",
    chant_short: "せーのぉ！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "ゴルドカッツ！",
    chant: "幸運招きし金色の雨降、汝の名は",
    chant_short: "にゃーん！",
    is_skill_change: true,
    after: "",
  },
  {
    name: "メテオスウォーム！",
    chant: "宙(そら)に放浪せし無数の粉塵 、驟雨となり大地を礼賛す",
    chant_short: "以下省略！",
    is_skill_change: false,
    after: "",
  },
  {
    name: "バーンストライク！",
    chant: "来たれ爆炎！　焼き尽くせ！",
    chant_short: "以下省略！",
    is_skill_change: false,
    after: "",
  },
];

const burstArts = [
  {
    title: "燦然たる神秘、",
    name: "ミスティックドライヴ！",
    after: "",
  },
  {
    title: "激昂せし焔、",
    name: "レッドスプラッシュ！",
    after: "",
  },
  {
    title: "破壊への重圧！",
    name: "ルーイナスドライヴ！",
    after: "",
  },
  {
    title: "駆け抜ける風刃…",
    name: "フリーティングドライヴ！",
    after: "",
  },
  {
    title: "舞い踊る水魔！",
    name: "ディフュージョナルドライヴ！",
    after: "",
  },
];

const hiOugi = {
  label: "【第一秘奥義！】",
  chant:
    "万象を成しえる根源たる力…太古に刻まれしその記憶\n我が呼び声に応え、今、此処に蘇れ！",
  name: "エンシェントカタストロフィ！",
  after: "これがあたしの研究成果よ！",
};
const daiOugi = {
  label: "【第二秘奥義！】",
  chant:
    "天光満つる処に我はあり、黄泉の門開くところに汝あり、出でよ、神の雷…！\nこれで終わりよ！",
  name: "インディグネイション！！",
  after: "",
};

const overlimitProb = 0.05; // 5%発動

// ====== 状態管理 ======
let usageCount = 0;
let overlimitState = false;
let overlimitCount = 0;
let nextBurstArts = false;
let nextHiOugi = false;

// ====== メイン動作関数 ======
async function triggerMagic(channel) {
  let msgLines = [];

  // (1) 秘奥義予約
  if (nextHiOugi) {
    if (overlimitState && Math.random() < overlimitProb) {
      msgLines.push(daiOugi.label);
      msgLines.push(`${daiOugi.chant}\n${daiOugi.name}`);
      if (daiOugi.after) msgLines.push(daiOugi.after);
      overlimitState = false;
      overlimitCount = 0;
    } else {
      msgLines.push(hiOugi.label);
      msgLines.push(`${hiOugi.chant}\n${hiOugi.name}`);
      if (hiOugi.after) msgLines.push(hiOugi.after);
      overlimitState = false;
      overlimitCount = 0;
    }
    nextHiOugi = false;
    usageCount++;
    await channel.send(msgLines.join("\n"));
    return;
  }

  // (2) バーストアーツ
  if (nextBurstArts) {
    const burst = burstArts[Math.floor(Math.random() * burstArts.length)];
    msgLines.push("【バーストアーツ！】");
    msgLines.push(`${burst.title}\n${burst.name}`);
    if (burst.after) msgLines.push(burst.after);
    nextBurstArts = false;
    nextHiOugi = true;
    usageCount++;
    await channel.send(msgLines.join("\n"));
    return;
  }

  // (3) オーバーリミッツ中
  if (overlimitState) {
    const spell = spells[Math.floor(Math.random() * spells.length)];
    if (overlimitCount === 0) msgLines.push("【Overlimits!】");
    if (spell.is_skill_change) msgLines.push("【スキル変化！】");
    msgLines.push(`${spell.chant_short}\n${spell.name}`);
    if (spell.after) msgLines.push(spell.after);
    overlimitCount++;
    nextBurstArts = true;
    usageCount++;
    await channel.send(msgLines.join("\n"));
    return;
  }

  // (4) 通常／オーバーリミッツ発動
  const spell = spells[Math.floor(Math.random() * spells.length)];
  if (Math.random() < overlimitProb) {
    msgLines.push("【Overlimits!】");
    overlimitState = true;
    overlimitCount = 0;
    if (spell.is_skill_change) msgLines.push("【スキル変化！】");
    msgLines.push(`${spell.chant_short}\n${spell.name}`);
    if (spell.after) msgLines.push(spell.after);
    nextBurstArts = true;
  } else {
    if (spell.is_skill_change) msgLines.push("【スキル変化！】");
    msgLines.push(`${spell.chant}\n${spell.name}`);
    if (spell.after) msgLines.push(spell.after);
  }
  usageCount++;
  await channel.send(msgLines.join("\n"));
}

// ====== 定時トリガー ======
client.once(Events.ClientReady, () => {
  const channel = client.channels.cache.get(channelId);
  if (!channel) return;
  setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    // 23:00～5:00はスキップ
    if (now.getMinutes() === 0 && !(hour >= 23 || hour < 5)) {
      triggerMagic(channel);
    }
  }, 1000 * 60); // 1分ごと
});
// ====== メンション対応・即時発動 ======
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (message.mentions.has(client.user)) {
    await triggerMagic(message.channel);
  }
});

// ====== Botログイン ======
client.login(process.env.YOUR_BOT_TOKEN); // ←ここを自分のBotトークンに変更