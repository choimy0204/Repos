"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { grantPremium } from "@/lib/premium";

type Status = "confirming" | "done" | "error";

export function SuccessClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("confirming");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const paymentKey = searchParams.get("paymentKey");

    if (!orderId || !amount || !paymentKey) {
      setStatus("error");
      setErrorMessage("결제 정보를 확인할 수 없어요.");
      return;
    }

    fetch("/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, amount, paymentKey }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "결제 승인에 실패했어요.");
        grantPremium(data.days);
        setStatus("done");
      })
      .catch((err) => {
        setStatus("error");
        setErrorMessage(err.message || "결제 승인에 실패했어요.");
      });
  }, [searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center">
        {status === "confirming" && (
          <>
            <p className="text-sm text-slate-500">결제를 확인하고 있어요...</p>
          </>
        )}
        {status === "done" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ✓
            </div>
            <h1 className="text-lg font-bold text-slate-900">결제가 완료됐어요</h1>
            <p className="mt-2 text-sm text-slate-500">
              이제 워터마크 없이 이력서를 다운로드할 수 있어요.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-block w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              편집기로 돌아가기
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-lg font-bold text-slate-900">결제 승인에 실패했어요</h1>
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            <Link
              href="/editor"
              className="mt-6 inline-block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              편집기로 돌아가기
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
