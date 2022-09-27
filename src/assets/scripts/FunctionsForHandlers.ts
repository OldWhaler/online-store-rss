import { SortFunctions } from './SortFunctions';
import { Product, LocalStorageFiltersInfo, LocalStoragePurchasesInfo } from './Types';
import { ProductArr } from '../scripts/ProductArr';
import { ProductСard } from '../scripts/ProductСard';
import { Definitions } from '../scripts/Definitions';

function changeProductListElementsOrder(event: Event) {
    const select = event.target as HTMLSelectElement;
    addSortedProductListOnPage(Definitions.productList, select.value);
}

function changeValuesInBasketAndProductCard(target: HTMLElement) {
    const button = target.closest('#product-button') as HTMLButtonElement;
    const buttonContainer = target.closest('.product__buttons') as HTMLDivElement;
    const counterInCard = buttonContainer.querySelector('.product__in-basket') as HTMLDivElement;

    switch (button.dataset.action) {
        case 'add':
            if (+Definitions.counterInBasket.innerHTML === 20) {
                alert('Извините, все слоты заполнены');
                return;
            }
            counterInCard.innerHTML = `${+counterInCard.innerHTML + 1}`;
            Definitions.counterInBasket.innerHTML = `${+Definitions.counterInBasket.innerHTML + 1}`;
            break;
        case 'remove':
            if (+counterInCard.innerHTML !== 0) {
                counterInCard.innerHTML = `${+counterInCard.innerHTML - 1}`;
                Definitions.counterInBasket.innerHTML = `${+Definitions.counterInBasket.innerHTML - 1}`;
            }
            break;
        default:
            break;
    }

    if (+counterInCard.innerHTML > 0) {
        counterInCard.classList.add('product__in-basket_colored');
    } else {
        counterInCard.classList.remove('product__in-basket_colored');
    }

    addPurchasesInfoIntoLocalStorage(target);
}

function addPurchasesInfoIntoLocalStorage(target: HTMLElement) {
    const buttonContainer = target.closest('.product__buttons') as HTMLDivElement;
    const counterInCard = buttonContainer.querySelector('.product__in-basket') as HTMLDivElement;
    const counterInCardTextContent = counterInCard.textContent as string;
    const productCard = target.closest('.product') as HTMLDivElement;
    const productCardDataSetInfo = productCard.dataset.productId as string;

    const LocalStoragePurchasesInfo = localStorage.getItem('LocalStoragePurchasesInfo') as string;
    const info: LocalStoragePurchasesInfo = JSON.parse(LocalStoragePurchasesInfo);

    if (+counterInCardTextContent === 0) {
        delete info[productCardDataSetInfo];
    } else {
        info[productCardDataSetInfo] = +counterInCardTextContent;
    }
    info.basket = parseInt(Definitions.counterInBasket.textContent as string);

    localStorage.setItem('LocalStoragePurchasesInfo', JSON.stringify(info));
}

function changeCheckboxVisualisation(label: HTMLParagraphElement) {
    label.classList.toggle('checked');
}

function changeRangeColorAndValue(event: Event) {
    const target = event.target as HTMLInputElement;
    const rangeFilterContainer = target.closest('.filter__wrapper') as HTMLDivElement;

    const sliderOne = rangeFilterContainer.querySelector("[data-slider-number='1']") as HTMLInputElement;
    const sliderTwo = rangeFilterContainer.querySelector("[data-slider-number='2']") as HTMLInputElement;

    const displayValOne = rangeFilterContainer.querySelector("[data-range-value='1']") as HTMLSpanElement;
    const displayValTwo = rangeFilterContainer.querySelector("[data-range-value='2']") as HTMLSpanElement;

    const minGap = +sliderOne.step;
    const sliderTrack = rangeFilterContainer.querySelector('.filter__input-track') as HTMLDivElement;

    switch (target.dataset.sliderNumber as string) {
        case '1':
            if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
                sliderOne.value = `${parseInt(sliderTwo.value) - minGap}`;
            }
            displayValOne.textContent = sliderOne.value;
            break;
        case '2':
            if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
                sliderTwo.value = `${parseInt(sliderOne.value) + minGap}`;
            }
            displayValTwo.textContent = sliderTwo.value;
            break;

        default:
            break;
    }
    fillRangeColor(sliderTrack, sliderOne, sliderTwo);
}

function fillRangeColor(sliderTrack: HTMLDivElement, sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement): void {
    const oneHundredPercent = +sliderOne.max - +sliderOne.min;
    const percent1 = ((+sliderOne.value - +sliderOne.min) / oneHundredPercent) * 100;
    const percent2 = ((+sliderTwo.value - +sliderOne.min) / oneHundredPercent) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #141414 ${percent1}% , #141414 ${percent2}%, #dadae5 ${percent2}%)`;
}

function clearSearchInput() {
    Definitions.searchInput.value = '';
    Definitions.searchInput.focus();
}

function collapseFilterVisualisation(target: HTMLHeadingElement) {
    const filterCollapseElement = target.nextElementSibling as HTMLDivElement;
    filterCollapseElement.classList.toggle('collapse_hidden');
}

function rotateTitleButton(target: HTMLHeadingElement) {
    const filterTitleButton = target.querySelector('.filter__title-button') as HTMLButtonElement;
    filterTitleButton.classList.toggle('title-button_rotate');
}

function filterСardsOnPage() {
    const newProductList = filterByType('country').filter(
        (elem) =>
            filterByType('producer').includes(elem) &&
            filterByType('bladeMaterial').includes(elem) &&
            filterByRangeValue('year').includes(elem) &&
            filterByRangeValue('price').includes(elem) &&
            filterByRangeValue('stock').includes(elem) &&
            filterByPopularity().includes(elem)
    );

    if (newProductList.length === 0) {
        addIntoProductListNoMatchesParagraph();
        return;
    }

    Definitions.productList.innerHTML = ProductСard.createProductListHTML(newProductList);

    addSortedProductListOnPage(Definitions.productList, Definitions.select.value);
    addPurchasesInfoFromLocalStorage();
    filterBySearchInputValue();
}

function filterBySearchInputValue() {
    const searchInputValue = Definitions.searchInput.value;
    if (searchInputValue.length === 0) return;
    const regexp = new RegExp(searchInputValue, 'i');

    const productCardsOnPage = Definitions.productList.children;

    for (let i = 0; i < productCardsOnPage.length; i++) {
        const headling = productCardsOnPage[i].querySelector('.product__headling') as HTMLHeadingElement;
        const headlingTextContent = headling.textContent as string;
        if (!headlingTextContent.match(regexp)) {
            productCardsOnPage[i].remove();
            i--;
        }
    }

    if (productCardsOnPage.length === 0) addIntoProductListNoMatchesParagraph();
}

function addIntoProductListNoMatchesParagraph() {
    Definitions.productList.innerHTML = `<p class="product-list__no-matches-text">Извините, совпадений не обнаружено.</p>`;
}

function addPurchasesInfoFromLocalStorage() {
    const LocalStoragePurchasesInfo = localStorage.getItem('LocalStoragePurchasesInfo') as string;
    const info: LocalStoragePurchasesInfo = JSON.parse(LocalStoragePurchasesInfo);

    for (const key of Object.keys(info)) {
        if (key === 'basket') continue;

        const product = Definitions.productList.querySelector(`[data-product-id="${key}"]`) as HTMLDivElement;
        const counterInBasket = product.querySelector('.product__in-basket') as HTMLSpanElement;

        counterInBasket.textContent = info[key].toString();
        counterInBasket.classList.add('product__in-basket_colored');
    }
    Definitions.counterInBasket.textContent = info.basket.toString();
}

function filterByType(type: string): Product[] {
    const filterDivContainer = document.querySelector(`[data-filter-type="${type}"]`) as HTMLDivElement;
    const activeFiltersList = filterDivContainer.querySelectorAll('.checked') as NodeListOf<HTMLParagraphElement>;
    if (activeFiltersList.length === 0) return ProductArr;

    const activeListTextContent: string[] = Array.from(activeFiltersList).map((elem) => elem.dataset.text as string);

    return ProductArr.filter((prod) => activeListTextContent.includes(`${prod[type]}`));
}

function filterByPopularity(): Product[] {
    const filterLabel = document.querySelector(`[data-filter-type="popular"]`) as HTMLParagraphElement;
    const popularProducts = ProductArr.filter((prod) => prod.popular === 'Да');
    return filterLabel.classList.contains('checked') ? popularProducts : ProductArr;
}

function filterByRangeValue(type: string): Product[] {
    const filterDivContainer = document.querySelector(`[data-filter-type="${type}"]`) as HTMLDivElement;
    const firstSlider = filterDivContainer.querySelector(`[data-slider-number="1"]`) as HTMLInputElement;
    const secondSlider = filterDivContainer.querySelector(`[data-slider-number="2"]`) as HTMLInputElement;

    if (firstSlider.value === firstSlider.min && secondSlider.value === secondSlider.max) {
        return ProductArr;
    }

    return ProductArr.filter((prod) => prod[type] >= +firstSlider.value && prod[type] <= +secondSlider.value);
}

function resetAllFilters() {
    const filterLabels = document.querySelectorAll('.filter__label');
    filterLabels.forEach((label) => label.classList.remove('checked'));

    const rangeValuesContainers = document.querySelectorAll('.filter__wrapper') as NodeListOf<HTMLDivElement>;
    rangeValuesContainers.forEach((rangeValuesContainer) => {
        const sliderTrack = rangeValuesContainer.querySelector('.filter__input-track') as HTMLDivElement;
        const spanValueOne = rangeValuesContainer.querySelector('[data-range-value="1"]') as HTMLSpanElement;
        const spanValueTwo = rangeValuesContainer.querySelector('[data-range-value="2"]') as HTMLSpanElement;
        const inputRangeOne = rangeValuesContainer.querySelector('[data-slider-number="1"]') as HTMLInputElement;
        const inputRangeTwo = rangeValuesContainer.querySelector('[data-slider-number="2"]') as HTMLInputElement;

        spanValueOne.textContent = inputRangeOne.value = inputRangeOne.min;
        spanValueTwo.textContent = inputRangeTwo.value = inputRangeTwo.max;

        sliderTrack.style.background = '#141414';
    });

    Definitions.productList.innerHTML = ProductСard.createProductListHTML(ProductArr);

    addSortedProductListOnPage(Definitions.productList, Definitions.select.value);
}

function addSortedProductListOnPage(ul: HTMLUListElement, type: string) {
    const sortedArr = sortProductList(ul, type);
    ul.innerHTML = '';
    ul.append(...sortedArr);
}

function sortProductList(ul: HTMLUListElement, type: string): Element[] {
    const elemArray = Array.from(ul.querySelectorAll('.product'));
    if (type === '') return elemArray;
    SortFunctions[type](elemArray);
    return elemArray;
}

function addFilterByTypeInfoInLocalStorage(target: HTMLParagraphElement) {
    const localStorageFiltersInfo = localStorage.getItem('localStorageFiltersInfo') as string;
    const info: LocalStorageFiltersInfo = JSON.parse(localStorageFiltersInfo);
    const dataset = target.dataset.text as string;

    if (info.filterByType.includes(dataset)) {
        info.filterByType = info.filterByType.filter((item) => item !== dataset);
    } else {
        info.filterByType.push(target.dataset.text as string);
    }

    localStorage.setItem('localStorageFiltersInfo', JSON.stringify(info));
}

function addFilterByRangeValueInfoInLocalStorage(event: Event) {
    const target = event.target as HTMLInputElement;
    const localStorageFiltersInfo = localStorage.getItem('localStorageFiltersInfo') as string;
    const info: LocalStorageFiltersInfo = JSON.parse(localStorageFiltersInfo);

    const filterContainer = target.closest('.filter') as HTMLDivElement;
    const dataset = filterContainer.dataset.filterType as string;
    const sliderOne = filterContainer.querySelector('[data-slider-number="1"]') as HTMLInputElement;
    const sliderTwo = filterContainer.querySelector('[data-slider-number="2"]') as HTMLInputElement;

    info.filterByRangeValue[dataset] = [sliderOne.value as string, sliderTwo.value as string];

    localStorage.setItem('localStorageFiltersInfo', JSON.stringify(info));
}

function addMainSelectValueInfoInLocalStorage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const localStorageFiltersInfo = localStorage.getItem('localStorageFiltersInfo') as string;
    const info: LocalStorageFiltersInfo = JSON.parse(localStorageFiltersInfo);

    info.sortType = target.value;
    localStorage.setItem('localStorageFiltersInfo', JSON.stringify(info));
}

function addChangesOnPageFromLocalStorage() {
    const localStorageFiltersInfo = localStorage.getItem('localStorageFiltersInfo') as string;
    const info: LocalStorageFiltersInfo = JSON.parse(localStorageFiltersInfo);

    Definitions.select.value = info.sortType;

    info.filterByType.forEach((text) => {
        const elem = document.querySelector(`[data-text="${text}"]`) as HTMLParagraphElement;
        elem.classList.add('checked');
    });

    changeValuesInFilterContainer('stock');
    changeValuesInFilterContainer('year');
    changeValuesInFilterContainer('price');

    function changeValuesInFilterContainer(type: string) {
        const filterContainer = document.querySelector(`[data-filter-type="${type}"]`) as HTMLDivElement;
        const sliderTrack = filterContainer.querySelector('.filter__input-track') as HTMLDivElement;
        const values: string[] = info.filterByRangeValue[type];
        if (values.length === 0) return;

        const rangeValueOne = filterContainer.querySelector('[data-range-value="1"]') as HTMLSpanElement;
        const rangeValueTwo = filterContainer.querySelector('[data-range-value="2"]') as HTMLSpanElement;
        const sliderOne = filterContainer.querySelector('[ data-slider-number="1"]') as HTMLInputElement;
        const sliderTwo = filterContainer.querySelector('[ data-slider-number="2"]') as HTMLInputElement;

        rangeValueOne.textContent = sliderOne.value = values[0];
        rangeValueTwo.textContent = sliderTwo.value = values[1];

        fillRangeColor(sliderTrack, sliderOne, sliderTwo);
    }
}

function setLocalStorageInitialValue() {
    localStorage.setItem(
        'localStorageFiltersInfo',
        JSON.stringify({
            filterByType: [],
            filterByRangeValue: {
                stock: [],
                year: [],
                price: [],
            },
            sortType: '',
        })
    );
    localStorage.setItem(
        'LocalStoragePurchasesInfo',
        JSON.stringify({
            basket: 0,
        })
    );
}

export {
    changeProductListElementsOrder,
    changeValuesInBasketAndProductCard,
    changeCheckboxVisualisation,
    changeRangeColorAndValue,
    clearSearchInput,
    collapseFilterVisualisation,
    rotateTitleButton,
    filterСardsOnPage,
    filterBySearchInputValue,
    resetAllFilters,
    setLocalStorageInitialValue,
    addFilterByTypeInfoInLocalStorage,
    addFilterByRangeValueInfoInLocalStorage,
    addMainSelectValueInfoInLocalStorage,
    addChangesOnPageFromLocalStorage,
    addPurchasesInfoFromLocalStorage,
};
