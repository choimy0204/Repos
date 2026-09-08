import Link from "next/link";
import { templateList } from "@/components/templates";

export default function TemplatesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
          레주메핏
        </Link>
      </header>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20 pt-6">
        <h1 className="text-2xl font-bold text-slate-900">템플릿 선택</h1>
        <p className="mt-2 text-sm text-slate-500">
          원하는 스타일을 고르면 바로 편집기로 이동해요. 언제든 다른 템플릿으로
          바꿀 수 있어요.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {templateList.map((tpl) => (
            <Link
              key={tpl.id}
              href={`/editor?template=${tpl.id}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-md"
            >
              <div
                className="flex h-56 items-center justify-center"
                style={{
                  background: `linear-gradient(160deg, ${tpl.accent}1a, ${tpl.accent}05)`,
                }}
              >
                <div
                  className="h-40 w-28 rounded-sm bg-white shadow-sm"
                  style={{ border: `1px solid ${tpl.accent}40` }}
                >
                  <div
                    className="h-8"
                    style={{ background: `${tpl.accent}` }}
                  />
                  <div className="space-y-1.5 p-2.5">
                    <div className="h-1.5 w-3/4 rounded bg-slate-200" />
                    <div className="h-1.5 w-full rounded bg-slate-100" />
                    <div className="h-1.5 w-full rounded bg-slate-100" />
                    <div className="h-1.5 w-2/3 rounded bg-slate-100" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-base font-semibold text-slate-900">
                  {tpl.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{tpl.description}</p>
                <span className="mt-3 inline-block text-sm font-medium text-emerald-700 group-hover:underline">
                  이 템플릿으로 시작 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
