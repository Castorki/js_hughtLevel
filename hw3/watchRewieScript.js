const watchRewieMainContainer = document.querySelector('.watchRewie');
let products = [];

function getToData(product) {
    let temp = localStorage.getItem(product);
    return JSON.parse(temp);
}

if (localStorage.length !== 0) {
    products = getToData("products");
}

// console.log(products);
let listContainer = document.createElement('div');
listContainer.classList.add('list__container');

let listOfProducts = document.createElement('ul');
listOfProducts.classList.add('products__list');
listOfProducts.textContent = 'Список продуктов на которые оставили отзывы:'

for (let i = 0; i < products.length; i++) {
    let liProduct = document.createElement('li');
    liProduct.classList.add('products__list_product');
    liProduct.innerHTML = products[i]

    liProduct.addEventListener('mousedown', (e) => {
        e.preventDefault();

        listContainer.remove();

        showRewies(e.target.textContent);
    })

    listOfProducts.appendChild(liProduct);

}

function showRewies(product) {
    const rewiesArray = getToData(product);
    console.log(rewiesArray);

    let productRewiesContainer = document.createElement('div');
    productRewiesContainer.classList.add('product__rewies_container');

    let productTitle = document.createElement('h2')
    productTitle.textContent = product;

    let rewiesContainer = document.createElement('div');
    rewiesContainer.classList.add('rewies__container');
    rewiesContainer.style.display = 'flex';
    rewiesContainer.style.flexDirection = 'column';
    rewiesContainer.style.gap = '15px';

    for (let i = 0; i < rewiesArray.length; i++) {
        let rewieWrapper = document.createElement('div');
        rewieWrapper.classList.add('rewie__container');
        rewieWrapper.style.display = 'flex';
        rewieWrapper.style.flexDirection = 'column';
        rewieWrapper.style.gap = '5px'

        let rewie = document.createElement('p');
        rewie.innerHTML = rewiesArray[i];
        rewie.classList.add('rewie');

        let deletRewieButton = document.createElement('button');
        deletRewieButton.classList.add('delet__rewie_button');
        deletRewieButton.textContent = 'Удалить комментарий'
        deletRewieButton.style.padding = '10px 5px';
        deletRewieButton.style.border = '1px solid red';
        deletRewieButton.style.backgroundColor = 'red'

        deletRewieButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e.target);
            console.log(e.currentTarget);

            if (confirm('Вы точно хотите удалить комментарий?')) {

                // for (let i = 0; i < rewiesArray.length; i++) {
                //     if (rewiesArray[i].id === itemId) {
                //         changingTasksList.splice(i, 1);
                //         break;
                //     }
                // }

                rewieWrapper.remove();
            }

        })

        rewieWrapper.append(rewie, deletRewieButton);
        rewiesContainer.appendChild(rewieWrapper);
    }
    productRewiesContainer.append(productTitle, rewiesContainer);
    watchRewieMainContainer.appendChild(productRewiesContainer)
}

listContainer.appendChild(listOfProducts);
watchRewieMainContainer.appendChild(listContainer);