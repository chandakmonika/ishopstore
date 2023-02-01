import Link from "next/link";
import React from "react";
import styles from "./category.module.css";

export const Category = ({ title, src, slug,id }) => {
  
  return (
    <Link href={`/category/${slug}?id=${id}`}>
    <div className={styles.productCard}>
      <div className={styles.image}>
        <img src={src} alt="category" />
      </div>
      <h3 style={{ color: "#373C41" }}>{title}</h3>
    </div> 
    </Link> 
  );
};
