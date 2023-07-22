interface SignupLayoutProps {
  children: React.ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="z-10 items-center justify-between w-full max-w-5xl text-sm lg:flex">
        <div className="w-full">
          <div className="flex-1 lg:max-xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
