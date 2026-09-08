import Link from "next/link";

export default async function PaymentFailPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; code?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-lg font-bold text-slate-900">결제가 진행되지 않았어요</h1>
        <p className="mt-2 text-sm text-slate-500">
          {params.message || "결제가 취소되었거나 문제가 발생했어요."}
        </p>
        {params.code && (
          <p className="mt-1 text-xs text-slate-400">오류 코드: {params.code}</p>
        )}
        <Link
          href="/editor"
          className="mt-6 inline-block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          편집기로 돌아가기
        </Link>
      </div>
    </main>
  );
}
