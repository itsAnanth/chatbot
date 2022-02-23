class Tokenizer {
    trim(array: string[]): string[] {
        while (array[array.length - 1] === '')
            array.pop();

        while (array[0] === '')
            array.shift();

        return array;
    }
}

export default Tokenizer;
