import { useState } from 'react';
import IosFrame from './components/IosFrame';
import ClientPortal from './screens/ClientPortal';
import LawyerDashboard from './screens/LawyerDashboard';
import CasePage from './screens/CasePage';
import AddClient from './screens/AddClient';

function EntrySwitcher({ onSelect }) {
  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#D9D4CB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        padding: '40px 24px',
        boxSizing: 'border-box',
        fontFamily: "'Almarai',sans-serif",
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#C9A870', fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>منصة الممارسة القانونية</div>
        <div style={{ color: '#1C2D4F', fontSize: 32, fontWeight: 800 }}>ميزان</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 360 }}>
        <button
          type="button"
          onClick={() => onSelect('lawyer')}
          style={{
            background: '#1C2D4F',
            color: '#C9A870',
            border: 'none',
            borderRadius: 14,
            padding: '18px 24px',
            fontFamily: "'Almarai',sans-serif",
            fontSize: 16,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(28,45,79,0.26)',
          }}
        >
          واجهة المحامي
        </button>
        <button
          type="button"
          onClick={() => onSelect('client')}
          style={{
            background: '#fff',
            color: '#1C2D4F',
            border: '1.5px solid #E8E4DC',
            borderRadius: 14,
            padding: '18px 24px',
            fontFamily: "'Almarai',sans-serif",
            fontSize: 16,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
          }}
        >
          بوابة العميل
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState(null); // null | 'lawyer' | 'client'
  const [lawyerView, setLawyerView] = useState('dashboard'); // 'dashboard' | 'case' | 'add'

  const goHome = () => {
    setMode(null);
    setLawyerView('dashboard');
  };

  if (mode === null) {
    return <EntrySwitcher onSelect={setMode} />;
  }

  let screen;
  if (mode === 'client') {
    screen = <ClientPortal />;
  } else if (lawyerView === 'case') {
    screen = <CasePage onBack={() => setLawyerView('dashboard')} />;
  } else if (lawyerView === 'add') {
    screen = (
      <AddClient
        onBack={() => setLawyerView('dashboard')}
        onSubmit={() => setLawyerView('dashboard')}
      />
    );
  } else {
    screen = (
      <LawyerDashboard
        onOpenCase={() => setLawyerView('case')}
        onAddClient={() => setLawyerView('add')}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#D9D4CB' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px 16px 0',
          fontFamily: "'Almarai',sans-serif",
        }}
      >
        <button
          type="button"
          onClick={goHome}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(28,45,79,0.55)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.6,
            cursor: 'pointer',
            padding: '6px 10px',
          }}
        >
          ميزان · {mode === 'client' ? 'بوابة العميل' : 'واجهة المحامي'} — رجوع لاختيار الواجهة
        </button>
      </div>
      <IosFrame>{screen}</IosFrame>
    </div>
  );
}
