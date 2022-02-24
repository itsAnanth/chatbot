import LancasterStemmer from "../nlp/stemmers/lancaster"
import natural from 'natural';
import Stemmer from "../nlp/stemmers/Stemmer"
import AgressiveTokenizer from "../nlp/tokenizers/agressive_tokenizer"
import Tokenizer from "../nlp/tokenizers/Tokenizer"

it('tokenizer', () => {
   expect(new AgressiveTokenizer().tokenize('hello world')).toStrictEqual(['hello', 'world']);
})

it('lancaster stemmer', () => {
    const string = 'consideration';
    const words = new LancasterStemmer().tokenizeAndStem(string, true);
    expect(words).toStrictEqual(['consid']);
});

