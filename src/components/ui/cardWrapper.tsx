"use client";

import * as React from "react";

import { cn } from "~/lib/utils";
import { ArtifactCard } from "./artifactCard";
import { AreaCard, AreaProps } from "./areaCard";
import { ArtifactProps } from "./artifactCard";
import useViewStore from "../../stores/useViewStore";
import { ARTEFACT_VIEW } from "~/stores/viewTypes";

type CardWrapperProps = {
  area: AreaProps;
  artifacts: ArtifactProps[];
  className?: string;
};

const CardWrapper = React.forwardRef<HTMLDivElement, CardWrapperProps>(
  ({ className, area, artifacts }, ref) => {
    const currentView = useViewStore((state) => state.currentView);
    const artifactsView = currentView === ARTEFACT_VIEW;

    const artifactClasses = cn(
      "relative flex flex-col items-center gap-4 p-2",
      {
        "z-1": artifactsView,
        "z-0": !artifactsView,
      },
    );

    const areaClasses = cn(
      "absolute w-full h-full inset-0 bg-white hover:opacity-50",
      {
        "z-1": !artifactsView,
        "z-[-1]": artifactsView,
      },
    );

    return (
      <div
        className={cn(
          `relative flex-grow ${artifactsView ? "rounded-xl border-2 border-dashed" : ""}`,
          className,
        )}
      >
        <div className={artifactClasses}>
          {artifacts.length === 0 ? (
            <ArtifactCard isEmpty />
          ) : (
            artifacts.map((artifact) => (
              <ArtifactCard
                key={artifact.id}
                id={artifact.id}
                name={artifact.name}
              />
            ))
          )}
        </div>
        <div className={areaClasses}>
          <AreaCard id={area.id} name={area.name} />
        </div>
      </div>
    );
  },
);
CardWrapper.displayName = "CardWrapper";

export default CardWrapper;