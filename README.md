# 물어봐이브 (Mureo-Vibe)

일상의 사소한 고민부터 창의적인 아이디어까지, 무엇이든 물어보면 AI가 재치있게 답해주는 인터랙티브 웹 앱

## 🚀 기술 스택

- **Frontend:** React (Vite)
- **AI API:** Gemini API
- **Styling:** CSS
- **Deployment:** Netlify
- **Code Formatting:** Prettier

## 📁 프로젝트 구조 (FSD - Feature-Sliced Design)

```
src/
├── app/           # 애플리케이션 설정
├── pages/         # 페이지 컴포넌트
├── widgets/       # 위젯 컴포넌트
├── features/      # 기능별 컴포넌트
├── entities/      # 비즈니스 엔티티
└── shared/        # 공유 유틸리티
    ├── ui/        # UI 컴포넌트
    ├── lib/       # 라이브러리
    ├── api/       # API 관련
    └── config/    # 설정
```

## 🛠️ 개발 환경 설정

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
```bash
cp env.example .env
# .env 파일에서 Gemini API 키를 설정하세요
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 코드 포맷팅
```bash
npm run format
```

## 🔧 주요 기능

- **질문 입력:** 사용자가 자유롭게 질문을 입력할 수 있는 텍스트 영역
- **AI 답변 생성:** Gemini API를 통한 실시간 AI 답변 생성
- **결과 표시:** 로딩 상태와 함께 AI 답변을 표시
- **에러 처리:** API 요청 실패 시 적절한 에러 메시지 표시

## 📝 사용자 플로우

1. 웹페이지 접속
2. 질문 입력 (예: "오늘 점심 메뉴로 마라탕 vs 돈까스 중에 골라줘")
3. [물어보기!] 버튼 클릭
4. 로딩 애니메이션 표시
5. AI 답변 결과 확인
6. 복사하기 또는 새로운 답변 요청

## 🔐 환경 변수

- `VITE_GEMINI_API_KEY`: Gemini API 키
- `VITE_GEMINI_API_URL`: Gemini API 엔드포인트

## 📦 배포

Netlify를 통한 자동 배포가 설정되어 있습니다.
