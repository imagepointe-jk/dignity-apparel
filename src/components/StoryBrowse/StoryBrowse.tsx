import styles from "@/styles/StoryBrowse/StoryBrowse.module.css";
import { StoryData } from "@/types/schema/prismic";
import { StoryCard } from "./StoryCard";

type Props = {
  stories: StoryData[];
};
export function StoryBrowse({ stories }: Props) {
  return (
    <section className={styles["section"]}>
      <div className={`${styles["main"]} x-wide-container`}>
        <div className={styles["heading-container"]}>
          <h1>Dignified, Life-Changing Stories</h1>
          <div className="subheader-4">
            Select a story below to read more about the hardworking Americans
            who make Dignity Apparel garments.
          </div>
        </div>
        <div className={styles["cards-flex"]}>
          {stories.map((story) => (
            <StoryCard key={story.uid} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
