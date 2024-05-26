import { Restaurant } from "@/types";
import React, { useEffect, useState } from "react";
import styles from "./RestaurantCard.module.scss";
import { getOpenDetail } from "@/actions/open";
import Pill from "../Pill";
import Image from "next/image";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    getOpenDetail(restaurant.id).then((res) => {
      setOpen(res.is_open);
    });
  }, [restaurant]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
        <div className={styles.topbar__pills}>
          <Pill indicator active={open}>
            {open ? "Open" : "Closed"}
          </Pill>
          {open && <Pill>{restaurant.delivery_time_minutes} min</Pill>}
        </div>

        <Image
          alt="restaurant image"
          src={restaurant.image_url}
          width={140}
          height={140}
          className={styles.image}
        />
      </div>
      <div className={styles.bottombar}>
        <h3 className="fs-h1">{restaurant.name}</h3>
        <button className={styles.cta_button}>
          <Image alt="arrow" src="icons/arrow.svg" width={12} height={10} />
        </button>
      </div>
    </div>
  );
}
