import React from 'react';
import { useEvents } from '../context/EventContext';
import { format, isAfter, startOfToday } from 'date-fns';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const { events } = useEvents();

    // Flatten events and filter upcoming
    const upcomingEvents = Object.entries(events).flatMap(([date, dayEvents]) =>
        dayEvents.map(e => ({ ...e, date }))
    ).filter(e => !isAfter(startOfToday(), new Date(e.date)))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);

    return (
        <div className="page-container animate-fade-in" style={{ width: '100%', maxWidth: '800px' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    color: 'var(--wood-dark)',
                    marginBottom: '0.5rem',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    letterSpacing: '-1px'
                }}>Calendar Planner</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Your aesthetic daily companion for thoughtful planning.</p>
            </header>

            <div className="dashboard-grid" style={{ display: 'grid', gap: '2rem' }}>
                <section className="glass-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={20} color="var(--wood-medium)" />
                            即將到來的行程
                        </h2>
                        <Link to="/calendar" style={{ color: 'var(--wood-medium)', fontSize: '0.9rem', textDecoration: 'none' }}>
                            查看完整日曆 <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                            <div key={event.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.4)',
                                borderRadius: '12px',
                                borderLeft: `4px solid ${event.color || 'var(--wood-medium)'}`
                            }}>
                                <div style={{ minWidth: '60px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{format(new Date(event.date), 'MMM')}</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--wood-dark)' }}>{format(new Date(event.date), 'd')}</div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600 }}>{event.title}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{event.category || '一般'}</div>
                                </div>
                            </div>
                        )) : (
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>目前沒有即將到來的行程。</p>
                        )}
                    </div>
                </section>

                <section className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>今日格言</h2>
                    <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>"每一片木頭都有它的紋理，每一天都有它的節奏。"</p>
                </section>
            </div>
        </div>
    );
};

export default Home;
