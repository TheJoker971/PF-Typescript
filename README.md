# Introduction à la Programmation Fonctionnelle avec TypeScript et TS-Belt

La programmation fonctionnelle (PF) est un paradigme de programmation centré sur l’utilisation de fonctions pures, l’immutabilité et la composition de fonctions pour construire des logiciels robustes et prédictibles. Contrairement à la programmation impérative, qui se concentre sur la modification de l’état du programme via des instructions, la PF met l’accent sur l’évaluation d’expressions et évite les données mutables.

Ce dépôt est une guide complet pour comprendre la programmation fonctionnelle, explorer ses concepts clés et les appliquer efficacement en utilisant TypeScript et la bibliothèque `ts-belt`.

---

## **Qu’est-ce que la Programmation Fonctionnelle ?**

La programmation fonctionnelle est un paradigme de programmation déclaratif qui traite les calculs comme l’évaluation de fonctions mathématiques et évite la modification d’état ou les données mutables. Voici ses principes fondamentaux :

### **Concepts Clés :**
1. **Immutabilité :**
   - Les données ne sont jamais modifiées. De nouvelles structures de données sont créées au besoin.
   - Exemple :
     ```typescript
     const tableauOriginal = [1, 2, 3];
     const nouveauTableau = [...tableauOriginal, 4]; // [1, 2, 3, 4]
     ```

2. **Fonctions Pures :**
   - Une fonction est pure si sa sortie est uniquement déterminée par ses entrées, sans effets de bord observables.
   - Exemple :
     ```typescript
     const addition = (a: number, b: number): number => a + b;
     ```

3. **Composition de Fonctions :**
   - Combiner des fonctions simples pour construire une logique plus complexe.
   - Exemple :
     ```typescript
     const doubler = (x: number) => x * 2;
     const incrementer = (x: number) => x + 1;
     const traiter = (x: number) => incrementer(doubler(x));

     console.log(traiter(5)); // (5 * 2) + 1 = 11
     ```

4. **Éviter les Effets de Bord :**
   - Les fonctions ne modifient pas les variables hors de leur portée ni ne dépendent d’un état externe.
   - Exemple d’une fonction sans effet de bord :
     ```typescript
     const saluer = (nom: string) => `Bonjour, ${nom} !`;
     ```

5. **Fonctions de Premier Ordre et Fonctions d’Ordre Supérieur :**
   - Les fonctions sont traitées comme des citoyens de première classe : elles peuvent être passées comme arguments, renvoyées par d’autres fonctions ou assignées à des variables.
   - Les fonctions d’ordre supérieur opèrent sur d’autres fonctions.
   - Exemple :
     ```typescript
     const appliquerDeuxFois = (fn: (x: number) => number, valeur: number) => fn(fn(valeur));
     console.log(appliquerDeuxFois(x => x + 1, 5)); // 7
     ```

---

## **Pourquoi la Programmation Fonctionnelle ?**

1. **Code Prédictible et Fiable :**
   - Les fonctions pures produisent toujours la même sortie pour les mêmes entrées, ce qui facilite le débogage et les tests.

2. **Lisibilité et Maintenabilité Améliorées :**
   - Le style déclaratif et l’immutabilité permettent de comprendre plus facilement ce que fait le code.

3. **Modularité et Réutilisabilité :**
   - Les petites fonctions composables favorisent la réutilisation du code.

4. **Concurrence et Parallélisme :**
   - Éviter les états partagés et les effets de bord simplifie l’écriture de programmes concurrents.

---

## **Qu’est-ce que TS-Belt ?**

`ts-belt` est une bibliothèque fonctionnelle légère pour TypeScript, conçue pour fournir aux développeurs des outils puissants afin d’écrire du code fonctionnel de manière efficace. Elle offre des utilitaires pour :

- **Manipulation de Tableaux** (`A`) : Fonctions comme `A.map`, `A.filter` et `A.reduce` pour travailler avec des tableaux.
- **Type Optionnel** (`O`) : Gérer explicitement les valeurs optionnelles pour éviter `null` ou `undefined`.
- **Type Résultat** (`R`) : Simplifier la gestion des erreurs avec les types `Ok` et `Error`.
- **Utilitaires de Chaîne de Caractères** (`S`) : Outils puissants pour travailler avec les chaînes de caractères.
- **Utilitaires de Fonctions** (`F`) : Composer et chaîner des fonctions facilement.

Exemple d’utilisation de `ts-belt` :
```typescript
import { A, F } from "ts-belt";

const nombres = [1, 2, 3, 4];
const doubler = (x: number) => x * 2;
const somme = (a: number, b: number) => a + b;

const resultat = F.pipe(
  () => nombres,
  A.map(doubler),
  A.reduce(somme, 0)
);

console.log(resultat); // 20
```

Ce dépôt explore en profondeur les principes de la programmation fonctionnelle, met en avant la puissance de `ts-belt` et propose des exemples pratiques ainsi que des fonctions utilitaires personnalisées pour vous aider à maîtriser la programmation fonctionnelle avec TypeScript.

---


## **Manipulation des Objets avec TS-Belt (Dict)**

Les objets (ou dictionnaires) sont des structures clés en JavaScript et TypeScript. Avec `ts-belt`, la manipulation d’objets devient plus facile et fonctionnelle. Voici les concepts abordés accompagnés d'exemples.

### **1. Supprimer une clé d’un objet**

#### Exemple : Supprimer une clé avec `D.deleteKey`

```typescript
import { D } from "ts-belt";

const obj = { name: "Laptop", price: 1000, stock: true };

const objWithoutPrice = D.deleteKey(obj, "price");

console.log(objWithoutPrice);
/*
{
  name: "Laptop",
  stock: true
}
*/
```

### **2. Extraire des propriétés spécifiques**

#### Exemple : Recréer un objet avec uniquement les propriétés numériques

```typescript
const obj = { name: "Laptop", price: 1000, stock: true, category: "Electronics" };

const numericProps = D.filter(obj, value => typeof value === "number");

console.log(numericProps);
/*
{
  price: 1000
}
*/
```

### **3. Filtrer les clés d’un objet**

#### Exemple : Ne conserver que les clés commençant par 'p'

```typescript
const obj = { price: 1000, stock: true, brand: "Dell", processor: "Intel" };

const filteredObj = D.filterWithKey(obj, (value, key) => key.startsWith("p"));

console.log(filteredObj);
/*
{
  price: 1000,
  processor: "Intel"
}
*/
```

### **4. Récupérer une clé avec sécurité**

#### Exemple : Utiliser `D.get` et `D.getUnsafe`

```typescript
const obj = { name: "Laptop", price: 1000, stock: true };

const price = D.get(obj, "price"); // Option<number>
const stock = D.getUnsafe(obj, "stock"); // boolean

console.log(price); // Some(1000)
console.log(stock); // true
```

### **5. Vérifier si un objet est vide après suppression des clés**

#### Exemple : Supprimer toutes les clés et vérifier

```typescript
const obj = { name: "Laptop", price: 1000, stock: true };

const emptyObj = D.reduce(obj, (acc, _value, key) => D.deleteKey(acc, key), obj);

console.log(D.isEmpty(emptyObj)); // true
```

### **6. Comparer des objets après une mise à jour**

#### Exemple : Mettre à jour une clé et comparer

```typescript
const obj = { name: "Laptop", price: 1000 };

const updatedObj = D.set(obj, "price", 2000);

const arePricesDifferent = D.get(obj, "price") !== D.get(updatedObj, "price");

console.log(arePricesDifferent ? "Les prix sont différents" : "Les prix sont identiques");
// "Les prix sont différents"
```

### **7. Ajouter une clé à un objet vide**

#### Exemple : Créer un objet vide et ajouter une clé

```typescript
const emptyObj = {};

const newObj = D.set(emptyObj, "name", "Laptop");

console.log(newObj);
/*
{
  name: "Laptop"
}
*/
```

### **8. Modifier les clés d’un objet**

#### Exemple : Ajouter un préfixe aux clés

```typescript
const obj = { price: 1000, stock: true, processor: "Intel" };

const prefixedObj = D.mapWithKey(obj, (value, key) => [`pref_${key}`, value]);

console.log(prefixedObj);
/*
{
  pref_price: 1000,
  pref_stock: true,
  pref_processor: "Intel"
}
*/
```

### **9. Rejeter des clés basées sur une condition**

#### Exemple : Rejeter les clés avec des valeurs différentes de 1000

```typescript
const obj = { name: "Laptop", price: 1000, stock: false, warranty: false };

const filteredObj = D.reject(obj, value => value !== 1000);

console.log(filteredObj);
/*
{
  price: 1000
}
*/
```

Ces exemples couvrent les concepts essentiels pour manipuler les objets avec `ts-belt` tout en respectant les principes de la programmation fonctionnelle. Ils montrent comment accomplir des tâches courantes de manière immuable et expressive.

