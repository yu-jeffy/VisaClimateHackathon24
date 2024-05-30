import React from 'react';
import Head from 'next/head';
import EarnMeter from '../components/EarnMeter';
import { useState } from 'react';

const Earn = () => {
    // Set these to adjust the bar visually
    const [userPoints, setUserPoints] = useState(0);
    const [totalGoal, setTotalGoal] = useState(100);

    const addPoints = (pointsToAdd) => {
        setUserPoints(prevPoints => prevPoints + pointsToAdd);
    }

    return (
        <div>
            <Head>
                <title>Earn</title>
            </Head>
            <h1>Earn Page</h1>
            <EarnMeter points={userPoints} goal={totalGoal} />
            <button onClick={() => addPoints(10)}>Add 10 Points</button>
        </div>
    );
}

export default Earn;
