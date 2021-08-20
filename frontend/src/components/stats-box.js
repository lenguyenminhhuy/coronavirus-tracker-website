import React from 'react'
import styles from './stats-box.module.css';

function StatsBox({label, value, textColor, backgroundColor}) {

    return (
        <div className={styles.statsBoxContainer}>
            <p className={styles.valueText} style={{color: textColor}}>{value? value : "No info"}</p>
            <p className={styles.labelText} style={{backgroundColor: backgroundColor, color: textColor}}>{label}</p>
        </div>
    )
}


export default StatsBox;