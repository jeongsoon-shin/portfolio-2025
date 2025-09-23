const fs = require('fs');
const path = require('path');

const TARGET_NAME = '[id]'; // 원본 템플릿 폴더명
const baseTemplateDir = path.resolve(__dirname, './app/works', TARGET_NAME);
const componentsDir = path.resolve(__dirname, './app/works');

// 복제할 개수 설정
const COUNT = 13;

for (let i = 1; i <= COUNT; i++) {
  const targetDirName = `${i}`; // 숫자 폴더명
  const targetDir = path.join(componentsDir, targetDirName);

  // 1. 템플릿 복제
  fs.cpSync(baseTemplateDir, targetDir, { recursive: true });

  // 2. 내부 파일 수정
  const indexFilePath = path.join(targetDir, 'page.jsx');
  let content = fs.readFileSync(indexFilePath, 'utf8');

  // const pageid = id; → const pageid = {i};
  content = content.replace(/const pageid = id;/, `const pageid = ${i};`);

  fs.writeFileSync(indexFilePath, content, 'utf8');

  console.log(`✅ ${targetDirName} 생성 완료`);
}

// 3. 원본 폴더명 변경
const newOriginalDir = path.join(componentsDir, '0'); // 0번 폴더로 변경
fs.renameSync(baseTemplateDir, newOriginalDir);
console.log(`📂 원본 폴더명 변경: ${TARGET_NAME} → 0`);