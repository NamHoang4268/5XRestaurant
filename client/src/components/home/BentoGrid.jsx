import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { valideURLConvert } from '@/utils/valideURLConvert';
import AnimatedList from '../animations/AnimatedList';

export const BentoGrid = () => {
    const categoryData = useSelector((state) => state.product.allCategory);
    const navigate = useNavigate();

    const handleRedirectProductListPage = (id, cat) => {
        const url = `/${valideURLConvert(cat)}-${id}`;
        navigate(url);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8">
            {/* Large Hero Tile */}
            <div className="md:col-span-4 lg:col-span-4 bg-white rounded-xl overflow-hidden group flex flex-col border border-[#C05E42]/5">
                <div className="relative flex-grow overflow-hidden m-2 rounded-lg aspect-[16/10] md:aspect-auto">
                    <img
                        alt="Signature Dish"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWgGZdfPxA2f7-LfZaCL-Wl1sa2xU_XNDz4WNLJ-nOXy3aHsrqVZYDPMmD4R_A1cs3T8y5qrU-ilDzZSPfI9usFKYsOlIo6KGfeguP9kB9bk9b4JzOCBxFcpiBIfTqXdGo3X68Zko-G4IkdasU0LqQonAP7HUEbsbTeedgmmKjWXE7zj3fWFx1ii4Y8N3Rl7z--BL-X8Hm9LJCp3ezC3-7WFYWFqxnqkYH8bmT_1DyyfRPkRCJ9QlG-tyg096uXoBRM6giBTg878Th"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c19]/70 via-[#1c1c19]/20 to-transparent flex items-end p-8">
                        <div>
                            <span className="bg-[#C05E42] text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block font-['Inter']">
                                The Signature Selection
                            </span>
                            <h2 className="text-white text-3xl md:text-5xl font-['Noto_Serif'] font-bold mb-2">
                                Dry-Aged Wagyu with Truffle Jus
                            </h2>
                            <p className="text-white/80 text-sm max-w-lg hidden md:block">
                                Ethically sourced beef aged for 45 days, served
                                with a velvet-smooth reduction of seasonal black
                                truffles.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 flex justify-between items-center">
                    <p className="text-[#56423d] font-['Inter'] text-xs md:text-sm uppercase tracking-widest font-semibold">
                        Market Selection • Seasonal
                    </p>
                    <button className="bg-[#ebe8e3] text-[#1c1c19] px-6 py-2 rounded-full font-['Inter'] text-xs font-bold uppercase tracking-widest hover:bg-[#C05E42] hover:text-white transition-all duration-300">
                        Discover More
                    </button>
                </div>
            </div>

            {/* Cuisine Categories */}
            <div className="md:col-span-4 lg:col-span-2 w-full gap-2">
                <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-[#C05E42] px-2">
                    Danh mục món ăn
                </h3>

                <AnimatedList
                    items={categoryData}
                    onItemSelect={(category) =>
                        handleRedirectProductListPage(
                            category._id,
                            category.name
                        )
                    }
                />
            </div>
        </div>
    );
};
