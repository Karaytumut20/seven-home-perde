# Seven Home Perde

Işık, kumaş ve mimari üzerine kurulu Türkçe bir marka sitesi. Sıcak nötr renkler, büyük grotesk/italik serif tipografi, doğal kaydırma ve kontrollü GSAP animasyonları kullanır. E-ticaret, veritabanı veya kullanıcı hesabı gerektirmez.

## Çalıştırma

Next.js **16.4.4**, App Router, React, TypeScript, GSAP/ScrollTrigger ve sade CSS. Fontlar `next/font` ile derleme sırasında indirilir ve uygulamadan sunulur. İlk kurulum/derleme için internet gerekir.

Node.js 22.18+ veya 24 LTS önerilir. Next.js için asgari Node.js 20.9; test komutu için Node.js 22.18+ kullanın.

```bash
npm install
npm run dev
```

Geliştirme adresi: `http://localhost:3000`.

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm start
```

`npm run test`, kare eşlemesini, ters yönde kaydırmayı, cover geometrisini, eksik kare yedeğini, yükleme eşzamanlılığını, önbellek sınırını ve kaynak temizliğini test eder. `npm start` üretim derlemesini sunar.

## İçerik ve işletme bilgileri

| Dosya                     | İçerik                                                              |
| ------------------------- | ------------------------------------------------------------------- |
| `src/content/site.ts`     | Türkçe metinler, menü, hero anlatımı, süreç, SEO                    |
| `src/content/pages.ts`    | Ana sayfa vitrini, alt sayfa hikâyeleri, Türkçe yükleme ekranı      |
| `src/data/collections.ts` | Koleksiyon adı, açıklaması, görseli ve alternatif metni             |
| `src/config/site.ts`      | Adres, Instagram, harita, iletişim ve hero sekans ayarları          |
| `src/app/globals.css`     | Renkler, tipografi, ölçüler, responsive düzen ve hareket tercihleri |
| `src/app/editorial.css`   | Ortak editoryal sistem, merkezden açılan görsel, yeni sayfalar       |

`.env.example` dosyasını `.env.local` olarak kopyalayın:

```dotenv
SITE_URL=https://gercek-alan-adiniz.com
NEXT_PUBLIC_PHONE=
NEXT_PUBLIC_WHATSAPP=
NEXT_PUBLIC_EMAIL=
```

Örnekteki alan adını gerçek adresinizle değiştirin. `SITE_URL` yalnızca geçerli `http`/`https` origin kabul eder; canonical, Open Graph ve sitemap bu adresi kullanır. Boşken yanlış bir işletme alan adı üretilmez; sitemap boş kalır ve sosyal görselin yerel geliştirme tabanı `localhost` olur. **Canlı dağıtımda `SITE_URL` girilmelidir.** Ortam değişkenleri değiştiğinde yeniden build/deploy gerekir.

Doğrulanmış telefon verilmediğinden telefon ve WhatsApp görünmez. Telefonu uluslararası biçimde; WhatsApp'ı ülke kodu dahil numara olarak girin. Boş e-posta da otomatik gizlenir. Bunlar ziyaretçiye açık iletişim bilgileridir; bu alanlara gizli anahtar yazmayın.

Harita, verilen işletme adresinden oluşturulmuş bir Google Maps arama bağlantısıdır. Doğrulanmış işletme pin bağlantısını `mapsUrl` alanına koyabilirsiniz. Konum, çalışma saatleri, puan, fiyat aralığı, ödül veya iş geçmişi uydurulmamıştır. Süreç metinleri görüşme daveti biçimindedir; ücretsiz keşif, üretim kapasitesi veya montaj garantisi vaat etmez.

## Görseller

13 Kasım kalite güncellemesinde Fon ve Jaluzi fotoğrafları yenilendi: `public/media/editorial/linen-wool-study-v1.webp` ve `public/media/editorial/walnut-blinds-study-v1.webp`. Bunlar yerleşik image_gen ile üretilen özgün konsept çalışmalardır. Tam istemler, boyutlar ve kaynak bilgisi `public/media/editorial/ASSETS.md` dosyasındadır; gerçek Seven Home uygulaması olarak sunulmaz. Güncel görsel yollarının kaynağı `src/data/collections.ts` dosyasıdır.

Hero, `Yeni klasör` içindeki kullanıcı tarafından sağlanan 240 video karesini kullanır. Diğer bölümler için iki özgün **yapay zekâ konsept görseli** ve yerel bir jaluzi doku kompozisyonu bulunur. Hiçbiri doğrulanmadan gerçek Seven Home uygulaması veya mağaza fotoğrafı olarak sunulmaz. Kaynakları ve kullanılan tam promptlar `public/media/ASSETS.md` dosyasındadır. Rakip görseli, hotlink veya harici stok görsel kullanılmaz.

| Kullanım                 | Değiştirilecek dosya                                  |
| ------------------------ | ----------------------------------------------------- |
| Masaüstü hero            | `public/media/hero/desktop-hq/frame-0001.jpg`         |
| Mobil hero               | `public/media/hero/mobile-hq/frame-0001.jpg`          |
| Koleksiyon               | `public/media/collections/{tul,fon,jaluzi,ozel}.webp` |
| Mekânlar                 | `public/media/atmosphere/{light,texture}.webp`        |
| Konum yanında atmosfer   | `public/media/location/study.webp`                    |
| Dosya yüklenemezse yedek | `public/media/fallback.svg`                           |

Dosya adlarını koruyarak görselleri değiştirin veya veri dosyalarındaki yolları güncelleyin. Gerçek fotoğraflar geldiğinde alternatif metinleri ve görünür **konsept görsel** açıklamalarını da düzenleyin. Özellikle konum görseli şu an mağazayı göstermez. Fotoğrafların haklarının markaya ait olduğundan emin olun.

Normal görseller responsive boyutlar ve lazy loading ile `next/image` üzerinden sunulur. Hero posteri ve sekans ise orijinal JPEG'i korur. `<picture>` ilgili cihazın posterini seçer; iki poster birden öncelikli indirilmez. Masaüstü JPEG sekansı toplam 13.21 MiB; bunun tamamı açılışta indirilmez. İlk kare poster olarak hemen görünür.

## Güncel tasarım ve görüntü kalitesi

Hero performansı: aktif sekans artık orijinal JPEG baytlarını 32 karelik paketlerle taşır (`public/media/hero/packed-v1`). Masaüstü 240 yerine 8, mobil 121 yerine 4 ağ isteği kullanır. Kod yalnızca yakındaki kareleri çözer; sıkıştırılmış veriyi geri kaydırma için tutar. GSAP 0.65 saniyelik scrub ile kaydırmayı yumuşatır. Canvas kaynak çözünürlüğünden büyük ara yüzey üretmez. Görsellerin çözünürlüğü ve JPEG kalitesi değişmedi.

Kareleri değiştirince `node scripts/pack-hero.mjs` çalıştırın. Paketler immutable önbellek kullandığından yeni görüntü sürümünde `packed-v1` klasörünü ve config/header yollarını birlikte yeni sürüme taşıyın. Bu güncellemenin canlıya geçmesi için Vercel'e yeniden deploy gerekir.

Araştırma referansları: [House of Honey / Awwwards](https://www.awwwards.com/sites/house-of-honey-1) ve [Floema / Awwwards](https://www.awwwards.com/sites/floema). Canlı siteler incelendi. House of Honey’nin editoryal içerik hiyerarşisi ve fotoğraf oranları; Floema’nın kontrollü ölçek geçişleri ve hikâye bazlı dolaşımı tasarım yönünü besledi. Görselleri, kodları ve özgün tasarımları kopyalanmadı.

Arayüz taş/kırık beyaz ve koyu yeşil renkler, serif ağırlıklı editoryal tipografi ve ortak boşluk sistemiyle yenilendi. Ana sayfa akışı: çerçeveli hero → kısa marka anlatımı → merkezden tam ekrana açılan fotoğraf → bağlantılı koleksiyon seçkisi → yaklaşım özeti → ziyaret daveti. Uzun, sabitlenmiş süreç bölümü ve tekrarlanan iletişim blokları kaldırıldı. Koleksiyon satırları fare/klavye odağında görseli yumuşakça değiştirir; tıklanınca ilgili detay sayfasını açar.

Menü ve içerik bağlantıları `next/link` ile gerçek adreslere gider. `/koleksiyon`, dört `/koleksiyon/[slug]` sayfası, `/mekanlar`, iki `/mekanlar/[slug]` sayfası, `/yaklasim` ve `/iletisim` statik oluşturulur. Her sayfanın Türkçe başlığı, açıklaması ve doğru canonical adresi vardır. Sitemap bütün içerik adreslerini içerir. `#icerik` yalnızca erişilebilirlik için içeriğe geç bağlantısıdır.

`IntroLoader`, **“Işık yerini buluyor.” / “Hazırlanıyor”** metinlerini koyu ceviz tonlarında tam ekran gösterir. İlk açılışta 1250 ms, iç sayfa değişimlerinde 700 ms asgari bekleme ve ardından yaklaşık 1 saniyelik iki yana açılma kullanır. Yalnızca fontları ve ilk görseli bekler; tüm kare sekansını beklemez. Dahili bağlantı tıklaması, `pathname` değişimi ve geri/ileri hareketleri katmanı yeniden açar; dış bağlantı, yeni sekme ve aynı sayfa bağlantıları korunur. İptal edilen gezinme 3800 ms sınırıyla serbest kalır. JavaScript yoksa noscript katmanı kaldırır; CSS yedeği 5 saniyede açılır. Azaltılmış harekette kısa, sabit bir Türkçe durum etiketi kullanılır.

Yükleme tamamlanınca `seven:page-ready` olayı, başlıkların satır maskelerini ve görsel açılışlarını başlatır. Başlık animasyonu yükleme ekranının altında bitmez. Görseller ayrı maskelerle açılır ve yaklaşık ±%2.5 paralaks kullanır; yerel kaydırma korunur. `luxury.css` malzeme odaklı düzeni, `loader.css` açılış/geçiş katmanını yönetir. Koleksiyon sayfasında fotoğraflı açılış ve dönüşümlü dört doku bölümü bulunur. Ana sayfada fotoğraf açık ve koyu bölümün sınırından taşarak iki alanı bağlar.

Hero artık `desktop-hq` ve `mobile-hq` dizinlerindeki **JPEG asıllarını** kullanır. 240 masaüstü ve 121 mobil dosya, sağlanan kaynakların bayt bayt kopyasıdır; yeniden sıkıştırma veya küçültme yapılmaz. Mobilde 480 px'e küçültülmüş eski seri yerine tam 1280 × 720 kaynak, tarayıcıda dikey kadraja alınır. Poster de aynı JPEG'dir ve `unoptimized` ile ikinci kez sıkıştırılmaz. İlk WebP serileri eski alternatif olarak diskte korunmuştur; aktif config bunları kullanmaz.

Hero'nun masaüstü çerçevesi 16:9 ve en fazla 1280 CSS piksel genişliğindedir; büyüme efekti içermez. Canvas DPR sınırı 2, örnekleme kalitesi `high` olarak korunur. Ana sayfadaki “Günün ilk ışığı” fotoğrafı, `ExpandingProjectImage` bileşeninde iki yanında eşit boşlukla başlar; hem yatay hem dikey merkezini koruyarak tam viewport'a açılır. GSAP `scrub: 0.7` ile hareketi yumuşatır. Efektin ilk %78'inde büyüme tamamlanır; kalan bölümde tam ekranda kalıp sonra normal akışa geçer. Yukarı kaydırınca tersine döner. Galeri ve detay sayfaları normal akıştadır. Azaltılmış hareket tercihinde ana sayfa fotoğrafı da sabit gösterilir. Hero karelerinin gerçek çözünürlüğü 1280 × 720'dir.

## Scroll kontrollü hero sekansı

Sekans aktiftir: masaüstünde **240 kare**, mobilde **121 kare**. Masaüstü kaynak sırasını tamamen korur. Mobil, aynı videodan her iki karede bir örneklenir ve son kare de eklenir; tam çözünürlük korunur, dikey kadraj canvas tarafından çizilir. Her iki seride poster, o serinin ilk karesiyle aynıdır. Orijinal JPEG'ler `Yeni klasör` içinde korunur.

`frameCount: 0` yapıldığında ilgili cihaz poster moduna döner; olmayan karelere istek yapılmaz. Poster modunda masaüstü 175svh, mobil 150svh olur.

İleride videoyu değiştirmek için:

1. 4–8 saniyelik, iyi ışıklı ve kontrollü kamera/kumaş hareketi içeren video seçin.
2. Masaüstü için yaklaşık 100–140, mobil için 60–90 kareyi hedefleyin. Bunlar zorunlu sayılar değildir; boyut ve gerçek cihazda decode maliyetine göre ayarlayın.
3. İki dizine kareleri ekleyin. Sayım **0001** ile başlar ve dört basamaktır:

```text
public/media/hero/desktop/frame-0001.webp
public/media/hero/desktop/frame-0002.webp
...
public/media/hero/mobile/frame-0001.webp
...
```

4. `src/config/site.ts` içindeki `HERO_SEQUENCE.desktop.frameCount` ve varsa `mobile.frameCount` değerlerini gerçek sayıya ayarlayın. `path` ve `extension` da aynı yerden değişebilir.
5. Posterleri ilk kareyle eşleştirin. Mobil için ayrı dikey kadraj tercih edin.

Örnek yerel FFmpeg dışa aktarma (uygulama FFmpeg gerektirmez):

```bash
ffmpeg -i hero-desktop.mp4 -vf "fps=18,scale=1600:-2" -frames:v 120 -c:v libwebp -quality 78 public/media/hero/desktop/frame-%04d.webp
ffmpeg -i hero-mobile.mp4 -vf "fps=12,scale=800:-2" -frames:v 72 -c:v libwebp -quality 78 public/media/hero/mobile/frame-%04d.webp
```

Dizinleri önce oluşturun. Kaynak kısa ise daha az kare üretilir; config'e gerçekten üretilen sayıyı yazın. 120 sayısını videodan bağımsız kabul etmeyin. JPEG/WebP/AVIF'i gerçek cihazlarda karşılaştırın; `extension` ayarı buna izin verir.

Sekans aktifken masaüstü kaydırma alanı 330svh, mobil 230svh olur. Görünüm CSS `sticky` ile sabitlenir, GSAP ScrollTrigger ilerlemeyi kare indeksine eşler. Aşağı kaydırma ileri, yukarı kaydırma geri gider; videonun `currentTime` alanı kullanılmaz.

İlk kare ve yakın kareler, en fazla **3 eşzamanlı istek** ile hazırlanır. Sonrasında kullanıcının bulunduğu karenin çevresi önceliklidir. Tüm filmi açılışta indirip decode etmek yerine en fazla **18 decode edilmiş kare** tutulur. İleri/geri gidildiğinde silinen kareler tarayıcı HTTP önbelleğinden tekrar alınabilir. Bu, özellikle büyük sekanslarda belleği sınırlar. Hero görünümden çıktığında yeni arka plan istekleri durur; devam eden en fazla üç istek tamamlanabilir.

Çizim `requestAnimationFrame` ile yapılır; aynı kare yeniden çizilmez. DPR 2 ile sınırlıdır. ResizeObserver canvas ölçüsünü günceller. Eksik karede en yakın yüklenmiş kare; hiç kare yoksa poster görünür. Yüksek hızlı scroll sırasında tam doğruluk, istenen kare hazır olduğunda sağlanır. Düşük donanımlı fiziksel telefonlarda ağ/bellek testi ayrıca yapılmalıdır.

Mobil kare sayısı sıfırsa büyük masaüstü sekansı indirilmez; dikey poster kullanılır. Büyük gösterge, sahte yükleme yüzdesi veya tüm kareleri bekleten ekran yoktur.

## Erişilebilirlik ve hareket

- Türkçe belge, tek H1, semantik bölümler, görsel açıklamaları ve görünür klavye odağı.
- Yerel `<dialog>` menü: odak tuzağı, Escape ile kapatma, odağı açan düğmeye geri verme, body scroll kilidini temizleme.
- Koleksiyon sekmelerinde yukarı/aşağı okları, Home ve End ile seçim.
- Mobilde sekme veya dar carousel yerine dört görsel dikey sıralanır.
- `prefers-reduced-motion: reduce` altında sekans yüklenmez; hero tek ekran poster olur, GSAP reveal ve uzun süreç sabitlemesi çalışmaz. Süreç dört adımlı normal akışta okunur.
- JavaScript kapalıyken ana içerik, fotoğraflar, adres ve iletişim bağlantıları HTML içinde kalır. Ana navigasyon için aşağıdaki noscript bağlantıları bulunur.
- Tarayıcı zoom'u veya doğal kaydırma engellenmez. Özel cursor, scroll-jacking ve ağır harita iframe'i yoktur.

## SEO ve Vercel

Metadata API, Open Graph/Twitter, üretilmiş sosyal görsel, SVG ikon, `robots.ts`, `sitemap.ts` ve doğrulanmış alanları kullanan LocalBusiness alt türü `HomeGoodsStore` JSON-LD hazırdır. Telefon yalnızca config'de doluysa schema'ya girer.

Vercel'e dağıtım:

1. Bu klasörü kendi Git deponuza ekleyip Vercel'de içe aktarın.
2. Framework **Next.js**; build komutu `npm run build`, kurulum `npm install`. Çıktı dizinini varsayılan bırakın.
3. `SITE_URL` değerini gerçek üretim origin'i yapın; doğrulanmış iletişim bilgilerini isterseniz ekleyin.
4. Deploy edin. Yeniden build gerektiren içerik/env değişikliklerinden sonra tekrar deploy edin.

Özel Vercel config, veritabanı, gizli sunucu anahtarı veya kalıcı disk gerekmez. Bu çalışma yerel teslimattır; harici hesaba/siteye yayın yapılmamıştır.

## Doğrulama sınırları

Kontrollerin ayrıntısı `QA.md` içindedir. Lighthouse/CWV için ölçülmemiş bir puan iddia edilmez. Gerçek video, üretim domain'i ve marka fotoğrafları eklendiğinde gerçek cihaz/ağ koşullarında tekrar ölçün. Kurulum audit çıktısındaki orta seviye uyarılar geliştirme/lint bağımlılık zincirindedir; çalışma zamanı bağımlılıkları ayrıca `npm audit --omit=dev` ile kontrol edilebilir. Uyumsuz büyük sürümlere zorlayan `npm audit fix --force` uygulanmadı.
