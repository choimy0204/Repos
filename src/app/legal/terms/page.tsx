import Link from "next/link";

export const metadata = {
  title: "이용약관 — 레주메핏",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
        ← 홈으로
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">이용약관</h1>
      <p className="mt-1 text-sm text-slate-400">시행일: 2026년 9월 9일</p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">제1조 (목적)</h2>
          <p>
            이 약관은 레주메핏(이하 &quot;회사&quot;)이 운영하는 이력서 템플릿 제작
            서비스(이하 &quot;서비스&quot;)의 이용조건 및 절차, 회사와 이용자의
            권리·의무 및 책임사항을 규정하는 것을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">제2조 (서비스의 내용)</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>이용자가 입력한 정보를 바탕으로 이력서 PDF를 생성하는 서비스입니다.</li>
            <li>회원가입 절차 없이 누구나 무료로 편집 및 미리보기를 이용할 수 있습니다.</li>
            <li>
              워터마크 없는 PDF 다운로드는 유료이며, 요금 및 결제 방식은
              서비스 화면에 안내된 바에 따릅니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">제3조 (회원가입에 관한 사항)</h2>
          <p>
            본 서비스는 별도의 회원가입 절차 없이 이용할 수 있습니다. 결제
            내역 확인을 위한 별도의 계정 시스템을 운영하지 않으며, 결제
            잠금 해제 상태는 이용자의 브라우저(기기)에만 저장됩니다. 브라우저
            저장공간을 삭제하거나 다른 기기·브라우저로 접속하면 잠금 해제
            상태가 유지되지 않을 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">제4조 (이력서 콘텐츠의 저작권)</h2>
          <p>
            이용자가 입력한 이력서 내용(이름, 경력, 학력 등)의 저작권은
            이용자에게 있습니다. 해당 정보는 이용자의 브라우저에서 PDF로
            변환될 뿐, 회사의 서버로 전송되거나 저장되지 않습니다. 자세한
            내용은 <Link href="/legal/privacy" className="text-emerald-700 underline">개인정보처리방침</Link>을 참고해주세요.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">제5조 (결제 및 요금)</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>결제는 토스페이먼츠를 통해 처리되며, 회사는 카드 정보를 직접 수집·저장하지 않습니다.</li>
            <li>1회 다운로드권은 결제 후 24시간 동안 워터마크 없는 PDF를 다운로드할 수 있습니다.</li>
            <li>월 구독은 결제일로부터 30일간 전체 템플릿을 무제한 다운로드할 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">제6조 (청약철회 및 환불)</h2>
          <p>자세한 환불 기준은 <Link href="/legal/refund" className="text-emerald-700 underline">환불정책</Link>에서 안내합니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">제7조 (서비스 이용의 제한)</h2>
          <p>
            이용자는 본 서비스를 타인의 권리를 침해하거나 법령에 위반되는
            목적으로 사용해서는 안 됩니다. 회사는 이용자가 이를 위반한 경우
            서비스 이용을 제한할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">제8조 (면책조항)</h2>
          <p>
            회사는 이용자가 작성한 이력서 콘텐츠의 정확성, 완전성에 대해
            책임지지 않으며, 이력서 제출 결과(서류 통과 여부 등)에 대해
            어떠한 보증도 하지 않습니다. 천재지변, 통신장애 등 회사가 통제할
            수 없는 사유로 서비스가 제공되지 못한 경우 책임이 면제됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">제9조 (약관의 변경)</h2>
          <p>
            회사는 관련 법령을 위반하지 않는 범위에서 이 약관을 변경할 수
            있으며, 변경 시 서비스 내 공지를 통해 사전 안내합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">제10조 (사업자 정보)</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            <dt className="text-slate-400">상호</dt>
            <dd>레주메핏</dd>
            <dt className="text-slate-400">대표자</dt>
            <dd>최민영</dd>
            <dt className="text-slate-400">사업자등록번호</dt>
            <dd>680-01-04304</dd>
            <dt className="text-slate-400">사업장 소재지</dt>
            <dd>경기도 고양시 덕양구 내유길 38-92, A동 201호</dd>
            <dt className="text-slate-400">통신판매업신고번호</dt>
            <dd>신고 진행중</dd>
            <dt className="text-slate-400">문의</dt>
            <dd>[고객 문의용 이메일을 입력해주세요]</dd>
          </dl>
        </section>
      </div>
    </main>
  );
}
