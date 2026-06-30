import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import OrderForm from "@/components/order/OrderForm";

export const metadata: Metadata = {
  title: "הזמנה ותשלום | Portal Studio",
  description:
    "השלמת הזמנת מנוי Portal Studio — מערכת AI לניהול עסקים. מילוי פרטים ואישור תקנון לפני מעבר לתשלום מאובטח.",
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "#062340" }}
            >
              השלמת ההזמנה
            </h1>
            <p className="mt-3 text-lg font-body" style={{ color: "#374151" }}>
              עוד כמה פרטים ואנחנו מעבירים אותך לתשלום מאובטח.
            </p>
          </header>
          <Suspense fallback={<p className="font-body" style={{ color: "#374151" }}>טוען…</p>}>
            <OrderForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
