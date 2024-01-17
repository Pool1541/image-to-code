interface Props extends React.SVGProps<SVGSVGElement> {}

export default function MenuIcon(props: Props) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M3 5h8m-8 7h13M3 19h18'
      />
    </svg>
  );
}
