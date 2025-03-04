const symbols = {
    ru: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю"],
    en: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "Z", "X", "C", "V", "B", "N", "M", "<", ">"]
}

const button = {
    ruEncode: document.getElementById("ruEncode"),
    enEncode: document.getElementById("enEncode"),
    savePass: document.getElementById("savePass"),
    deletePass: document.getElementById("deletePass"),
    showPass: document.getElementById("showPass"),
    hidePass: document.getElementById("hidePass"),
}

const input = document.getElementById('passInput')
const ru_str = document.getElementById("ru_str")
const en_str = document.getElementById("en_str")
const ru_view = document.getElementById("ru_view")
const en_view = document.getElementById("en_view")

function encode(str, fromLang, toLang) {
    let result = []
    str.split("").forEach(element => {
        if (symbols[fromLang].indexOf(element) !== -1) {
            result.push(symbols[toLang][symbols[fromLang].indexOf(element)])
        } else {
            result.push(element)
        }
    })

    result = result.join("")

    sessionStorage.setItem(toLang, result)
    sessionStorage.setItem(fromLang, str)

    return result
}

function savePass() {
    if (!sessionStorage.getItem("en")) {
        return "Pass couldn't saved..."
    }

    localStorage.setItem("en", sessionStorage.getItem("en"))
    localStorage.setItem("ru", sessionStorage.getItem("ru")) // ru сэйвит без проверки

    return "Pass has been saved"
}

function deletePass() {
    localStorage.removeItem("ru")
    localStorage.removeItem("en")

    return "Pass has been deleted"
}

function showPass() {
    const ru = localStorage.getItem("ru")
    const en = localStorage.getItem("en")

    ru_view.innerText = ru ? ru : "Nothing to show"
    en_view.innerText = en ? en : "Nothing to show"
}

function hidePass() {
    ru_view.innerText = "*********"
    en_view.innerText = "*********"
}

function clearView() {
    setTimeout(() => {
        ru_str.innerText = "ru: ----"
        en_str.innerText = "en: ----"
        input.value = ""
    }, 5000)
}

button.ruEncode.addEventListener('click', () => {
    const result = encode(input.value, "en", "ru")

    if (!result) {
        alert('Nothing to encode');
        return;
    }

    ru_str.innerText = `ru: ${result}`
    en_str.innerText = `en: ${input.value}`

    clearView()
})

button.enEncode.addEventListener('click', () => {
    const result = encode(input.value, "ru", "en")

    if (!result) {
        alert('Nothing to encode');
        return;
    }

    ru_str.innerText = `ru: ${input.value}`
    en_str.innerText = `en: ${result}`
    clearView()
})

button.savePass.addEventListener('click', () => {
    const result = savePass()
    alert(result)
})

button.deletePass.addEventListener('click', () => {
    const result = deletePass()
    alert(result)
})

button.showPass.addEventListener('click', () => showPass())
button.hidePass.addEventListener('click', () => hidePass())