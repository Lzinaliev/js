//Суть реализации:
//Таблица плохих символов:

//Хранит индекс последнего вхождения каждого символа в шаблоне.
//Используется для вычисления сдвига шаблона, если символ из текста не совпал с соответствующим символом в шаблоне.
//Эвристика хорошего суффикса:

//Вычисляет сдвиг шаблона так, чтобы совпавший суффикс выровнялся с таким же суффиксом или его подходящей позицией в шаблоне.
//Основной цикл:

//Сравнивает символы шаблона и текста справа налево.
//Если шаблон полностью совпадает, добавляет позицию в результат.
//При несовпадении рассчитывает новый сдвиг на основе таблицы плохих символов и длины совпавшего суффикса.

const fs = require('fs');

// Функция поиска Boyer-Moore
function boyerMooreSearch(text, pattern) {
    const textLength = text.length;
    const patternLength = pattern.length;

    // Построение таблицы плохих символов
    function buildBadCharTable(pattern) {
        const table = {};
        for (let i = 0; i < pattern.length; i++) {
            table[pattern[i]] = i; // Последняя позиция каждого символа
        }
        return table;
    }

    // Вычисление сдвига по хорошему суффиксу
    function goodSuffix(pattern, l) {
        function rpr(l, pattern) {
            const m = pattern.length;
            const extendedPattern = '*'.repeat(m) + pattern;

            for (let k = m - l; k >= -m + 1; k--) {
                const segment = extendedPattern.slice(k + m, k + m + l);
                const suffix = pattern.slice(m - l);

                if (
                    segment === suffix &&
                    (k <= 0 || pattern[k - 1] !== pattern[m - l - 1])
                ) {
                    return k; // Возвращает позицию совпадения
                }
            }

            return -m + 1; // Если совпадений нет
        }

        const m = pattern.length;
        const k = rpr(l, pattern);
        return m - k - l + 1; // Сдвиг по хорошему суффиксу
    }

    const badCharTable = buildBadCharTable(pattern); // Построить таблицу плохих символов
    const result = [];

    let shift = 0; // Текущее смещение шаблона
    while (shift <= textLength - patternLength) {
        let j = patternLength - 1;

        // Сравнение шаблона с текстом справа налево
        while (j >= 0 && pattern[j] === text[shift + j]) {
            j--;
        }

        if (j < 0) { // Если найдено совпадение
            result.push(shift);
            shift += patternLength; // Сдвинуть на длину шаблона
        } else {
            let l = 0;
            // Вычислить длину совпавшего суффикса
            while (l < patternLength && text[shift + patternLength - 1 - l] === pattern[patternLength - 1 - l]) {
                l++;
            }

            // Сдвиг по плохому символу и хорошему суффиксу
            const badCharShift = j - (badCharTable[text[shift + j]] || -1);
            const goodSuffixShift = l > 0 ? goodSuffix(pattern, l) : 1;

            // Выбрать максимальный сдвиг
            shift += Math.max(goodSuffixShift, badCharShift);
        }
    }

    return result;
}

// Чтение данных из файлов
const textFilePath = './text.txt'; // Путь к файлу с текстом
const patternFilePath = './pattern.txt'; // Путь к файлу с шаблоном

try {
    // Считывание текста и шаблона из файлов
    const text = fs.readFileSync(textFilePath, 'utf-8').trim();
    const pattern = fs.readFileSync(patternFilePath, 'utf-8').trim();

    // Поиск совпадений
    const result = boyerMooreSearch(text, pattern);
    console.log("Позиции совпадений:", result);
} catch (err) {
    console.error("Ошибка чтения файла:", err.message);
}
