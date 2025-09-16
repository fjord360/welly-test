import React, { useRef, useState } from "react";
import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface ItineraryImage {
  id: string;
  url: string;
  alt: string;
}

interface ItineraryItem {
  day: number;
  title: string;
  images: ItineraryImage[];
  activities: string[];
}

interface DayItineraryCardProps {
  itinerary: ItineraryItem;
  className?: string;
}

const DayItineraryCard: React.FC<DayItineraryCardProps> = ({
  itinerary,
  className = "",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: 1,
      spacing: 0,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* 헤더 */}
      <div className="pb-4">
        <div className="text-gray-800 text-sm font-medium mb-2">
          Day {itinerary.day}
        </div>
        <h2 className="text-lg font-extrabold text-gray-900">
          {itinerary.title}
        </h2>
      </div>

      {/* 이미지 슬라이더 */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {itinerary.images.map((image) => (
            <div key={image.id} className="keen-slider__slide">
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="w-full h-full bg-cover bg-center">
                  <div className="w-full h-full bg-gray-800/20 flex items-center justify-center relative">
                    <Image
                      key={image.id}
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 슬라이더 도트 */}
      {loaded && instanceRef.current && (
        <div className="flex justify-center">
          <div className="space-x-1">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === idx ? "bg-gray-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 활동 내용 */}
      <div className="pl-1 pt-6">
        <ul className="space-y-3">
          {itinerary.activities.map((activity, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-1 h-1 rounded-full bg-gray-900 mt-3 flex-shrink-0"></div>
              <p className="text-gray-700 leading-relaxed">{activity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// 사용 예시 컴포넌트
const ItineraryComponent = () => {
  const Itineraries: ItineraryItem[] = [
    {
      day: 1,
      title: "Balinese welcome meal",
      images: [
        { id: "1-1", url: "/images/day1-1.png", alt: "" },
        { id: "2-1", url: "/images/day1-2.png", alt: "" },
      ],
      activities: [
        "오전에 헬싱키 공항에 도착하면 우리 매니저가 마중나와서 기다리고 있을꺼야. 그러면 공항 철도를 타고 중앙역으로 갈꺼야",
        "도착하면 헬싱키 중앙역 호텔 앞에 짐을 맡기고",
        "알라스 씨 풀 방문하고 점심먹는다",
      ],
    },
    {
      day: 2,
      title: "Balinese welcome meal",
      images: [
        { id: "2-1", url: "/images/day2-1.jpg", alt: "" },
        { id: "2-2", url: "/images/day3-1.png", alt: "" },
      ],
      activities: [
        "오전에 헬싱키 공항에 도착하면 우리 매니저가 마중나와서 기다리고 있을꺼야. 그러면 공항 철도를 타고 중앙역으로 갈꺼야",
        "도착하면 헬싱키 중앙역 호텔 앞에 짐을 맡기고",
        "알라스 씨 풀 방문하고 점심먹는다",
      ],
    },
  ];

  return (
    <div>
      {/* 추가 일정들 */}
      {Itineraries.map((item) => (
        <DayItineraryCard key={item.day} itinerary={item} className="mt-12" />
      ))}
    </div>
  );
};

export default ItineraryComponent;
