// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Record Editor - Compact One Page Task Chip Utility
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { CircleAlert, ListFilter, Plus, Search, Settings, TriangleAlert, X } from "lucide-react";


export type RecordEditorCompactOnePageTaskChipUtilityActionId = "filter-list-1" | "settings-2" | "add-tag-3" | "cancel-4" | "save-changes-5" | "clear-cache-1" | "export-json-2";

export interface RecordEditorCompactOnePageTaskChipUtilityProps {
  actions?: Partial<Record<RecordEditorCompactOnePageTaskChipUtilityActionId, () => void>>;

}

export function RecordEditorCompactOnePageTaskChipUtility({ actions }: RecordEditorCompactOnePageTaskChipUtilityProps) {
  return (
    <>
      {/* TopNavBar */}
      <header className="bg-surface dark:bg-background text-primary dark:text-primary-fixed font-headline-sm text-headline-sm docked full-width top-0 border-b border-outline-variant dark:border-outline flat no shadows flex justify-between items-center px-container-padding h-14 w-full">
      <div className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed flex items-center gap-2">
                  TaskStream
              </div>
      <div className="flex items-center gap-4">
      {/* Search Placeholder (Right) */}
      <div className="hidden md:flex items-center bg-surface-container-low rounded-full px-3 py-1 border border-outline-variant">
      <Search className="text-on-surface-variant text-sm" aria-hidden={true} focusable="false" />
      <input className="bg-transparent border-none text-body-sm focus:ring-0 text-on-surface w-48 placeholder-on-surface-variant ml-2 p-0 h-6" placeholder="Search..." type="text" />
      </div>
      {/* Trailing Icons */}
      <button className="text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors cursor-pointer active:opacity-70 p-1 rounded-full flex items-center justify-center" type="button" aria-label="Filter List" data-action-id="filter-list-1" onClick={actions?.["filter-list-1"]}>
      <ListFilter aria-hidden={true} focusable="false" />
      </button>
      <button className="text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors cursor-pointer active:opacity-70 p-1 rounded-full flex items-center justify-center" type="button" aria-label="Settings" data-action-id="settings-2" onClick={actions?.["settings-2"]}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-container-padding flex justify-center items-start pt-10">
      <div className="w-full max-w-[600px] bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-6">
      <h1 className="font-headline-sm text-headline-sm text-on-surface">Edit Task</h1>
      {/* Unsaved feedback */}
      <div className="flex items-center gap-1.5 text-tertiary-container bg-error-container/30 px-2 py-1 rounded-md">
      <TriangleAlert className="text-[14px]" aria-hidden={true} focusable="false" />
      <span className="font-label-xs text-label-xs">You have unsaved changes</span>
      </div>
      </div>
      <form className="flex flex-col gap-6">
      {/* Task Name Field (Required with Error State Example) */}
      <div className="flex flex-col gap-1.5">
      <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="taskName">Task Name <span className="text-error">*</span></label>
      <input className="bg-surface-container-lowest border border-error text-on-surface font-body-md text-body-md rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-error focus:border-error transition-colors w-full bg-error-container/10" id="taskName" name="taskName" placeholder="e.g. Q4 Financial Review" type="text" defaultValue="" />
      <span className="font-label-xs text-label-xs text-error mt-1 flex items-center gap-1">
      <CircleAlert className="text-[14px]" aria-hidden={true} focusable="false" /> Task name is required
                              </span>
      </div>
      {/* Description Field (Optional) */}
      <div className="flex flex-col gap-1.5">
      <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="taskDescription">Description (Optional)</label>
      <textarea className="bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md rounded px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors w-full resize-y" id="taskDescription" name="taskDescription" placeholder="Add detailed context or steps here..." rows={4}></textarea>
      </div>
      {/* Labels/Chips (Compact Data) */}
      <div className="flex flex-col gap-1.5">
      <label className="font-label-md text-label-md text-on-surface-variant">Tags</label>
      <div className="flex flex-wrap gap-chip-gap">
      {/* Task Chip Component */}
      <div className="inline-flex items-center gap-1 bg-surface-container border border-outline-variant rounded px-2 py-1 group cursor-pointer hover:bg-surface-container-high transition-colors">
      <span className="font-label-md text-label-md text-on-surface">Finance</span>
      <X className="text-[12px] text-on-surface-variant opacity-40 group-hover:opacity-100 group-hover:text-error transition-opacity" aria-hidden={true} focusable="false" />
      </div>
      <div className="inline-flex items-center gap-1 bg-surface-container border border-outline-variant rounded px-2 py-1 group cursor-pointer hover:bg-surface-container-high transition-colors">
      <span className="font-label-md text-label-md text-on-surface">Urgent</span>
      <X className="text-[12px] text-on-surface-variant opacity-40 group-hover:opacity-100 group-hover:text-error transition-opacity" aria-hidden={true} focusable="false" />
      </div>
      {/* Add Tag Button */}
      <button className="inline-flex items-center gap-1 bg-surface-container-lowest border border-dashed border-outline-variant rounded px-2 py-1 hover:bg-surface-container-low transition-colors text-on-surface-variant hover:text-primary" type="button" data-action-id="add-tag-3" onClick={actions?.["add-tag-3"]}>
      <Plus className="text-[14px]" aria-hidden={true} focusable="false" />
      <span className="font-label-md text-label-md">Add Tag</span>
      </button>
      </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-outline-variant">
      <button className="font-label-md text-label-md px-4 py-2 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors" type="button" data-action-id="cancel-4" onClick={actions?.["cancel-4"]}>
                                  Cancel
                              </button>
      <button className="font-label-md text-label-md px-4 py-2 rounded bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm" type="button" data-action-id="save-changes-5" onClick={actions?.["save-changes-5"]}>
                                  Save Changes
                              </button>
      </div>
      </form>
      </div>
      </main>
      </div>
      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-surface-dim text-secondary dark:text-secondary-fixed font-label-xs text-label-xs docked full-width bottom-0 border-t border-outline-variant dark:border-outline flat no shadows flex justify-between items-center px-container-padding py-2 w-full">
      <div className="font-label-xs text-label-xs font-bold text-on-surface-variant">
                  TaskStream v1.0 • Storage: Local
              </div>
      <div className="flex items-center gap-4">
      <a className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim opacity-80 hover:opacity-100 transition-colors" href="#" data-action-id="clear-cache-1" onClick={(event) => { event.preventDefault(); actions?.["clear-cache-1"]?.(); }}>Clear Cache</a>
      <a className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim opacity-80 hover:opacity-100 transition-colors" href="#" data-action-id="export-json-2" onClick={(event) => { event.preventDefault(); actions?.["export-json-2"]?.(); }}>Export JSON</a>
      </div>
      </footer>
    </>
  );
}
