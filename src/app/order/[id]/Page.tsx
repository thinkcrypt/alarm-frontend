import OrderDetailsComponent from '@/components/UserProfile/OrderDetailsComponent';

export default async function OrderDetails({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;
	//
	return <OrderDetailsComponent orderId={resolvedParams.id} />;
}
