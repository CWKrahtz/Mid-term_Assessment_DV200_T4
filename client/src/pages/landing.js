import React from 'react';
import Button from 'react-bootstrap/Button';
import BasicNav from '../components/navbar';
import styles from '../pages/landing.module.css';

function Landing() {
  return (
    <div>
      <BasicNav />
      <center>
        <h1> Car Parts and Spares </h1>
        <p>Welcome to GlenSpares. We offer a wide variety of high-quality
          car parts and spares<br /> to keep your
          vehicle running smoothly and looking its best.</p>
        <Button variant="primary" href="/parts">All Products</Button></center>
        <br/>
        <center><img className={styles.hero_img}/></center>
            {/* <center><div className={styles.hero_img}></div></center> */}
     
    </div>
  )
}

export default Landing;