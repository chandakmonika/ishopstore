import React from "react";
import { AddressCard } from "../UI";
import styles from "./index.module.css";
import Link from "next/link";

const Blog = ({  title, image }) => {
  return (
    <>
      <AddressCard customClass={styles.cards}>
        <div>
          <div>
            <div className={styles.blog_image}>
              <img src={image} />
            </div>
            <p className={styles.date}>25 oct 2022</p>
            <h5 className={styles.blog_title}>
              {title}
              <img
                src="/images/share.svg"
                width={"20px"}
                className={`ms-3   ${styles.share_icons}`}
              />
            </h5>
          </div>
          <div>
            <p className={styles.about}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is
            </p>
            <div className={styles.read_more}>
              <Link href="">Read More</Link>
            </div>
          </div>
        </div>
      </AddressCard>
    </>
  );
};
export default Blog;
