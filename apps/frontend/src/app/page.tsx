"use client";

import { TaskForm } from "@/components/forms/taskForm";
import { TasksList } from "@/components/tasks/tasksList";
import { useToken } from "@/hooks/useToken";
import Link from "next/link";
import { FiLogIn, FiLogOut, FiList, FiCheckSquare } from "react-icons/fi";

export default function Home() {
  const userToken = useToken();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FiCheckSquare className="text-blue-600 text-2xl" />
            <h1 className="text-2xl font-bold text-gray-800">To Do App</h1>
          </div>

          {userToken ? (
            <Link
              href="/logout"
              className="flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors"
            >
              <FiLogOut className="mr-2" />
              Logout
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm hover:shadow transition-all"
            >
              <FiLogIn className="mr-2" />
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!userToken ? (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-12">
            <div className="p-8">
              <div className="flex items-center justify-center mb-4">
                <FiList className="text-blue-600 text-4xl" />
              </div>
              <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold text-center">
                Task Management
              </div>
              <h2 className="mt-2 text-xl font-semibold text-center text-gray-800">
                Welcome to To Do App
              </h2>
              <p className="mt-3 text-gray-500 text-center">
                Please login to manage your tasks and stay organized.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  href="/login"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
                >
                  <FiLogIn className="mr-2" />
                  Login Now
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 mb-6">
              <TaskForm />
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
              <TasksList />
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} To Do App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
