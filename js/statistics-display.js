// statistics-display.js

document.addEventListener('DOMContentLoaded', function() {
    // 从 __stats__ 全局变量中读取统计信息
    if (typeof __stats__ !== 'undefined') {
        updateStatistics(__stats__);
    }

    // 初始化网站运行时间
    updateTime();
});

function updateStatistics(stats) {
    const statisticsDiv = document.getElementById('statistics');
    if (statisticsDiv) {
        statisticsDiv.querySelector('#total-pages').textContent = stats.pages.total;
        statisticsDiv.querySelector('#total-words').textContent = stats.words;
        // 代码行数需要单独计算，因为 statistics 插件没有直接提供这个数据
        let totalCodeLines = 0;
        for (let lang in stats.code) {
            totalCodeLines += stats.code[lang];
        }
        statisticsDiv.querySelector('#code-lines').textContent = totalCodeLines;
    }
}

function updateTime() {
    const now = new Date();
    const startDate = new Date("2024-08-01T09:10:00");  // 替换为你的网站启动日期
    const diff = now - startDate;
    const y = Math.floor(diff / (365 * 24 * 3600 * 1000));
    const d = Math.floor((diff % (365 * 24 * 3600 * 1000)) / (24 * 3600 * 1000));
    const h = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000));
    const m = Math.floor((diff % (3600 * 1000)) / (60 * 1000));
    
    let timeString = y > 0 ? 
        `${y}<span class="heti-spacing"> </span>年<span class="heti-spacing"> </span>` : '';
    timeString += `${d}<span class="heti-spacing"> </span>天<span class="heti-spacing"> </span>${h}<span class="heti-spacing"> </span>小时<span class="heti-spacing"> </span>${m}<span class="heti-spacing"> </span>分钟`;
    
    document.getElementById("web-time").innerHTML = timeString;
    setTimeout(updateTime, 60000); // 每分钟更新一次
}

function toggle_statistics() {
    const statistics = document.getElementById("statistics");
    statistics.style.opacity = statistics.style.opacity == "0" ? "1" : "0";
}

// Giscus theme synchronization
document.addEventListener("DOMContentLoaded", function() {
    var palette = __md_get("__palette");
    if (palette && typeof palette.color === "object") {
        if (palette.color.scheme === "slate") {
            var giscus = document.querySelector("script[src*=giscus]");
            giscus.setAttribute("data-theme", "dark");
        }
    }

    var ref = document.querySelector("[data-md-component=palette]");
    ref.addEventListener("change", function() {
        var palette = __md_get("__palette");
        if (palette && typeof palette.color === "object") {
            var theme = palette.color.scheme === "slate" ? "dark" : "light";

            // Instruct Giscus to change theme
            var frame = document.querySelector(".giscus-frame");
            frame.contentWindow.postMessage(
                { giscus: { setConfig: { theme } } },
                "https://giscus.app"
            );
        }
    });
});