import React from 'react';
import { HeroEditorial } from './HeroEditorial';
import { BentoGrid } from './BentoGrid';
import { FeaturedDishes } from './FeaturedDishes';
import { ReservationBlock } from './ReservationBlock';
import { Testimonial } from './Testimonial';
import { EpicureanFooter } from './EpicureanFooter';
import { ScrollProvider } from '../../contexts/ScrollContext';
import MagicBento from '../animations/MagicBento';
import Header from './Header';

/*
 * ── Design Tokens (không hardcode background — để Plasma + dark/light mode tự handle) ──
 * Primary rose-orange : #C96048  (warm rose-orange)
 * Primary dark        : #A8432E
 * Glow RGB            : 201, 96, 72
 *
 * Text/bg dùng CSS vars từ index.css:
 *   text-foreground, text-muted-foreground, bg-card, bg-muted, bg-background
 *   border-border, bg-accent, ...
 */

/* ── "Why Choose Us" — 6 cards, layout khớp hình tham chiếu ── */
const whyUsCards = [
    {
        // Card 1 — col1, row1
        color: '#1E100C',
        icon: '🍽️',
        label: 'Chất lượng',
        title: 'Nguyên liệu Cao Cấp',
        description:
            'Mỗi nguyên liệu được tuyển chọn kỹ lưỡng từ các nhà cung cấp uy tín, đảm bảo độ tươi ngon tuyệt hảo.',
    },
    {
        // Card 2 — col2, row1
        color: '#0F1A12',
        icon: '👨‍🍳',
        label: 'Đội ngũ',
        title: 'Đầu bếp Bậc Thầy',
        description:
            'Đội ngũ đầu bếp với hơn 10 năm kinh nghiệm, đào tạo tại các trường ẩm thực danh tiếng quốc tế.',
    },
    {
        // Card 3 — col3-4, row1-2 (ô to, CSS nth-child(3) xử lý)
        color: '#1E0C14',
        icon: '⭐',
        label: 'Uy tín',
        title: 'Đánh giá 5 Sao',
        description:
            'Được hàng nghìn thực khách tin tưởng. Nhà hàng duy trì đánh giá 5 sao liên tục trong nhiều năm, là lựa chọn hàng đầu tại thành phố.',
    },
    {
        // Card 4 — col1-2, row2-3 (ô to, CSS nth-child(4) xử lý)
        color: '#0B1220',
        icon: '📍',
        label: 'Vị trí',
        title: 'Địa điểm Lý Tưởng',
        description:
            'Tọa lạc tại trung tâm thành phố, dễ dàng tiếp cận với không gian sang trọng, riêng tư. Bãi đỗ xe rộng rãi, giao thông thuận tiện mọi hướng.',
    },
    {
        // Card 5 — col3, row3
        color: '#1A1408',
        icon: '🕐',
        label: 'Tiện lợi',
        title: 'Mở cửa hàng ngày',
        description:
            'Phục vụ từ 8:00 sáng đến 10:00 tối, kể cả cuối tuần và ngày lễ.',
    },
    {
        // Card 6 — col4, row3 (CSS nth-child(6) xử lý)
        color: '#180A18',
        icon: '🎁',
        label: 'Dịch vụ',
        title: 'Tiệc & Sự Kiện',
        description:
            'Tổ chức tiệc sinh nhật, lễ kỷ niệm và hội nghị với không gian thiết kế riêng theo yêu cầu.',
    },
];

export const ModernEpicureanHome = () => {
    return (
        <ScrollProvider>
            <style>{`
                /*
                 * Why-Us grid — layout 4 cột khớp hình tham chiếu:
                 *   Row1: [card1][card2][card3 card3]
                 *   Row2: [card4 card4][card3 card3]
                 *   Row3: [card4 card4][card5][card6]
                 *
                 * Sử dụng đúng các rule nth-child mặc định của MagicBento
                 * (không reset grid-column/grid-row)
                 */
                .why-us-grid {
                    max-width: 100% !important;
                    width: 100% !important;
                    padding: .5rem 0 !important;
                    gap: .875rem !important;
                }
                @media (min-width: 600px) {
                    .why-us-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (min-width: 1024px) {
                    .why-us-grid { grid-template-columns: repeat(4, 1fr) !important; }

                    /* Card 3 — ô to góc phải trên (col 3-4, row 1-2) */
                    .why-us-grid .bento-card:nth-child(3) {
                        grid-column: span 2 !important;
                        grid-row: span 2 !important;
                    }
                    /* Card 4 — ô to góc trái dưới (col 1-2, row 2-3) */
                    .why-us-grid .bento-card:nth-child(4) {
                        grid-column: 1 / span 2 !important;
                        grid-row: 2 / span 2 !important;
                    }
                    /* Card 6 — ô nhỏ góc phải dưới (col 4, row 3) */
                    .why-us-grid .bento-card:nth-child(6) {
                        grid-column: 4 !important;
                        grid-row: 3 !important;
                    }
                }

                /* Card size — giữ aspect-ratio mặc định của MagicBento */
                .why-us-grid .bento-card        { min-height: 160px !important; }
                .why-us-grid .bento-card__icon  { font-size: 1.75rem !important; }
                .why-us-grid .bento-card__title { font-size: 1rem !important; font-weight: 700 !important; }
                .why-us-grid .bento-card__label { opacity: .5; font-size: .7rem !important; letter-spacing: .08em; }
                .why-us-grid .bento-card__desc  { font-size: .78rem !important; line-height: 1.55 !important; }
            `}</style>

            {/* Không set bg — để Plasma + body bg-background hiển thị qua */}
            <div className="eat-ease-home text-foreground">
                <main className="py-24 container mx-auto">
                    {/* ── Hero Editorial ─────────────────────────── */}
                    <HeroEditorial />

                    {/* ── Bento Grid (Hero + Categories) ─────────── */}
                    <div className="mt-16">
                        <BentoGrid />
                    </div>

                    {/* ── Why Choose Us — MagicBento section ────── */}
                    <section className="mt-24">
                        <div className="mb-2 text-center">
                            <span className="inline-block text-[10px] uppercase tracking-[.3em] text-orange-600 font-bold bg-[#C96048]/10 dark:bg-[#C96048]/20 px-4 py-1.5 rounded-full mb-4 border border-[#C96048]/80">
                                Lý do lựa chọn
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                Tại sao chọn EatEase?
                            </h2>
                            <p className="mt-3 text-orange-500 font-bold text-sm max-w-lg mx-auto leading-relaxed">
                                Chúng tôi không chỉ phục vụ món ăn — chúng tôi
                                kiến tạo những trải nghiệm ẩm thực đáng nhớ.
                            </p>
                        </div>

                        <MagicBento
                            cards={whyUsCards}
                            glowColor="201, 96, 72"
                            enableBorderGlow={true}
                            enableTilt={true}
                            clickEffect={true}
                            textAutoHide={false}
                            className="why-us-grid"
                        />
                    </section>

                    {/* ── Featured Creations ──────────────────────── */}
                    <div className="mt-24 grid grid-cols-1 md:grid-cols-6 gap-6">
                        <FeaturedDishes />
                    </div>

                    {/* ── Reservation & Testimonial ───────────────── */}
                    <div className="mt-24 grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch">
                        <ReservationBlock />
                        <Testimonial />
                    </div>
                </main>

                <EpicureanFooter />
            </div>
        </ScrollProvider>
    );
};

export default ModernEpicureanHome;
