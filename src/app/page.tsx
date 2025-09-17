import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-sm mx-auto min-h-screen bg-[#3c3c3c] text-white overflow-x-hidden">
      {/* Main Content */}
      <div className="px-6 pt-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">웰니스 여행</h1>
            <p className="text-white-100 text-base">
              삶의 에너지를 충전하는 # 웰리트립
            </p>
          </div>
          <button className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
            여행 문의
          </button>
        </div>

        {/* Bali Trip Card */}
        <Link href="/product/finland-2025">
          <div className="relative mb-6">
            <div
              className="h-60 rounded-xl overflow-hidden relative"
              style={{
                backgroundImage: "url(/images/thumbnail-1-1.png)",
                backgroundSize: "cover",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute top-6 left-6">
                <div className="flex items-center gap-2 text-white/100">
                  <span className="text-sm">🇫🇮 핀란드</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-2">Finland Wellness</h2>
                  <p className="text-xl mb-4">
										핀란드 웰니스 여행
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <span>2025년 11-12월</span>
                    <span>4박 6일</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
