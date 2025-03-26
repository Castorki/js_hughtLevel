(() => {
    function getToData(product) {
        let temp = localStorage.getItem(product);
        return JSON.parse(temp);
    }

    function setToData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function createListOfProducts(products) {
        const watchRewieMainContainer = document.querySelector('.watchRewie');

        if (products.length === 0) {
            let listContainer = document.createElement('div');
            listContainer.classList.add('list__container');

            let noProductsWereRewied = document.createElement('p');
            noProductsWereRewied.classList.add('no__products');
            noProductsWereRewied.innerHTML = 'Пока что нет продуктов на которые оставили отзывы.<br> Вы можете быть первым! \=)'
            noProductsWereRewied.style.textAlign = 'center';

            listContainer.appendChild(noProductsWereRewied);
            watchRewieMainContainer.appendChild(listContainer);

        } else {

            let noProducts = document.querySelector('.no__products')

            if (noProducts) {
                noProducts.remove();
            }

            let listContainer = document.createElement('div');
            listContainer.classList.add('list__container');

            let listOfProducts = document.createElement('ul');
            listOfProducts.classList.add('products__list');
            listOfProducts.textContent = 'Список продуктов на которые оставили отзывы:'

            for (let i = 0; i < products.length; i++) {

                if (checkRewies(products[i])) {
                    let liProduct = document.createElement('li');
                    liProduct.classList.add('products__list_product');
                    liProduct.innerHTML = products[i]

                    liProduct.addEventListener('mousedown', (e) => {
                        e.preventDefault();

                        listContainer.remove();

                        showRewies(products, e.target.textContent);
                    })

                    listOfProducts.appendChild(liProduct);
                }


            }

            listContainer.appendChild(listOfProducts);
            watchRewieMainContainer.appendChild(listContainer);
        }
    }

    function showRewies(products, product) {
        const watchRewieMainContainer = document.querySelector('.watchRewie');

        const rewiesArray = getToData(product);


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
            rewie.innerHTML = rewiesArray[i].rewie;
            rewie.classList.add('rewie');
            rewie.setAttribute('id', rewiesArray[i].id);


            let deletRewieButton = document.createElement('button');
            deletRewieButton.classList.add('delet__rewie_button');
            deletRewieButton.textContent = 'Удалить комментарий'
            deletRewieButton.style.padding = '10px 5px';
            deletRewieButton.style.border = '1px solid red';
            deletRewieButton.style.backgroundColor = 'red'

            deletRewieButton.addEventListener('click', (e) => {
                e.preventDefault();

                if (confirm('Вы точно хотите удалить комментарий?')) {

                    for (let i = 0; i < rewiesArray.length; i++) {
                        if (rewiesArray[i].id === parseInt(rewie.id)) {
                            rewiesArray.splice(i, 1);
                            break;
                        }
                    }
                    setToData(product, rewiesArray);
                    rewieWrapper.remove();
                }

            })

            rewieWrapper.append(rewie, deletRewieButton);
            rewiesContainer.appendChild(rewieWrapper);
        }
        productRewiesContainer.append(productTitle, rewiesContainer);
        watchRewieMainContainer.appendChild(productRewiesContainer);
        getBackToProductsList(products);

    }

    function getBackToProductsList(products) {
        const watchRewieMainContainer = document.querySelector('.watchRewie');
        const rewiesContainer = document.querySelector('.product__rewies_container')

        const backToProductsContainer = document.createElement('div');
        backToProductsContainer.classList.add('backToProductList__container');
        backToProductsContainer.style.display = 'flex';
        backToProductsContainer.style.justifyContent = 'center'

        const backButton = document.createElement('button');
        backButton.classList.add('back__button');
        backButton.textContent = 'Вернуться к списку продуктов';
        backButton.style.backgroundColor = 'lightgreen'
        backButton.style.border = '2px solid green';
        backButton.style.padding = '10px 5px';

        backButton.addEventListener('click', (e) => {
            e.preventDefault();

            rewiesContainer.remove();
            backToProductsContainer.remove();
            createListOfProducts(products);

        })

        backToProductsContainer.appendChild(backButton);
        watchRewieMainContainer.appendChild(backToProductsContainer);

    }

    function checkRewies(product) {
        let rewies = getToData(product);

        if (rewies.length > 0) {
            return true;
        }
        return false;

    }

    function createWatchRewiePage() {

        let products = [];

        if (localStorage.length !== 0) {
            products = getToData("products");
        }

        createListOfProducts(products);
    }

    window.createWatchRewiePage = createWatchRewiePage;
})();