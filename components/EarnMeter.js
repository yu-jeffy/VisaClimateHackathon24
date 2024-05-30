import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/EarnMeter.module.css';

const EarnMeter = ({ points, goal }) => {
    const percentage = Math.min((points / goal) * 100, 100);

    return (
        <div className={styles.earnMeterContainer}>
            <div className={styles.earnMeter}>
                <div
                    className={styles.earnMeterFill}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className={styles.earnMeterText}>
                {points} / {goal} points
            </div>
        </div>
    );
};

EarnMeter.propTypes = {
    points: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired,
};

export default EarnMeter;