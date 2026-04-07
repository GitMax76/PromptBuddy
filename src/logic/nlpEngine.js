/**
 * Motore di Natural Language Processing (Lite)
 * Usato per filtrare colloquialismi e "ripulire" semanticamente le richieste.
 */

export const NLP = {
    clean: function(text) {
        if (!text) return "";
        let t = text.trim();
        // Rimuove convenevoli iniziali
        t = t.replace(/^(ciao|buongiorno|buonasera|salve|senti|scusa|ascolta)[,\s]*/gi, "");
        t = t.replace(/^(per favore|per piacere|gentilmente|grazie)[,\s]*/gi, "");
        // Rimuove verbi deboli
        t = t.replace(/^(voglio|vorrei|mi serve|ho bisogno)( che )?(mi )?(fai|scrivi|generi|crei|disegni)?\s+(?:una|uno|un'|un|il|la|lo|gli|le|i\b)?\s*/gi, "");
        t = t.replace(/^(puoi|potresti)\s+(fare|scrivere|creare|generare|disegnare)\s+(?:una|uno|un'|un|il|la|lo|gli|le|i\b)?\s*/gi, "");
        t = t.replace(/^(fammi|creami|scrivimi|disegnami|generami)\s+(?:una|uno|un'|un|il|la|lo|gli|le|i\b)?\s*/gi, "");
        return t;
    },
    upgrade: function(text) {
        let t = text;
        const dict = [
            { m: /\bfare\b/gi, r: "implementare/sviluppare" },
            { m: /\bun po' di\b/gi, r: "una selezione di" },
            { m: /\bmettere\b/gi, r: "integrare" },
            { m: /\btogliere\b/gi, r: "rimuovere" },
            { m: /\bapp\b/gi, r: "applicazione" },
            { m: /\bsito\b/gi, r: "piattaforma web" },
            { m: /\bbel(lo|la)?\b/gi, r: "esteticamente curato" },
            { m: /\bveloce\b/gi, r: "altamente performante" },
            { m: /\bche funziona\b/gi, r: "esente da bug" },
            { m: /\bcome si deve\b/gi, r: "secondo le best-practices di settore" }
        ];
        dict.forEach(d => { t = t.replace(d.m, d.r); });
        return t;
    },
    spellcheck: function(text) {
        let t = text;
        const typos = [
            // Slang/abbreviazioni
            { m: /\bnn\b/gi, r: "non" },
            { m: /\bcmq\b/gi, r: "comunque" },
            { m: /\b(xché|xk|xche|xchè)(?=\s|$|[.,!?])/gi, r: "perché" },
            { m: /\b(pf|xfavore|perfavore|x favore)\b/gi, r: "per favore" },
            // Errori comuni verbali e nominali
            { m: /\b(vglio|vogio|volgio)\b/gi, r: "voglio" },
            { m: /\b(svilupare|svilupapre|svillupare)\b/gi, r: "sviluppare" },
            { m: /\b(obbietivo|obbiettivo|obietivo)\b/gi, r: "obiettivo" },
            { m: /\b(stio|suto|soto)\b/gi, r: "sito" },
            { m: /\b(bbllo|belo)\b/gi, r: "bello" },
            { m: /\b(aplicazione|appliazione)\b/gi, r: "applicazione" },
            { m: /\b(funsiona|funzian|funzia)\b/gi, r: "funziona" }
        ];
        typos.forEach(d => { t = t.replace(d.m, d.r); });
        return t;
    },
    capitalize: function(str) {
        if(!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    process: function(text) {
        if(!text) return "";
        // Ordine: Pulizia cortesia -> Spellcheck -> Upgrade professionale -> Maiuscola
        let res = this.clean(text);
        res = this.spellcheck(res);
        res = this.upgrade(res);
        return this.capitalize(res);
    }
};
