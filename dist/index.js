"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_belt_1 = require("@mobily/ts-belt");
// Ceci est une closure qui ajoute deux 
function addTwo() {
    let count = 0;
    return () => count += 2;
}
const increment = addTwo();
// Increment stockera la valeur de count et a chaque appel de increment la valeur de count augmentera de 2
console.log(increment());
console.log(increment());
// Niveau superieur
function addNumber(start) {
    let count = start;
    return (incrementer) => count += incrementer;
}
const increment2 = addNumber(5);
console.log(increment2(5)); // 10
// Ici nous allons utilisé ts-belt afin de facilité le traitement des données des Arrays
const inventory1 = [
    { name: "Laptop", price: 1000, inStock: true },
    { name: "Mouse", price: 25, inStock: false },
    { name: "Keyboard", price: 75, inStock: true },
];
const inventory2 = [
    { name: "Keyboard", price: 75, inStock: true },
    { name: "Monitor", price: 200, inStock: false },
    { name: "Mouse", price: 25, inStock: false },
];
//  Nous voulons comparer les deux tableaux et retourner uniquement les memes éléments
const res = ts_belt_1.A.reduce(inventory1, [], (acc, currentProductI1) => {
    return ts_belt_1.A.includes(inventory2, currentProductI1)
        ? [...acc, currentProductI1]
        : acc;
});
console.log(res);
// Celui-ci permets de supprimer des elements du array selon la condition
const products = [
    { name: 'Laptop', price: 1000, inStock: true },
    { name: 'Mouse', price: 25, inStock: false },
    { name: 'Keyboard', price: 75, inStock: true },
    { name: 'Monitor', price: 200, inStock: true },
];
const dropWhile = (predicate) => {
    return ts_belt_1.A.dropWhile(products, predicate);
};
console.log(dropWhile((product) => product.price < 80));
const tokens = [
    { name: "PEPE", symbol: "PEPE", quantity: 14562034, mint: false },
    { name: "Bitcoin", symbol: "BTC", quantity: 0, mint: true },
    { name: "Ethereum", symbol: "ETH", quantity: 14562034, mint: true },
    { name: "Shiba inu", symbol: "SHIB", quantity: 14562034, mint: false }
];
const updateMint = (list) => {
    return (0, ts_belt_1.pipe)(list, ts_belt_1.A.map((token) => ({ ...token, mint: token.quantity > 0, })));
};
console.log(updateMint(tokens));
