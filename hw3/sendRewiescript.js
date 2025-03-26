(() => {

    function getToData(product) {
        let temp = localStorage.getItem(product);
        return JSON.parse(temp);
    }

    function setToData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function addListenersForSendRewieForm() {
        const sendRewie = document.querySelector('.sendRewie__form_Rewie');
        const productTitle = document.querySelector('.sendRewie__form_ProductTitle');
        const sendRewieButton = document.querySelector('.sendRewie__form_button');

        sendRewie.addEventListener('click', function () {
            if (this.value.length === '') {
                this.setSelectionRange(0, 0);
            }
        });

        sendRewieButton.addEventListener('click', (e) => {
            e.preventDefault();

            const product = productTitle.value;
            const rewie = sendRewie.value;


            if (checkValabylity(product, rewie)) {

                checkProducts(product);


                checkRewie(product, rewie);

                sendRewie.value = '';
                productTitle.value = '';


            }
        })
    }

    function checkValabylity(product, rewie) {
        if (product !== '' && rewie !== '') {
            return true;
        } else {
            alert('Не все поля заполнены!!')
        }
    }

    function checkProducts(product) {
        let products = getToData("products");
        if (!products) {
            products = [];
            products.push(product)
            setToData("products", products)
        } else if (!products.includes(product)) {
            products.push(product);
            setToData("products", products)

        }
    }




    function checkRewie(product, rewie) {
        let tempRewies = getToData(product);
        let rewieId = Math.round(Math.random() * 1000);
        rewie = {
            rewie: rewie,
            id: rewieId
        };

        console.log(rewie);

        if (!tempRewies) {
            tempRewies = [];
            tempRewies.push(rewie);
            setToData(product, tempRewies)

        } else {
            tempRewies.push(rewie);
            setToData(product, tempRewies)
        }
    }


    function createSendRewiePage() {

        // localStorage.cl
        addListenersForSendRewieForm();


    }

    window.createSendRewiePage = createSendRewiePage;
})();