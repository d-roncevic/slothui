import { useState } from 'react';
import { HardDriveUpload, Plus, Search, Share2 } from 'lucide-react';
import { useProjects } from '../context/useProjects';
import ProjectBoard from '../layouts/ProjectBoard';

const list = [
  { id: 1, name: 'By Status' },
  { id: 2, name: 'By Total Tasks' },
  { id: 3, name: 'Task Due' },
  { id: 4, name: 'Extra Tasks' },
  { id: 5, name: 'Tasks Completed' },
];

const Home = () => {
  const { state } = useProjects();
  const [activeTab, setActiveTab] = useState<string>('By Total Tasks');

  return (
    <div className="md:w-full sm:w-[calc(100vw-5rem)]  h-full flex flex-col">
      <header className="shrink-0 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="flex px-4 py-6 sm:p-8 flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
          <p className="text-left text-[#1E293B] font-extrabold text-2xl md:text-3xl">
            Kanban Dashboard
          </p>
          <div className="flex gap-2 h-10">
            <button className="p-2 cursor-pointer">
              <Search width={24} color="#475569" />
            </button>
            <button className="flex cursor-pointer items-center gap-2 bg-[#4F46E5] text-white py-2.5 px-4 rounded-full">
              <p className="text-sm font-bold">Share</p> <Share2 width={20} />
            </button>
            <button className="w-10 h-10 flex cursor-pointer items-center justify-center p-2 border border-[#CBD5E1] rounded-full">
              <HardDriveUpload width={24} color="#475569" />
            </button>
            <button className="w-10 h-10 flex cursor-pointer items-center justify-center p-2 border border-[#CBD5E1] rounded-full">
              <Plus width={24} color="#475569" />
            </button>
          </div>
        </div>
        <div className="flex justify-between pr-8">
          <ul className="flex gap-4 px-4 overflow-y-auto md:overflow-hidden h-12">
            {list.map((item) => {
              return (
                <li
                  key={item.id}
                  className={`text-nowrap flex items-center gap-2.5 py-3 px-4 font-bold text-base cursor-pointer border-b-2  hover:border-[#4F46E5] hover:text-[#1E293B] ${activeTab === item.name ? 'border-[#4F46E5] text-[#1E293B]' : 'border-[#CBD5E1] text-[#475569]'}`}
                  onClick={() => setActiveTab(item.name)}
                >
                  {item.name}
                  {item.name === 'By Total Tasks' && (
                    <span className="text-[#4F46E5] text-xs h-6 font-semibold leading-4 bg-[#EEF2FF] px-2 py-1 rounded-full border border-[#A5B4FC]">
                      {state.projects.length}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between w-38">
            <p className="text-[#1E293B] font-bold text-sm">Sort By</p>
            <select
              className="flex text-[#475569] font-semibold text-sm rounded-full px-2.5 py-1 border border-[#CBD5E1]"
              name="sortBy"
              id="sortBy"
            >
              <option value="1">Newest</option>
            </select>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto px-4 py-8 sm:p-8">
        <ProjectBoard projects={state.projects} />
      </main>
    </div>
  );
};

export default Home;
