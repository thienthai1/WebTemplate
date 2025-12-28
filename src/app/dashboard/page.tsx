'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  name: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          router.push('/');
          return;
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center">
            {/* Avatar */}
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() ||
                  user?.email?.charAt(0).toUpperCase() ||
                  'U'}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              You are logged in as {user?.email}
            </p>

            {/* Stats/Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-2">🔐</div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Secure Session
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  JWT authenticated
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-2">🗄️</div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  MySQL Database
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Data persisted
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-2">🐳</div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Docker Ready
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Containerized app
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
