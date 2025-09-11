import React, { useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const LeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 1.5, // 모바일에서 다음 카드 살짝 보이기
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

  // 가이드 샘플 데이터
  const guides = [
    {
      name: "김우주",
      title: "호치민 거주 25년 사업은 망했지만 여행은 성공",
      intro: "안녕하세요. 문요한입니다. 태양 활동의 극대기, 긴 밤이 깃든 곳. 세계적인 오로라 관측지 라플란드에서 프라이빗 투어로 빛을 찾아갑니다.",
      image: "/images/leader-1.png",
    },
    {
      name: "헬레나 리",
      title: "필리핀 거주 12년 사업은 망했지만 결혼은 성공",
      intro: "안녕하세요. 문요한입니다. 태양 활동의 극대기, 긴 밤이 깃든 곳. 세계적인 오로라 관측지 라플란드에서 프라이빗 투어로 빛을 찾아갑니다.",
      image: "/images/leader-2.png",
    },
    {
      name: "응우옌 예리 안",
      title: "인도네시아 거주 17년, 요가 강습 12년 경력의 요가 베테랑 가이드",
      intro: "안녕하세요. 문요한입니다. 태양 활동의 극대기, 긴 밤이 깃든 곳. 세계적인 오로라 관측지 라플란드에서 프라이빗 투어로 빛을 찾아갑니다.",
      image: "/images/leader-3.png",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* 슬라이더 - 전체 폭 사용 */}
      <div ref={sliderRef} className="keen-slider">
        {guides.map((guide, idx) => (
          <div key={idx} className="keen-slider__slide">
            <div className="bg-white rounded-2xl border border-gray-200 transition-shadow duration-300 overflow-hidden h-[344px] max-w-sm">
              {/* 리더 이미지 */}
              <div
                  className="bg-cover bg-center bg-no-repeat mt-4 ml-4 mr-4 h-[94px] rounded-lg"
                  style={{
                    backgroundImage: `url(${guide.image})`,
                  }}
                />

              {/* 카드 콘텐츠 */}
              <div className="p-4">
                {/* 가이드 이름 */}
                <h3 className="text-base font-bold text-[#494949] mb-1">
                  {guide.name}
                </h3>

                {/* 부제목과 설명 */}
                <p className="text-sm text-[#494949] mb-1 leading-relaxed">
                  {guide.title}
                </p>

                {/* 점선 구분선 */}
                <div className="border-t border-dotted border-gray-300 my-3"></div>

                {/* 가이드 소개 */}
                <p className="text-xs text-[#494949] leading-relaxed line-clamp-5">
                  {guide.intro}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* line-clamp을 위한 CSS */}
      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LeaderSlider;
