import { useEffect, useMemo, useState } from 'react';
import { ArrowDownLeft, ArrowRight, Bell, Check, ChevronDown, CircleHelp, Flame, Heart, LockKeyhole, MessageCircleHeart, RefreshCw, Send, Sparkles, Users, X } from 'lucide-react';

type Partner = 'you' | 'partner';
type Answers = { you: string; partner: string };
type SavedState = { answers: Answers; roomCode: string; partnerName: string; displayName: string; streak: number; selectedDay: string };
const STORAGE_KEY = 'twofold-demo-v1';
const questionBank = [
  { category: 'GETTING CLOSER', prompt: 'What is a tiny thing I do that makes your day better?', hint: 'Think of a moment that might seem small to me, but means something to you.' },
  { category: 'LITTLE MEMORIES', prompt: 'Which memory of us would you happily relive tomorrow?', hint: 'There are no wrong answers. Tell the story behind your choice.' },
  { category: 'DREAMING TOGETHER', prompt: 'If we had a completely free day together, what would we do?', hint: 'No schedules, no pressure — just your ideal day with us.' },
  { category: 'THE EVERYDAY', prompt: 'What is one new thing you would love for us to try together?', hint: 'It can be an adventure, a ritual, a recipe, or something wonderfully silly.' },
  { category: 'A LITTLE DEEPER', prompt: 'When do you feel most understood by me?', hint: 'Share a moment, a feeling, or something I can do more often.' },
];
const initialState: SavedState = { answers: { you: '', partner: '' }, roomCode: 'SUN-482', partnerName: 'Alex', displayName: 'Jamie', streak: 7, selectedDay: new Date().toISOString().slice(0, 10) };
function readSaved(): SavedState {
  try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) return { ...initialState, ...JSON.parse(raw) as Partial<SavedState> }; } catch { /* Use a clean demo state when storage is unavailable. */ }
  return initialState;
}
function App() {
  const [saved, setSaved] = useState<SavedState>(readSaved);
  const [activePartner, setActivePartner] = useState<Partner>('you');
  const [draft, setDraft] = useState(saved.answers.you);
  const [notice, setNotice] = useState('');
  const [showRoom, setShowRoom] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const question = useMemo(() => questionBank[(new Date().getDate() + new Date().getMonth()) % questionBank.length], []);
  const myAnswer = saved.answers.you.trim();
  const partnerAnswer = saved.answers.partner.trim();
  const bothAnswered = Boolean(myAnswer && partnerAnswer);
  const currentAnswered = Boolean(saved.answers[activePartner].trim());
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch { setNotice('Browser storage is unavailable. Your changes may not persist after refresh.'); } }, [saved]);
  useEffect(() => { setDraft(saved.answers[activePartner]); }, [activePartner, saved.answers]);
  function saveAnswer() {
    if (draft.trim().length < 2) { setNotice('Add a little more before saving your answer.'); return; }
    if (draft.trim().length > 500) { setNotice('Keep your answer under 500 characters.'); return; }
    setSaved(prev => ({ ...prev, answers: { ...prev.answers, [activePartner]: draft.trim() } }));
    setNotice(activePartner === 'you' ? 'Your answer is tucked away. Waiting for your person.' : 'Partner answer saved.');
  }
  function resetDemo() { setSaved({ ...initialState, selectedDay: new Date().toISOString().slice(0, 10) }); setActivePartner('you'); setDraft(''); setShowReset(false); setNotice('Demo reset. Start a fresh round!'); }
  async function copyCode() {
    try { await navigator.clipboard.writeText(saved.roomCode); setCopied(true); setNotice('Room code copied. Share it with your person.'); window.setTimeout(() => setCopied(false), 1800); }
    catch { setNotice(`Your room code is ${saved.roomCode}. Copy it manually to share.`); }
  }
  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#home" aria-label="Twofold home"><span className="brand-mark"><Heart size={19} fill="currentColor" strokeWidth={2.2}/></span><span>twofold<span className="brand-period">.</span></span></a>
      <div className="side-label">YOUR SPACE</div>
      <nav className="nav-list" aria-label="Main navigation">
        <a className="nav-item active" href="#today"><Sparkles size={17}/><span>Today's question</span><span className="nav-dot"/></a>
        <button className="nav-item" onClick={() => setShowHistory(v => !v)}><MessageCircleHeart size={17}/><span>Our memories</span><span className="soon-pill">SOON</span></button>
        <button className="nav-item" onClick={() => setShowRoom(true)}><Users size={17}/><span>Our little space</span></button>
      </nav>
      <div className="sidebar-spacer"/>
      <div className="side-note"><div className="note-icon"><LockKeyhole size={15}/></div><div><strong>A space for two</strong><p>Your answers are personal. This demo stores them in this browser only.</p></div></div>
      <button className="profile-switch" onClick={() => { setActivePartner(activePartner === 'you' ? 'partner' : 'you'); setNotice(`Demo view switched to ${activePartner === 'you' ? saved.partnerName : saved.displayName}.`); }} aria-label="Switch demo partner"><div className={`avatar ${activePartner === 'partner' ? 'avatar-lilac' : ''}`}>{activePartner === 'you' ? 'J' : saved.partnerName.slice(0, 1).toUpperCase()}</div><div className="profile-copy"><strong>{activePartner === 'you' ? saved.displayName : saved.partnerName}</strong><span>{activePartner === 'you' ? 'Your side of the story' : 'Partner demo view'}</span></div><ChevronDown size={16} className="muted-icon"/></button>
    </aside>
    <main className="main-content" id="home">
      <header className="topbar"><div className="breadcrumb">YOUR SPACE <span>/</span> <strong>TODAY</strong></div><div className="top-actions"><span className="date-label">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span><button className="icon-button" aria-label="Notifications" onClick={() => setNotice('You’re all caught up. Nothing waiting right now.')}><Bell size={17}/><i/></button><div className="top-avatar">J</div></div></header>
      <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line"/> A MOMENT, JUST FOR YOU TWO</div><h1>A little closer,<br/><span>every day.</span></h1><p className="welcome-sub">One thoughtful question. Two honest answers. A tiny ritual that makes the distance feel smaller.</p></div><div className="streak-card"><div className="streak-top"><span className="streak-icon"><Flame size={18} fill="currentColor"/></span><span className="streak-caption">YOUR CONNECTION STREAK</span></div><div className="streak-number">{saved.streak}<span> days</span></div><div className="streak-bottom"><div className="streak-bars">{[1,2,3,4,5,6,7].map((n) => <span key={n} className={n <= saved.streak ? 'filled' : ''}/>)}</div><span>Look at you two <Heart size={12} fill="currentColor"/></span></div></div></section>
      <section className="content-grid" id="today">
        <div className="question-column"><div className="section-heading"><div><span className="section-kicker">THE DAILY PAUSE</span><h2>Today's question</h2></div><span className="day-count">01 <span>/ 01</span></span></div>
          <article className="question-card"><div className="card-glow glow-one"/><div className="card-glow glow-two"/><div className="question-card-top"><span className="category-pill"><Sparkles size={12}/>{question.category}</span><span className="private-label"><LockKeyhole size={12}/> JUST BETWEEN YOU</span></div><div className="question-illustration" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><span className="orbit-heart"><Heart size={25} fill="currentColor"/></span><span className="spark spark-a">✦</span><span className="spark spark-b">✧</span><span className="spark spark-c">·</span></div><h3>{question.prompt}</h3><p className="question-hint">{question.hint}</p><div className="answer-tabs"><button className={activePartner === 'you' ? 'answer-tab selected' : 'answer-tab'} onClick={() => setActivePartner('you')}><span className="mini-avatar">J</span><span>Your answer</span>{myAnswer && <Check size={14} className="tab-check"/>}</button><button className={activePartner === 'partner' ? 'answer-tab selected' : 'answer-tab'} onClick={() => setActivePartner('partner')}><span className="mini-avatar partner-mini">{saved.partnerName.slice(0,1).toUpperCase()}</span><span>{saved.partnerName}'s answer</span>{partnerAnswer && <Check size={14} className="tab-check"/>}</button></div>
            <label className="answer-label" htmlFor="answer-input">{activePartner === 'you' ? 'YOUR THOUGHTS' : `${saved.partnerName.toUpperCase()}'S THOUGHTS`} <span>{draft.length}/500</span></label><textarea id="answer-input" value={draft} maxLength={500} onChange={e => setDraft(e.target.value)} placeholder={activePartner === 'you' ? 'Take your time. There is no perfect answer…' : 'Switch to your partner’s demo view and write their answer…'} rows={4} disabled={currentAnswered}/><div className="answer-footer"><span className="gentle-reminder"><Heart size={12}/> Honest beats perfect.</span><button className="primary-button" onClick={saveAnswer} disabled={currentAnswered}>{currentAnswered ? <><Check size={15}/> Answer saved</> : <>Save my answer <ArrowRight size={15}/></>}</button></div>
          </article>
          <div className="reveal-card"><div className={`reveal-icon ${bothAnswered ? 'reveal-ready' : ''}`}>{bothAnswered ? <Heart size={19} fill="currentColor"/> : <LockKeyhole size={18}/>}</div><div className="reveal-copy"><strong>{bothAnswered ? 'Your answers are ready' : 'The reveal moment'}</strong><p>{bothAnswered ? 'You both showed up. Take a moment to read each other’s answer.' : 'Your answers stay tucked away until you have both answered.'}</p></div>{bothAnswered ? <button className="text-button" onClick={() => setShowHistory(true)}>Reveal answers <ArrowRight size={14}/></button> : <span className="waiting-tag">{myAnswer ? '1 OF 2 IN' : 'WAITING FOR YOU'}</span>}</div>
          {showHistory && <div className="answers-reveal"><div className="reveal-heading"><div><span className="section-kicker">THE REVEAL</span><h3>Your answers, together</h3></div><button className="icon-button" onClick={() => setShowHistory(false)} aria-label="Close answers"><X size={17}/></button></div>{bothAnswered ? <div className="revealed-answers"><div className="revealed-answer"><span className="mini-avatar">J</span><strong>{saved.displayName}</strong><p>{myAnswer}</p></div><div className="revealed-answer"><span className="mini-avatar partner-mini">{saved.partnerName.slice(0,1).toUpperCase()}</span><strong>{saved.partnerName}</strong><p>{partnerAnswer}</p></div></div> : <div className="empty-reveal"><LockKeyhole size={21}/><strong>Not quite yet.</strong><p>Both answers need to be saved before the reveal unlocks.</p></div>}</div>}
        </div>
        <aside className="right-column"><div className="together-card"><div className="together-heading"><div><span className="section-kicker">YOUR LITTLE WORLD</span><h3>It's the two of you.</h3></div><span className="online-dot"/></div><div className="couple-avatars"><div className="couple-avatar avatar-j">J<span className="presence"/></div><div className="connection-line"><Heart size={15} fill="currentColor"/></div><div className="couple-avatar avatar-a">{saved.partnerName.slice(0,1).toUpperCase()}<span className="presence"/></div></div><div className="couple-names"><strong>{saved.displayName}</strong><span>&</span><strong>{saved.partnerName}</strong></div><div className="room-code-label">YOUR PRIVATE ROOM CODE</div><button className="room-code" onClick={copyCode} aria-label="Copy room code"><span>{saved.roomCode}</span>{copied ? <Check size={15}/> : <ArrowDownLeft size={15}/>}</button><button className="invite-button" onClick={() => setShowRoom(true)}>Manage your space <ArrowRight size={14}/></button><div className="together-foot"><LockKeyhole size={12}/> Just you two, always.</div></div>
          <div className="ritual-card"><div className="ritual-art"><span className="ritual-star star-1">✦</span><span className="ritual-star star-2">✧</span><div className="ritual-moon"/><div className="ritual-hill hill-back"/><div className="ritual-hill hill-front"/><span className="ritual-heart"><Heart size={18} fill="currentColor"/></span></div><div className="ritual-body"><span className="section-kicker">A GENTLE REMINDER</span><h3>Little things add up.</h3><p>You don't need a grand gesture. Showing up for one small moment can be enough.</p><div className="ritual-footer"><span><Heart size={13} fill="currentColor"/> Made for your kind of love</span><span>02 / 03</span></div></div></div>
          <div className="feedback-card"><div className="feedback-icon"><CircleHelp size={17}/></div><div><strong>Something feel off?</strong><p>Every good thing gets a little better with feedback.</p><button onClick={() => setNotice('Thanks for caring about the details. Feedback form is planned for the next iteration.')}>Share feedback <ArrowRight size={13}/></button></div></div>
        </aside>
      </section>
      <footer className="footer"><span>MADE WITH A LITTLE EXTRA HEART <Heart size={11} fill="currentColor"/></span><button onClick={() => setShowReset(true)}><RefreshCw size={12}/> Reset demo</button><span>TWOFOLD © 2026</span></footer>
    </main>
    {notice && <div className="toast" role="status"><span className="toast-mark"><Check size={15}/></span><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => setNotice('')}><X size={15}/></button></div>}
    {showRoom && <div className="modal-backdrop" onClick={() => setShowRoom(false)}><section className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="room-title"><button className="modal-close icon-button" onClick={() => setShowRoom(false)} aria-label="Close"><X size={17}/></button><div className="modal-symbol"><Users size={22}/></div><span className="section-kicker">YOUR PRIVATE SPACE</span><h2 id="room-title">Your little world</h2><p className="modal-description">This demo room is saved in this browser. Share the code when the connected backend is enabled.</p><label className="modal-label" htmlFor="room-code-input">ROOM CODE</label><div className="modal-code-row"><input id="room-code-input" value={saved.roomCode} onChange={e => setSaved(p => ({ ...p, roomCode: e.target.value.toUpperCase().slice(0,12) }))} maxLength={12}/><button className="primary-button" onClick={copyCode}>{copied ? <Check size={15}/> : <Send size={15}/>} {copied ? 'Copied' : 'Copy'}</button></div><div className="modal-fields"><label><span>YOUR NAME</span><input value={saved.displayName} maxLength={24} onChange={e => setSaved(p => ({ ...p, displayName: e.target.value }))}/></label><label><span>PARTNER NAME</span><input value={saved.partnerName} maxLength={24} onChange={e => setSaved(p => ({ ...p, partnerName: e.target.value }))}/></label></div><div className="demo-warning"><LockKeyhole size={15}/><span>Demo mode: names and answers are stored locally, not shared across devices yet.</span></div><button className="modal-done" onClick={() => setShowRoom(false)}>Save and close</button></section></div>}
    {showReset && <div className="modal-backdrop" onClick={() => setShowReset(false)}><section className="modal reset-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="reset-title"><div className="modal-symbol"><RefreshCw size={21}/></div><h2 id="reset-title">Start fresh?</h2><p className="modal-description">This clears both demo answers and resets the room settings in this browser.</p><div className="reset-actions"><button className="secondary-button" onClick={() => setShowReset(false)}>Keep my answers</button><button className="danger-button" onClick={resetDemo}>Reset demo</button></div></section></div>}
  </div>;
}
export default App;
