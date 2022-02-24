// forked and modified from https://github.com/NaturalNode/natural/blob/master/lib/natural/stemmers/lancaster_stemmer.js

import Stemmer from "./stemmer";
import ruleTable from './lancaster_rules';

type rule = {
    continuation: boolean;
    intact: boolean;
    pattern: string;
    size: string;
    appendage?: string
}

type ruleSet = rule[];

class LancasterStemmer extends Stemmer {
    constructor() {
        super();
        /**
         * overwrite existing base stem method with lancaster rules.
         * used in Stemmer.tokenizeAndStem
         */
        this.stem = LancasterStemmer.stem;
    }

    /**
     * Traverse a token (word) from right to left fashion trying to stem it (Reduce it to the base form)
     */
    static applyRules(token: string, intact: boolean): string {
        const section = token[token.length - 1]; // last character of the token
        const rules: ruleSet = ruleTable[section];


        if (rules) {
            for (let i = 0; i < rules.length; i++) {
                const pattern = rules[i].pattern;
                if ((intact || !rules[i].intact) &&
                    // only apply intact rules to intact tokens
                    token.substring(token.length - pattern.length, token.length) === rules[i].pattern) {
                    // hack off only as much as the rule indicates
                    let result = token.substring(0, token.length - parseInt(rules[i].size))

                    // if the rules wants us to apply an appendage do so
                    if (rules[i].appendage)
                        result += rules[i].appendage;


                    if (LancasterStemmer.acceptable(result)) {
                        token = result

                        // see what the rules wants to do next
                        if (rules[i].continuation) {
                            // this rule thinks there still might be stem left. keep at it.
                            // since we've applied a change we'll pass false in for intact
                            return LancasterStemmer.applyRules(result, false)
                        } else {
                            // the rule thinks we're done stemming. drop out.
                            return result
                        }
                    }
                }
            }
        }

        return token;
    }

    /**
     * Override base class stem method
     */
    static stem(token: string) {
        return LancasterStemmer.applyRules(token.toLowerCase(), true);
    }

    static acceptable(token: string) {
        return token.match(/^[aeiou]/) ? token.length > 1 : (token.length > 2 && token.match(/[aeiouy]/));
    }
}

export default LancasterStemmer;