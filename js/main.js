const avatarNamberOfURL = {
    min: 1,
    max: 6
}
const rangeOfLikes = {
    min: 15,
    max: 200
}
const maxNumberComents = 20;

function randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min)
}
function randomNumber(max) {
    return Math.floor(Math.random() * max)
}


function createObjFoto(index) {
    const foto = {
        id: index + 1,
        url: `/photos/${index + 1}.jpg`,
        decription: createDescription(),
        likes: randomNumberRange(rangeOfLikes.min, rangeOfLikes.max), 
        comments: createComents()
    }
    // id must start with 1
    return foto;
}

function createComents() {
    const listOfComents = new Array(randomNumber(maxNumberComents)).fill(null).map((el, index) => createComent(index))
    function createComent(index) {
        const coment = {
            id: index + 1,
            avatar: `img/avatar-${randomNumberRange(avatarNamberOfURL.min, avatarNamberOfURL.max)}.svg`,
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

function createArrayFotos() {
    const fotos = new Array(25).fill(null).map((el, index) => createObjFoto(index));
    return fotos;
}


const fotos = createArrayFotos();
// console.log(fotos)
export {fotos}