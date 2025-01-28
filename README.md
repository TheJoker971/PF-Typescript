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

---

## **Manipulation des Fonctions avec TS-Belt**

Les fonctions sont au cœur de la programmation fonctionnelle. Avec `ts-belt`, on dispose d'outils puissants pour travailler avec des fonctions, les composer, les limiter ou manipuler leurs résultats.

### **1. Retourner une valeur avec une fonction**

#### Exemple : Utiliser `F.identity`

```typescript
import { F } from "ts-belt";

const value = 42;
const result = F.identity(value);

console.log(result); // 42
```

### **2. Vérifier plusieurs prédicats**

#### Exemple : Utiliser `F.allPass` pour valider un nombre

```typescript
const number = 12;
const predicates = [
  (n: number) => n > 10,
  (n: number) => n % 2 === 0,
];

const isValid = F.allPass(predicates)(number);

console.log(isValid); // true
```

### **3. Limiter les appels à une fonction**

#### Exemple : Utiliser `F.throttle`

```typescript
const logMessage = (message: string) => console.log(message);

const throttledLog = F.throttle(logMessage, 2000);

throttledLog("Hello");
throttledLog("World"); // Appelé seulement après 2 secondes
```

### **4. Manipuler les erreurs avec `F.tryCatch`**

#### Exemple : Gérer les erreurs lors du parsing JSON

```typescript
import { F, R } from "ts-belt";

const jsonString = '{"name": "Joe"}';

const result = F.pipe(
  jsonString,
  F.tryCatch<string, { name: string }>(JSON.parse),
  R.map(user => user.name),
  R.getWithDefault("Erreur")
);

console.log(result); // "Joe"
```

### **5. Fonction avec fermeture (closure)**

#### Exemple : Une fonction avec un comportement unique

```typescript
const oneShot = () => {
  let called = false;
  return () => {
    if (called) return "Too late";
    called = true;
    return "One shot";
  };
};

const fn = oneShot();
console.log(fn()); // "One shot"
console.log(fn()); // "Too late"
```

### **6. Forcer une valeur à un type et vérifier l'égalité**

#### Exemple : Utiliser `F.coerce` et `F.equals`

```typescript
import { F } from "ts-belt";

const value = "42";
const coercedValue = F.coerce<number>(value as any);

const isEqual = F.equals(coercedValue, 42);

console.log(isEqual ? "Valeurs égales" : "Valeurs différentes");
// "Valeurs égales"
```

---

## **Manipulation des Résultats avec TS-Belt (Result)**

Le type `Result` de `ts-belt` est une abstraction puissante pour gérer les succès et les erreurs de manière fonctionnelle. Voici quelques concepts fondamentaux accompagnés d'exemples concrets pour maîtriser cette fonctionnalité.

### **1. Transformer une exécution en `Result`**

#### Exemple : Utiliser `R.fromExecution` et `R.match`

```typescript
import { R } from "ts-belt";

const riskyFunction = () => {
  if (Math.random() > 0.5) {
    return 100;
  }
  throw new Error("Erreur");
};

const result = R.fromExecution(riskyFunction);

R.match(result, {
  Ok: value => console.log("Succès :", value),
  Error: error => console.log("Erreur :", error.message),
});
```

### **2. Gérer les erreurs avec `R.fromNullable` et `R.tapError`**

#### Exemple : Créer un `Result` à partir d'une valeur nullable

```typescript
const value = null;

const result = R.pipe(
  R.fromNullable(value, "Valeur nulle"),
  R.tapError(error => console.error("Erreur :", error)),
  R.recover(() => "Valeur par défaut")
);

console.log(result); // "Valeur par défaut"
```

### **3. Inverser `Ok` et `Error`**

#### Exemple : Utiliser `R.swap`

```typescript
const result = R.fromNullable(null, "Erreur");

const swapped = R.swap(result);

console.log(R.match(swapped, {
  Ok: errorMessage => `Initialement une erreur : ${errorMessage}`,
  Error: value => `Initialement un succès : ${value}`,
}));
```

### **4. Convertir un `Result` en Option**

#### Exemple : Afficher le résultat ou convertir en option

```typescript
const riskyFunction = () => {
  if (Math.random() > 0.5) {
    return 150;
  }
  throw new Error("Erreur");
};

const result = R.fromExecution(riskyFunction);

R.match(result, {
  Ok: value => console.log("Succès :", value),
  Error: error => console.log("Erreur :", error.message),
});

const option = R.toOption(result);
console.log(option); // Some(150) ou None
```

---

## **Manipulation des Résultats avec TS-Belt (Result)**

Le type `Result` de `ts-belt` est une abstraction puissante pour gérer les succès et les erreurs de manière fonctionnelle. Voici quelques concepts fondamentaux accompagnés d'exemples concrets pour maîtriser cette fonctionnalité.

### **1. Transformer une exécution en `Result`**

#### Exemple : Utiliser `R.fromExecution` et `R.match`

```typescript
import { R } from "ts-belt";

const riskyFunction = () => {
  if (Math.random() > 0.5) {
    return 100;
  }
  throw new Error("Erreur");
};

const result = R.fromExecution(riskyFunction);

R.match(result, {
  Ok: value => console.log("Succès :", value),
  Error: error => console.log("Erreur :", error.message),
});
```

### **2. Gérer les erreurs avec `R.fromNullable` et `R.tapError`**

#### Exemple : Créer un `Result` à partir d'une valeur nullable

```typescript
const value = null;

const result = R.pipe(
  R.fromNullable(value, "Valeur nulle"),
  R.tapError(error => console.error("Erreur :", error)),
  R.recover(() => "Valeur par défaut")
);

console.log(result); // "Valeur par défaut"
```

### **3. Inverser `Ok` et `Error`**

#### Exemple : Utiliser `R.swap`

```typescript
const result = R.fromNullable(null, "Erreur");

const swapped = R.swap(result);

console.log(R.match(swapped, {
  Ok: errorMessage => `Initialement une erreur : ${errorMessage}`,
  Error: value => `Initialement un succès : ${value}`,
}));
```

### **4. Convertir un `Result` en Option**

#### Exemple : Afficher le résultat ou convertir en option

```typescript
const riskyFunction = () => {
  if (Math.random() > 0.5) {
    return 150;
  }
  throw new Error("Erreur");
};

const result = R.fromExecution(riskyFunction);

R.match(result, {
  Ok: value => console.log("Succès :", value),
  Error: error => console.log("Erreur :", error.message),
});

const option = R.toOption(result);
console.log(option); // Some(150) ou None
```

Ces exemples illustrent comment utiliser `Result` pour encapsuler des succès et des erreurs de manière prévisible et élégante, tout en favorisant la lisibilité et la robustesse du code.

---

## **Outils de Manipulation des Données : every, filter, map, reduce, some**

TS-Belt propose des fonctions utilitaires pour manipuler efficacement des tableaux. Voici un aperçu des principales fonctions :

### **1. Vérifier une condition sur tous les éléments**

#### Exemple : Utiliser `A.every`

```typescript
import { A } from "ts-belt";

const numbers = [2, 4, 6, 8];

const allEven = A.every(numbers, n => n % 2 === 0);

console.log(allEven); // true
```

### **2. Filtrer un tableau**

#### Exemple : Utiliser `A.filter`

```typescript
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = A.filter(numbers, n => n % 2 === 0);

console.log(evenNumbers); // [2, 4]
```

### **3. Transformer les éléments d’un tableau**

#### Exemple : Utiliser `A.map`

```typescript
const numbers = [1, 2, 3];

const squaredNumbers = A.map(numbers, n => n * n);

console.log(squaredNumbers); // [1, 4, 9]
```

### **4. Réduire un tableau à une seule valeur**

#### Exemple : Utiliser `A.reduce`

```typescript
const numbers = [1, 2, 3, 4];

const sum = A.reduce(numbers, (acc, n) => acc + n, 0);

console.log(sum); // 10
```

### **5. Vérifier si au moins un élément satisfait une condition**

#### Exemple : Utiliser `A.some`

```typescript
const numbers = [1, 3, 5, 7];

const hasEven = A.some(numbers, n => n % 2 === 0);

console.log(hasEven); // false
```




