"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/i18n"
import { ArrowLeft, Play, ExternalLink, ArrowRight, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReactGA from "react-ga4";
import InteractiveCard from "@/components/interactive-card"
import ImageGallery from "@/components/image-gallery"
import Navbar from "@/components/navbar"
import ParallaxHero from "@/components/parallax-hero"
import ParticleBackground from "@/components/particle-background"
import ReactPlayer from 'react-player'
import { MediaController, MediaControlBar, MediaTimeRange, MediaTimeDisplay, MediaPlaybackRateButton, MediaPlayButton, MediaFullscreenButton, } from "media-chrome/react";
import ScrollReveal from "@/components/scroll-reveal"
import ScrollProgress from "@/components/scroll-progress"
import * as SimpleIcons from "react-icons/si"
import * as BoxIcons from "react-icons/bi"

// 포트폴리오 데이터
const workItems = [
  {
    id: 13,
    title: "怪獣８号 THE GAME",
    thumbnail: "/portfolio/images/works-top-kaijyu8.png?height=672&width=1280",
    description: "モバイル・PC向けの新規ゲーム開発におけるUIアニメーション制作内容",
    category: "モバイル・PC",
    overviewTitle: "プロジェクトの紹介",
    overview: [
      "巨大な敵に立ち向かい、逆転の一撃を叩き込む爽快感を味わえる、完全新作『ジャイアントキリングRPG』。",
      "大迫力のバトルシーンは、誰でも楽しめるターン制コマンドバトルとハイエンドな演出で表現されています。感動的なメインストーリーに加え、ゲームならではのオリジナルストーリーも用意されており、その世界観をより深く堪能できる内容となっています。",
      "開発中期から参画し、制作基盤の改善や進行管理の効率化を図りながら、原作の世界観を最大限に表現するUIアニメーションのディレクションと制作を担当しました。",
    ],
    responsibilitiesTitle: "プロジェクトでの担当業務内容",
    responsibilities: [
      "開発中期からプロジェクトに参画",
      "ゲーム内のUIアニメーション制作全般とディレクション業務を担当",
      "UnityのuGUIを用いたUIの実装と快適にプレイできるようにUIの最適化と軽量化",
      "セクションのリードとして体制管理と進行管理",
      "外部の制作会社さんとの連携",
    ],
    youtubeUrl: "https://youtu.be/_JVsbOn_8f0",
    isPlayYoutube : true,
    videoUrl: "",
    videoPoster: "",
    isPlayVideo : false,
    isPortraitVideo: false,
    isPortraitRatio: "aspect-video",
    isVideoRightPosition: false,
    galleryTitle: "UIアニメーションのディレクションと制作事例",
    galleryDetailView: "false",
    galleryGrids: "grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4",
    gallery: [
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_01.gif?height=295&width=640", alt: "バトルにおけるUIアニメーション", caption: "バトルにおけるUIアニメーション実装" },
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_02.gif?height=295&width=640", alt: "バトルにおけるUIアニメーション", caption: "バトルにおけるUIアニメーション実装" },
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_03.gif?height=295&width=640", alt: "バトルにおけるUIアニメーション", caption: "バトルにおけるUIアニメーション実装" },
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_04.gif?height=295&width=640", alt: "チュートリアルとメッセージ機能のUIアニメーション", caption: "チュートリアルとメッセージ機能のUIアニメーション" },
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_05.gif?height=295&width=640", alt: "プレイヤーランクアップのUIアニメーション", caption: "プレイヤーランクアップのUIアニメーション" },
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_06.gif?height=295&width=640", alt: "ストーリー画面のUIアニメーション", caption: "ストーリー画面のUIアニメーション" },
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_07.gif?height=295&width=640", alt: "キャラクター画面のUIアニメーション", caption: "キャラクター画面のUIアニメーション" },
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_08.gif?height=295&width=640", alt: "キャラクター画面のUIアニメーション", caption: "キャラクター画面のUIアニメーション" },
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_09.gif?height=295&width=640", alt: "ショップ画面のUIアニメーション", caption: "ョップ画面のUIアニメーション" },
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_10.gif?height=295&width=640", alt: "ガチャ画面のUIアニメーション", caption: "ガチャ画面のUIアニメーション" },
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_11.gif?height=295&width=640", alt: "スキット画面のUIアニメーション", caption: "スキット画面のUIアニメーション" },
      { src: "/portfolio/images/kj8-thegame/kj8-thegame_ui_anim_12.gif?height=295&width=640", alt: "スキット画面のUIアニメーション", caption: "スキット画面のUIアニメーション" },
    ],
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-0" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-0" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-0" />, name :"Visual Studio Code"},
    ],
    duration: "6ヶ月~",
    client: "-",
    year: "2025",
    url: "https://kj8-thegame.com/",
  },
  {
    id: 12,
    title: "TRIBE NINE",
    thumbnail: "/portfolio/images/works-top-tribenine.png?height=630&width=1280",
    description: "モバイル・PC向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイル・PC",
    overviewTitle: "プロジェクトの紹介",
    overview: [
      "アカツキゲームスとトゥーキョーゲームスが共同開発した3DアクションRPG『TRIBE NINE』の開発において、UIアニメーション制作セクションのリードとして、アニメーションの制作およびディレクションを担当しました。",
      "大規模プロジェクトにおいて多岐にわたるセクションと連携しながら長期開発を経験し、3Dカメラワークの実装やシェーダー作成、制作基盤の構築、レギュレーション策定などを通じて、実践的な制作ノウハウとリードとしてのマネジメントスキルを培いました。",
      "ユーザーがより楽しくプレイできるよう日々工夫を重ね、高いクオリティの制作を実現できたと考えています。",
    ],
    responsibilitiesTitle: "プロジェクトでの担当業務内容",
    responsibilities: [
      "開発初期からプロジェクトに参画（約3年）",
      "ゲーム内のUIアニメーション設計とレギュレーション策定",
      "ゲーム内のUIアニメーション制作全般とディレクション業務を担当",
      "UnityのC#によるUIアニメーション制御",
      "UnityのuGUIを用いたUIの実装と快適にプレイできるようにUIの最適化と軽量化",
      "UI表現を目的としてUnityのShader Graphを使用したShader作成",
      "セクションのリードとして体制管理と進行管理",
      "外部の制作会社の開拓と連携",
      "お問い合わせや外部決済サイトのデザイン改修（HTML、CSS、JavaScriptコーディング）",
    ],
    youtubeUrl: "https://youtu.be/MAc9YG05rNM",
    isPlayYoutube : false,
    videoUrl: "/portfolio/movies/TribeNine_720p.webm",
    videoPoster: "/portfolio/movies/TribeNine_thumb.png",
    isPlayVideo : true,
    isPortraitVideo: false,
    isPortraitRatio: "aspect-video",
    isVideoRightPosition: false,
    galleryTitle: "制作のスナップショット",
    galleryDetailView: "false",
    galleryGrids: "grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4",
    gallery: [
      { src: "/portfolio/images/tribenine/tribenine_camera_work_01.gif?height=658&width=720", alt: "カメラワーク実装", caption: "Unityでのカメラワーク実装" },
      { src: "/portfolio/images/tribenine/tribenine_ui_anim_01.gif?height=659&width=720", alt: "UIアニメーション実装", caption: "UnityでのUIアニメーション実装" },
      { src: "/portfolio/images/tribenine/tribenine_ui_anim_05.gif?height=660&width=720", alt: "UIアニメーション実装", caption: "UnityでのUIアニメーション実装" },
      { src: "/portfolio/images/tribenine/tribenine_ui_anim_03.gif?height=658&width=720", alt: "UIアニメーション実装", caption: "UnityでのUIアニメーション実装" },
      { src: "/portfolio/images/tribenine/tribenine_ui_anim_06.gif?height=658&width=720", alt: "UIアニメーション実装", caption: "UnityでのUIアニメーション実装" },
      { src: "/portfolio/images/tribenine/tribenine_ui_anim_07.gif?height=658&width=720", alt: "UIアニメーション実装", caption: "UnityでのUIアニメーション実装" },
      { src: "/portfolio/images/tribenine/tribenine_ui_anim_08.gif?height=660&width=720", alt: "UIアニメーション実装", caption: "UnityでのUIアニメーション実装" },
      { src: "/portfolio/images/tribenine/tribenine_ui_anim_04.gif?height=658&width=720", alt: "UnityのuGUI用Shader作成", caption: "UnityのuGUI用Shader作" },
      // { src: "/portfolio/images/tribenine/tribenine_support_site_01.png?height=1373&width=1440", alt: "お問い合わせサイトのデザイン作成と実装(CMS)", caption: "お問い合わせサイトのデザイン作成と実装(CMS)" },
      // { src: "/portfolio/images/tribenine/tribenine_support_site_02.png?height=1160&width=1440", alt: "お問い合わせサイトのデザイン作成と実装(CMS)", caption: "お問い合わせサイトのデザイン作成と実装(CMS)" },
      // { src: "/portfolio/images/tribenine/tribenine_webstore_site_01.png?height=1776&width=1440", alt: "外部決済サイトのデザイン作成と実装(CMS)", caption: "外部決済サイトのデザイン作成と実装(CMS)" },
    ],
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-0" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-0" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-0" />, name :"Visual Studio Code"},
      {icon : <SimpleIcons.SiAutodeskmaya size="32px" className="mb-0" />, name :"Maya"},
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-0" />, name :"Adobe Substance 3D Designer"},
    ],
    duration: "3年~",
    client: "-",
    year: "2022",
    url: "https://tribenine.tokyo/",
  },
  {
    id: 11,
    title: "UnityのuGUI用Shader作成",
    thumbnail: "/portfolio/images/works-top-shader.png?height=640&width=1080",
    description: "UnityのuGUIに向けたShaderの作成について",
    category: "GAME",
    overviewTitle: "取り組みの紹介",
    overview: [
      "UnityでよりリッチなUI表現を実現するために、uGUI向けのShaderLabを用いたShader学習と作成に取り組んでいます。",
      "現在はまだ比較的シンプルな表現のShaderが中心ですが、今後はスキルを高め、さらに高度で豊かな表現が可能なShader作成を目指しています。",
    ],
    responsibilitiesTitle: "",
    responsibilities: [
    ],
    videoUrl: "",
    galleryTitle: "制作したShaderの実例",
    galleryDetailView: "true",
    galleryGrids: "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4",
    gallery: [
      { src: "/portfolio/images/shader/Dissolve.gif?height=500&width=600", alt: "画像にディゾルブ効果を反映させるeShader", caption: "画像にディゾルブ効果を反映させるeShaderの作成" },
      { src: "/portfolio/images/shader/Glitch.gif?height=500&width=600", alt: "画像にグリッチ効果を反映させるShader", caption: "画像にグリッチ効果を反映させるShaderの作成" },
      { src: "/portfolio/images/shader/Glow.gif?height=500&width=600", alt: "画像にグロー効果を反映させるShader", caption: "画像にグロー効果を反映させるShaderの作成" },
      { src: "/portfolio/images/shader/Gradient.gif?height=500&width=600", alt: "画像にグラデーション効果を反映させるShader", caption: "画像にグラデーション効果を反映させるShaderの作成" },
      { src: "/portfolio/images/shader/Blur.gif?height=500&width=600", alt: "画像にブラー効果を反映させるShader", caption: "画像にブラー効果を反映させるShaderの作成" },
      { src: "/portfolio/images/shader/Shadow.gif?height=500&width=600", alt: "画像にシャドウ効果を反映させるShader", caption: "画像にシャドウ効果を反映させるShaderの作成" },
      { src: "/portfolio/images/shader/Pixelate.gif?height=500&width=600", alt: "画像にピクセレート効果を反映させるShader", caption: "画像にピクセレート効果を反映させるShaderの作成" },
      { src: "/portfolio/images/shader/HalfTone.gif?height=500&width=600", alt: "画像にハーフトーン効果を反映させるShader", caption: "画像にハーフトーン効果を反映させるShaderの作成" },
      { src: "/portfolio/images/shader/ChromaticAberration.gif?height=500&width=600", alt: "画像に色収差効果を反映させるShader", caption: "画像に色収差効果を反映させるShaderの作成" },
      { src: "/portfolio/images/shader/Shine.gif?height=500&width=600", alt: "画像に輝き効果を反映させるShader", caption: "画像に輝き効果を反映させるShaderの作成" },
    ],
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-0" />, name :"Unity"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-0" />, name :"Visual Studio Code"},
    ],
    duration: "2年~",
    client: "-",
    year: "2011",
  },
  {
    id: 10,
    title: "KonMari Spark Joy!",
    thumbnail: "/portfolio/images/works-top-konmari.png?height=630&width=1200",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    overviewTitle: "プロジェクトの紹介",
    overview: [
      "KonMariメソッドは、物を「ときめくかどうか（Spark Joy）」で判断して整理し、感謝の気持ちを込めて不要な物を手放すことで、自分の理想の暮らしに近づける片づけ術です。",
      "本作は、その片づけ術をゲームとして楽しく体験できるように開発されたタイトルです。",
      "初めて3Dチームと連携しながら制作を進め、3Dアセット制作に関する理解も深めることができた貴重なプロジェクトとなりました。",
    ],
    responsibilitiesTitle: "プロジェクトでの担当業務内容",
    responsibilities: [
      "開発中盤からプロジェクトに参画（約6ヶ月）",
      "ゲーム内のUIアニメーション設計と制作全般を担当",
      "プロモーションムービー制作にも部分的に関与",
    ],
    youtubeUrl: "https://youtu.be/UbhDj6wOsqo",
    isPlayYoutube : false,
    videoUrl: "/portfolio/movies/KonMari_720p.webm",
    videoPoster: "/portfolio/movies/KonMari_thumb.png",
    isPlayVideo : true,
    isPortraitVideo: false,
    isPortraitRatio: "aspect-video",
    isVideoRightPosition: false,
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-0" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-0" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-0" />, name :"Visual Studio Code"},
    ],
    duration: "1年~",
    client: "-",
    year: "2021",
    url: "https://www.sparkjoy.jp/",
  },
  {
    id: 9,
    title: "HoneyWorks Premium Live",
    thumbnail: "/portfolio/images/works-top-honeyworks.png?height=720&width=1280",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    overviewTitle: "プロジェクトの紹介",
    overview: [
      "『HoneyWorks Premium Live』では、人気クリエイターユニットHoneyWorksの楽曲と世界観を体験できるリズムゲームの開発に携わりました。",
      "UIアニメーションを担当し、楽曲の雰囲気に調和したビジュアル表現を追求しました。",
      "特に、舞台上で繰り広げられるライブの臨場感をUI上で再現することを意識し、光の演出やエフェクト、リズムに合わせた動きの設計などを通じて、視覚的な高揚感を演出しました。",
      "また、演出のテンポや操作時のフィードバックにも細やかに配慮し、演出とインタラクションが一体となった心地よいユーザー体験を目指しました。",
    ],
    responsibilitiesTitle: "プロジェクトでの担当業務内容",
    responsibilities: [
      "開発中盤からプロジェクトに参画（約6ヶ月）",
      "ゲーム内のUIアニメーション設計と制作全般",
      "UnityのC#によるUIアニメーション制御",
      "外部の制作会社さんとの連携",
    ],
    youtubeUrl: "https://youtu.be/Utsz-ajBvUw",
    isPlayYoutube : false,
    videoUrl: "/portfolio/movies/HoneyWorks_720p.webm",
    videoPoster: "/portfolio/movies/HoneyWorks_thumb.png",
    isPlayVideo : true,
    isPortraitVideo: false,
    isPortraitRatio: "aspect-video",
    isVideoRightPosition: false,
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-0" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-0" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-0" />, name :"Visual Studio Code"},
    ],
    duration: "2年~",
    client: "-",
    year: "2020",
    url: "https://x.com/HoneyWorks_Game",
  },
  {
    id: 8,
    title: "ONE PIECE ボン！ボン！ジャーニー!!",
    thumbnail: "/portfolio/images/works-top-bonbonjourney.png?height=337&width=1010",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    overviewTitle: "プロジェクトの紹介",
    overview: [
      "『ONE PIECE ボン！ボン！ジャーニー!!』では、人気アニメ『ONE PIECE』のキャラクターたちが活躍するパズルゲームの開発に携わりました。",
      "UIアニメーションの制作を担当し、キャラクターの魅力や世界観が伝わるようなポップで楽しい演出を心がけました。",
      "アニメらしさを活かしつつ、アニメで感じた感動をゲーム内でも再現できるよう、表現や演出に工夫を重ねました。その結果、ユーザーからも好評の声を多くいただくことができました。",
    ],
    responsibilitiesTitle: "プロジェクトでの担当業務内容",
    responsibilities: [
      "開発から運用までプロジェクトに参画（約2年半）",
      "ゲーム内のUIアニメーション設計と制作全般・ディレクションを担当",
      "UnityのC#によるUIアニメーション制御",
      "UnityのuGUIを用いたUIの実装と快適にプレイできるようにUIの最適化と軽量化",
      "プロモーションムービーの提案と制作",
      "外部の制作会社さんの開拓と連携",
    ],
    // youtubeUrl: "https://youtu.be/HfFRJdeWR_k",
    youtubeUrl: "https://youtube.com/shorts/ADpOSPSiOMw",
    isPlayYoutube : false,
    videoUrl: "/portfolio/movies/BonBonJourney_720p_portrait.webm",
    videoPoster: "/portfolio/movies/BonBonJourney_thumb.png",
    isPlayVideo : true,
    isPortraitVideo: true,
    isPortraitRatio: "aspect-[9/16]",
    isVideoRightPosition: false,
    galleryTitle: "UIアニメーションのディレクションと制作事例",
    galleryDetailView: "false",
    galleryGrids: "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5",
    gallery: [
      { src: "/portfolio/images/bonbonjourney/bonbonjourney_ui_anim_01.gif?height=334&width=188", alt: "タイトルのUIアニメーション", caption: "タイトルのUIアニメーション" },
      { src: "/portfolio/images/bonbonjourney/bonbonjourney_ui_anim_02.gif?height=334&width=188", alt: "チュートリアルアニメーション", caption: "チュートリアルアニメーション" },
      { src: "/portfolio/images/bonbonjourney/bonbonjourney_ui_anim_03.gif?height=334&width=188", alt: "ストーリーアニメーション", caption: "ストーリーアニメーション" },
      { src: "/portfolio/images/bonbonjourney/bonbonjourney_ui_anim_04.gif?height=334&width=188", alt: "ストーリーアニメーション", caption: "ストーリーアニメーション" },
      { src: "/portfolio/images/bonbonjourney/bonbonjourney_ui_anim_05.gif?height=334&width=188", alt: "バトルのUIアニメーション", caption: "バトルのUIアニメーション" },
      { src: "/portfolio/images/bonbonjourney/bonbonjourney_ui_anim_06.gif?height=334&width=188", alt: "バトル結果UIアニメーション", caption: "バトル結果UIアニメーション" },
      { src: "/portfolio/images/bonbonjourney/bonbonjourney_ui_anim_07.gif?height=334&width=188", alt: "バトルのアニメーション", caption: "バトルのアニメーション" },
      { src: "/portfolio/images/bonbonjourney/bonbonjourney_ui_anim_08.gif?height=334&width=188", alt: "バトルのアニメーション", caption: "バトルのアニメーション" },
      { src: "/portfolio/images/bonbonjourney/bonbonjourney_ui_anim_09.gif?height=334&width=188", alt: "イベントUIアニメーション", caption: "イベントUIアニメーション" },
      { src: "/portfolio/images/bonbonjourney/bonbonjourney_ui_anim_10.gif?height=334&width=188", alt: "イベントUIアニメーション", caption: "イベントUIアニメーション" },
    ],
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-0" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-0" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-0" />, name :"Visual Studio Code"},
    ],
    duration: "2年~",
    client: "-",
    year: "2018",
    url: "https://x.com/ONEPIECE_BONBON",
  },
  {
    id: 7,
    title: "アイドルマスター SideM LIVE ON ST@GE!",
    thumbnail: "/portfolio/images/works-top-idolmastersidem.png?height=751&width=1280",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    overviewTitle: "プロジェクトの紹介",
    overview: [
      "『アイドルマスター SideM LIVE ON ST@GE!』では、男性アイドルたちのライブや日常を描くリズムゲームの開発に携わりました。",
      "UIアニメーションの制作を担当し、アイドルたちの個性や楽曲の魅力が際立つような表現を意識しました。",
      "ライブ演出や画面遷移において、没入感とテンポ感の両立を目指して細部まで調整を行いました。",
      "ファンの期待に応える演出づくりに注力し、作品世界への没入体験に貢献できたと感じています。",
    ],
    responsibilitiesTitle: "プロジェクトでの担当業務内容",
    responsibilities: [
      "開発から運用までプロジェクトに参画（約1年）",
      "ゲーム内のUIアニメーション設計と制作全般・ディレクションを担当",
      "UnityのC#によるUIアニメーション制御",
      "UnityのuGUIを用いたUIの実装",
    ],
    youtubeUrl: "https://youtu.be/YzFR1-4qvr8",
    isPlayYoutube : false,
    videoUrl: "/portfolio/movies/IdolMasterSideM_720p.webm",
    videoPoster: "/portfolio/movies/IdolMasterSideM_thumb.png",
    isPlayVideo : true,
    isPortraitVideo: false,
    isPortraitRatio: "aspect-video",
    isVideoRightPosition: false,
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-0" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-0" />, name :"GitHub"},
    ],
    duration: "1年~",
    client: "-",
    year: "2017",
    url: "https://x.com/SideM_LOS",
  },
  {
    id: 6,
    title: "サモンソウルバトル",
    thumbnail: "/portfolio/images/works-top-summonsoulbattle.png?height=4376&width=835",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    overviewTitle: "プロジェクトの紹介",
    overview: [
      "『サモンソウルバトル』は、gloopsが手がけたリアルタイム3ポジション制ギルドバトル特化のスマホ向けカードRPGです。",
      "前衛・中衛・後衛という新たな配置概念を導入し、戦術の幅と協力プレイの深さを追求しました。クエスト中は“仮想ギルド”機能で、他プレイヤーとリアルタイムに協力できる工夫を実装しました。",
      "本作は初めてUnityを使用してUIアニメーションやエフェクトを制作したプロジェクトで、多くの学びがあったと記憶しています。プレイヤーとしても楽しめた作品です。",
    ],
    responsibilitiesTitle: "プロジェクトでの担当業務内容",
    responsibilities: [
      "開発から運用までプロジェクトに参画（約1年）",
      "ゲーム内のUIアニメーション設計と制作全般",
      "Particle Systemを使用したエフェクト制作全般",
      "UnityのNGUIを用いたUIの実装",
    ],
    // youtubeUrl: "https://youtu.be/6Y4d1JH939I",
    youtubeUrl: "https://youtube.com/shorts/otbDQubxp6k",
    isPlayYoutube : false,
    videoUrl: "/portfolio/movies/SummonSoulBattle_720p_portrait.webm",
    videoPoster: "/portfolio/movies/SummonSoulBattle_thumb.png",
    isPlayVideo : true,
    isPortraitVideo: true,
    isPortraitRatio: "aspect-[9/16]",
    isVideoRightPosition: true,
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-0" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-0" />, name :"GitHub"},
    ],
    duration: "1年~",
    client: "-",
    year: "2016",
  },
  {
    id: 5,
    title: "Wake Up, Girls! ステージの天使",
    thumbnail: "/portfolio/images/works-top-wakeupgirls.png?height=800&width=1280",
    description: "モバイル向けのゲーム開発における演出制作内容",
    category: "モバイルゲーム",
    overviewTitle: "プロジェクトの紹介",
    overview: [
      "『Wake Up, Girls！ステージの天使』では、アイドルたちの成長とライブパフォーマンスを描くリズムゲームの開発に携わりました。",
      "UI演出や画面遷移の制作を担当し、ライブの臨場感やキャラクターの魅力を引き立てる表現に注力しました。",
      "ユーザーがライブの熱気を感じられるよう、演出のテンポや視覚効果の調整を細かく行いました。",
      "ファンの期待に応えるクオリティの高い体験づくりに貢献できたと感じています。",
    ],
    responsibilitiesTitle: "プロジェクトでの担当業務内容",
    responsibilities: [
      "開発から運用までプロジェクトに参画（約2年）",
      "ゲーム内の演出制作全般",
    ],
    // youtubeUrl: "https://youtu.be/XNOXl7gE2_c",
    youtubeUrl: "https://youtube.com/shorts/FlE_17nNgjY",
    isPlayYoutube : false,
    videoUrl: "/portfolio/movies/WakeUpGirls_720p_portrait.webm",
    // videoPoster: "/portfolio/movies/WakeUpGirls_thumb.png",
    isPlayVideo : true,
    isPortraitVideo: true,
    isPortraitRatio: "aspect-[9/12]",
    isVideoRightPosition: true,
    tools: [ 
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-0" />, name :"Adobe Flash"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAdobeillustrator size="32px" className="mb-0" />, name :"Adobe Illustrator"},
    ],
    duration: "1年~",
    client: "-",
    year: "2014",
  },
  {
    id: 4,
    title: "SKYLOCK(スカイロック)",
    thumbnail: "/portfolio/images/works-top-skylock.png?height=380&width=1010",
    description: "モバイル向けのゲーム開発における演出制作内容",
    category: "モバイルゲーム",
    overviewTitle: "プロジェクトの紹介",
    overview: [
      "『SKYLOCK（スカイロック）』では、独自の世界観と戦略性を持つターン制バトルゲームの開発に携わりました。",
      "UIアニメーションやエフェクト制作を担当し、戦闘の緊張感やキャラクターの個性を効果的に表現しました。",
      "プレイヤーが戦略を立てやすく、ゲームに没入できるよう操作性と演出のバランスに注力しました。",
      "高品質なビジュアルと快適なユーザー体験の両立に貢献できたことを誇りに思っています。",
    ],
    responsibilitiesTitle: "プロジェクトでの担当業務内容",
    responsibilities: [
      "運用時期にプロジェクトに参画（約6ヶ月）",
      "ゲーム内の演出制作全般",
    ],
    // youtubeUrl: "https://youtu.be/kPCtgFWWzhM",
    youtubeUrl: "https://youtube.com/shorts/VsHHKQGU2CM",
    isPlayYoutube : false,
    videoUrl: "/portfolio/movies/SkyLock_720p_portrait.webm",
    // videoPoster: "/portfolio/movies/SkyLock_thumb.png",
    isPlayVideo : true,
    isPortraitVideo: true,
    isPortraitRatio: "aspect-[9/12]",
    isVideoRightPosition: true,
    tools: [ 
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-0" />, name :"Adobe Flash"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAdobeillustrator size="32px" className="mb-0" />, name :"Adobe Illustrator"},
    ],
    duration: "1年~",
    client: "-",
    year: "2013",
  },
  {
    id: 3,
    title: "BIRDMAN「バードマン」",
    thumbnail: "/portfolio/images/works-top-birdman.png?height=673&width=1280",
    description: "WEBサイトなどWEB向けコンテンツ制作内容",
    category: "WEB制作",
    overviewTitle: "担当業務内容",
    overview: [
      "「BIRDMAN」では、Flash DeveoperからFront-end Engineerとして様々なコンテンツ制作を担当しました。",
      "ユーザーインターフェースの設計・実装を通じて、快適で直感的な操作体験の提供を目指しました。",
      "また、最新技術を活用し、高パフォーマンスかつレスポンシブなデザインの実現に注力しています。",
      "技術力の高いトップクラスのメンバーと共に制作に携わり、多くの学びと成長を得られた貴重な期間であり、私自身も品質の高いプロダクト開発に貢献できたと自負しています。",
    ],
    responsibilitiesTitle: "",
    responsibilities: [
      "Flash DeveoperとしてFlashサイトを制作",
      "Front-end Engineerとして様々なコンテンツ制作（HTML, CSS, JavaScript）",
    ],
    videoUrl: "",
    galleryTitle: "制作を担当したプロジェクト",
    galleryDetailView: "true",
    galleryGrids: "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5",
    gallery: [
      { src: "/portfolio/images/birdman/lovemusic.png?height=400&width=590", alt: "LOVE MUSIC", caption: "LOVE MUSIC | Portal Audio Player Walkman | Sony" },
      { src: "/portfolio/images/birdman/nap.png?height=484&width=580", alt: "Hiroshi Nakamura & NAP Co.,Ltd.", caption: "Hiroshi Nakamura & NAP Co.,Ltd." },
      { src: "/portfolio/images/birdman/no1no1.png?height=520&width=560", alt: "No.1 No.1", caption: "HOME'S No.1 No.1(Smartphone Site)" },
      { src: "/portfolio/images/birdman/dayz.png?height=560&width=500", alt: "HAPPY BIRTH DAYZ", caption: "NISSAN HAPPY BIRTH DAYZ" },
      { src: "/portfolio/images/birdman/dajare_a_day.png?height=520&width=560", alt: "DAJARE-A-DAY", caption: "Domino's Campaign(Smartphone Site)" },
      { src: "/portfolio/images/birdman/smooth.png?height=600&width=800", alt: "Smooth inc", caption: "Smooth inc Renewal" },
      { src: "/portfolio/images/birdman/regame_vol3.png?height=433&width=640", alt: "REGAME VOL3", caption: "Real Escape Game Online vol.03" },
      { src: "/portfolio/images/birdman/birdman_sp.png?height=520&width=560", alt: "BIRDMAN", caption: "BIRDMAN - SMARTPHONE SITE" },
      { src: "/portfolio/images/birdman/tokyo2020.png?height=599&width=640", alt: "TOKYO2020", caption: "TOKYO2020 - PLEDGE" },
      { src: "/portfolio/images/birdman/noritz.png?height=600&width=640", alt: "NORITZ", caption: "NORITZ - SUNLIGHT PROJECT" },
      { src: "/portfolio/images/birdman/cafx.png?height=624&width=512", alt: "CyberAgentFX", caption: "CyberAgentFX - Cymo School" },
      { src: "/portfolio/images/birdman/suidobashijuko.png?height=614&width=584", alt: "Suidobashi Heavy Industry", caption: "Suidobashi Heavy Industry - KURATAS" },
      { src: "/portfolio/images/birdman/tweet_fantasy.png?height=600&width=584", alt: "Tweet Fantasy", caption: "MEIJI Fruits Gummi Brand Site" },
      { src: "/portfolio/images/birdman/ketsume.png?height=590&width=544", alt: "KETSUMEISHI", caption: "KETSUMEISHI Offcial Renewal" },
      { src: "/portfolio/images/birdman/z-trial.png?height=760&width=584", alt: "The Z-Trials", caption: "Walkman Z1000-series to the trail" },
      { src: "/portfolio/images/birdman/eco_journey.png?height=434&width=680", alt: "Nikon - ECO JOURNEY", caption: "Nikon - ECO JOURNEY" },
      { src: "/portfolio/images/birdman/ultrabookPUT.png?height=442&width=640", alt: "Intel Ultrabook POP-UP THEATER", caption: "Intel Ultrabook POP-UP THEATER" },
      { src: "/portfolio/images/birdman/hondaN.png?height=386&width=560", alt: "Honda N teaser", caption: "Honda N teaser" }
    ],
    tools: [ 
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-0" />, name :"Adobe Flash"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAdobeillustrator size="32px" className="mb-0" />, name :"Adobe Illustrator"},
    ],
    duration: "2年~",
    client: "-",
    year: "2011",
  },
  {
    id: 2,
    title: "クリエイターズカンパニーコネクション",
    thumbnail: "/portfolio/images/works-top-ccc.png?height=675&width=1200",
    description: "WEBサイトなどWEB向けコンテンツ制作内容",
    category: "WEB制作",
    overviewTitle: "担当業務内容",
    overview: [
      "日本で最初に就職した会社では、表現の自由度が高く、大きな裁量を任される環境の中で、日本でのキャリアをスタートすることができました。",
      "Webデザイナーとして、デザインからコーディングまで幅広く担当し、さまざまなサービスのWebサイト制作に携わりました。",
    ],
    responsibilitiesTitle: "",
    responsibilities: [
      "Flashを使用したFlashサイトを制作",
      "Flash Liteを使用したモバイル向けのコンテンツ制作",
      "WebデザイナーとしてWebサイト制作（HTML, CSS, JavaScript）",
    ],
    videoUrl: "",
    galleryTitle: "制作を担当したプロジェクト",
    galleryDetailView: "true",
    galleryGrids: "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5",
    gallery: [
      { src: "/portfolio/images/ccc/csbooks.png?height=475&width=560", alt: "C's BOOKS Website Renewal", caption: "C's BOOKS" },
      { src: "/portfolio/images/ccc/hotel_manzoku.png?height=440&width=560", alt: "HOTEL MAN-ZOKU", caption: "HOTEL MAN-ZOKU" },
      { src: "/portfolio/images/ccc/manzoku_renewal.png?height=560&width=535", alt: "MANZOKU Website Renewal", caption: "MANZOKU Website Renewal" },
      { src: "/portfolio/images/ccc/yukai_renewal_website.png?height=545&width=568", alt: "YUKAI LIFE Mobile", caption: "YUKAI LIFE Website Renewal" },
      { src: "/portfolio/images/ccc/yukai_renewal_mobile.png?height=440&width=560", alt: "YUKAI LIFE Mobile", caption: "YUKAI LIFE Mobile Renewal" },
      { src: "/portfolio/images/ccc/manzoku_job_website.png?height=480&width=550", alt: "MANZOKU JOB Website", caption: "MANZOKU JOB Website" },
      { src: "/portfolio/images/ccc/manzoku_job_mobile.png?height=440&width=560", alt: "MANZOKU JOB Mobile", caption: "MANZOKU JOB Mobile" },
      { src: "/portfolio/images/ccc/japanet_hadaka.png?height=470&width=548", alt: "JAPANET HADAKA Website", caption: "JAPANET HADAKA" },
      { src: "/portfolio/images/ccc/mobile_manzoku_tv.png?height=440&width=560", alt: "MANZOKU TV Mobile Site", caption: "MANZOKU TV Mobile" },
      { src: "/portfolio/images/ccc/mobile_manzoku_total.png?height=440&width=560", alt: "MANZOKU Mobile Site", caption: "MANZOKU Mobile" },
      { src: "/portfolio/images/ccc/manzoku_mall_admin_pc.png?height=360&width=549", alt: "MANZOKU Client Management", caption: "MANZOKU Management" },
      { src: "/portfolio/images/ccc/psta.png?height=510&width=426", alt: "PARADiSE STUDiO Website, Mobile Site", caption: "PARADiSE STUDiO" },
      { src: "/portfolio/images/ccc/pokepara_proposal.png?height=508&width=550", alt: "POKEPARA Proposal Design", caption: "POKEPARA" },
      // { src: "/portfolio/images/ccc/yukai_mobile_samepicgame.png?height=440&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - Puzzle#3" },
      // { src: "/portfolio/images/ccc/yukai_mobile_switchgame.png?height=440&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - Puzzle#2" },
      // { src: "/portfolio/images/ccc/yukai_mobile_piecegame.png?height=440&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - Puzzle#1" },
      // { src: "/portfolio/images/ccc/yukai_mobile_clock.png?height=400&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - Clock" },
      { src: "/portfolio/images/ccc/yukai_mobile_motenabi.png?height=420&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - motenabi" },
      { src: "/portfolio/images/ccc/yukai_mobile_jobcheck.png?height=420&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - JobCheck" },
      { src: "/portfolio/images/ccc/yukai_life_mobile.png?height=440&width=560", alt: "YUKAI LIFE, YUKAI WATERS Mobile Site", caption: "Yukai Mobile Site" },
      { src: "/portfolio/images/ccc/yukai_life_website.png?height=480&width=430", alt: "YUKAI LIFE Flash Contents", caption: "Yukai Life" }
    ],
    tools: [ 
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-0" />, name :"Adobe Flash"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAdobeillustrator size="32px" className="mb-0" />, name :"Adobe Illustrator"},
    ],
    duration: "2年~",
    client: "-",
    year: "2011",
  },
  {
    id: 1,
    title: "WEDIT DESIGN",
    thumbnail: "/portfolio/images/works-top-weditdesign.png?height=630&width=1200",
    description: "WEBサイトなどWEB向けコンテンツ制作内容",
    category: "WEB制作",
    overviewTitle: "担当業務内容",
    overview: [
      "韓国では長年にわたりWebデザイナーとして、さまざまなWebコンテンツの制作に携わってきました。",
      "デザインからコーディングまで一貫して担当し、実務を通じて幅広いスキルを身につけることができました。",
      "在籍していた会社は小規模ながら、まるでサークルのようなアットホームな雰囲気で、コミュニケーションも活発でした。",
      "そのような働きやすい環境の中で、毎日楽しく前向きに仕事に取り組んでいたことを今でもよく覚えています。",
    ],
    responsibilitiesTitle: "",
    responsibilities: [
      "WebデザイナーとしてWebサイト制作（HTML, CSS, JavaScript）",
      "Flashを使用したFlashサイトを制作",
    ],
    videoUrl: "",
    galleryTitle: "制作を担当したプロジェクト",
    galleryDetailView: "true",
    galleryGrids: "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5",
    gallery: [
      { src: "/portfolio/images/weditdesign/kerasys.jpg?width=480&height=472", alt: "Kerasys", caption: "Kerasys Online Promotion" },
      { src: "/portfolio/images/weditdesign/rfid.jpg?width=480&height=373", alt: "RFid", caption: "PIFF RFiD Service Experience" },
      { src: "/portfolio/images/weditdesign/rentaphone.jpg?width=480&height=480", alt: "Rent a Phone", caption: "PIFF RFiD Phone Rent Service" },
      { src: "/portfolio/images/weditdesign/yournz.jpg?width=480&height=459", alt: "YourNZ", caption: "YourNZ Website" },
      { src: "/portfolio/images/weditdesign/greenjuice.jpg?width=520&height=410", alt: "Greenjuice", caption: "Pulmuone Greenjuice" },
      { src: "/portfolio/images/weditdesign/dsrgroup.jpg?width=480&height=353", alt: "DSRGroup", caption: "DSRGroup Website" },
      { src: "/portfolio/images/weditdesign/kt_telecop.jpg?width=509&height=400", alt: "KT TELECOP", caption: "KT TELECOP Website" },
      { src: "/portfolio/images/weditdesign/kt_linkus.jpg?width=492&height=350", alt: "KT LINKUS", caption: "KT LINKUS Website" },
      { src: "/portfolio/images/weditdesign/the_hong.jpg?width=477&height=460", alt: "The Hong", caption: "The Hong Website" },
      { src: "/portfolio/images/weditdesign/eria.jpg?width=499&height=390", alt: "eria welfare", caption: "eria welfare Website" },
      { src: "/portfolio/images/weditdesign/eyenuri.jpg?width=455&height=344", alt: "EyeNuri", caption: "EyeNuri Website" },
      { src: "/portfolio/images/weditdesign/macpert.jpg?width=460&height=449", alt: "Macpert", caption: "Macpert - Marketing&Consulting Expert" },
      { src: "/portfolio/images/weditdesign/cl_interactive.png?width=480&height=430", alt: "CL INTERACTIVE", caption: "CL INTERACTIVE Website" },
      { src: "/portfolio/images/weditdesign/softzen.jpg?width=490&height=428", alt: "Softzen", caption: "Softzen - The Best Mobile Company" },
      { src: "/portfolio/images/weditdesign/donga01.jpg?width=428&height=330", alt: "Donga Ilbo Company", caption: "Donga Ilbo Company Website" },
      { src: "/portfolio/images/weditdesign/webzine.jpg?width=428&height=292", alt: "TOYA Webzine", caption: "TOYA WEBZINE Website" },
      { src: "/portfolio/images/weditdesign/donga02.jpg?width=428&height=408", alt: "Donga Ilbo Cyber Tour", caption: "Donga Ilbo CyberTour Website" },
      { src: "/portfolio/images/weditdesign/sicf.jpg?width=428&height=373", alt: "Seoul International Cultural Foundation", caption: "Seoul International DanceCompetition Website" },
      { src: "/portfolio/images/weditdesign/design.jpg?width=428&height=448", alt: "Design House", caption: "Design House Website" },
      { src: "/portfolio/images/weditdesign/festival.jpg?width=428&height=458", alt: "Seoul Design Festival", caption: "Seoul Design Festival Website" },
      { src: "/portfolio/images/weditdesign/innotel.jpg?width=428&height=438", alt: "INNOTELETEK", caption: "INNOTELETEK Website" },
      { src: "/portfolio/images/weditdesign/alumni.jpg?width=428&height=294", alt: "Mckinsey Alumni", caption: "McKinsey&Company Alumi Website" },
      { src: "/portfolio/images/weditdesign/inno.jpg?width=428&height=348", alt: "INNO Design", caption: "INNO Design Website Renewal" },
      { src: "/portfolio/images/weditdesign/living.jpg?width=428&height=448", alt: "Seoul Living Design Fair 2005", caption: "Seoul Living Design Fair 2005 Website" },
      { src: "/portfolio/images/weditdesign/osong.jpg?width=430&height=436", alt: "Osong Bio-, alth Science Technopolis", caption: "Osong Bio-, alth Science TechnopolisWebsite" },
      { src: "/portfolio/images/weditdesign/expo.jpg?width=428&height=408", alt: "World Ceramic Exposion Foundation", caption: "World Ceramic Exposion Foundation Website" },
      { src: "/portfolio/images/weditdesign/vdk.jpg?width=428&height=411", alt: "VonDutch Korea", caption: "VonDutch Korea Website" },
      { src: "/portfolio/images/weditdesign/kmasd.jpg?width=428&height=432", alt: "Korea Management Association", caption: "Korea Management Association Website" },
      { src: "/portfolio/images/weditdesign/dsa.jpg?width=428&height=380", alt: "DongSeung ARK", caption: "DongSeung ARK Website" },
      { src: "/portfolio/images/weditdesign/gnet.jpg?width=428&height=374", alt: "Hyundai Food System", caption: "Hyundai Food System Website" },
      // { src: "/portfolio/images/weditdesign/konan.jpg?width=428&height=373", alt: "Konan Technology", caption: "Konan Technology Website" },
      // { src: "/portfolio/images/weditdesign/kokomo02.jpg?width=428&height=337", alt: "KOKOMO Living Store", caption: "KOKOMO ShoppingMall Website" },
      // { src: "/portfolio/images/weditdesign/mky.jpg?width=428&height=321", alt: "MKY Group", caption: "MKY Group Website" },
      // { src: "/portfolio/images/weditdesign/kokomo01.jpg?width=428&height=456", alt: "KOKOMO Living", caption: "KOKOMO Living Website" },
      // { src: "/portfolio/images/weditdesign/interpark01.jpg?width=428&height=468", alt: "Interpark KnowHow", caption: "Interpark KnowHow Website" },
      // { src: "/portfolio/images/weditdesign/lotte01.jpg?width=428&height=457", alt: "Lotte Town Finance", caption: "Lotte Town Finance Website" },
      // { src: "/portfolio/images/weditdesign/wedi.jpg?width=428&height=320", alt: "The World Ethnic Dance Institute", caption: "The World Ethnic Dance Institute Website" },
      // { src: "/portfolio/images/weditdesign/kma.jpg?width=428&height=364", alt: "Korea Management Association", caption: "Korea Management Association WebsiteRenewal" },
      // { src: "/portfolio/images/weditdesign/habitat.jpg?width=428&height=348", alt: "Habitat", caption: "Habitat Website Renewal" },
      // { src: "/portfolio/images/weditdesign/interpark01.jpg?width=428&height=433", alt: "Interpark KnowHow", caption: "Interpark KnowHow Website" },
      // { src: "/portfolio/images/weditdesign/hoseo.jpg?width=428&height=346", alt: "Hoseo University Entrance Information", caption: "Hoseo University EntranceInformation Website" },
      // { src: "/portfolio/images/weditdesign/cs.jpg?width=428&height=358", alt: "Hanbit Soft Counter Strike", caption: "Hanbit Soft Counter Strike Website" },
      // { src: "/portfolio/images/weditdesign/daum.jpg?width=426&height=334", alt: "Daum Cafe Template", caption: "Daum Communication Cafe Template" },
      // { src: "/portfolio/images/weditdesign/lemon.jpg?width=428&height=456", alt: "Lotte Lemon", caption: "Lotte Lemon Website" },
      // { src: "/portfolio/images/weditdesign/asiana02.jpg?width=428&height=336", alt: "Asiana Littles", caption: "Asiana Littles Website" },
      // { src: "/portfolio/images/weditdesign/mc.jpg?width=600&height=260", alt: "McKinsey&Company", caption: "McKinsey&Company Website" },
      // { src: "/portfolio/images/weditdesign/toshiba.jpg?width=428&height=267", alt: "Club Toshiba", caption: "Club Toshiba Website" },
      // { src: "/portfolio/images/weditdesign/ted.jpg?width=428&height=441", alt: "TED Architerior", caption: "TED Architerior Website" },
      // { src: "/portfolio/images/weditdesign/velox.jpg?width=428&height=441", alt: "Velox Soft", caption: "Velox Soft Website" },
      // { src: "/portfolio/images/weditdesign/samsung01.jpg?width=428&height=369", alt: "Samsung Everland Publicity Information", caption: "Samsung Everland PublicityInformation System" },
      // { src: "/portfolio/images/weditdesign/dr01.jpg?width=428&height=459", alt: "DigitalRank 4th", caption: "DigitalRank 4th Renewal" },
      // { src: "/portfolio/images/weditdesign/yonhap.jpg?width=428&height=430", alt: "Yonhapnews Weather", caption: "Yonhapnews Weather Website" },
      // { src: "/portfolio/images/weditdesign/livetone.jpg?width=428&height=319", alt: "LiveTone", caption: "LiveTone Website" },
      // { src: "/portfolio/images/weditdesign/fan.jpg?width=428&height=387", alt: "FanPlus", caption: "FanPlus Website" },
      // { src: "/portfolio/images/weditdesign/sibc.jpg?width=428&height=404", alt: "SIB Center", caption: "SIB Center Website" },
      // { src: "/portfolio/images/weditdesign/samsung04.jpg?width=428&height=431", alt: "Samsung Electronics UI", caption: "Samsung Electronics UI Template" },
      // { src: "/portfolio/images/weditdesign/samsung05.jpg?width=428&height=337", alt: "Samsung Life", caption: "Samsung Life Website" },
      // { src: "/portfolio/images/weditdesign/dr02.jpg?width=428&height=407", alt: "DigitalRank 3th", caption: "DigitalRank 4th Renewal" },
      // { src: "/portfolio/images/weditdesign/asiana01.jpg?width=428&height=343", alt: "Asiana Littles", caption: "Asiana Littles Website" },
    ],
    tools: [ 
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-0" />, name :"Adobe Flash"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-0" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-0" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAdobeillustrator size="32px" className="mb-0" />, name :"Adobe Illustrator"},
    ],
    duration: "2年~",
    client: "-",
    year: "2011",
  },
]

function Overview({ params }) {
  return (
    <div className="m-4 mt-2 mb-6 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="items-center justify-between gap-4">
        {(params.overviewTitle.length >= 0) && (<h2 className="mb-4 ml-0 mr-0 text-xl font-semibold text-gray-900 dark:text-white">{params.overviewTitle}</h2>)}
        <div>
          {params.overview.map((detail, index) => (
            <p className="mt-1 text-gray-700 dark:text-gray-400" key={index}>
            {detail}
          </p>
          ))}
        </div>
        {(params.responsibilitiesTitle.length == 0) && (<div className="mt-4">
            {params.responsibilities.map((step, index) => (
              <div className="mb-1 flex items-start gap-4" key={index}>
                <div className="mt-2 flex h-2 w-2 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-sm font-medium text-white dark:from-gray-700 dark:to-gray-500"></div>
                <div className="pt-0">
                  <p className="font-medium text-gray-900 dark:text-white">{step}</p>
                </div>
              </div>
            ))}
          </div>)}
      </div>
    </div>
  )
}

function Responsibilities({ params }) {
  return (
    <div className="m-4 mt-2 mb-6 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="items-center justify-between gap-4">
        <h2 className="mb-4 ml-0 mr-0 text-xl font-semibold text-gray-900 dark:text-white">{params.responsibilitiesTitle}</h2>
        <div className="mt-0 prose max-w-none dark:prose-invert">
          <div className="">
            {params.responsibilities.map((step, index) => (
              <div className="mb-1 flex items-start gap-4" key={index}>
                <div className="mt-2 flex h-2 w-2 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-sm font-medium text-white dark:from-gray-700 dark:to-gray-500"></div>
                <div className="pt-0">
                  <p className="font-medium text-gray-900 dark:text-white">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function YoutubePlayer({ params }) {
  return (
    <div className="m-4 mt-2 mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl">
      <div className={`${params.isPortraitRatio}`}>
        <ReactPlayer
          url = {params.youtubeUrl}
          muted
          controls
          pip
          width = {"100%"}
          height = {"100%"}
        />
      </div>
    </div>
  )
}

function VideoPlayer({ params }) {
  return (
    <div className="m-4 mt-2 mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl">
      <div className={`${params.isPortraitRatio}`}>
        <MediaController style={{ width: "100%" }} mediacontroller="mc">
          <video
            slot = "media"
            src = {params.videoUrl}
            poster = {params.videoPoster}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          ></video>
          <MediaControlBar>
            <MediaPlayButton className="pl-4" />
            <MediaTimeRange className="px-2" />
            <MediaTimeDisplay showDuration className="text-sm" />
            {/* <MediaMuteButton /> */}
            {/* <MediaVolumeRange /> */}
            <MediaPlaybackRateButton className="px-2" />
            <MediaFullscreenButton className="pr-4" />
          </MediaControlBar>
        </MediaController>
      </div>
    </div>
  )
}

function Tools ({ title, params }) {
  return (
    <div className="m-4 mt-2 mb-6 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="prose max-w-none dark:prose-invert">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {params.tools.map((tool, index) => (
            // <InteractiveCard
            //   key={index}
            //   className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-900/30"
            // >
            <InteractiveCard
              key={index}
              className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-900/30"
            >
              <div className="flex justify-center items-center">
                {tool.icon}
                <span className="ml-2 font-medium text-gray-900 dark:text-white text-xs">{tool.name}</span>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PortfolioDetailPage({ params }) {
  const router = useRouter()
  const { id } = use(params);
  const { t } = useLanguage()
  const [work, setWork] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPageNum, setCurrentPageNum] = useState(null)

  useEffect(() => {
    const pageid = id;
    setCurrentPageNum(pageid);
    
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize("G-970VH63QCH");
      ReactGA.send({ hitType: "pageview", title: "Works Detail Page" });
    }

    const handleContextMenu = (event) => {
      event.preventDefault(); // 우클릭 방지
    }
    // document에 이벤트 리스너 추가
    document.addEventListener("contextmenu", handleContextMenu);
    
    // 포트폴리오 아이템 찾기
    const parsedId = Number.parseInt(pageid);

    if (isNaN(parsedId)) {
      router.push("/works")
      return
    }
    
    const item = workItems.find((item) => item.id === parsedId)

    if (item) {
      setWork(item)
    } else {
      router.push("/works")
    }

    // 로딩 상태 업데이트
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [id, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>
    )
  }

  if (!work) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-light from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <ParticleBackground />
      <ScrollProgress color="var(--color-primary)" />
      <Navbar />

      {/* 히어로 섹션 */}
      <ParallaxHero
        imageUrl={work.thumbnail}
        title={work.title}
        subtitle={work.description}
        height="40vh"
        overlayOpacity={0.7}
      ></ParallaxHero>

      <main className="container relative mx-auto px-4 py-8">
        {/* 동영상플레이어의 위치에 따른 레이아웃 분기 */}
        {!work.isVideoRightPosition ? (
        <div>
          {/* 프로젝트소개 */}
          {(work.overview.length > 0) && (
          <ScrollReveal>
            <Overview params={work} />
          </ScrollReveal>
          )}
          {/* 업무내용 */}
          {(work.responsibilitiesTitle.length > 0) && (work.responsibilities.length > 0) && (
          <ScrollReveal>
            <Responsibilities params={work} />
          </ScrollReveal>
          )}

          <div className={work.isPortraitVideo ? "grid gap-0 sm:grid-cols-1 md:grid-cols-3" : ""}>
            {/* 비디오 플레이어 YouTube */}
            {work.isPlayYoutube && work.youtubeUrl && (
            <ScrollReveal className={work.isPortraitVideo ? "md:col-span-1" : ""}>
              <YoutubePlayer params={work} />
            </ScrollReveal>
            )}

            {/* 비디오 플레이어 MP4 */}
            {work.isPlayVideo && work.videoUrl && (
            <ScrollReveal className={work.isPortraitVideo ? "md:col-span-1" : ""}>
              <VideoPlayer params={work} />
            </ScrollReveal>
            )}

            {/* 갤러리 섹션 */}
            {work.gallery && (
              <ScrollReveal className={work.isPortraitVideo ? "md:col-span-2" : ""}>
                <div className="m-4 mt-2 mb-6 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                  {/* <h2 className="mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-lg font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400">{work.galleryTitle}</h2> */}
                  <h2 className="mb-4 ml-0 mr-0 text-xl font-semibold text-gray-900 dark:text-white">{work.galleryTitle}</h2>
                  <ImageGallery images={work.gallery} isDetailView = {work.galleryDetailView} grids={work.galleryGrids} />
                </div>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal>
            <Tools title={t("project.tools")} params={work} />
          </ScrollReveal>
        </div>
        ) : (
        <div className="grid gap-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-3">
          <ScrollReveal className="sm:col-span-1 md:col-span-1 lg:col-span-3 xl:col-span-2">
            {(work.overview.length > 0) && (
              <Overview params={work} />
            )}
            {(work.responsibilitiesTitle.length > 0) && (work.responsibilities.length > 0) && (  
            <Responsibilities params={work} />
            )}
            <div className="md:hidden lg:block">
              <Tools title={t("project.tools")} params={work} />
            </div>
          </ScrollReveal>
          {/* 비디오 플레이어 YouTube */}
          <ScrollReveal className="sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-1">
            {/* 비디오 플레이어 YouTube */}
            {work.isPlayYoutube && work.youtubeUrl && (
            <ScrollReveal className={work.isPortraitVideo ? "md:col-span-1" : ""}>
              <YoutubePlayer params={work} />
            </ScrollReveal>
            )}

            {/* 비디오 플레이어 MP4 */}
            {work.isPlayVideo && work.videoUrl && (
            <ScrollReveal className={work.isPortraitVideo ? "md:col-span-1" : ""}>
              <VideoPlayer params={work} />
            </ScrollReveal>
            )}
            <div className="md:block lg:hidden">
              <Tools title={t("project.tools")} params={work} />
            </div>
          </ScrollReveal>
        </div>
        )}

        {work.url && (
          <ScrollReveal>
            <div className="m-4 mt-2 mb-2 flex justify-center shadow-lg">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-xl w-full border-gray-300 px-12 py-6 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => window.open(work.url, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                {t("project.visitWebsite")}
              </Button>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <div className="flex items-center justify-between m-4 mt-6 mb-6 animate-fade-in-up">
            <Button
              variant="outline"
              className={`mb-2 px-6 flex items-center gap-2 ${Number.parseInt(currentPageNum) < workItems.length ? "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 cursor-pointer hover:border-gray-400 hover:bg-gray-50 shadow-md hover:shadow-lg" : "text-gray-300"} rounded-xl border-gray-300 bg-gray-50`}
              onClick={() => {
                if(Number.parseInt(currentPageNum) < workItems.length) {
                  router.push(`/works/${Number.parseInt(currentPageNum) + 1}`);
                } 
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              {/* {t("project.viewNext")} */}
            </Button>
            <Button
              variant="outline"
              className="mb-2 px-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 cursor-pointer hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg rounded-xl border-gray-300 bg-gray-50 shadow-md"
              onClick={() => router.push("/works")}
            >
              <List className="h-4 w-4" />
              {t("project.viewAll")}
            </Button>
            <Button
              variant="outline"
              className={`mb-2 px-6 flex items-center gap-2 ${Number.parseInt(currentPageNum) - 1 > 0 ? "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 cursor-pointer hover:border-gray-400 hover:bg-gray-50 shadow-md hover:shadow-lg" : "text-gray-300"} rounded-xl border-gray-300 bg-gray-50`}
              onClick={() => {
                if(Number.parseInt(currentPageNum) - 1 > 0) {
                  router.push(`/works/${Number.parseInt(currentPageNum) - 1}`);
                } 
              }}
            >
              {/* {t("project.viewPrev")} */}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </ScrollReveal>
      </main>
    </div>
  )
}
