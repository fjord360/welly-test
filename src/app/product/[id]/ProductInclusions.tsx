import React from "react";
import Image from "next/image";

const ProductInclusions = () => {
  const inclusionItems = [
    {
      icon: "/icons/icon-flight.svg",
      title: "국제선 왕복 항공권",
      description: ["인천 ↔ 헬싱키 왕복"],
    },
    {
      icon: "/icons/icon-flight.svg",
      title: "국내선 편도 항공권",
      description: ["키틸래 - 헬싱키 편도"],
    },
    {
      icon: "/icons/icon-train.svg",
      title: "야간열차",
      description: ["로바니에미 - 헬싱키 편도 (1박)"],
    },
    {
      icon: "/icons/icon-train.svg",
      title: "공항철도",
      description: ["헬싱키 공항 - 헬싱키 시내 왕복"],
    },
    {
      icon: "/icons/icon-vehicle.svg",
      title: "이동 차량",
      description: ["공항 - 코티지 픽업 & 센딩", "레비 - 로바니에미 일정"],
    },
    {
      icon: "/icons/icon-cottage.svg",
      title: "숙박",
      description: ["코티지 호텔 3박"],
    },
    {
      icon: "/icons/icon-hotel.svg",
      title: "숙박",
      description: ["4성급 호텔 1박"],
    },
    {
      icon: "/icons/icon-program.svg",
      title: "프로그램",
      description: ["오로라 헌팅 - 최대 3일 시도"],
    },
    {
      icon: "/icons/icon-sleigh.svg",
      title: "프로그램",
      description: ["허스키 썰매 1회"],
    },
    {
      icon: "/icons/icon-meal.svg",
      title: "식사",
      description: [
        "조식 3회, 기차내 조식 1회",
        "점심 1회, 저녁 3회",
        "커뮤니티 디너 1회",
      ],
    },
    {
      icon: "/icons/icon-tour.svg",
      title: "현지 오로라 헌터의 프라이빗 투어",
    },
    {
      icon: "/icons/icon-insurance.svg",
      title: "해외 여행자 보험",
    },
  ];

  const exclusionItems = [
    {
      icon: "/icons/icon-deny.svg",
      title: "제공 사항 외 식사 등 개인비용",
    },
    {
      icon: "/icons/icon-deny.svg",
      title: "알라스씨 풀 입장료",
    },
    {
      icon: "/icons/icon-deny.svg",
      title: "헬싱키 시내 개별 활동 비용",
    },
    {
      icon: "/icons/icon-deny.svg",
      title: "일정 외 강제 쇼핑과 강제 팁 NO!",
      subtext: "스노우 슈잉 (선택 / 추가 금액)",
    },
  ];

  return (
    <div>
      {/* 기간 정보 */}
      <div className="mb-8 h-[32px]">
        <div className="flex items-center p-1 bg-blue-50">
          <span className="text-lg font-extrabold text-blue-500">8박 10일</span>
          <span className="ml-1 text-lg text-semibold text-blue-500">
            inclusive
          </span>
        </div>
        <div className="w-full h-[1px] bg-blue-500"></div>
      </div>

      {/* 포함사항 목록 */}
      <div className="space-y-4">
        {inclusionItems.map((item, index) => (
          <div key={index} className="flex">
            {/* 아이콘 */}
            <div className="flex-shrink-0 text-gray-700">
              <Image
                src={item.icon}
                alt={item.title}
                width={28}
                height={28}
                className="w-[28px] h-[28px]"
              />
            </div>

            {/* 내용 */}
            <div className="flex-1 p-[2px] ml-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-750 text-base">
                  {item.title}
                </span>
                {item.description && item.description.length == 1 && (
                  <span className="text-gray-600 text-sm">
                    {item.description[0]}
                  </span>
                )}
              </div>
              {item.description && item.description.length > 1 && (
                <div>
                  {item.description.map((item, index) => (
                    <p key={index} className="text-gray-600 text-sm mb-2">
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 미포함사항 */}
      <div className="mt-16 mb-2">
        <Image
          src="/icons/icon-deny-filled.svg"
          alt=""
          width={28}
          height={28}
          className="w-[32px] h-[32px]"
        />
      </div>
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">미포함사항</h1>

      {/* 경고 메시지 */}
      <div className="mb-6 p-2 border border-red-650 rounded-2xl w-fit">
        <div className="flex items-start">
          <Image
            src="/icons/icon-alert-filled.svg"
            alt=""
            width={14}
            height={14}
            className="w-[16px] h-[16px]"
          />
          <p className="text-red-650 font-medium text-xs ml-2">
            왕복항공권은 상품에 포함되지 않으니 따로 구매하셔야 합니다.
          </p>
        </div>
      </div>

      {/* 미포함사항 목록 */}
      <div className="space-y-4">
        {exclusionItems.map((item, index) => (
          <div key={index} className="flex items-start">
            {/* 아이콘 */}
            <div className="">
              <Image
                src={item.icon}
                alt={item.title}
                width={28}
                height={28}
                className="w-[28px] h-[28px]"
              />
            </div>

            {/* 내용 */}
            <div className="flex-1 ml-2">
              {item?.subtext ? (
                <div className="flex-1 space-y-2">
                  <div className="text-gray-750 text-base font-medium">
                    {item.title}
                  </div>
                  <div className="text-gray-600 text-xs">{item.subtext}</div>
                </div>
              ) : (
                <span className="text-gray-750 text-base font-medium">
                  {item.title}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInclusions;
