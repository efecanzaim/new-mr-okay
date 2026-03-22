# Mr. Okay — Proje Todo Listesi

Yapılış sırasına göre düzenlenmiştir. Her adım bir öncekine bağımlıdır.
Bir adım tamamlandığında yanına `[x]` işareti koy.

---

## AŞAMA 1 — Yerel Geliştirme Ortamı & Veritabanı

> Bu aşama tamamen local bilgisayarda yapılır. VDS'e geçiş en sonda (Aşama 7) yapılacak.

### 1.1 PostgreSQL Kurulumu (Local — Mac)
- [x] Homebrew ile PostgreSQL kur: `brew install postgresql@16`
- [x] Servisi başlat: `brew services start postgresql@16`
- [x] PostgreSQL'e bağlan: `psql postgres`
- [x] Veritabanı oluştur: `CREATE DATABASE mrokay;`
- [x] Kullanıcı oluştur: `CREATE USER mrokay_user WITH PASSWORD 'mrokay2025';`
- [x] Yetki ver: `GRANT ALL PRIVILEGES ON DATABASE mrokay TO mrokay_user;`
- [x] `admin/.env` içindeki `DATABASE_URL` değerini doldur
- [x] `site/.env` dosyası oluştur, aynı `DATABASE_URL` değerini ekle

### 1.2 Prisma Migration
- [x] `admin/` klasöründe `npx prisma migrate dev --name init` çalıştır
- [x] Migration başarılı olduktan sonra `npx prisma generate` çalıştır
- [ ] `site/` klasöründe de `npx prisma generate` çalıştır (site için client oluştur)

### 1.3 İlk Veri (Seed)
- [x] `admin/prisma/seed.ts` oluştur
- [x] İlk admin kullanıcısını oluştur (e-posta + bcrypt şifreli)
- [x] `site/src/data/products.ts` içindeki statik ürünleri veritabanına aktar
- [x] Kategorileri oluştur (Businessman, Smartwoman ve alt kategoriler)
- [x] `package.json`'a seed script ekle, `npx prisma db seed` çalıştır

### 1.4 Local Geliştirme Portları
- [x] `admin/` → `npm run dev` → http://localhost:3001 (package.json'a eklendi)
- [ ] `site/` → `npm run dev` → http://localhost:3000

---

## AŞAMA 2 — Admin Panel

### 2.1 Auth & 2FA
- [x] `admin/src/app/login/page.tsx` — giriş sayfası (e-posta + şifre formu)
- [x] `admin/src/app/api/auth/[...nextauth]/route.ts` — NextAuth route
- [x] Çıkış (signOut) butonu
- [ ] 2FA (Google Authenticator) — geliştirme bittikten sonra eklenecek

### 2.2 Layout & Sidebar
- [x] `admin/src/components/layout/Sidebar.tsx` — sol menü
- [x] `admin/src/components/layout/Header.tsx` — üst bar (kullanıcı adı, çıkış)
- [x] `admin/src/components/layout/AdminLayout.tsx` — tüm admin sayfalarını saran layout

### 2.3 Dashboard
- [x] `admin/src/app/dashboard/page.tsx`
  - Bugün / bu ay / toplam gelir
  - Bekleyen sipariş sayısı
  - En çok satan 5 ürün
  - Son 8 sipariş listesi
- [x] `admin/src/app/api/dashboard/route.ts` — istatistik API'si

### 2.4 Ürün & Stok Yönetimi
- [x] `admin/src/app/products/page.tsx` — ürün listesi (arama, filtre, sayfalama)
- [x] `admin/src/app/products/new/page.tsx` — yeni ürün ekleme formu
- [x] `admin/src/app/products/[id]/page.tsx` — ürün düzenleme
  - Ad, açıklama, fiyat, karşılaştırma fiyatı, kategori, durum
  - Görsel yükleme (çoklu) → site/public/uploads'a kaydeder
  - Varyant yönetimi (50ml, 100ml vb.) + her varyant için stok
  - Öne çıkan ürün toggle
- [x] Ürün pasife alma (soft delete)
- [x] `admin/src/app/api/products/route.ts` — CRUD API
- [x] `admin/src/app/api/upload/route.ts` — görsel yükleme API
- [ ] **Site bağlantısı:** `site/src/app/product/[id]/` sayfası statik `products.ts` yerine API'den çekecek ← site değişikliği (Aşama 3)

### 2.5 Kategori Yönetimi
- [ ] `admin/src/app/products/categories/page.tsx` — kategori listesi & düzenleme
- [x] `admin/src/app/api/categories/route.ts` — CRUD API
- [ ] **Site bağlantısı:** `site/src/app/collections/` sayfaları kategori verisini API'den çekecek ← site değişikliği (Aşama 3)

### 2.6 Sipariş Yönetimi
- [x] `admin/src/app/orders/page.tsx` — sipariş listesi (filtre: durum, ödeme, arama)
- [x] `admin/src/app/orders/[id]/page.tsx` — sipariş detayı
  - Ürünler, adet, fiyat, toplam
  - Teslimat adresi
  - Durum güncelleme
  - Ödeme durumu güncelleme
  - Dahili not
- [x] `admin/src/app/api/orders/route.ts` — sipariş listesi API
- [x] `admin/src/app/api/orders/[id]/route.ts` — sipariş detay & güncelleme API
- [ ] **Site bağlantısı:** Checkout tamamlanınca sipariş DB'ye yazılır, admin panelde görünür ← site değişikliği (Aşama 3)

### 2.7 Kupon Yönetimi
- [x] `admin/src/app/coupons/page.tsx` — kupon listesi
- [x] `admin/src/app/coupons/new/page.tsx` — kupon oluşturma
- [x] `admin/src/app/coupons/[id]/page.tsx` — kupon düzenleme
  - Kod, açıklama, tip (yüzde / sabit tutar), değer
  - Minimum sipariş tutarı, maksimum kullanım sayısı
  - Başlangıç / bitiş tarihi, aktif/pasif toggle
- [x] `admin/src/app/api/coupons/route.ts` — CRUD API
- [ ] **Site bağlantısı:** Checkout sayfasında kupon kodu doğrulama ← site değişikliği (Aşama 3)

### 2.8 Kampanya Yönetimi
- [x] `admin/src/app/campaigns/page.tsx` — kampanya listesi
- [x] `admin/src/app/campaigns/new/page.tsx` — kampanya oluşturma
- [x] `admin/src/app/campaigns/[id]/page.tsx` — kampanya düzenleme
  - Ad, tip (Banner / Popup / İndirim)
  - Görsel yükleme + link
  - Başlık, açıklama
  - Hedef ülkeler (çoklu seçim — boşsa herkese göster)
  - Başlangıç / bitiş tarihi, aktif toggle
- [x] `admin/src/app/api/campaigns/route.ts` — CRUD API
- [ ] **Site bağlantısı:** Site, kullanıcının ülkesine göre kampanyaları API'den çeker ← site değişikliği (Aşama 3)

### 2.9 İçerik Yönetimi
- [x] `admin/src/app/content/page.tsx` — içerik listesi (hero, bannerlar, slider görselleri, gruplı görünüm)
- [x] `admin/src/app/content/[id]/page.tsx` — içerik düzenleme
  - Görsel değiştirme (yükle / önizle)
  - Yönlendirme linki değiştirme
  - Başlık / alt başlık
  - Sıra numarası
  - Aktif / pasif toggle
- [x] `admin/src/app/api/content/route.ts` — CRUD API
- [ ] **Site bağlantısı:** Site hero/banner/slider görsellerini ve linklerini bu API'den çeker ← site değişikliği (Aşama 3)

### 2.10 Raporlama
- [x] `admin/src/app/reports/page.tsx`
  - Tarih aralığı seçici
  - Toplam gelir grafiği (günlük/haftalık/aylık)
  - En çok satan ürünler tablosu
  - Ülkelere göre satış dağılımı
  - Sipariş durum dağılımı (pasta grafik)
  - Kupon kullanım istatistikleri
- [x] `admin/src/app/api/reports/route.ts` — rapor verileri API
- [x] Grafik kütüphanesi ekle (`recharts` veya `chart.js`)

---

## AŞAMA 3 — Site: Veritabanı Entegrasyonu

> Bu aşamada site statik verilerden kurtulup admin paneldeki verilerle çalışmaya başlar.

### 3.1 API Katmanı (site)
- [ ] `site/src/lib/db.ts` oluştur (Prisma client)
- [ ] `site/src/lib/geo.ts` oluştur (IP tabanlı konum algılama)
- [ ] `site/src/types/index.ts` oluştur (TypeScript tipleri)
- [ ] `site/prisma/schema.prisma` kopyala (admin ile aynı)
- [ ] `site/` için `npx prisma generate` çalıştır

### 3.2 Ürün Sayfaları
- [ ] `site/src/app/product/[id]/page.tsx` — statik veri yerine DB'den çek
- [ ] `site/src/app/collections/businessman/` — DB'den ürün listesi çek
- [ ] `site/src/app/collections/smartwoman/` — DB'den ürün listesi çek
- [ ] Stokta olmayan ürünlerde "Stokta Yok" göster

### 3.3 İçerik & Kampanya
- [ ] Ana sayfa hero/banner/slider → DB'den çek
- [ ] Kullanıcı konumuna göre kampanya göster (GeoContext)
- [ ] Popup kampanya componenti oluştur

### 3.4 Sepet & Checkout
- [ ] `site/src/context/CartContext.tsx` — localStorage tabanlı sepet
- [ ] `site/src/app/cart/page.tsx` — sepet sayfası (DB'deki ürün fiyatlarıyla doğrula)
- [ ] `site/src/app/checkout/page.tsx` — ödeme öncesi form (ad, adres, kupon kodu)
- [ ] Kupon kodu doğrulama (admin API'sine istek)
- [ ] Sipariş oluşturma API isteği

---

## AŞAMA 4 — Site: Yeni Tasarım (Tom Ford / Guerlain Stili)

### 4.1 Temel Tasarım Sistemi
- [x] Renk paleti: #faf9f6 krem, #020202 siyah, #545454 gri — inline stillerle uygulandı
- [x] Tipografi: Helvetica Neue (sans-serif) tüm componentlere uygulandı
- [ ] `site/src/app/globals.css` — CSS değişkenleri ve temel stiller (henüz yapılmadı)
- [ ] `tailwind.config.ts` — özel renkler ve fontlar (henüz yapılmadı)

### 4.2 Componentler
- [x] `AnnouncementBar.tsx` — üst bildirim barı (Helvetica Neue, underline kaldırıldı)
- [x] `Header.tsx` — logo, nav (SMARTWOMAN / BUSINESSMAN / HİKAYEMİZ / MAĞAZALARIMIZ), arama, sepet ikonu, hesap ikonu, dil seçici, mega menu
- [x] `HeroSection.tsx` — tam ekran görsel hero, Guerlain stili gradient + bottom-center metin + CTA butonu, sticky scroll efekti
- [x] `EditorialBanner.tsx` — Tom Ford stili 21/9 editorial banner (Businessman)
- [x] `SmartWomanBanner.tsx` — Tom Ford stili 21/9 editorial banner (Smartwoman)
- [x] `ProductShowcase.tsx` — Guerlain Section 1 stili ürün carousel (4 kart, ok + sayfa göstergesi, hover görsel değişimi, ExpandButton animasyonu) — category prop ile hem Businessman hem Smartwoman için kullanılıyor
- [x] `CollectionBanner.tsx` — Guerlain Section 2 stili 2 kolonlu banner (16/9, bottom-center metin, CTA butonu)
- [x] `BrandStory.tsx` — marka hikayesi bölümü
- [ ] `Footer.tsx` — yeni tasarım- [ ] `MobileBottomNav.tsx` — mobil alt navigasyon güncelleme

### 4.3 Sayfalar
- [x] Ana sayfa (`page.tsx`) — sticky hero + EditorialBanner + ProductShowcase (Businessman) + SmartWomanBanner + ProductShowcase (Smartwoman) + CollectionBanner + BrandStory
- [ ] `/collections/businessman` — koleksiyon sayfası (grid layout, filtre)- [ ] `/collections/smartwoman` — koleksiyon sayfası (grid layout, filtre)- [ ] `/product/[id]` — ürün detay sayfası (büyük görseller, varyant seçimi, sepete ekle)- [ ] `/cart` — sepet sayfası- [ ] `/account` — hesap sayfası (giriş / kayıt / siparişlerim)- [ ] `/checkout` — ödeme formu sayfası- [ ] `/about` — hikayemiz sayfası- [ ] `/stores` — mağazalarımız sayfası- [ ] `/contact` — iletişim sayfası
---

## AŞAMA 5 — Ödeme Entegrasyonu (Garanti BBVA)

- [ ] Garanti BBVA Sanal POS başvurusu (mağaza yetkilileri yapacak)
- [ ] `site/src/lib/garanti.ts` — ödeme hash hesaplama ve form oluşturma
- [ ] `site/src/app/checkout/payment/page.tsx` — ödeme sayfası (3D Secure yönlendirme)
- [ ] `site/src/app/api/payment/callback/route.ts` — Garanti'nin döndüğü sonucu yakala
  - Başarılıysa siparişi `CONFIRMED` + ödemeyi `PAID` yap
  - Başarısızsa siparişi `CANCELLED` yap
- [ ] `site/src/app/checkout/success/page.tsx` — başarılı sipariş sayfası
- [ ] `site/src/app/checkout/failed/page.tsx` — başarısız ödeme sayfası
- [ ] **Admin bağlantısı:** Ödeme sonucu otomatik olarak admin sipariş paneline yansır ← zaten bağlı

---

## AŞAMA 6 — Geo & Kişiselleştirme

- [ ] `site/src/context/GeoContext.tsx` — IP'den ülke/dil/para birimi tespiti
- [ ] `site/src/app/api/geo/route.ts` — IP'yi alıp ülke bilgisi döner
- [ ] `LanguageContext.tsx` — GeoContext ile entegre et (otomatik dil seçimi)
- [ ] Para birimi gösterimi (TRY, EUR, USD vb.)
- [ ] Ülkeye özel kampanya gösterimi
- [ ] Kullanıcı manuel dil değiştirebilmeli (mevcut dil seçici korunur)

---

## AŞAMA 7 — Deploy (VDS)

### 7.1 VDS Hazırlığı
- [ ] Node.js (LTS) kur
- [ ] PM2 kur (`npm install -g pm2`)
- [ ] Nginx kur
- [ ] Certbot kur (SSL için)

### 7.2 Uygulama Deploy
- [ ] `site/` için production build: `npm run build`
- [ ] `admin/` için production build: `npm run build`
- [ ] PM2 ile her ikisini başlat:
  - `pm2 start npm --name "site" -- start` (port 3000)
  - `pm2 start npm --name "admin" -- start` (port 3001)
- [ ] `pm2 save` + `pm2 startup` (sunucu yeniden başlayınca otomatik başlat)

### 7.3 Nginx Konfigürasyonu
- [ ] `mrokayparfum.com` → port 3000 yönlendirmesi
- [ ] `admin.mrokayparfum.com` → port 3001 yönlendirmesi
- [ ] `public/uploads/` klasörü Nginx'ten static olarak serve edilmesi
- [ ] SSL sertifikası: `certbot --nginx -d mrokayparfum.com -d admin.mrokayparfum.com`

### 7.4 Son Kontroller
- [ ] `.env` dosyaları VDS'de doğru dolduruldu mu?
- [ ] `NEXTAUTH_URL` production URL'sine güncellendi mi?
- [ ] `UPLOAD_DIR` VDS'deki gerçek path'e ayarlandı mı?
- [ ] Veritabanı migration VDS'de çalıştırıldı mı?
- [ ] Admin kullanıcısı oluşturuldu ve 2FA kuruldu mu?

---

## NOTLAR

- Her aşama bağımsız test edilmeli, bir sonrakine geçmeden önce çalıştığından emin olunmalı
- Site ve admin aynı veritabanını kullandığı için schema değişikliklerinde her iki projede de `npx prisma generate` çalıştırılmalı
- Görseller `site/public/uploads/` altında tutulur, admin buraya yazar, site buradan okur
- Garanti BBVA entegrasyonu için test ortamı (sandbox) önce test edilmeli, sonra canlıya alınmalı
