import React, { useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";

const HighlightSlider = () => {
  const highlights = [
    {
      day: 6,
      title: ["산타의 고향", "로바니에미에서", "특별한 하루"],
      image: "/images/highlight-1-1.jpg",
    },
    {
      day: 7,
      title: ["산타의 고향", "로바니에미에서", "특별한 하루"],
      image: "/images/highlight-1-1.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 1.2,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2.2, spacing: 8 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 2.8, spacing: 10 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="w-full">
      <div ref={sliderRef} className="keen-slider">
        {highlights.map((item, idx) => (
          <div key={idx} className="keen-slider__slide">
            <div className="relative h-[474px] overflow-hidden group cursor-pointer">
              {/* 배경 이미지 */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              />
              {/* 어두운 오버레이 */}
              <div className="absolute h-[180px] bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-black/0" />

              {/* 텍스트 콘텐츠 */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-4">Day {item.day}</h3>
                <div className="space-y-1">
                  {item.title.map((line, lineIdx) => (
                    <h3 key={lineIdx} className="text-2xl font-extrabold">
                      {line}
                    </h3>
                  ))}
                </div>
              </div>

              {/* 호버 효과 */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighlightSlider;
