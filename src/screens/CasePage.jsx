import { useState } from 'react';

const initialDocs = [
  { name: 'عقد العمل الأصلي', date: '١٥ مايو ٢٠٢٦', size: '2.4 MB', visible: true },
  { name: 'قرار الفصل التعسفي', date: '٢ مارس ٢٠٢٦', size: '1.1 MB', visible: false },
  { name: 'محضر الجلسة السابقة', date: '١٨ أبريل ٢٠٢٦', size: '0.8 MB', visible: true },
];

const initialUpdates = [
  { title: 'تم تقديم مذكرة الدفاع', desc: 'رُفعت مذكرة الدفاع رسمياً إلى محكمة استئناف القاهرة', date: '١٢ يونيو ٢٠٢٦', dotColor: '#1C2D4F', visible: true },
  { title: 'تحديد موعد الجلسة القادمة', desc: 'الجلسة في ٢٨ يونيو ٢٠٢٦ الساعة العاشرة صباحاً', date: '٥ يونيو ٢٠٢٦', dotColor: '#C9A870', visible: true },
  { title: 'ملاحظات استراتيجية (سرية)', desc: 'نقاط ضعف في حجج الطرف الآخر — للاطلاع الداخلي فقط', date: '٢٠ مايو ٢٠٢٦', dotColor: '#B2B8C2', visible: false },
];

const initialMessages = [
  { from: 'client', text: 'صباح الخير أستاذة نادين، هل تم تقديم المذكرة بالفعل؟ أنا قلقان قليلاً', time: '٩:١٥ ص · ١٢ يونيو' },
  { from: 'lawyer', text: 'صباح النور، نعم تم تقديم المذكرة اليوم بنجاح، كل شيء على ما يرام', time: '١٠:٣٢ ص · ١٢ يونيو' },
  { from: 'client', text: 'شكراً جزيلاً، هل هناك أي مستندات أحتاج لتوقيعها قبل الجلسة؟', time: '٢:٠٠ م · ١٤ يونيو' },
];

const AR_MONTHS = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

function toArNum(n) {
  return String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
}

function buildDateObj(iso) {
  const d = new Date(iso);
  const day = d.getUTCDate();
  const month = AR_MONTHS[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return { day: toArNum(day), month, full: `${toArNum(day)} ${month} ${toArNum(year)}` };
}

function FileIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path d="M11 1H3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" stroke="#1C2D4F" strokeWidth="1.35" strokeLinejoin="round" />
      <path d="M11 1v6h6" stroke="#1C2D4F" strokeWidth="1.35" strokeLinejoin="round" />
      <rect x="4" y="13" width="7" height="1.3" rx="0.65" fill="#1C2D4F" opacity="0.4" />
      <rect x="4" y="16" width="5" height="1.3" rx="0.65" fill="#1C2D4F" opacity="0.25" />
    </svg>
  );
}

function VisiblePill({ compact }) {
  const size = compact ? 12 : 13;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: compact ? 5 : 6, background: 'rgba(22,163,74,0.09)', border: '1.5px solid rgba(22,163,74,0.3)', borderRadius: 20, padding: compact ? '4px 10px 4px 8px' : '5px 13px 5px 10px' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#16A34A" strokeWidth={compact ? 1.9 : 1.8} strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke="#16A34A" strokeWidth={compact ? 1.9 : 1.8} />
      </svg>
      <span style={{ color: '#16A34A', fontSize: compact ? 10.5 : 12, fontWeight: 700, lineHeight: 1, whiteSpace: compact ? 'nowrap' : undefined }}>
        {compact ? 'للموكّل' : 'مرئي للموكّل'}
      </span>
    </div>
  );
}

function NotVisiblePill({ compact }) {
  const size = compact ? 12 : 13;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: compact ? 5 : 6, background: 'rgba(156,163,175,0.1)', border: '1.5px solid rgba(156,163,175,0.28)', borderRadius: 20, padding: compact ? '4px 10px 4px 8px' : '5px 13px 5px 10px' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="#9CA3AF" strokeWidth={compact ? 1.9 : 1.8} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#9CA3AF" strokeWidth={compact ? 1.9 : 1.8} strokeLinecap="round" />
      </svg>
      <span style={{ color: '#9CA3AF', fontSize: compact ? 10.5 : 12, fontWeight: 700, lineHeight: 1, whiteSpace: compact ? 'nowrap' : undefined }}>
        {compact ? 'داخلي' : 'داخلي فقط'}
      </span>
    </div>
  );
}

export default function CasePage({ client, lawyerName, onBack, sessions = [], onAddSession }) {
  const [docs, setDocs] = useState(initialDocs);
  const [updates, setUpdates] = useState(initialUpdates);
  const [messages, setMessages] = useState(initialMessages);
  const [replyText, setReplyText] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [formDate, setFormDate] = useState('');
  const [formDecision, setFormDecision] = useState('');
  const [formNextDate, setFormNextDate] = useState('');

  const toggleDoc = (idx) => {
    setDocs(docs.map((d, i) => (i === idx ? { ...d, visible: !d.visible } : d)));
  };

  const toggleUpdate = (idx) => {
    setUpdates(updates.map((u, i) => (i === idx ? { ...u, visible: !u.visible } : u)));
  };

  const onSendReply = () => {
    const text = replyText.trim();
    if (!text) return;
    setMessages([...messages, { from: 'lawyer', text, time: 'الآن' }]);
    setReplyText('');
  };

  const handleSaveSession = () => {
    if (!formDecision.trim()) return;
    const dateObj = formDate ? buildDateObj(formDate) : { day: '', month: '', full: 'تاريخ غير محدد' };
    const nextHearingObj = formNextDate ? buildDateObj(formNextDate) : null;
    const newSession = {
      id: `s-dynamic-${Date.now()}`,
      date: dateObj,
      decision: formDecision.trim(),
      nextHearing: nextHearingObj,
    };
    if (onAddSession) onAddSession(newSession);
    setFormDate('');
    setFormDecision('');
    setFormNextDate('');
    setShowAddForm(false);
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setFormDate('');
    setFormDecision('');
    setFormNextDate('');
  };

  const inputStyle = {
    width: '100%',
    background: '#fff',
    border: '1.5px solid #E8E4DC',
    borderRadius: 8,
    padding: '8px 10px',
    fontFamily: "'Almarai',sans-serif",
    fontSize: 13,
    color: '#1C2D4F',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div dir="rtl" style={{ fontFamily: "'Almarai',sans-serif", background: '#F6F4F0' }}>
      {/* NAVY NAV BAR */}
      <div style={{ background: '#1C2D4F', padding: '20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <button
          type="button"
          onClick={onBack}
          aria-label="رجوع"
          style={{ width: 34, height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.09)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10.5, marginBottom: 2 }}>ملف القضية</div>
          <div style={{ color: '#fff', fontSize: 15, fontWeight: 800, lineHeight: 1.2 }}>{client.caseTitle}</div>
        </div>
        <div style={{ width: 34, height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1.5" fill="rgba(255,255,255,0.7)" />
            <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.7)" />
            <circle cx="12" cy="19" r="1.5" fill="rgba(255,255,255,0.7)" />
          </svg>
        </div>
      </div>

      <div style={{ padding: '20px 16px 0', maxWidth: 1100, marginInline: 'auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {/* CASE HEADER CARD */}
        <div style={{ background: '#1C2D4F', borderRadius: 18, overflow: 'hidden', boxShadow: '0 10px 32px rgba(28,45,79,0.24)' }}>
          <div style={{ height: 2.5, background: 'linear-gradient(to left, transparent 0%, #C9A870 20%, #C9A870 80%, transparent 100%)' }} />
          <div style={{ padding: '17px 19px 19px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: client.statusBg, border: `1px solid ${client.statusBorder}`, borderRadius: 20, padding: '4px 12px' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: client.statusColor }} />
                <span style={{ color: client.statusColor, fontSize: 12, fontWeight: 700 }}>{client.status}</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: 'rgba(255,255,255,0.32)', fontSize: 9.5, marginBottom: 3 }}>الجلسة القادمة</div>
                <div style={{ color: '#C9A870', fontSize: 14, fontWeight: 800, lineHeight: 1 }}>{client.nextHearing.full}</div>
              </div>
            </div>

            <div style={{ color: '#fff', fontSize: 18, fontWeight: 800, lineHeight: 1.25, marginBottom: 4 }}>{client.caseTitle}</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11.5, marginBottom: 16 }}>{client.name} — رقم القضية: {client.caseNumber}</div>

            <div style={{ background: 'rgba(255,255,255,0.055)', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 1 }}>
              <div style={{ display: 'flex', gap: 1, background: 'rgba(255,255,255,0.055)' }}>
                <div style={{ flex: 1, background: '#1C2D4F', padding: '11px 14px' }}>
                  <div style={{ color: '#C9A870', fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, marginBottom: 5 }}>رقم القضية</div>
                  <div style={{ color: '#fff', fontSize: 12.5, fontWeight: 700 }}>{client.caseNumber}</div>
                </div>
                <div style={{ flex: 1, background: '#1C2D4F', padding: '11px 14px' }}>
                  <div style={{ color: '#C9A870', fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, marginBottom: 5 }}>تاريخ الرفع</div>
                  <div style={{ color: '#fff', fontSize: 12.5, fontWeight: 700 }}>{client.filedDate}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 1, background: 'rgba(255,255,255,0.055)' }}>
                <div style={{ flex: 1, background: '#1C2D4F', padding: '11px 14px' }}>
                  <div style={{ color: '#C9A870', fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, marginBottom: 5 }}>المحكمة</div>
                  <div style={{ color: '#fff', fontSize: 12.5, fontWeight: 700 }}>{client.courtShort}</div>
                </div>
                <div style={{ flex: 1, background: '#1C2D4F', padding: '11px 14px' }}>
                  <div style={{ color: '#C9A870', fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, marginBottom: 5 }}>المرحلة الحالية</div>
                  <div style={{ color: '#fff', fontSize: 12.5, fontWeight: 700 }}>{client.stage}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SESSIONS LOG */}
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ height: 2.5, background: 'linear-gradient(to left, transparent 0%, #C9A870 20%, #C9A870 80%, transparent 100%)' }} />
          <div style={{ padding: '15px 15px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
              <span style={{ color: '#1C2D4F', fontSize: 16, fontWeight: 800 }}>سجل الجلسات</span>
              <button
                type="button"
                onClick={() => setShowAddForm((f) => !f)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: showAddForm ? 'rgba(28,45,79,0.12)' : 'rgba(28,45,79,0.07)', border: 'none', borderRadius: 20, padding: '6px 13px', cursor: 'pointer' }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="#1C2D4F" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
                <span style={{ color: '#1C2D4F', fontSize: 12, fontWeight: 700, opacity: 0.7, fontFamily: "'Almarai',sans-serif" }}>إضافة جلسة</span>
              </button>
            </div>

            {showAddForm && (
              <div style={{ background: '#F6F4F0', borderRadius: 10, padding: '14px', marginBottom: 16, border: '1px solid #E8E4DC' }}>
                <div style={{ color: '#1C2D4F', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>تسجيل جلسة جديدة</div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 140px' }}>
                    <div style={{ color: '#9BA3AF', fontSize: 11, fontWeight: 700, marginBottom: 5 }}>تاريخ الجلسة</div>
                    <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ flex: '1 1 140px' }}>
                    <div style={{ color: '#9BA3AF', fontSize: 11, fontWeight: 700, marginBottom: 5 }}>الجلسة القادمة</div>
                    <input type="date" value={formNextDate} onChange={(e) => setFormNextDate(e.target.value)} style={inputStyle} />
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ color: '#9BA3AF', fontSize: 11, fontWeight: 700, marginBottom: 5 }}>
                    قرار الجلسة <span style={{ color: '#EF4444' }}>*</span>
                  </div>
                  <textarea
                    value={formDecision}
                    onChange={(e) => setFormDecision(e.target.value)}
                    rows={3}
                    placeholder="اكتب قرار المحكمة في هذه الجلسة..."
                    style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    onClick={handleSaveSession}
                    disabled={!formDecision.trim()}
                    style={{
                      background: formDecision.trim() ? '#1C2D4F' : '#E8E4DC',
                      color: formDecision.trim() ? '#C9A870' : '#B2B8C2',
                      border: 'none',
                      borderRadius: 20,
                      padding: '8px 18px',
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "'Almarai',sans-serif",
                      cursor: formDecision.trim() ? 'pointer' : 'not-allowed',
                    }}
                  >
                    حفظ الجلسة
                  </button>
                  <button
                    type="button"
                    onClick={cancelForm}
                    style={{ background: 'transparent', border: '1.5px solid #E8E4DC', borderRadius: 20, padding: '8px 18px', fontSize: 13, fontWeight: 700, fontFamily: "'Almarai',sans-serif", color: '#9BA3AF', cursor: 'pointer' }}
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            {sessions.length === 0 && !showAddForm ? (
              <div style={{ textAlign: 'center', padding: '24px 16px', color: '#B2B8C2', fontSize: 13 }}>
                لا توجد جلسات مسجلة بعد — أضف أول جلسة
              </div>
            ) : (
              sessions.map((session, idx) => (
                <div
                  key={session.id}
                  style={{
                    display: 'flex',
                    gap: 13,
                    paddingBottom: 16,
                    marginBottom: idx < sessions.length - 1 ? 0 : 0,
                    borderBottom: idx < sessions.length - 1 ? '1px solid #F0ECE5' : 'none',
                    paddingTop: idx > 0 ? 16 : 0,
                  }}
                >
                  <div style={{ width: 38, flexShrink: 0, textAlign: 'center', paddingTop: 2 }}>
                    <div style={{ color: '#1C2D4F', fontSize: 19, fontWeight: 800, lineHeight: 1 }}>{session.date.day}</div>
                    <div style={{ color: '#9BA3AF', fontSize: 9.5, marginTop: 2 }}>{session.date.month}</div>
                  </div>
                  <div style={{ width: 1, background: 'rgba(201,168,112,0.3)', alignSelf: 'stretch', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#1C2D4F', fontSize: 13, fontWeight: 700, lineHeight: 1.6, marginBottom: session.nextHearing ? 8 : 0 }}>{session.decision}</div>
                    {session.nextHearing && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(201,168,112,0.09)', border: '1px solid rgba(201,168,112,0.25)', borderRadius: 20, padding: '3px 10px' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="5" width="18" height="16" rx="2" stroke="#B5924A" strokeWidth="1.8" />
                          <path d="M3 10h18M8 3v3M16 3v3" stroke="#B5924A" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        <span style={{ color: '#B5924A', fontSize: 11, fontWeight: 700 }}>الجلسة القادمة: {session.nextHearing.full}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            <div style={{ height: sessions.length === 0 && !showAddForm ? 0 : 8 }} />
          </div>
        </div>

        {/* DOCUMENTS + TIMELINE (side by side on desktop) */}
        <div className="flex lg:grid lg:grid-cols-2 lg:gap-[22px]" style={{ flexDirection: 'column', gap: 22 }}>
          {/* DOCUMENTS */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13, padding: '0 2px' }}>
              <span style={{ color: '#1C2D4F', fontSize: 16, fontWeight: 800 }}>المستندات</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(28,45,79,0.07)', borderRadius: 20, padding: '6px 13px', cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="#1C2D4F" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                <span style={{ color: '#1C2D4F', fontSize: 12, fontWeight: 700, opacity: 0.65 }}>رفع مستند</span>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              {docs.map((item, idx) => (
                <div key={item.name}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 15px' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(28,45,79,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FileIcon />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: '#1C2D4F', fontSize: 13.5, fontWeight: 700, marginBottom: 3 }}>{item.name}</div>
                      <div style={{ color: '#9BA3AF', fontSize: 11.5, marginBottom: 10 }}>{item.date} · {item.size}</div>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleDoc(idx)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleDoc(idx)}
                        style={{ display: 'inline-flex', cursor: 'pointer' }}
                      >
                        {item.visible ? <VisiblePill /> : <NotVisiblePill />}
                      </div>
                    </div>
                  </div>
                  {idx < docs.length - 1 && <div style={{ height: 1, background: '#F0ECE5', margin: '0 15px' }} />}
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVITY TIMELINE */}
          <div>
            <div style={{ marginBottom: 13, padding: '0 2px' }}>
              <span style={{ color: '#1C2D4F', fontSize: 16, fontWeight: 800 }}>سجل النشاط</span>
            </div>

            <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              {updates.map((item, idx) => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 13, padding: '16px 15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18, flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.dotColor, marginTop: 5, flexShrink: 0 }} />
                    {idx < updates.length - 1 && <div style={{ flex: 1, width: 1.5, background: '#ECE8E0', marginTop: 7, minHeight: 44 }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, paddingBottom: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                      <div style={{ color: '#1C2D4F', fontSize: 13.5, fontWeight: 700, lineHeight: 1.4, flex: 1 }}>{item.title}</div>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleUpdate(idx)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleUpdate(idx)}
                        style={{ display: 'inline-flex', cursor: 'pointer', flexShrink: 0, marginTop: 2 }}
                      >
                        {item.visible ? <VisiblePill compact /> : <NotVisiblePill compact />}
                      </div>
                    </div>
                    <div style={{ color: '#5D6579', fontSize: 12.5, lineHeight: 1.6, marginBottom: 6 }}>{item.desc}</div>
                    <div style={{ color: '#B2B8C2', fontSize: 11 }}>{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MESSAGES THREAD */}
        <div>
          <div style={{ marginBottom: 13, padding: '0 2px' }}>
            <span style={{ color: '#1C2D4F', fontSize: 16, fontWeight: 800 }}>رسائل الموكّل</span>
          </div>

          <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 15px 12px', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {messages.map((msg, idx) => {
                const senderLabel = msg.from === 'client' ? client.name : lawyerName;
                return msg.from === 'client' ? (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ maxWidth: '80%' }}>
                      <div style={{ background: '#F3F1ED', borderRadius: '14px 14px 14px 4px', padding: '10px 13px' }}>
                        <div style={{ color: '#1C2D4F', fontSize: 12.5, lineHeight: 1.65 }}>{msg.text}</div>
                      </div>
                      <div style={{ color: '#C4C9D4', fontSize: 10, marginTop: 5, textAlign: 'left' }}>{senderLabel} · {msg.time}</div>
                    </div>
                  </div>
                ) : (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{ maxWidth: '80%' }}>
                      <div style={{ background: '#1C2D4F', borderRadius: '14px 14px 4px 14px', padding: '10px 13px' }}>
                        <div style={{ color: '#fff', fontSize: 12.5, lineHeight: 1.65 }}>{msg.text}</div>
                      </div>
                      <div style={{ color: '#C4C9D4', fontSize: 10, marginTop: 5, textAlign: 'right' }}>{senderLabel} · {msg.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ borderTop: '1px solid #F0ECE5' }} />
            <div style={{ padding: '11px 14px', display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="اكتب ردك على الموكّل..."
                rows={2}
                aria-label="ردك على الموكّل"
                style={{ flex: 1, background: '#F6F4F0', border: 'none', borderRadius: 10, padding: '9px 12px', fontFamily: "'Almarai',sans-serif", fontSize: 13, color: '#1C2D4F', resize: 'none', outline: 'none', lineHeight: 1.55 }}
              />
              <button
                type="button"
                onClick={onSendReply}
                aria-label="إرسال الرد"
                style={{ width: 36, height: 36, borderRadius: 18, background: '#1C2D4F', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, marginBottom: 1 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="#C9A870" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div style={{ height: 48 }} />
      </div>
    </div>
  );
}
