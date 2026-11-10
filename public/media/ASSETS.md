# Görsel kaynakları

Hero, kullanıcı tarafından sağlanan video karelerini kullanır. Diğer bölümlerdeki iki fotoğraf bu proje için yerleşik **imagegen** aracıyla üretildi. Bunlar gerçek bir Seven Home işi veya mağaza fotoğrafı değildir. Üçüncü taraf perde sitelerinden fotoğraf alınmadı.

## Hero — kullanıcı tarafından sağlanan video

### Aktif yüksek kalite serisi

`hero/desktop-hq/frame-0001.jpg` … `frame-0240.jpg` ve `hero/mobile-hq/frame-0001.jpg` … `frame-0121.jpg` artık aktif serilerdir. Tüm dosyalar kaynak JPEG'lerle SHA-256 seviyesinde aynı; yeniden encode veya resize yoktur. Mobil sıra 1, 3, 5 … 239, 240'tır. Posterler her serinin ilk JPEG'ini doğrudan kullanır.

### İlk WebP sürümü (artık aktif değil)

Kaynak: `Yeni klasör/gemini_generated_video_69b7254b_000001.jpg` … `000240.jpg`.

- Kaynak sıra eksiksiz: 240 JPEG, her biri 1280 × 720.
- Masaüstü: `hero/desktop/frame-0001.webp` … `frame-0240.webp`; tüm kareler aynı sırada, 1280 × 720, toplam 7.25 MiB.
- Mobil: `hero/mobile/frame-0001.webp` … `frame-0121.webp`; kaynak 1, 3, 5 … 239 ve 240; merkezden dikey 480 × 854 kadraj, toplam 1.31 MiB.
- `hero/poster.webp` ve `hero/poster-mobile.webp` ilgili serinin ilk karesidir. Poster/canvas geçişi aynı görüntüden başlar.
- Kullanıcının orijinal dosyaları değiştirilmedi. Bu karelerin gerçek Seven Home uygulaması olduğu varsayılmadı.

## 1. Işık çalışması

Kullanıldığı yerler: `collections/tul.webp`, `atmosphere/light.webp`. Hero'daki ilk taslak posterlerin yerini artık kullanıcının video kareleri aldı.

Tam üretim promptu:

> Use case: photorealistic-natural. Asset type: original conceptual interior editorial photograph for a Turkish curtain and textile studio website, neutral illustrative placeholder, not an actual client project. Create a cinematic wide landscape 3:2 photograph of a quiet contemporary Mediterranean apartment in warm morning light. The main subject is ceiling-height ivory sheer linen curtains in gentle soft folds along the tall windows occupying the left two thirds of the composition; subtly billowing, beautifully tactile real fabric, abundant reflected daylight. Warm pale plaster walls, dark smoked oak floor, a very low travertine table bottom right holding one small dark ceramic bowl, a rounded sculptural natural linen lounge chair at far right. Architectural proportions, restrained European design magazine quality, natural muted ivory stone taupe brown palette. Shot at eye level 35mm lens, fine analog grain, realistic material texture, understated shadows. No people, no text, no logos, no watermarks, no collage. Do not make a website screenshot. Single photograph only.

## 2. Doku çalışması

Kullanıldığı yerler: `collections/fon.webp`, `collections/ozel.webp`, `atmosphere/texture.webp`, `location/study.webp`.

Tam üretim promptu:

> Use case: photorealistic-natural. Asset type: conceptual editorial interior photograph, original neutral placeholder for a contemporary Turkish curtain studio. Single wide landscape 3:2 photograph. A quiet architectural corner with full-height heavy warm cocoa taupe linen drapes layered with a sheer ivory curtain at a very tall window, beautifully tactile vertical folds. A low dark walnut bench against pale warm plaster, a single sculptural earthenware vase, warm travertine floor. Directional late-afternoon sunlight grazes the drapes, long delicate window shadows. Thoughtful very minimal European interior magazine art direction, intimate cinematic side angle and naturally imperfect fabric texture. Dominant palette warm brown, ecru and limestone. Photographic realism, high-end camera, fine grain. No people, no text, no logo, no watermark. No showroom signage. This is an imagined interior, not an existing client project. Single image, no collage.

## 3. Yerel doku kompozisyonları

`collections/jaluzi.webp`: kodla yerel olarak oluşturulmuş özgün jaluzi çizgileri, ışık ve doku çalışması. Bir ürünün fotoğrafı değildir.

`fallback.svg`: kodla oluşturulmuş nötr kumaş kıvrımı kompozisyonu; medya yüklenemediğinde kullanılır.

Gerçek görseller geldiğinde dosyaları, alt metinlerini ve görünür konsept açıklamalarını birlikte değiştirin.
