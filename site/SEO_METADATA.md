# Mr Okay - SEO Metadata

---

## 🌐 Genel Site Ayarları

**Dosya:** `src/app/layout.tsx`

| Alan                | Değer                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Site URL            | `https://mrokay.com`                                                                                                                             |
| Varsayılan Başlık   | Mr Okay \| Lüks Erkek Parfümleri                                                                                                                 |
| Başlık Şablonu      | %s \| Mr Okay                                                                                                                                    |
| Açıklama            | Sofistike erkekler için özenle hazırlanmış eşsiz kokular. Mr Okay - Zarafetin duyularla buluştuğu yer. Businessman koleksiyonu ile fark yaratın. |
| Twitter Hesabı      | @mrokay                                                                                                                                          |
| Google Verification | google-site-verification-code _(Gerçek kodla değiştirilecek)_                                                                                    |

### Örnek Anahtar Kelimeler

- lüks parfüm
- erkek parfümü
- businessman parfüm
- premium koku
- Mr Okay
- tasarım parfüm
- özel koku
- hediye parfüm
- erkek hediye
- lüks hediye

### Open Graph Görseli (İnsanlar sosyal medyada paylaşım yaparken gözükecek resim)

**Dosya:** `public/images/og-image.jpg`

- Boyut: 1200x630 piksel
- Alt Metin: Mr Okay - Lüks Erkek Parfümleri

---

## 📄 Sayfa Bazlı Metadata

### Ana Sayfa

**Dosya:** `src/app/layout.tsx` (varsayılan)

| Alan     | Değer                                                                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Başlık   | Mr Okay \| Lüks Erkek Parfümleri                                                                                                                 |
| Açıklama | Sofistike erkekler için özenle hazırlanmış eşsiz kokular. Mr Okay - Zarafetin duyularla buluştuğu yer. Businessman koleksiyonu ile fark yaratın. |

---

### Hakkımızda Sayfası

**Dosya:** `src/app/about/layout.tsx`

| Alan     | Değer                           |
| -------- | ------------------------------- |
| Başlık   | Hakkımızda                      |
| Açıklama | Mr Okay'in hikayesini keşfedin. |

**Anahtar Kelimeler:**

- Mr Okay hakkında
- parfüm markası
- lüks parfüm tarihi
- İstanbul parfümeri
- parfüm ustası

---

### İletişim Sayfası

**Dosya:** `src/app/contact/layout.tsx`

| Alan     | Değer                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------- |
| Başlık   | İletişim                                                                                          |
| Açıklama | Mr Okay ile iletişime geçin. Sorularınız, önerileriniz veya özel siparişleriniz için bize ulaşın. |

**Anahtar Kelimeler:**

- Mr Okay iletişim
- parfüm mağaza
- müşteri hizmetleri
- sipariş
- destek

---

### Mağazalar Sayfası

**Dosya:** `src/app/stores/layout.tsx`

| Alan     | Değer                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| Başlık   | Mağazalarımız                                                                                                     |
| Açıklama | Mr Okay mağaza lokasyonlarını keşfedin. Türkiye genelinde premium parfüm deneyimi için en yakın mağazamızı bulun. |

**Anahtar Kelimeler:**

- Mr Okay mağaza
- parfüm mağazası
- parfüm satış noktası
- İstanbul parfüm
- Ankara parfüm
- İzmir parfüm

---

### Blog Sayfası

**Dosya:** `src/app/blog/layout.tsx`

| Alan     | Değer                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------- |
| Başlık   | Blog                                                                                                                  |
| Açıklama | Parfüm dünyasından haberler, ipuçları ve rehberler. Koku katmanlama, parfüm seçimi ve bakım hakkında uzman önerileri. |

**Anahtar Kelimeler:**

- parfüm blog
- koku rehberi
- parfüm ipuçları
- koku katmanlama
- parfüm nasıl seçilir
- erkek parfüm önerileri

---

### Businessman Koleksiyonu

**Dosya:** `src/app/collections/businessman/layout.tsx`

| Alan      | Değer                                                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Başlık    | Businessman Koleksiyonu                                                                                                                                      |
| Açıklama  | Mr Okay Businessman Koleksiyonu. Modern iş insanı için tasarlanmış sofistike ve güçlü kokular. Classic, Weekend, Elegant, Avant-garde ve Holiday parfümleri. |
| OG Görsel | /images/businessman_hero.png                                                                                                                                 |

**Anahtar Kelimeler:**

- businessman parfüm
- erkek parfümü
- ofis parfümü
- iş parfümü
- classic parfüm
- elegant parfüm
- weekend parfüm
- avantgarde parfüm
- holiday parfüm

---

### Sepet Sayfası

**Dosya:** `src/app/cart/layout.tsx`

| Alan     | Değer                                                                                    |
| -------- | ---------------------------------------------------------------------------------------- |
| Başlık   | Sepetim                                                                                  |
| Açıklama | Mr Okay alışveriş sepetiniz. Seçtiğiniz parfümleri inceleyin ve siparişinizi tamamlayın. |
| Robots   | noindex, nofollow _(Arama motorlarında görünmemesi için)_                                |

---

## 🛍️ Ürün Sayfaları (Dinamik)

**Dosya:** `src/app/product/[id]/page.tsx`

Ürün sayfaları otomatik olarak ürün bilgilerinden metadata oluşturur:

| Alan      | Kaynak                                     |
| --------- | ------------------------------------------ |
| Başlık    | `{Ürün Adı} - {Koleksiyon} Koleksiyonu`    |
| Açıklama  | Ürün açıklaması + Üst notalar + ml + Fiyat |
| OG Görsel | Ürün görseli                               |

**Dahil edilen anahtar kelimeler:**

- Ürün adı
- Koleksiyon adı
- Koku ailesi
- erkek parfümü
- lüks parfüm
- Tüm üst, orta ve alt notalar

---

## 🤖 Robots.txt Ayarları

**Dosya:** `src/app/robots.ts`

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

Sitemap: https://mrokay.com/sitemap.xml
```

---

## 🗺️ Sitemap Ayarları

**Dosya:** `src/app/sitemap.ts`

### Dahil Edilen Sayfalar ve Öncelikleri

| Sayfa                   | Öncelik | Güncelleme Sıklığı |
| ----------------------- | ------- | ------------------ |
| Ana Sayfa               | 1.0     | weekly             |
| Businessman Koleksiyonu | 0.9     | weekly             |
| Ürün Sayfaları          | 0.9     | weekly             |
| Hakkımızda              | 0.8     | monthly            |
| Blog                    | 0.8     | weekly             |
| Kategori Sayfaları      | 0.8     | weekly             |
| İletişim                | 0.7     | monthly            |
| Mağazalar               | 0.7     | monthly            |
| Smartwoman Koleksiyonu  | 0.6     | monthly            |

---

## 📌 Önemli Notlar

1. **OG Görseli:** `public/images/og-image.jpg` dosyasını 1200x630 piksel boyutunda oluşturulmalı
2. **Sosyal Medya Hesapları:** `@mrokay` hesabı gerçek hesap adlarıyla değiştirilecek
