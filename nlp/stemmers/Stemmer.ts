import stopwords from '../../utils/stopwords';
import Tokenizer from '../tokenizers/agressive_tokenizer';

class Stemmer {

    stem(token) {
        return token;
    }

    tokenizeAndStem(text: string, keepStops: boolean) {
        const stemmedTokens = [];
        const lowerCase = text.toLowerCase();
        const tokens = new Tokenizer().tokenize(lowerCase);
        const len = tokens.length;

        if (keepStops) {
            for (let i = 0; i < len; i++)
                stemmedTokens.push(this.stem(tokens[i]));
        } else {
            for (let i = 0; i < len; i++) {
                if (stopwords.indexOf(tokens[i]) === -1)
                    stemmedTokens.push(this.stem(tokens[i]));
            }
        }
    }
}

export default Stemmer;
