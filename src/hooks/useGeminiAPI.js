import { useState } from 'react';

export const useGeminiAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enhancePrompt = async (apiKey, userText, modelTargetName, stepName) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      
      const systemPrompt = `Sei un Prompt Engineer esperto. 
L'utente sta usando un'app chiamata Prompt Buddy per generare il prompt finale ottimizzato per il modello "${modelTargetName}". 
Attualmente si trova nello step "${stepName}" del suo wizard di creazione. 
Il suo testo originale è approssimativo. Il tuo compito è prendere il suo intento grezzo e riscriverlo trasformandolo in direttive professionali, robuste e dettagliate, ottimizzate per farsi capire al meglio da un LLM. Non aggiungere chiacchiere conversazionali, non includere i tag XML o la formattazione finale globale perché quella la gestisce la UI. Restituisci semplicemente LA PARTE TESTUALE ESPANSA E PERFETTA. Limitati a riscrivere ed espandere l'input utente.`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemPrompt + `\n\nTesto utente da riscrivere e potenziare:\n"""\n${userText}\n"""`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Errore API: ${response.status}`);
      }

      const data = await response.json();
      const enhancedText = data.candidates[0].content.parts[0].text;
      
      setIsLoading(false);
      return enhancedText.trim();
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      return null;
    }
  };

  return { enhancePrompt, isLoading, error };
};
