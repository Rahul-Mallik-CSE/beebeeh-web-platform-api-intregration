/** @format */
"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { ChecklistItem } from "@/redux/features/adminFeatures/productsAPI";

interface AddCheckListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: string) => void;
  onDelete: (steps: number[]) => void;
  existingChecklists: ChecklistItem[];
  title: string;
}

const AddCheckListModal: React.FC<AddCheckListModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  existingChecklists,
  title,
}) => {
  const [newTasks, setNewTasks] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setNewTasks([]);
      setCurrentInput("");
    }
  }, [isOpen]);

  const handleAddInputField = () => {
    if (currentInput.trim()) {
      setNewTasks([...newTasks, currentInput]);
      setCurrentInput("");
    }
  };

  const handleRemoveNewTask = (index: number) => {
    setNewTasks(newTasks.filter((_, i) => i !== index));
  };

  const handleDeleteExisting = (step: number) => {
    onDelete([step]);
  };

  const handleSaveAll = async () => {
    for (const task of newTasks) {
      await onSave(task);
    }
    setNewTasks([]);
    setCurrentInput("");
    onClose();
  };

  const handleCancel = () => {
    setNewTasks([]);
    setCurrentInput("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] xs:max-w-[90vw] sm:max-w-md md:max-w-2xl p-0 gap-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="px-3 xs:px-4 sm:px-5 md:px-6 pt-3 xs:pt-4 sm:pt-5 md:pt-6 pb-2 xs:pb-3 sm:pb-4">
          <DialogTitle className="text-center text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="px-3 xs:px-4 sm:px-5 md:px-6 pb-3 xs:pb-4 sm:pb-5 md:pb-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
          {/* Existing Checklists */}
          {existingChecklists.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[11px] xs:text-xs sm:text-sm font-semibold text-gray-700">
                Existing Checklists
              </h4>
              <div className="space-y-2">
                {existingChecklists.map((item) => (
                  <div
                    key={item.step}
                    className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-500 min-w-[30px]">
                      {item.step}.
                    </span>
                    <span className="flex-1 text-[11px] xs:text-xs sm:text-sm text-gray-700">
                      {item.task}
                    </span>
                    <button
                      onClick={() => handleDeleteExisting(item.step)}
                      className="p-1 hover:bg-red-100 rounded-md transition-colors group"
                      type="button"
                    >
                      <X className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Tasks */}
          {newTasks.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[11px] xs:text-xs sm:text-sm font-semibold text-gray-700">
                New Tasks (Not Saved)
              </h4>
              <div className="space-y-2">
                {newTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <span className="flex-1 text-[11px] xs:text-xs sm:text-sm text-gray-700">
                      {task}
                    </span>
                    <button
                      onClick={() => handleRemoveNewTask(index)}
                      className="p-1 hover:bg-red-100 rounded-md transition-colors group"
                      type="button"
                    >
                      <X className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Task Input */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="task"
                className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-700"
              >
                Add New Task
              </label>
            </div>
            <div className="flex gap-2">
              <Input
                id="task"
                type="text"
                placeholder="Enter checklist task"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddInputField();
                  }
                }}
                className="flex-1 text-[11px] xs:text-xs sm:text-sm h-8 xs:h-9 sm:h-10"
              />
              <Button
                onClick={handleAddInputField}
                type="button"
                size="sm"
                className="h-8 xs:h-9 sm:h-10 px-3 bg-red-800 hover:bg-red-700 text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] xs:text-xs text-gray-500">
              Click the + button or press Enter to add task to the list
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-3 xs:px-4 sm:px-5 md:px-6 pb-3 xs:pb-4 sm:pb-5 md:pb-6 border-t border-gray-200">
          <div className="flex gap-2 sm:gap-3 pt-3">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 h-8 xs:h-9 sm:h-10 text-[11px] xs:text-xs sm:text-sm border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveAll}
              disabled={newTasks.length === 0}
              className="flex-1 h-8 xs:h-9 sm:h-10 text-[11px] xs:text-xs sm:text-sm bg-red-800 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save {newTasks.length > 0 && `(${newTasks.length})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCheckListModal;
