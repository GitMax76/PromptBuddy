import React, { useState } from 'react';

const PromptOutput = ({ promptText, onReset }) => {
  const [copied, setCopied] = useState(false);

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
        <div className="prompt-result">
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? '✓ Copiato!' : '📋 Copia'}
          </button>
          {promptText}
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
