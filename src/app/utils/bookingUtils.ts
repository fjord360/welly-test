export const getTicketName = (ticket_type: any) => {
	if (ticket_type === "super_earlybird") {
		return "슈퍼 얼리버드";
	} else if (ticket_type === "earlybird") {
		return "얼리버드";
	} else if (ticket_type === "confirmed") {
		return "출발확정";
	} else if (ticket_type === "lastcall") {
		return "라스트콜";
	}
	return "--";
}

export const formatPrice = (price: number) => {
	if (price >= 10000000) {
		return `${Math.floor(price / 10000)}천만원`;
	} else if (price >= 1000000) {
		return `${Math.floor(price / 10000)}만원`;
	} else if (price >= 10000) {
		return `${Math.floor(price / 10000)}만원`;
	} else {
		return `${price.toLocaleString()}원`;
	}
}