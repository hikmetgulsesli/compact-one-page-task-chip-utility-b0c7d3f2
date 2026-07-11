// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Record Operations - Compact One Page Task Chip Utility
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ArrowUpDown, BadgeHelp, ListChecks, ListFilter, Plus, Search, Settings, User, X } from "lucide-react";


export type RecordOperationsCompactOnePageTaskChipUtilityActionId = "filter-list-1" | "settings-2" | "add-new-task-3" | "new-task-4" | "sort-5" | "close-6" | "close-7" | "close-8" | "close-9" | "close-10" | "active-11" | "pending-12" | "done-13" | "discard-14" | "save-changes-15" | "tasks-1" | "archives-2" | "clear-cache-3" | "export-json-4";

export interface RecordOperationsCompactOnePageTaskChipUtilityProps {
  actions?: Partial<Record<RecordOperationsCompactOnePageTaskChipUtilityActionId, () => void>>;

}

export function RecordOperationsCompactOnePageTaskChipUtility({ actions }: RecordOperationsCompactOnePageTaskChipUtilityProps) {
  return (
    <>
      {/* TopNavBar */}
      <header className="bg-surface dark:bg-background border-b border-outline-variant dark:border-outline flex justify-between items-center px-container-padding h-14 w-full shrink-0 z-10">
      <div className="flex items-center gap-4">
      <div className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed tracking-tight">
                      TaskStream
                  </div>
      {/* Contextual Search Input (Header Element) */}
      <div className="hidden md:flex items-center bg-surface-container-low border border-outline-variant rounded focus-ring ml-8 h-8 w-64 px-2 transition-colors group">
      <Search className="text-outline text-[16px] mr-2" aria-hidden={true} focusable="false" />
      <input aria-label="Search records" className="bg-transparent border-none focus:ring-0 p-0 text-body-sm w-full text-on-surface placeholder:text-outline" placeholder="Search tasks..." type="text" />
      </div>
      </div>
      <div className="flex items-center gap-4">
      <button aria-label="Filter List" className="text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors rounded p-1" type="button" data-action-id="filter-list-1" onClick={actions?.["filter-list-1"]}>
      <ListFilter className="text-[20px]" aria-hidden={true} focusable="false" />
      </button>
      <button aria-label="Settings" className="text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors rounded p-1" type="button" data-action-id="settings-2" onClick={actions?.["settings-2"]}>
      <Settings className="text-[20px]" aria-hidden={true} focusable="false" />
      </button>
      {/* User Avatar Placeholder */}
      <div className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant overflow-hidden shrink-0 flex items-center justify-center cursor-pointer ml-2">
      <User className="text-outline text-[18px]" aria-hidden={true} focusable="false" />
      </div>
      </div>
      </header>
      {/* Main Workspace Area */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-56px-40px)]"> {/* Minus Header and Footer */}
      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col h-full p-element-gap bg-surface-container-low dark:bg-surface-container-highest border-r border-outline-variant dark:border-outline w-64 shrink-0 overflow-y-auto">
      <div className="mb-6 px-2">
      <div className="text-label-xs text-outline uppercase tracking-wider mb-2">Navigation</div>
      <div className="flex flex-col gap-1">
      {/* Active Tab */}
      <a className="flex items-center gap-3 px-3 py-2 bg-secondary-container text-on-secondary-container rounded-lg transition-colors duration-200 ease-in-out font-label-md text-label-md" href="#" data-action-id="tasks-1" onClick={(event) => { event.preventDefault(); actions?.["tasks-1"]?.(); }}>
      <ListChecks className="text-[18px]" aria-hidden={true} focusable="false" />
      <span>Tasks</span>
      </a>
      {/* Inactive Tab */}
      <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant dark:hover:bg-on-surface-variant rounded-lg transition-colors duration-200 ease-in-out font-label-md text-label-md" href="#" data-action-id="archives-2" onClick={(event) => { event.preventDefault(); actions?.["archives-2"]?.(); }}>
      <BadgeHelp className="text-[18px]" aria-hidden={true} focusable="false" />
      <span>Archives</span>
      </a>
      </div>
      </div>
      <div className="mt-auto px-2">
      <div className="text-label-xs text-outline mb-1">Status</div>
      <div className="font-label-md text-label-md text-on-surface-variant mb-4">Local Storage Active</div>
      <button className="w-full bg-primary text-on-primary font-label-md text-label-md py-2 rounded shadow-sm hover:opacity-90 transition-opacity flex justify-center items-center gap-2" type="button" data-action-id="add-new-task-3" onClick={actions?.["add-new-task-3"]}>
      <Plus className="text-[16px]" aria-hidden={true} focusable="false" />
                          Add New Task
                      </button>
      </div>
      </nav>
      {/* Canvas */}
      <main className="flex-1 flex flex-col bg-surface p-container-padding overflow-y-auto relative">
      {/* Top Action & Metrics Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-section-margin gap-4">
      <div>
      <h1 className="font-headline-sm text-headline-sm text-on-surface mb-1">Record Operations</h1>
      <p className="font-body-sm text-body-sm text-on-surface-variant">Manage and review your task pool.</p>
      </div>
      <div className="flex items-center gap-4">
      {/* Metrics Bento Mini */}
      <div className="flex bg-surface-container-lowest border border-outline-variant rounded divide-x divide-outline-variant h-10">
      <div className="px-3 py-1 flex flex-col justify-center items-center min-w-[80px]">
      <span className="font-headline-sm text-headline-sm text-primary leading-none">142</span>
      <span className="font-label-xs text-label-xs text-outline uppercase">Total</span>
      </div>
      <div className="px-3 py-1 flex flex-col justify-center items-center min-w-[80px]">
      <span className="font-headline-sm text-headline-sm text-on-surface leading-none">89</span>
      <span className="font-label-xs text-label-xs text-outline uppercase">Done</span>
      </div>
      <div className="px-3 py-1 flex flex-col justify-center items-center min-w-[80px]">
      <span className="font-headline-sm text-headline-sm text-error leading-none">53</span>
      <span className="font-label-xs text-label-xs text-outline uppercase">Pending</span>
      </div>
      </div>
      <button className="bg-primary text-on-primary font-label-md text-label-md px-4 h-10 rounded hover:bg-opacity-90 transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm" type="button" data-action-id="new-task-4" onClick={actions?.["new-task-4"]}>
      <Plus className="text-[16px]" aria-hidden={true} focusable="false" />
                              New Task
                          </button>
      </div>
      </div>
      {/* Bento Grid Layout for Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-element-gap h-full">
      {/* Left Panel: Dense Task List */}
      <div className="lg:col-span-7 xl:col-span-8 bg-surface-container-lowest border border-outline-variant rounded flex flex-col h-full max-h-[600px]">
      <div className="p-3 border-b border-outline-variant flex justify-between items-center bg-surface-bright shrink-0">
      <h2 className="font-label-md text-label-md text-on-surface font-semibold">Active Pool</h2>
      {/* Mobile Search (Hidden on Desktop) */}
      <div className="md:hidden flex items-center bg-surface border border-outline-variant rounded focus-ring h-7 w-40 px-2">
      <Search className="text-outline text-[14px] mr-1" aria-hidden={true} focusable="false" />
      <input className="bg-transparent border-none focus:ring-0 p-0 text-label-xs w-full" placeholder="Search..." type="text" />
      </div>
      <div className="flex items-center gap-2">
      <button className="text-outline hover:text-on-surface transition-colors p-1" title="Sort" type="button" data-action-id="sort-5" onClick={actions?.["sort-5"]}>
      <ArrowUpDown className="text-[16px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </div>
      {/* Scrollable Chip Container */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-wrap content-start gap-chip-gap">
      {/* Chip Items (Dense) */}
      <div className="task-chip group flex items-center bg-surface-container-low border border-outline-variant rounded px-[4px] py-[2px] cursor-pointer hover:bg-surface-variant transition-colors hover:border-outline">
      <span className="w-2 h-2 rounded-full bg-primary mr-2 ml-1"></span>
      <span className="font-label-md text-label-md text-on-surface mr-2 truncate max-w-[150px]">Update Schema Docs</span>
      <button className="delete-btn text-outline flex items-center justify-center p-0.5 rounded-full hover:bg-surface-container-high" type="button" aria-label="Close" data-action-id="close-6" onClick={actions?.["close-6"]}>
      <X className="text-[14px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      <div className="task-chip group flex items-center bg-surface-container-low border border-outline-variant rounded px-[4px] py-[2px] cursor-pointer hover:bg-surface-variant transition-colors hover:border-outline">
      <span className="w-2 h-2 rounded-full bg-error mr-2 ml-1"></span>
      <span className="font-label-md text-label-md text-on-surface mr-2 truncate max-w-[150px]">Fix API Rate Limit</span>
      <button className="delete-btn text-outline flex items-center justify-center p-0.5 rounded-full hover:bg-surface-container-high" type="button" aria-label="Close" data-action-id="close-7" onClick={actions?.["close-7"]}>
      <X className="text-[14px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      {/* Active State Chip (Simulating selection) */}
      <div className="task-chip group flex items-center bg-primary border-primary rounded px-[4px] py-[2px] cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <span className="w-2 h-2 rounded-full bg-on-primary mr-2 ml-1"></span>
      <span className="font-label-md text-label-md text-on-primary mr-2 truncate max-w-[150px]">Review Q3 Analytics</span>
      <button className="text-on-primary opacity-70 hover:opacity-100 flex items-center justify-center p-0.5 rounded-full" type="button" aria-label="Close" data-action-id="close-8" onClick={actions?.["close-8"]}>
      <X className="text-[14px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      <div className="task-chip group flex items-center bg-surface-container-low border border-outline-variant rounded px-[4px] py-[2px] cursor-pointer hover:bg-surface-variant transition-colors hover:border-outline">
      <span className="w-2 h-2 rounded-full bg-outline mr-2 ml-1"></span>
      <span className="font-label-md text-label-md text-on-surface mr-2 truncate max-w-[150px]">Deploy Staging Env</span>
      <button className="delete-btn text-outline flex items-center justify-center p-0.5 rounded-full hover:bg-surface-container-high" type="button" aria-label="Close" data-action-id="close-9" onClick={actions?.["close-9"]}>
      <X className="text-[14px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      <div className="task-chip group flex items-center bg-surface-container-low border border-outline-variant rounded px-[4px] py-[2px] cursor-pointer hover:bg-surface-variant transition-colors hover:border-outline">
      <span className="w-2 h-2 rounded-full bg-primary mr-2 ml-1"></span>
      <span className="font-label-md text-label-md text-on-surface mr-2 truncate max-w-[150px]">Client Sync Prep</span>
      <button className="delete-btn text-outline flex items-center justify-center p-0.5 rounded-full hover:bg-surface-container-high" type="button" aria-label="Close" data-action-id="close-10" onClick={actions?.["close-10"]}>
      <X className="text-[14px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      {/* More Chips... */}
      
      </div>
      </div>
      {/* Right Panel: Inline Edit Preview */}
      <div className="lg:col-span-5 xl:col-span-4 bg-surface-container-lowest border border-outline-variant rounded flex flex-col h-full max-h-[600px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="p-3 border-b border-outline-variant flex justify-between items-center bg-surface-bright shrink-0">
      <h2 className="font-label-md text-label-md text-on-surface font-semibold">Inspector</h2>
      <span className="font-label-xs text-label-xs text-outline px-2 py-0.5 bg-surface-variant rounded">ID: #4092</span>
      </div>
      <div className="p-4 flex-1 overflow-y-auto space-y-4">
      {/* Input Group */}
      <div className="space-y-1">
      <label className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wide">Task Name</label>
      <input className="w-full bg-surface-bright border border-outline-variant rounded px-3 py-2 font-body-sm text-body-sm text-on-surface focus-ring transition-colors" type="text" defaultValue="Review Q3 Analytics" />
      </div>
      {/* Status Selection */}
      <div className="space-y-1">
      <label className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wide">Status</label>
      <div className="flex gap-2">
      <button className="flex-1 border border-primary bg-primary-fixed-dim text-primary font-label-md text-label-md py-1.5 rounded flex items-center justify-center gap-1" type="button" data-action-id="active-11" onClick={actions?.["active-11"]}>
      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                           Active
                                       </button>
      <button className="flex-1 border border-outline-variant text-on-surface-variant hover:bg-surface-variant font-label-md text-label-md py-1.5 rounded transition-colors" type="button" data-action-id="pending-12" onClick={actions?.["pending-12"]}>
                                           Pending
                                       </button>
      <button className="flex-1 border border-outline-variant text-on-surface-variant hover:bg-surface-variant font-label-md text-label-md py-1.5 rounded transition-colors" type="button" data-action-id="done-13" onClick={actions?.["done-13"]}>
                                           Done
                                       </button>
      </div>
      </div>
      {/* Description Area */}
      <div className="space-y-1">
      <label className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wide">Details</label>
      <textarea className="w-full bg-surface-bright border border-outline-variant rounded px-3 py-2 font-body-sm text-body-sm text-on-surface focus-ring transition-colors h-24 resize-none" placeholder="Add task details...">Aggregate data from Marketing and Sales pipelines. Ensure discrepancy under 2% before presentation.</textarea>
      </div>
      {/* Metadata */}
      <div className="pt-4 border-t border-outline-variant grid grid-cols-2 gap-4">
      <div>
      <div className="font-label-xs text-label-xs text-outline mb-0.5">Created</div>
      <div className="font-body-sm text-body-sm text-on-surface">Oct 24, 09:41 AM</div>
      </div>
      <div>
      <div className="font-label-xs text-label-xs text-outline mb-0.5">Assignee</div>
      <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-xs text-[9px]">JS</div>
      <span className="font-body-sm text-body-sm text-on-surface">J. Smith</span>
      </div>
      </div>
      </div>
      </div>
      {/* Action Footer */}
      <div className="p-3 border-t border-outline-variant bg-surface-bright shrink-0 flex justify-end gap-2">
      <button className="px-4 py-1.5 border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded hover:bg-surface-variant transition-colors" type="button" data-action-id="discard-14" onClick={actions?.["discard-14"]}>
                                  Discard
                              </button>
      <button className="px-4 py-1.5 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-opacity-90 transition-colors shadow-sm" type="button" data-action-id="save-changes-15" onClick={actions?.["save-changes-15"]}>
                                  Save Changes
                              </button>
      </div>
      </div>
      </div>
      </main>
      </div>
      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-surface-dim border-t border-outline-variant dark:border-outline flex justify-between items-center px-container-padding py-2 w-full shrink-0 z-10">
      <div className="font-label-xs text-label-xs text-on-surface-variant">
                  TaskStream v1.0 • Storage: Local
              </div>
      <div className="flex items-center gap-4">
      <a className="font-label-xs text-label-xs text-on-surface-variant opacity-80 hover:opacity-100 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" href="#" data-action-id="clear-cache-3" onClick={(event) => { event.preventDefault(); actions?.["clear-cache-3"]?.(); }}>Clear Cache</a>
      <a className="font-label-xs text-label-xs text-on-surface-variant opacity-80 hover:opacity-100 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" href="#" data-action-id="export-json-4" onClick={(event) => { event.preventDefault(); actions?.["export-json-4"]?.(); }}>Export JSON</a>
      </div>
      </footer>
    </>
  );
}
