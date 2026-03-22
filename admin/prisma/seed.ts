import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seed başlıyor...')

  // Admin kullanıcısı
  const hashedPassword = await bcrypt.hash('Admin2025!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mrokayparfum.com' },
    update: {},
    create: {
      email: 'admin@mrokayparfum.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  })
  console.log('Admin kullanıcısı oluşturuldu:', admin.email)

  // Kategoriler
  const businessman = await prisma.category.upsert({
    where: { slug: 'businessman' },
    update: {},
    create: { name: 'Businessman', slug: 'businessman', description: 'Erkek koleksiyonu' },
  })

  const smartwoman = await prisma.category.upsert({
    where: { slug: 'smartwoman' },
    update: {},
    create: { name: 'Smartwoman', slug: 'smartwoman', description: 'Kadın koleksiyonu' },
  })
  console.log('Kategoriler oluşturuldu.')

  // Ürünler
  const products = [
    // BUSINESSMAN
    {
      name: 'Classic',
      slug: 'classic',
      description: 'Klasik, disiplinli, özgüvenli',
      price: 1250,
      sku: 'BM-CLASSIC-50',
      status: 'ACTIVE',
      featured: true,
      categoryId: businessman.id,
      images: [
        { url: '/products/classic.png', alt: 'Classic', order: 0 },
        { url: '/products/classic_hover.png', alt: 'Classic Hover', order: 1 },
        { url: '/products/classic_detail1.png', alt: 'Classic Detail 1', order: 2 },
        { url: '/products/classic_detail2.png', alt: 'Classic Detail 2', order: 3 },
      ],
      variants: [{ name: '50ml', sku: 'BM-CLASSIC-50ML', price: 1250, stock: 100 }],
    },
    {
      name: 'Weekend',
      slug: 'weekend',
      description: 'Şehirli, modern, hafta sonlarının keyfini huzurla çıkaran bir stil',
      price: 1250,
      sku: 'BM-WEEKEND-50',
      status: 'ACTIVE',
      featured: false,
      categoryId: businessman.id,
      images: [
        { url: '/products/weekend.png', alt: 'Weekend', order: 0 },
        { url: '/products/weekend_hover.png', alt: 'Weekend Hover', order: 1 },
        { url: '/products/weekend_detail1.png', alt: 'Weekend Detail 1', order: 2 },
        { url: '/products/weekend_detail2.png', alt: 'Weekend Detail 2', order: 3 },
      ],
      variants: [{ name: '50ml', sku: 'BM-WEEKEND-50ML', price: 1250, stock: 100 }],
    },
    {
      name: 'Elegant',
      slug: 'elegant',
      description: 'Sofistike, zarif ve entelektüel',
      price: 1250,
      sku: 'BM-ELEGANT-50',
      status: 'ACTIVE',
      featured: false,
      categoryId: businessman.id,
      images: [
        { url: '/products/elegant.png', alt: 'Elegant', order: 0 },
        { url: '/products/elegant_hover.png', alt: 'Elegant Hover', order: 1 },
        { url: '/products/elegant_detail1.png', alt: 'Elegant Detail 1', order: 2 },
        { url: '/products/elegant_detail2.png', alt: 'Elegant Detail 2', order: 3 },
      ],
      variants: [{ name: '50ml', sku: 'BM-ELEGANT-50ML', price: 1250, stock: 100 }],
    },
    {
      name: 'Avant-garde',
      slug: 'avantgarde',
      description: 'Yaratıcı, vizyoner, cesur',
      price: 1250,
      sku: 'BM-AVANTGARDE-50',
      status: 'ACTIVE',
      featured: false,
      categoryId: businessman.id,
      images: [
        { url: '/products/avantgarde.png', alt: 'Avant-garde', order: 0 },
        { url: '/products/avantgarde_hover.png', alt: 'Avant-garde Hover', order: 1 },
        { url: '/products/avantgarde_detail1.png', alt: 'Avant-garde Detail 1', order: 2 },
        { url: '/products/avantgarde_detail2.png', alt: 'Avant-garde Detail 2', order: 3 },
      ],
      variants: [{ name: '50ml', sku: 'BM-AVANTGARDE-50ML', price: 1250, stock: 100 }],
    },
    {
      name: 'Holiday',
      slug: 'holiday',
      description: 'Hayatı dolu dolu yaşayan, özgür ruhlu ve enerjik iş adamı',
      price: 1250,
      sku: 'BM-HOLIDAY-50',
      status: 'ACTIVE',
      featured: false,
      categoryId: businessman.id,
      images: [
        { url: '/products/holiday.png', alt: 'Holiday', order: 0 },
        { url: '/products/holiday_hover.png', alt: 'Holiday Hover', order: 1 },
        { url: '/products/holiday_detail1.png', alt: 'Holiday Detail 1', order: 2 },
        { url: '/products/holiday_detail2.png', alt: 'Holiday Detail 2', order: 3 },
      ],
      variants: [{ name: '50ml', sku: 'BM-HOLIDAY-50ML', price: 1250, stock: 100 }],
    },
    // SMARTWOMAN
    {
      name: 'Mystery',
      slug: 'mystery',
      description: 'Gecenin gizemini taşıyan, sofistike ve büyüleyici',
      price: 1250,
      sku: 'SW-MYSTERY-50',
      status: 'ACTIVE',
      featured: true,
      categoryId: smartwoman.id,
      images: [
        { url: '/products/mystery.png', alt: 'Mystery', order: 0 },
        { url: '/products/mystery1.png', alt: 'Mystery 1', order: 1 },
        { url: '/products/mystery2.png', alt: 'Mystery 2', order: 2 },
        { url: '/products/mystery_hover.png', alt: 'Mystery Hover', order: 3 },
      ],
      variants: [{ name: '50ml', sku: 'SW-MYSTERY-50ML', price: 1250, stock: 100 }],
    },
    {
      name: 'Celebrity',
      slug: 'celebrity',
      description: 'Işıltılı, karizmatik ve göz alıcı',
      price: 1250,
      sku: 'SW-CELEBRITY-50',
      status: 'ACTIVE',
      featured: false,
      categoryId: smartwoman.id,
      images: [
        { url: '/products/celebrity.png', alt: 'Celebrity', order: 0 },
        { url: '/products/celebrity1.png', alt: 'Celebrity 1', order: 1 },
        { url: '/products/celebrity2.png', alt: 'Celebrity 2', order: 2 },
        { url: '/products/celebrity_hover.png', alt: 'Celebrity Hover', order: 3 },
      ],
      variants: [{ name: '50ml', sku: 'SW-CELEBRITY-50ML', price: 1250, stock: 100 }],
    },
    {
      name: 'Majesty',
      slug: 'majesty',
      description: 'Asil, güçlü ve etkileyici',
      price: 1250,
      sku: 'SW-MAJESTY-50',
      status: 'ACTIVE',
      featured: false,
      categoryId: smartwoman.id,
      images: [
        { url: '/products/majesty.png', alt: 'Majesty', order: 0 },
        { url: '/products/majesty1.png', alt: 'Majesty 1', order: 1 },
        { url: '/products/majesty2.png', alt: 'Majesty 2', order: 2 },
        { url: '/products/majesty_hover.png', alt: 'Majesty Hover', order: 3 },
      ],
      variants: [{ name: '50ml', sku: 'SW-MAJESTY-50ML', price: 1250, stock: 100 }],
    },
    {
      name: 'Dreamy',
      slug: 'dreamy',
      description: 'Hayalperest, romantik ve zarif',
      price: 1250,
      sku: 'SW-DREAMY-50',
      status: 'ACTIVE',
      featured: false,
      categoryId: smartwoman.id,
      images: [
        { url: '/products/dreamy.png', alt: 'Dreamy', order: 0 },
        { url: '/products/dreamy1.png', alt: 'Dreamy 1', order: 1 },
        { url: '/products/dreamy2.png', alt: 'Dreamy 2', order: 2 },
        { url: '/products/dreamy_hover.png', alt: 'Dreamy Hover', order: 3 },
      ],
      variants: [{ name: '50ml', sku: 'SW-DREAMY-50ML', price: 1250, stock: 100 }],
    },
    {
      name: 'Shiny',
      slug: 'shiny',
      description: 'Enerjik, parlak ve canlı',
      price: 1250,
      sku: 'SW-SHINY-50',
      status: 'ACTIVE',
      featured: false,
      categoryId: smartwoman.id,
      images: [
        { url: '/products/shiny.png', alt: 'Shiny', order: 0 },
        { url: '/products/shiny1.png', alt: 'Shiny 1', order: 1 },
        { url: '/products/shiny2.png', alt: 'Shiny 2', order: 2 },
        { url: '/products/shiny_hover.png', alt: 'Shiny Hover', order: 3 },
      ],
      variants: [{ name: '50ml', sku: 'SW-SHINY-50ML', price: 1250, stock: 100 }],
    },
  ]

  for (const p of products) {
    const { images, variants, ...productData } = p
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...productData,
        images: { create: images },
        variants: { create: variants },
      },
    })
    console.log('Ürün oluşturuldu:', product.name)
  }

  // Ana sayfa içerikleri
  const contents = [
    { key: 'hero_main', type: 'HERO', title: 'Mr. Okay', subtitle: 'Signature Parfumerie', image: '/images/businessman_hero.png', link: '/collections/businessman', order: 0 },
    { key: 'banner_businessman', type: 'BANNER', title: 'Businessman Collection', image: '/images/mrokay_banner.png', link: '/collections/businessman', order: 1 },
    { key: 'banner_smartwoman', type: 'BANNER', title: 'Smartwoman Collection', image: '/images/elegant_banner.png', link: '/collections/smartwoman', order: 2 },
    { key: 'slider_1', type: 'SLIDER', image: '/images/slider1.jpg', link: '/collections/businessman', order: 0 },
    { key: 'slider_2', type: 'SLIDER', image: '/images/slider2.jpg', link: '/collections/smartwoman', order: 1 },
    { key: 'slider_3', type: 'SLIDER', image: '/images/slider3.jpg', link: '/collections/businessman', order: 2 },
  ]

  for (const c of contents) {
    await prisma.content.upsert({
      where: { key: c.key },
      update: {},
      create: c,
    })
  }
  console.log('İçerikler oluşturuldu.')

  console.log('Seed tamamlandı!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
