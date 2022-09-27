import { ProductArr } from '../scripts/ProductArr';
import { ProductСard } from '../scripts/ProductСard';
import { Definitions } from '../scripts/Definitions';
import {
    changeProductListElementsOrder,
    changeValuesInBasketAndProductCard,
    changeCheckboxVisualisation,
    changeRangeColorAndValue,
    clearSearchInput,
    collapseFilterVisualisation,
    rotateTitleButton,
    filterСardsOnPage,
    resetAllFilters,
    setLocalStorageInitialValue,
    addFilterByTypeInfoInLocalStorage,
    addFilterByRangeValueInfoInLocalStorage,
    addMainSelectValueInfoInLocalStorage,
    addChangesOnPageFromLocalStorage,
    addPurchasesInfoFromLocalStorage,
} from '../scripts/FunctionsForHandlers';

function mainSelectChangeHandler(event: Event) {
    changeProductListElementsOrder(event);
    addMainSelectValueInfoInLocalStorage(event);
}

function productListClickHandler(event: Event) {
    const target = event.target as HTMLElement;

    if (target.closest('#product-button')) {
        changeValuesInBasketAndProductCard(target);
    }
}

function labelClickHandler(event: Event) {
    const target = event.target as HTMLParagraphElement;
    changeCheckboxVisualisation(target);
    filterСardsOnPage();
    addFilterByTypeInfoInLocalStorage(target);
}

function rangeInputHandler(event: Event) {
    changeRangeColorAndValue(event);
    filterСardsOnPage();
    addFilterByRangeValueInfoInLocalStorage(event);
}

function clearSearchButtonClickHandler() {
    clearSearchInput();
    filterСardsOnPage();
}

function searchInputHandler() {
    filterСardsOnPage();
}

function filterTitleClickHandler(event: Event) {
    let target = event.target as HTMLHeadingElement;
    target = target.closest('.filter__title') as HTMLHeadingElement;

    collapseFilterVisualisation(target);
    rotateTitleButton(target);
}

function windowOnLoad() {
    Definitions.productList.innerHTML = ProductСard.createProductListHTML(ProductArr);

    if (!localStorage.getItem('localStorageFiltersInfo')) {
        setLocalStorageInitialValue();
    } else {
        addChangesOnPageFromLocalStorage();
        filterСardsOnPage();
    }

    Definitions.searchInput.focus();
}

function resetFiltersButtonClickHandler() {
    clearSearchInput();
    resetAllFilters();
    addPurchasesInfoFromLocalStorage();
}

function resetSettingsButtonClickHandler() {
    clearSearchInput();
    resetAllFilters();
    setLocalStorageInitialValue();
    addPurchasesInfoFromLocalStorage();
}

export {
    mainSelectChangeHandler,
    productListClickHandler,
    labelClickHandler,
    rangeInputHandler,
    clearSearchButtonClickHandler,
    searchInputHandler,
    filterTitleClickHandler,
    resetFiltersButtonClickHandler,
    resetSettingsButtonClickHandler,
    windowOnLoad,
};
