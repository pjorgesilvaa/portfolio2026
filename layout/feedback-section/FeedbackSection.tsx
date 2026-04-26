export default function FeedbackSection() {
  return (
    <div className="w-full md:w-7xl md:px-8">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-primary font-semibold uppercase">Feedback</h2>
        <h3 className="text-2xl md:text-4xl font-bold text-[#2B3437]">Voices of Trust</h3>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mt-8 md:mt-32">
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 flex flex-col justify-center items-start gap-4">
          <p className="text-secondary italic">
            "Working with this team was a game-changer for our project. Their expertise and dedication were evident from day one. They
            delivered exceptional results, exceeding our expectations. We highly recommend their services to anyone looking for top-notch
            solutions."
          </p>
          <div className="flex gap-4 md:gap-8 items-center">
            <div className="aspect-square h-12 md:h-16 bg-gray-200 rounded-lg shrink-0" />
            <div>
              <p className="text-[#2B3437] text-base md:text-xl font-bold">John Doe</p>
              <p className="text-primary text-base md:text-xl font-bold">CEO, Tech Company</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 flex flex-col justify-center items-start gap-4 md:mt-32">
          <p className="text-secondary italic">
            "Working with this team was a game-changer for our project. Their expertise and dedication were evident from day one. They
            delivered exceptional results, exceeding our expectations. We highly recommend their services to anyone looking for top-notch
            solutions."
          </p>
          <div className="flex gap-4 md:gap-8 items-center">
            <div className="aspect-square h-12 md:h-16 bg-gray-200 rounded-lg shrink-0" />
            <div>
              <p className="text-[#2B3437] text-base md:text-xl font-bold">John Doe</p>
              <p className="text-primary text-base md:text-xl font-bold">CEO, Tech Company</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 flex flex-col justify-center items-start gap-4">
          <p className="text-secondary italic">
            "Working with this team was a game-changer for our project. Their expertise and dedication were evident from day one. They
            delivered exceptional results, exceeding our expectations. We highly recommend their services to anyone looking for top-notch
            solutions."
          </p>
          <div className="flex gap-4 md:gap-8 items-center">
            <div className="aspect-square h-12 md:h-16 bg-gray-200 rounded-lg shrink-0" />
            <div>
              <p className="text-[#2B3437] text-base md:text-xl font-bold">John Doe</p>
              <p className="text-primary text-base md:text-xl font-bold">CEO, Tech Company</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
