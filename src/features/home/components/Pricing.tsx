'use client';

import React from 'react'
import { useRouter } from 'next/navigation'

const Pricing = () => {

  const router = useRouter();

  function handleClick() {
    router.push('/auth/signup');
  }
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-slate-950 text-white" id='pricing'>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Flexible plans for{" "}
            <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              every stage
            </span>
          </h2>
          <p className="mt-5 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Whether you're just starting out or managing a high-volume search, we have
            <br className="hidden sm:block" /> the right tools for you.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-slate-600">
            <div className="mb-6">
              <h3 className="text-3xl font-bold">Free</h3>
              <p className="text-4xl font-bold mt-2">
                $0<span className="text-xl font-normal text-slate-400">/month</span>
              </p>
              <p className="mt-3 text-slate-400">Perfect for casual job seekers.</p>
            </div>

            <ul className="space-y-4 mb-10 grow">
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Track up to 20 applications
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Basic Kanban board
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Chrome Extension
              </li>
            </ul>

            <button onClick={handleClick} className="mt-auto py-4 px-8 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-medium text-white transition-colors duration-200 cursor-pointer">
              Start Free
            </button>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="relative bg-linear-to-b from-slate-900 to-slate-950 border-2 border-indigo-600/70 rounded-2xl p-8 md:p-10 flex flex-col shadow-2xl shadow-indigo-900/30 transform md:scale-105 z-10 transition-all duration-300">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm font-semibold px-5 py-1.5 rounded-full border-2 border-indigo-500 shadow-lg">
              MOST POPULAR
            </div>

            <div className="mb-6">
              <h3 className="text-3xl font-bold">Pro</h3>
              <p className="text-4xl font-bold mt-2">
                $12<span className="text-xl font-normal text-indigo-300">/month</span>
              </p>
              <p className="mt-3 text-indigo-200">Everything you need to land it fast.</p>
            </div>

            <ul className="space-y-4 mb-10 grow">
              <li className="flex items-center gap-3 text-slate-200 font-medium">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited applications
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Advanced Analytics
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Automated Email Sync
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Follow-up Reminders
              </li>
            </ul>

            <button onClick={handleClick} className=" cursor-pointer mt-auto py-4 px-8 bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-900/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/50">
              Get Pro
            </button>
          </div>

          {/* Premium Plan */}
          <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-purple-600/60 hover:shadow-xl hover:shadow-purple-900/20">
            <div className="mb-6">
              <h3 className="text-3xl font-bold">Premium</h3>
              <p className="text-4xl font-bold mt-2">
                $29<span className="text-xl font-normal text-slate-400">/month</span>
              </p>
              <p className="mt-3 text-slate-400">Full career support and AI tools.</p>
            </div>

            <ul className="space-y-4 mb-10 grow">
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Everything in Pro
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                AI Interview Coach
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Resume Keyword Optimizer
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Priority Support
              </li>
            </ul>

            <button onClick={handleClick} className=" cursor-pointer mt-auto py-4 px-8 bg-purple-900/50 hover:bg-purple-900/70 border border-purple-700 rounded-xl font-medium text-white transition-colors duration-200">
              Go Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing