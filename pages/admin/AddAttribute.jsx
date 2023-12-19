"use client";
import { useState } from "react";

const AddAttribute = ({ onClose }) => {
  const [attribute, setAttribute] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with form data, like sending to an API, etc.
  };

  return (
    <div className="fixed mt-0 inset-5 flex items-center justify-center z-50">
      <div className="bg-black opacity-60 inset-0 fixed"></div>
      <div className="bg-white/95 dark:bg-black/95 border border-emerald-600 shadow-lg shadow-emerald-600 p-4 rounded-md z-50 relative max-w-md w-full md:max-w-xl">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg hover:text-red-600 p-1 hover:bg-slate-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <div className="text-center">
            <h2 className="font-semibold text-xl text-emerald-600 mb-8">
              Add New Attribute
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label htmlFor="attribute" className="mr-10">
                Attribute
                <span className="text-red-500">*</span>:
              </label>
              <input
                type="text"
                id="attribute"
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
                className="w-3/5 px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="primary-button dark:text-black">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAttribute;
