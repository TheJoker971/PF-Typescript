import { A, O, pipe } from "@mobily/ts-belt";
import Product from "./interface/Product";
import Token from "./interface/Token";

// Ceci est une closure qui ajoute deux 
function addTwo()  {
    let count = 0;
    return ()=>count+=2;
}

const increment = addTwo();
// Increment stockera la valeur de count et a chaque appel de increment la valeur de count augmentera de 2
console.log(increment());
console.log(increment());

// Niveau superieur
function addNumber(start:number){
    let count = start;
    return (incrementer:number) => count+=incrementer;
}

const increment2 = addNumber(5);
console.log(increment2(5)) // 10

// Ici nous allons utilisé ts-belt afin de facilité le traitement des données des Arrays
const inventory1: Product[] = [
    { name: "Laptop", price: 1000, inStock: true },
    { name: "Mouse", price: 25, inStock: false },
    { name: "Keyboard", price: 75, inStock: true },
  ];
const inventory2: Product[] = [
{ name: "Keyboard", price: 75, inStock: true },
{ name: "Monitor", price: 200, inStock: false },
{ name: "Mouse", price: 25, inStock: false },
];
  
//  Nous voulons comparer les deux tableaux et retourner uniquement les memes éléments
const res = A.reduce(
    inventory1,
    [] as readonly Product[],
    (acc, currentProductI1) => {
        return A.includes(inventory2, currentProductI1)
        ? [...acc, currentProductI1]
        : acc;
    },
);

console.log(res);


// Celui-ci permets de supprimer des elements du array selon la condition
const products: Product[] = [
    { name: 'Laptop', price: 1000, inStock: true },
    { name: 'Mouse', price: 25, inStock: false },
    { name: 'Keyboard', price: 75, inStock: true },
    { name: 'Monitor', price: 200, inStock: true },
  ];
const dropWhile = (predicate:(item:Product)=>boolean) => {
    return A.dropWhile(products,predicate);
};

console.log(dropWhile((product:Product)=> product.price <80));

// On va créer une fonction qui va automatiquement mettre le mint a false si la quantité est égal a 0 et mettre true si > 0


const tokens : Token[] = [
    {name:"PEPE",symbol:"PEPE",quantity:14562034,mint:false},
    {name:"Bitcoin",symbol:"BTC",quantity:0,mint:true},
    {name:"Ethereum",symbol:"ETH",quantity:14562034,mint:true},
    {name:"Shiba inu",symbol:"SHIB",quantity:14562034,mint:false}
];

const updateMint = (list:Token[]) =>{
    return pipe(
        list,
        A.map((token) => ({...token,mint: token.quantity > 0,}))
    );
}

console.log(updateMint(tokens));

// on peut créer des class différemment

const player = (name:string) => {
    let pseudo = name;
    let bestScore = 0;
    let score=0;

    const getPseudo = () => pseudo;
    const setPseudo = (p:string) => {pseudo = p;};

    const increment = (x:number) => score += x;

    const getBestScore = () => bestScore;
    const endParty = () => {
        (score > bestScore) ? bestScore = score : null;
        score ==0;
    }

    return {
        getPseudo,
        setPseudo,
        increment,
        getBestScore,
        endParty
    }

}

const joker = player("joker");
console.log(joker.getPseudo());
joker.setPseudo("Joker");
console.log(joker.increment(20));
console.log(joker.increment(500));
console.log(joker.getBestScore());
joker.endParty();
console.log(joker.getBestScore());

