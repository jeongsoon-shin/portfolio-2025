"use client"

import { createContext, useContext, useState, useEffect } from "react"

// 언어 데이터
const translations = {
  ko: {
    // 네비게이션
    nav: {
      portfolio: "포트폴리오",
      about: "소개",
      contact: "연락처",
      theme: "테마변경",
    },
    // 포트폴리오 페이지
    works: {
      title: "포트폴리오",
      subtitle: "UI 디자이너의 창의적인 작품 모음입니다",
      viewWorks: "작품 보기",
      worksCollection: "작품 모음",
      description: "다양한 프로젝트와 디자인 작업을 살펴보세요",
      categories: {
        all: "전체",
        game: "게임",
        web: "웹",
        interview: "인터뷰",
      },
      viewProject: "작품 보기",
      interviewTitle: "인터뷰",
      userCentric: "사용자 중심",
      userCentricDesc: "모든 디자인 결정은 사용자의 니즈와 경험을 최우선으로 고려합니다.",
      accessibility: "접근성",
      accessibilityDesc: "모든 사용자가 쉽게 접근하고 사용할 수 있는 포용적인 디자인을 추구합니다.",
      innovation: "혁신",
      innovationDesc: "새로운 아이디어와 기술을 탐구하여 독창적이고 효과적인 솔루션을 제공합니다.",
      quote: '"디자인은 단순히 보이는 것이 아니라, 작동하는 방식입니다"',
    },
    // 프로젝트 상세 페이지
    project: {
      viewAll: "모든 작품 보기",
      viewPrev: "PREV",
      viewNext: "NEXT",
      overview: "프로젝트 개요",
      jobDescription: "담당 업무 내용",
      with: "와 함께한",
      project: "프로젝트",
      client: "클라이언트",
      duration: "기간",
      year: "연도",
      detailsTitle: "개요",
      processTitle: "프로세스",
      toolsTitle: "사용 도구",
      details: "프로젝트 상세 정보",
      process: "디자인 프로세스",
      tools: "사용 도구",
      gallery: "프로젝트 갤러리",
      visitWebsite: "프로젝트 웹사이트 방문하기",
    },
    // 소개 페이지
    about: {
      title: "소개",
      subtitle: "UI 디자이너의 경력과 스킬에 대해 알아보세요",
      name: "이름",
      job: "UI/UX디자이너",
      intro: "소개",
      introText:
        "7년 이상의 경력을 가진 UI/UX 디자이너입니다. 사용자 중심 디자인과 시각적으로 매력적인 인터페이스 제작에 열정을 가지고 있습니다. 다양한 산업 분야의 프로젝트를 통해 사용자 경험을 개선하고 비즈니스 목표를 달성하는 디자인을 제공합니다.",
      contact: "연락처",
      interests: "관심 분야",
      experience: "경력",
      education: "교육",
      interviews: "인터뷰",
      skills: "스킬",
      contactButton: "연락하기",
    },
    // 연락처 페이지
    contact: {
      title: "연락처",
      subtitle: "궁금한 점이 있으시면 언제든지 연락해주세요",
      info: "연락처 정보",
      email: "이메일",
      phone: "전화번호",
      addresstitle: "주소",
      address: "서울특별시 강남구 테헤란로 123",
      socialMedia: "소셜 미디어",
      sendMessage: "메시지 보내기",
      name: "이름",
      subject: "제목",
      message: "메시지",
      sending: "전송 중...",
      send: "메시지 전송",
      success: "메시지가 전송되었습니다!",
      successDesc: "빠른 시일 내에 답변 드리겠습니다.",
      newMessage: "새 메시지 작성",
      location: "찾아오시는 길",
      namePlaceholder: "이름을 입력하세요",
      emailPlaceholder: "이메일을 입력하세요",
      subjectPlaceholder: "제목을 입력하세요",
      messagePlaceholder: "메시지를 입력하세요",
    },
    // 언어 선택
    language: {
      ko: "한국어",
      en: "영어",
      ja: "일본어",
    },
  },
  en: {
    // Navigation
    nav: {
      portfolio: "Portfolio",
      about: "About",
      contact: "Contact",
      theme: "Toggle Theme",
    },
    // Portfolio page
    works: {
      title: "Portfolio",
      subtitle: "A collection of creative works by a UI designer",
      viewWorks: "View Works",
      worksCollection: "Works Collection",
      description: "Explore various projects and design works",
      categories: {
        all: "All",
        game: "Game",
        web: "Web",
        interview: "Interview",
      },
      viewProject: "View Project",
      interviewTitle: "Interview",
      userCentric: "User-Centric",
      userCentricDesc: "All design decisions prioritize user needs and experiences.",
      accessibility: "Accessibility",
      accessibilityDesc: "We pursue inclusive design that all users can easily access and use.",
      innovation: "Innovation",
      innovationDesc: "We explore new ideas and technologies to provide original and effective solutions.",
      quote: '"Design is not just what it looks like, but how it works"',
    },
    // Project detail page
    project: {
      viewAll: "View All Works",
      viewPrev: "View Prev Work",
      viewNext: "View Next Work",
      overview: "Project Overview",
      jobDescription: "Job Description",
      with: "with",
      project: "project",
      client: "Client",
      duration: "Duration",
      year: "Year",
      detailsTitle: "Details",
      processTitle: "Process",
      toolsTitle: "Tools",
      details: "Project Details",
      process: "Design Process",
      tools: "Tools Used",
      gallery: "Project Gallery",
      visitWebsite: "Visit Project Website",
    },
    // About page
    about: {
      title: "About",
      subtitle: "Learn about the UI designer's career and skills",
      name: "Name",
      job: "UI/UX Designer",
      intro: "Introduction",
      introText:
        "I am a UI/UX designer with over 7 years of experience. I am passionate about user-centered design and creating visually appealing interfaces. Through various industry projects, I provide designs that improve user experience and achieve business goals.",
      contact: "Contact",
      interests: "Interests",
      experience: "Experience",
      education: "Education",
      interviews: "Interviews",
      skills: "Skills",
      contactButton: "Contact Me",
    },
    // Contact page
    contact: {
      title: "Contact",
      subtitle: "Feel free to reach out if you have any questions",
      info: "Contact Information",
      email: "Email",
      phone: "Phone",
      addresstitle: "Address",
      address: "Address",
      socialMedia: "Social Media",
      sendMessage: "Send Message",
      name: "Name",
      subject: "Subject",
      message: "Message",
      sending: "Sending...",
      send: "Send Message",
      success: "Message Sent!",
      successDesc: "We will get back to you soon.",
      newMessage: "Write New Message",
      location: "Location",
      namePlaceholder: "Enter your name",
      emailPlaceholder: "Enter your email",
      subjectPlaceholder: "Enter subject",
      messagePlaceholder: "Enter your message",
    },
    // Language selection
    language: {
      ko: "Korean",
      en: "English",
      ja: "Japanese",
    },
  },
  ja: {
    // ナビゲーション
    nav: {
      portfolio: "Works", // ポートフォリオ
      about: "About", // 紹介
      contact: "Contact", // お問い合わせ
      theme: "テーマ変更",
    },
    // ポートフォリオページ
    works: {
      title: "PORTFOLIO : WORKS",
      subtitle: "これまでに携わってきた制作実績について",
      viewWorks: "作品と業務内容を見る",
      worksTitle: "WORKS",
      worksDescription: "様々なプロジェクトで制作を担当した制作実績と業務内容について紹介します。",
      categories: {
        all: "全て",
        game: "GAME",
        web: "WEB",
        interview: "INTERVIEW",
      },
      viewProject: "詳細内容を見る",
      interviewTitle: "INTERVIEW",
      interviewDescription: "専門誌や社内メディアで紹介されたインタビュー記事をご紹介します。",
      userCentric: "ユーザー中心",
      userCentricDesc: "すべてのデザイン決定は、ユーザーのニーズと経験を最優先に考慮します。",
      accessibility: "アクセシビリティ",
      accessibilityDesc: "すべてのユーザーが簡単にアクセスして使用できる包括的なデザインを追求します。",
      innovation: "革新",
      innovationDesc: "新しいアイデアと技術を探求し、独創的で効果的なソリューションを提供します。",
      quote: '"デザインは見た目だけでなく、どのように機能するかです"',
    },
    // プロジェクト詳細ページ
    project: {
      viewAll: "リストに戻る",
      viewPrev: "前のプロジェクト",
      viewNext: "次のプロジェクト",
      // viewAll: "View All Works",
      // viewPrev: "View Prev Work",
      // viewNext: "View Next Work",
      overview: "プロジェクトの紹介",
      jobDescription: "プロジェクトでの担当業務内容",
      with: "と一緒に",
      project: "プロジェクト",
      client: "クライアント",
      duration: "期間",
      year: "年度",
      detailsTitle: "概要",
      processTitle: "プロセス",
      toolsTitle: "使用ツール",
      details: "プロジェクト詳細",
      process: "担当業務内容",
      tools: "使用ツール",
      visitWebsite: "公式サイトへ移動",
    },
    // 紹介ページ
    about: {
      title: "PORTFOLIO : ABOUT ME",
      subtitle: "簡単な自己紹介と経歴やスキルについて",
      name: "申 政淳",
      name_kana: "（シン ジョンスン）",
      job: "UIアニメーションデザイナー / インタラクティブデザイナー",
      intro: "自己紹介",
      introText:[
        "私はこれまで、複数のプロジェクトにおいてUIアニメーションセクションのリードとして、ディレクション、マネジメント、進行管理を担当してまいりました。長年の経験と培ってきた技術力を活かし、プロジェクト全体の品質向上に貢献できたと自負しております。また、Webデザイナーおよびフロントエンドエンジニアとしての経験もあり、ゲーム開発現場ではエンジニアとの円滑なコミュニケーションや、実装レベルでのサポートも可能です。",
        "さらに、UnityのuGUIを使用したUI実装にも対応しており、UIアニメーションの制御、Shaderとの連携によるリッチな表現、レイアウトの最適化など、設計から実装まで幅広く手がけてきました。ビジュアル面のクオリティと実装効率のバランスを意識した開発が可能です。",
        "技術とデザイン、双方の視点を持っていることが私の強みです。マネジメント面では、職種リーダーやプロジェクトセクションのリード、新人育成など、さまざまな立場でマネジメントに携わってきました。その経験を活かし、チームのモチベーション維持やスムーズな進行管理にも自信があります。",
        "また、技術力とマネジメント経験に裏打ちされたコミュニケーション力も私の強みです。常に相手の立場に立った対話を心がけており、「話しやすい」と言っていただくことも多く、チーム内外との良好な関係構築にも寄与しています。"],
      contact: "連絡先（SNS）",
      interests: "関心分野",
      experience: "経歴",
      education: "教育",
      interviews: "インタビュー",
      skills: "スキル",
      contactButton: "お問い合わせ",
    },
    // お問い合わせページ
    contact: {
      title: "お問い合わせ",
      subtitle: "ご質問がありましたらいつでもご連絡ください",
      info: "連絡先情報",
      email: "メール",
      phone: "電話番号",
      addresstitle: "住所",
      address: "住所",
      socialMedia: "ソーシャルメディア",
      sendMessage: "メッセージを送る",
      name: "名前",
      subject: "件名",
      message: "メッセージ",
      sending: "送信中...",
      send: "メッセージを送信",
      success: "メッセージが送信されました！",
      successDesc: "早急にご返信いたします。",
      newMessage: "新しいメッセージを作成",
      location: "アクセス",
      namePlaceholder: "名前を入力してください",
      emailPlaceholder: "メールアドレスを入力してください",
      subjectPlaceholder: "件名を入力してください",
      messagePlaceholder: "メッセージを入力してください",
    },
    // 言語選択
    language: {
      ko: "韓国語",
      en: "英語",
      ja: "日本語",
    },
  },
}

// 언어 컨텍스트 생성
const LanguageContext = createContext()

// 언어 제공자 컴포넌트
export function LanguageProvider({ children }) {
  // 브라우저의 기본 언어 감지 (기본값: 한국어)
  const [language, setLanguage] = useState("ja")

  useEffect(() => {
    setLanguage("ja")

    /*
    // 로컬 스토리지에서 언어 설정 불러오기
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      // 브라우저 언어 감지
      const browserLang = navigator.language.split("-")[0]
      if (["ko", "en", "ja"].includes(browserLang)) {
        setLanguage(browserLang)
        localStorage.setItem("language", browserLang)
      }
    }
      */
  }, [])

  // 언어 변경 함수
  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  // 번역 함수
  const t = (key) => {
    const keys = key.split(".")
    let value = translations[language]

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        return key // 번역이 없는 경우 키 반환
      }
    }

    return value
  }

  return <LanguageContext.Provider value={{ language, changeLanguage, t }}>{children}</LanguageContext.Provider>
}

// 언어 컨텍스트 사용 훅
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
