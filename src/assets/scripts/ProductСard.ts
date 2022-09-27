import { Product } from './Types';

class ProductСard {
    private static createProductСard(data: Product): string {
        return `
        <li class="product" data-product-id="${data.id}">
              <img src="${data.image}" alt="knife image" class="product__img">
              <h3 class="product__headling">${data.productName}</h3>
              <ul class="product__features">
                <li class="product__property">Производитель: <span>${data.producer}</span></li>
                <li class="product__property">Страна: <span>${data.country}</span></li>
                <li class="product__property">На складе: <span>${data.stock}</span></li>
                <li class="product__property">Материал клинка: <span>${data.bladeMaterial}</span></li>
                <li class="product__property" >Год выпуска: <span data-year="year">${data.year}</span></li>
                <li class="product__property">Популярный: <span>${data.popular}</span></li>
                <li class="product__property">Цена: <span>${data.price} ₽</span></li>
              </ul>
              <div class="product__buttons">
                <button class="button" data-action="add" id="product-button">Купить</button>
                <button class="button button_colored" id="product-button" data-action="remove">Убрать</button>
                <div class="product__in-basket">0</div>
              </div>
            </li>
        `;
    }

    static createProductListHTML(arr: Product[]): string {
        let result = '';
        arr.forEach((item) => (result += ProductСard.createProductСard(item)));
        return result;
    }
}

export { ProductСard };
