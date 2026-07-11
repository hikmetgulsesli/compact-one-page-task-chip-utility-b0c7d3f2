// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Empty and Error Recovery - Compact One Page Task Chip Utility
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { BadgeHelp, CircleAlert, ListChecks, ListFilter, Plus, Search, SearchX, Settings } from "lucide-react";


export type EmptyAndErrorRecoveryCompactOnePageTaskChipUtilityActionId = "add-new-task-1" | "filter-list-2" | "settings-3" | "retry-sync-4" | "create-your-first-task-5" | "clear-filters-6" | "tasks-1" | "archives-2" | "clear-cache-3" | "export-json-4";

export interface EmptyAndErrorRecoveryCompactOnePageTaskChipUtilityProps {
  actions?: Partial<Record<EmptyAndErrorRecoveryCompactOnePageTaskChipUtilityActionId, () => void>>;

}

export function EmptyAndErrorRecoveryCompactOnePageTaskChipUtility({ actions }: EmptyAndErrorRecoveryCompactOnePageTaskChipUtilityProps) {
  return (
    <>
      {/* SideNavBar */}
      <nav className="bg-surface-container-low border-r border-outline-variant docked left-0 h-full w-64 hidden md:flex flex-col p-element-gap transition-colors duration-200 ease-in-out shrink-0">
      <div className="mb-section-margin px-container-padding py-4">
      <h1 className="font-headline-sm text-headline-sm font-bold text-primary">TaskStream</h1>
      <p className="font-label-xs text-label-xs text-on-surface-variant mt-1">Local Storage Active</p>
      </div>
      <div className="flex-1 space-y-element-gap">
      <a className="flex items-center px-container-padding py-2 font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant hover:text-on-surface rounded-lg transition-colors" href="#" data-action-id="tasks-1" onClick={(event) => { event.preventDefault(); actions?.["tasks-1"]?.(); }}>
      <ListChecks className="mr-3" aria-hidden={true} focusable="false" />
                      Tasks
                  </a>
      <a className="flex items-center px-container-padding py-2 font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant hover:text-on-surface rounded-lg transition-colors" href="#" data-action-id="archives-2" onClick={(event) => { event.preventDefault(); actions?.["archives-2"]?.(); }}>
      <BadgeHelp className="mr-3" aria-hidden={true} focusable="false" />
                      Archives
                  </a>
      </div>
      <div className="mt-auto pt-section-margin">
      <button className="w-full flex items-center justify-center bg-primary text-on-primary font-label-md text-label-md py-2 rounded-lg hover:bg-surface-tint transition-colors" type="button" data-action-id="add-new-task-1" onClick={actions?.["add-new-task-1"]}>
      <Plus className="mr-2 text-[18px]" aria-hidden={true} focusable="false" />
                      Add New Task
                  </button>
      </div>
      </nav>
      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-surface relative">
      {/* TopNavBar */}
      <header className="bg-surface text-primary border-b border-outline-variant flex justify-between items-center px-container-padding h-14 w-full sticky top-0 z-10">
      <div className="md:hidden font-headline-sm text-headline-sm font-bold text-primary">TaskStream</div>
      <div className="hidden md:block"></div> {/* Spacer for flex-between on desktop where sidebar handles branding */}
      <div className="flex items-center space-x-4">
      <div className="relative hidden sm:block">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-outline text-[18px]" aria-hidden={true} focusable="false" />
      <input className="pl-8 pr-3 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary w-48 transition-colors text-on-surface placeholder:text-outline-variant" placeholder="Search tasks..." type="text" />
      </div>
      <button className="text-on-surface-variant hover:bg-surface-container-low p-1.5 rounded-full transition-colors cursor-pointer active:opacity-70" type="button" aria-label="Filter List" data-action-id="filter-list-2" onClick={actions?.["filter-list-2"]}>
      <ListFilter aria-hidden={true} focusable="false" />
      </button>
      <button className="text-on-surface-variant hover:bg-surface-container-low p-1.5 rounded-full transition-colors cursor-pointer active:opacity-70" type="button" aria-label="Settings" data-action-id="settings-3" onClick={actions?.["settings-3"]}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Dynamic Content Area */}
      <div className="flex-1 p-container-padding md:p-section-margin flex flex-col items-center justify-center max-w-4xl mx-auto w-full gap-section-margin">
      {/* Scenario 1: System Error Banner (Simulating a failed state at top) */}
      <div className="w-full bg-error-container border border-[#ffb4ab] rounded-lg p-4 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-start gap-3">
      <CircleAlert className="text-error icon-fill mt-0.5 sm:mt-0" aria-hidden={true} focusable="false" />
      <div>
      <h3 className="font-label-md text-label-md text-on-error-container font-semibold">Storage sync failed</h3>
      <p className="font-body-sm text-body-sm text-[#93000a] mt-1">We couldn't save your latest changes to the cloud. Your data is safe locally.</p>
      </div>
      </div>
      <button className="shrink-0 bg-error text-on-error font-label-md text-label-md px-4 py-2 rounded border border-transparent hover:bg-[#93000a] transition-colors whitespace-nowrap" type="button" data-action-id="retry-sync-4" onClick={actions?.["retry-sync-4"]}>
                          Retry Sync
                      </button>
      </div>
      {/* Bento Grid Layout for Empty States */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-element-gap w-full mt-4">
      {/* Scenario 2: Global Empty State (No tasks ever created) */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-[400px]">
      <div className="w-32 h-32 mb-6 bg-surface-container-low rounded-full flex items-center justify-center border border-surface-variant">
      <BadgeHelp  style={{fontSize: "48px"}} className="text-4xl text-primary opacity-50 icon-fill" aria-hidden={true} focusable="false" />
      </div>
      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">No tasks found</h2>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 max-w-xs">Your workspace is a clean slate. Start organizing your projects by adding a new task.</p>
      <button className="bg-primary text-on-primary font-label-md text-label-md px-5 py-2.5 rounded-lg hover:bg-surface-tint transition-colors flex items-center shadow-[0_1px_3px_rgba(0,0,0,0.1)]" type="button" data-action-id="create-your-first-task-5" onClick={actions?.["create-your-first-task-5"]}>
      <Plus className="mr-2 text-[18px]" aria-hidden={true} focusable="false" />
                              Create your first task
                          </button>
      </div>
      {/* Scenario 3: Filter/Search Empty State */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-[400px]">
      <div className="w-32 h-32 mb-6 bg-surface-container-low rounded-full flex items-center justify-center border border-surface-variant">
      <SearchX  style={{fontSize: "48px"}} className="text-4xl text-outline opacity-50" aria-hidden={true} focusable="false" />
      </div>
      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">No matching results</h2>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 max-w-xs">We couldn't find any tasks matching your current filters or search terms.</p>
      <button className="bg-transparent text-on-surface font-label-md text-label-md px-5 py-2.5 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors flex items-center" type="button" data-action-id="clear-filters-6" onClick={actions?.["clear-filters-6"]}>
      <BadgeHelp className="mr-2 text-[18px]" aria-hidden={true} focusable="false" />
                              Clear Filters
                          </button>
      </div>
      </div>
      </div>
      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant flex justify-between items-center px-container-padding py-2 w-full mt-auto opacity-80 hover:opacity-100 transition-opacity">
      <div className="font-label-xs text-label-xs text-secondary font-bold">
                      TaskStream v1.0 • Storage: Local
                  </div>
      <div className="flex space-x-4 font-label-xs text-label-xs">
      <a className="text-on-surface-variant hover:text-primary transition-colors" href="#" data-action-id="clear-cache-3" onClick={(event) => { event.preventDefault(); actions?.["clear-cache-3"]?.(); }}>Clear Cache</a>
      <a className="text-on-surface-variant hover:text-primary transition-colors" href="#" data-action-id="export-json-4" onClick={(event) => { event.preventDefault(); actions?.["export-json-4"]?.(); }}>Export JSON</a>
      </div>
      </footer>
      </main>
    </>
  );
}
