const $ = (id) => document.getElementById(id);

const CATS = {
  love: {
    label: "LOVE", emoji: "❤️",
    messages: {
      sweet: [
        "{person}, I've loved you for {duration}. And yet it still feels like only the beginning.",
        "{person}, for {duration} my heart has known your name. Magic.",
      ],
      funny: [
        "{person}, I've been hopelessly into you for {duration} now. Best fall I ever took.",
        "{person}, for {duration} you've had my heart in a headlock. Worth it.",
      ],
      heartfelt: [
        "{person}, for {duration} I've loved you. Through it all — the easy days and the hard ones — it's always been you.",
      ],
      sarcastic: [
        "{person}, I've put up with you for {duration}. There is no refund policy. Deal with it.",
        "{person}, you've owned this pathetic heart of mine for {duration} now. Congratulations, I guess.",
      ],
    },
  },
  friendship: {
    label: "FRIENDSHIP", emoji: "🤝",
    messages: {
      sweet: [
        "{person}, we've been friends for {duration}. Thank you for knowing me that long.",
        "{person}, for {duration} you've been my person. I'm so lucky.",
      ],
      funny: [
        "{person}, we've been friends for {duration}. And you still put up with my shit!",
        "{person}, {duration} of friendship and you haven't ditched me yet. Diamond level loyalty.",
      ],
      heartfelt: [
        "{person}, through {duration} of friendship you've seen the best and worst of me and stayed. That means everything.",
      ],
      sarcastic: [
        "{person}, for {duration} I've kept you around. Mostly for the snacks. But also because I love you.",
        "{person}, {duration} of knowing all my secrets. I trust you won't use them. Yet.",
      ],
    },
  },
  anniversary: {
    label: "ANNIVERSARY", emoji: "💍",
    messages: {
      sweet: [
        "{person}, {duration} since we said yes. And my answer hasn't changed — it's still you.",
        "{person}, for {duration} we've been writing our story together. Here's to many more chapters.",
      ],
      funny: [
        "{person}, we've survived {duration} together. That's officially longer than any battery in this house.",
        "{person}, {duration} married to me. You deserve a medal, and I'd give you one. Of love.",
      ],
      heartfelt: [
        "{person}, {duration} ago we chose each other. I'd choose you again, every single time.",
      ],
      sarcastic: [
        "{person}, for {duration} you've legally been stuck with me. Sucks to be you. Forever.",
        "{person}, {duration} of wedded bliss. Bold of you to keep me this long.",
      ],
    },
  },
  birthday: {
    label: "BIRTHDAY", emoji: "🎂",
    messages: {
      sweet: [
        "Happy birthday, {person}! For {duration} this world has been brighter with you in it.",
        "{person}, you've graced us for {duration}. Happy birthday to someone I'm so glad exists.",
      ],
      funny: [
        "Congratulations, {person}! You've been stuck on this shitty planet for {duration}! Happy birthday!",
        "{person}, you've officially spent {duration} orbiting the sun. That's called commitment.",
      ],
      heartfelt: [
        "{person}, for {duration} you've been here — and this world is better for it. Happy birthday to the one who made {name}'s life sweeter.",
      ],
      sarcastic: [
        "Wow, {person}. {duration} old. The warranty on this one definitely expired. Happy birthday anyway!",
        "{person}, you've been taking up space for {duration}. At least you look good doing it. Happy birthday.",
      ],
    },
  },
  firstmeeting: {
    label: "FIRST MET", emoji: "✨",
    messages: {
      sweet: [
        "{person}, it's been {duration} since the day we met. Funny how a stranger became everything.",
        "{person}, {duration} since that first hello. Best hello of my life.",
      ],
      funny: [
        "{person}, {duration} since the day I met you. I will never admit I knew you don't like me. Kidding.",
        "{person}, we've known each other {duration}. That's your fault for being likable.",
      ],
      heartfelt: [
        "{person}, {duration} ago we crossed paths for the first time. I couldn't have known you'd mean this much.",
      ],
      sarcastic: [
        "{person}, it's been {duration} since you walked into my life unannounced. I've kept you anyway.",
        "{person}, {duration} since I met you and you've been comedy for me the whole time. Please don't stop.",
      ],
    },
  },
  other: {
    label: "REMEMBERED", emoji: "🌸",
    messages: {
      sweet: [
        "{person}, it's been {duration} since {name} began remembering this. And every day it still matters.",
        "{person}, {duration} has passed since then. Some moments never fade.",
      ],
      funny: [
        "{person}, {duration} down. Still going. Impressive dedication to a memory, honestly.",
        "{person}, it's been {duration} and here we are. Time flies when you're counting.",
      ],
      heartfelt: [
        "{person}, {duration} ago began something worth remembering. {name} will always treasure it.",
      ],
      sarcastic: [
        "{person}, {duration} since it all started. Honestly, what were we thinking?",
        "{person}, {duration} later and we're still talking about it. Some things just stick.",
      ],
    },
  },
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---- Time ----
function diff(start, end) {
  let y = end.getFullYear() - start.getFullYear();
  let m = end.getMonth() - start.getMonth();
  let d = end.getDate() - start.getDate();
  if (d < 0) {
    d += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    m--;
  }
  if (m < 0) { m += 12; y--; }
  return { y, m, weeks: Math.floor(d / 7), days: d % 7 };
}
const unit = (n, w) => `${n} ${w}${n > 1 ? "s" : ""}`;
function phrase(t) {
  const p = [];
  if (t.y) p.push(unit(t.y, "year"));
  if (t.m) p.push(unit(t.m, "month"));
  if (t.weeks) p.push(unit(t.weeks, "week"));
  if (t.days) p.push(unit(t.days, "day"));
  if (!p.length) p.push("0 days");
  return p.join(", ");
}
function fmt(d) {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

// ---- State ----
const state = { cat: "love", emoji: "❤️", tone: "sweet" };

function applyTheme(category) {
  document.body.classList.remove("theme-love", "theme-friendship", "theme-birthday");
  const theme = category === "friendship" || category === "birthday" ? category : "love";
  document.body.classList.add(`theme-${theme}`);
}

applyTheme(state.cat);

// ---- Pills ----
document.querySelectorAll("#category .pill").forEach((b) => {
  b.addEventListener("click", () => {
    document.querySelectorAll("#category .pill").forEach((x) => { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
    b.classList.add("active"); b.setAttribute("aria-pressed", "true");
    state.cat = b.dataset.cat; state.emoji = b.dataset.emoji;
    applyTheme(state.cat);
  });
});
document.querySelectorAll("#tone .pill").forEach((b) => {
  b.addEventListener("click", () => {
    document.querySelectorAll("#tone .pill").forEach((x) => { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
    b.classList.add("active"); b.setAttribute("aria-pressed", "true");
    state.tone = b.dataset.tone;
  });
});

// ---- Authored message ----
function buildMessage() {
  const name = $("name").value.trim() || "Name";
  const person = $("person").value.trim() || "You";
  const chosen = CATS[state.cat];
  const template = pick(chosen.messages[state.tone]);
  return {
    emoji: chosen.emoji,
    label: chosen.label,
    duration: phrase($.current.diff),
    message: template.replace(/\{person\}/g, person).replace(/\{name\}/g, name).replace(/\{duration\}/g, $.current.diffPhrase),
    since: `Since ${fmt($.current.start)} · ${$.current.totalDays} days and counting`,
  };
}

function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2400);
}

// ---- Compute & show ----
$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = $("date").value;
  if (!raw) { toast("Pick a date first 💜"); return; }
  const start = new Date(raw + "T12:00:00");
  const now = new Date();
  start.setHours(0, 0, 0, 0); const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (start > today) { toast("That date hasn't happened yet…"); return; }

  $.current = {
    start, today, diff: diff(start, today),
    diffPhrase: phrase(diff(start, today)),
    totalDays: Math.round((today - start) / 86400000),
    name: $("name").value.trim() || "Name",
    person: $("person").value.trim() || "You",
  };

  const r = buildMessage();
  $("resultEmoji").textContent = r.emoji;
  $("resultLabel").textContent = r.label;
  $("duration").textContent = r.duration;
  $("message").textContent = r.message;
  $("since").textContent = r.since;
  $("result").classList.remove("hidden");
  $("result").scrollIntoView({ behavior: "smooth", block: "start" });
});

// ---- Save / library ----
const LS_KEY = "her_saved";
const loadSaved = () => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; } };
const saveSaved = (list) => localStorage.setItem(LS_KEY, JSON.stringify(list));

function renderSaved() {
  const list = loadSaved();
  const wrap = $("saved");
  if (list.length === 0) { wrap.classList.add("hidden"); return; }
  wrap.classList.remove("hidden");
  const ul = $("savedList");
  ul.innerHTML = "";
  list.forEach((s) => {
    const li = document.createElement("li");
    li.className = "saved-item";
    li.innerHTML = `
      <span class="s-emoji">${s.emoji}</span>
      <span class="s-meta">
        <span class="s-name">${s.label}: ${s.person || "You"}</span>
        <span class="s-sub">${s.message}</span>
        <span class="s-date">Began ${fmt(new Date(s.start))}</span>
      </span>
      <button class="s-del" title="Remove">✕</button>`;
    li.querySelector(".s-del").addEventListener("click", (e) => {
      e.stopPropagation();
      saveSaved(loadSaved().filter((x) => x.id !== s.id));
      renderSaved();
    });
    li.addEventListener("click", () => {
      $("name").value = s.name || "";
      $("person").value = s.person || "";
      $("date").value = s.date;
      document.querySelector(`#category .pill[data-cat="${s.cat}"]`)?.click();
      document.querySelector(`#tone .pill[data-tone="${s.tone}"]`)?.click();
      $("form").dispatchEvent(new Event("submit"));
      $("saved").scrollIntoView({ behavior: "smooth" });
    });
    ul.appendChild(li);
  });
}

$("save").addEventListener("click", () => {
  if (!$.current) { toast("Make a message first 💜"); return; }
  const list = loadSaved();
  const r = buildMessage();
  list.unshift({
    id: Date.now(),
    name: $.current.name, person: $.current.person,
    date: $.current.start.toISOString().slice(0, 10),
    start: $.current.start.toISOString(),
    cat: state.cat, tone: state.tone,
    emoji: r.emoji, label: r.label, message: r.message,
  });
  saveSaved(list);
  renderSaved();
  toast("Saved to your keepsakes 💜");
});

// ---- Share ----
$("share").addEventListener("click", async () => {
  if (!$.current) { toast("Make a message first 💜"); return; }
  const text = `${$("resultEmoji").textContent} ${$("message").textContent}\n${$("since").textContent}\n— from H.E.R. 💜`;
  const nav = navigator.share;
  if (nav) { try { await nav({ text }); } catch {} }
  else {
    try { await navigator.clipboard.writeText(text); toast("Copied to clipboard 💜"); }
    catch { toast("Couldn't share 💜"); }
  }
});

// ---- Keepsake ----
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

$("keepsake").addEventListener("click", () => {
  if (!$.current) { toast("Make a message first 💜"); return; }
  const r = buildMessage();
  const c = document.createElement("canvas");
  const W = 800, H = 1000;
  c.width = W; c.height = H;
  const g = c.getContext("2d");

  const bg = g.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#2b1445");
  bg.addColorStop(0.5, "#4a2170");
  bg.addColorStop(1, "#7a2f8f");
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);

  // glow
  const glow = g.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, 480);
  glow.addColorStop(0, "rgba(255,160,230,.20)");
  glow.addColorStop(1, "rgba(255,160,230,0)");
  g.fillStyle = glow; g.fillRect(0, 0, W, H);

  // border frame
  g.strokeStyle = "rgba(255,255,255,.25)";
  g.lineWidth = 2;
  g.strokeRect(34, 34, W - 68, H - 68);

  // hearts corner accents
  const hs = ["💜", "💜", "💜"];
  g.font = "34px sans-serif"; g.textAlign = "center"; g.textBaseline = "top";
  g.fillText("💜", 70, 84); g.fillText("💜", W - 70, 84);
  g.fillText("💜", 70, H - 120); g.fillText("💜", W - 70, H - 120);

  const cx = W / 2;
  let y = 130;

  g.font = "800 30px system-ui, sans-serif"; g.textAlign = "center"; g.textBaseline = "top";
  const grad = g.createLinearGradient(cx - 120, 0, cx + 120, 0);
  grad.addColorStop(0, "#d9c2ff"); grad.addColorStop(1, "#ff9ae0");
  g.fillStyle = grad;
  g.fillText("H.E.R.", cx, y);
  y += 44;
  g.font = "500 17px system-ui, sans-serif"; g.fillStyle = "rgba(255,255,255,.65)";
  g.fillText("Heartfelt Elapsed Remembrance", cx, y);
  y += 54;

  g.font = "52px sans-serif"; g.fillText(r.emoji, cx, y); y += 78;

  g.font = "700 20px system-ui, sans-serif"; g.fillStyle = "#ffd7f5";
  g.fillText(r.label, cx, y); y += 46;

  // duration
  g.font = "800 40px system-ui, sans-serif"; g.fillStyle = "#ffffff";
  const dLines = wrapText(g, r.duration, W - 160);
  for (const l of dLines) { g.fillText(l, cx, y); y += 52; }
  y += 12;

  // divider
  g.strokeStyle = "rgba(255,255,255,.25)";
  g.beginPath(); g.moveTo(cx - 120, y); g.lineTo(cx + 120, y); g.stroke();
  y += 40;

  // message
  g.font = "600 24px system-ui, sans-serif"; g.fillStyle = "#f6ecff";
  const mLines = wrapText(g, r.message, W - 170);
  for (const l of mLines) { g.fillText(l, cx, y); y += 40; }

  // since
  y += 8;
  g.font = "500 18px system-ui, sans-serif"; g.fillStyle = "rgba(255,255,255,.7)";
  for (const l of wrapText(g, r.since, W - 180)) { g.fillText(l, cx, y); y += 28; }

  // footer
  g.font = "700 22px system-ui, sans-serif"; g.fillStyle = "#ffd7f5";
  g.fillText("Every moment matters. Every day counts. 💜", cx, H - 84);

  const box = $("cardCanvas");
  box.innerHTML = "";
  box.appendChild(c);
  $("keepsakeWrap").classList.remove("hidden");
  $("keepsakeWrap").scrollIntoView({ behavior: "smooth" });
  $.lastCanvas = c;
});

$("download").addEventListener("click", () => {
  if (!$.lastCanvas) return;
  const a = document.createElement("a");
  a.download = "her-keepsake.png";
  a.href = $.lastCanvas.toDataURL("image/png");
  a.click();
});
$("keepsakeClose").addEventListener("click", () => {
  $("keepsakeWrap").classList.add("hidden");
});

renderSaved();
