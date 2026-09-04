document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]) {
            container.innerHTML = '<div class="error-state">No active tab found.</div>';
            return;
        }

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: scrapeAttendanceTable
        }, (results) => {
            if (chrome.runtime.lastError || !results || !results[0].result) {
                container.innerHTML = '<div class="error-state">Please open your SRU Dashboard tab (<a href="https://sraap.in/student/dash_board.php" target="_blank" style="color: #38bdf8;">sraap.in</a>) to view your attendance tracker.</div>';
                return;
            }

            const subjectList = results[0].result;
            renderTracker(subjectList);
        });
    });
});

function scrapeAttendanceTable() {
    const rows = document.querySelectorAll('tr');
    if (rows.length === 0) return [];

    let subjectList = [];

    rows.forEach(row => {
        const cells = row.children;
        if (cells.length >= 5) {
            const courseLink = cells[1].querySelector('a');
            
            if (courseLink && courseLink.href.includes('attendance_subwise')) {
                const name = courseLink.innerText.trim();
                const ltp = parseInt(cells[2].innerText.trim(), 10) || 0;
                const held = parseInt(cells[3].innerText.trim(), 10) || 0;
                const pr = parseInt(cells[4].innerText.trim(), 10) || 0;

                if (held > 0) {
                    subjectList.push({ name, ltp, held, pr });
                }
            }
        }
    });

    return subjectList;
}

function renderTracker(subjectList) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    let totalHeldAll = 0;
    let totalPrAll = 0;
    let totalClassesNeeded = 0;

    subjectList.forEach(sub => {
        totalHeldAll += sub.held;
        totalPrAll += sub.pr;

        const currentPct = (sub.held > 0) ? (sub.pr / sub.held) * 100 : 0;
        let statusHTML = '';
        let badgeClass = '';
        let strokeColor = '#22c55e';

        if (currentPct >= 75) {
            badgeClass = 'safe';
            const safeMisses = Math.floor((sub.pr - 0.75 * sub.held) / 0.75);
            statusHTML = `Safe! Can skip ${safeMisses} classes`;
        } else {
            const classesNeeded = Math.ceil((0.75 * sub.held - sub.pr) / 0.25);
            totalClassesNeeded += classesNeeded;
            badgeClass = '';
            statusHTML = `Need to attend <strong>${classesNeeded}</strong> more classes`;
            strokeColor = currentPct < 60 ? '#ef4444' : '#f59e0b';
        }

        const radius = 26;
        const circumference = 2 * Math.PI * radius;
        const clampedPct = Math.min(Math.max(currentPct, 0), 100);
        const strokeDashoffset = circumference - (clampedPct / 100) * circumference;

        const card = document.createElement('div');
        card.className = 'subject-card';
        card.innerHTML = `
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle stroke="#e2e8f0" stroke-width="5" fill="transparent" r="${radius}" cx="30" cy="30"/>
                    <circle class="progress-ring-circle" stroke="${strokeColor}" stroke-width="5" stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" stroke-linecap="round" fill="transparent" r="${radius}" cx="30" cy="30"/>
                </svg>
                <div class="progress-text">${currentPct.toFixed(1)}%</div>
            </div>
            <div class="subject-info">
                <h3 class="subject-name">${sub.name}</h3>
                <div class="status-badge ${badgeClass}">${statusHTML}</div>
            </div>
        `;
        container.appendChild(card);
    });

    const overallPct = totalHeldAll > 0 ? ((totalPrAll / totalHeldAll) * 100).toFixed(1) : '0.0';
    const overallCard = document.createElement('div');
    overallCard.className = 'overall-card';
    overallCard.innerHTML = `
        <div class="overall-left">
            <div>
                <p class="overall-title">Overall Attendance</p>
                <h2 class="overall-value">${overallPct}%</h2>
            </div>
        </div>
        <div class="overall-right-box">
            <p class="overall-right-title">Target: 75%</p>
            <p class="overall-right-sub">Need ~${totalClassesNeeded} classes</p>
        </div>
    `;
    container.appendChild(overallCard);
}