import { describe, it, expect } from 'vitest';
import { getIntelligentSuggestions } from './engineLogic';

describe('engineLogic - getIntelligentSuggestions', () => {
    
    it('deve suggerire prompt corretti per gemini - role', () => {
        const suggestions = getIntelligentSuggestions('role', ['testo'], 'gemini', {});
        expect(suggestions).toContain("Sei un analista dati esperto. Usa un tono accademico.");
        expect(suggestions.length).toBeGreaterThan(0);
    });

    it('deve suggerire prompt corretti per chatgpt - topic', () => {
        const suggestions = getIntelligentSuggestions('topic', ['codice'], 'chatgpt', {});
        expect(suggestions).toContain("Questa funzione Python legacy");
    });

    it('deve restituire consigli corretti per claude - rules', () => {
        const suggestions = getIntelligentSuggestions('rules', ['codice'], 'claude', {});
        expect(suggestions).toContain("Rispondi rigorosamente e unicamente in formato JSON valido.");
    });

    it('deve restituire i fallback se il tool non esiste', () => {
        const suggestions = getIntelligentSuggestions('stepFinto', ['codice'], 'toolInesistente', {});
        expect(suggestions).toContain("Cerca di essere più specifico...");
    });

});
