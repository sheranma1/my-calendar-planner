import React, { useState, useEffect } from 'react';
import { Plus, Trash2, StickyNote } from 'lucide-react';

const Memos = () => {
    const [memos, setMemos] = useState(() => {
        const saved = localStorage.getItem('calendar-planner-memos');
        return saved ? JSON.parse(saved) : [];
    });
    const [newMemo, setNewMemo] = useState('');

    useEffect(() => {
        localStorage.setItem('calendar-planner-memos', JSON.stringify(memos));
    }, [memos]);

    const addMemo = (e) => {
        e.preventDefault();
        if (!newMemo.trim()) return;
        setMemos([{ id: Date.now(), text: newMemo, date: new Date().toISOString() }, ...memos]);
        setNewMemo('');
    };

    const deleteMemo = (id) => {
        setMemos(memos.filter(m => m.id !== id));
    };

    return (
        <div className="page-container animate-fade-in" style={{ width: '100%', maxWidth: '800px' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--wood-dark)', marginBottom: '0.5rem' }}>備忘錄</h1>
                <p style={{ color: 'var(--text-muted)' }}>隨時記錄靈感與想法。</p>
            </header>

            <form onSubmit={addMemo} style={{ marginBottom: '2.5rem', display: 'flex', gap: '1rem' }}>
                <input
                    type="text"
                    value={newMemo}
                    onChange={e => setNewMemo(e.target.value)}
                    placeholder="輸入新的備忘事項..."
                    style={{
                        flex: 1,
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)',
                        background: 'rgba(255,255,255,0.6)',
                        outline: 'none',
                        fontSize: '1rem'
                    }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0 1.5rem' }}>
                    <Plus size={20} />
                </button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {memos.map(memo => (
                    <div key={memo.id} className="glass-card" style={{ padding: '1.5rem', position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--wood-medium)' }}>
                            <StickyNote size={16} />
                            <span style={{ fontSize: '0.75rem' }}>{new Date(memo.date).toLocaleDateString()}</span>
                        </div>
                        <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>{memo.text}</p>
                        <button
                            onClick={() => deleteMemo(memo.id)}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)', opacity: 0.5 }}
                            onMouseOver={e => e.currentTarget.style.opacity = 0.8}
                            onMouseOut={e => e.currentTarget.style.opacity = 0.5}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Memos;
