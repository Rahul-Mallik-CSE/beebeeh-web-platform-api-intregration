/** @format */
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus, GripVertical } from "lucide-react";
import { ChecklistItem } from "@/redux/features/adminFeatures/productsAPI";

interface AddCheckListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: string) => Promise<void>;
  onDelete: (steps: number[]) => Promise<void>;
  onReorder: (orderedSteps: number[]) => Promise<void>;
  existingChecklists: ChecklistItem[];
  title: string;
}

const AddCheckListModal: React.FC<AddCheckListModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  onReorder,
  existingChecklists,
  title,
}) => {
  const [localChecklists, setLocalChecklists] = useState<ChecklistItem[]>([]);
  const [newTasks, setNewTasks] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLocalChecklists([...existingChecklists]);
      setNewTasks([]);
      setCurrentInput("");
    }
  }, [isOpen, existingChecklists]);

  const handleAddInputField = () => {
    if (currentInput.trim()) {
      setNewTasks([...newTasks, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const handleRemoveNewTask = (index: number) => {
    setNewTasks(newTasks.filter((_, i) => i !== index));
  };

  const handleDeleteExisting = async (step: number) => {
    await onDelete([step]);
    setLocalChecklists((prev) => prev.filter((item) => item.step !== step));
  };

  // Drag handlers
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    setDragIndex(index);
    dragNode.current = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    // Slight delay so the ghost image renders before style change
    setTimeout(() => {
      if (dragNode.current) dragNode.current.style.opacity = "0.4";
    }, 0);
  };

  const handleDragEnter = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    setDragOverIndex(index);
    const newList = [...localChecklists];
    const dragged = newList.splice(dragIndex, 1)[0];
    newList.splice(index, 0, dragged);
    setLocalChecklists(newList);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    if (dragNode.current) dragNode.current.style.opacity = "1";
    dragNode.current = null;
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const isOrderChanged = () => {
    if (localChecklists.length !== existingChecklists.length) return false;
    return localChecklists.some(
      (item, i) => item.step !== existingChecklists[i].step,
    );
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      if (isOrderChanged()) {
        const orderedSteps = localChecklists.map((item) => item.step);
        await onReorder(orderedSteps);
      }
      for (const task of newTasks) {
        await onSave(task);
      }
      setNewTasks([]);
      setCurrentInput("");
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setNewTasks([]);
    setCurrentInput("");
    onClose();
  };

  const hasPendingChanges = newTasks.length > 0 || isOrderChanged();

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
          {localChecklists.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[11px] xs:text-xs sm:text-sm font-semibold text-gray-700">
                Existing Checklists
              </h4>
              <p className="text-[10px] xs:text-xs text-gray-500">
                Drag items to reorder
              </p>
              <div className="space-y-2">
                {localChecklists.map((item, index) => (
                  <div
                    key={item.step}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className={`flex items-center gap-2 p-2 sm:p-3 rounded-lg border transition-colors ${
                      dragOverIndex === index && dragIndex !== index
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing shrink-0" />
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-400 min-w-[24px]">
                      {index + 1}.
                    </span>
                    <span className="flex-1 text-[11px] xs:text-xs sm:text-sm text-gray-700 select-none">
                      {item.task}
                    </span>
                    <button
                      onClick={() => handleDeleteExisting(item.step)}
                      className="p-1 hover:bg-red-100 rounded-md transition-colors group shrink-0"
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
            <label
              htmlFor="task"
              className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-700"
            >
              Add New Task
            </label>
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
              disabled={isSaving}
              className="flex-1 h-8 xs:h-9 sm:h-10 text-[11px] xs:text-xs sm:text-sm border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveAll}
              disabled={!hasPendingChanges || isSaving}
              className="flex-1 h-8 xs:h-9 sm:h-10 text-[11px] xs:text-xs sm:text-sm bg-red-800 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving
                ? "Saving..."
                : `Save${newTasks.length > 0 ? ` (${newTasks.length} new)` : ""}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCheckListModal;
