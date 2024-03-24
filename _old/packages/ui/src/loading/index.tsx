import type { FC } from "react";
import { Image } from "src/image";
import { Stack } from "src/stack";

interface LoadingProps {
  logo: string;
}

export const Loading: FC<LoadingProps> = ({ logo }) => {
  return (
    <Stack direction="vertical" width="100%" alignItems="center" justifyContent="center">
      <Image src={logo} width="100%" maxWidth={400} />
    </Stack>
  );
};
