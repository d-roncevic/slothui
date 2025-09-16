import { useEffect, useState } from 'react';
import { useFetchTasks } from '../../hooks/useFetchTasks';
import TaskBoard from '../layouts/TaskBoard';
import {
  Columns2,
  LayoutGrid,
  Plus,
  Rows2,
  Search,
  TextAlignJustify,
  Share,
  SlidersVertical,
  ArrowUpZA,
  ChevronLeft,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '../context/useProjects';
import { CircularProgress, Modal } from '@mui/material';
import BreadCrumbs from '../BreadCrumbs';
const Project = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useProjects();
  const { loading, error } = useFetchTasks(id!);
  const viewList = [
    { id: 1, icon: LayoutGrid, name: 'Grid view' },
    { id: 2, icon: TextAlignJustify, name: 'List view' },
    { id: 3, icon: Columns2, name: 'Column view' },
    { id: 4, icon: Rows2, name: 'Row view' },
  ];
  const [activeView, setActiveView] = useState(viewList[1]);

  const project = state.projects.find((p) => p.id === id);
  const uniqueAssignees = project
    ? Array.from(new Set(project.tasks.flatMap((task) => task.assignees ?? []))).slice(0, 3)
    : [];

  useEffect(() => {
    if (!project) navigate('/');
  }, [project]);

  useEffect(() => {
    if (id) {
      dispatch({ type: 'SET_CURRENT_PROJECT', payload: id });
    }
  }, [id, dispatch]);

  const list = [
    { id: 1, name: 'By Status' },
    { id: 2, name: 'By Total Tasks' },
    { id: 3, name: 'Task Due' },
    { id: 4, name: 'Extra Tasks' },
    { id: 5, name: 'Tasks Completed' },
  ];

  const [activeTab, setActiveTab] = useState('By Total Tasks');
  return (
    <>
      {loading ? (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 flex-col">
          <CircularProgress sx={{ color: '#4f46e5' }} />
          <p className="mt-4 text-gray-700 text-lg">Učitavanje...</p>
        </div>
      ) : (
        <div className="md:w-full sm:w-[calc(100vw-5rem)] h-full flex flex-col">
          <header className="shrink-0 border-b border-[#E2E8F0]">
            <div className="flex px-4 py-6 md:p-8 sm:flex-row flex-col justify-between gap-5 md:gap-0 md:items-center h-[128px] md:h-20 bg-[#F8FAFC]">
              {project && <BreadCrumbs project={project} />}
              <Link to={'/'}>
                <div className="md:hidden gap-2 h-5 flex items-left cursor-pointer">
                  <span className="text-[#CBD5E1]">
                    <ChevronLeft size={20} color="#4F46E5" />
                  </span>
                  <p className="font-bold text-sm text-[#4F46E5]">Back to Project</p>
                </div>
              </Link>

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
            <div className="h-[236px] md:h-[162px] pt-6 px-4 md:p-8 gap-4 flex flex-col md:flex-row items-start md:items-center w-full">
              <img
                src="../placeholder-logo.png"
                className="md:w-22 md:h-22 w-16 h-16"
                alt="Placeholder logo"
              />
              {/* <div className="flex justify-between w-full"> */}
              <div className="flex flex-col md:gap-3 w-full">
                <div className="flex justify-between md:flex-row flex-col gap-4 md:gap-0">
                  <h1 className="font-extrabold text-2xl md:text-3xl text-[#1E293B] text-left">
                    {project?.title}
                  </h1>
                  <div className="flex gap-5">
                    <button className="flex gap-1 h-5 text-nowrap cursor-pointer">
                      <LayoutGrid size={20} color="#475569" />
                      <span className="text-[#475569] font-bold text-sm">Grid view</span>
                    </button>
                    <button className="flex gap-1 h-5 text-nowrap cursor-pointer">
                      <SlidersVertical size={20} color="#475569" />
                      <span className="text-[#475569] font-bold text-sm">Filter</span>
                    </button>
                    <button className="flex gap-1 h-5 text-nowrap cursor-pointer">
                      <ArrowUpZA size={20} color="#475569" />
                      <span className="text-[#475569] font-bold text-sm">Sort</span>
                    </button>
                  </div>
                  <ul className="flex md:hidden gap-4 px-4 overflow-y-auto md:overflow-hidden h-12">
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
                </div>

                <div className="hidden md:flex justify-between">
                  <ul className="flex rounded-full h-12 bg-[#F1F5F9] p-1 items-center gap-2.5">
                    {viewList.map((view) => {
                      const isActive = activeView.id === view.id;
                      const color = isActive ? '#4F46E5' : '#1E293B';
                      return (
                        <li
                          className={`cursor-pointer px-4 py-2 flex items-center gap-2 text-[#475569] font-bold ${activeView.id === view.id ? 'rounded-full bg-white shadow-[0_2px_4px_-2px_rgba(23,23,23,0.06),0_4px_8px_-2px_rgba(23,23,23,0.10)]' : ''}`}
                          key={view.id}
                          onClick={() => setActiveView(view)}
                        >
                          <view.icon size={20} color={`${color}`} />
                          {view.name}
                        </li>
                      );
                    })}
                  </ul>
                  <button className="flex h-12 rounded-full bg-[#4F46E5] py-3 px-5 gap-2.5 text-nowrap cursor-pointer">
                    <span className="font-bold text-base text-white h-5.5">Export Data</span>
                    <Share color="#ffffff" size={20} />
                  </button>
                </div>
              </div>
              {/* </div> */}
            </div>
          </header>
          <main className="flex-1 md:overflow-y-auto px-4 py-8 md:p-8">
            <TaskBoard tasks={project?.tasks ?? []} />
          </main>
        </div>
      )}
    </>
  );
};

export default Project;
