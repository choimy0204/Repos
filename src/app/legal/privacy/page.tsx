import Link from "next/link";

export const metadata = {
  title: "개인정보처리방침 — 레주메핏",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
        ← 홈으로
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">개인정보처리방침</h1>
      <p className="mt-1 text-sm text-slate-400">시행일: 2026년 9월 9일</p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-slate-700">
        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-medium text-emerald-800">핵심 요약</p>
          <p className="mt-1 text-emerald-800">
            이력서에 입력하는 이름·연락처·경력 등의 내용은 이용자의 브라우저
            안에서만 PDF로 변환되며, 회사의 서버로 전송되거나 저장되지
            않습니다. 회사가 실제로 수집하는 개인정보는 결제 처리에 필요한
            최소한의 정보뿐입니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">1. 수집하는 개인정보 항목</h2>
          <p className="mb-2">회사는 다음의 경우에만 개인정보를 수집합니다.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>결제 시</strong>: 결제 대행사인 토스페이먼츠를 통해
              결제가 처리되며, 카드번호 등 결제 수단 정보는 회사가 직접
              수집·저장하지 않고 토스페이먼츠가 처리합니다. 회사는 결제
              승인 결과(주문번호, 결제금액, 결제 상태)만 전달받습니다.
            </li>
            <li>
              <strong>서비스 이용 과정에서 자동 수집되는 정보</strong>:
              접속 IP, 브라우저 종류, 방문 일시 등 서비스 운영을 위한
              접속 로그가 호스팅사(Vercel)를 통해 자동 생성될 수 있습니다.
            </li>
          </ul>
          <p className="mt-2">
            이력서 편집 화면에 입력하는 이름, 이메일, 전화번호, 경력, 학력
            등의 내용은 회사가 수집하는 개인정보에 해당하지 않습니다. 이
            정보는 이용자의 브라우저 메모리 안에서만 처리되어 PDF 파일로
            변환되고, 어떠한 서버에도 전송되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">2. 개인정보의 이용 목적</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>결제 승인 처리 및 결제 관련 문의 대응</li>
            <li>서비스 부정 이용 방지 및 안정적인 서비스 운영</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">3. 개인정보의 보유 및 이용 기간</h2>
          <p>
            회사는 자체적으로 결제 정보를 저장하지 않습니다. 결제 관련
            기록은 관계 법령(전자상거래법 등)에 따라 결제대행사인
            토스페이먼츠가 일정 기간 보관하며, 이는 토스페이먼츠의
            개인정보처리방침을 따릅니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">4. 개인정보의 제3자 제공 및 처리 위탁</h2>
          <p className="mb-2">
            회사는 원활한 결제 처리를 위해 아래와 같이 업무를 위탁하고
            있습니다.
          </p>
          <table className="w-full border-collapse overflow-hidden rounded-lg border border-slate-200 text-left text-xs">
            <thead className="bg-slate-50">
              <tr>
                <th className="border-b border-slate-200 px-3 py-2">수탁자</th>
                <th className="border-b border-slate-200 px-3 py-2">위탁업무</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2">토스페이먼츠(주)</td>
                <td className="px-3 py-2">결제 처리 및 결제 승인</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Vercel Inc.</td>
                <td className="px-3 py-2">웹사이트 호스팅 및 접속 로그 처리</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">5. 이용자의 권리</h2>
          <p>
            이용자는 언제든지 자신의 개인정보 처리 현황에 대해 문의할 수
            있으며, 아래 문의처를 통해 열람·정정·삭제를 요청할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">6. 개인정보 보호책임자 및 문의처</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            <dt className="text-slate-400">책임자</dt>
            <dd>최민영 (레주메핏 대표)</dd>
            <dt className="text-slate-400">문의</dt>
            <dd>[고객 문의용 이메일을 입력해주세요]</dd>
          </dl>
        </section>
      </div>
    </main>
  );
}
