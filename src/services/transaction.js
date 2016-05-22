class Transaction {
  findFor(expenses, travelers) {
    // summed total expenses
    const totalExpenses = expenses.reduce((sum, item) => {
      return Number(sum) + Number(item.cost);
    }, 0);

    // expense per person
    const avgExpense = totalExpenses / travelers.length;

    // group expenses by traveler
    const travelersWithExpenses = expenses.reduce((obj, expense) => {
      obj[expense.payer] = parseFloat(obj[expense.payer] || 0) + parseFloat(expense.cost);
      return obj;
    }, {});

    // add those who didn't pay for anything
    travelers.forEach(traveler => {
      if (!travelersWithExpenses.hasOwnProperty(traveler)) {
        travelersWithExpenses[traveler] = 0;
      }
    });

    // subtract avg expenses from each traveler to get balance
    // from { me: 1010, you: 0 } to => { me: 505, you: -505 }
    const travelersWithBalance = {};
    for (let traveler in travelersWithExpenses) {
      travelersWithBalance[traveler] = travelersWithExpenses[traveler] - avgExpense;
    }

    // for each traveler with less than 0 balance,
    // loop over other travelers until finding one with > 0 balance,
    let transactions = []; // [{ payer: 'me', payee: 'you', amount: 505 }]
    for (let travelerA in travelersWithBalance) {
      while (travelersWithBalance[travelerA] < 0) {
        // iterate over other travelers to find a traveler with positive balance,
        for (let travelerB in travelersWithBalance) {
          if (travelersWithBalance[travelerA] === 0) { break; }
          if (travelersWithBalance[travelerB] > 0) {
            // then compare the two balances:
            //    if (abs value) travelerA balance is >= travelerB,
            if (-travelersWithBalance[travelerA] > travelersWithBalance[travelerB]) {
              // create a list item for full balance of travelerB,
              transactions.push({ payer: travelerA, payee: travelerB, amount: parseFloat(travelersWithBalance[travelerB]).toFixed(2) });
              // then zero out travelerB and add travelerB balance from A
              travelersWithBalance[travelerA] = travelersWithBalance[travelerA] + travelersWithBalance[travelerB];
              travelersWithBalance[travelerB] = 0;
            } else if (-travelersWithBalance[travelerA] < travelersWithBalance[travelerB]) {
              // create a list item for full balance of travelerA,
              transactions.push({ payer: travelerA, payee: travelerB, amount: parseFloat(-travelersWithBalance[travelerA]).toFixed(2) });
              // then zero out travelerA and subtract travelerA balance from B
              travelersWithBalance[travelerB] = travelersWithBalance[travelerB] + travelersWithBalance[travelerA];
              travelersWithBalance[travelerA] = 0;
            }
          }
        }
      }
    }

    return transactions;
  }
}

export default new Transaction();
