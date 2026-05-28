# Product

## Register

brand

## Users

25-45 yaş arası, niche ve bağımsız parfümlere ilgi duyan ama Tom Ford / Chanel gibi büyük lux house'lara erişimi sınırlı tüketici. Marka hikayesine değer verir, kendi kokusal imzasını arar, hediye için araştırma yapar. Mobil ağırlıklı, çoğunlukla akşam veya hafta sonu göz atar. Türkçe ana dil; EN/DE/FR/AR ikincil. Karar verirken üç şeye bakar: koku notalarının net anlatımı, marka tutarlılığı, iade/kargo güvenliği.

Yapmaya çalıştıkları iş: koleksiyonun karakterini hissetmek, kendine yakışan kokuyu bulmak, "ne kullanıyorsun" sorusuna ezbersiz cevap verebilmek.

## Product Purpose

Niche parfüm kürasyonunu affordable luxury fiyat noktasında sunmak. İki koleksiyon (Businessman erkek / Smartwoman kadın) altında, her birinde net karakterleri olan 5'er kokuyla seçim baskısını azaltmak. Başarı ölçütü: müşterinin koleksiyondaki birden fazla kokuyu denemesi, ikinci siparişle markaya dönmesi, çevresine kendi sözleriyle anlatabilmesi.

## Brand Personality

Üç kelime: **sıcak, samimi, premium**.

Ton: Fısıldayan, gözlemci, anlatıcı. Reklam dili değil; koku notası gibi katmanlı, kısa cümleler. Türkçe duyusal, İngilizce yapısal (koleksiyon ve ürün adları İngilizce; anlatım Türkçe). Müşteriyle eşit konuşur: ne snob ne de pazarlamacı.

Duygu hedefi: rahatlama (lux klişe baskısı yok), kişisel teyit ("burası beni anlıyor"), zamansız hissi (sezonluk değil).

## Anti-references

Bu siteye **kesinlikle benzememesi gereken** estetikler ve patternlar:

- **Aşırı lux klişesi.** Chanel No.5 reklam estetii: altın sarmalar, parıltılı script fontlar, mermer doku, "şarap-bordo + altın" paleti, romantize edilmiş ağır parfüm reklamları. Lüks olmak için fısıldayan dili bırakıp bağıran görselliğe geçmek tuzağı.
- **Generic Türk e-com.** Trendyol / Hepsiburada / Gratis vibe'ı: kırmızı indirim rozetleri, çapraz satış grid'i, "şimdi al" sayaçlı popup'lar, kalabalık ürün badge'leri, mass-market promo banner ordusu. Affordable ≠ ucuz; fiyat avantajı promo gürültüsüyle değil, kürasyonla anlatılır.
- **(İmplied) SaaS-cream + dijital-luxury hibridleri.** Yumuşak gradient kart, neutral-purple AI estetii, "modern startup" rounded-everything. Mr. Okay bir SaaS dashboard değil; parfüm bir uygulama gibi davranmamalı.

## Design Principles

1. **Warmth carries premium.** Sıcak nötrler (krem, koyu kahve, antrasit), dokulu fotoğraflar, fısıldayan tipografi. Premium hissi altın veya parlatma ile değil, materyal kalitesi ve boşluğun rahatlığı ile taşınır.
2. **Editorial, not promotional.** Her koku bir koleksiyon notu gibi sunulur. Sayaçlar, indirim rozetleri, "stoklar tükeniyor" baskıları, popup'lar yok. Müşteriye satılmaz, müşteri seçer.
3. **Quietness as a feature.** Whitespace, az kelime, az renk. Yorgun göze değil, dikkatli göze hitap eder. Mega-menü, hero, ürün kartı: hepsi sessiz olmalı; sadece içerik konuşur.
4. **Modular composition.** Margiela Replica'nın beyaz etiket mantığı: her koku eşit ağırlıkta görünür, hiyerarşi başlıkla değil dizilimle kurulur. Tek bir "öne çıkan ürün" değil; koleksiyonun bütünü anlatılır.
5. **Affordable expressed through ritual, not discount.** Fiyat avantajı promo grafiğiyle değil, ürünün "denenmiş, bilinçli seçilmiş" hissettiren dili ile iletilir. Hiçbir yerde "indirim" görselliği yer almaz; değer, anlatım üzerinden kurulur.

## Accessibility & Inclusion

**Hedef: WCAG 2.2 AAA.** Pratik uygulama:

- **Kontrast.** Tüm gövde metin / arka plan kombinasyonları AAA (7:1) seviyesinde. Krem (`#faf9f6`) üzerine açık gri metin yasak; en azından `oklch(0.30 ...)` koyuluk.
- **Klavye.** Mega-menü, dil dropdown, ürün kartı: tab ile dolaşılabilir, görünür odak halkası (`outline` veya `ring`), `Escape` ile kapanır.
- **Motion.** `prefers-reduced-motion: reduce` saygılı; scroll-reveal, parallax, magnetic button efektleri reduced-motion'da devre dışı veya 50ms opacity fade ile değişir.
- **Görsel.** Tüm ürün ve marka görsellerinde anlamlı alt-text (Türkçe ana dil). Dekoratif arka planlar `alt=""` veya `aria-hidden`.
- **Semantik.** Mega-menü `nav[aria-label="..."]`, dropdown `aria-expanded`, dil seçici `role="listbox"`. Sayfa landmark'ları (header/main/footer) net.
- **Çoklu dil.** `lang` attribute her sayfa için doğru; RTL desteği (Arapça) layout'a kurulur, görsel olarak ezilmez.
