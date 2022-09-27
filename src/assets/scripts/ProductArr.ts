import { Product } from './Types';
const bokerAphex = require('../images/boker-aphex.jpg');
const bokerPocketSmatchet = require('../images/boker-pocket-smatchet.jpg');
const bokerSubcom = require('../images/boker-subcom.jpg');
const bokerTenshi = require('../images/boker-tenshi.jpg');
const fox528 = require('../images/fox-528.jpg');
const foxKarambit = require('../images/fox-karambit.jpg');
const spydercoEndura = require('../images/spyderco-endura-4ps.jpg');
const spydercoMatriarch = require('../images/spyderco-matriarch.jpg');
const spydercoPingo = require('../images/spyderco-pingo.jpg');

const ProductArr: Product[] = [
    {
        id: 1,
        productName: 'Spyderco Endura',
        producer: 'Spyderco',
        stock: 4,
        country: 'Japan',
        bladeMaterial: 'VG-10',
        year: 2013,
        popular: 'Да',
        price: 15000,
        image: spydercoEndura,
    },
    {
        id: 2,
        productName: 'FOX Karambit',
        producer: 'FOX',
        stock: 2,
        country: 'Italy',
        bladeMaterial: 'Elmax',
        year: 2015,
        popular: 'Нет',
        price: 33000,
        image: foxKarambit,
    },
    {
        id: 3,
        productName: 'Spyderco Matriarch',
        producer: 'Spyderco',
        stock: 9,
        country: 'Japan',
        bladeMaterial: 'VG-10',
        year: 2020,
        popular: 'Да',
        price: 18000,
        image: spydercoMatriarch,
    },
    {
        id: 4,
        productName: 'Boker Pocket Smatchet',
        producer: 'Boker',
        stock: 1,
        country: 'Germany',
        bladeMaterial: 'VG-10',
        year: 2019,
        popular: 'Нет',
        price: 8000,
        image: bokerPocketSmatchet,
    },
    {
        id: 5,
        productName: 'Boker Tenshi',
        producer: 'Boker',
        stock: 6,
        country: 'Germany',
        bladeMaterial: 'VG-10',
        year: 2019,
        popular: 'Да',
        price: 10000,
        image: bokerTenshi,
    },
    {
        id: 6,
        productName: 'Spyderco Pingo',
        producer: 'Spyderco',
        stock: 8,
        country: 'Italy',
        bladeMaterial: 'Elmax',
        year: 2018,
        popular: 'Нет',
        price: 30000,
        image: spydercoPingo,
    },
    {
        id: 7,
        productName: 'Boker Aphex',
        producer: 'Boker',
        stock: 9,
        country: 'Germany',
        bladeMaterial: 'VG-10',
        year: 2021,
        popular: 'Да',
        price: 14000,
        image: bokerAphex,
    },
    {
        id: 8,
        productName: 'Boker Subcom',
        producer: 'Boker',
        stock: 7,
        country: 'Germany',
        bladeMaterial: 'VG-10',
        year: 2019,
        popular: 'Да',
        price: 6000,
        image: bokerSubcom,
    },
    {
        id: 9,
        productName: 'FOX FX-528',
        producer: 'FOX',
        stock: 4,
        country: 'Italy',
        bladeMaterial: 'Elmax',
        year: 2018,
        popular: 'Да',
        price: 23000,
        image: fox528,
    },
];

export { ProductArr };
