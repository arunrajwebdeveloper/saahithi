import CircleSpinner from "./common/CircleSpinner";

export const AppSpinner = () => {
  return (
    <div className="w-full h-dvh flex fixed top-0 left-0 z-6000 bg-card">
      <CircleSpinner size={24} className="m-auto text-blue-500" />
    </div>
  );
};
