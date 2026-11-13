# Doğrulama — 3 Kasım 2026

## Hero ağ ve kaydırma performansı

- Canlı JPEG yanıtları `public, max-age=0, must-revalidate` döndürüyordu; 240 ayrı dosya yerine özgün JPEG baytlarını içeren 8 masaüstü / 4 mobil paket hazırlandı.
- Paketlerin tüm 361 kaynak JPEG ile bayt eşitliği test edildi. Kodlanmış veriler saklanır; çözülen görseller sınırlı önbellekte tutulur. İleri/geri gezinme testi ek ağ isteği oluşturmadı.
- GSAP scrub 0.65 saniye; canvas ara yüzeyi kaynak çözünürlüğüyle sınırlandırıldı. Hero kompozisyonu değişmedi.
- Üretimde paket HTTP 200 ve immutable önbellek başlığı doğrulandı. Tarayıcıda 0001 → 0081 → 0001 kare ilerlemesi ve temiz konsol gözlendi.
- 8 test, lint, TypeScript ve üretim derlemesi başarılı. Canlı ortamın bu kodu kullanması için yeniden deploy gerekir; değişiklikler canlıya otomatik gönderilmedi.

## 13 Kasım 2026 — kalite ve gezinme düzeltmeleri

- Fon ve jaluzi için iki yeni, yüksek çözünürlüklü özgün konsept fotoğrafı eklendi. Kaynaklar ve üretim istemleri `public/media/editorial/ASSETS.md` içinde.
- Küçük metin kontrastları güçlendirildi, mobil koleksiyon etiketleri büyütüldü. Mekânlar galerisinde fotoğraflar, başlıklar ve hikâye özetleri ayrı animasyonlarla düzenlendi.
- Her mekân ve koleksiyon detayına fotoğraflı sonraki içerik bağlantısı eklendi.
- Yükleme kapanışının GSAP tamamlanma olayına bağımlılığı kaldırıldı; bağımsız zaman sınırı içeriği serbest bırakır. Klavye koruması için inert, sayfa hidrasyonundan sonra uygulanır ve çıkışta eski duruma döner.
- Üretim önizlemesinde temiz konsol, yükleme sonrası `idle`, içerikte `inert=false` ve 0 px yatay taşma doğrulandı. 11 içerik adresi HTTP 200 ve tek H1 verdi.
- Lint, TypeScript, 6 sekans/geometri testi ve üretim derlemesi başarılı.

## 4 Kasım 2026 — görünür yükleme ve malzeme odaklı geçişler

- Yükleme katmanı kalıcı layout içinde artık her `pathname` değişiminde yeniden gösterilir. İlk açılış ve Koleksiyon → Yaklaşım tıklamasında koyu Türkçe ekran görsel olarak doğrulandı. Geçiş sırasında `data-state=loading` ve `data-page-loading=true`; tamamlanınca `hidden`/`idle` durumuna döner.
- Koleksiyon açılışı fotoğraflı kompozisyona, kart ızgarası ise dönüşümlü dört doku bölümüne dönüştürüldü. Başlıklar satır maskesi, görseller maskeli açılış ve hafif paralaks kullanır. Başlık girişi `seven:page-ready` sonrasında başlar.
- Ana sayfanın çerçeveli hero’su ve merkezden tam ekrana büyüyen fotoğrafı korundu. Açık/koyu bölüm fotoğrafla bağlanır; alt görselde portre viewport için `sizes=150vh` kullanılarak yetersiz çözünürlük seçimi önlenir.
- 390 × 844 mobilde hero, yaklaşım, koleksiyon açılışı ve menü → koleksiyon gezinmesi görsel olarak doğrulandı; yatay taşma 0 px. Koleksiyon 360, 430, 768 ve 1440 px genişliklerde; ana sayfa 1024 px genişlikte 0 px taşma verdi. Önceki oturumdaki mobil araç sınırı bu oturumda tekrarlanmadı.
- Klavye odak halkası için maskeli bağlantı başlıklarında `focus-within` taşması açıldı. Fotoğraf açıklamaları görüntü maskesinin dışında tutuldu.
- Lint, TypeScript, 6 geometri/sekans testi ve üretim derlemesi başarılı. Üretim sürümünde ilk açılış ve Koleksiyon → Mekânlar geçişinde yükleme ekranı görsel olarak doğrulandı; konsol hatası/uyarısı yok. 11 içerik adresi HTTP 200, tek H1 ve Türkçe belge dili verdi.

## 4 Kasım 2026 — editoryal akış ve ayrı sayfalar

- Ana sayfa yeniden düzenlendi: sabit çerçeveli hero, kısa marka anlatımı, merkezden büyüyen fotoğraf, bağlantılı koleksiyon, yaklaşım özeti ve tek ziyaret daveti. Uzun süreç sabitlemesi ve tekrar eden iletişim bölümleri kaldırıldı.
- Büyüyen görselin başlangıç çerçevesi yatay ve dikey merkezde. 1280 × 720 masaüstü tarayıcıda sahne 1265 × 720; başlangıç çerçevesi x=171.703, y=115.203, 921.594 × 489.594 px. Sol/sağ ve üst/alt boşluklar eşit. Tam büyümede `data-expansion=1.000`, maske `inset(0px)`.
- GSAP ScrollTrigger `scrub: 0.7` ile fotoğraf geçişini yumuşatır. Görsel en-boy oranını korur. Geometri testi bütün ara ilerlemelerde ve geri dönüşte aynı merkezi doğrular.
- Ana sayfa dahil 11 içerik adresi HTTP 200; her birinde tek H1, benzersiz Türkçe başlık ve `lang=tr` var. Ana sayfa, koleksiyon, dört koleksiyon detayı, mekânlar, iki mekân hikâyesi, yaklaşım ve iletişim kontrol edildi. Bilinmeyen koleksiyon 404 döndürür.
- Menü ve içerik bağlantılarında hash ile sayfa taklidi yok. Yalnızca erişilebilirlik için `#icerik` bulunur. Başlık/metin girişleri GSAP ile yumuşakça görünür; doğal kaydırma korunur.
- Açılışta Türkçe yükleme ekranı görsel olarak doğrulandı: “Işık yerini buluyor.” / “Hazırlanıyor”. Font/ilk görsel hazır olunca açılır; bütün sekansı beklemez. CSS zaman sınırı ve noscript yedeği bulunur.
- Menü açılması, Escape ile kapanması, body overflow temizliği, odağın MENÜ düğmesine dönmesi ve menüden iletişim sayfasına geçiş doğrulandı. Üretim önizlemesinde konsol hatası veya uyarısı yok.
- Responsive CSS mobilde tek sütun, okunabilir başlık ölçekleri, ortalı fotoğraf ve dokunma hedefleri içerir. Bu oturumda tarayıcı viewport ayarı istenen mobil ölçüyü uygulamadı (1280 × 720 kaldı); yeni tasarım için mobil tarayıcı emülasyonu doğrulanmış sayılmaz. Aşağıdaki eski responsive matrisi önceki tasarımın kaydıdır.
- Lint ve TypeScript başarılı; merkez invarianti dahil 6 test geçti. Üretim derlemesi statik sayfaları oluşturur.

## 4 Kasım 2026 — efektin Mekânlar fotoğrafına taşınması

- Hero önceki çerçeveli tasarımına geri döndü. Kaydırma öncesi/sonrası görsel ölçüsü yaklaşık **661.7 × 372.2** CSS piksel olarak sabit kaldı; kare **0001 → 0081** ilerledi. Hero üzerinde büyüme durumu veya şeffaf header modu yok.
- Büyüme yalnızca Mekânlar bölümündeki ilk fotoğrafa (**Günün ilk ışığı**) uygulanır. İkinci fotoğraf normal akışını korur.
- Masaüstünde alt fotoğraf **0.000 → 1.000 → 0.000** büyüyüp küçüldü; hero büyüme durumu sürekli boş kaldı.
- 390 × 844 mobil emülasyonda fotoğrafın maskesi `inset(244.047px 22px)` değerinden `inset(0px)` değerine açıldı. Yatay taşma 0 px; konsol uyarısı/hatası yok.
- Fotoğraf altında normal figcaption korunur. JavaScript veya hareket animasyonu olmadığında görsel normal galeri akışında okunur.
- **6 test**, lint, TypeScript ve üretim derlemesi başarılı.

## Tasarım ve netlik revizyonu

- Taş/kırık beyaz ve koyu yeşil arayüz; yeni masthead, serif başlıklar, sinematik 16:9 hero, doku detayı, koyu koleksiyon ve yeni kapanış birlikte yeniden tasarlandı.
- 240 masaüstü ve 121 mobil aktif JPEG'in tamamı kaynak dosyalarla SHA-256 karşılaştırmasında birebir aynı. Yeniden sıkıştırma ve önceden yapılan 480 px mobil küçültme kaldırıldı.
- Poster `unoptimized`; canvas smoothing `high`, DPR sınırı 2. Görüntü üzerinde zoom, bulanıklaştırma veya açık renk scrim yok.
- 1440 × 900 viewport'ta film yaklaşık 869 × 489 CSS piksel: 1280 × 720 kaynak ekrana zorunlu olarak büyütülmüyor. 2560 px genişlikte film yaklaşık 1183 × 666 CSS piksel.
- Yeni düzen 360, 390, 430, 768, 1024, 1280, 1440, 1728 ve 2560 px genişliklerde 0 px yatay taşma verdi.
- 390 × 844 mobil hero ve masaüstü hero/koleksiyon görsel olarak incelendi. Menü açma/Escape kapatma üretimde doğrulandı; konsol hatası veya uyarısı görülmedi.
- Kontrollü klavye kaydırmasında kare **0001 → 0081 → 0001** ilerleyip geri döndü. Kaynak görüntü ve canvas çıktısı kontrol edildi.
- Lint, TypeScript, 4 test ve üretim derlemesi başarılı.

## Video karelerinin eklenmesi

- `Yeni klasör` içindeki 240 adet 1280 × 720 JPEG sırası eksiksiz doğrulandı; orijinaller korundu.
- Masaüstünde 240 WebP (7.25 MiB), mobilde merkezden dikey kadrajlı 121 WebP (1.31 MiB) bağlandı. Mobil seri tek numaralı kaynak kareler ve son kareden oluşur.
- Posterler iki serinin ilk kareleriyle eşleşir.
- Lint, TypeScript, 4 test ve üretim derlemesi yeniden başarılı.
- Üretim tarayıcısında masaüstü aşağı kaydırma: **0001 → 0086**, aynı miktarda yukarı kaydırma: **0086 → 0001**. Canvas üzerindeki çizilmiş kare bilgisi ve görüntü birlikte kontrol edildi.
- 390 × 844 mobil emülasyonda dikey seri **0001 → 0062** ilerledi; yatay taşma 0 px.
- Bu kontrollerde konsol uyarısı veya hatası yok.

## Tamamlanan kontroller

- `npm run lint`: uyarı/hata yok.
- `npm run typecheck`: başarılı.
- `npm run test`: 4 test başarılı. Deterministik ileri/geri kare eşlemesi, sınır değerleri, portre/yatay cover geometrisi, en yakın kare yedeği, eşzamanlı istek ve önbellek sınırı, duraklatma ve dispose davranışı doğrulandı.
- `npm run build`: Next.js 16.4.4 üretim derlemesi başarılı. Ana sayfa ve SEO çıktıları statik oluşturuldu.
- `npm audit --omit=dev`: 0 açık. Tam geliştirme ağacında 16 orta seviye lint bağımlılığı uyarısı bulunuyor; zorlayıcı ana sürüm düşürme/yükseltme uygulanmadı.
- `npm start` ile üretim sunucusu açıldı; ana sayfa, robots, sitemap, ikon, Open Graph görseli, posterler ve yedek SVG HTTP 200 döndürdü.
- Üretim HTML: `lang=tr`, tek H1, işletme JSON-LD, noscript navigasyon mevcut. Yapılandırılmamış telefon/WhatsApp bağlantısı yok.
- Üretim önizlemesinde konsol uyarısı/hatası yok; kırık iç anchor ve yüklenmiş ama bozuk görsel bulunmadı.
- Menü açılışı, Escape ile kapatma, body overflow temizliği ve odağın MENÜ düğmesine dönüşü tarayıcıda doğrulandı.
- Koleksiyon fareyle seçim ve ArrowDown klavye seçimi doğrulandı; açıklama ve seçili sekme değişti.
- İlk teslimatta kare sayısı sıfır olan poster modu da doğrulandı; mevcut teslimatta video sekansı aktiftir.
- Masaüstü hero, koleksiyon ve mobil hero/koleksiyon görsel olarak incelendi.

## Responsive matris

Tarayıcı viewport emülasyonu. Windows kaydırma çubuğu iç genişlikten 15 px aldı. Tüm ölçümlerde belge yatay taşması **0 px**.

| İstenen genişlik | İç genişlik | Koleksiyon              |
| ---------------- | ----------- | ----------------------- |
| 360              | 345         | Dikey görseller         |
| 390              | 375         | Dikey görseller         |
| 430              | 415         | Dikey görseller         |
| 768              | 753         | Dikey görseller         |
| 1024             | 1009        | Sekmeli editoryal düzen |
| 1280             | 1265        | Sekmeli editoryal düzen |
| 1440             | 1425        | Sekmeli editoryal düzen |
| 1728             | 1713        | Sekmeli editoryal düzen |
| 2560             | 2545        | Sekmeli editoryal düzen |

## Açık doğrulama sınırları

- `prefers-reduced-motion` için CSS ve GSAP koşulları kodda incelendi: hero tek ekran poster, sekans indirme yok, reveal ve süreç scrub animasyonları kapalı. **İşletim sistemi tercihini emüle ederek tarayıcı doğrulaması tamamlanamadı.** Ek Windows tarayıcı kontrolü geçerli URL'yi güvenle belirleyemediği için otomasyon araç tarafından durduruldu; sistem ayarları değiştirilmedi.
- Sağlanan video kareleri masaüstü ve mobil tarayıcı emülasyonunda doğrulandı. Düşük bellekli fiziksel telefon ve yavaş ağ koşullarında saha performansı ayrıca ölçülmeli.
- Lighthouse veya saha CWV ölçümü yapılmadı; puan ya da performans garantisi iddia edilmez.
- Fiziksel iPhone/Android, VoiceOver/NVDA ve Instagram/harita üçüncü taraf sayfalarının kullanılabilirliği ayrıca test edilmedi. Responsive kontroller tarayıcı emülasyonudur.
- `SITE_URL` verilmediği için sitemap bilinçli olarak boş; gerçek üretim adresi girilip yeniden derlenmelidir.
- Site harici bir hesaba yayımlanmadı. Vercel kurulumu ve medya değiştirme adımları README'de.
