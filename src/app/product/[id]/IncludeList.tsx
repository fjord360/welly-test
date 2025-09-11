import React from 'react';
import { 
  Plane, 
  Train, 
  Car, 
  Building, 
  Building2, 
  Calendar, 
  ShoppingBag, 
  Utensils, 
  Play, 
  Users 
} from 'lucide-react';

const IncludeListInfo = () => {
  const packageItems = [
    {
      icon: <Plane className="w-6 h-6" />,
      title: "국제선 왕복 항공권",
      description: "인천 ↔ 헬싱키 왕복"
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: "국내선 편도 항공권",
      description: "키틸래 - 헬싱키 편도"
    },
    {
      icon: <Train className="w-6 h-6" />,
      title: "야간열차",
      description: "로바니에미 - 헬싱키 편도 (1박)"
    },
    {
      icon: <Train className="w-6 h-6" />,
      title: "공항철도",
      description: "헬싱키 공항 - 헬싱키 시내 왕복"
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "이동 차량",
      description: "공항 - 코티지 픽업 & 센딩",
      subdescription: "레비 - 로바니에미 일정"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "숙박",
      description: "코티지 호텔 3박"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "숙박",
      description: "4성급 호텔 1박"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "프로그램",
      description: "오로라 헌팅 - 최대 3일 시도"
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "프로그램",
      description: "허스키 썰매 1회"
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "식사",
      description: "조식 3회, 기차내 조식 1회",
      subdescription: "점심 1회, 저녁 3회",
      subdescription2: "커뮤니티 디너 1회"
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "현지 오로라 헌터의 프라이빗 투어"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "해외 여행자 보험"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white p-8">
      {/* 제목 */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">포함사항</h1>
      
      {/* 기간 정보 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-blue-600">8박 10일</span>
          <span className="text-lg text-gray-600">inclusive</span>
        </div>
        <div className="w-full h-0.5 bg-blue-600"></div>
      </div>

      {/* 포함사항 목록 */}
      <div className="space-y-6">
        {packageItems.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* 아이콘 */}
            <div className="flex-shrink-0 p-1 text-gray-700">
              {item.icon}
            </div>
            
            {/* 내용 */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-gray-900 text-lg">
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-gray-600">
                    {item.description}
                  </span>
                )}
              </div>
              
              {/* 추가 설명 */}
              {item.subdescription && (
                <div className="text-gray-600 ml-0 mt-1">
                  {item.subdescription}
                </div>
              )}
              
              {/* 추가 설명 2 */}
              {item.subdescription2 && (
                <div className="text-gray-600 ml-0 mt-1">
                  {item.subdescription2}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncludeListInfo;