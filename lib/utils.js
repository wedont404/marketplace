// Updated currency from USD to RWF
const currency = 'RWF';

function formatCurrency(amount) {
    return `${currency} ${amount.toFixed(2)}`;
}

module.exports = { currency, formatCurrency };