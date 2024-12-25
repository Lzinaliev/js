const fs = require('fs');

// Функция для выполнения RLE-кодирования
function rleEncode(input) {
    let encoded = '';
    let count = 1;

    // Проходим по строке и ищем повторяющиеся символы
    for (let i = 1; i <= input.length; i++) {
        if (input[i] === input[i - 1] && count < 255) {
            count++;
        } else {
            // Если повторений больше или равно 3, добавляем кодированный сегмент
            if (count >= 3) {
                encoded += `#${count.toString(16).padStart(2, '0')}${input[i - 1]}`;
            } else {
                // Если повторений меньше 3, записываем символы как есть
                encoded += input.slice(i - count, i);
            }
            count = 1;
        }
    }

    return encoded;
}

function rleDecode(encoded) {
    let decoded = '';
    let i = 0;

    while (i < encoded.length) {
        if (encoded[i] === '#' && i + 3 < encoded.length) {
            const countHex = encoded.slice(i + 1, i + 3);
            const char = encoded[i + 3];
            const count = parseInt(countHex, 16);

            if (!isNaN(count) && count >= 3) {
                decoded += char.repeat(count);
                i += 4;
            } else {
                console.error(`Ошибка декодирования: ${encoded.slice(i, i + 4)}`);
                throw new Error('Некорректный формат RLE кодирования.');
            }
        } else {
            decoded += encoded[i];
            i++;
        }
    }

    return decoded;
}

// Функция для расчета коэффициента сжатия
function calculateCompressionRatio(original, compressed) {
    return (1 - compressed.length / original.length) * 100;
}

// Основная программа
function main() {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        console.error('Использование: node rle.js <режим> <входнойФайл> <выходнойФайл>');
        process.exit(1);
    }

    const mode = args[0];
    const inputFile = args[1];
    const outputFile = args[2];

    try {
        const input = fs.readFileSync(inputFile, 'utf-8');

        if (mode === 'code') {
            const encoded = rleEncode(input);
            fs.writeFileSync(outputFile, encoded);
            console.log(`Кодирование завершено. Коэффициент сжатия: ${calculateCompressionRatio(input, encoded).toFixed(2)}%`);
        } else if (mode === 'decode') {
            const decoded = rleDecode(input);
            fs.writeFileSync(outputFile, decoded);
            console.log('Декодирование завершено.');
        } else {
            console.error('Некорректный режим. Используйте "code" или "decode".');
        }
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

main();
