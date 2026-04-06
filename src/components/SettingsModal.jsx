import React, { useState, useEffect } from 'react';

const SettingsModal = ({ isOpen, onClose, apiKey, onSaveKey }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(apiKey || '');
  }, [apiKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(inputValue.trim());
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <h2>Impostazioni API</h2>
        
        <div className="api-guide-box" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid #10b981' }}>
          <p className="guide" style={{ fontWeight: '500', color: '#fff', marginBottom: '0.5rem' }}>
            Attiva il "Traduttore Magico"
          </p>
          <ol style={{ marginLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            <li>Vai su <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>Google AI Studio (Gratis)</a></li>
            <li>Clicca su "Create API Key" ed effettua il login.</li>
            <li>Incolla la stringa qui sotto. La salveremo, in totale privacy, <strong>solo</strong> in questo browser.</li>
          </ol>
        </div>
        
        <div className="form-group">
          <label>Incolla qui la tua Gemini API Key:</label>
          <input 
            type="password" 
            placeholder="AIzaSy..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div className="wizard-actions" style={{marginTop: '1.5rem'}}>
          <button className="btn btn-secondary" onClick={onClose}>Annulla</button>
          <button className="btn btn-primary" onClick={handleSave}>Salva e Chiudi</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
