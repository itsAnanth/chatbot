import Stemmer from "./Stemmer";
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
        this.stem = LancasterStemmer.stem;
    }

    static applyRules(token: string, intact) {
        console.log(token)
        const section = token[token.length - 1]
        const rules: ruleSet = ruleTable[section];

        // console.log(section)

        if (rules) {
            for (let i = 0; i < rules.length; i++) {
                const pattern = rules[i].pattern;
                if ((intact || !rules[i].intact) &&
                    // only apply intact rules to intact tokens
                    token.substring(token.length - pattern.length, token.length) === rules[i].pattern) {
                    //console.log(token.substr(0 - rules[i].pattern.length))
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

    static stem(token: string) {
        return LancasterStemmer.applyRules(token.toLowerCase(), true);
    }

    static acceptable(token: string) {
        return token.match(/^[aeiou]/) ? token.length > 1 : (token.length > 2 && token.match(/[aeiouy]/));
    }
}

export default LancasterStemmer;