interface Product {
    id: number;
    productName: string;
    producer: string;
    country: string;
    bladeMaterial: string;
    stock: number;
    year: number;
    price: number;
    popular: string;
    image: string;
    [key: string]: number | string;
}

interface LocalStoragePurchasesInfo {
    basket: number;
    [key: string]: number;
}

interface filterByRangeValues {
    stock: string[];
    year: string[];
    price: string[];
    [key: string]: string[];
}

interface LocalStorageFiltersInfo {
    filterByType: string[];
    filterByRangeValue: filterByRangeValues;
    sortType: string;
}

interface SortFunctions {
    [key: string]: (arr: Element[]) => void;
}

export { Product, LocalStorageFiltersInfo, LocalStoragePurchasesInfo, SortFunctions };
