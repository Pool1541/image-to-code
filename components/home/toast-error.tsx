import { ExclamationIcon } from '../icons';

interface Props {
  message: string;
}

export default function ToastError({ message }: Props) {
  const regex = /https:\/\/\S+/g;
  const url = message.match(regex);
  const text = message.replace(regex, '');

  return (
    <div className='flex gap-2'>
      <ExclamationIcon className='min-w-[20px] min-h-[20px]' />
      <div>
        <p className='font-medium leading-normal text-inherit'>{text}</p>
        {url && (
          <a
            className='font-medium leading-[1.5] text-inherit underline hover:text-red-700'
            href={url[0]}
            target='_blank'>
            {url}
          </a>
        )}
      </div>
    </div>
  );
}
