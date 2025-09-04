import React from 'react';
import { getTicketName, formatPrice } from '@/app/utils/bookingUtils';

interface BookingCardProps {
	schedules: any[];
  year?: number;
  startDate?: string;
  endDate?: string;
  duration?: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
	schedules,
  year = 2025,
  startDate = "9월 10일",
  endDate = "9월 15일",
  duration = "4박 6일"
}) => {
  // 첫 번째 예약 가능한 스케줄의 인덱스 찾기
  const firstAvailableIndex = schedules.findIndex(schedule => schedule.total_bookings < schedule.max_participants);
  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl border-2 border-pink-200 p-2">
      {/* 년도 */}
      <div className="text-gray-400 text-base font-medium mb-2 px-4 pt-4">
        {year}년
      </div>
      
      {/* 날짜 범위 */}
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="text-xl font-bold text-gray-800">
          {startDate} <span className="text-gray-400">~</span> {endDate}
        </div>
        <div className="text-gray-400 text-sm">
          {duration}
        </div>
      </div>
      
      {/* 예약 옵션들 */}
      <div className="space-y-4">
				{schedules.map((schedule, index) => (
					<div key={schedule.id}>
						{schedule.total_bookings >= schedule.max_participants ? (
							/* 판매 완료인 경우 */
							<div className="flex items-center justify-between px-4 py-2">
								<div className="text-gray-600">{getTicketName(schedule.ticket_type)}</div>
								<div className="flex items-center gap-4">
									<span className="text-gray-400">{schedule.total_bookings}/{schedule.max_participants}</span>
									<span className="text-gray-400 text-sm w-20 text-right">Sold out</span>
								</div>
							</div>
						) : (
							/* 예약 가능한 경우 */
							<div className={`flex items-center justify-between px-4 py-2 rounded-lg ${
								index === firstAvailableIndex ? 'bg-purple-600 rounded-2xl pl-4 pr-4 py-4 flex items-center justify-between text-white' : ''
							}`}>
								<div className={`text-${index === firstAvailableIndex ? 'white' : 'gray-600'} font-medium`}>{getTicketName(schedule.ticket_type)}</div>
								<div className="flex items-center gap-4">
									<span className={`text-${index === firstAvailableIndex ? 'white' : 'gray-600'} font-semibold`}>{schedule.total_bookings}/{schedule.max_participants}</span>
									<span className={`text-${index === firstAvailableIndex ? 'white' : 'gray-600'} font-medium text-sm w-20 text-right`}>{formatPrice(schedule.price)}</span>
								</div>
							</div>
						)}
					</div>
				))}
      </div>
    </div>
  );
};

export default BookingCard;