// // Задание 1
// // Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

// class Library {
//     #books = [];

//     get allBooks() {
//         return this.#books;
//     }

//     addBook(bookTitle) {
//         if (this.#books.includes(bookTitle)) {
//             throw new Error('Такая книга уже есть в библиотеке')
//         };

//         this.#books.push(bookTitle);
//     }

//     removeBook(bookTitle) {
//         if (!this.#books.includes(bookTitle)) {
//             throw new Error('Такой книге в библиотеке и так нет')
//         };

//         let indexOfDeletingBook = this.#books.indexOf(bookTitle, 0);
//         this.#books.splice(indexOfDeletingBook, 1);
//     }

//     hasBook(bookTitle) {
//         return (this.#books.includes(bookTitle)) ? true : false;
//     }

//     constructor(books) {
//         let set = new Set;
//         set = books;
//         if (!set.size == books.lenght) {
//             throw new Error('В списке есть повторяющиеся назания книг')
//         }
//         this.#books = books;
//     }

// }
// let books = ['Brave', 'clay', 'Super'];

// let library = new Library(books);

// console.log(library.allBooks);
// console.log(library.hasBook('clay'));
// console.log(library.hasBook('saf'));
// console.log(library.addBook('Row'));
// // console.log(library.addBook('Row'));
// console.log(library.allBooks);
// console.log(library.removeBook('Brave'));
// // console.log(library.removeBook('Brave'));
// console.log(library.allBooks);

// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.
// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

class CustomEror extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomEror'
    }
}



const productsArray = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: 1,
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: 2,
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: 3,
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: 4,
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

let id = 5;

let mainContainer = document.querySelector('.mainContainer');
let productsContainer = document.querySelector('.products');

function createProducts(productsArray) {
    for (let i = 0; i < productsArray.length; i++) {
        let product = document.createElement('div');
        product.classList.add('product');

        let productName = document.createElement('h2');
        productName.classList.add('product__name');
        productName.textContent = productsArray[i].product;

        let productPhoto = document.createElement('img');
        productPhoto.classList.add('product__photo');
        productPhoto.src = './img/productPhoto.png';
        productPhoto.alt = 'Product Photo';
        productPhoto.style.width = '300px'


        let inputRewieContainer = document.createElement('div');
        inputRewieContainer.classList.add('inputFormContainer');

        let inpetRewieForm = document.createElement('form');
        inpetRewieForm.classList.add('inpetRewieForm');

        let inputRewie = document.createElement('input');
        inputRewie.classList.add('input__rewie');
        inputRewie.placeholder = 'Enter rewie';

        let submirRewieButtonContainer = document.createElement('div');
        submirRewieButtonContainer.classList.add('submirRewieButtonContainer');

        let submitRewieButton = document.createElement('button');
        submitRewieButton.classList.add('submitRewieButton');
        submitRewieButton.style.padding = '15px 20px';
        submitRewieButton.textContent = 'Submit rewie'

        submitRewieButton.addEventListener('click', (e) => {
            e.preventDefault();

            addRewie(inputRewie.value, productsArray, productName.textContent, rewieContainer.id);

            inputRewie.value = '';
        })

        let rewieContainer = document.createElement('div')
        rewieContainer.classList.add('product__rewieContainer');
        rewieContainer.setAttribute('id', id);
        id++;

        let rewiesArray = productsArray[i].reviews;

        for (let i = 0; i < rewiesArray.length; i++) {
            let rewie = document.createElement('p')
            rewie.classList.add('product__rewieContainer_rewie');
            rewie.setAttribute('id', rewiesArray[i].id)
            rewie.textContent = rewiesArray[i].text;
            rewieContainer.appendChild(rewie);
        }

        submirRewieButtonContainer.appendChild(submitRewieButton);
        inpetRewieForm.append(inputRewie, submirRewieButtonContainer);
        inputRewieContainer.appendChild(inpetRewieForm);
        product.append(productName, productPhoto, inputRewieContainer, rewieContainer);
        productsContainer.appendChild(product);
        mainContainer.appendChild(productsContainer);

    }
}

function checLenghtOfRewie(rewie) {
    if (rewie < 50 || rewie > 500) {
        throw new CustomEror('Отзыв не соответствует требуемой длине');
    }
}

function addRewie(rewie, productsArray, productName, id) {
    let rewieContainer = document.getElementById(id)



    try {
        checLenghtOfRewie(rewie);
        let newRewie = document.createElement('p');
        newRewie.classList.add('product__rewieContainer_rewie');
        newRewie.setAttribute('id', id);
        newRewie.textContent = rewie;

        rewieContainer.append(rewie);
        for (let i = 0; i < productsArray.length; i++) {
            if (productsArray[i].product === productName) {
                let rewieObj = {
                    id: id,
                    text: rewie
                }

                id++;

                productsArray[i].reviews.push(rewieObj);
            }

        }
    } catch (error) {
        if (error instanceof CustomEror) {
            console.log(`Ошибка: ${error.message}`);
        } else {
            console.log(error.message);
        }
    }
}

createProducts(productsArray);