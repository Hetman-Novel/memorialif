document.addEventListener('DOMContentLoaded', function () {
   const phones = document.querySelectorAll('input.phone');

   // phone
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

   // add service
   const wrapper = document.querySelector(".services-wrapper");
   const addBtn = document.querySelector(".add-service");

   if (!wrapper || !addBtn) return;

   addBtn.addEventListener("click", function () {
      const newRow = document.createElement("div");
      newRow.classList.add("service-row");
      newRow.innerHTML = `
         <select name="service[]" class="add-select-service">
         <option value="" selected disabled>Обрати послугу</option>
            <option value="" selected disabled>Обрати послугу</option>
            <option value="Прибирання могил">Прибирання могил</option>
            <option value="Догляд за могилами">Догляд за могилами</option>
            <option value="Прибирання території">Прибирання території</option>
            <option value="Вологе прибирання">Вологе прибирання</option>
            <option value="Полив та заміна квітів">Полив та заміна квітів</option>
            <option value="Очищення від бур’яну">Очищення від бур’яну</option>
            <option value="Фарбування огорож">Фарбування огорож</option>
            <option value="Організація похорону">Організація похорону</option>
            <option value="Сервіс пам’ятників">Сервіс пам’ятників</option>
            <option value="Інше">Інше</option>
         </select>
         <button type="button" class="remove-service js-remove-service"></button>`;
      wrapper.appendChild(newRow);

      // Initialize the newly added select
      $(newRow).find(".add-select-service").select2({
         placeholder: "Обрати послугу",
         theme: 'custom-select',
         width: "100%"
      });
   });

   wrapper.addEventListener("click", function (e) {
      if (e.target.classList.contains("js-remove-service")) {
         e.target.closest(".service-row").remove();
      }
   });
});