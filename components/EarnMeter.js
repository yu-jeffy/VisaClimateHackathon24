import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/EarnMeter.module.css';

const EarnMeter = ({ points, goal }) => {
    const roundedPoints = Math.floor(points);
    const roundedGoal = Math.floor(goal);
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
                {roundedPoints} / {roundedGoal} Points Earned
            </div>
        </div>
    );
};

EarnMeter.propTypes = {
    points: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired,
};

export default EarnMeter;
