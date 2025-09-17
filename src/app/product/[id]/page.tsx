"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import BookingCard from "./BookingCard";
import HighlightSlider from "./HighlightSlider";
import LeaderSlider from "./LeaderSlider";
import ProductInclusions from "./ProductInclusions";
import FlightCardsSlider from "./FlightSlider";
import ItineraryComponent from "./ItineraryComponent";
import StayComponent from "./StayComponent";
import BookingPopup from "./BookingPopup";

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

const images = [
  { url: "/images/thumbnail-1-1.png" },
  { url: "/images/thumbnail-1-1.png" },
];

const ProductPage: React.FC = () => {
  const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [schedulesWithBookings, setSchedulesWithBookings] = useState<any[]>([]);
  const [firstBooking, setFirstBooking] = useState<any>(null);

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
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

    const firstAvailable = schedulesWithBookings.find(
      (schedule) => schedule.total_bookings < schedule.max_participants
    );
    setFirstBooking(firstAvailable);
  };

  useEffect(() => {
    //fetchData();
  }, [supabase]);

  const OnClickCTAButton = () => {
    setIsBookingPopupOpen(true);
  };

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
                {firstBooking
                  ? getTicketName(firstBooking.ticket_type)
                  : "출발확정"}
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
      <div className="relative h-[362px]">
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {images.map((img, idx) => (
              <div key={idx} className="keen-slider__slide">
                <img
                  src={img.url}
                  alt={`slide-${idx + 1}`}
                  className="w-full h-[362px] object-cover"
                />
              </div>
            ))}
          </div>
          {/* 슬라이더 도트 */}
          {loaded && instanceRef.current && (
            <div className="flex justify-center">
              <div className="space-x-1">
                {[
                  ...Array(
                    instanceRef.current.track.details.slides.length
                  ).keys(),
                ].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === idx ? "bg-gray-900" : "bg-gray-250"
                    }`}
                  />
                ))}
              </div>
            </div>
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
      <div className="mt-12 mb-40">
        {/* Summary Section */}
        <section id="Summary" className="px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-3xl font-extrabold text-black mb-4">
                Finland Wellness
              </h4>
              <div className="text-gray-800 text-base text-regular space-y-[4px]">
                <p>태양 활동의 극대기, 긴 밤이 깃든 곳.</p>
                <p>세계적인 오로라 관측지 라플란드에서</p>
                <p>프라이빗 투어로 빛을 찾아갑니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Section */}
        <section id="Highlight" className="mt-20">
          <div className="px-6 mb-4">
            <h4 className="text-2xl font-extrabold text-black mb-4">
              Highlight
            </h4>
          </div>
          <div className="ml-6 mr-6">
            <HighlightSlider />
          </div>
        </section>

        {/* Leader Section*/}
        <section id="Leader" className="mt-20">
          <div className="px-6 mb-4">
            <h4 className="text-2xl font-extrabold text-black mb-4">Leader</h4>
          </div>

          <div className="ml-6 mr-6">
            <LeaderSlider />
          </div>
        </section>

        {/* ProductInclusions Section*/}
        <section id="ProductInclusions" className="mt-20">
          <div className="px-6 mb-6">
            <h4 className="text-2xl font-extrabold text-black mb-4">
              포함사항
            </h4>
          </div>

          <div className="ml-6 mr-6">
            <ProductInclusions />
          </div>
        </section>

        {/* Route Section */}
        <section id="Route" className="mt-20">
          <div className="px-6 mb-6">
            <h4 className="text-2xl font-extrabold text-black mb-4">Route</h4>
          </div>

          <div className="ml-6 mr-6">
            <MapComponent />
          </div>
        </section>

        {/* Flights Section */}
        <section id="Flights" className="mt-36">
          <div className="px-6 mb-6">
            <h4 className="text-2xl font-extrabold text-black mb-4">Flights</h4>
          </div>

          <div className="ml-6 mr-6">
            <FlightCardsSlider />
          </div>
        </section>

        {/* Itinerary Section */}
        <section id="Itinerary" className="mt-20">
          <div className="px-6 mb-6">
            <h4 className="text-2xl font-extrabold text-black mb-4">
              상세일정
            </h4>
          </div>

          <div className="ml-6 mr-6">
            <ItineraryComponent />
          </div>
        </section>

        {/* Stay Section */}
        <section id="Stay" className="mt-20">
          <div className="px-6 mb-6 flex items-center gap-2">
            <Image
              src="/icons/icon-stay.svg"
              alt="Stay"
              width={32}
              height={32}
              className="w-[32px] h-[32px]"
            />
            <h4 className="text-2xl font-extrabold text-black">Stay</h4>
          </div>

          <div className="ml-6 mr-6">
            <StayComponent />
          </div>
        </section>
      </div>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-[10]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* 가격 정보 */}
          <div className="text-sm font-bold text-gray-900 mb-4">
            <span className="underline">129,000원 부터</span>
          </div>

          <div className="flex items-center justify-between gap-2 mb-4">
            {/* 버튼 그룹 */}
            <div className="flex-1">
              {/* 일정 및 가격 버튼 */}
              <button
                onClick={OnClickCTAButton}
                className="w-full h-[34px] px-8 bg-gray-900 text-sm text-white font-semibold rounded-sm hover:bg-gray-900 transition-colors duration-200"
              >
                일정 및 가격
              </button>
            </div>
            <div className="flex-1">
              {/* 찜하기 버튼 */}
              <button className="w-full h-[34px] px-8 bg-white text-sm text-gray-900 font-semibold border-1 border-gray-250 rounded-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                찜하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {isBookingPopupOpen && (
        <BookingPopup onClose={() => setIsBookingPopupOpen(false)} />
      )}
    </div>
  );
};

export default ProductPage;
