const btn = document.querySelector(".j-btn");
const resultNode = document.querySelector(".j-result");
function useRequest(url) {
        return fetch(url)
            .then((response) => {
                return response.url;
        })
            .then((url) => {return url;})
            .catch(() => {
                console.log('error')
            });
}

btn.addEventListener('click', async () => {
    const firstValue = Number(document.querySelector(".j-txt-first").value);
    const secondValue = Number(document.querySelector(".j-txt-second").value);
    console.log(firstValue);
    console.log(secondValue);
    if ((firstValue >= 100 && firstValue <= 300)&&(secondValue >= 100 && secondValue <= 300)) {
        let url = `https://picsum.photos/${firstValue}/${secondValue}`
        let resultURL = await useRequest(url);
        const image = `<img src="${resultURL}" width="auto" height="auto"/>`
        resultNode.innerHTML = image;
        console.log(resultURL);
    } else {
        resultNode.innerHTML = 'Одно из чисел вне диапазона от 100 до 300';
    }
});