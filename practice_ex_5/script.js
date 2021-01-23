const btn = document.querySelector(".j-btn");
let keyRequest = localStorage.getItem('keyRequest');

function useRequest(url) {
    return fetch(url)
        .then((responce) => {
            return responce.json();
        })
        .then((json) => {
            return json;
        })
        .catch(() => {
            console.log("Ошибка!");
        })
}

function displayResult(data) {
    let resultNode = document.querySelector('.j-result');
    if (data !== false) {
        let cards = '';
        data.forEach(element => {
            const cardBlock = `
            <div class="card">
            <img src="${element.download_url}" 
            class="card-image"/>
            <p>${element.author}</p>
            </div>
            `
            cards += cardBlock;
        });
        resultNode.innerHTML = cards;
    } else {
        resultNode.innerHTML = '<div class="alarm">Данных нет!</div>';
    }
}

const dataChecking = async () => {
    let numPage = Number(document.querySelector(".num-page").value);
    let numLimit = Number(document.querySelector(".num-limit").value);
    const resultNode = document.querySelector('.j-result');
    if ((numPage >= 1 && numPage <= 10) && (numLimit >= 1 && numLimit <= 10)) {
        let requestURL = `https://picsum.photos/v2/list?page=${numPage}&limit=${numLimit}`;
        let resultJSON = await useRequest(requestURL);
        // console.log('Вот результат: ', resultJSON);
        localStorage.setItem('keyRequest',JSON.stringify(resultJSON));
        displayResult(resultJSON);
    } else {
        if ((numPage < 1 || numPage > 10) && (numLimit < 1 || numLimit > 10)) {
            resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
        } else if (numPage < 1 || numPage > 10) {
            resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
        } else {
            resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10';
        }
    }
}

btn.addEventListener('click', dataChecking);

// console.log('Получаем keyRequest', keyRequest);

if (keyRequest != null || keyRequest != undefined) {
    displayResult(JSON.parse(keyRequest));
}
