'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Bekliyor', PROCESSING: 'İşleniyor', SHIPPED: 'Gönderildi',
  DELIVERED: 'Teslim Edildi', CANCELLED: 'İptal', RETURNED: 'İade',
}

const PIE_COLORS = ['#818cf8', '#a78bfa', '#f472b6', '#fb923c', '#34d399', '#60a5fa']

const RANGE_OPTIONS = [
  { value: '7d', label: 'Son 7 Gün' },
  { value: '30d', label: 'Son 30 Gün' },
  { value: '90d', label: 'Son 90 Gün' },
  { value: '1y', label: 'Son 1 Yıl' },
]

const GROUP_OPTIONS = [
  { value: 'day', label: 'Günlük' },
  { value: 'week', label: 'Haftalık' },
  { value: 'month', label: 'Aylık' },
]

function formatCurrency(val: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val)
}

function formatDate(str: string) {
  if (str.length === 7) return str
  const d = new Date(str)
  return `${d.getDate()}.${d.getMonth() + 1}`
}

const tooltipStyle = {
  backgroundColor: '#18181b',
  border: '1px solid #3f3f46',
  borderRadius: '8px',
  color: '#e4e4e7',
  fontSize: '12px',
}

export default function ReportsPage() {
  const [range, setRange] = useState('30d')
  const [groupBy, setGroupBy] = useState('day')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/reports?range=${range}&groupBy=${groupBy}`)
    const json = await res.json()
    setData(json)
    setLoading(false)
  }, [range, groupBy])

  useEffect(() => { fetchData() }, [fetchData])

  return (
    <AdminLayout title="Raporlar">
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-0.5 bg-zinc-800 p-1 rounded-lg">
          {RANGE_OPTIONS.map(opt => (
            <button key={opt.value} onClick={() => setRange(opt.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${range === opt.value ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex gap-0.5 bg-zinc-800 p-1 rounded-lg">
          {GROUP_OPTIONS.map(opt => (
            <button key={opt.value} onClick={() => setGroupBy(opt.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${groupBy === opt.value ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-zinc-500 text-sm">Yükleniyor...</div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Toplam Gelir" value={formatCurrency(data.summary.totalRevenue)} />
            <StatCard label="Toplam Sipariş" value={data.summary.totalOrders.toString()} />
            <StatCard label="Ödenen Sipariş" value={data.summary.paidOrders.toString()} />
          </div>

          <ChartCard title="Gelir Grafiği">
            {data.revenueChart.length === 0 ? <EmptyState /> : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={data.revenueChart} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                  <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => `₺${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#71717a' }} width={50} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} labelFormatter={formatDate} contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="revenue" name="Gelir" stroke="#818cf8" strokeWidth={2} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Sipariş Durum Dağılımı">
              {data.orderStatusChart.length === 0 ? <EmptyState /> : (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={data.orderStatusChart} dataKey="count" nameKey="status"
                      cx="50%" cy="50%" outerRadius={90}
                      label={({ status, percent }) => `${STATUS_LABELS[status] || status} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}>
                      {data.orderStatusChart.map((_: any, i: number) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number, name: string) => [v, STATUS_LABELS[name] || name]} contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard title="Ülkelere Göre Sipariş">
              {data.countryChart.length === 0 ? <EmptyState /> : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={data.countryChart} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="country" type="category" tick={{ fontSize: 11, fill: '#71717a' }} width={70} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="count" name="Sipariş" fill="#a78bfa" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="En Çok Satan Ürünler">
              {data.topProducts.length === 0 ? <EmptyState /> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left py-2 text-[11px] text-zinc-500 font-medium">#</th>
                        <th className="text-left py-2 text-[11px] text-zinc-500 font-medium">Ürün</th>
                        <th className="text-right py-2 text-[11px] text-zinc-500 font-medium">Adet</th>
                        <th className="text-right py-2 text-[11px] text-zinc-500 font-medium">Gelir</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topProducts.map((p: any, i: number) => (
                        <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/40">
                          <td className="py-2.5 text-zinc-600 text-xs">{i + 1}</td>
                          <td className="py-2.5 text-zinc-200 font-medium truncate max-w-[160px]">{p.name}</td>
                          <td className="py-2.5 text-right text-zinc-400">{p.qty}</td>
                          <td className="py-2.5 text-right text-zinc-100 font-medium">{formatCurrency(p.revenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ChartCard>

            <ChartCard title="Kupon Kullanım İstatistikleri">
              {data.couponStats.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-zinc-500 text-sm">Bu dönemde kupon kullanımı yok.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left py-2 text-[11px] text-zinc-500 font-medium">Kupon Kodu</th>
                        <th className="text-right py-2 text-[11px] text-zinc-500 font-medium">Kullanım</th>
                        <th className="text-right py-2 text-[11px] text-zinc-500 font-medium">Toplam Gelir</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.couponStats.map((c: any, i: number) => (
                        <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/40">
                          <td className="py-2.5">
                            <span className="font-mono text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300 border border-zinc-700">{c.code}</span>
                          </td>
                          <td className="py-2.5 text-right text-zinc-400">{c.uses}</td>
                          <td className="py-2.5 text-right text-zinc-100 font-medium">{formatCurrency(c.totalRevenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ChartCard>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-semibold text-zinc-100">{value}</p>
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <p className="text-sm font-medium text-zinc-200 mb-4">{title}</p>
      {children}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center h-32 text-zinc-500 text-sm">
      Bu dönemde veri bulunamadı.
    </div>
  )
}
