/* KODEKSAN ROBOTİK KODLAMA DERS PLANI'na göre program
   Her hafta 2 ders saati. Görseller (IMG.sekilN) PDF'teki şekillerdir, build.py gömer.
   slide: {e, t, p, b[], img?}   soru: {lead?, q, o[], c, x}   lesson.sim: 'elek' | 'wedo:<proje>' */

const TOPICS = [
    { id: 't1', emoji: '⚡', title: 'Elektrik Devresi', color: 'amber',
      desc: '3 hafta: malzemeleri tanıyoruz, devre kuruyoruz, anahtar ekliyoruz ve gece lambası yapıyoruz.' },
    { id: 'wedo', emoji: '🧱', title: 'WeDo 2.0 LEGO Education', color: 'sky',
      desc: '3 hafta: beyni ve motoru olan Legolarla model yapıp kodluyoruz.' },
    { id: 'vinci', emoji: '🤖', title: 'VinciBot (MatataCode)', color: 'emerald', sim: 'vinci:robot',
      desc: 'Ders planı henüz eklenmedi. Simülasyon hazır: robotu tanı, kodla, görevleri tamamla.' }
];

/* İkili sınıflandırma oyunlarını soru listesine çevirir */
function sortQs(lead, bins, items) {
    return items.map(([e, n, k, x]) => ({
        lead, q: `${e} ${n}`, o: bins, c: k, x: x || `Doğru cevap: ${bins[k]}.`
    }));
}

const LESSONS = [
/* ───────── 1 ───────── */
{
    id: 'l1', topic: 't1', no: 1, tag: 'Giriş', sim: 'elek', emoji: '💡', title: 'Elektrik Nedir?',
    short: 'Evimizde elektrikle çalışan eşyaları keşfediyoruz.',
    slides: [
        { e: '💡', t: 'Evimizde Elektrik Nerede?', p: 'Etrafına bak! Lamba, televizyon, buzdolabı, telefon şarjı… Hepsi elektrikle çalışır.' },
        { e: '⚡', t: 'Elektrik Bir Enerjidir', p: 'Elektriği gözle göremeyiz ama yaptığı işi görürüz.' },
        { e: '🛠️', t: 'Elektrik Ne İşe Yarar?', b: ['💡 Işık verir → lamba', '🔥 Isıtır → ütü, fırın', '🌀 Hareket ettirir → vantilatör', '🔊 Ses çıkarır → radyo, zil'] },
        { e: '🤔', t: 'Hepsi Elektrikle mi Çalışır?', p: 'Şimdi oyun zamanı! Gösterilen eşyanın elektrikle çalışıp çalışmadığına karar ver.' }
    ],
    quiz: [
        ...sortQs('Bu eşya elektrikle çalışır mı?', ['✅ Çalışır', '❌ Çalışmaz'], [
            ['💡', 'Lamba', 0], ['🪑', 'Sandalye', 1], ['📺', 'Televizyon', 0], ['🧸', 'Oyuncak ayı', 1],
            ['🧊', 'Buzdolabı', 0], ['📚', 'Kitap', 1], ['🔦', 'Pilli el feneri', 0], ['✏️', 'Kurşun kalem', 1]
        ]),
        { q: 'Lamba elektriği hangi iş için kullanır?', o: ['Işık vermek', 'Ses çıkarmak', 'Soğutmak', 'Yürümek'], c: 0, x: 'Lamba elektrik enerjisini ışığa çevirir.' }
    ],
    teacher: {
        materials: ['Pilli el feneri', 'Pilli oyuncak araba', 'Resimli eşya kartları (isteğe bağlı)'],
        flow: [
            { m: 5, t: 'Merak Uyandırma', x: 'Sınıf ışığını bir an kapatıp açın: "Az önce ne oldu? Işık nereden geliyor?" Evdeki elektrikli eşyaları saydırın.' },
            { m: 5, t: 'Anlatım', x: '1-3. slaytları gösterin; her örnekte çocuklara "Başka hangi eşya?" diye sorun.' },
            { m: 15, t: 'Oyun: Elektrikle Çalışır mı?', x: 'Sınıflandırma oyununu oylama ile oynayın: önce el kaldırtın, sonra cevabı açın.' },
            { m: 10, t: 'Sınıfta Elektrik Avı', x: 'Çocuklar sınıfta elektrikle çalışan 5 şey bulup defterlerine çizsin.' },
            { m: 5, t: 'Toparlama', x: 'Bugün öğrendiklerini bir cümleyle söyletin: "Elektrik …"' }
        ],
        lines: ['"Elektriği göremeyiz ama yaptığı işi görürüz: ışık, ses, hareket!"', '"Pilli el fenerinin elektriği nereden geliyor? Birazdan bunu keşfedeceğiz."'],
        safety: ['Prizleri ve fişleri yalnızca uzaktan gösterin; çocukların prize yaklaşmasına izin vermeyin.', 'Sınıfta elektrik avı sırasında hiçbir aleti çalıştırmayın, sadece bakıp çizsinler.']
    }
},
/* ───────── ELEKTRİK DEVRESİ • 1. HAFTA ───────── */
{
    id: 'e1', topic: 't1', no: 2, tag: '1. Hafta', emoji: '🔋', title: 'Malzemeler ve İlk Devrem', sim: 'elek',
    short: 'Pil, pil yatağı, LED ve klemensi tanıyıp ilk devremizi kuruyoruz.',
    slides: [
        { e: '🤔', t: 'Sizce Elektrik Nedir?', b: ['⚡ Elektrik deyince aklınıza ne geliyor?', '🔋 Peki enerji nedir?', '🏭 Enerjiyi nasıl ve nereden elde ediyoruz?', '💡 Bu lamba enerjiyi nereden alıyor?'] },
        { e: '🌙', t: '3 Haftalık Yolculuğumuz', p: 'Bugün basit bir elektrik devresi kurmayı öğreneceğiz. 3 haftanın sonunda herkes kendi devresiyle bir gece lambası yapıp süsleyerek evine götürecek!' },
        { e: '🧰', t: 'Malzemelerimiz', img: 'sekil1', p: 'Pil, pil yatağı, LED ampul ve klemens. Anahtarla 2. hafta tanışacağız.' },
        { e: '🔋', t: 'Pil ve Pil Yatağı', b: ['🔋 Pilin iki kutbu var: artı (+) ve eksi (−)', '🌀 Pilin düz ucu (−) yaydaki tarafa gelir', '🔴 Kırmızı kablo: artı (+)', '⚫ Siyah kablo: eksi (−)'] },
        { e: '💡', t: 'LED Ampul', b: ['📏 Uzun ayak: artı (+)', '📐 Kısa ayak: eksi (−)', '🔴 Uzun ayak kırmızı kabloya', '⚫ Kısa ayak siyah kabloya'] },
        { e: '✋', t: 'Elle Tutmak Çok Zor!', p: 'Kabloyu LED’in ayağına elimizle sürekli değdirmek çok zor. Sizce LED ile kabloyu nasıl birleştirebiliriz?' },
        { e: '🔗', t: 'Klemens', p: 'Klemens, kabloyu ve LED ayağını sıkıca tutar. İçindeki metal parçaya kablonun parlak (iletken) ucu değmelidir.' },
        { e: '🎉', t: '1. Hafta Devremiz', img: 'sekil2', p: 'Pil yatağı + 2 pil + klemens + LED. Işık yandı!' },
        { e: '🔁', t: '2. Ders: Sök ve Yeniden Kur', p: 'Devreni tamamen sök ve en baştan kendin kur. Bakalım ışığı tek başına yakabilecek misin?' }
    ],
    quiz: [
        { q: 'LED’in uzun ayağı hangi kutuptur?', o: ['Artı (+)', 'Eksi (−)'], c: 0, x: 'Uzun ayak artı (+), kısa ayak eksi (−).' },
        { q: 'Pil yatağının kırmızı kablosu hangi kutuptur?', o: ['Artı (+)', 'Eksi (−)'], c: 0, x: 'Kırmızı kablo artı (+), siyah kablo eksi (−).' },
        { q: 'Klemens ne işe yarar?', o: ['Kabloyu ve LED’i sıkıca birleştirir', 'Pili şarj eder', 'Işığı renklendirir', 'Kabloyu keser'], c: 0, x: 'Klemens sayesinde kabloyu elimizle tutmak zorunda kalmayız.' },
        { q: 'LED’in yanmıyor. İlk neyi kontrol edersin?', o: ['Pilleri doğru takmış mıyım?', 'Kavanozun rengini', 'Masanın yerini', 'Hiçbir şeyi'], c: 0, x: 'Önce piller, sonra LED’in yönü, sonra klemensteki kablo kontrol edilir.' },
        { q: 'Kablonun hangi kısmı klemensin içindeki metale değmeli?', o: ['Parlak metal ucu (iletken)', 'Renkli plastik kısmı (yalıtkan)'], c: 0, x: 'Yalıtkan kısım çok fazla sokulursa elektrik geçmez.' }
    ],
    teacher: {
        materials: ['Pil yatağı (2’li AA) + 2 pil (öğrenci başına)', 'LED ampul', 'Çiftli klemens', 'Kablo soyucu', 'Dersten önce kurulmuş, çalıştığından emin olunan 2 yedek devre', 'Her masaya 1’er örnek malzeme (inceleme için)'],
        flow: [
            { m: 5, t: 'Merak Uyandırma (1. Ders)', x: 'Sorularla başlayın: "Sizce elektrik nedir? Elektrik deyince aklınıza ne geliyor?" Enerji cevabı gelince: "Peki enerji nedir? Nereden elde ediyoruz? Sınıfı aydınlatan ışık enerjiyi nereden alıyor? Lambanın yanması için nelere ihtiyacımız var?"' },
            { m: 10, t: 'Malzeme Tanıtımı (Şekil 1)', x: 'Pil, pil yatağı ve LED ile başlayın; her masaya birer örnek verip inceletin. Pilin kutuplarını, pil yatağına yerleşimini, kırmızı (+) / siyah (−) kabloları, LED’in uzun (+) ve kısa (−) ayağını anlatın. Klemenssiz bir devre kurup LED’i yakın; elle tutmanın zorluğunu gösterip "Nasıl birleştirebiliriz?" diye fikir sorun. Sonra klemensi tanıtıp 1. hafta devresini kurun (Şekil 2). Anlatım 15 dakikayı geçmesin.' },
            { m: 20, t: 'Malzeme Dağıtımı ve Kurulum', x: 'Her malzeme için bir öğrenci görevlendirin. Sıra: pil yatağı + 1 pil (doğru yerleştirme) → klemensler → 2. pil (güvenlik amacıyla en son) → LED. Destek isteyenlere yardım edin.' },
            { m: 5, t: 'Yanmayan Devreler', x: 'Kontrol sırası: 1) Piller doğru mu? 2) LED doğru mu? 3) Klemense kablonun yalıtkan kısmı fazla sokulmuş olabilir; iletken uç metal tabakaya değmeli, kısa ise kablo soyucu kullanın. 4) Pil veya LED değiştirin. 5) Nadiren pil yatağı. Çözemezseniz yedek devreyi verin.' },
            { m: 30, t: 'Sök ve Yeniden Kur (2. Ders)', x: 'Öğrenciler devreyi tamamen söküp en baştan kendi kursun. Işığı çevirerek oynamak isterler: buna izin verin ama pil yatağından değil kablolardan tutmalarını söyleyin.' },
            { m: 10, t: 'Toplama', x: 'Tüm malzemeler sökülür; her malzeme için bir öğrenci görevlendirilip toplanır.' }
        ],
        figs: [['sekil1', 'Şekil 1: Malzemeler (anahtar 2. hafta tanıtılacak)'], ['sekil2', 'Şekil 2: 1. hafta devresi']],
        lines: ['"Bugün basit bir elektrik devresi kurmayı öğreneceğiz. Böylece 4. sınıf Fen Bilimleri’nde bu konuyu öğrenirken arkadaşlarınızdan bir adım önde olacaksınız."', '"Bu 3 haftalık bir süreç. Sonunda kurduğunuz devreyle bir gece lambası tasarlayıp süsleyerek evinize götüreceksiniz."', '"2. pil neden en son? Güvenlik için!"'],
        safety: ['2. pil güvenlik amacıyla en son dağıtılır.', 'Işığı çevirirken pil yatağından değil kablolardan tutsunlar; bağlantı zarar görmesin.', 'Bu dersi ilk kez alanlar gece lambası yapar; 2. kez alanlar varsa yapılacak materyal o zaman belirlenir.']
    }
},
/* ───────── ELEKTRİK DEVRESİ • 2. HAFTA ───────── */
{
    id: 'e2', topic: 't1', no: 3, tag: '2. Hafta', emoji: '🔘', title: 'Anahtar Sahnede', sim: 'elek',
    short: 'Gece lambamızın pili bitmesin diye devreye anahtar ekliyoruz.',
    slides: [
        { e: '🔁', t: 'Geçen Hafta Ne Yaptık?', p: 'Geçen hafta neler yaptık, ne öğrendik? Kim hatırlatabilir? Haydi devremizi yeniden kuralım!' },
        { e: '🔋', t: 'Pil Hemen Bitmez mi?', p: 'Gece lambası yapacağız demiştik. Lambamızı hep yanık bırakırsak pili hemen bitmez mi? Bunun için bir çözüm öneriniz var mı?' },
        { e: '🔘', t: 'Anahtar', img: 'sekil5a', p: 'Anahtar, devreyi açıp kapatır. Basınca ışık yanar, tekrar basınca söner.' },
        { e: '✂️', t: 'Tekli Klemens', p: 'Anahtarı eklemek için yine klemense ihtiyacımız var. Ama çiftli klemens değil, tekli yeter! Çiftli klemensi ortadan makasla kesince iki tekli klemens olur.' },
        { e: '🎉', t: '2. Hafta Devremiz', img: 'sekil3', p: 'Pil yatağı + klemensler + anahtar + LED. Artık ışığımızı açıp kapatabiliyoruz!' }
    ],
    quiz: [
        { q: 'Anahtar ne işe yarar?', o: ['Işığı açıp kapatır', 'Pili şarj eder', 'LED’i boyar', 'Kabloyu uzatır'], c: 0, x: 'Anahtar devreyi açıp kapatarak ışığı kontrol eder.' },
        { q: 'Gece lambasına neden anahtar ekledik?', o: ['Pil hemen bitmesin diye', 'Daha ağır olsun diye', 'Süslemek için', 'Kablo kısalsın diye'], c: 0, x: 'Kullanmadığımızda kapatırız, pil daha uzun dayanır.' },
        { q: 'Anahtarı eklemek için hangi klemensi kullandık?', o: ['Tekli klemens', 'Üçlü klemens'], c: 0, x: 'Çiftli klemensi ortadan keserek tekli klemens elde ettik.' }
    ],
    teacher: {
        materials: ['1. haftanın tüm malzemeleri', 'Anahtar (kabloları hazırlanmış)', 'Ortadan kesilmiş tekli klemensler (dersten önce hazırlanır)', 'Makas (1 klemensi sınıfın önünde kesmek için)'],
        flow: [
            { m: 5, t: 'Hatırlatma', x: '"Çocuklar geçen hafta neler yaptık, ne öğrendik, kim hatırlatabilir?" sorusuyla başlayın.' },
            { m: 15, t: 'Devreyi Yeniden Kurma', x: 'Tüm malzemeleri dağıtın (2. pil en son) ve 1. hafta devresini kurmalarını sağlayın.' },
            { m: 10, t: 'Problem: Pil Biter mi?', x: '"Gece lambamızı bu şekilde bırakırsak pili hemen bitmez mi? Bir çözüm öneriniz var mı?" Anahtarı tanıtın. Anahtarı eklemek için klemens gerektiğini fark etsinler.' },
            { m: 10, t: 'Tekli Klemens', x: 'Çiftli klemense gerek olmadığını, tekli klemensin yettiğini yaparak gösterin: 1 klemensi gözlerinin önünde makasla ortadan kesin. Diğerlerini dersten önce hazırlayın.' },
            { m: 35, t: '2. Hafta Devresini Kurma (Şekil 3)', x: 'Anahtarı devreye ekletip açıp kapatarak denetin. Yanmayan devrelerde 1. haftadaki kontrol sırasını uygulayın.' },
            { m: 5, t: 'Toplama', x: 'Malzemeleri sökün ve görevli öğrencilerle toplayın.' }
        ],
        figs: [['sekil3', 'Şekil 3: 2. hafta devresi']],
        lines: ['"Gece lambamızı bu şekilde bırakırsak pili hemen bitmez mi?"', '"Çiftli klemense ihtiyacımız yok, tekli klemens bize yeter. Bakın keserek gösteriyorum!"'],
        safety: ['Klemensleri ve anahtarları dersten önce hazırlayın; sınıfta yalnızca 1 klemensi gösterim için kesin.', 'Makası yalnızca öğretmen kullanır.']
    }
},
/* ───────── ELEKTRİK DEVRESİ • 3. HAFTA ───────── */
{
    id: 'e3', topic: 't1', no: 4, tag: '3. Hafta', emoji: '🌙', title: 'Gece Lambası Yapıyoruz', sim: 'elek',
    short: 'Devremizi kavanoza yerleştirip süslüyoruz.',
    slides: [
        { e: '🎨', t: 'Süs Malzemelerini Getirdik!', img: 'sekil4', b: ['👀 Oynar gözler', '🌈 Ponponlar', '⭐ Stickerlar', '🧶 Şönil teller'] },
        { e: '🔧', t: 'Önce Devre', p: 'Devreni tam ve eksiksiz kur. Anahtara basınca ışık yanıyor mu?' },
        { e: '🫙', t: 'Anahtarı Kapağa Tak', img: 'sekil5b', p: 'Anahtarı kavanoz kapağındaki delikten geçir, beyaz halkasını üstten çevirerek sık.' },
        { e: '✨', t: 'Kavanoza Yerleştir ve Süsle', img: 'sekil6a', p: 'Devreni kavanoza yerleştir. Stickerlarını kendin yapıştır. Silikon gereken süslerde öğretmenin yardım edecek.' },
        { e: '🏆', t: 'Mutlu Son!', img: 'sekil6b', p: 'Gece lamban hazır! Işıkları kapat ve anahtara bas.' }
    ],
    quiz: [
        { q: 'Anahtarı gece lambasının neresine taktık?', o: ['Kavanoz kapağına', 'Kavanozun dibine', 'Pil yatağının içine', 'LED’in üstüne'], c: 0, x: 'Anahtar kapaktaki delikten geçirilip halkasıyla sıkılır.' },
        { q: 'Silikon gereken süslemeleri kim yapar?', o: ['Öğretmen yardım eder', 'Öğrenci tek başına'], c: 0, x: 'Silikon tabancası sıcaktır; öğretmen sırayla yardım eder.' },
        { q: 'Kavanoza koymadan önce ne yaparız?', o: ['Devrenin çalıştığını kontrol ederiz', 'Pilleri çıkarırız'], c: 0, x: 'Önce devre tam ve eksiksiz kurulup denenir.' }
    ],
    teacher: {
        materials: ['Tüm devre malzemeleri', 'Gece lambası kavanozları', 'Öğrencilerin getirdiği süs malzemeleri (Şekil 4)', 'Silikon tabancası (yalnızca öğretmen)'],
        flow: [
            { m: 0, t: 'Dersten 2-3 Gün Önce', x: 'Veli gruplarında süs malzemesi hatırlatması yapın. Zorunluluk yok; örnek süs malzemelerini (Şekil 4) gruba atabilirsiniz.' },
            { m: 20, t: 'Devreyi Kurma', x: 'Malzemeleri verin; devreyi tam ve eksiksiz kurmalarını sağlayın. Çalışmayan devreye müdahale edin.' },
            { m: 15, t: 'Kavanoz ve Anahtar (Şekil 5)', x: 'Kavanozları dağıtın. Anahtarın kapağa nasıl yerleştirileceğini uygulamalı gösterin.' },
            { m: 45, t: 'Süsleme (Şekil 6)', x: 'Devresini kavanoza yerleştiren öğrenci süslemeye başlar; stickerları kendi yapıştırır. Silikon gerektiren süslemelerde silikon tabancasıyla sırayla yardım edin. Ve mutlu son!' }
        ],
        figs: [['sekil4', 'Şekil 4: Örnek süs malzemeleri'], ['sekil5a', 'Şekil 5: Anahtar ve halkası'], ['sekil5b', 'Şekil 5: Anahtarın kapağa yerleştirilmesi'], ['sekil6a', 'Şekil 6: 3. hafta gece lambası'], ['sekil6b', 'Şekil 6: Öğrencilerin gece lambaları']],
        lines: ['"Hadi bakalım, şimdi gece lambamızı hayal gücümüze göre süsleyelim!"'],
        safety: ['Silikon tabancasını yalnızca öğretmen kullanır.', 'Süs malzemesi getirmek zorunlu değildir; getirmeyen öğrenciler için birkaç yedek bulundurun.']
    }
},
/* ───────── WEDO 2.0 • 1. HAFTA ───────── */
{
    id: 'w1', topic: 'wedo', no: 1, tag: '1. Hafta', emoji: '🐌', title: 'Salyangoz ve Pervane', sim: 'wedo:snail',
    short: 'Lego setini ve kuralları tanıyor, ilk projelerimizi kodluyoruz.',
    slides: [
        { e: '🧱', t: 'Benim Legolarımın Beyni Var!', p: 'Hepiniz Legolarla oynamışsınızdır. Ama benim Legolarımın beyni ve motoru var! Kod yazarak projelerimizi harekete geçirebiliyoruz.' },
        { e: '📦', t: 'Lego Setimiz', img: 'sekil7', p: 'Tuğla, plaka, kiriş, aks, dişli çark, motor, sensörler, beyin ve tekerlekler.' },
        { e: '📋', t: 'Kurallarımız', b: ['🗂️ İş bitince her parça kendi kutucuğuna', '🙅 Öğretmenden habersiz parça alışverişi yok', '🔌 Motor ve sensörü kablosundan değil, ucundan çek', '📴 Beyni mutlaka kapatarak bırak'] },
        { e: '🧩', t: 'Parça Eksik mi?', p: 'Kutularda bazı parçalar farklı. Sarı kare tuğla lazımken mavi olabilir. O parça yerine ne kullanabilirim? Mesela iki kare tuğla bir dikdörtgen tuğla yapar!' },
        { e: '📱', t: 'WeDo 2.0’a Giriş', img: 'sekil8', b: ['1️⃣ Uygulama ikonuna dokun', '2️⃣ GET STARTED görünene kadar oka bas', '3️⃣ GET STARTED’a dokun', '4️⃣ Classroom Projects’i seç', '5️⃣ Projeyi seç', '6️⃣ Start building ile yapıma başla'] },
        { e: '🐌', t: 'Bugünün Projeleri', p: 'Salyangoz (Snail) ve Pervane (Cooling Fan). Bitirince süsle, farklı renk ve ses kodlarını dene!' }
    ],
    quiz: [
        { q: 'Ders bitince Lego parçaları nereye konur?', o: ['Kendi kutucuğuna', 'Arkadaşımın kutusuna', 'Çantama', 'Masada kalır'], c: 0, x: 'Her bölmedeki sticker o bölmenin parçalarını gösterir.' },
        { q: 'Motoru nasıl çıkarırız?', o: ['Ucundan nazikçe çekerek', 'Kablosundan çekerek'], c: 0, x: 'Kablodan çekmek bağlantıya zarar verir.' },
        { q: 'İşimiz bitince beyne ne yaparız?', o: ['Kapatırız', 'Açık bırakırız'], c: 0, x: 'Şarjı/pili bitmesin diye beyin mutlaka kapatılır.' },
        { q: 'Dikdörtgen tuğlan yoksa ne yapabilirsin?', o: ['İki kare tuğlayı birleştiririm', 'Projeyi bırakırım'], c: 0, x: 'Hayal gücümüzle problem çözüyoruz!' },
        { q: 'WeDo’da projeler hangi bölümde?', o: ['Classroom Projects', 'Ayarlar'], c: 0, x: 'Get Started → Classroom Projects.' }
    ],
    teacher: {
        materials: ['WeDo 2.0 setleri', 'Tablet (WeDo 2.0 uygulaması yüklü)', 'Dersten önce yapılmış örnek proje'],
        flow: [
            { m: 5, t: 'Parça Tanıtımı (Şekil 7)', x: '"Benim Legolarımın beyni ve motoru var; kod yazarak harekete geçirebiliyoruz."' },
            { m: 5, t: 'Kurallar', x: 'Bölmelerdeki stickerlar o bölmenin parçalarını gösterir; iş bitince her parça doğru kutucuğa. Ders sonunda kutuları öğrencinin önünde göz ucuyla kontrol edin. Habersiz malzeme alışverişi yok. Motor/sensör uç kısmından çekilir. Beyin kapatılarak bırakılır (düğmeden kapanmazsa üst beyaz kısmı önden arkaya hafif iterek bağlantıyı koparın).' },
            { m: 3, t: 'Eksik Parçalar', x: '"Kutularda bazı malzemeler farklı… Bunun sebebi hayal gücünüzü kullanarak problem çözme yetinizi geliştirmek." Bu sırada öğrencinin önünde malzeme olup olmaması sizin tercihiniz.' },
            { m: 5, t: 'Örnek Proje ve Kod', x: 'Dersten önce yaptığınız projeyi gösterip kodlayarak çalıştırın; kod yazmayı öğretin. Toplam anlatım en fazla 15-18 dk. WeDo’ya giriş adımları: Şekil 8.' },
            { m: 52, t: 'Salyangoz ve Pervane', x: 'İlk hafta Salyangoz ve Pervane etkinlikleri öğrenciler tarafından tamamlanır. Kodlama kısmının video anlatımı WhatsApp grubundan paylaşılacak.' },
            { m: 10, t: 'Serbest Zaman ve Toplama', x: 'Proje bitince özgün süsleme ve farklı kodlar için serbest zaman: "İsterseniz farklı renk ve ses kodlarıyla deneme de yapabilirsiniz." Sonra parçalar kutucuklara, kutular kontrol.' }
        ],
        figs: [['sekil7', 'Şekil 7: Lego setindeki parçalar'], ['sekil8', 'Şekil 8: WeDo 2.0 uygulamasına giriş adımları']],
        lines: ['"Çocuklar, eminim ki hepiniz daha önce Legolarla oynamışsınızdır. Ama benim Legolarımın beyni ve motoru var!"', '"O parça yerine ne kullanabilirim? Sorusuna cevap aramanızı istiyoruz."', '"Hadi bakalım, şimdi kendi hayal gücümüze göre pervanemizi süsleyelim!"'],
        safety: ['Sadece ilk derste anlatım uzun sürer; sonraki derslerde doğrudan günün projesine geçilir.', 'Beyin kapatılmadan bırakılmasın.']
    }
},
/* ───────── WEDO 2.0 • 2. HAFTA ───────── */
{
    id: 'w2', topic: 'wedo', no: 2, tag: '2. Hafta', emoji: '🛰️', title: 'Hareketli Uydu ve Casus Robot', sim: 'wedo:satellite',
    short: 'Moving Satellite ve Spy Robot projelerini yapıp kodluyoruz.',
    slides: [
        { e: '🛰️', t: 'Hareketli Uydu', p: 'Moving Satellite: Motorla dönen bir uydu yapıyoruz. Ne kadar süre döneceğini kodla sen belirle!' },
        { e: '🕵️', t: 'Casus Robot', p: 'Spy Robot: Hareket sensörü biri yaklaşınca fark eder. Robotumuz ses ve ışıkla haber verecek!' },
        { e: '🐢', t: 'Acele Yok', p: 'İki projeyi de bitiremezsek sorun değil. Kendi hızımızda, keyifle ilerliyoruz.' }
    ],
    quiz: [
        { q: 'Casus robot biri yaklaşınca nasıl anlar?', o: ['Hareket sensörüyle', 'Tekerlekleriyle', 'Aksıyla', 'Plakasıyla'], c: 0, x: 'Hareket sensörü yaklaşan nesneyi algılar.' },
        { q: 'Uydunun dönmesini hangi parça sağlar?', o: ['Motor', 'Sticker', 'Tuğla', 'Lego sökücü'], c: 0, x: 'Beyin motora kodla komut verir.' }
    ],
    teacher: {
        materials: ['WeDo 2.0 setleri', 'Tablet', 'Dersten önce yapılmış örnek proje'],
        flow: [
            { m: 5, t: 'Hazırlık', x: 'Haftanın etkinliğini mutlaka dersten önce bir kez yapıp kodlayın; derse 20-25 dk önce gitmek yeterli. Hazır projeyle girip günün etkinliğini o şekilde gösterebilirsiniz.' },
            { m: 35, t: 'Moving Satellite', x: 'Öğrenciler projeyi yapıp kodlar.' },
            { m: 40, t: 'Spy Robot', x: 'Çocukların hızına göre ilerleyin. Örneğin 1. sınıflar 2 projeyi 2 derste yetiştiremeyebilir; ikisinin de yapılması zorunlu değil.' }
        ],
        figs: [],
        lines: ['"Bugün iki projemiz var ama acele yok, kendi hızımızda ilerliyoruz."'],
        safety: ['Ders sonunda parçalar kutucuklara, beyin kapalı.']
    }
},
/* ───────── WEDO 2.0 • 3. HAFTA ───────── */
{
    id: 'w3', topic: 'wedo', no: 3, tag: '3. Hafta', emoji: '🏎️', title: 'Hız Projesi ve Yarış', sim: 'wedo:speed',
    short: 'Guided Projects’ten Speed projesini yapıp yerde yarıştırıyoruz.',
    slides: [
        { e: '🏎️', t: 'Speed (Hız)', p: 'Guided Projects bölümünde 2. sıradaki Speed projesini yapıyoruz. Arabamızı hızlandırmak için ne yapabiliriz?' },
        { e: '🎨', t: '1. Ders: Yap ve Süsle', p: 'Projeyi tamamla ve istediğin gibi süsle.' },
        { e: '🏁', t: '2. Ders: Yarış Zamanı!', p: 'Arabalarımızı yerde yarıştırıyoruz. Motor gücünü değiştirerek dene!' }
    ],
    quiz: [
        { q: 'Arabamızı daha hızlı yapmak için kodda neyi artırırız?', o: ['Motor gücünü', 'Bekleme süresini'], c: 0, x: 'Motor gücü arttıkça araba hızlanır.' },
        { q: 'Speed projesi hangi bölümde?', o: ['Guided Projects', 'My Projects'], c: 0, x: 'Guided Projects bölümünde 2. sıradadır.' }
    ],
    teacher: {
        materials: ['WeDo 2.0 setleri', 'Tablet', 'Yarış için yerde boş alan'],
        flow: [
            { m: 40, t: 'Speed Projesi (1. Ders)', x: 'Çocuklar artık materyallere uyum sağladı ve kodlamayı öğrendi. Guided Projects’ten 2. sıradaki Speed projesini yaptırın; tamamlayıp istedikleri gibi süslesinler.' },
            { m: 40, t: 'Yarış (2. Ders)', x: 'Arabaları yerde yarıştırmalarına olanak tanıyın. Öğrenciler çok keyif alacaktır!' }
        ],
        figs: [],
        lines: ['"Hazır mısınız? 3, 2, 1… Başla!"'],
        safety: ['Yarış alanını boş tutun; arabaların altında kablo kalmasın.']
    }
}
];
