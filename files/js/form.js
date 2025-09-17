document.addEventListener('DOMContentLoaded', function () {
   const phones = document.querySelectorAll('input.phone');

   phones.forEach(input => {
      input.addEventListener('input', () => {
         let raw = input.value;
         let result = '';

         let hasPlus = false;
         let hasOpenParen = false;
         let hasCloseParen = false;
         let lastCharType = ''; // 'digit', '(', ')', '-', 'space', 'plus'
         let digitCount = 0;    // считаем только цифры
         const maxDigits = 12;  // максимум цифр

         let ignoreFirstOne = false; // будем проверять для +1

         for (let i = 0; i < raw.length; i++) {
            const char = raw[i];

            if (char === '+') {
               if (!hasPlus && result.length === 0) {
                  result += '+';
                  hasPlus = true;
                  lastCharType = 'plus';
               }
            } else if (/\d/.test(char)) {
               // проверка на "+1" в начале
               if (hasPlus && result === '+' && char === '1') {
                  result += '1';
                  ignoreFirstOne = true; // эту 1 не считаем
                  lastCharType = 'digit';
                  continue;
               }

               // учитываем цифры только если не превысили лимит
               if (digitCount < maxDigits) {
                  result += char;
                  digitCount++;
                  lastCharType = 'digit';
               }
            } else if (char === '(' && !hasOpenParen) {
               result += '(';
               hasOpenParen = true;
               lastCharType = '(';
            } else if (char === ')' && !hasCloseParen) {
               result += ')';
               hasCloseParen = true;
               lastCharType = ')';
            } else if ((char === ' ' || char === '-') &&
               (lastCharType === 'digit' || lastCharType === ')')) {
               // разрешаем пробел или дефис только после цифры или )
               if (!(lastCharType === ' ' && char === ' ') &&
                  !(lastCharType === '-' && char === '-')) {
                  result += char;
                  lastCharType = char;
               }
            } else {
               continue; // остальные символы игнорируем
            }
         }
         input.value = result;
      });
   });
});