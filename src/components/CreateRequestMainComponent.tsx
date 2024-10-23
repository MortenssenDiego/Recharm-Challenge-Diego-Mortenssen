import React, { useState } from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import { HiPlus, HiX } from "react-icons/hi";

interface CreateRequestMainComponentProps {
}
export function CreateRequestMainComponent(
  props: CreateRequestMainComponentProps
) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-2 border-b rounded-t">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-extrabold">
          Create New Request
        </h3>
        <button
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <HiX className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
            Add videos or folders
          </h4>
          <p className="text-sm text-gray-900 dark:text-gray-400">
            These videos would be cut, labeled and made available in your
            Recharm video library
          </p>
        </div>

        <div>
          <Button
            color="light"
            className="text-sm font-medium hover:text-purple-800 bg-white hover:bg-gray-50 border border-gray-300"
          >
            <span className="flex items-center">
              <span className="bg-purple-800 rounded-full p-0.5 mr-2">
                <HiPlus className="h-3 w-3 text-white" />
              </span>
              Add URL
            </span>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
        <Button
          color="primary"
          className="text-sm font-medium bg-purple-700 hover:bg-purple-800"
        >
          Create Request
        </Button>
      </div>
    </div>
  );
}
