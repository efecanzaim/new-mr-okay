'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

const ALL_PAGES = [
  { label: 'Dashboard', href: '/dashboard', group: 'Genel' },
  { label: 'Ürünler', href: '/products', group: 'Katalog' },
  { label: 'Kategoriler', href: '/products/categories', group: 'Katalog' },
  { label: 'Siparişler', href: '/orders', group: 'Satış' },
  { label: 'Müşteriler', href: '/customers', group: 'Satış' },
  { label: 'Kuponlar', href: '/coupons', group: 'Satış' },
  { label: 'Kampanyalar', href: '/campaigns', group: 'Pazarlama' },
  { label: 'Stok Yönetimi', href: '/inventory', group: 'Analitik' },
  { label: 'Raporlar', href: '/reports', group: 'Analitik' },
  { label: 'Ana Sayfa İçerikleri', href: '/cms/home', group: 'CMS' },
  { label: 'Ürünler İçerikleri', href: '/cms/products', group: 'CMS' },
  { label: 'Koleksiyonlar İçerikleri', href: '/cms/collections', group: 'CMS' },
  { label: 'Hakkımızda İçerikleri', href: '/cms/about', group: 'CMS' },
  { label: 'İletişim İçerikleri', href: '/cms/contact', group: 'CMS' },
  { label: 'İçerik Blokları', href: '/content', group: 'CMS' },
]

export function Header({ title: _ }: { title: string }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Admin'

  const results = query.trim()
    ? ALL_PAGES.filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase()) ||
        p.group.toLowerCase().includes(query.toLowerCase())
      )
    : []

  function handleSelect(href: string) {
    router.push(href)
    setQuery('')
    setFocused(false)
    inputRef.current?.blur()
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setFocused(true)
      }
      if (e.key === 'Escape') {
        setQuery('')
        setFocused(false)
        setMenuOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <header className="h-16 shrink-0 bg-zinc-900 border-b border-zinc-800 flex items-center px-6 gap-4 z-20">

      {/* Logo */}
      <div className="w-48 shrink-0">
        <p className="text-zinc-100 font-semibold tracking-[0.12em] uppercase text-sm leading-none">Mr. Okay</p>
        <p className="text-zinc-500 text-[10px] tracking-widest uppercase mt-0.5">Admin Panel</p>
      </div>

      {/* Search — ortalanmış, sabit genişlik */}
      <div className="flex-1 flex justify-center">
      <div className="relative" style={{ width: '500px' }} ref={searchRef}>
        <div className={`flex items-center gap-2.5 bg-zinc-800/60 border rounded-lg px-3 py-2 transition-colors ${
          focused ? 'border-zinc-600 bg-zinc-800' : 'border-zinc-700/60'
        }`}>
          <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Panelde ara..."
            className="flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none"
          />
          {query ? (
            <button onClick={() => setQuery('')} className="text-zinc-600 hover:text-zinc-400 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-zinc-700 text-[10px] text-zinc-600 font-mono">
              ⌘K
            </kbd>
          )}
        </div>

        {focused && query.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50">
            {results.length === 0 ? (
              <p className="text-sm text-zinc-500 px-4 py-3">Sonuç bulunamadı.</p>
            ) : (
              <ul className="py-1.5">
                {results.map(p => (
                  <li key={p.href}>
                    <button
                      onClick={() => handleSelect(p.href)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors text-left"
                    >
                      <svg className="w-4 h-4 text-zinc-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-sm text-zinc-200 flex-1">{p.label}</span>
                      <span className="text-[11px] text-zinc-600 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded shrink-0">
                        {p.group}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      </div>

      {/* User Menu */}
      <div className="w-48 shrink-0 flex justify-end relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-semibold text-zinc-300 uppercase">
              {userName.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-zinc-300 hidden sm:block">{userName}</span>
          <svg
            className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute top-full right-0 mt-1.5 w-52 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl z-50">
            <div className="px-3 py-2.5 border-b border-zinc-700">
              <p className="text-xs font-medium text-zinc-200">{session?.user?.name || 'Admin'}</p>
              <p className="text-[10px] text-zinc-500 truncate mt-0.5">{session?.user?.email}</p>
            </div>
            <div className="p-1.5 space-y-0.5">
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profil
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors w-full text-left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Çıkış Yap
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
