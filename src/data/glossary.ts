export type Term={category:string;en:string;ko:string;definition:string;game:string;year?:string};
export const glossary:Term[]=[
  {
    "category": "기본",
    "en": "GP",
    "ko": "그랑프리",
    "definition": "한 개최지에서 열리는 경기 이벤트.",
    "game": "연습부터 결승까지의 주말 일정이다."
  },
  {
    "category": "기본",
    "en": "Paddock",
    "ko": "패독",
    "definition": "팀과 관계자가 활동하는 경기장 구역.",
    "game": "트랙이나 피트레인과 구분된다."
  },
  {
    "category": "기본",
    "en": "Pit Lane",
    "ko": "피트레인",
    "definition": "차량이 정비 구역에 출입하는 통로.",
    "game": "속도 제한과 진입선을 지킨다."
  },
  {
    "category": "기본",
    "en": "Stint",
    "ko": "스틴트",
    "definition": "한 세트의 타이어로 주행하는 연속 구간.",
    "game": "타이어 마모와 피트 전략을 판단한다."
  },
  {
    "category": "기본",
    "en": "Formation Lap",
    "ko": "포메이션 랩",
    "definition": "출발 전 그리드로 돌아오는 준비 주행.",
    "game": "타이어와 브레이크 온도를 관리한다."
  },
  {
    "category": "주행",
    "en": "Apex",
    "ko": "에이펙스",
    "definition": "레이싱 라인이 코너 안쪽에 가장 가까워지는 지점.",
    "game": "탈출 방향과 다음 코너를 고려한다."
  },
  {
    "category": "주행",
    "en": "Racing Line",
    "ko": "레이싱 라인",
    "definition": "랩타임을 줄이기 위한 주행 경로.",
    "game": "교통과 노면 상태에 따라 바뀐다."
  },
  {
    "category": "주행",
    "en": "Trail Braking",
    "ko": "트레일 브레이킹",
    "definition": "조향을 시작하면서 제동 압력을 점진적으로 줄이는 기술.",
    "game": "LT를 부드럽게 해제한다."
  },
  {
    "category": "주행",
    "en": "Throttle Modulation",
    "ko": "스로틀 조절",
    "definition": "가속 입력을 접지력에 맞춰 조절하는 기술.",
    "game": "조향을 풀면서 RT를 늘린다."
  },
  {
    "category": "주행",
    "en": "Short Shifting",
    "ko": "쇼트 시프팅",
    "definition": "최대 회전수 이전에 상위 기어로 변속하는 기술.",
    "game": "저속 탈출 때 휠스핀을 줄이는 데 도움이 된다."
  },
  {
    "category": "주행",
    "en": "Lift & Coast",
    "ko": "리프트 앤 코스트",
    "definition": "제동 전에 가속을 놓고 관성으로 주행하는 방법.",
    "game": "연료와 에너지 관리에 활용한다."
  },
  {
    "category": "주행",
    "en": "Lock-up",
    "ko": "락업",
    "definition": "제동 중 바퀴가 잠겨 미끄러지는 현상.",
    "game": "ABS를 끈 경우 특히 주의한다."
  },
  {
    "category": "주행",
    "en": "Wheelspin",
    "ko": "휠스핀",
    "definition": "구동력이 접지력을 넘어서 바퀴가 헛도는 현상.",
    "game": "스로틀을 줄이거나 일찍 업시프트한다."
  },
  {
    "category": "차량 거동",
    "en": "Understeer",
    "ko": "언더스티어",
    "definition": "차량이 의도한 방향보다 덜 회전하는 현상.",
    "game": "진입 속도와 앞 타이어 접지력을 점검한다."
  },
  {
    "category": "차량 거동",
    "en": "Oversteer",
    "ko": "오버스티어",
    "definition": "차량 후미가 바깥으로 밀리며 과도하게 회전하는 현상.",
    "game": "급격한 가속과 조향을 피한다."
  },
  {
    "category": "차량 거동",
    "en": "Dirty Air",
    "ko": "더티 에어",
    "definition": "앞 차량의 난류로 뒤 차량의 공력 성능이 저하되는 현상.",
    "game": "고속 코너 추종 시 접지력 변화에 주의한다."
  },
  {
    "category": "차량 거동",
    "en": "Slipstream",
    "ko": "슬립스트림",
    "definition": "앞 차량 뒤에서 공기 저항이 줄어드는 효과.",
    "game": "직선 추월에 활용할 수 있다."
  },
  {
    "category": "차량 기술",
    "en": "Downforce",
    "ko": "다운포스",
    "definition": "공기 흐름으로 차량을 노면 방향으로 누르는 힘.",
    "game": "코너 접지력 확보에 기여한다."
  },
  {
    "category": "차량 기술",
    "en": "Drag",
    "ko": "드래그",
    "definition": "주행 방향에 반대되는 공기 저항.",
    "game": "직선 최고속도에 영향을 준다."
  },
  {
    "category": "차량 기술",
    "en": "DRS",
    "ko": "가변 리어윙",
    "definition": "2025 규정에서 리어윙을 열어 항력을 줄이는 장치.",
    "game": "2026 액티브 에어로와 구분한다.",
    "year": "2025"
  },
  {
    "category": "차량 기술",
    "en": "Active Aero",
    "ko": "액티브 에어로",
    "definition": "2026 규정의 가변 공력 장치.",
    "game": "게임 내 작동 조건과 버튼은 설정을 확인한다.",
    "year": "2026"
  },
  {
    "category": "차량 기술",
    "en": "ERS",
    "ko": "에너지 회수 시스템",
    "definition": "에너지를 회수하고 전기 구동에 활용하는 시스템.",
    "game": "배터리 상태와 사용 구간을 관리한다."
  },
  {
    "category": "차량 기술",
    "en": "Overtake Mode",
    "ko": "추월 모드",
    "definition": "2026 규정에서 조건에 따라 추가 전기 에너지 활용을 허용하는 기능.",
    "game": "액티브 에어로와 별개이며 게임 내 조건은 별도 확인한다.",
    "year": "2026"
  },
  {
    "category": "타이어",
    "en": "Graining",
    "ko": "그레이닝",
    "definition": "타이어 표면에 고무가 뭉치며 접지력이 저하되는 현상.",
    "game": "온도와 미끄러짐을 관리한다."
  },
  {
    "category": "타이어",
    "en": "Blistering",
    "ko": "블리스터링",
    "definition": "과열로 타이어 고무에 기포나 손상이 발생하는 현상.",
    "game": "과도한 열 축적을 피한다."
  },
  {
    "category": "타이어",
    "en": "Degradation",
    "ko": "디그라데이션",
    "definition": "타이어 성능이 주행 중 저하되는 현상.",
    "game": "마모율뿐 아니라 페이스 변화를 확인한다."
  },
  {
    "category": "타이어",
    "en": "Flat Spot",
    "ko": "플랫 스폿",
    "definition": "락업 등으로 타이어 특정 부위가 평평하게 마모되는 현상.",
    "game": "진동과 접지력 저하를 유발할 수 있다."
  },
  {
    "category": "타이어",
    "en": "Compound",
    "ko": "컴파운드",
    "definition": "타이어 고무 배합에 따른 종류.",
    "game": "소프트·미디엄·하드의 특성을 비교한다."
  },
  {
    "category": "전략",
    "en": "Undercut",
    "ko": "언더컷",
    "definition": "경쟁자보다 먼저 정차해 새 타이어의 페이스로 역전을 노리는 전략.",
    "game": "출차 후 교통과 타이어 온도가 중요하다."
  },
  {
    "category": "전략",
    "en": "Overcut",
    "ko": "오버컷",
    "definition": "경쟁자보다 늦게 정차해 기존 타이어와 클린 에어로 역전을 노리는 전략.",
    "game": "기존 타이어의 페이스가 충분해야 한다."
  },
  {
    "category": "전략",
    "en": "Pit Window",
    "ko": "피트 윈도우",
    "definition": "피트스톱에 적합한 예상 랩 범위.",
    "game": "교통과 안전차 상황에 따라 조정한다."
  },
  {
    "category": "전략",
    "en": "Clean Air",
    "ko": "클린 에어",
    "definition": "앞 차량의 난류 영향이 적은 공기 흐름.",
    "game": "자유로운 페이스 확보에 유리하다."
  },
  {
    "category": "규정",
    "en": "SC",
    "ko": "세이프티카",
    "definition": "사고 등으로 차량 대열의 속도를 제한하는 안전 차량.",
    "game": "추월 제한과 재출발 절차를 따른다."
  },
  {
    "category": "규정",
    "en": "VSC",
    "ko": "버추얼 세이프티카",
    "definition": "실제 안전차 없이 정해진 속도 기준으로 주행을 제한하는 절차.",
    "game": "델타를 확인한다."
  },
  {
    "category": "규정",
    "en": "Parc Fermé",
    "ko": "파르크 페르메",
    "definition": "규정에 따라 차량 변경이 제한되는 상태 또는 관리 구역.",
    "game": "예선 전후 세팅 제한을 확인한다."
  },
  {
    "category": "규정",
    "en": "Track Limits",
    "ko": "트랙 리미트",
    "definition": "허용된 트랙 경계에 관한 규정.",
    "game": "반복 위반 시 페널티가 발생할 수 있다."
  },
  {
    "category": "규정",
    "en": "Blue Flag",
    "ko": "청기",
    "definition": "추월 또는 랩 차이 관련 상황을 알리는 깃발.",
    "game": "게임의 안내와 세션별 규정을 따른다."
  },
  {
    "category": "세팅",
    "en": "Brake Bias",
    "ko": "브레이크 밸런스",
    "definition": "앞뒤 제동력 배분.",
    "game": "락업과 제동 안정성을 고려한다."
  },
  {
    "category": "세팅",
    "en": "Differential",
    "ko": "디퍼렌셜",
    "definition": "좌우 구동 바퀴의 회전 차이를 제어하는 장치.",
    "game": "가속과 감속 시 차량 회전에 영향을 준다."
  },
  {
    "category": "세팅",
    "en": "Ride Height",
    "ko": "차고",
    "definition": "차량 바닥과 노면 사이 높이.",
    "game": "공력 성능과 노면 충돌 위험을 고려한다."
  },
  {
    "category": "세팅",
    "en": "Camber",
    "ko": "캠버",
    "definition": "정면에서 바라본 바퀴의 기울기.",
    "game": "코너 접지력과 타이어 관리에 영향을 준다."
  },
  {
    "category": "기록",
    "en": "Sector",
    "ko": "섹터",
    "definition": "랩을 나눈 공식 계측 구간.",
    "game": "구간별 약점을 확인한다."
  },
  {
    "category": "기록",
    "en": "Delta",
    "ko": "델타",
    "definition": "기준 시간과 현재 시간의 차이.",
    "game": "기록 비교 또는 안전차 속도 관리에 사용된다."
  },
  {
    "category": "기록",
    "en": "Purple Sector",
    "ko": "퍼플 섹터",
    "definition": "계측 화면에서 전체 최고 구간 기록을 나타내는 표시.",
    "game": "개인 최고 기록과 구분한다."
  },
  {
    "category": "기록",
    "en": "Pole Position",
    "ko": "폴 포지션",
    "definition": "출발 그리드의 첫 번째 자리.",
    "game": "예선 결과와 페널티를 함께 고려한다."
  },
  {
    "category": "기록",
    "en": "DNF",
    "ko": "디엔에프",
    "definition": "레이스를 완주하지 못했다는 기록.",
    "game": "공식 분류 여부와는 구분될 수 있다."
  },
  {
    "category": "기록",
    "en": "DNS",
    "ko": "디엔에스",
    "definition": "경기에 출발하지 않았다는 기록.",
    "game": "DNF와 구분한다."
  }
];
