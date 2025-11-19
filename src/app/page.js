import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl w-full space-y-6 sm:space-y-8 text-center">
          <div className="space-y-3 sm:space-y-4 px-2">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              🎓 Silas's Learning App
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              An interactive place to learn and explore!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 pt-4 sm:pt-8">
            <Link
              href="/survey"
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-xl transition-all active:scale-95 sm:hover:shadow-2xl sm:hover:scale-105"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="text-5xl sm:text-6xl">📊</div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Survey & Graphs
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Learn how surveys work and see data come to life with colorful charts!
                </p>
                <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-base sm:text-lg">
                  Start Learning
                  <span className="transition-transform group-hover:translate-x-2 group-active:translate-x-2">→</span>
                </div>
              </div>
            </Link>

            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-xl opacity-50">
              <div className="space-y-3 sm:space-y-4">
                <div className="text-5xl sm:text-6xl">🚀</div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  More Coming Soon!
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  New learning activities will be added here
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 dark:bg-gray-100/10 backdrop-blur-sm">
                <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
