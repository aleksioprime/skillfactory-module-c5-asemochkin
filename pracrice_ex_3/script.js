const btnNode = document.querySelector('.j-btn-request');

function useRequest(url, callback) {
    const value = Number(document.querySelector('.j-txt-num').value);
    if (value > 0 && value <= 10) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url+value, true);
        xhr.onload = function() {
            if (xhr.status != 200) {
                console.log('Статус ответа: ', xhr.status);
            } else {
                const result = JSON.parse(xhr.response);
                if (callback) {
                    callback(result)
                }
            }
        }
        xhr.onerror = function() {
            console.log(`Ошибка! Статус ответа: ${xhr.status}`);
        };
        xhr.send();
    } else {
        callback(false);
    }

};

function displayResult(apiData) {
    const resultNode = document.querySelector('.j-result');
    if (apiData !== false) {
        let cards = '';
        apiData.forEach(item => {
            const cardBlock = `
        <div class="card">
        <img src="${item.download_url}" 
        class="card-image"/>
        <p>${item.author}</p>
        </div>
        `
            cards = cards + cardBlock;
            resultNode.innerHTML = cards;
        });
    } else {
        resultNode.innerHTML = 'Число вне диапазона от 1 до 10';
    }
}

btnNode.addEventListener('click', () => {
    useRequest('https://picsum.photos/v2/list/?limit=', displayResult);
})