import { act, useState } from 'react';
import { useFetchTasks } from '../../hooks/useFetchTasks';
import { useTasks } from '../context/useTasks';
import TaskBoard from '../layouts/TaskBoard';
import { HardDriveUpload, Plus, Search, Share2 } from 'lucide-react';

const list = [
  { id: 1, name: 'By Status' },
  { id: 2, name: 'By Total Tasks' },
  { id: 3, name: 'Task Due' },
  { id: 4, name: 'Extra Tasks' },
  { id: 5, name: 'Tasks Completed' },
];

const Home = () => {
  const { loading, error } = useFetchTasks();
  const { state } = useTasks();
  const [activeTab, setActiveTab] = useState<string>('By Total Tasks');
  console.log(state);

  return (
    <div className="w-full h-full flex flex-col">
      <header className="shrink-0 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="flex p-8 justify-between items-center">
          <p className="text-[#1E293B] font-extrabold text-3xl leading-9.5">Kanban Dashboard</p>
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
        <ul className="flex gap-4 px-4">
          {list.map((item) => {
            return (
              <li
                key={item.id}
                className={`flex items-center gap-2.5 py-3 px-4 font-bold text-base cursor-pointer border-b-2  hover:border-[#4F46E5] hover:text-[#1E293B] ${activeTab === item.name ? 'border-[#4F46E5] text-[#1E293B]' : 'border-[#CBD5E1] text-[#475569]'}`}
                onClick={() => setActiveTab(item.name)}
              >
                {item.name}
                {item.name === 'By Total Tasks' && (
                  <span className="text-[#4F46E5] text-sm font-semibold leading-4 bg-[#EEF2FF] px-2 py-1 rounded-full border border-[#A5B4FC]">
                    {state.tasks.length}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </header>
      <main className="flex-1 overflow-y-auto">
        <TaskBoard tasks={state.tasks} />
      </main>
    </div>
  );
};

export default Home;
