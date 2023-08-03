'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { toast } from 'react-toastify';

import { useGlobalContext } from '@/app/context/data.context';

import FirstImage from '../../../public/images/first-pic.png';
import FourthImage from '../../../public/images/fourth-pic.png';
import GleanImage from '../../../public/images/glean.png';
import SecondImage from '../../../public/images/second-pic.png';
import FifthImage from '../../../public/images/sixth-pic.png';
import ThirdImage from '../../../public/images/third-pic.png';

interface ResponseData {
  data?: Record<string, unknown>;
  isError: boolean;
}

export const AddContentModal = () => {
  const { setData } = useGlobalContext();
  const router = useRouter();
  const [link, setLink] = React.useState<string>('');

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  function isValidURL(input: string): boolean {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(input);
  }

  const handleAdd = async () => {
    if (isValidURL(link)) {
      const response: ResponseData = await axios.post('/api/scrape', {
        url: link,
      });
      if (!response.isError) {
        setData(response.data!);
        router.push('/editor');
      } else {
        toast.error('Error: Scraping Data');
      }
    } else {
      toast.error('Error: Invalid URL');
    }
  };

  return (
    <div className='modal animate-modal fixed inset-0 z-10 flex items-center justify-center'>
      <div className='modal-content rounded-2xl bg-neutral-800 px-10 py-6'>
        <h2 className='mb-4 text-center text-3xl font-bold text-neutral-500'>
          Add Content
        </h2>
        <div className='mt-8 flex justify-between'>
          <div className='flex w-44 flex-col items-center justify-between'>
            <Image src={GleanImage} alt='Glean' />
            <p className='mt-2 text-white'>Create a Glean</p>
            <p className='mt-4 text-center text-neutral-500'>
              Add content, links & descriptive texts
            </p>
          </div>
          <div className='flex w-44 flex-col items-center justify-between'>
            <div className='flex h-[104px] w-full'>
              <Image src={FirstImage} alt='Glean' className='w-1/2' />
              <div className='flex w-1/2 flex-col'>
                <div className='relative h-1/2'>
                  <Image
                    src={SecondImage}
                    alt='Glean'
                    className=''
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                  />
                </div>
                <div className='flex h-1/2 flex-wrap'>
                  <div className='relative h-1/2 w-1/2'>
                    <Image
                      src={ThirdImage}
                      alt='Glean'
                      className=''
                      layout='fill'
                      objectFit='cover'
                      objectPosition='center'
                    />
                  </div>

                  <div className='relative h-1/2 w-1/2'>
                    <Image
                      src={FourthImage}
                      alt='Glean'
                      className=''
                      layout='fill'
                      objectFit='cover'
                      objectPosition='center'
                    />
                  </div>
                  <div className='relative h-1/2 w-1/2'>
                    <Image
                      src={FifthImage}
                      alt='Glean'
                      className=''
                      layout='fill'
                      objectFit='cover'
                      objectPosition='center'
                    />
                  </div>
                  <div className='relative h-1/2 w-1/2'>
                    <Image
                      src={FifthImage}
                      alt='Glean'
                      className=''
                      layout='fill'
                      objectFit='cover'
                      objectPosition='center'
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className=' mt-2 text-white'>Collection</p>
            <p className='mt-4 text-center text-neutral-500'>
              Organise gleans & Direct links
            </p>
          </div>
        </div>
        <div className='relative mt-8 flex'>
          <input
            value={link}
            type='text'
            placeholder='Add a Link, Title or Description'
            className='w-full rounded-3xl bg-neutral-700 px-4 py-2 text-white focus:outline-none'
            onChange={handleLinkChange}
          />
          {link.length > 0 && (
            <button
              onClick={handleAdd}
              className='slide-in-animation absolute right-0.5 top-0.5 rounded-3xl bg-slate-200 px-4 py-1.5 focus:outline-none'
            >
              Add
            </button>
          )}
        </div>
        <div className=' mt-4 w-80'>
          <p className='text-center font-medium text-neutral-500'>
            Powered by Gleans Ai{' '}
            <span className='text-neutral-500'>
              Create Content automatically and make changes if needed
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
