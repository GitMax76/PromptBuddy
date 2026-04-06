import React, { useState } from 'react';
import HomeGatherer from './components/HomeGatherer';
import ToolSelector from './components/ToolSelector';
import Wizard from './components/Wizard';
import PromptOutput from './components/PromptOutput';
import SettingsModal from './components/SettingsModal';
import { toolsDatabase } from './data/toolsDatabase';
import './settings.css';
import './settings-extended.css';

function App() {
  const [view, setView] = useState('gatherer'); // 'gatherer', 'selector', 'wizard', 'output'
  const [rawIntent, setRawIntent] = useState("");
  const [selectedTool, setSelectedTool] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  
  // Settings / API Key mgmt
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('geminiApiKey') || '');

  const handleSaveKey = (key) => {
    setApiKey(key);
    localStorage.setItem('geminiApiKey', key);
  };


  const handleIntentSubmit = (intent) => {
    setRawIntent(intent);
    setView('selector');
  };

  const handleSelectTool = (tool) => {
    setSelectedTool(tool);
    setView('wizard');
  };

  const handleWizardComplete = (formData) => {
    const finalPrompt = selectedTool.generatePrompt(formData);
    setGeneratedPrompt(finalPrompt);
    setView('output');
  };

  const handleBackToSelector = () => {
    setSelectedTool(null);
    setView('selector');
  };

  const handleReset = () => {
    setRawIntent("");
    setSelectedTool(null);
    setGeneratedPrompt("");
    setView('gatherer');
  };

  return (
    <div className="app-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button 
          className="btn btn-secondary settings-btn" 
          onClick={() => setIsSettingsOpen(true)}
          title="Impostazioni API"
        >
          ⚙️ Settings
        </button>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        apiKey={apiKey}
        onSaveKey={handleSaveKey} 
      />

      {view === 'gatherer' && (
        <HomeGatherer onNext={handleIntentSubmit} />
      )}

      {view === 'selector' && (
        <ToolSelector 
          rawIntent={rawIntent}
          tools={toolsDatabase} 
          onSelectTool={handleSelectTool} 
          onBack={() => setView('gatherer')}
        />
      )}
      
      {view === 'wizard' && selectedTool && (
        <Wizard 
          rawIntent={rawIntent}
          tool={selectedTool} 
          apiKey={apiKey}
          openSettings={() => setIsSettingsOpen(true)}
          onComplete={handleWizardComplete} 
          onBack={handleBackToSelector} 
        />
      )}

      {view === 'output' && (
        <PromptOutput 
          promptText={generatedPrompt} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}

export default App;
