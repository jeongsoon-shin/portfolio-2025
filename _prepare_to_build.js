const fs = require('fs');
const path = require('path');

const TARGET_NAME = '\[id\]'; 
// 원본 템플릿 폴더명
const baseTemplateDir = path.resolve(__dirname, './app/portfolio', TARGET_NAME);
const componentsDir = path.resolve(__dirname, './app/portfolio');

// 복제할 개수 설정
const COUNT = 13;

for (let i = 1; i <= COUNT; i++) {
  const componentName = `${i}`; // 예: Component1, Component2, ...
  const targetDir = path.join(componentsDir, componentName);

  // 1. 템플릿 복제
  fs.cpSync(baseTemplateDir, targetDir, { recursive: true });

  // 2. 내부 파일 수정
  const indexFilePath = path.join(targetDir, 'page.jsx');
  let content = fs.readFileSync(indexFilePath, 'utf8');

  // 템플릿 이름 및 변수 치환
  content = content.replace(/const pageid = id;/, `const pageid = ${i};`);

  fs.writeFileSync(indexFilePath, content, 'utf8');

  console.log(`✅ ${componentName} 생성 완료`);
}