const fs = require("fs");
let css = fs.readFileSync("css/style.css", "utf8");

// Fix .sidebar-tab.active::before
css = css.replace(/\.sidebar-tab\.active::before \{\s*content:[^}]+\}/, `.sidebar-tab.active::before {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 4px;
}`);

// Fix Mobile overrides that force sidebar to be vertical again
css = css.replace(/@media \(max-width: 900px\) \{[\s\S]*?\}\s*\}\s*@import url/g, "@import url");

// Remove 900px block completely or safely
css = css.replace(/@media \(max-width: 900px\) \{[\s\S]*?\.main-wrapper \{\s*margin-left: 0;\s*\}\s*\}/, "");

// Remove 768px .sidebar overrides
css = css.replace(/\.sidebar \{\s*width: 56px;\s*\}/, `.sidebar { width: 100%; padding: 0 12px; }`);
css = css.replace(/\.main-wrapper \{\s*margin-left: 56px;\s*\}/, `.main-wrapper { margin-left: 0; }`);
// Make 480px bottom bar into a normal header or just shrink icons
css = css.replace(/@media \(max-width: 480px\) \{[\s\S]*?\.main-wrapper \{\s*margin-left: 0;\s*\}\s*\}/, `@media (max-width: 768px) {
    .sidebar-tab span { display: none; }
    .sidebar-logo { display: none; }
    .sidebar { padding: 0 8px; justify-content: center; }
    .sidebar-nav { justify-content: center; gap: 4px; }
}`);

// Remove sidebar-toggle CSS as no longer needed
css = css.replace(/\.sidebar-toggle \{[\s\S]*?\.sidebar-toggle:focus \{[\s\S]*?\}/, "");

fs.writeFileSync("css/style.css", css);

