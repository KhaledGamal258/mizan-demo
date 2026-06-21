const hearings = [
  { day: '٢٨', month: 'يونيو', caseTitle: 'قضية تعويض عمالي', client: 'أحمد الشريف', place: 'محكمة استئناف القاهرة · ١٠:٠٠ ص' },
  { day: '٢', month: 'يوليو', caseTitle: 'نزاع عقاري', client: 'منى إبراهيم', place: 'محكمة الأحوال الشخصية · ١١:٣٠ ص' },
  { day: '٥', month: 'يوليو', caseTitle: 'قضية إرث وتركة', client: 'سارة الديب', place: 'المحكمة الابتدائية بالجيزة · ٩:٠٠ ص' },
];

const cases = [
  {
    id: 'ahmed',
    initial: 'أ',
    name: 'أحمد الشريف',
    title: 'قضية تعويض عمالي',
    status: 'قيد النظر',
    statusColor: '#F59E0B',
    statusBg: 'rgba(245,158,11,0.1)',
    statusBorder: 'rgba(245,158,11,0.22)',
    avatarBg: '#1C2D4F',
    avatarColor: '#C9A870',
    date: '٢٨ يونيو ٢٠٢٦',
    place: 'استئناف القاهرة',
  },
  {
    id: 'mona',
    initial: 'م',
    name: 'منى إبراهيم',
    title: 'نزاع عقاري',
    status: 'مرحلة الإثبات',
    statusColor: '#3B82F6',
    statusBg: 'rgba(59,130,246,0.09)',
    statusBorder: 'rgba(59,130,246,0.2)',
    avatarBg: 'rgba(59,130,246,0.1)',
    avatarColor: '#3B82F6',
    date: '٢ يوليو ٢٠٢٦',
    place: 'الأحوال الشخصية',
  },
  {
    id: 'karim',
    initial: 'ك',
    name: 'كريم المنصوري',
    title: 'قضية حضانة وولاية',
    status: 'انتهت المرافعات',
    statusColor: '#8B5CF6',
    statusBg: 'rgba(139,92,246,0.09)',
    statusBorder: 'rgba(139,92,246,0.18)',
    avatarBg: 'rgba(139,92,246,0.1)',
    avatarColor: '#8B5CF6',
    date: '١٥ يوليو ٢٠٢٦',
    place: 'محكمة النقض',
  },
  {
    id: 'sara',
    initial: 'س',
    name: 'سارة الديب',
    title: 'قضية إرث وتركة',
    status: 'الإحالة للخبير',
    statusColor: '#14B8A6',
    statusBg: 'rgba(20,184,166,0.09)',
    statusBorder: 'rgba(20,184,166,0.2)',
    avatarBg: 'rgba(20,184,166,0.1)',
    avatarColor: '#14B8A6',
    date: '٥ يوليو ٢٠٢٦',
    place: 'المحكمة الابتدائية بالجيزة',
  },
];

export default function LawyerDashboard({ onOpenCase, onAddClient }) {
  return (
    <div dir="rtl" style={{ fontFamily: "'Almarai',sans-serif", background: '#F6F4F0', minHeight: 874 }}>
      {/* NAVY HEADER AREA */}
      <div style={{ background: '#1C2D4F' }}>
        <div style={{ padding: '62px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: '#C9A870', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, marginBottom: 3 }}>لوحة التحكم</div>
            <div style={{ color: '#fff', fontSize: 20, fontWeight: 800, lineHeight: 1 }}>أ. نادين سامي</div>
          </div>
          <div style={{ position: 'relative', width: 38, height: 38, borderRadius: 19, background: 'rgba(201,168,112,0.14)', border: '1.5px solid rgba(201,168,112,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#C9A870" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#C9A870" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', top: 5, left: 5, width: 8, height: 8, borderRadius: '50%', background: '#EF4444', border: '1.5px solid #1C2D4F' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, padding: '0 20px 22px' }}>
          {[
            { value: '١٢', label: 'موكّل\nنشط' },
            { value: '٨', label: 'قضية\nجارية' },
            { value: '٣', label: 'جلسات\nهذا الأسبوع' },
          ].map((stat) => (
            <div key={stat.value} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ color: '#C9A870', fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 5, lineHeight: 1.5 }}>
                {stat.label.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 15px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* HERO: Upcoming Hearings */}
        <div style={{ background: '#1C2D4F', borderRadius: 18, overflow: 'hidden', boxShadow: '0 10px 32px rgba(28,45,79,0.24)' }}>
          <div style={{ height: 2.5, background: 'linear-gradient(to left, transparent 0%, #C9A870 20%, #C9A870 80%, transparent 100%)' }} />
          <div style={{ padding: '18px 20px 6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ color: '#C9A870', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, marginBottom: 3 }}>هذا الأسبوع</div>
                <div style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>الجلسات القادمة</div>
              </div>
              <div style={{ background: 'rgba(201,168,112,0.12)', border: '1px solid rgba(201,168,112,0.22)', borderRadius: 20, padding: '4px 13px' }}>
                <span style={{ color: '#C9A870', fontSize: 12, fontWeight: 700 }}>٣ جلسات</span>
              </div>
            </div>

            {hearings.map((h, idx) => (
              <div
                key={h.caseTitle}
                style={{ display: 'flex', alignItems: 'flex-start', marginBottom: idx < hearings.length - 1 ? 15 : 0, paddingBottom: idx < hearings.length - 1 ? 15 : 20, borderBottom: idx < hearings.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
              >
                <div style={{ width: 42, flexShrink: 0, textAlign: 'center' }}>
                  <div style={{ color: '#C9A870', fontSize: 24, fontWeight: 800, lineHeight: 1 }}>{h.day}</div>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9.5, marginTop: 2 }}>{h.month}</div>
                </div>
                <div style={{ width: 1, background: 'rgba(201,168,112,0.25)', alignSelf: 'stretch', margin: '0 14px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, marginBottom: 3, lineHeight: 1.3 }}>{h.caseTitle}</div>
                  <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 11, marginBottom: 2 }}>{h.client}</div>
                  <div style={{ color: 'rgba(255,255,255,0.24)', fontSize: 10.5 }}>{h.place}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Cases */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13, padding: '0 2px' }}>
            <span style={{ color: '#1C2D4F', fontSize: 16, fontWeight: 800 }}>القضايا النشطة</span>
            <button
              type="button"
              onClick={onAddClient}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1C2D4F', border: 'none', borderRadius: 20, padding: '7px 14px', cursor: 'pointer' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="#C9A870" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <span style={{ color: '#C9A870', fontSize: 12.5, fontWeight: 700 }}>قضية جديدة</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cases.map((c) => (
              <div
                key={c.id}
                role="button"
                tabIndex={0}
                onClick={() => onOpenCase(c.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenCase(c.id)}
                style={{ background: '#fff', borderRadius: 14, padding: '14px 15px', boxShadow: '0 2px 14px rgba(0,0,0,0.05)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: c.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16, fontWeight: 800, color: c.avatarColor, lineHeight: 1 }}>
                    {c.initial}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
                      <div style={{ color: '#1C2D4F', fontSize: 14.5, fontWeight: 800 }}>{c.name}</div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: c.statusBg, border: `1px solid ${c.statusBorder}`, borderRadius: 20, padding: '3px 9px', flexShrink: 0 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.statusColor }} />
                        <span style={{ color: c.statusColor, fontSize: 11, fontWeight: 700 }}>{c.status}</span>
                      </div>
                    </div>
                    <div style={{ color: '#5D6579', fontSize: 12.5, marginBottom: 6 }}>{c.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#B2B8C2', fontSize: 11 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="5" width="18" height="16" rx="2" stroke="#C4C9D4" strokeWidth="1.6" />
                        <path d="M3 10h18" stroke="#C4C9D4" strokeWidth="1.6" />
                      </svg>
                      <span>{c.date}</span>
                      <span style={{ color: '#D4CFC5', margin: '0 2px' }}>·</span>
                      <span>{c.place}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
