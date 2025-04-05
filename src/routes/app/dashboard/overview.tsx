import DashboardLayout from '@/components/layout/dashboard-layout';

const DashboardOverviewRoute = () => {
  return (
    <DashboardLayout>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to <span className="text-orange-500">Lingo Lion</span>
          </h1>
          <p className="mt-1 text-gray-500">
            Here's what's happening with your account today.
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="rounded-lg bg-white/70 p-2 text-gray-500 shadow-sm backdrop-blur-md transition-all duration-200 hover:text-orange-500 hover:shadow">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <button className="rounded-lg bg-white/70 p-2 text-gray-500 shadow-sm backdrop-blur-md transition-all duration-200 hover:text-orange-500 hover:shadow">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
        </div>
      </header>
    </DashboardLayout>
  );
};

export default DashboardOverviewRoute;
