import Tokenizer from "./Tokenizer";

class AgressiveTokenizer extends Tokenizer {
    tokenize(string: string) {
        return this.trim(string.split(/[\W|_]+/));
    }
}

export default AgressiveTokenizer;
