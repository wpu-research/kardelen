# Kardelen'in Bilim Laboratuvarı

Çocuklara yönelik, **tek dosyalı ve internetsiz çalışan** eğitim sayfaları: basit elektrik devresi simülasyonu, WeDo 2.0 ve VinciBot simülasyonları ve bunları bir araya getiren öğretmen portalı.

## İçerik
- `src/`: kaynak sayfalar (`kaynak.html` elektrik devresi, `wedo.html`, `vinci.html`, `portal.html`), ders verisi (`dersler.js`) ve görseller (`img/`).
- Üretilen sayfalar (kökte): `kardelen-bilim-laboratuvari.html`, `kardelen-elektrik-devresi.html`, `kardelen-ogretmen-portali.html`; tarayıcıda doğrudan açılır.
- `build.py`: kaynakları tek dosyaya paketler; Tailwind CSS'i statik üretir, yazı tiplerini ve Font Awesome'ı base64 olarak gömer, CDN bağımlılığı kalmadığını doğrular.

## Teknoloji
HTML/JavaScript, Tailwind CSS (derleme zamanında), Font Awesome, Fredoka/Quicksand yazı tipleri; derleme için Python 3 ve Node (`npx tailwindcss`).

## Kurulum / çalıştırma
Kullanım (`build.py` açıklamasına göre): `python3 build.py <çalışma-dizini>`. Çalışma dizininde npm paketleri (`tailwindcss`, `@fortawesome/fontawesome-free`) kurulu olmalı; yazı tipleri derleme sırasında Google Fonts'tan indirilir (internet gerekir). Üretilen HTML dosyaları için kurulum gerekmez.

## Ortam değişkenleri
Yok.

## Lisans
Lisans: belirtilmemiş.
