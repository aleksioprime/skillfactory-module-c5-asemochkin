const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

function createListFromXML(listNodes) {
    let newList = [];
    for (let element of listNodes) {
        let obj = {};
        let first = element.querySelector("first").textContent;
        let second = element.querySelector("second").textContent;
        let age = Number(element.querySelector("age").textContent);
        let prof = element.querySelector("prof").textContent;
        let langAttr = element.querySelector("name").getAttribute('lang');
        obj.name = `${first} ${second}`
        obj.age = age;
        obj.prof = prof;
        obj.lang = langAttr;
        newList.push(obj);
    }
    return newList;
}

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const studentNodes = xmlDOM.querySelectorAll("student");
let listXML = createListFromXML(studentNodes);
const firstResult = {
    list: listXML
}

console.log('Задание 1. Из XML в JS: ', firstResult);


const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`

const data = JSON.parse(jsonString);

for (let key in data.list) {
    data.list[key].age = Number(data.list[key].age);
};

console.log('Задание 2. Из JSON в JS: ', data);
