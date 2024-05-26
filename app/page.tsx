import Image from "next/image";
import styles from "./page.module.css";
import FilterPicker from "@/components/FilterPicker";
import RestaurantList from "@/components/RestaurantList";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.sidebar}>
        <FilterPicker />
      </div>
      <div className={styles.content}>
        <h2 className="fs-display">Restaurant's</h2>
        <RestaurantList />
      </div>
    </main>
  );
}
