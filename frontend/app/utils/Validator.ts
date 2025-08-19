namespace Validator {
    export function isValidText(text: string): boolean {
        const isValid = text ? text.length > 0 : false;

        return isValid;
    }

    export function isValidNumber(num: any): boolean {
        if (typeof num === "string" && num.length < 1) return false;

        try {
            Number.parseInt(num);
            return true;
        } catch (err) {
            return false;
        }
    }

    export function isValidEmail(text: string): boolean {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return regex.test(text);
    }

    export function isValidLKPhoneNumber(text: string): boolean {
        const regex = /^0\d{9}$/;

        return regex.test(text);
    }

    export function stringToInt(text: string): number {
        if (!isValidNumber(text)) return 0;

        return Number.parseInt(text);
    }

    export function stringToFloat(text: string): number {
        if (!isValidNumber(text)) return 0;

        return Number.parseFloat(text);
    }

    export function areObjectsValid(...objects: any[]): boolean {
        let valid = true;

        objects.forEach(obj => {
            if (obj === undefined || obj === null)
                valid = false;
        });

        return valid;
    }

    export function areTextValuesValid(...textValues: any[]): boolean {
        let valid = true;

        textValues.forEach(text => {
            if (text === undefined || text === null || text.length < 1)
                valid = false;
        });

        return valid;
    }

    export enum ValueType {
        text,
        number,
        telephone,
        email,
        except,
    };

    export function areValid(...typesAfterValues: any[]): boolean {
        let valid = true;

        let tmpVal: any;

        for (let i = 0; i < typesAfterValues.length; i++) {
            if (i % 2 === 0) {
                tmpVal = typesAfterValues[i];
                continue;
            }

            const type = typesAfterValues[i];

            const isInvalid =
                (type !== ValueType.except) && (
                    (type === ValueType.text && !isValidText(tmpVal)) ||
                    (type === ValueType.number && !isValidNumber(tmpVal)) ||
                    (type === ValueType.telephone && !isValidLKPhoneNumber(tmpVal)) ||
                    (type === ValueType.email && !isValidEmail(tmpVal))
                );

            if (isInvalid) {
                console.log(tmpVal);
                valid = false;
                break;
            }
        }

        return valid;
    }
};

export default Validator;