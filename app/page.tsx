import Image from "next/image";
import styles from "./page.module.scss";
import FilterPicker from "@/components/FilterPicker";
import RestaurantList from "@/components/RestaurantList";
import CategoryTopBar from "@/components/CategoryTopBar";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.topbar}>
          <img
            alt="Munchies logo"
            src="/logo.svg"
            className={styles.topbar__image}
          />
        </div>
        <div className={styles.sidebar}>
          <FilterPicker />
        </div>
        <div className={styles.content}>
          <CategoryTopBar />
          <h2 className="fs-display">Restaurants</h2>
          <RestaurantList />
        </div>
      </main>
    </>
  );
}
