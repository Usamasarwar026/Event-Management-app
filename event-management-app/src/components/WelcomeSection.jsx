import React from 'react';

const WelcomeSection = () => {
  return (
    <div className="w-full h-[50vh] bg-blue-900 flex justify-center items-center text-white text-center">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold">Welcome to the Event App</h1>
        <p className="text-lg">Find and create events in your community with ease!</p>
      </div>
    </div>
  );
};

export default WelcomeSection;
