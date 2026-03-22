# Mr Okay - Luxury Parfumerie

A high-end, cinematic e-commerce website for luxury perfumes built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🎨 Design Philosophy

- **Aesthetic**: Ultra-premium, cinematic, mysterious, and sophisticated
- **Color Palette**: Strictly monochrome (Deep Black #050505, Pure White #FFFFFF, metallic grays/silvers)
- **Typography**: Playfair Display (headings) + Montserrat (body)
- **Animations**: Smooth parallax scrolling, magnetic buttons, elegant page transitions

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── app/
│   ├── about/          # Brand story page
│   ├── blog/           # Blog listing
│   ├── cart/           # Shopping cart
│   ├── collections/
│   │   ├── businessman/    # Men's collection
│   │   └── smartwoman/     # Women's collection
│   ├── contact/        # Contact form
│   ├── product/[id]/   # Product detail
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/
│   ├── Header.tsx          # Sticky nav with mega menu
│   ├── Footer.tsx          # Site footer
│   ├── HeroSection.tsx     # Cinematic hero
│   ├── ProductCard.tsx     # Product grid item
│   ├── ProductShowcase.tsx # Featured products section
│   ├── CollectionBanner.tsx
│   ├── BrandStory.tsx
│   ├── ScrollReveal.tsx    # Scroll animation wrapper
│   ├── PageTransition.tsx  # Page transition wrapper
│   └── MagneticButton.tsx  # Interactive button
```

## 🛠️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Key Features

- **Sticky Header**: Transparent to glassmorphism on scroll
- **Mega Menu**: Full-width dropdown for Businessman categories
- **Scroll Animations**: Elements fade in and float up on scroll
- **Product Hover Effects**: Image zoom + slide-up "Add to Cart"
- **Responsive Design**: Mobile-first approach
- **Smooth Transitions**: Page transitions with Framer Motion

## 🎯 Navigation Structure

**Left Side**:
- Mr Okay (About page)
- Businessman (Mega menu dropdown)
  - Avant-Garde
  - Classic
  - Elegant
  - Holiday
  - Weekend
- Smartwoman (Women's collection)

**Right Side**:
- Contact
- Cart icon

## 📌 Notes

- Product images are placeholders - replace with actual high-contrast B&W photography
- Video hero section is ready for a grayscale smoke/liquid video
- All animations use Framer Motion for smooth 60fps performance

## 📜 License

Proprietary - All rights reserved
