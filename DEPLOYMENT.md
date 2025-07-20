# 🚀 Netlify 배포 가이드

## 📋 배포 전 체크리스트

### 1. 환경 변수 설정
Netlify 대시보드에서 다음 환경 변수를 설정하세요:

```
GEMINI_API_KEY=your-gemini-api-key-here
```

### 2. 빌드 설정 확인
- **빌드 명령어**: `npm run build`
- **배포 디렉토리**: `dist`
- **Node.js 버전**: 18

## 🔧 배포 방법

### 방법 1: Netlify CLI 사용
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 배포
netlify deploy --prod
```

### 방법 2: Git 연동 (권장)
1. GitHub/GitLab에 코드 푸시
2. Netlify 대시보드에서 "New site from Git" 클릭
3. 저장소 연결
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 방법 3: 드래그 앤 드롭
1. `npm run build` 실행
2. `dist` 폴더를 Netlify에 드래그

## ⚙️ 설정 파일 설명

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"
  
  [build.environment]
    NODE_VERSION = "18"
    NPM_VERSION = "9"

# SPA 라우팅
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# 보안 헤더
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com;"
```

### public/_redirects
```
# SPA 라우팅 지원
/*    /index.html   200

# 보안 리다이렉트
/.env*  /404.html  404
/package.json  /404.html  404
/package-lock.json  /404.html  404

# 404 페이지 처리
/404  /index.html  200
```

## 🐛 문제 해결

### 빌드 실패
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 클리어
npm run build -- --force
```

### 환경 변수 문제
- Netlify 대시보드에서 환경 변수 확인
- 변수명이 정확한지 확인 (대소문자 구분)
- 재배포 후 확인

### 404 페이지 문제
- `public/_redirects` 파일이 올바른 위치에 있는지 확인
- SPA 라우팅이 제대로 설정되었는지 확인

### API 호출 문제
- CORS 설정 확인
- Gemini API 키가 올바른지 확인
- Content Security Policy 설정 확인

## 📊 성능 최적화

### 빌드 최적화
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber'],
          markdown: ['react-markdown']
        }
      }
    }
  }
})
```

### 이미지 최적화
- WebP 형식 사용
- 적절한 크기로 리사이즈
- lazy loading 적용

## 🔍 모니터링

### 성능 모니터링
- Netlify Analytics 활성화
- Core Web Vitals 확인
- Lighthouse 점수 확인

### 에러 모니터링
- Netlify Functions로 에러 로깅
- 사용자 피드백 수집

## 🚀 배포 후 확인사항

### 1. 기본 기능 테스트
- [ ] 홈페이지 로딩
- [ ] AI 채팅 기능
- [ ] 404 페이지 표시
- [ ] 반응형 디자인

### 2. SEO 확인
- [ ] 메타 태그 확인
- [ ] Open Graph 태그 확인
- [ ] Twitter Card 확인
- [ ] 구글 검색 콘솔 등록

### 3. 성능 확인
- [ ] 페이지 로딩 속도
- [ ] 이미지 최적화
- [ ] 번들 크기 확인

## 📱 도메인 설정

### 커스텀 도메인
1. Netlify 대시보드 → Site settings → Domain management
2. "Add custom domain" 클릭
3. 도메인 입력 및 DNS 설정

### SSL 인증서
- Netlify에서 자동으로 Let's Encrypt SSL 제공
- 커스텀 도메인 연결 시 자동 활성화

## 🔄 자동 배포

### Git 연동 시
- main/master 브랜치에 푸시하면 자동 배포
- Pull Request 시 미리보기 배포
- 브랜치별 환경 변수 설정 가능

### 배포 알림
- Slack, Discord, 이메일 등으로 배포 알림 설정
- 배포 성공/실패 알림

## 📞 지원

문제가 발생하면:
1. Netlify 로그 확인
2. 브라우저 개발자 도구 확인
3. 환경 변수 재확인
4. 빌드 로그 분석

---

**🎉 배포 완료 후 물어봐이브 고양이와 함께 즐거운 시간 보내세요! 🐱✨** 