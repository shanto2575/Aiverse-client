import PaymentLogsTable from "@/components/Dashboard/admin/PaymentLogsTable";
import { getAdminPayments } from "@/lib/admin/data";

const PaymentsPage = async () => {
    const payments = await getAdminPayments();

    return (
        <div>
            <div className="p-4 md:p-6 border-b border-[#dfcbaf]">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2c221e]">
                    Stripe Premium Payments Log
                </h2>
                <p className="text-[#2c221e]/70 mt-2 text-xs md:text-sm">
                    Comprehensive database of customer subscription transactions.
                </p>
            </div>
            <section className="w-full min-h-screen p-4 md:p-6 lg:p-8">
                <PaymentLogsTable payments={payments} />
            </section>
        </div>
    );
};

export default PaymentsPage;