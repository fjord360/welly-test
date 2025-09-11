import React, { useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";

const FlightCardsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 1.2, // 모바일에서 다음 카드 살짝 보이기
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 1.8, spacing: 20 }, // 작은 태블릿
      },
      "(min-width: 768px)": {
        slides: { perView: 2.2, spacing: 24 }, // 태블릿
      },
      "(min-width: 1024px)": {
        slides: { perView: 2.8, spacing: 28 }, // 데스크톱
      },
      "(min-width: 1280px)": {
        slides: { perView: 3.2, spacing: 32 }, // 큰 데스크톱
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // 항공편 샘플 데이터
  const flightCards = [
    {
      id: 1,
      year: "2025년",
      startDate: "11월 25일",
      endDate: "12월 2일",
      weekDays: ["화", "수", "목", "금", "토"],
      outbound: {
        title: "출국 항공편",
        destination: "핀에어",
        logo: "./flight-logos/FINNAIR.png",
        date: "12월 1일(월)",
        route: "인천 > 헬싱키",
        time: "23:00 - 05:40",
        duration: "9시간 40분",
      },
      return: {
        title: "귀국 항공편",
        destination: "핀에어",
        logo: "./flight-logos/FINNAIR.png",
        date: "12월 1일(월)",
        route: "헬싱키 > 인천",
        time: "17:35 - 12:25 (2일 오후)",
        duration: "8시간 50분",
      },
    },
    {
      id: 2,
      year: "2025년",
      startDate: "12월 15일",
      endDate: "12월 22일",
      weekDays: ["월", "화", "수", "목", "금"],
      outbound: {
        title: "출국 항공편",
        destination: "핀에어",
        logo: "./flight-logos/FINNAIR.png",
        date: "12월 1일(월)",
        route: "인천 > 헬싱키",
        time: "23:00 - 05:40",
        duration: "9시간 40분",
      },
      return: {
        title: "귀국 항공편",
        destination: "핀에어",
        logo: "./flight-logos/FINNAIR.png",
        date: "12월 1일(월)",
        route: "헬싱키 > 인천",
        time: "17:35 - 12:25 (2일 오후)",
        duration: "8시간 50분",
      },
    },
    {
      id: 3,
      year: "2025년",
      startDate: "1월 10일",
      endDate: "1월 17일",
      weekDays: ["금", "토", "일", "월", "화"],
      outbound: {
        title: "출국 항공편",
        destination: "핀에어",
        logo: "./flight-logos/FINNAIR.png",
        date: "12월 1일(월)",
        route: "인천 > 헬싱키",
        time: "23:00 - 05:40",
        duration: "9시간 40분",
      },
      return: {
        title: "귀국 항공편",
        destination: "핀에어",
        logo: "./flight-logos/FINNAIR.png",
        date: "12월 1일(월)",
        route: "헬싱키 > 인천",
        time: "17:35 - 12:25 (2일 오후)",
        duration: "8시간 50분",
      },
    },
  ];

  return (
    <div className="w-full">
      {/* 슬라이더 */}
      <div className="w-full">
        <div ref={sliderRef} className="keen-slider">
          {flightCards.map((card) => (
            <div key={card.id} className="keen-slider__slide">
              <div className="bg-white rounded-2xl border border-[#E4BCE9] hover:shadow-md transition-shadow duration-300 overflow-hidden max-w-md">
                {/* 카드 헤더 */}
                <div className="p-4 pb-2">
                  <div className="text-sm text-[#8E8E8E] mb-2">{card.year}</div>
                  <div className="flex mb-4 gap-2">
                    <h3 className="text-xl font-medium text-gray-900">
                      {card.startDate}
                    </h3>
                    <h3 className="text-xl font-medium text-gray-900">{">"}</h3>
                    <h3 className="text-xl font-medium text-gray-900">
                      {card.endDate}
                    </h3>
                  </div>

                  {/* 요일 표시 */}
                  <div className="flex gap-2 text-sm mb-6">
                    {card.weekDays.map((day, index) => (
											<div key={index} className="w-[32px] h-[32px] rounded-full font-semibold flex justify-center items-center text-sm bg-[#F7F8FF]">
												<p className={"font-medium text-[#112C9C]"}>{day}</p>
											</div>
                    ))}
                  </div>
                </div>

                {/* 출국 항공편 */}
                <div className="px-3 pb-3">
                  <div className="border-b border-[#2469E9] h-[32px] bg-[#F9FBFF] pb-2 mb-4">
                    <h4 className="text-base font-extrabold pl-1 pt-1 text-[#2469E9]">
                      {card.outbound.title}
                    </h4>
                  </div>

                  <div className="bg-white rounded-lg p-3 mb-2 shadow-sm relative">
										<div className="absolute top-4 right-4">
											<Image
                        src="/images/flight-logo-finnair.png"
                        alt="Finnair Logo"
                        width={90}
                        height={26}
                        className="w-[90px] h-[26px] mt-2"
                      />
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-900">
                        {card.outbound.destination}
                      </span>
                    </div>

                    <div className="text-sm text-gray-700 mb-2 font-bold">
                      {card.outbound.date}
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-600">
                        {card.outbound.route}
                      </span>
											<span className="text-gray-600">|</span>
											<span className="text-gray-600">
                        {card.outbound.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 귀국 항공편 */}
                <div className="px-3 pb-2">
                  <div className="border-b border-[#2469E9] bg-[#F9FBFF] pb-2 mb-4">
                    <h4 className="text-base font-extrabold pl-1 pt-1 text-[#2469E9]">
                      {card.return.title}
                    </h4>
                  </div>

                  <div className="bg-white rounded-lg p-3 mb-2 shadow-sm relative">
										<div className="absolute top-4 right-4">
											<Image
                        src="/images/flight-logo-finnair.png"
                        alt="Finnair Logo"
                        width={90}
                        height={26}
                        className="w-[90px] h-[26px] mt-2"
                      />
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-900">
                        {card.return.destination}
                      </span>
                    </div>

                    <div className="text-sm text-gray-700 mb-2 font-bold">
                      {card.return.date}
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <span className="text-gray-600">
                        {card.return.route}
                      </span>
											<span className="text-gray-600">|</span>
											<span className="text-gray-600">
                        {card.return.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightCardsSlider;
