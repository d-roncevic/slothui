import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Priority } from '../../types/project';
import { useProjects } from '../context/useProjects';
import { useParams } from 'react-router-dom';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  defaultStatus: string;
};

type FormValues = {
  title: string;
  status: string;
  assignees: number[];
  progress?: number;
  priority: string;
};

// Yup validacija
const schema = yup
  .object({
    title: yup.string().required('Title is required').min(3, 'Minimum 3 characters'),
    status: yup.string().required('Status is required'),
    assignees: yup.array().min(1, 'Select at least one assignee'),
    priority: yup.string().required('Priority is required'),
  })
  .required();

// Generiranje 5 random usera
const generateRandomUsers = () => {
  const users = [];
  const usedIds: number[] = [];
  while (users.length < 5) {
    const id = Math.floor(Math.random() * (55 - 5 + 1)) + 5;
    if (!usedIds.includes(id)) {
      usedIds.push(id);
      users.push({ id, name: `User ${id}` });
    }
  }
  return users;
};

const randomUsers = generateRandomUsers();

const AddTaskModal = ({ defaultStatus, open, setOpen }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      status:
        defaultStatus === 'To Do'
          ? 'todo'
          : defaultStatus === 'Completed'
            ? 'completed'
            : 'inprogress',
      priority: '',
      assignees: [],
    },
  });

  const { id: projectId } = useParams<{ id: string }>();
  const { dispatch } = useProjects();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const priorityObject = priorities.find((p) => p.label === data.priority);

    const newTask = {
      id: Date.now().toString(),
      title: data.title,
      status: data.status as 'todo' | 'inprogress' | 'completed',
      progress: data.progress ?? 0,
      assignees: data.assignees,
      priority: priorityObject!,
    };

    if (!projectId) {
      toast.error('No project selected');
      return;
    }

    dispatch({
      type: 'ADD_TASK',
      payload: { projectId, task: newTask },
    });

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTask.title,
          completed: newTask.status === 'completed',
          userId: 1,
        }),
      });

      if (res.ok) {
        toast.success('New Task added!');
      }
      reset();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add task');
    }
  };
  const defaultStatusValue =
    defaultStatus === 'To Do' ? 'todo' : defaultStatus === 'Completed' ? 'completed' : 'inprogress';

  const priorities: Priority[] = [
    { label: 'Low Priority', color: '#4F46E5', bgColor: '#EEF2FF' },
    { label: 'OK', color: '#F59E0B', bgColor: '#FFFBEB' },
    { label: 'High Priority', color: '#F43F5E', bgColor: '#FFF1F2' },
  ];

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            New Task
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <TextField
              label="Enter title"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />

            <Controller
              name="status"
              control={control}
              defaultValue={defaultStatusValue}
              render={({ field }) => (
                <Select {...field} displayEmpty fullWidth>
                  <MenuItem value="" disabled>
                    Select Status
                  </MenuItem>
                  <MenuItem value="todo">To Do</MenuItem>
                  <MenuItem value="inprogress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              )}
            />
            {errors.status && <Typography color="error">{errors.status.message}</Typography>}

            {/* Assignees checkboxes */}
            <FormGroup>
              <Typography>Assign Users:</Typography>
              <Controller
                name="assignees"
                control={control}
                render={({ field }) => (
                  <>
                    {randomUsers.map((user) => (
                      <FormControlLabel
                        key={user.id}
                        className="flex items-center"
                        control={
                          <Checkbox
                            value={user.id}
                            checked={field.value.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, user.id]);
                              } else {
                                field.onChange(field.value.filter((id) => id !== user.id));
                              }
                            }}
                          />
                        }
                        label={user.name}
                      />
                    ))}
                  </>
                )}
              />
              {errors.assignees && (
                <Typography color="error">{errors.assignees.message}</Typography>
              )}
            </FormGroup>

            <Controller
              name="priority"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} displayEmpty fullWidth>
                  <MenuItem value="" disabled>
                    Select Priority
                  </MenuItem>
                  {priorities.map((priority, i) => (
                    <MenuItem key={`${priority.label}-${i}`} value={priority.label}>
                      {priority.label}
                    </MenuItem>
                  ))}

                  {/* <MenuItem value="Important">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem> */}
                </Select>
              )}
            />
            {errors.priority && <Typography color="error">{errors.priority.message}</Typography>}

            <div className="flex justify-between text-base text-white font-semibold">
              <button
                type="button"
                className="rounded-full bg-[#F43F5E] cursor-pointer py-2.5 px-5"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-[#4F46E5] cursor-pointer py-2.5 px-5"
              >
                Add New Task
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddTaskModal;

const style = {
  minWidth: '400px',
  width: '30%',
  height: 'auto',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#ffffff',
  border: 'transparent',
  borderRadius: '5px',
  boxShadow: 24,
  zIndex: 1600,
  outline: 'none',
  p: 4,
  color: '#1E293B',
};
