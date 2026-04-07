import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomeGatherer from './HomeGatherer';

describe('HomeGatherer Component', () => {
  
  it('deve renderizzare il titolo di benvenuto', () => {
    render(<HomeGatherer onNext={() => {}} />);
    const heading = screen.getByText(/Ciao, sono/i);
    expect(heading).toBeInTheDocument();
  });

  it('il bottone "Avanti" deve essere disabilitato all\'avvio', () => {
    render(<HomeGatherer onNext={() => {}} />);
    const button = screen.getByRole('button', { name: /Vai Avanti/i });
    expect(button).toBeDisabled();
  });

  it('il bottone "Avanti" si abilita quando si scrive qualcosa', () => {
    render(<HomeGatherer onNext={() => {}} />);
    const textarea = screen.getByPlaceholderText(/La tua idea in libertà.../i);
    const button = screen.getByRole('button', { name: /Vai Avanti/i });

    // Scrive nel campo di testo
    fireEvent.change(textarea, { target: { value: 'Voglio creare un sito web' } });
    
    // Il bottone dovrebbe sbloccarsi
    expect(button).not.toBeDisabled();
  });

  it('deve invocare onNext con il testo corretto quando cliccato', () => {
    const handleNext = vi.fn();
    render(<HomeGatherer onNext={handleNext} />);
    
    const textarea = screen.getByPlaceholderText(/La tua idea in libertà.../i);
    const button = screen.getByRole('button', { name: /Vai Avanti/i });

    fireEvent.change(textarea, { target: { value: 'Test intento' } });
    fireEvent.click(button);

    // Deve essere stata chiamata 1 volta, col valore 'Test intento'
    expect(handleNext).toHaveBeenCalledTimes(1);
    expect(handleNext).toHaveBeenCalledWith('Test intento');
  });

});
