function createArrayFotos() {
    const fotos = new Array(25).fill(null).map((el, index) => createObjFoto(index));
    return fotos;

}
function createObjFoto(index) {
    const foto = {
        id: index + 1,
        url: `photos/${index + 1}`,
        decription: createDescription(),
        likes: randomNumberRange(15, 201), 
        comments: createComents()
    }
    return foto;
}

function createComents() {
    const listOfComents = new Array(randomNumber(51)).fill(null).map((el, index) => createComent(index))
    function createComent(index) {
        const coment = {
            id: index + 1,
            avatar: `img/avatar-${randomNumberRange(1, 7)}.svg`,
            message: createMessage(),
            name: createName()
        } 
        return coment
    }

    return listOfComents;
}
function createDescription() {
    const desccriptionOptions = ['Природа у всій своїй красі', 'Запашна кава розбуджує уранці перед робочим днем', 'Сніданок на швидку руку', 'Час на вечерю після роботи', 'Солодкий перерву з тортиком ', 'Захоплююча гра у футбол', 'Ранкові вправи для зарядки енергії ', 'Вечірній промені сонця', 'Зимова прогулянка з кавою в руках', 'Зустріч з дикою природою', 'Незабутні моменти з друзями', 'Ритм серця під музикою дощу', 'Вулиці міста оживають увечері,', 'Морський бриз', 'Записки в щоденнику ']
    const desccription = desccriptionOptions[randomNumber(desccriptionOptions.length)]
    return desccription
}
function createMessage() {
    const messageOptions = ['Чудова фотографія!', 'Прекрасний кадр!', 'Просто неймовірно!', 'Прекрасний кадр!', 'Трохи мутно...', 'Це можна було б зробити краще.', 'Фотографія дня!', 'Я б не ділився такими фото, якби був на вашому місці.', 'Це ви намагались зняти, чи просто натиснули випадково?', 'Можливо, це не найкращий ракурс.']
    const message = messageOptions[randomNumber(messageOptions.length)]
    return message
}

function createName() {
    const listName = ['Андрій', 'Олена', 'Максим', 'Юлія', 'Денис', 'Ірина', 'Сергій', 'Анастасія', 'Віктор', 'Наталія']
    const listSurname = ['Ковальчук', 'Шевченко', 'Петренко', 'Григоренко', 'Коваль', 'Мельник', 'Лисенко', 'Сидоренко', 'Левченко', 'Романенко']
    const name = listName[randomNumber(listName.length)]
    const Surname = listSurname[randomNumber(listSurname.length)]
    const person = `${name} ${Surname}`
    return person
}


function randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function randomNumber(max) {
    return Math.floor(Math.random() * max)
}
const fotos = createArrayFotos();
console.log(fotos)