import { Font } from "@react-pdf/renderer";

let registered = false;

/** Pretendard(한글 지원 폰트)를 react-pdf에 등록한다. 여러 번 호출해도 안전하다. */
export function registerPdfFonts() {
  if (registered) return;
  registered = true;

  Font.register({
    family: "Pretendard",
    fonts: [
      { src: "/fonts/Pretendard-Regular.ttf", fontWeight: 400 },
      { src: "/fonts/Pretendard-SemiBold.ttf", fontWeight: 600 },
      { src: "/fonts/Pretendard-Bold.ttf", fontWeight: 700 },
    ],
  });

  // 기본 하이픈 분리 로직이 한글 단어를 이상하게 끊어버리는 것을 방지
  Font.registerHyphenationCallback((word) => [word]);
}
