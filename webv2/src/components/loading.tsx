import { Image } from './image';
import logoSquare from 'src/assets/svg/logo-square.svg';

export function Loading(): JSX.Element {
  return (
    <div className="flex-1 m-2 absolute-center-child size-52">
      <Image src={logoSquare} alt="DzCode i /o loading..." />
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
}
