const sendRewie = document.querySelector('.sendRewie__form_Rewie');
const productTitle = document.querySelector('.sendRewie__form_ProductTitle');
const sendRewieButton = document.querySelector('.sendRewie__form_button');
let products = [];

// localStorage.clear();
function checkProducts(product) {
    if (!products.includes(product)) {
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
    }
}

function getToData(product) {
    let temp = localStorage.getItem(product);
    return JSON.parse(temp);
}


function checkRewie(product, rewie) {
    let tempRewies = getToData(product);

    if (!tempRewies) {
        tempRewies = [];
        tempRewies.push(rewie);
        localStorage.setItem(product, JSON.stringify(tempRewies));
    } else {
        tempRewies.push(rewie);
        localStorage.setItem(product, JSON.stringify(tempRewies));
    }
}

sendRewie.addEventListener('click', function () {
    if (this.value.length === '') {
        this.setSelectionRange(0, 0);
    }
});

function checkValabylity(product, rewie) {
    if (product !== '' && rewie !== '') {
        return true;
    } else {
        alert('Не все поля заполнены!!')
    }
}

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