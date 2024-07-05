import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-5 mb-8">
      <div className="group bg-white text-dark hover:bg-pink hover:text-white transition-all duration-300 ease-in-out p-10 rounded-lg shadow-md h-[19rem] flex flex-col gap-3 items-center justify-center">
        <div className="p-3 border border-pink rounded-[50%]">
          {icon}
        </div>
        <h3 className="text-xl font-medium mb-4">{title}</h3>
        <p className="font-mulish">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
