import React from 'react';

const list = [
  { id: 1, name: 'By Status' },
  { id: 2, name: 'By Total Tasks' },
  { id: 3, name: 'Task Due' },
  { id: 4, name: 'Extra Tasks' },
  { id: 5, name: 'Tasks Completed' },
];
const Home = () => {
  return (
    <div className="w-full">
      <header>
        <div className="flex p-8 justify-between items-center">
          <h1 className="text-[#1E293B] font-extrabold text-3xl">Kanban Dashboard</h1>
          <div className="flex gap-2">
            <button>search button</button>
            <button>share button</button>
            <button>upload</button>
            <button>add</button>
          </div>
        </div>
        <ul className="flex gap-4 pl-4 gap-4 border-b border-[#E2E8F0]">
          {list.map((item) => (
            <li
              key={item.id}
              className="text-[#64748B] py-2 px-3 font-bold text-base text-[#475569] cursor-pointer border-b-2 border-transparent hover:border-[#A5B4FC]"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </header>
      <main>
        <p>Welcome to the Kanban Dashboard!</p>
      </main>
    </div>
  );
};

export default Home;
