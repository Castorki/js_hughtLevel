// Задание 1
// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

// let musicCollection = [
//     {
//         title: "Brave",
//         artist: "Skillet",
//         year: "2007"
//     },
//     {
//         title: "Dangens and dragons",
//         artist: "Norma Tale",
//         year: "2025"
//     },
//     {
//         title: "The shadows",
//         artist: "Shinedown",
//         year: "2013"
//     },
//     {
//         title: "Blop",
//         artist: "Hyver",
//         year: "2017"
//     },
//     {
//         title: "Blaze",
//         artist: "Flames",
//         year: "2009"
//     }
// ]

// musicCollection[Symbol.iterator] = function () {
//     return {
//         curent: 0,
//         to: this.length,
//         next() {
//             return this.curent < this.to ? { done: false, value: musicCollection[this.curent++] } : { done: true }
//         }
//     }
// }

// for (const albom of musicCollection) {
//     console.log(`${albom.title} - ${albom.artist} (${albom.year})`);
// }

// Задание 2
// Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

// Необходимо создать систему управления этими заказами, которая позволит:

// • Отслеживать, какой повар готовит какое блюдо.
// • Записывать, какие блюда заказал каждый клиент.

// Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.

let chefsSpecializations = new Map();
chefsSpecializations.set('Victor', 'pizza');
chefsSpecializations.set('Olga', 'sushi');
chefsSpecializations.set('Dmitry', 'desserts');

let chefsDishes = new Map();

chefsDishes.set('Victor', ['Pizza "Margarita"', 'Pizza "Pepperoni"']);
chefsDishes.set('Olga', ['Sushi "Philadelphia"', 'Sushi "California"']);
chefsDishes.set('Dmitry', ['Teramisu', 'CheeseCake']);

let orders = new Map();

orders.set('Aleksei', ['Pizza "Pepperoni"', 'Teramisu']);
orders.set('Maria', ['Sushi "California"', 'Pizza "Margarita"']);
orders.set('Iryna', ['CheeseCake']);


function checkWhatChefCooks(chef) {
    let dishes = `Chef ${chef} cooks: `;
    let dishesArray = chefsDishes.get(chef);
    for (let i = 0; i < dishesArray.length; i++) {
        if (i !== dishesArray.length - 1) {
            dishes += `${dishesArray[i]}, `
        } else {
            dishes += `${dishesArray[i]}`
        }

    }
    return dishes; // Chef Victor cooks: Pizza "Margarita", Pizza "Pepperoni"
}

// function checkWhatChefCooks(chef) {
//     return chefsDishes.get(chef); // [['Pizza "Margarita"', 'Pizza "Pepperoni"']]
// }

function addOrder(customer, order) {
    return orders.set(customer, order);
}

console.log(checkWhatChefCooks('Victor'));
addOrder('Nyna', ['Pizza "Pepperoni"']);
addOrder('Aya', ['Sushi "California"', 'Teramisu', 'CheeseCake']);
addOrder('Mol', ['Sushi "California"']);
console.log(orders);