import React, { useState } from 'react';

const HomeGatherer = ({ onNext }) => {
  const [intent, setIntent] = useState('');

  const handleNext = () => {
    if (intent.trim()) {
      onNext(intent);
    }
  };

  return (
    <div className="wizard-container glass-panel" style={{ maxWidth: '700px', padding: '2.5rem 2rem' }}>
      <div className="header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.8rem', lineHeight: '1.2' }}>Ciao, sono<br/><span style={{ color: 'var(--accent-light)' }}>Prompt Buddy! 🪄</span></h1>
        <p style={{ fontSize: '1.15rem', marginTop: '1rem', color: '#e2e8f0' }}>
          Ti aiuterò a trarre il massimo dall'Intelligenza Artificiale scrivendo i prompt tecnici al posto tuo.
        </p>
      </div>

      <div className="form-group" style={{ marginBottom: '2rem' }}>
        <label style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.8rem', display: 'block' }}>
          Raccontami cosa vuoi fare:
        </label>
        <span className="guide" style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-muted)' }}>
          (Usa parole tue, non preoccuparti della forma. Ad esempio: "Voglio che mi aiuti a tradurre un testo dal francese e a riassumerlo in punti", oppure "Voglio programmare un sito di ricette in React".)
        </span>
        
        <textarea
          rows="6"
          placeholder="La tua idea in libertà..."
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          autoFocus
          style={{ fontSize: '1.1rem', padding: '1.2rem', background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(139, 92, 246, 0.4)' }}
        ></textarea>
      </div>

      <div className="wizard-actions" style={{ justifyContent: 'center' }}>
        <button 
          className="btn btn-primary" 
          onClick={handleNext} 
          disabled={!intent.trim()}
          style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '999px' }}
        >
          Vai Avanti →
        </button>
      </div>
    </div>
  );
};

export default HomeGatherer;
