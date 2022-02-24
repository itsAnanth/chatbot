import { words as stopwords } from '../../utils/stopwords';
import Tokenizer from '../tokenizers/agressive_tokenizer';

class Stemmer {

    stem(token: string) {
        return token;
    }

    addStopWord(word: string) {
        stopwords.push(word);
    }

    addStopWords(words: string[]) {
        stopwords.push(...words);
    }

    removeStopWord(word: string) {
        this.removeStopWords([word]);
    }

    removeStopWords(words: string[]) {
        let len = words.length;
        for (let i = 0; i < len; i++) {
            stopwords.splice(stopwords.indexOf(words[i]), -1);
        }
    }

    tokenizeAndStem(text: string, keepStops: boolean) {
        const stemmedTokens = [];
        const lowerCase = text.toLowerCase();
        const tokens = new Tokenizer().tokenize(lowerCase);
        const len = tokens.length;


        for (let i = 0; i < len; i++) {
            if (keepStops && stopwords.indexOf(tokens[i]) !== -1)
                continue;
            stemmedTokens.push(this.stem(tokens[i]));
        }


        return stemmedTokens;
    }
}

export default Stemmer;
