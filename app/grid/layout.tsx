import { Suspense } from "react";

const GridLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Suspense>{children}</Suspense>
    </div>
  );
};

export default GridLayout;
