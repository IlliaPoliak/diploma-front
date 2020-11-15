import React, { forwardRef } from 'react'
import { COLORS } from '../../../constants'
import styles from './Notification.module.css'

const Notification = forwardRef((props, ref) => {

    return (
        <div
            ref={ref}
            className={styles.notifications + ' ' + (props.text ? styles.show : '')}
            style={{ backgroundColor: props.status === 'success' ? COLORS.green : COLORS.red, display: props.text ? 'flex' : 'none', opacity: props.text ? 1 : 0 }}
        >
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>{props.text}</div>
        </div>
    )
})

export default Notification