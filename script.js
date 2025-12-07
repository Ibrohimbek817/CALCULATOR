const input = document.querySelector(".mon");
const buttons = document.querySelectorAll(".calc button");

let expression = "";

const operators = ["+", "−", "×", "÷", "%"];

function formatNumber(num) {
    if (num.toString().length > 12) {
        return Number(num).toExponential(5);
    }
    return num;
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let val = btn.textContent;
        let last = expression.slice(-1);

        if (val === "AC") {
            expression = "";
            input.value = "";
            return;
        }

        if (val === "←") {
            expression = expression.slice(0, -1);
            input.value = expression;
            return;
        }

        if (val === "=") {
            try {
                let calc = expression
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/")
                    .replace(/%/g, "/100")
                    .replace(/−/g, "-");

                let result = eval(calc);
                result = formatNumber(result);

                expression = result.toString();
                input.value = expression;
            } catch {
                input.value = "Error";
                expression = "";
            }
            return;
        }

        if (operators.includes(val) && expression === "") {
            return;
        }

        if (operators.includes(val) && operators.includes(last)) {
            return;
        }

        if (val === "0") {
            if (expression.endsWith("00")) {
                return;
            }
        }

        if (expression === "" && isNaN(val)) {
            return;
        }

        expression += val;
        input.value = expression;
    });
});
