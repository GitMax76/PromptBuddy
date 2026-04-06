import React, { useState } from 'react';
import { getIntelligentSuggestions } from '../logic/engineLogic';
import { useGeminiAPI } from '../hooks/useGeminiAPI';

const Wizard = ({ rawIntent, tool, apiKey, openSettings, onComplete, onBack }) => {
  const ObjectSteps = tool.guideSteps;
  const [steps, setSteps] = useState(ObjectSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Pre-load the first step with what the user wrote in HomeGatherer
  const [formData, setFormData] = useState(() => {
    if (rawIntent && ObjectSteps.length > 0) {
      return { [ObjectSteps[0].id]: rawIntent };
    }
    return {};
  });

  const { enhancePrompt, isLoading, error } = useGeminiAPI();

  const currentStep = tool.guideSteps[currentStepIndex];
  
  const handleNext = () => {
    if (currentStepIndex < tool.guideSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      onBack();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [currentStep.id]: e.target.value
    });
  };

  const applyMagicTip = (tip) => {
    const currentVal = formData[currentStep.id] || "";
    setFormData({
      ...formData,
      [currentStep.id]: currentVal ? currentVal + " " + tip : tip
    });
  };

  const handleEnhance = async () => {
    const currentVal = formData[currentStep.id];
    if (!currentVal || currentVal.trim() === "") return;
    
    if (!apiKey) {
      openSettings();
      return;
    }

    const enhanced = await enhancePrompt(apiKey, currentVal, tool.name, currentStep.label);
    if (enhanced) {
      setFormData({
        ...formData,
        [currentStep.id]: enhanced
      });
    }
  };

  const magicTips = getIntelligentSuggestions(currentStep.id, tool.categories, tool.id, formData);

  return (
    <div className="wizard-container glass-panel">
      <div className="header" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>{tool.name}</h2>
        <p>{tool.systemInfo}</p>
      </div>

      <div className="step-indicator">
        {tool.guideSteps.map((step, idx) => (
          <div 
            key={step.id} 
            className={`step-dot ${idx === currentStepIndex ? 'active' : ''} ${idx < currentStepIndex ? 'completed' : ''}`}
          >
            {idx < currentStepIndex ? '✓' : idx + 1}
          </div>
        ))}
      </div>

      <div className="wizard-step" style={{ minHeight: '300px' }}>
        
        {currentStep.helpText && (
          <div className="didactic-infobox">
            <h4>💡 Consigli d'Oro dal Prompt Engineer</h4>
            <p className="text-small">{currentStep.helpText.split('\n').map((line, idx) => <span key={idx}><br/>{line}</span>)}</p>
          </div>
        )}

        <div className="form-group">
          <label>{currentStep.label}</label>
          <span className="guide">{currentStep.guide}</span>
          <textarea
            rows="5"
            placeholder={currentStep.placeholder}
            value={formData[currentStep.id] || ''}
            onChange={handleChange}
            autoFocus
          ></textarea>
          
          <div className="step-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
            {error && <span className="error-msg text-small" style={{ marginRight: 'auto' }}>Ops! {error}</span>}
            
            <button 
              className="btn-enhance" 
              onClick={handleEnhance} 
              disabled={isLoading || !formData[currentStep.id]}
              title={apiKey ? "Riscrivi con l'intelligenza di Gemini" : "Imposta l'API Key da Settings per attivare la magia"}
            >
              {isLoading ? '⏳ Elaborazione...' : '✨ Auto-Riscrivi (AI)'}
            </button>
            <button className="btn btn-primary" onClick={handleNext} disabled={isLoading}>
              {currentStepIndex === tool.guideSteps.length - 1 ? 'Genera Prompt ✨' : 'Avanti →'}
            </button>
          </div>
        </div>

        <div className="magic-tips-container">
          <div className="magic-tip-label">✨ Magic Tips</div>
          <div className="magic-tips">
            {magicTips.map((tip, idx) => (
              <button 
                key={idx} 
                className="magic-tip-btn"
                onClick={() => applyMagicTip(tip)}
              >
                {tip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wizard-actions" style={{ marginTop: '2rem', justifyContent: 'flex-start' }}>
        <button className="btn btn-secondary" onClick={handlePrev} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
          {currentStepIndex === 0 ? '← Torna al Tool Selector' : '← Torna Indietro'}
        </button>
      </div>
    </div>
  );
};

export default Wizard;
