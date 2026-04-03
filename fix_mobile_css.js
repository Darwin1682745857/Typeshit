const fs = require("fs");
let css = fs.readFileSync("css/style.css", "utf8");

// Clear specifically max-width 480 sidebar mobile bottom overrides
css = css.replace(/@media \(max-width: 480px\) \{\s*\/\* Sidebar becomes bottom[\s\S]*?main-wrapper \{\s*margin-left: 0;\s*\}\s*\}/, `@media (max-width: 480px) {
    .sidebar {
        height: 60px;
        padding: 0 10px;
        justify-content: space-between;
    }
    .sidebar-logo {
        display: none;
    }
    .sidebar-nav {
        gap: 0;
        justify-content: space-around;
        width: 100%;
    }
    .sidebar-tab {
        width: 45px;
        height: 45px;
        padding: 0;
    }
    .main-wrapper {
        padding-top: 60px;
    }
}`);
fs.writeFileSync("css/style.css", css);

