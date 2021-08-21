import React from 'react'
import styles from './StatsBox.module.css';

function StatsBox({label, value, textColor, valueContainerColor, labelContainerColor}) {

    return (
        <div className={styles.statsBoxContainer} style={{backgroundColor: valueContainerColor}}>
            <div style={{backgroundColor: valueContainerColor}} className={styles.valueContainer}>
                <p className={styles.valueText} style={{color: textColor}}>{value? value.toLocaleString() : "No info"}</p>
            </div>
            <div className={styles.labelContainer} style={{backgroundColor: labelContainerColor}}>
                <p className={styles.labelText} style={{color: textColor}}>{label}</p>
            </div>
        </div>
    )
}


export default StatsBox;