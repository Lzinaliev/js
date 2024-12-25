const ALPHABET_SIZE = 26;

// Функция для шифрования и дешифрования текста
function caesarCipher(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char >= 'A' && char <= 'Z') { //Проверка, является ли символ заглавной буквой, то есть находится ли он в диапазоне A-Z.
            // Код символов: А - 65, Z - 90
            result += String.fromCharCode((char.charCodeAt(0) - 'A'.charCodeAt(0) + shift + ALPHABET_SIZE) % ALPHABET_SIZE + 'A'.charCodeAt(0));
            //Вычитая 65 (код символа 'A'), мы получаем позицию буквы относительно начала алфавита.
            //Если после добавления сдвига позиция выходит за пределы алфавита, оператор % возвращает её обратно в диапазон.
            //Добавляем базовое значение 'A' (или 'a' для строчных букв), чтобы получить корректный код нового символа.
        } else if (char >= 'a' && char <= 'z') { // Строчные буквы
            //'a' — это символ с кодом 97, 'z' — с кодом 122.
            result += String.fromCharCode((char.charCodeAt(0) - 'a'.charCodeAt(0) + shift + ALPHABET_SIZE) % ALPHABET_SIZE + 'a'.charCodeAt(0));
        } else {
            result += char; // Остальные символы остаются без изменений
        }
    }
    return result;
}

// Пример использования
const inputText = "Hello, World!";
const shift = 3;

const encryptedText = caesarCipher(inputText, shift);
console.log("Зашифрованный текст:", encryptedText);

const decryptedText = caesarCipher(encryptedText, -shift);
console.log("Дешифрованный текст:", decryptedText);

