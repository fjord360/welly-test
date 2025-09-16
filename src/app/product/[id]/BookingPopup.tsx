import React, { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

interface Trip {
  id: number;
  year: number;
  startDate: string;
  endDate: string;
  duration: string;
  remainingSeats: number;
  price: number;
}
interface DiscountOption {
  name: string;
  discount: number;
}

interface BookingPopupProps {
  onClose: () => void;
}

const BookingPopup: React.FC<BookingPopupProps> = ({ onClose }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState([false, false]);

  const trips: Trip[] = [
    {
      id: 1,
      year: 2025,
      startDate: "12월 10일",
      endDate: "12월 25일",
      duration: "4박5일",
      remainingSeats: 6,
      price: 527,
    },
    {
      id: 2,
      year: 2025,
      startDate: "12월 26일",
      endDate: "12월 30일",
      duration: "4박5일",
      remainingSeats: 6,
      price: 527,
    },
    {
      id: 3,
      year: 2025,
      startDate: "11월 26일",
      endDate: "12월 2일",
      duration: "4박5일",
      remainingSeats: 6,
      price: 527,
    },
  ];

  const roomTypes = [
    {
      name: "슈퍼 얼리버드",
      available: "3/3",
      status: "Sold out",
      price: null,
    },
    { name: "얼리버드", available: "0/3", status: null, price: 527 },
    { name: "라스트 콜", available: "0/3", status: null, price: 578 },
    { name: "캔슬 티켓", available: "0/3", status: null, price: 600 },
  ];

  const discountOptions: DiscountOption[] = [
    { name: "항공권 별도 구매", discount: -140 },
    { name: "1인실 사용", discount: +50 },
  ];

  const weekDays = ["화", "수", "목", "금", "토"];

  const handleTripClick = (trip: Trip) => {
    if (selectedTrip?.id === trip.id) return;
    setSelectedTrip(trip);
  };

  const closeHandleTripClick = () => {
    setSelectedTrip(null);
  };

  const handleDiscountSelect = (index: number) => {
    const newSelectedDiscount = [...selectedDiscount];
    newSelectedDiscount[index] = !newSelectedDiscount[index];
    setSelectedDiscount(newSelectedDiscount);
  };

  const calculateFinalPrice = () => {
    if (!selectedTrip) return 0;
    const basePrice = selectedTrip.price;
    let discountAmount = 0;
    if (selectedDiscount[0]) {
      discountAmount += discountOptions[0].discount;
    }
    if (selectedDiscount[1]) {
      discountAmount += discountOptions[1].discount;
    }
    return basePrice + discountAmount;
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="p-6 fixed inset-0 bg-white z-[9999] flex flex-col">
      {/* 헤더 */}
      <div className="flex justify-between items-center p-1 mt-10">
        <div className="flex space-x-1">
          <div className="bg-gray-100 px-3 py-2 rounded-sm">
            <button className="text-gray-900 text-base font-extrabold">
              11월
            </button>
          </div>
          <div className="bg-white px-3 py-2 rounded-sm">
            <button className="text-gray-300 text-base font-bold">12월</button>
          </div>
          <div className="bg-white px-3 py-2 rounded-sm">
            <button className="text-gray-300 text-base font-bold">1월</button>
          </div>
        </div>
      </div>
      <button onClick={handleClose} className="absolute right-6 top-6">
        <X className="w-6 h-6 text-gray-500" />
      </button>

      <div className="overflow-y-auto transition-all duration-300 mt-3">
        {/* 여행 목록 */}
        <div className="space-y-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="border-gray-250 border-1 rounded-lg p-3 cursor-pointer transition-all duration-200"
              onClick={() => handleTripClick(trip)}
            >
              <div className="flex justify-between items-center">
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 mb-1">
                      {trip.year}년
                    </div>
                    <div className="">
                      <ChevronDown
                        className={`w-8 h-8 text-gray-600 pt-2 transition-transform ${
                          selectedTrip?.id === trip.id ? "rotate-180" : ""
                        }`}
                        onClick={() => closeHandleTripClick()}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm text-gray-900">
                      {trip.startDate}
                    </span>
                    <Image
                      src="/icons/icon-arrow-right-filled.svg"
                      alt=""
                      width={10}
                      height={10}
                      className="w-3 h-3"
                    />
                    <span className="font-semibold text-sm text-gray-900">
                      {trip.endDate}
                    </span>
                    <div className="text-gray-600 text-xs text-gray-600 ml-1">
                      {trip.duration}
                    </div>
                  </div>

                  {selectedTrip?.id != trip.id && (
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-250">
                      <div className="flex items-center space-x-2">
                        <div className="space-y-2 w-[36px] h-[6px]">
                          <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                              style={{ width: `80%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-bold text-gray-800">
                            {trip.remainingSeats}
                          </span>
                          <span className="text-xs text-gray-600">
                            자리 남았습니다
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-800 text-extrabold">
                        527만원
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 상세 정보 (선택된 경우에만 표시) */}
              {selectedTrip?.id === trip.id && (
                <div className="mt-6">
                  {/* 요일 표시 */}
                  <div className="flex gap-2 text-sm mb-6">
                    {weekDays.map((day, index) => (
                      <div
                        key={index}
                        className="w-[32px] h-[32px] rounded-full font-semibold flex justify-center items-center text-sm bg-gray-50"
                      >
                        <p className={"font-medium text-gray-700"}>{day}</p>
                      </div>
                    ))}
                  </div>

                  {/* 객실 타입 선택 */}
                  <div className="space-y-2 mb-6">
                    {roomTypes.map((room, index) => (
                      <div
                        key={room.name}
                        className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
                          room.status === "Sold out"
                            ? "bg-gray-50 cursor-not-allowed"
                            : index === 1
                            ? "border border-primary"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={
                              room.status === "Sold out"
                                ? "text-sm text-gray-300 text-bold w-[96px]"
                                : "text-sm font-medium text-bold w-[96px]"
                            }
                          >
                            {room.name}
                          </span>
                          <span
                            className={
                              room.status === "Sold out"
                                ? "ml-2 text-sm text-gray-300 text-bold"
                                : "ml-2 text-sm text-gray-700 ml-2"
                            }
                          >
                            {room.available}
                          </span>
                        </div>
                        {room.status && (
                          <span className="text-sm text-gray-300 ml-2">
                            {room.status}
                          </span>
                        )}
                        {room.price && (
                          <span className="font-bold text-sm">
                            {room.price} 만원
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 할인 옵션 */}
                  <div className="space-y-3 mb-6">
                    {discountOptions.map((option, index) => (
                      <label
                        key={option.name}
                        className={`flex items-center justify-between cursor-pointer p-2 ${
                          selectedDiscount[index] ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="discount"
                            checked={selectedDiscount[index]}
                            onChange={() => handleDiscountSelect(index)}
                            className="w-4 h-4"
                          />
                          <span className="ml-3 text-gray-900 text-sm">
                            {option.name}
                          </span>
                        </div>
                        <span className={"font-medium text-sm text-gray-700"}>
                          {option.discount > 0 ? "+" : ""}
                          {option.discount}만원
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* 최종 가격 */}
                  <div className="text-center mb-4 bg-blue-50 py-4">
                    <div className="flex items-center space-x-2 justify-center">
                      <span className="text-sm font-bold text-blue-500">
                        최종가격
                      </span>
                      <span className="text-xl font-bold text-primary">
                        {calculateFinalPrice()}
                      </span>
                      <span className="text-xs font-bold text-primary pt-[2px]">
                        만원
                      </span>
                    </div>
                    <div className="text-xs text-gray-700 mt-1">
                      {selectedDiscount[0] &&
                        selectedDiscount[1] &&
                        "항공권 별도 구매 / 1인실 사용"}
                      {selectedDiscount[0] &&
                        !selectedDiscount[1] &&
                        "항공권 별도 구매"}
                      {!selectedDiscount[0] &&
                        selectedDiscount[1] &&
                        "1인실 사용"}
                    </div>
                  </div>

                  {/* 예약 버튼 */}
                  <button className="w-full h-[34px] bg-gray-900 text-sm text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    예약금 50만원 결제
                  </button>

                  <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="space-y-2 w-[36px] h-[6px]">
                        <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `80%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-bold text-gray-800">
                          {trip.remainingSeats}
                        </span>
                        <span className="text-xs text-gray-600">
                          자리 남았습니다
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingPopup;
