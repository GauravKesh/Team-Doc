
import React from "react";
import bgImage from "../asset/image/herojpg.jpeg";


export default function Abou() {
  
  
  return (
    <section
     
      className=" text-gray-400  bg-gray-900 body-font justify-center pb-8 "
    >
      <div class="container mx-auto  flex  py-24 md:flex-row flex-col items-center space-x-10 content-start">
        <div class="lg:flex-grow md:w-1/2 pt-0  lg:pr-24 md:pr-10 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-indigo-400 ">
            <p>Welcome! Health Care+,</p>
          </h1>
          <h2 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-yellow-50">
            Unlock your Potenial with Health Care+
          </h2>
          <br class="hidden lg:inline-block text-xl text-orange-900" />
          <p>
          <p class="mb-8 leading-relaxed text-indigo-400"></p>
            "Your health is your wealth."
          </p>

          <p class="mb-8 leading-relaxed  text-indigo-400">
            Health Care+ is a platform that helps you to get the best health
            care services. We provide you with the best doctors, hospitals and
            health checkup services. We are here to help you to get the best
            health care services. We are here to help you to get the best health
            care
          </p>
         
        </div>

        <div className="sm:min-w-lg lg:w-full pr-0  md:w-1/2 w-5/6">
          
            <div className="w-50 h-50 object-contain    ring-primary ring-offset-base-100 ring-offset-2   shadow-cyan-500/50 ">
              <img
                class="object-contain object-center rounded h-48w-96"
                alt="hero"
                src={bgImage}
              />
            </div>
          
        </div>
      </div>
    </section>
  );
}
