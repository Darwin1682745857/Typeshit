const fs = require("fs");
let css = fs.readFileSync("css/style.css", "utf8");

css = css.replace(/\.sidebar-logo \{[\s\S]*?border-radius: 50%;\s*\}/, `.sidebar-logo {
    font-family: "Plus Jakarta Sans", sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--text-color);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 12px;
    letter-spacing: -0.5px;
    margin-right: 0;
}
.sidebar-logo i {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 0.9rem;
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
}`);

fs.writeFileSync("css/style.css", css);

const files = [
    "index.html",
    "pages/dashboard.html",
    "pages/schedule.html",
    "pages/timer.html",
    "pages/todo.html",
    "pages/khmer_calendar.html",
    "pages/world_calendar.html"
];

const linkRegex = /<a href="([^"]*homepage\.html)" class="sidebar-logo" title="Back to Home"[^>]*>[\s\S]*?<i class="fas fa-layer-group"><\/i>\s*<\/a>/;

for(const file of files) {
    if(!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, "utf8");
    content = content.replace(/<a href="(.*?homepage\.html)" class="sidebar-logo" title="Back to Home"[^>]*>\s*<i class="fas fa-layer-group"><\/i>\s*<\/a>/, `<a href="$1" class="sidebar-logo" title="Back to Home">\n            <i><div class="fas fa-layer-group"></div></i>\n            PlanTech\n        </a>`);
    fs.writeFileSync(file, content);
}

