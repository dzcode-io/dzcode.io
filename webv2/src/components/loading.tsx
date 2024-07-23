import { Image } from './image';
import logoSquare from 'src/assets/svg/logo-square.svg';

export function Loading(): JSX.Element {
  return (
    <div className="flex-1 m-2 absolute-center-child">
      <Image
        className="size-52"
        src={logoSquare}
        alt="DzCode i /o loading..."
      />
    </div>
  );
}
