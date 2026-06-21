function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="#9BA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DropdownField({ label, value }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ color: '#1C2D4F', fontSize: 12.5, fontWeight: 700, marginBottom: 7 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1.5px solid #E8E4DC', borderRadius: 10, padding: '12px 14px', cursor: 'pointer' }}>
        <span style={{ color: '#1C2D4F', fontSize: 13.5 }}>{value}</span>
        <ChevronDown />
      </div>
    </div>
  );
}

export default function AddClient({ onBack, onSubmit }) {
  return (
    <div dir="rtl" style={{ fontFamily: "'Almarai',sans-serif", background: '#F6F4F0', display: 'flex', flexDirection: 'column', minHeight: 874 }}>
      {/* Navy nav bar */}
      <div style={{ background: '#1C2D4F', padding: '62px 16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexShrink: 0 }}>
        <button
          type="button"
          onClick={onBack}
          aria-label="رجوع"
          style={{ width: 34, height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.09)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10.5, marginBottom: 2 }}>الموكّلون</div>
          <div style={{ color: '#fff', fontSize: 15, fontWeight: 800 }}>إضافة موكّل جديد</div>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          style={{ width: 34, textAlign: 'center', cursor: 'pointer', flexShrink: 0, background: 'none', border: 'none' }}
        >
          <span style={{ color: '#C9A870', fontSize: 13, fontWeight: 700 }}>حفظ</span>
        </button>
      </div>

      {/* Scrollable form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 15px 0' }}>
        {/* Card 1: Client Info */}
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', padding: '18px 16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #F4F0EA' }}>
            <div style={{ width: 3.5, height: 18, background: '#C9A870', borderRadius: 2, flexShrink: 0 }} />
            <span style={{ color: '#1C2D4F', fontSize: 14, fontWeight: 800 }}>بيانات الموكّل</span>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ color: '#1C2D4F', fontSize: 12.5, fontWeight: 700, marginBottom: 7 }}>الاسم الكامل</div>
            <input
              type="text"
              defaultValue="أحمد محمود الشريف"
              style={{ width: '100%', background: '#fff', border: '1.5px solid #E8E4DC', borderRadius: 10, padding: '12px 14px', fontFamily: "'Almarai',sans-serif", fontSize: 13.5, color: '#1C2D4F', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ color: '#1C2D4F', fontSize: 12.5, fontWeight: 700, marginBottom: 7 }}>رقم الهاتف</div>
            <div style={{ display: 'flex', border: '1.5px solid #E8E4DC', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '12px 14px', background: '#F6F4F0', borderLeft: '1.5px solid #E8E4DC', color: '#5D6579', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>+٢٠</div>
              <input
                type="tel"
                defaultValue="0122 345 6789"
                style={{ flex: 1, minWidth: 0, background: '#fff', border: 'none', padding: '12px 12px', fontFamily: "'Almarai',sans-serif", fontSize: 13.5, color: '#1C2D4F', outline: 'none', direction: 'ltr', textAlign: 'left' }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
              <span style={{ color: '#1C2D4F', fontSize: 12.5, fontWeight: 700 }}>البريد الإلكتروني</span>
              <span style={{ background: 'rgba(28,45,79,0.07)', color: '#9BA3AF', fontSize: 10, fontWeight: 700, borderRadius: 5, padding: '2px 7px', lineHeight: 1.5 }}>اختياري</span>
            </div>
            <input
              type="email"
              placeholder="example@email.com"
              style={{ width: '100%', background: '#fff', border: '1.5px solid #E8E4DC', borderRadius: 10, padding: '12px 14px', fontFamily: "'Almarai',sans-serif", fontSize: 13, color: '#9BA3AF', boxSizing: 'border-box', outline: 'none', direction: 'ltr', textAlign: 'right' }}
            />
          </div>
        </div>

        {/* Card 2: Case Info */}
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', padding: '18px 16px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #F4F0EA' }}>
            <div style={{ width: 3.5, height: 18, background: '#C9A870', borderRadius: 2, flexShrink: 0 }} />
            <span style={{ color: '#1C2D4F', fontSize: 14, fontWeight: 800 }}>بيانات القضية</span>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ color: '#1C2D4F', fontSize: 12.5, fontWeight: 700, marginBottom: 7 }}>عنوان القضية</div>
            <input
              type="text"
              defaultValue="قضية تعويض عمالي"
              style={{ width: '100%', background: '#fff', border: '1.5px solid #1C2D4F', borderRadius: 10, padding: '12px 14px', fontFamily: "'Almarai',sans-serif", fontSize: 13.5, color: '#1C2D4F', boxSizing: 'border-box', outline: 'none', boxShadow: '0 0 0 3px rgba(28,45,79,0.08)' }}
            />
          </div>

          <DropdownField label="نوع القضية" value="قضية عمالية" />
          <DropdownField label="المحكمة" value="محكمة استئناف" />
          <DropdownField label="المحافظة" value="القاهرة" />

          <div>
            <div style={{ color: '#1C2D4F', fontSize: 12.5, fontWeight: 700, marginBottom: 7 }}>موعد الجلسة القادمة</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1.5px solid #E8E4DC', borderRadius: 10, padding: '12px 14px', cursor: 'pointer' }}>
              <span style={{ color: '#1C2D4F', fontSize: 13.5 }}>٢٨ / ٠٦ / ٢٠٢٦</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="#C9A870" strokeWidth="1.5" />
                <path d="M3 10h18" stroke="#C9A870" strokeWidth="1.5" />
                <path d="M8 3v3M16 3v3" stroke="#C9A870" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="7" y="14" width="2" height="2" rx="0.5" fill="#C9A870" />
                <rect x="11" y="14" width="2" height="2" rx="0.5" fill="#C9A870" />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="button"
          onClick={onSubmit}
          style={{ width: '100%', background: '#1C2D4F', border: 'none', borderRadius: 14, padding: '17px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', boxShadow: '0 6px 24px rgba(28,45,79,0.26)', marginBottom: 20 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#C9A870" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color: '#C9A870', fontSize: 16, fontWeight: 800, lineHeight: 1 }}>إضافة الموكّل</span>
        </button>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
