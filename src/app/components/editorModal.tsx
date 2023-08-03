import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { toast } from 'react-toastify';

interface ResponseData {
  data?: Record<string, unknown>;
  isError: boolean;
}

export const EditorModal = (props: {
  emoji: Record<string, string>;
  gradient: string;
  data: Record<string, unknown>;
}) => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const router = useRouter();

  const handleBackClick = () => {
    setSuccess(false);
    router.back();
  };

  const handleAddGlean = async () => {
    const response: ResponseData = await axios.post('/api/glean', {
      title: data?.title,
      description: data?.description,
      image: data?.image,
    });
    if (response.isError) {
      toast.error('Error: Could not add glean');
    } else {
      setSuccess(true);
      toast.success('Success: Glean Added');
    }
  };

  const data: any = props.data.data;
  return (
    <div className='modal animate-modal fixed inset-0 z-10 flex  items-center justify-center'>
      <div className='modal-content h-[75%] w-1/2 rounded-2xl bg-neutral-800 px-10 py-10'>
        {!success && (
          <div>
            <div className='flex flex-col items-center justify-center'>
              <div
                className='flex h-52 w-52 items-center justify-center rounded-2xl'
                style={{ background: props.gradient }}
              >
                <h2 className='mb-4 text-8xl'>{props.emoji.emoji}</h2>
              </div>
            </div>
            <p className='mt-3 truncate text-center text-4xl text-white'>
              {data?.title}
            </p>
            <div className='fade-text relative mt-4 flex h-28 items-center justify-center overflow-hidden '>
              <p className=' w-4/5 text-center text-neutral-500'>
                {data?.description}
              </p>
            </div>
            <div className='mt-8 flex items-center justify-center'>
              <div className='flex w-3/4 justify-around'>
                <div className='flex justify-between rounded-full bg-neutral-700 px-4 py-2'>
                  <p className='text-white'>Test</p>
                  <button className='ms-2 text-white'>-</button>
                </div>
                <div className='flex items-center justify-between rounded-full bg-neutral-700 px-4 py-2'>
                  <p className='text-white'>Test</p>
                  <button className='ms-2 text-green-600'>+</button>
                  <div className='ms-2 h-1/2 w-px bg-neutral-400'></div>
                  <button className='ms-2 text-white'>-</button>
                </div>
                <div className='flex items-center justify-between rounded-full bg-neutral-700 px-4 py-2'>
                  <p className='text-white'>Test</p>
                  <button className='ms-2 text-green-600'>+</button>
                  <div className='ms-2 h-1/2 w-px bg-neutral-400'></div>
                  <button className='ms-2 text-white'>-</button>
                </div>
                <div className='flex items-center justify-between rounded-full bg-neutral-700 px-4 py-2'>
                  <p className='text-white'>Test</p>
                  <button className='ms-2 text-green-600'>+</button>
                  <div className='ms-2 h-1/2 w-px bg-neutral-400'></div>
                  <button className='ms-2 text-white'>-</button>
                </div>
                <div className='flex items-center justify-between rounded-full bg-neutral-700 px-4 py-2'>
                  <p className='text-white'>Test</p>
                  <button className='ms-2 text-green-600'>+</button>
                  <div className='ms-2 h-1/2 w-px bg-neutral-400'></div>
                  <button className='ms-2 text-white'>-</button>
                </div>
              </div>
            </div>
            <p className='mt-6 text-center text-neutral-500'>
              Add to collection
            </p>
            <div className='mt-4 flex items-center justify-end'>
              <button
                onClick={handleBackClick}
                className='me-4 rounded-3xl bg-neutral-700 px-4 py-3 text-neutral-400 focus:outline-none'
              >
                Back
              </button>
              <button
                onClick={handleAddGlean}
                className='rounded-3xl bg-slate-200 px-4 py-3 focus:outline-none'
              >
                Add Glean
              </button>
            </div>
          </div>
        )}
        {success && (
          <div className='flex items-center justify-center'>
            <button
              onClick={handleBackClick}
              className='rounded-3xl bg-green-400 px-4 py-3 text-white focus:outline-none'
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
