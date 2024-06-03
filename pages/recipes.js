import React, { useEffect, useState } from 'react';
import styles from '../styles/Recipes.module.css';
import { useUser } from '@/context/UserContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Image from 'next/image'; // Import Image component

const Recipes = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [txHistory, setTxHistory] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                const userDocRef = doc(db, 'user_profiles', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserData(userData);
                    setTxHistory(userData.tx_history);
                }
            };

            fetchUserData();
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const res = await fetch('/data/recipes.json');
            const data = await res.json();
            console.log(data);
            setRecipes(data.recipes);
        };
        fetchRecipes();
    }, []);

    const handleCardClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const closeSidebar = () => {
        setSelectedRecipe(null);
    };

    return (
        <div className={styles.container}>
            <div style={{ width: '100vw', textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>
                <h1>Recipes</h1>
            </div>
            <div className={`${styles.cardsContainer} ${selectedRecipe ? styles.cardsContainerWithSidebar : ''}`}>
                {recipes.map((recipe, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        onClick={() => handleCardClick(recipe)}
                    >
                        <h2>{recipe.name}</h2>
                        <p>{recipe.description}</p>
                    </div>
                ))}
            </div>
            {selectedRecipe && (
                <div className={styles.sidebar}>
                    <div className={styles.sidebarContent}>
                        <div className={styles.closeButton} onClick={closeSidebar}>×</div>
                        <h2>{selectedRecipe.name}</h2>
                        <p>{selectedRecipe.description}</p>
                        <div className={styles.details}>
                            <h4>Ingredients:</h4>
                            <ul>
                                {selectedRecipe.ingredients.map((ingredient, i) => (
                                    <li key={i}>{ingredient}</li>
                                ))}
                            </ul>
                            <h4>Instructions:</h4>
                            <ol>
                                {selectedRecipe.instructions.map((instruction, i) => (
                                    <li key={i}>{instruction}</li>
                                ))}
                            </ol>
                            <h4>Nutrition Facts:</h4>
                            <ul>
                                {selectedRecipe.nutritionFacts.map((fact, i) => (
                                    <li key={i}>
                                        {Object.keys(fact)[0]}: {Object.values(fact)[0]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recipes;
