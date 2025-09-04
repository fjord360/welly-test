"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import BookingCard from "./BookingCard";

import { createClient } from "@/app/utils/client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "./style.css";
import dynamic from "next/dynamic";

import { generateReservationNumber } from "@/app/utils/generator";
import { getTicketName, formatPrice } from "@/app/utils/bookingUtils";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-200 animate-pulse" />,
});

const images = [{ url: "/title.jpg" }, { url: "/gif.gif" }];

const BaliYogaRetreatPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [schedulesWithBookings, setSchedulesWithBookings] = useState<any[]>([]);
	const [firstBooking, setFirstBooking] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const supabase = createClient();
  
  const fetchData = async () => {
    const { data } = await supabase.from("travel_schedules").select();
    if (!data) return;

    const schedulesWithBookings = await Promise.all(
      data.map(async (schedule: any) => {
        const { data: bookings, error: bookingsError } = await supabase
          .from("bookings")
          .select("payment_status")
          .eq("schedule_id", schedule.id)
          .order("created_at", { ascending: false });

        if (bookingsError) {
          console.error("Error fetching bookings:", bookingsError);
          return {
            ...schedule,
            schedule_id: schedule.id,
            paid_bookings: 0,
            total_bookings: 0,
            available_spots: schedule.max_participants,
          };
        }

        // 예약 통계 계산
        const totalBookings = bookings.length;
        const paidBookings = bookings.filter(
          (booking) => booking.payment_status === "paid"
        ).length;
        const availableSpots = schedule.max_participants - paidBookings;

        return {
          ...schedule,
          schedule_id: schedule.id,
          paid_bookings: paidBookings,
          total_bookings: totalBookings,
          available_spots: availableSpots,
        };
      })
    );

    setSchedulesWithBookings(schedulesWithBookings);
    console.log(schedulesWithBookings);

    const firstAvailable = schedulesWithBookings.find(schedule => schedule.total_bookings < schedule.max_participants);
    setFirstBooking(firstAvailable);
  };

  useEffect(() => {
    fetchData();
  }, [supabase]);

  const handleBooking = async (scheduleId: string) => {
    setIsBooking(true);

    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            booking_number: generateReservationNumber("R"),
            customer_id: "7500df97-b6a6-4943-8583-6f219a98de76",
            schedule_id: scheduleId,
            updated_at: new Date().toISOString(),
            booking_date: new Date().toISOString(),
            payment_status: "paid",
            payment_amount: 3335000,
            payment_date: new Date().toISOString(),
            payment_method: "credit_card",
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      console.log("Booking successful:", data);

      // 데이터 새로고침
      await fetchData();

      setTimeout(() => {
        setIsPopupOpen(false);
      }, 100);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Full Screen Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col">
          {/* Header with X button */}
          <div className="flex justify-between items-center p-6">
            <div></div>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center max-w-md">
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 pb-2">
                발리 요가 여행
              </h1>

              {/* Date */}
              <div className="text-xl text-gray-600 pb-4">2025년 9월 10일</div>

							{/* Date */}
              <div className="text-xl text-gray-600 pb-4">
								{firstBooking ? getTicketName(firstBooking.ticket_type) : "출발확정"}
							</div>

              {/* Price */}
              <div className="text-4xl font-bold text-(--color-primary) pb-8">
                {firstBooking ? formatPrice(firstBooking.price) : "3,335,000원"}
              </div>

              {/* Purchase Button */}
              <button
                onClick={() => handleBooking(firstBooking.id)}
                disabled={isBooking}
                className={`w-full transition-colors text-white font-semibold py-4 px-6 rounded-xl text-lg ${
                  isBooking
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-(--color-primary) hover:bg-blue-700"
                }`}
              >
                {isBooking ? "처리 중..." : "구매하기"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Hero Section with Background Image */}
      <div className="relative h-120">
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {images.map((img, idx) => (
              <div key={idx} className="keen-slider__slide">
                <img
                  src={img.url}
                  alt={`slide-${idx + 1}`}
                  className="w-full h-120 object-cover"
                />
              </div>
            ))}
          </div>
          {loaded && instanceRef.current && (
            <>
              <div className="dots">
                {[
                  ...Array(
                    instanceRef.current.track.details.slides.length
                  ).keys(),
                ].map((idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRef.current?.moveToIdx(idx);
                      }}
                      className={
                        "dot" + (currentSlide === idx ? " active" : "")
                      }
                    ></button>
                  );
                })}
              </div>
            </>
          )}
          {/* Back Button - Slider 위에 오버레이 */}
          <div className="absolute inset-0 pointer-events-none">
            <Link href="/">
              <div className="absolute top-4 left-6 z-[9999] pointer-events-auto">
                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg">
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="pb-24">
        {/* 여행요약 Section */}
        <section id="여행요약" className="px-6 py-16 h-120">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-regular text-gray-900 mb-1">
                웰리트립
              </h3>
              <h4 className="text-3xl font-semibold text-gray-800 mb-1">
                발리 요가 여행
              </h4>
              <p className="text-2xl font-bold text-gray-900">2025</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h5 className="text-lg font-semibold text-gray-900 mb-2">
                여행 개요
              </h5>
              <p className="text-gray-600">
                신들의 섬 발리로 떠나 잘 먹고, 움직이고, 쉬는
								요가 여행에 초대합니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h6 className="font-medium text-gray-900 mb-1">기간</h6>
                <p className="text-gray-600">4박 6일</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h6 className="font-medium text-gray-900 mb-1">인원</h6>
                <p className="text-gray-600">한팀 10인 / 소규모 커뮤니티</p>
              </div>
            </div>
          </div>
        </section>

        {/* 상품 가격안 내 Section */}
        <section id="상품가격안내" className="px-6 py-6 h-120">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            상품 가격 안내
          </h3>

          <BookingCard schedules={schedulesWithBookings} />
        </section>

        {/* 여행안내 Section */}
        <section id="여행안내" className="px-6 py-8 min-h-screen bg-white-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">여행 안내</h3>
          <div className="space-y-6">
            <div>
              <h5 className="text-lg font-semibold text-gray-900 mb-3">
                이동 스케줄
              </h5>
              <div className="space-y-4">
                <div className="bg-white px-4 pt-2 pb-0 rounded-lg">
                  <p className="font-medium text-gray-900">
                    Day 1: 발리 공항 도착 - 짱구 호텔 체크인
                  </p>
                </div>
                <div className="bg-white pt-0 pb-0 px-4 rounded-lg">
                  <p className="font-medium text-gray-900">
                    Day 2: 짱구, 요가, 커뮤니티 디너
                  </p>
                </div>
								<div className="bg-white pt-0 pb-6 px-4 rounded-lg">
                  <p className="font-medium text-gray-900">
                    Day 3: 짱구, 요가 - 우붓
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "100%", height: "420px" }}>
            <MapComponent />
          </div>
        </section>

        {/* 세부사항 Section */}
        <section id="세부사항" className="px-6 py-8 h-120">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">세부 사항</h3>
          <div className="space-y-6">
            <div>
              <h5 className="text-lg font-semibold text-gray-900 mb-3">
                포함사항
              </h5>
              <ul className="space-y-2 text-gray-600">
                <li>• 국제선 왕복 항공</li>
                <li>• 전 일정 5성급 로컬 호텔</li>
                <li>• 로컬 요가 클래스</li>
                <li>• 커뮤니티 디너</li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-gray-900 mb-3">
                미포함사항
              </h5>
              <ul className="space-y-2 text-gray-600">
                <li>• 인도네시아 도착비자 & 관광세</li>
                <li>• 제공 사항 외 식사 등 개인비용</li>
                <li>• 공식 스케쥴 외 개인적인 교통비용</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="FAQ" className="px-6 py-8 h-120 bg-gray-50">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            즐거운 여행을 위한 중요한 안내
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-900 mb-2">
                웰리트립은 패키지 여행이 아니에요!
              </h5>
              <p className="text-gray-600">
                혼자하기 어려운 일정을 함께하는 커뮤니티 & 인사이트 여행입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-900 mb-2">
                발리 여행은 즐겁지만 변수가 있는 지역이에요.
              </h5>
              <p className="text-gray-600">
                발리는 부분 교통 체증이 많아요.
								예정 시간보다 오래 걸릴 수도 있고 레스토랑에서 음식이 늦게 나올 수도 있어요.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-100">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="w-full bg-(--color-primary) hover:bg-(--color-primary-hover) transition-colors text-white font-semibold py-4 px-6 rounded-4xl text-lg"
        >
          신청하기 [모든일정 마감임박]
        </button>
      </div>
    </div>
  );
};

export default BaliYogaRetreatPage;
