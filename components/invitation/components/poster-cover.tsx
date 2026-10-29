import { forwardRef } from "react";

const PosterCover = forwardRef<HTMLDivElement>(function PosterCover(_, ref) {
    return (
        <div
            ref={ref}
            aria-label="Invitation poster cover"
            className="invitation-page invitation-page--poster"
        />
    );
});

PosterCover.displayName = "PosterCover";

export default PosterCover;
