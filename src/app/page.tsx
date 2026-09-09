import Link from "next/link";
import { templateList } from "@/components/templates";
import { pricingPlans } from "@/lib/premium";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <span className="text-lg font-bold tracking-tight text-slate-900">
          레주메핏
        </span>
        <Link
          href="/templates"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          템플릿 보기
        </Link>
      </header>

      <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-10">
        <p className="mb-4 text-sm font-medium text-emerald-700">
          가입 없이, 5분이면 완성
        </p>
        <h1
          className="max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
          style={{ textWrap: "balance" }}
        >
          내용만 채우면
          <br />
          이력서가 완성됩니다
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
          디자인 고민은 템플릿에게 맡기세요. 항목을 입력하는 즉시 PDF
          미리보기가 갱신되고, 마음에 들면 바로 다운로드할 수 있어요.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/templates"
            className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            무료로 시작하기
          </Link>
          <Link
            href="/editor?template=minimal"
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            바로 편집기 열기
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
          템플릿
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {templateList.map((tpl) => (
            <Link
              key={tpl.id}
              href={`/editor?template=${tpl.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm"
            >
              <div
                className="mb-4 h-32 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${tpl.accent}22, ${tpl.accent}08)`,
                  border: `1px solid ${tpl.accent}33`,
                }}
              />
              <h3 className="text-base font-semibold text-slate-900">
                {tpl.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{tpl.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-emerald-700 group-hover:underline">
                이 템플릿으로 시작 →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
          요금
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-slate-900">무료</h3>
            <p className="mt-1 text-3xl font-bold text-slate-900">0원</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
              <li>모든 템플릿 편집</li>
              <li>실시간 PDF 미리보기</li>
              <li>워터마크 포함 다운로드</li>
            </ul>
          </div>
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 ${
                plan.highlight
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <h3 className="text-base font-semibold text-slate-900">
                {plan.name}
              </h3>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                {plan.price.toLocaleString()}원
                <span className="text-sm font-normal text-slate-400">
                  {" "}
                  /{plan.unit}
                </span>
              </p>
              <p className="mt-4 text-sm text-slate-600">{plan.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-slate-200 py-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 레주메핏 · 대표 최민영 · 사업자등록번호 680-01-04304</p>
          <div className="flex gap-4">
            <Link href="/legal/terms" className="hover:text-slate-600">
              이용약관
            </Link>
            <Link href="/legal/privacy" className="hover:text-slate-600">
              개인정보처리방침
            </Link>
            <Link href="/legal/refund" className="hover:text-slate-600">
              환불정책
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
