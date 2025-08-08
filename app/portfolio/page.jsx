"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/i18n"
import { useBreakpoint } from "@/hooks/use-media-query"
import { Play, ArrowUpRight, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { PageTransition, Stagger, StaggerItem, ScrollRevealMotion } from "@/components/animations"
import ReactGA from "react-ga4";
import InteractiveCard from "@/components/interactive-card"
import Navbar from "@/components/navbar"
import OptimizedImage from "@/components/optimized-image"
import ParallaxHero from "@/components/parallax-hero"
import ParticleBackground from "@/components/particle-background"
import ScrollProgress from "@/components/scroll-progress"

// 포트폴리오 데이터
const portfolioItems = [
  {
    id: "13",
    title: "新規プロジェクト",
    category: "GAME",
    thumbnail: "/images/portfolio-thumb-newgame.png?height=225&width=400",
    description: "新規開発プロジェクトでUIアニメーションのセクションリードとして制作を担当しています。",
  },
  {
    id: "12",
    title: "TRIBE NINE",
    category: "GAME",
    thumbnail: "/images/portfolio-thumb-tribenine.png?height=225&width=400",
    description: "「TRIBE NINE」でUIアニメーションのセクションリードとして制作を担当しました。",
  },
    {
    id: "11",
    title: "uGUI用Shader",
    category: "GAME",
    thumbnail: "/images/portfolio-thumb-shader.png?height=225&width=400",
    description: "UnityのuGUIに向けたShader作成の事例",
  },
  {
    id: "10",
    title: "KonMari Spark Joy!",
    category: "GAME",
    thumbnail: "/images/portfolio-thumb-konmari.png?height=225&width=400",
    description: "「KonMari Spark Joy!」でUIアニメーションの制作を担当しました。",
  },
  {
    id: "9",
    title: "HoneyWorks Premium Live",
    category: "GAME",
    thumbnail: "/images/portfolio-thumb-honeyworks.png?height=225&width=400",
    description: "「HoneyWorks Premium Live」でUIアニメーションの制作を担当しました。",
  },
  {
    id: "8",
    title: "ONE PIECE ボン！ボン！ジャーニー!!",
    category: "GAME",
    thumbnail: "/images/portfolio-thumb-bonbonjourney.png?height=225&width=400",
    description: "「ONE PIECE ボン！ボン！ジャーニー!!」でUIアニメーションの制作を担当しました。",
  },
  {
    id: "7",
    title: "アイドルマスター SideM LIVE ON ST@GE!",
    category: "GAME",
    thumbnail: "/images/portfolio-thumb-idolmastersidem.png?height=225&width=400",
    description: "「アイドルマスター SideM LIVE ON ST@GE!」でUIアニメーションの制作を担当しました。",
  },
  {
    id: "6",
    title: "サモンソウルバトル",
    category: "GAME",
    thumbnail: "/images/portfolio-thumb-summonsoulbattle.png?height=225&width=400",
    description: "「サモンソウルバトル」でUIアニメーションの制作を担当しました。",
  },
  {
    id: "5",
    title: "Wake Up, Girls! ステージの天使",
    category: "GAME",
    thumbnail: "/images/portfolio-thumb-wakeupgirls.png?height=225&width=400",
    description: "「Wake Up, Girls! ステージの天使」でゲーム内の演出制作を担当しました。",
  },
  {
    id: "4",
    title: "SKYLOCK(スカイロック)",
    category: "GAME",
    thumbnail: "/images/portfolio-thumb-skylock.png?height=225&width=400",
    description: "「SKYLOCK(スカイロック)」でゲーム内の演出制作を担当しました。",
  },
  {
    id: "3",
    title: "BIRDMAN「バードマン」",
    category: "WEB",
    thumbnail: "/images/portfolio-thumb-birdman.png?height=225&width=400",
    description: "Flash Developer / Front-End EngineerとしてWebコンテンツの制作を担当しました。",
  },
  {
    id: "2",
    title: "クリエイターズカンパニーコネクション",
    category: "WEB",
    thumbnail: "/images/portfolio-thumb-ccc.png?height=225&width=400",
    description: "Web DesignerとしてWebコンテンツの制作を担当しました。",
  },
  {
    id: "1",
    title: "WEDIT DESIGN",
    category: "WEB",
    thumbnail: "/images/portfolio-thumb-weditdesign.png?height=225&width=400",
    description: "Web DesignerとしてWebコンテンツの制作を担当しました。",
  },
]

// 인터뷰 데이터
const interviews = [
  {
    id: "1",
    title: "表情やしぐさで体験の質を高める。ゲームアニメーションの仕事",
    organization: "VOICE Akatsuki",
    year: "2020",
    description: "UIアニメーションに関するインタビュー記事です。",
    url: "https://voice.aktsk.jp/5436/",
    icon: <Newspaper className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "アカツキ ロジカルクリエイティブ Logic 02：「わかりやすさ」と「体験」を両立するUIアニメーション",
    organization: "CGWORLD",
    year: "2018",
    description: "UIアニメーションに関するインタビュー記事です。",
    url: "https://cgworld.jp/interview/201812-akatsuki%20.html",
    icon: <Newspaper className="h-5 w-5" />,
  },
]

export default function PortfolioPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("全て")
  const [filteredItems, setFilteredItems] = useState(portfolioItems)
  const { t } = useLanguage()
  const { isMobile, isTablet } = useBreakpoint()

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      console.log("[ReactGA.initialize] page : /portfolio");
      ReactGA.initialize("G-970VH63QCH");
      ReactGA.send({ hitType: "pageview", page: "/portfolio", title: "Portfolio Main View" });
    }

    const handleContextMenu = (event) => {
      event.preventDefault(); // 우클릭 방지
    }
    // document에 이벤트 리스너 추가
    document.addEventListener("contextmenu", handleContextMenu);

    if (selectedCategory === "全て" || selectedCategory === t("portfolio.categories.all")) {
      setFilteredItems(portfolioItems)
    } else {
      setFilteredItems(portfolioItems.filter((item) => item.category === selectedCategory))
    }
  }, [selectedCategory, t])

  // 카테고리 목록
  const categories = [
    t("portfolio.categories.all"),
    t("portfolio.categories.game"),
    t("portfolio.categories.web"),
    // t("portfolio.categories.interview"),
  ]

  // 애니메이션 변수
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <PageTransition>
      <ParticleBackground />
      <div className={`min-h-screen transition-colors duration-500 bg-gradient-light`}>
        <ScrollProgress color={"hsl(var(--primary-color))"} />
        <Navbar />

        {/* 히어로 섹션 */}
        <ParallaxHero
          imageUrl="/images/page-top-bg.png?height=630&width=1200"
          title={t("portfolio.title")}
          subtitle={t("portfolio.subtitle")}
          height="35vh"
          overlayOpacity={0.7}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className={`rounded-full px-6 py-2 text-white bg-gradient-primary hover:shadow-lg hover:shadow-primary-color/20}`}
              onClick={() => {
                const portfolioSection = document.getElementById("portfolio-section")
                if (portfolioSection) {
                  portfolioSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              {t("portfolio.viewWorks")}
            </Button>
          </motion.div>
        </ParallaxHero>

        <main className="container relative mx-auto px-4 py-8">
          <div id="portfolio-section">
            <ScrollRevealMotion>
              <div className="mb-8 text-center">
                <h2
                  className={`title-responsive font-light tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent}`}
                >
                  {t("portfolio.worksTitle")}
                </h2>
                <p className={`mt-2 text-xl font-light tracking-tight text-gray-500`}>
                  {t("portfolio.worksDescription")}
                </p>
              </div>
            </ScrollRevealMotion>

            {/* 카테고리 필터 */}
            <ScrollRevealMotion delay={0.2}>
              <div className="mb-10 flex flex-wrap justify-center gap-2">
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Button
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        selectedCategory === category ? "bg-gradient-primary text-white" : "border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </ScrollRevealMotion>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item, index) => (
                <motion.div key={item.id} variants={itemVariants} className="hover-lift">
                  <InteractiveCard
                    className={`shadow-lg transition-all duration-300 bg-white`}
                    // backgroundImage={item.thumbnail}
                    backgroundOpacity={0.05}
                    enhanced={true}
                  >
                    <div className="group relative overflow-hidden rounded-xl">
                      <div className="relative aspect-video overflow-hidden">
                        <OptimizedImage
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" onClick={() => router.push(`/portfolio/${item.id}`)}>
                          <Button
                            onClick={() => router.push(`/portfolio/${item.id}`)}
                            variant="outline"
                            className="flex items-center gap-2 rounded-full border-white bg-white/20 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                          >
                            <Play className="h-4 w-4" />
                            {t("portfolio.viewProject")}
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 pt-2">
                        <div className="mb-0 flex items-center justify-between">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800}`}
                          >
                            {item.category}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => router.push(`/portfolio/${item.id}`)}
                            className={`rounded-full p-1.5 transition-colors text-gray-400 hover:bg-gray-100 hover:text-gray-900}`}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.button>
                        </div>
                        <h3 className={`text-xl font-semibold text-gray-900`}>
                          {item.title}
                        </h3>
                        <p className={`mt-2 text-sm text-gray-500`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </InteractiveCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <hr className="mt-12" style={{ borderTop: `3px dotted #c1c2c3` }}></hr>
          
          {/* 인터뷰 섹션 */}
          <div className="mt-6 my-4">
            <ScrollRevealMotion>
              <div className="mb-8 text-center">
                <h2
                  className={`title-responsive font-light tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent}`}
                >
                  {t("portfolio.interviewTitle")}
                </h2>
                <p className={`mt-2 text-xl font-light tracking-tight text-gray-500`}>
                  {t("portfolio.interviewDescription")}
                </p>
              </div>
            </ScrollRevealMotion>

            <ScrollRevealMotion>
              <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                {interviews.map((interview, index) => (
                <StaggerItem key={interview.id}>
                  <InteractiveCard
                    className={`h-full p-6 bg-white hover-lift`}
                    enhanced={true}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white ${
                          index % 2 == 0 ? "bg-gradient-primary" : "bg-gradient-secondary"
                        }`}
                      >
                        <Newspaper className="h-5 w-5" />
                      </div>
                      <h3 className={`mb-2 text-lg font-semibold text-gray-900}`}><a href={interview.url} target="_blank">{interview.title}</a></h3>
                      <p className={`text-sm font-semibold text-gray-500}`}>{interview.organization} • {interview.year}</p>
                      <p className="mt-2 text-xs text-gray-700 dark:text-gray-300">🌐 <a href={interview.url} target="_blank">{interview.url}</a></p>
                    </div>
                  </InteractiveCard>
                </StaggerItem>
                ))}
              </div>
            </ScrollRevealMotion>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}
