import { useBookmarksContext } from "../lib/hooks";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { boookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  return (
    <div className="bookmarks-popover">
      <JobList jobItems={[]} isLoading={false} />
    </div>
  );
}
