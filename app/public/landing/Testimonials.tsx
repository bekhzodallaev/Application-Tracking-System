import React from 'react';
import { MdStar } from 'react-icons/md';// or use any icon library you prefer

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Senior Product Designer",
    text: "JobTrack completely changed how I approach my job search. The kanban board made it so easy to see where I stood with every single company. I landed a senior role in 3 weeks!",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    text: "The automated sync is a game-changer. I used to spend hours copy-pasting job descriptions. Now it's a one-click process. Highly recommend the Pro plan for serious seekers.",
    rating: 4,
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director",
    text: "Finally, a tool built for the candidate, not the recruiter. The interview prep and analytics helped me negotiate a 20% higher salary because I had all my data in one place.",
    rating: 5,
  },
];
const Testimonials = () => {
  return (
      <section className="py-16 md:py-24 bg-gray-50" id='testimonials'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
            SUCCESS STORIES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            Loved by successful candidates
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of professionals who have streamlined their job search and
            landed their dream roles using JobTrack.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8 md:p-10 flex flex-col h-full">
                {/* Stars */}
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <MdStar
                      key={i}
                      className="w-5 h-5 text-blue-500 fill-blue-500"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 grow">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  {/* You can replace with real avatar images later */}
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials