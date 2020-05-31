export declare enum CardBrand {
    americanExpress = "american express",
    dinersClub = "diners club",
    discover = "discover",
    jcb = "jcb",
    mastercard = "mastercard",
    unionpay = "unionpay",
    visa = "visa"
}
export declare class Card {
    brand: string;
    expMonth: number;
    expMonthString: string;
    expYear: number;
    last4: string;
}
