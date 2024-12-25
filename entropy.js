//Энтропия измеряет количество неопределенности, снятой при получении символа, 
// или количество информации, полученной с этим символом. Она зависит от вероятности 
// появления символа: редкие символы несут больше информации, чем частые.

//На вход подается строка — последовательность букв, ввод с консоли.
//Требуется:
//1) построить алфавит (т. е. множество всех различных символов
//исходной строки) и найти частоту для всех символов алфавита, показать на экране:
//символ – количество появлений символа в строке;
//2) для полученной таблицы рассчитать энтропию согласно
//Где n - количество символов в алфавите (т. е. количество всех различных символов
//исходной строки).
//Расчет pi: N – длина строки, ni - количество появлений символа в строке, тогда pi= ni/N.

let argumentsFromConsole = process.argv;
let inputFile = argumentsFromConsole[2];
let testNotNan = inputFile;

if (testNotNan) {
    let testTxt = (inputFile.slice(-4) == '.txt');

    if (testTxt) {
        const fileSystem = require('fs');
        // Чтение содержимого файла
        let input = fileSystem.readFileSync(inputFile, 'utf8');
        // Объект для хранения алфавита и его частот
        let alph = new Object();
        let alphPower = 0; // Мощность алфавита
        let entropy = 0; // Энтропия текста
        let inputLength = input.length; // Длина текста

        // Подсчет частот символов
        for (let i = 0; i < inputLength; i++) {
            if (alph[input.charAt(i)])
                alph[input.charAt(i)]++;
            else
                alph[input.charAt(i)] = 1;
        }

        // Нормализация частот и вычисление мощности алфавита
        for (let i in alph) {
            alphPower++;
            alph[i] /= inputLength;  
        }

        // Вычисление энтропии текста
        if (alphPower > 1) { // Если в алфавите больше одного символа
            for (let i in alph)
                entropy -= alph[i] * Math.log(alph[i]); // Формула энтропии
            entropy /= Math.log(alphPower); // Нормализация по мощности алфавита
        }

        // Вывод энтропии и частот символов
        console.log("Энтропия данного текста =", entropy);
        console.log("\nАлфавит с частотами");
        console.log(alph);
    } else {
        // Ошибка, если файл не имеет расширение .txt
        console.log("ERROR");
    }
} else {
    // Ошибка, если аргумент файла отсутствует
    console.log("ERROR");
}
