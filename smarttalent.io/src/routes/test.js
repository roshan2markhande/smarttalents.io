let l_cb = get_item_value('bf.ch_alloc_dramt', 'current_record');
let l_nn2 = 0;
let lnn2fc = 0;
if (l_cb == 'Y') {
    let amountLeftToAllocate = get_item_value('bf.temp_dramt', 'current_record');
    let amountLeftToAllocatefc = get_item_value('bf.temp_fc_dramt', 'current_record');

    let amountToAllocate = '';

    let amountToAllocateFc = '';
    for (let i = 0; i < count(':at.cr_bal_alloc_amt'); i++) {
        if (amountLeftToAllocate <= 0) {
            break;
        }
        let l_bill_amt = get_item_value(':at.cr_bal_alloc_amt', i);
        let l_bill_amt_fc = get_item_value(':at.fc_cr_bal_alloc_amt', i);

        let l_allocatedAmount = get_item_value(':at.tran_cr_alloc_amt', i);
        let l_allocatedAmountFc = get_item_value(':at.tran_fc_cr_alloc_amt', i);


        l_allocatedAmount ? l_allocatedAmount : l_allocatedAmount = 0;
        l_allocatedAmountFc ? l_allocatedAmountFc : l_allocatedAmountFc = 0;


        let balanceToPay = l_bill_amt - l_allocatedAmount;
        let balanceToPayFc = l_bill_amt_fc - l_allocatedAmountFc;

        if (balanceToPay > 0) {
            (amountLeftToAllocate > balanceToPay) ? amountToAllocate = balanceToPay : amountToAllocate = amountLeftToAllocate;
            set_item_value(':at.tran_cr_alloc_amt', i, amountToAllocate.toFixed(2));
            l_nn2 = ((l_bill_amt ? l_bill_amt : l_bill_amt = 0) - amountToAllocate.toFixed(3));
            set_item_value(':at.fc_curr_balance', i, l_nn2.toFixed(3));
            amountLeftToAllocate -= amountToAllocate;
        }
        if (balanceToPayFc > 0) {
            (amountLeftToAllocatefc > balanceToPayFc) ? amountToAllocateFc = balanceToPayFc : amountToAllocateFc = amountLeftToAllocatefc;
            set_item_value(':at.tran_fc_cr_alloc_amt', i, amountToAllocateFc.toFixed(2));
            lnn2fc = ((l_bill_amt_fc ? l_bill_amt_fc : l_bill_amt_fc = 0) - amountToAllocateFc.toFixed(3));
            set_item_value(':at.fc_curr_balanceFc', i, lnn2fc.toFixed(3));
            amountLeftToAllocatefc -= amountToAllocateFc;
        }


    }

    if (amountLeftToAllocate > 0) {
        alert(`Amount left undistributed: ${amountLeftToAllocate}`);
    }
} else {
    for (let k = 0; k < count(':at.cr_bal_alloc_amt'); k++) {
        set_item_value(':at.tran_cr_alloc_amt', k, '0');
        set_item_value(':at.tran_fc_cr_alloc_amt', k, '0');
        let l_bill_amt = get_item_value(':at.cr_bal_alloc_amt', k);
        l_nn2 = ((l_bill_amt ? l_bill_amt : l_bill_amt = 0) - 0);
        set_item_value(':at.fc_curr_balance', k, l_nn2.toFixed(3));
    }
}
app_execute_item(':at.tran_cr_alloc_amt', 'app_js1_text');
