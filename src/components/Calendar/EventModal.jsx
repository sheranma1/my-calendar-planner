import React, { useState, useEffect } from 'react';
import { X, Trash2, Calendar as CalendarIcon, Tag } from 'lucide-react';
import { format } from 'date-fns';

const EventModal = ({ isOpen, onClose, selectedDate, event, onSave, onDelete }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('Personal');
    const [color, setColor] = useState('#8D6E63');

    useEffect(() => {
        if (event) {
            setTitle(event.title || '');
            setDescription(event.description || '');
            setStartDate(event.startDate || '');
            setEndDate(event.endDate || event.startDate || '');
            setCategory(event.category || 'Personal');
            setColor(event.color || '#8D6E63');
        } else {
            setTitle('');
            setDescription('');
            const dateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
            setStartDate(dateStr);
            setEndDate(dateStr);
            setCategory('Personal');
            setColor('#8D6E63');
        }
    }, [event, selectedDate, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !startDate) return;
        onSave({
            title,
            description,
            startDate,
            endDate: endDate || startDate,
            category,
            color
        });
        onClose();
    };

    const categories = ['工作', '生活', '健康', '社交', '任務'];
    const colors = ['#5D4037', '#8D6E63', '#A1887F', '#A855F7', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-card animate-fade-in" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{event ? '編輯行程' : '新增規劃'}</h3>
                    <button className="btn-close" onClick={onClose}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>標題</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="想做些什麼？"
                            autoFocus
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>開始日期</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>結束日期</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                min={startDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>分類</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategory(cat)}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        background: category === cat ? 'var(--wood-dark)' : 'rgba(0,0,0,0.05)',
                                        color: category === cat ? '#fff' : 'var(--text-muted)',
                                        border: '1px solid var(--border)'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>標籤顏色</label>
                        <div className="color-picker" style={{ marginBottom: '1rem' }}>
                            {colors.map(c => (
                                <div
                                    key={c}
                                    className={`color-option ${color === c ? 'active' : ''}`}
                                    style={{ backgroundColor: c }}
                                    onClick={() => setColor(c)}
                                />
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.03)', padding: '0.75rem', borderRadius: '12px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, textTransform: 'none' }}>自選光譜色</label>
                            <input
                                type="color"
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    padding: '2px',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    background: 'white'
                                }}
                            />
                            <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{color.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="modal-footer">
                        {event && (
                            <button type="button" className="btn-delete" onClick={() => { onDelete(event.startDate, event.id); onClose(); }}>
                                <Trash2 size={18} />
                            </button>
                        )}
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
                            <button type="button" className="btn-secondary" onClick={onClose}>取消</button>
                            <button type="submit" className="btn-primary">儲存規劃</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
