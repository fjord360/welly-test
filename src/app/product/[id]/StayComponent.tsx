import React, { useRef, useState } from "react";
import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface StayImage {
  id: string;
  url: string;
  alt: string;
}

interface StayItem {
	id: number;
  title: string;
	type: string;
	description: string;
  images: StayImage[];
  amenities: string[];
}

interface DayStayCardProps {
  Stay: StayItem;
  className?: string;
}

const DayStayCard: React.FC<DayStayCardProps> = ({
  Stay,
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
      {/* 이미지 슬라이더 */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {Stay.images.map((image) => (
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

				{/* 슬라이더 도트 */}
				{loaded && instanceRef.current && (
					<div className="flex justify-center">
						<div className="space-x-2">
							{[
								...Array(instanceRef.current.track.details.slides.length).keys(),
							].map((idx) => (
								<button
									key={idx}
									onClick={() => {
										instanceRef.current?.moveToIdx(idx);
									}}
									className={`w-2 h-2 rounded-full transition-colors ${
										currentSlide === idx ? "bg-[#787878]" : "bg-[#E1E1E1]"
									}`}
								/>
							))}
						</div>
					</div>
				)}

				{/* 설명 */}
				<div className="pt-6">
					<div className="text-[#8E8E8E] text-xs font-regular mb-2">
						{Stay.type}
					</div>
					<h2 className="text-xl font-bold text-[#222222] mb-4">
						{Stay.title}
					</h2>
					<div className="text-[#494949] text-sm font-medium mb-2">
						{Stay.description}
					</div>
				</div>
      </div>

      {/* 어메니티 */}
      <div className="pt-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {Stay.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-1">
              <Image src="/icons/icon-check.svg" alt="" width={16} height={16} className="w-[16px] h-[16px]" />
              <p className="text-[#787878] text-xs">{amenity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 사용 예시 컴포넌트
const StayComponent = () => {
	const accommodations = [
    {
      id: 1,
      name: "코티지 Cottage",
      nights: "3박",
      location: "레비",
      details: "2인 1실 / 트윈 베드 (2인 2침대)",
      note: "※선 예약자 순으로 방배정이 됩니다.",
    },
    {
      id: 2,
      name: "호텔 Hotel",
      nights: "1박",
      location: "헬싱키 시내",
      details: "2인 1실 / 트윈 베드 (2인 2침대)"
    },
    {
      id: 3,
      name: "산타익스프레스",
      englishName: "Sleeping Train",
      nights: "1박",
      location: "로바니에미-헬싱키 간 이동",
      details: "2인 1실 / 트윈 베드 (2인 2침대)"
    }
  ];

  const notices = [
    "항공 이동 중에 보내는 밤은 숙박 일수에 포함되지 않습니다.",
    "프로그램, 숙소, 항공 등의 일정은 현지 사정에 따라 변동될 수 있으며 변동 시 별도의 안내를 드려요."
  ];

  const StayList: StayItem[] = [
    {
			id: 1,
      title: "레비 코티지",
			type: "Entire villa in Levi",
      images: [
        { id: "stay-1-1", url: "/images/day1-1.png", alt: "" },
        { id: "stay-2-1", url: "/images/day1-2.png", alt: "" },
      ],
      description: "2023년 오픈한 침실 6개짜리 빌라입니다. 북유럽의 현대적인 느낌으로 디자인된 코티지로, 거실에서 별이 빛나는 하늘과 벽난로의 따뜻한 분위기로 꾸며져 있습니다. 또한 대형 온수 욕조와 사우나도 있어 편안한 휴식을 취할 수 있어요.",
			amenities: [
				"어메니티",
				"타월",
				"드라이기",
				"스파마사지",
				"수영장",
				"헬스장",
				"레스토랑&바",
			],
    },
    {
			id: 2,
      title: "레비 코티지",
			type: "Entire villa in Levi",
      images: [
        { id: "stay-1-1", url: "/images/day1-1.png", alt: "" },
        { id: "stay-2-1", url: "/images/day1-2.png", alt: "" },
      ],
      description: "2023년 오픈한 침실 6개짜리 빌라입니다. 북유럽의 현대적인 느낌으로 디자인된 코티지로, 거실에서 별이 빛나는 하늘과 벽난로의 따뜻한 분위기로 꾸며져 있습니다. 또한 대형 온수 욕조와 사우나도 있어 편안한 휴식을 취할 수 있어요.",
			amenities: [
				"어메니티",
				"타월",
				"드라이기",
				"스파마사지",
				"수영장",
				"헬스장",
				"레스토랑&바",
			],
    },
  ];

  return (
    <div>
			{/* 숙박 정보 */}
			<div className="mt-6">
				<h1 className="text-xl font-bold text-gray-900 mb-4">총 7박 9일</h1>
      
				{/* 숙박 정보 목록 */}
				<div className="space-y-4 mb-8">
					{accommodations.map((accommodation) => (
						<div key={accommodation.id} className="bg-[#F9F9F9] rounded-lg border border-[#EDEDED] p-4">
							<div className="flex items-start justify-between mb-2">
								<div className="flex-7">
									<h3 className="text-base font-bold text-[#494949] mb-1">
                    {accommodation.name}
                    {accommodation.englishName && (
                      <div className="text-base text-[#494949] font-bold mt-1">
                        {accommodation.englishName}
                      </div>
                    )}
                  </h3>
								</div>
								<div className="flex-11">
									<div className="text-right font-semibold text-sm text-[#494949 mb-2">
										📍 {accommodation.nights} / {accommodation.location}
									</div>

									<div className="text-right text-sm text-[#787878] mb-2">
										{accommodation.details}
									</div>
									
									{accommodation.note && (
										<div className="text-right text-xs text-[#AA47B7]">
											{accommodation.note}
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* 추가 안내 */}
				<div className="mb-6">
					<div className="flex items-center gap-2 text-gray-700 mb-4">
						<span className="w-1 h-1 bg-gray-800 rounded-full pl-1"></span>
						<span>혼자 오셔도 동행을 찾아드려요.</span>
					</div>
				</div>

				{/* 주의사항 */}
				<div className="space-y-4">
					{notices.map((notice, index) => (
						<div key={index} className="mb-6 p-2 border border-[#C52323] rounded-2xl w-fit">
							<div className="flex items-start">
								<Image
									src="/icons/icon-alert-filled.svg"
									alt=""
									width={14}
									height={14}
									className="w-[16px] h-[16px]"
								/>
								<p className="text-[#C52323] font-medium text-xs ml-2">
									{notice}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

      {/* 숙소 리스트 */}
      {StayList.map((item) => (
        <DayStayCard key={item.id} Stay={item} className="mt-12" />
      ))}
    </div>
  );
};

export default StayComponent;
