"use client";
import Link from "next/link";
import styles from "./style.module.scss";
import { links, footerLinks } from "../../links";
import { motion } from "framer-motion";
import { slideIn, perspective } from "./anim";

export default function menuNav({ toggleMenu }: { toggleMenu: any }) {
  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => {
          const { title, href } = link;
          return (
            <div key={`b_${i}`} className={styles.linkContainer}>
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <Link onClick={toggleMenu} href={href} className="link">
                  {title}
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>
      <motion.div className={styles.footer}>
        {footerLinks.map((link, i) => {
          const { title, href } = link;
          return (
            <motion.a
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              key={`f_${i}`}
              onClick={toggleMenu}
            >
              {title}
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
