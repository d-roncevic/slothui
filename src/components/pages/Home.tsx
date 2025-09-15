import { useState } from 'react';
import { useFetchTasks } from '../../hooks/useFetchTasks';
import { useTasks } from '../context/useTasks';
import TaskBoard from '../layouts/TaskBoard';
import {
  Columns2,
  HomeIcon,
  LayoutGrid,
  Plus,
  Rows2,
  Search,
  TextAlignJustify,
  Eclipse,
  ChevronRight,
  Share,
  SlidersVertical,
  ArrowUpZA,
  ChevronLeft,
} from 'lucide-react';

const Home = () => {
  const { loading, error } = useFetchTasks();
  const { state } = useTasks();
  const viewList = [
    { id: 1, icon: LayoutGrid, name: 'Grid view' },
    { id: 2, icon: TextAlignJustify, name: 'List view' },
    { id: 3, icon: Columns2, name: 'Column view' },
    { id: 4, icon: Rows2, name: 'Row view' },
  ];
  const [activeView, setActiveView] = useState(viewList[1]);

  const uniqueAssignees = Array.from(
    new Set(state.tasks.flatMap((task) => task.assignees ?? [])),
  ).slice(0, 3);

  console.log(state.tasks);

  return (
    <div className="w-full h-full flex flex-col">
      <header className="shrink-0 border-b border-[#E2E8F0]">
        <div className="flex px-4 py-6 sm:p-8 sm:flex-row flex-col justify-between gap-5 sm:gap-0 sm:items-center h-[128px] sm:h-20 bg-[#F8FAFC]">
          <div className="sm:flex gap-2 items-center h-8 hidden">
            <span className="p-1.5">
              <HomeIcon size={20} color="#475569" />
            </span>
            <span className="text-[#CBD5E1]">
              <ChevronRight size={20} />
            </span>
            <p className="font-bold text-sm text-[#475569]">Dashboard</p>
            <span className="text-[#CBD5E1]">
              <ChevronRight size={20} />
            </span>
            <p className="font-bold text-sm text-[#475569]">Project</p>
            <span className="text-[#CBD5E1]">
              <ChevronRight size={20} />
            </span>
            <div className="flex items-center gap-1 text-[#4F46E5]">
              <Eclipse size={20} color="#4F46E5" />
              <p className="font-bold">Project PlanetX</p>
            </div>
          </div>
          <div className="sm:hidden gap-2 h-5 flex items-left cursor-pointer">
            <span className="text-[#CBD5E1]">
              <ChevronLeft size={20} color="#4F46E5" />
            </span>
            <p className="font-bold text-sm text-[#4F46E5]">Back to Project</p>
          </div>
          <div className="flex gap-2 h-10 items-center">
            <Search size={24} color="#475569" />
            <div className="flex -space-x-2">
              {uniqueAssignees.map((num) => (
                <img
                  key={num}
                  src={`https://i.pravatar.cc/40?img=${num}`}
                  alt={`user-${num}`}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}

              {uniqueAssignees.length > 5 && (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 border-2 border-white">
                  +{uniqueAssignees.length - 5}
                </div>
              )}
            </div>
            <button className="flex cursor-pointer items-center text-[#475569] h-10 py-2.5 px-4 rounded-full border border-[#CBD5E1] gap-2">
              <span className="font-bold text-sm">Invite</span>
              <Plus size={24} color="#475569" />
            </button>
          </div>
        </div>
        {/* Project Info */}
        <div className="h-[236px] sm:h-[162px] pt-6 px-4 sm:p-8 gap-4 flex flex-col sm:flex-row items-start sm:items-center w-full">
          <img
            src="placeholder-logo.png"
            className="sm:w-22 sm:h-22 w-16 h-16"
            alt="Placeholder logo"
          />
          {/* <div className="flex justify-between w-full"> */}
          <div className="flex flex-col sm:gap-3 w-full">
            <div className="flex justify-between sm:flex-row flex-col gap-4 sm:gap-0">
              <h1 className="font-extrabold text-3xl text-[#1E293B] text-left">Project PlanetX</h1>
              <div className="flex gap-5">
                <button className="flex gap-1 h-5 text-nowrap">
                  <LayoutGrid size={20} color="#475569" />
                  <span className="text-[#475569] font-bold text-sm">Grid view</span>
                </button>
                <button className="flex gap-1 h-5 text-nowrap">
                  <SlidersVertical size={20} color="#475569" />
                  <span className="text-[#475569] font-bold text-sm">Filter</span>
                </button>
                <button className="flex gap-1 h-5 text-nowrap">
                  <ArrowUpZA size={20} color="#475569" />
                  <span className="text-[#475569] font-bold text-sm">Sort</span>
                </button>
              </div>
            </div>

            <div className="hidden sm:flex justify-between">
              <ul className="flex rounded-full h-12 bg-[#F1F5F9] p-1 items-center gap-2.5">
                {viewList.map((view) => {
                  const isActive = activeView.id === view.id;
                  const color = isActive ? '#4F46E5' : '#1E293B';
                  return (
                    <li
                      className={`px-4 py-2 flex gap-2 text-[#475569] font-bold ${activeView.id === view.id ? 'rounded-full bg-white shadow-[0_2px_4px_-2px_rgba(23,23,23,0.06),0_4px_8px_-2px_rgba(23,23,23,0.10)]' : ''}`}
                      key={view.id}
                      onClick={() => setActiveView(view)}
                    >
                      <view.icon size={20} color={`${color}`} />
                      {view.name}
                    </li>
                  );
                })}
              </ul>
              <button className="flex h-12 rounded-full bg-[#4F46E5] py-3 px-5 gap-2.5 text-nowrap">
                <span className="font-bold text-base text-white h-5.5">Export Data</span>
                <Share color="#ffffff" size={20} />
              </button>
            </div>
          </div>
          {/* </div> */}
        </div>
      </header>
      <main className="flex-1 sm:overflow-y-auto px-4 py-8 sm:p-8">
        <TaskBoard tasks={state.tasks} />
      </main>
    </div>
  );
};

export default Home;
