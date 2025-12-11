export type BulkDiscount = {
	minQuantity: number;
	price: number;
};

export function getBulkUnitPrice(
	qty: number,
	basePrice: number,
	bulkDiscounts?: BulkDiscount[]
) {
	if (!bulkDiscounts?.length || qty <= 0) return basePrice;

	const tiers = [...bulkDiscounts].sort(
		(a, b) => a.minQuantity - b.minQuantity
	);

	let unitPrice = basePrice;
	for (const tier of tiers) {
		if (qty >= tier.minQuantity) unitPrice = tier.price;
		else break;
	}

	return unitPrice;
}
