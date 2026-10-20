# MUT-III Connector — Official Product & Landing Repository

> **Official Website & Commercial Landing Page for MUT-III Connector**  
> Published via **GitHub Pages** with support for custom domains, bilingual localization (English / Russian), and hosted **Robokassa** checkout.

---

## 🚀 About MUT-III Connector

**MUT-III Connector** is a specialized Windows utility that bridges Mitsubishi's official **MUT-III SE (Special Edition)** dealer diagnostic software with virtually any standard J2534 Pass-Thru diagnostic adapter.

- **Dealer-Level Diagnostics:** Access 100% of MUT-III SE functionality using affordable diagnostic hardware (Scanmatik 2 PRO, Dialink J2534, OpenPort 2.0, VNCI, etc.).
- **ECU Programming & Reprog:** Flash and update vehicle control modules using official Mitsubishi firmware databases.
- **Variant Coding & Customization:** Configure ETACS settings, enable hidden factory features, calibrate sensors, and perform CVT fluid pressure and calibration resets (including Jatco JF016E).
- **Automated Registry Profile Setup:** One-click configuration of `PassThruSupport.04.04` and `05.00` keys with automated pre-flight backup and instant restore.
- **Pajero 4 ABS/ASC Fix:** Built-in proxy shim applying 50ms fast-init timings to reliably communicate with Pajero IV K-Line ABS/ASC modules.
- **100% Offline & Private:** Zero external telemetry, no background cloud calls, runs entirely offline on your diagnostic workstation.

---

## 🌐 Website Architecture & Structure (GitHub Pages Ready)

The website is fully static, requires no server backend, and is structured directly for GitHub Pages deployment:

```text
mut-3-se-connector/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml    # GitHub Actions workflow for automated Pages deployment
├── .nojekyll                   # Bypasses Jekyll processing on GitHub Pages
├── CNAME                       # Custom domain mapping (mut3connector.com)
├── index.html                  # Main landing page (English default + auto-detect Russian)
├── terms/
│   └── index.html              # Terms of Sale / Public Offer (English)
├── privacy/
│   └── index.html              # Privacy Policy (English)
├── refund/
│   └── index.html              # Refund & Cancellation Policy (English)
├── payment-success/
│   └── index.html              # Post-checkout success & HWID instructions (EN/RU)
├── payment-failed/
│   └── index.html              # Payment cancellation & retry page (EN/RU)
├── ru/
│   ├── terms/
│   │   └── index.html          # Условия продажи и Публичная оферта (Русский)
│   ├── privacy/
│   │   └── index.html          # Политика конфиденциальности (Русский)
│   └── refund/
│       └── index.html          # Политика возврата средств (Русский)
├── assets/
│   ├── css/
│   │   └── styles.css          # Windows 11 Fluent 2 Design System
│   ├── js/
│   │   ├── config.js           # Central configuration (price, Robokassa URL, seller details)
│   │   ├── i18n.js             # Bilingual dictionary & browser locale detection
│   │   └── main.js             # Navigation, tabs, FAQ accordion & localization engine
│   └── img/
│       ├── app_icon.png        # 256x256 high-resolution app icon
│       ├── app-ui-manage.svg   # Vector preview of Management window
│       ├── app-ui-diag.svg     # Vector preview of Diagnostics center
│       ├── screenshot-manage.jpg # Real laptop screenshot in workshop
│       └── screenshot-backup.jpg # Real laptop screenshot of backup creation
├── favicon.ico                 # Favicon
├── robots.txt                  # Search engine directives
├── sitemap.xml                 # XML sitemap with hreflang tags
├── DEPLOYMENT.md               # Detailed Robokassa & GitHub Pages deployment guide
└── README.md                   # This file
```

---

## 🛠 Local Preview

Run a local HTTP server from the repository root:

```powershell
python -m http.server 8000
```

Then navigate to: `http://localhost:8000/`

---

## ⚙️ Configuration & Customization

Before launching publicly or submitting to Robokassa for moderation, edit `assets/js/config.js`:

1. **Robokassa Payment Link:**
   Set `robokassaUrl` to your hosted checkout link.
2. **Pricing:**
   Set `priceUsd: 15` and `priceEurDisplay: 14`.
3. **Seller Information:**
   Update your legal name, INN, city, support email (`alfaslash@gmail.com`), phone number, and Telegram.
4. **Custom Domain:**
   Update the `CNAME` file and the `siteUrl` in `config.js`.

> [!NOTE]
> For complete step-by-step instructions and the **Robokassa Pre-Moderation Checklist**, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 🚀 Publishing on GitHub Pages

1. **Push commits to GitHub:**
   ```powershell
   git add .
   git commit -m "Deploy MUT-3 Connector landing page"
   git push origin main
   ```
2. **Enable GitHub Pages:**
   - In GitHub repository settings, go to **Settings → Pages**.
   - Under **Build and deployment → Source**:
     - **Option A (GitHub Actions):** Select **GitHub Actions** (uses `.github/workflows/deploy-pages.yml`).
     - **Option B (Deploy from branch):** Select branch `main` and folder `/ (root)`.
3. **Custom Domain & HTTPS:**
   - Add your domain under **Custom domain** (matches `CNAME`).
   - Check **Enforce HTTPS**.
