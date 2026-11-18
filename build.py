#!/usr/bin/env python3
"""src/*.html -> tek dosyalı, internetsiz çalışan sayfalar (elektrik + WeDo + VinciBot simülasyonları + öğretmen portalı).
Kullanım: python3 build.py <çalışma-dizini>   (içinde npm paketleri kurulu olmalı)"""
import base64, json, re, subprocess, sys, urllib.request, pathlib

root = pathlib.Path(__file__).parent
work = pathlib.Path(sys.argv[1]).resolve()
b64 = lambda b: base64.b64encode(b).decode()

def tailwind(page):
    """Sayfadaki (ve dersler.js'teki) sınıflardan statik CSS üret"""
    content = [str(root / "src" / page), str(root / "src/dersler.js")]
    (work / "tw.config.js").write_text(
        "module.exports={content:%s,theme:{extend:{fontFamily:{fredoka:['Fredoka','sans-serif'],"
        "quicksand:['Quicksand','sans-serif']},colors:{labBg:'#f0f9ff',circuitDark:'#0f172a',"
        "electricYellow:'#facc15',electricBlue:'#38bdf8',warmAmber:'#fbbf24'}}}}" % repr(content).replace("'", '"'))
    (work / "in.css").write_text("@tailwind base;@tailwind components;@tailwind utilities;")
    subprocess.run(["npx", "tailwindcss", "-c", "tw.config.js", "-i", "in.css", "-o", "tw.css", "--minify"],
                   cwd=work, check=True, capture_output=True)
    return (work / "tw.css").read_text()

# 2) Fontlar (Google Fonts woff2 -> base64, değişken font olduğundan her dosya bir kez)
ua = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"}
fetch = lambda u: urllib.request.urlopen(urllib.request.Request(u, headers=ua)).read()
gcss = fetch("https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700"
             "&family=Quicksand:wght@500;600;700&display=swap").decode()
seen, fonts = set(), ""
for fam, body in re.findall(r"@font-face\s*{\s*font-family:\s*'([^']+)';(.*?)}", gcss, re.S):
    url = re.search(r"url\((https[^)]+)\)", body).group(1)
    if url in seen: continue
    seen.add(url)
    rng = re.search(r"unicode-range:\s*([^;]+);", body)
    wmin, wmax = ("400", "700") if fam == "Fredoka" else ("500", "700")
    fonts += ("@font-face{font-family:'%s';font-style:normal;font-weight:%s %s;font-display:swap;"
              "src:url(data:font/woff2;base64,%s) format('woff2');%s}" %
              (fam, wmin, wmax, b64(fetch(url)), ("unicode-range:%s;" % rng.group(1)) if rng else ""))

# 3) Font Awesome (yalnız solid)
fa = work / "node_modules/@fortawesome/fontawesome-free"
facss = (fa / "css/all.min.css").read_text()
facss = re.sub(r"@font-face\{font-family:\"Font Awesome 6 (Brands|Free)\";font-style:normal;font-weight:(400|900);.*?\}", "", facss)
solid = b64((fa / "webfonts/fa-solid-900.woff2").read_bytes())
facss += "@font-face{font-family:'Font Awesome 6 Free';font-style:normal;font-weight:900;font-display:block;" \
         "src:url(data:font/woff2;base64,%s) format('woff2')}" % solid

# 4) Konfeti
confetti = (work / "node_modules/canvas-confetti/dist/confetti.browser.js").read_text()

# 5) CDN etiketlerini çıkarıp yerlerine göm
def inline(page):
    src = (root / "src" / page).read_text(encoding="utf-8")
    tw = tailwind(page)
    out = re.sub(r"\s*<!-- Tailwind CSS -->.*?<!-- Google Fonts -->\s*<link[^>]*>\s*<script>\s*tailwind\.config.*?</script>",
                 lambda m: "\n    <style>%s</style>\n    <style>%s</style>\n    <style>%s</style>\n    <script>%s</script>" %
                 (fonts, facss, tw, confetti), src, count=1, flags=re.S)
    if "/*__DERSLER__*/" in out:
        # PDF'teki şekiller (src/img/*.jpg) -> IMG sözlüğü, data URI olarak
        imgs = {f.stem: "data:image/jpeg;base64," + b64(f.read_bytes()) for f in sorted((root / "src/img").glob("*.jpg"))}
        out = out.replace("/*__DERSLER__*/", "const IMG = " + json.dumps(imgs) + ";\n" +
                          (root / "src/dersler.js").read_text(encoding="utf-8"))
    assert not any(x in out for x in ("cdn.tailwindcss", "googleapis", "cdnjs", "jsdelivr")), page
    return out

# Simülasyon sayfası, portalın içine iframe srcdoc olarak gömülür -> tek HTML dosyası
import json
js_str = lambda html: json.dumps(html, ensure_ascii=False).replace("</", "<\\/")
sim_js = "const SIM_HTML = " + js_str(inline("kaynak.html")) + ";\nconst SIM_WEDO = " + js_str(inline("wedo.html")) + ";\nconst SIM_VINCI = " + js_str(inline("vinci.html")) + ";"
portal_src = inline("portal.html")
portal = portal_src.replace("/*__SIM__*/", sim_js)
(root / "kardelen-bilim-laboratuvari.html").write_text(portal, encoding="utf-8")
print("OK kardelen-bilim-laboratuvari.html", len(portal) // 1024, "KB")
