import React from 'react';
import { recommendToolFromIntent } from '../logic/intentAnalyzer';

const ToolSelector = ({ rawIntent, tools, onSelectTool, onBack }) => {
  // Filter only requested tools for now
  const allowedTools = ['gemini', 'chatgpt', 'claude'];
  const filteredTools = tools.filter(t => allowedTools.includes(t.id));

  // Very basic heuristic to recommend tool
  const recommendedId = recommendToolFromIntent(rawIntent);

  return (
    <div className="tool-selector">
      <div className="header" style={{ position: 'relative' }}>
        <button onClick={onBack} style={{ position: 'absolute', left: 0, top: '5px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}>
          ← Modifica idea
        </button>
        <h1>Ottima idea! 🚀</h1>
        <p>In base a quello che mi hai detto, ecco gli AI che suggerisco. Scegli chi preferisci:</p>
      </div>
      <div className="tool-grid">
        {filteredTools.map((tool) => {
          const isRecommended = tool.id === recommendedId;
          return (
          <div 
            key={tool.id} 
            className="tool-card"
            style={{ borderColor: isRecommended ? 'var(--accent-light)' : '' }}
            onClick={() => onSelectTool(tool)}
          >
            {isRecommended && (
              <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-light)', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold', padding: '0.2rem 0.8rem', borderBottomLeftRadius: '8px' }}>
                🌟 CONSIGLIATO
              </div>
            )}
            <h3 style={{ marginTop: isRecommended ? '1rem' : '0' }}>{tool.name}</h3>
            <p>{tool.description}</p>
            <div className="tags">
              {tool.categories.map(cat => (
                <span key={cat} className="tag">{cat}</span>
              ))}
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default ToolSelector;
