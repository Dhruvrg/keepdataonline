"use client";

import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
}) => {
  return (
    <div className="h-[90vh] ml-5 md:ml-0 md:w-[70vw] flex justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
    </div>
  );
};

export default EmptyState;
