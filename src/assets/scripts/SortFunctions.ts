import { SortFunctions } from './Types';

const SortFunctions: SortFunctions = {
    'name ascending order': (elemArray: Element[]) => {
        elemArray.sort((a: Element, b: Element): number => {
            if (findNameValue(a) > findNameValue(b)) {
                return 1;
            }
            if (findNameValue(a) < findNameValue(b)) {
                return -1;
            }
            return 0;
        });
    },
    'name descending order': (elemArray: Element[]) => {
        elemArray.sort((a: Element, b: Element): number => {
            if (findNameValue(a) > findNameValue(b)) {
                return -1;
            }
            if (findNameValue(a) < findNameValue(b)) {
                return 1;
            }
            return 0;
        });
    },
    'year ascending order': (elemArray: Element[]) => {
        elemArray.sort((a: Element, b: Element): number => findYearValue(a) - findYearValue(b));
    },
    'year descending order': (elemArray: Element[]) => {
        elemArray.sort((a: Element, b: Element): number => findYearValue(b) - findYearValue(a));
    },
};

function findNameValue(elem: Element): string {
    const element = elem.querySelector('.product__headling');
    if (!element) return '';
    return element.innerHTML;
}

function findYearValue(elem: Element): number {
    const element = elem.querySelector("[data-year='year']");
    if (!element) return 0;
    return +element.innerHTML;
}

export { SortFunctions };
