import React, { useState, useEffect } from 'react';

const PromptOutput = ({ promptText, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Simulate AI engineering process for a cool UX effect
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="wizard-container glass-panel">
      <div className="header" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>Generazione Completata!</h2>
        <p>Ecco il tuo prompt perfettamente strutturato. Copialo e incollalo nel tuo AI preferito.</p>
      </div>

      <div className="output-container">
        <div className={`prompt-result ${isProcessing ? 'processing' : ''}`}>
          <div className="engineered-badge">
            <span style={{ fontSize: '12px' }}>✨</span> Prompt Engineerizzato
          </div>
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? '✓ Copiato!' : '📋 Copia'}
          </button>
          
          <div style={{ marginTop: '2.5rem' }}>
            {isProcessing ? 'Lavaggio descrittori in corso... Ottimizzazione istruzioni...' : promptText}
          </div>
        </div>
      </div>

      <div className="wizard-actions" style={{ marginTop: '2rem', justifyContent: 'center' }}>
        <button className="btn btn-primary" onClick={onReset}>
          ← Crea un nuovo Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptOutput;
