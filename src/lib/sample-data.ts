import { ResumeData } from "./types";

export const sampleResumeData: ResumeData = {
  name: "김지원",
  title: "프론트엔드 개발자",
  birthDate: "1996.04.12",
  email: "jiwon.dev@example.com",
  phone: "010-1234-5678",
  location: "서울특별시",
  website: "github.com/jiwondev",
  summary:
    "3년차 프론트엔드 개발자로 React/TypeScript 기반 서비스를 기획부터 배포까지 주도한 경험이 있습니다. 사용자 지표 개선에 관심이 많습니다.",
  experience: [
    {
      id: "exp-1",
      company: "㈜테크노바",
      role: "프론트엔드 개발자",
      period: "2023.03 - 재직중",
      description:
        "커머스 플랫폼 리뉴얼 프로젝트에서 결제 플로우 UI를 개발하여 결제 전환율을 12% 개선했습니다.",
    },
    {
      id: "exp-2",
      company: "스타트업 그리드",
      role: "주니어 개발자",
      period: "2021.07 - 2023.02",
      description:
        "사내 어드민 대시보드를 신규 구축하고 컴포넌트 라이브러리를 정립했습니다.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "레주메핏",
      period: "2026.08 - 진행중",
      link: "resumefit.vercel.app",
      description:
        "AI 없이 템플릿 편집만으로 이력서 PDF를 만드는 개인 프로젝트. Next.js와 react-pdf로 클라이언트에서 직접 PDF를 생성합니다.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "한국대학교",
      degree: "컴퓨터공학과 학사",
      period: "2017.03 - 2021.02",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "정보처리기사",
      issuer: "한국산업인력공단",
      date: "2021.05",
    },
    {
      id: "cert-2",
      name: "TOEIC 900",
      issuer: "YBM",
      date: "2023.11",
    },
  ],
  activities: [
    {
      id: "act-1",
      title: "사내 해커톤 최우수상",
      org: "㈜테크노바",
      period: "2024.10",
      description: "결제 대기시간 단축 아이디어로 3일간 진행된 해커톤에서 최우수상을 수상했습니다.",
    },
  ],
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Figma"],
};

export const emptyResumeData: ResumeData = {
  name: "",
  title: "",
  birthDate: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  experience: [],
  projects: [],
  education: [],
  certifications: [],
  activities: [],
  skills: [],
};
