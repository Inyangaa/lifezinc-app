import React from "react";
import { Heart, Shield, Sparkles, Sunrise, Leaf, BookOpen, Calendar, Trophy, Users, MessageCircle, TrendingUp, ArrowRight, GraduationCap, UserCheck, Eye, Bell, FileText } from "lucide-react";
import { Header } from "./Header";

interface HomePageProps {
  onStartJournal: () => void;
  onNavigate: (page: string) => void;
}

export function HomePage({ onStartJournal, onNavigate }: HomePageProps) {
  return (
    <div className="relative overflow-hidden bg-white">
      <Header onNavigate={onNavigate} />
      <div className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-cyan-300/40 to-blue-300/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-teal-300/35 to-emerald-300/35 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-sky-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-200/25 to-indigo-200/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-40">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="lz-fade-in-up space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 backdrop-blur-sm border border-cyan-200 rounded-full shadow-sm">
                <Sunrise className="w-4 h-4 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-700">AI-Powered Mental Wellness</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-cyan-800 to-blue-800 bg-clip-text text-transparent">
                  Mental wellness
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  for every stage of life
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                From teens navigating identity to adults managing stress to parents supporting families—LifeZinc provides AI-powered tools, professional insights, and personalized support for your unique journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-6">
                <button
                  onClick={onStartJournal}
                  className="lz-tap group px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Start Your Journey</span>
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate("tools")}
                  className="lz-tap px-10 py-5 bg-white/90 backdrop-blur-sm text-gray-700 text-lg font-semibold rounded-full border-2 border-cyan-200 hover:border-cyan-400 hover:bg-white transition-all shadow-md hover:shadow-lg"
                >
                  Explore Wellness Tools
                </button>
              </div>

              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 border-2 border-white shadow-md"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-cyan-400 border-2 border-white shadow-md"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 border-2 border-white shadow-md"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-white shadow-md flex items-center justify-center">
                    <span className="text-xs font-bold text-white">+12K</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">12,000+ users worldwide</div>
                  <div className="text-xs text-gray-500">Teens, adults, parents & professionals</div>
                </div>
              </div>
            </div>

            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="lz-fade-in-up relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-3xl blur-2xl opacity-40 animate-pulse" style={{ animationDuration: '3s' }}></div>

                <div className="relative bg-white/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-cyan-100/60 transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">Today's Reflection</div>
                      <div className="text-sm text-gray-500">Just now</div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-5 border border-gray-200/50">
                      <div className="text-xs font-bold text-gray-500 mb-2 tracking-wide">YOUR THOUGHTS</div>
                      <p className="text-gray-800 leading-relaxed">"Balancing work, family, and personal goals feels impossible right now."</p>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 via-blue-50/50 to-teal-50 rounded-2xl p-5 border border-cyan-200/70 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-cyan-600" />
                        <div className="text-xs font-bold text-cyan-700 tracking-wide">LIFEZINC REFLECTS</div>
                      </div>
                      <p className="text-gray-800 leading-relaxed">"Managing multiple responsibilities takes real strength. Let's identify one priority that aligns with your values. Small, intentional steps create lasting change."</p>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium">Anxiety</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Reframed ✓</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-8 -right-8 bg-white/85 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-orange-100/60 transform rotate-3 hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-400 rounded-xl flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">7-Day Streak!</div>
                      <div className="font-bold text-gray-900">Keep going 🎉</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white/85 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-pink-100/60 transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Journal Entries</div>
                      <div className="font-bold text-gray-900">28 this month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lz-soft-fade max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 backdrop-blur-sm border border-cyan-200 rounded-full shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium text-cyan-700">How LifeZinc Supports You</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">feel better</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gentle, evidence-based tools designed to help you process emotions and build resilience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-cyan-100/60 hover:shadow-2xl hover:border-cyan-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">AI Companion</h3>
              <p className="text-gray-600 leading-relaxed">Receive gentle, thoughtful responses that help you reframe difficult emotions and find clarity.</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-sky-100/60 hover:shadow-2xl hover:border-sky-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Private & Safe</h3>
              <p className="text-gray-600 leading-relaxed">Your journal entries are encrypted and visible only to you. Your healing space is completely private.</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-100/60 hover:shadow-2xl hover:border-pink-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Track Progress</h3>
              <p className="text-gray-600 leading-relaxed">Visualize your emotional patterns over time and celebrate milestones in your healing journey.</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100/60 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                <Sunrise className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Faith-Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Optional spiritual support with verses and reflections that align with your beliefs and values.</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-teal-100/60 hover:shadow-2xl hover:border-teal-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Daily Rituals</h3>
              <p className="text-gray-600 leading-relaxed">Build consistency with mood tracking, journaling streaks, and gentle reminders to check in.</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100/60 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600 leading-relaxed">Share your journey anonymously and find encouragement from others who understand.</p>
            </div>
          </div>
        </section>

        <section className="lz-soft-fade max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 backdrop-blur-sm border border-blue-200 rounded-full shadow-sm mb-6">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Built for Everyone</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Personalized support for <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">your life stage</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're navigating adolescence, managing career stress, supporting loved ones, or seeking professional growth—we have tools designed for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-cyan-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">Teens & Students</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Navigate identity, peer pressure, and academic stress with judgment-free support</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Process complex emotions safely</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Build resilience & confidence</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Track mood patterns over time</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">Working Adults</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Manage career stress, relationships, and life transitions with professional tools</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Work-life balance strategies</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Stress management techniques</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Goal setting & accountability</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                <UserCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">Parents & Caregivers</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Support your family's wellness while maintaining your own mental health</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Child progress monitoring</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Parenting stress relief tools</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Distress alerts & guidance</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-violet-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">Professionals</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Therapists, counselors, and coaches supporting clients between sessions</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Session prep & export tools</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Client progress tracking</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Crisis detection alerts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28">
          <div className="relative bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500 rounded-[2.5rem] p-16 md:p-20 text-center text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to start your journey?
              </h2>
              <p className="text-xl text-cyan-50 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join 12,000+ people across all ages and backgrounds who are building healthier relationships with their emotions.
              </p>
              <button
                onClick={onStartJournal}
                className="lz-tap group px-10 py-5 bg-white text-cyan-600 font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
              >
                <span>Begin Your Journey Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-sm text-cyan-100 mt-6 font-medium">
                No credit card required • Free to start • Your data is private
              </p>
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
