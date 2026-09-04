```markdown
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-UI-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Styles-1572B6?logo=css3&logoColor=white)
![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-4285F4?logo=googlechrome&logoColor=white)

# SRaap Track 🚀

A lightweight, modern Chrome Extension designed for SRU students to effortlessly track their attendance, calculate safe skip limits, and monitor progress toward the mandatory 75% attendance threshold.

---

## 📌 Features

- **Real-Time Scraping:** Automatically reads your course attendance table directly from your SRU Dashboard (`sraap.in`).
- **Interactive Progress Rings:** Visual SVG progress rings color-coded by attendance status (Green for Safe, Amber/Red for Warning/Critical).
- **Smart Calculations:**
  - If **≥ 75%**: Instantly tells you exactly how many classes you can afford to skip safely.
  - If **< 75%**: Precisely calculates the number of consecutive classes you need to attend to bounce back to 75%.
- **Overall Attendance Summary:** Provides an aggregated view of your total classes held vs. attended along with total classes required.
- **Manifest V3 Compliant:** Built using the latest Chrome Extension standards for enhanced security and performance.

---

## 🛠️ Tech Stack

- **JavaScript (ES6+)**: Extension logic, DOM manipulation, and dynamic card rendering.
- **HTML5 & CSS3**: Clean, modern UI styled with CSS Variables, Flexbox, and custom SVG rings.
- **Chrome Extensions API**: `activeTab`, `scripting`, and host permissions.

---

## 📂 Project Structure

```text
SRaap-Track/
│
├── manifest.json       # Extension configuration (Manifest V3)
├── popup.html          # Extension popup UI structure
├── popup.js            # Attendance scraping & calculation logic
├── icon16.png          # 16x16 App Icon
├── icon48.png          # 48x48 App Icon
└── icon128.png         # 128x128 App Icon

```

---

## ⚙️ Installation & Setup (Developer Mode)

To install and run this extension locally on Google Chrome:

1. **Clone or Download** this repository to your local machine:
```bash
git clone [https://github.com/your-username/sraap-track.git](https://github.com/your-username/sraap-track.git)

```


2. Open Google Chrome and navigate to:
```text
chrome://extensions/

```


3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click on the **Load unpacked** button in the top-left corner.
5. Select the folder containing your extension files (`manifest.json`, `popup.js`, etc.).
6. The **SRaap Track** extension will now appear in your extensions list and toolbar!

---

## 🚀 How to Use

1. Log in to your SRU Dashboard via [sraap.in](https://sraap.in/student/dash_board.php).
2. Click on the **SRaap Track** icon in your Chrome toolbar.
3. View your individual subject attendance breakdown, safe skip counts, and overall standing instantly!

---

## 🛡️ Privacy

This extension is completely client-side. It does not collect, store, or transmit any personal or academic data to external servers. All calculations run locally in your browser popup.

---

```

```
