import Stemmer from "../nlp/stemmers/Stemmer"
import AgressiveTokenizer from "../nlp/tokenizers/agressive_tokenizer"
import Tokenizer from "../nlp/tokenizers/Tokenizer"

it('stemmer', () => {
   expect(new AgressiveTokenizer().tokenize('hello world')).toStrictEqual(['hello', 'world']);
})