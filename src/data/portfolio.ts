// ─────────────────────────────────────────────────────────
// 포트폴리오 데이터 파일
// 이 파일만 수정하면 사이트 전체 콘텐츠가 반영됩니다.
// ─────────────────────────────────────────────────────────

export const profile = {
  name: '송재욱',
  nameEn: 'Jaewook Song',
  role: '프론트엔드 개발자',
  tagline: "문제의 '왜'를 추적해 본질을 규명하는 개발자",
  bio: '복잡한 요구사항 속에서 진짜 문제를 재정의하고, 가장 단순하고 비용 효율적인 솔루션을 도출합니다.',
  contact: {
    phone: '010-7745-5407',
    email: 's24064@gsm.hs.kr',
    github: 'zaewc',
    githubUrl: 'https://github.com/zaewc',
    blog: 'haensol',
    // blogUrl: '', // 실제 URL 확인 후 기입
  },
};

export const heroMetrics = [
  { value: 'DAU 3,000+', label: '행사 당일 최고 접속', context: '光탈페 플랫폼' },
  { value: '3,000만+원', label: '외주 비용 절감', context: '공공기관 2개 프로젝트' },
  { value: '3만+명', label: '서비스 운영 인원', context: 'EXPO 프로젝트' },
  { value: 'npm 2,000+', label: '오픈소스 다운로드', context: 'Scrolloop 라이브러리' },
];

// ─────────────────────────────────────────────────────────
// 프로젝트
// ─────────────────────────────────────────────────────────

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Highlight {
  title: string;
  problem: string;
  approach: string;
  result: string;
  tech: string[];
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  period: string;
  client: string;
  description: string;
  metrics: ProjectMetric[];
  highlights: Highlight[];
  tech: string[];
  repoLabel?: string;
}

export const projects: Project[] = [
  {
    id: 'gwangtalpae',
    name: '光탈페 플랫폼',
    subtitle: '광주학생탈렌트페스티벌 공식 웹 서비스',
    period: '2025.02 – 2025.10',
    client: '광주고등학생의회 / 교육청',
    description:
      '예매 기능에 그치지 않고, 프로그램 소개·슬로건 공모·참여 신청·실시간 투표까지 통합 제공하는 플랫폼으로 확장 개발. 교육청 SI 업체 의존도를 없애고 직접 기획·개발·운영.',
    metrics: [
      { value: 'DAU 3,000+', label: '행사 당일' },
      { value: '73,000+', label: 'Vercel 누적 트래픽' },
      { value: '50,000+', label: 'GA 이벤트' },
      { value: '1,000만+원', label: '외주 절감' },
    ],
    highlights: [
      {
        title: 'TanStack Query 캐시 갱신 시 UI 미반영 해결',
        problem:
          'SSE 이벤트로 캐시는 갱신되는데, 섹션별 좌석 점유율 UI가 새로고침 전까지 반영되지 않음.',
        approach:
          'useMemo 의존성에 불변 객체 queryClient를 넣은 것이 원인. useQueries로 전환해 각 섹션 캐시를 reactive하게 구독. useMemo 의존성을 sectionQueries 배열로 교체.',
        result: '새로고침 없이 좌석 점유율이 SSE 수신 즉시 반영.',
        tech: ['SSE', 'TanStack Query', 'useQueries', 'Next.js'],
      },
      {
        title: '홈 페이지 초기 로딩 성능 개선',
        problem: '대용량 비디오·이미지가 한 번에 로드되어 초기 로딩 느림. 정보기기 미숙 사용자 접근성 이슈.',
        approach:
          'SSG + 섹션별 Lazy Loading 도입. 히어로 섹션은 즉시 로드 + above-the-fold 이미지 priority preload. Metadata API로 OG/keywords 설정, next-sitemap 자동화.',
        result:
          'FCP 0.8s→0.3s, LCP 2.1s→0.7s, SI 1.1s→0.6s (약 60% 개선). 주요 검색엔진 최상단 노출.',
        tech: ['Next.js', 'SSG', 'Lazy Loading', 'next-sitemap', 'Lighthouse'],
      },
    ],
    tech: ['Next.js', 'TypeScript', 'TanStack Query', 'SSE', 'Vercel'],
  },
  {
    id: 'expo',
    name: 'EXPO',
    subtitle: '교원 연수 및 박람회 사전 신청·등록 서비스',
    period: '2024.10 – 현재',
    client: '광주광역시교육청',
    description:
      '박람회·연수 사전 신청부터 QR 현장 인증·만족도 조사·Excel 자동 정리까지 운영 전체를 대체. AI·SW 체험 축전·미래교육박람회 포함 3만+ 명 운영.',
    metrics: [
      { value: '3만+명', label: '운영 인원' },
      { value: '2,000만+원', label: '외주 절감' },
      { value: 'QR 인증', label: '현장 출입 시스템' },
      { value: 'Excel 자동화', label: '데이터 수집' },
    ],
    highlights: [
      {
        title: 'DSL 기반 Schema로 렌더링 경로 단순화',
        problem:
          '렌더링마다 JSON.parse() 반복 실행. 잘못된 JSON 진입 시 White Screen of Death 위험. 런타임 타입 가드 필요, 고유 ID 없어 slugify(title) 사용.',
        approach:
          'Zod Schema로 Stringified JSON을 정형 DSL 객체로 변환. 데이터 수신 직후 Wrapper Layer에서 타입 확정 → UI 컴포넌트 내 타입 가드 제거. UUID 기반 고유 ID 도입.',
        result:
          'JSON.parse() 1회로 감소, 렌더링 성능 최적화, 질문 내용 수정 시에도 데이터 연결 유지.',
        tech: ['Zod', 'TypeScript', 'Next.js', 'DSL Pattern'],
      },
    ],
    tech: ['Next.js', 'TypeScript', 'Zod', 'React Hook Form'],
  },
  {
    id: 'gogo',
    name: 'GOGO',
    subtitle: '전국 중·고등학교 스포츠 행사 플랫폼',
    period: '2025.03 – 2025.05',
    client: '본교 → 전국 단위 확장 중',
    description:
      '수기 신청서와 디스코드 의존도를 없애고, 팀 신청·DnD 동적 대진표·일정 관리·승부 예측을 통합. 본교 체육대회 검증 후 전국 확장 목표.',
    metrics: [
      { value: 'DAU 300+', label: '본교 체육대회' },
      { value: '17만+', label: 'GA 누적 이벤트' },
      { value: 'DnD 대진표', label: '동적 Bracket' },
    ],
    highlights: [
      {
        title: '빠른 DnD 환경에서 Stale Closure 해결',
        problem:
          '드래그 후 이전 상태로 복구. onDragEnd가 생성 시점의 stale state를 zustand에 저장, 다음 렌더링까지 오염된 상태가 전파.',
        approach:
          'CustomEvent API 기반 이벤트 버스 도입. gameId별 데이터를 독립 관리하여 드래그 상태를 실시간으로 저장.',
        result: '드래그 즉시 상태 반영. 리렌더링 없이도 대진표 조작 정상 동작.',
        tech: ['CustomEvent API', 'Zustand', 'React DnD', 'TypeScript'],
      },
      {
        title: 'overflow:hidden 클리핑 이슈 → React Portal',
        problem:
          'TeamArray의 overflow:hidden이 드래그 중인 TeamItem을 클리핑하여 컨테이너 경계 밖으로 나가면 숨겨짐.',
        approach:
          'mount 시 portal 전용 DOM을 document.body에 직접 생성. createPortal로 드래그 요소를 클리핑 컨텍스트 외부에 렌더링.',
        result: '컨테이너 경계를 넘는 자연스러운 드래그 UX 구현.',
        tech: ['React Portal', 'createPortal', 'DOM Manipulation'],
      },
    ],
    tech: ['Next.js', 'TypeScript', 'Zustand', 'React DnD', 'Google Analytics'],
  },
  {
    id: 'siminhwapye',
    name: '시민화폐 광산',
    subtitle: '광산구 주민 화합 지역 화폐 거래 서비스',
    period: '2025.04 – 현재',
    client: '광주광역시 광산구',
    description:
      'iOS 개발자 갑작스러운 이탈 → React Native로 공백 메우고 App Store 릴리즈까지. 어드민 웹 + 모바일 앱 MVP 동시 담당.',
    metrics: [
      { value: 'App Store', label: '릴리즈 완료' },
      { value: '웹 + 앱', label: '단독 개발 담당' },
      { value: '<1%', label: 'WebSocket 유실률' },
    ],
    highlights: [
      {
        title: 'WebSocket 메시지 유실 개선 & 오프라인 대응',
        problem:
          '연결 상태만 확인 후 전송 → 네트워크 끊김 시 메시지 유실. 오프라인 전송·재시도·피드백 없어 UX 저하.',
        approach:
          'Zustand Persistent Queue 도입 + 낙관적 업데이트. isSocketConnected를 useEffect로 감시, PENDING/FAILED 메시지 자동 재전송.',
        result: '데이터 유실률 1% 이내로 감소. UI 즉시 반영.',
        tech: ['Zustand', 'WebSocket', 'React Native', 'Optimistic Update'],
      },
    ],
    tech: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'WebSocket'],
  },
];

// ─────────────────────────────────────────────────────────
// 사이드 프로젝트
// ─────────────────────────────────────────────────────────

export interface SideProject {
  name: string;
  tagline: string;
  description: string;
  metrics: { value: string; label: string }[];
}

export const sideProjects: SideProject[] = [
  {
    name: 'Scrolloop',
    tagline: 'cross-framework 경량 스크롤 라이브러리',
    description:
      'Windowing 기반 VirtualList + InfiniteList. React & React Native 동시 지원. turbopack 기반 모노레포.',
    metrics: [
      { value: '2,000+', label: 'npm 다운로드' },
      { value: '45kb', label: '번들 사이즈' },
      { value: '0', label: '디펜던시' },
    ],
  },
  {
    name: 'JEE6',
    tagline: '교내 디스코드 편의성 봇',
    description:
      '급식 조회, 자습 신청 리마인드, 미니게임 등. Python + MariaDB, Docker + CloudType 배포, In-memory 캐싱으로 응답 최적화.',
    metrics: [
      { value: '40+', label: '서버 도입' },
      { value: 'DAU 100+', label: '일일 사용자' },
    ],
  },
];

// ─────────────────────────────────────────────────────────
// 오픈소스 기여
// ─────────────────────────────────────────────────────────

export interface OSSContribution {
  project: string;
  description: string;
  type: 'bugfix' | 'improvement' | 'test' | 'docs';
}

export const ossContributions: OSSContribution[] = [
  {
    project: 'typescript-eslint',
    description:
      'no-floating-promises 규칙의 allowForKnownSafeCalls 옵션이 함수 이름을 올바르게 인식하지 못하는 버그 수정',
    type: 'bugfix',
  },
  {
    project: 'TanStack/query',
    description:
      'eslint-plugin-query를 TypeScript 없는 환경에서도 사용할 수 있도록 TypeScript를 optional peer dependency로 선언',
    type: 'improvement',
  },
  {
    project: 'fast_float',
    description: 'double/float 파싱의 edge case 검증을 위한 unit 테스트 추가',
    type: 'test',
  },
  {
    project: 'nest',
    description:
      'SSE, 캐시, swagger 관련 기능 검증을 위한 unit 및 e2e 테스트 추가 (PR 3개)',
    type: 'test',
  },
];

// ─────────────────────────────────────────────────────────
// 기술 스택
// ─────────────────────────────────────────────────────────

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'TanStack Query', 'Zustand', 'Tailwind CSS'],
  },
  {
    category: 'Mobile',
    items: ['React Native', 'Expo'],
  },
  {
    category: 'Real-time',
    items: ['WebSocket', 'SSE', 'Optimistic Update', 'Persistent Queue'],
  },
  {
    category: 'Performance & DX',
    items: ['Lighthouse', 'SSG', 'Lazy Loading', 'Zod', 'ESLint', 'Turbopack'],
  },
  {
    category: 'Infra & Deploy',
    items: ['Vercel', 'Docker', 'CloudType', 'GitHub Actions'],
  },
  {
    category: 'Open Source',
    items: ['typescript-eslint', 'TanStack/query', 'NestJS (nest)', 'Rust (fast_float)'],
  },
];

// ─────────────────────────────────────────────────────────
// 리더십 & 활동
// ─────────────────────────────────────────────────────────

export const leadership = [
  {
    title: '제7·8대 학생부회장',
    org: '광주소프트웨어마이스터고등학교',
    period: '2024 – 2025',
    description:
      '2년 연속 부회장으로 선출. 매주 교장·교감과 정기 회의를 통해 학교 현안을 주도적으로 논의하며 학생회와 학교 전체를 리드.',
  },
  {
    title: 'INCUBE 창단 & 운영',
    org: '웹 개발 전공 동아리',
    period: '2024 – 현재',
    description:
      '교내 웹 개발 전공 동아리를 직접 창단. 교내 최대 규모로 성장시키며 후배 양성을 핵심 가치로 운영.',
  },
];

// ─────────────────────────────────────────────────────────
// 학력 / 자격 / 수상
// ─────────────────────────────────────────────────────────

export const education = {
  school: '광주소프트웨어마이스터고등학교',
  department: '소프트웨어개발과',
  period: '2024.03 – 2027.01 (졸업 예정)',
};

export const certifications = [
  { name: 'TOPCIT 수준 3', score: '512점', date: '2025.05' },
  { name: '정보처리산업기사', score: '과정평가형', date: '2025.12' },
  { name: 'TOEIC', score: '785점 (LC 445, RC 340)', date: '2026.01' },
];

export const awards = [
  { year: '2025', name: '제2회 GSM Dev Fest 2위, 3위 입상' },
  { year: '2025', name: '제10회 HIGHTON 장려상' },
  { year: '2025', name: 'GSM 역량인증대회 3위' },
  { year: '2024', name: '2024 SW 동행 해커톤 장려상' },
  { year: '2024', name: '2024 SW 동행 데모데이 장려상' },
  { year: '2024', name: '제10회 빛가람 에너지밸리 SW 경진대회 장려상' },
  { year: '2024', name: 'GSM 아이디어 페스티벌 3위' },
  { year: '2024', name: 'GSM 역량인증대회 3위' },
];
