import { useMemo, useState } from 'react';
import LawyerLayout from './components/LawyerLayout';
import ClientPortal from './screens/ClientPortal';
import LawyerDashboard from './screens/LawyerDashboard';
import ClientsView from './screens/ClientsView';
import CasePage from './screens/CasePage';
import AddClient from './screens/AddClient';
import { clients as clientsData, getClientById, upcomingHearings as upcomingHearingsDefault } from './data/clients';

const LAWYER_NAME = 'أ. نادين سامي';

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

function getScopedClientIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('client');
}

export default function App() {
  const scopedClientId = useMemo(() => getScopedClientIdFromUrl(), []);
  const [mode, setMode] = useState(scopedClientId ? 'client' : null);
  const [lawyerView, setLawyerView] = useState('dashboard');
  const [selectedClientId, setSelectedClientId] = useState(scopedClientId || 'ahmed');

  // Sessions added during this session, keyed by clientId
  const [sessionsMap, setSessionsMap] = useState({});
  // nextHearing overrides updated when a session with a nextHearing is saved
  const [hearingOverrides, setHearingOverrides] = useState({});

  const getMergedClient = (id) => {
    const base = getClientById(id);
    if (!base) return base;
    const override = hearingOverrides[id];
    return override ? { ...base, nextHearing: override } : base;
  };

  const getMergedSessions = (id) => {
    const dynamic = sessionsMap[id] || [];
    const base = getClientById(id)?.sessions || [];
    return [...dynamic, ...base];
  };

  const handleAddSession = (clientId, session) => {
    setSessionsMap((prev) => ({
      ...prev,
      [clientId]: [session, ...(prev[clientId] || [])],
    }));
    if (session.nextHearing) {
      setHearingOverrides((prev) => ({ ...prev, [clientId]: session.nextHearing }));
    }
  };

  const mergedUpcomingHearings = upcomingHearingsDefault.map((h) => getMergedClient(h.id));
  const mergedAllClients = clientsData.map((c) => getMergedClient(c.id));

  const goHome = () => {
    if (scopedClientId) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setMode(null);
    setLawyerView('dashboard');
  };

  if (mode === null) {
    return <EntrySwitcher onSelect={setMode} />;
  }

  if (mode === 'client') {
    return (
      <div style={{ minHeight: '100vh', background: '#D9D4CB' }}>
        {!scopedClientId && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 16px 0', fontFamily: "'Almarai',sans-serif" }}>
            <button
              type="button"
              onClick={goHome}
              style={{ background: 'none', border: 'none', color: 'rgba(28,45,79,0.55)', fontSize: 11, fontWeight: 700, letterSpacing: 0.6, cursor: 'pointer', padding: '6px 10px' }}
            >
              ميزان · بوابة العميل — رجوع لاختيار الواجهة
            </button>
          </div>
        )}
        <ClientPortal client={getMergedClient(selectedClientId)} lawyerName={LAWYER_NAME} />
      </div>
    );
  }

  const openCase = (id) => {
    setSelectedClientId(id);
    setLawyerView('case');
  };

  let content;
  if (lawyerView === 'clients') {
    content = <ClientsView onOpenCase={openCase} allClients={mergedAllClients} />;
  } else if (lawyerView === 'case') {
    content = (
      <CasePage
        key={selectedClientId}
        client={getMergedClient(selectedClientId)}
        lawyerName={LAWYER_NAME}
        onBack={() => setLawyerView('clients')}
        sessions={getMergedSessions(selectedClientId)}
        onAddSession={(session) => handleAddSession(selectedClientId, session)}
      />
    );
  } else if (lawyerView === 'add') {
    content = (
      <AddClient
        onBack={() => setLawyerView('dashboard')}
        onSubmit={() => setLawyerView('dashboard')}
      />
    );
  } else {
    content = (
      <LawyerDashboard
        lawyerName={LAWYER_NAME}
        onOpenCase={openCase}
        onOpenClients={() => setLawyerView('clients')}
        upcomingHearings={mergedUpcomingHearings}
      />
    );
  }

  return (
    <LawyerLayout
      activeView={lawyerView === 'case' || lawyerView === 'add' ? 'clients' : lawyerView}
      onNavigate={setLawyerView}
      onAddClient={() => setLawyerView('add')}
      onHome={goHome}
      lawyerName={LAWYER_NAME}
    >
      {content}
    </LawyerLayout>
  );
}
