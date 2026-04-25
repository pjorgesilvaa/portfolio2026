export default function FeedbackSection() {
  return (
    <div className="w-7xl px-8">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-primary font-semibold uppercase">Feedback</h2>
        <h3 className="text-4xl font-bold text-[#2B3437]">Voices of Trust</h3>
      </div>
      <div className="flex justify-center items-center gap-16 mt-32">
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 flex flex-col justify-center items-start gap-4">
          <p className="text-secondary italic">
            "Working with this team was a game-changer for our project. Their expertise and dedication were evident from day one. They
            delivered exceptional results, exceeding our expectations. We highly recommend their services to anyone looking for top-notch
            solutions."
          </p>
          <div className="flex gap-8">
            <div className="w-14 aspect-square bg-gray-200 rounded-lg" />
            <div>
                <p className="text-[#2B3437] text-xl font-bold">John Doe</p>
                <p className="text-primary text-xl font-bold">CEO, Tech Company</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 flex flex-col justify-center items-start gap-4 mt-32">
          <p className="text-secondary italic">
            "Working with this team was a game-changer for our project. Their expertise and dedication were evident from day one. They
            delivered exceptional results, exceeding our expectations. We highly recommend their services to anyone looking for top-notch
            solutions."
          </p>
          <div className="flex gap-8">
            <div className="w-14 aspect-square bg-gray-200 rounded-lg" />
            <div>
                <p className="text-[#2B3437] text-xl font-bold">John Doe</p>
                <p className="text-primary text-xl font-bold">CEO, Tech Company</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 flex flex-col justify-center items-start gap-4">
          <p className="text-secondary italic">
            "Working with this team was a game-changer for our project. Their expertise and dedication were evident from day one. They
            delivered exceptional results, exceeding our expectations. We highly recommend their services to anyone looking for top-notch
            solutions."
          </p>
          <div className="flex gap-8">
            <div className="w-14 aspect-square bg-gray-200 rounded-lg" />
            <div>
                <p className="text-[#2B3437] text-xl font-bold">John Doe</p>
                <p className="text-primary text-xl font-bold">CEO, Tech Company</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
