Vue.component('app-convert', {
    template: `
        <div>
            <!-- Input Field -->
            <div class="form-group">
                <label for="numberInput">Enter number from 1 to 99:</label>
                <input type="number" id="numberInput" v-model.number="numVar" class="form-control" placeholder="Enter a number" min="1" max="99">
            </div>

            <!-- Roman Numeral Output -->
            <div class="output" v-if="numVar >= 1 && numVar <= 99">
                {{ numVar | num2roman }}
            </div>
            <div class="output" v-else>
                Please enter a number between 1 and 99.
            </div>
        </div>
    `,
    data: function() {
        return {
            numVar: '' // Holds the input number
        };
    },
    filters: {
        num2roman: function(myNum) {
            if (!myNum) return '';
            const romanNumerals = [
                ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], 
                ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
            ];
            let result = '';
            for (let [roman, value] of romanNumerals) {
                while (myNum >= value) {
                    result += roman;
                    myNum -= value;
                }
            }
            return result;
        }
    }
});

new Vue({
    el: '#app'
});
