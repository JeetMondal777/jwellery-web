import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewYear() {
  const navigate = useNavigate();

  return (
    <section className="py-section-gap bg-surface-bright w-full text-left">
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="font-display-lg text-6xl md:text-8xl text-on-surface mb-6 leading-none">
              It’s all About <br/>
              <span className="text-primary italic font-light">New Year</span>
            </h2>
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed font-light">
              Discover your iconic style. Ethically sourced, consciously crafted, and designed to transcend seasons.
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={() => navigate('/products')}
              className="bg-primary text-on-primary px-8 py-4 font-label-caps text-label-caps rounded shadow-md hover:bg-tertiary transition-colors cursor-pointer flex-1 md:flex-initial"
            >
              SHOP NOW
            </button>
            <button 
              onClick={() => {
                const servicesSection = document.getElementById('jewels-assurance');
                if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 hairline-border font-label-caps text-label-caps rounded hover:bg-surface-container-low transition-colors cursor-pointer flex-1 md:flex-initial"
            >
              ABOUT US
            </button>
          </div>
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter pb-12">
          {/* Card 1: Heritage Gold */}
          <div 
            onClick={() => {navigate('/products?category=necklace'); window.scrollTo({ top: 0, behavior: 'smooth' });}}
            className="group relative overflow-hidden aspect-[3/4] rounded-xl shadow-md hover:shadow-2xl transition-all duration-700 cursor-pointer"
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Heritage Gold Jewelry ruby filigree pendant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKZBm2wqZgIMuv5P-WRSbgLldklVxBvs6srBn2fD9MGoOuS-ZpBuIpy1i_MCSSNaMQhIKxOuOv6g_6lrYlGcZpl1zRRw_M9iQ9_AQg8iRK59wOgT7tPyJ5uxQukttAoyAjcUiJFYu6K5gZlrz1ncGxse-ZqGGL-ZA4NRkN8BnqU_GeSJDc8rR4-KR_X0FGp67KsjiByxNDWJnpZklnAqnKQZInypCBzLdW_AzDs-06u7apnBdcUl1G9HcGoCTSTvJbdHX2WD9Lh1C-"
            />
            <div className="absolute inset-0 white-gradient-up opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-12">
              <h3 className="font-headline-md text-headline-md text-on-surface translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                Heritage Gold
              </h3>
            </div>
          </div>

          {/* Card 2: Emerald Peak (staggered down via translate-y-12) */}
          <div 
            onClick={() => {navigate('/products?category=rings'); window.scrollTo({ top: 0, behavior: 'smooth' });}}
            className="group relative overflow-hidden aspect-[3/4] rounded-xl shadow-md hover:shadow-2xl transition-all duration-700 md:translate-y-12 cursor-pointer"
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Emerald Peak ring set in gold"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCItenS2u-Xf0jxoH_jSvQlgfhqic3k1CT__qGMlyfWlh4SPoV77-Hkb86qoRNIICmbHftSvm4DyQlJyFWbS_tq2BC6eRBhvgvFiAndgjRbugbgwctm7ecO9w4ViwwyiGfH4O6T444NtsMDW8izp36qnFd70UcqSeI8sZbmTNbdBBXc7wvxcwmKc43wvizmMiL281-MkImDvPO5sVYgS1oGxFajAkPHpMqwO_UuWraeUVhNZID2_Qq3I74yrhZwrNsRT54VaD2duGm7"
            />
            <div className="absolute inset-0 white-gradient-up opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-12">
              <h3 className="font-headline-md text-headline-md text-on-surface translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                Emerald Peak
              </h3>
            </div>
          </div>

          {/* Card 3: Azure Drops */}
          <div 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/products?category=earrings')}}
            className="group relative overflow-hidden aspect-[3/4] rounded-xl shadow-md hover:shadow-2xl transition-all duration-700 cursor-pointer"
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Azure Drops sapphire diamond pendant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVqL8lEv1jnwpNJRmB1Z00FzjFm_3IfcbvZTbiROInoF6BI6MlXeeJfGJdQbvMB45SOwVne7KMSsUCi5__86SWty1cdbndRlWkqLe41yDCIcomUkT_4_gfXurgcGR1OAFgFcu5Em9M9fRxQ87a-gcsa4lsUNQxMKS92jy7794KCZhfU950eJ8VGs_jnov3aeGMmjk53nuvhWOXxIXn9fylPnUuHjLx64hL72ZjacSpw2UpGLA-3ApMtMkBjHasWA7EcIK6d9h6l9Yl"
            />
            <div className="absolute inset-0 white-gradient-up opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-12">
              <h3 className="font-headline-md text-headline-md text-on-surface translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                Azure Drops
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
