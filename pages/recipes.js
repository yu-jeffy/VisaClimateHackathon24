import React, { useEffect, useState } from 'react';
import styles from '../styles/Recipes.module.css';
import { useUser } from '@/context/UserContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ThreeDots } from 'react-loader-spinner';
import SearchBar from './searchbar';

const Recipes = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [txHistory, setTxHistory] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [numberFieldValues, setNumberFieldValues] = useState({
        Search: '',
        Calories: '',
        Protein: '',
        Fat: '',
        Carbohydrates: '',
        Fiber: '',
        Sugar: '',
        Sodium: ''
      });
    
      const handleNumberFieldChange = (field, value) => {
        setNumberFieldValues(prevValues => ({
          ...prevValues,
          [field]: value
        }));
      };

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
            try {
                const requests = Array.from({ length: 9 }, () =>
                    fetch('/api/gpt4', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            system_prompt: `You are an expert chef who can create new and unique recipes, focusing on sustainability and eco-friendliness. 
                        
                        DO NOT wrap your answer in \`\`\` or markdown. Respond in the exact JSON format as this example:
                        {
                            "name": "Pad Thai",
                            "description": "A popular Thai street food made with stir-fried rice noodles, vegetables, tofu, and a tamarind-based sauce, often garnished with crushed peanuts and lime.",
                            "image": "/images/pad_thai.jpg",
                            "eco-rating": "80",
                            "ingredients": [
                                {"item": "rice noodles", "quantity": "7 oz"},
                                {"item": "vegetable oil", "quantity": "2 tbsp"},
                                {"item": "garlic", "quantity": "2 cloves", "preparation": "minced"},
                                {"item": "shallot", "quantity": "1", "preparation": "minced"},
                                {"item": "firm tofu", "quantity": "1/2 cup", "preparation": "cubed"},
                                {"item": "eggs", "quantity": "2", "preparation": "lightly beaten"},
                                {"item": "bean sprouts", "quantity": "1 cup"},
                                {"item": "carrots", "quantity": "1/2 cup", "preparation": "grated"},
                                {"item": "scallions", "quantity": "1/2 cup", "preparation": "chopped"},
                                {"item": "peanuts", "quantity": "1/4 cup", "preparation": "crushed"},
                                {"item": "tamarind paste", "quantity": "2 tbsp"},
                                {"item": "fish sauce", "quantity": "2 tbsp"},
                                {"item": "soy sauce", "quantity": "1 tbsp"},
                                {"item": "sugar", "quantity": "1 tbsp"},
                                {"item": "lime", "quantity": "1", "preparation": "cut into wedges"},
                                {"item": "cilantro", "quantity": "to taste", "preparation": "optional"}
                            ],
                            "instructions": [
                                "Soak the rice noodles in warm water for 20-30 minutes or until softened. Drain and set aside.",
                                "In a small bowl, mix the tamarind paste, fish sauce, soy sauce, and sugar. Set aside.",
                                "Heat the vegetable oil in a large wok or skillet over medium-high heat.",
                                "Add the minced garlic and shallot to the wok and fry for 1-2 minutes until fragrant.",
                                "Add the cubed tofu to the wok and cook until golden brown on all sides.",
                                "Push the tofu to the side and add the beaten eggs to the wok, scrambling until cooked through.",
                                "Add the drained rice noodles to the wok, along with the tamarind sauce mixture, and toss to combine.",
                                "Stir in the bean sprouts, grated carrots, and chopped scallions. Cook for an additional 2-3 minutes until vegetables are tender-crisp.",
                                "Serve the Pad Thai hot, garnished with crushed peanuts, lime wedges, and fresh cilantro if desired."
                            ],
                            "nutritionFacts": [
                                {"calories": "400"},
                                {"protein": "15g"},
                                {"fat": "12g"},
                                {"carbohydrates": "55g"},
                                {"fiber": "5g"},
                                {"sugar": "8g"},
                                {"sodium": "900mg"}
                            ]
                        }
                        `,
                            user_prompt: `Generate a new random recipe from a random culture in JSON format. Respond with only the recipe, nothing else.
                        `,
                        }),
                    })
                );

                const responses = await Promise.all(requests);
                const data = await Promise.all(responses.map(res => res.json()));
                const newRecipes = data.map(d => {
                    try {
                        return JSON.parse(d.response);
                    } catch (e) {
                        console.error('Error parsing JSON:', e);
                        return null;
                    }
                }).filter(recipe => recipe !== null);
                setLoading(false);
                setRecipes(newRecipes);
                setFilteredRecipes(newRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);


    const handleCardClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const closeSidebar = () => {
        setSelectedRecipe(null);
    };

    const filterRecipes = () => {
        const termsArray = numberFieldValues.Search.trim().toLowerCase().split(',').map(term => term.trim());
        const nutritionArray = [numberFieldValues.Calories, numberFieldValues.Protein , numberFieldValues.Fat , numberFieldValues.Carbohydrates,
            numberFieldValues.Fiber, numberFieldValues.Sugar, numberFieldValues.Sodium]

        const filtered = recipes.filter(recipe => {
            const matchSearch = termsArray.some(term => recipe.ingredients.some(ingredient =>
                ingredient.item.toLowerCase().includes(term))) ||
            termsArray.some(term => recipe.instructions.some(instruction =>
                instruction.toLowerCase().includes(term))) ||
            termsArray.some(term => recipe.description.toLowerCase().includes(term)) ||
            termsArray.some(term => recipe.name.toLowerCase().includes(term))


            const nutritionValues = recipe.nutritionFacts.map(fact => parseInt(Object.values(fact)[0].replace(/[^0-9]/g, '')));
            const matchNutrition = nutritionValues.every((value, index) => value >= nutritionArray[index])

            return matchSearch && matchNutrition
        });
        setFilteredRecipes(filtered);
    };

    const handleSearchClick = () => {
        filterRecipes();
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div style={{alignItems:'left', textAlign: 'left', marginTop: '50px', marginBottom: '50px', paddingLeft: '30px', color: 'white' }}>
                    <h1>Recipes</h1>
                </div>

                <div>
                    <SearchBar onNumberFieldChange={handleNumberFieldChange} numberFieldValues={numberFieldValues} handleSearchClick={handleSearchClick}/>
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                        visible={true}
                    />
                </div>
            ) : (
                <div className={`${styles.cardsContainer} ${selectedRecipe ? styles.cardsContainerWithSidebar : ''}`}>
                    {filteredRecipes.map((recipe, index) => (
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
                
            )}
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
                                    <li key={i}>
                                        {ingredient.item} {ingredient.quantity && `- ${ingredient.quantity}`}
                                        {ingredient.preparation && ` (${ingredient.preparation})`}
                                    </li>
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